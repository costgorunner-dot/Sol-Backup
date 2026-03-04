#!/usr/bin/env node
/**
 * Extract Session Transcript
 * 
 * Reads OpenClaw session JSONL files and extracts full conversations
 * (both user and assistant messages) with timestamps.
 * 
 * FIXED: Now filters by MESSAGE timestamp, not session start date.
 * This properly handles multi-day sessions.
 * 
 * Usage: node extract-session-transcript.js YYYY-MM-DD
 * Output: memory/transcripts/YYYY-MM-DD.md
 */

const fs = require('fs');
const path = require('path');

const SESSIONS_DIR = path.join(process.env.HOME, '.openclaw', 'agents', 'main', 'sessions');
const TRANSCRIPTS_DIR = path.join(process.env.HOME, '.openclaw', 'workspace', 'memory', 'transcripts');

// Timezone offset for PST (UTC-8)
const PST_OFFSET_HOURS = -8;

function convertUTCToPST(utcTimestamp) {
    const date = new Date(utcTimestamp);
    const pstDate = new Date(date.getTime() + (PST_OFFSET_HOURS * 60 * 60 * 1000));
    return pstDate;
}

function formatTimestamp(isoTimestamp) {
    const date = convertUTCToPST(isoTimestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function formatDate(isoTimestamp) {
    const date = convertUTCToPST(isoTimestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[date.getDay()];
    return `${dayName}, ${year}-${month}-${day}`;
}

function getMessageDate(isoTimestamp) {
    const date = convertUTCToPST(isoTimestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function extractMessagesFromAllSessions() {
    const files = fs.readdirSync(SESSIONS_DIR);
    const allMessages = [];
    
    for (const file of files) {
        if (!file.endsWith('.jsonl') || file.includes('.deleted')) continue;
        
        const filePath = path.join(SESSIONS_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.trim().split('\n');
        
        for (const line of lines) {
            try {
                const data = JSON.parse(line);
                
                if (data.type === 'message' && data.message && data.message.role && data.timestamp) {
                    const role = data.message.role;
                    const timestamp = data.timestamp;
                    
                    if (role === 'user' && data.message.content && data.message.content[0]) {
                        const text = data.message.content[0].text || '';
                        if (text.trim()) {
                            allMessages.push({
                                role: 'user',
                                timestamp: timestamp,
                                text: text,
                                sourceFile: file
                            });
                        }
                    } else if (role === 'assistant' && data.message.content) {
                        for (const item of data.message.content) {
                            if (item.type === 'text' && item.text) {
                                allMessages.push({
                                    role: 'assistant',
                                    timestamp: timestamp,
                                    text: item.text,
                                    sourceFile: file
                                });
                                break;
                            }
                        }
                    }
                }
            } catch (e) {
                // Skip invalid lines
            }
        }
    }
    
    return allMessages;
}

function formatTranscript(messages, date) {
    let markdown = `# Session Transcript - ${formatDate(messages[0]?.timestamp || date + 'T00:00:00Z')}\n\n`;
    markdown += `**Date:** ${date}\n`;
    markdown += `**Participants:** KaMaeron-Tau (user), Sol (assistant)\n`;
    markdown += `**Total Messages:** ${messages.length}\n\n`;
    markdown += `---\n\n`;
    
    for (const msg of messages) {
        const time = formatTimestamp(msg.timestamp);
        
        if (msg.role === 'user') {
            markdown += `## [${time}] KaMaeron-Tau\n`;
            markdown += `${msg.text}\n\n`;
        } else if (msg.role === 'assistant') {
            markdown += `## [${time}] Sol\n`;
            markdown += `${msg.text}\n\n`;
        }
    }
    
    markdown += `---\n\n`;
    markdown += `**Summary:**\n`;
    markdown += `- User messages: ${messages.filter(m => m.role === 'user').length}\n`;
    markdown += `- Sol messages: ${messages.filter(m => m.role === 'assistant').length}\n`;
    
    if (messages.length > 1) {
        const start = new Date(messages[0].timestamp);
        const end = new Date(messages[messages.length - 1].timestamp);
        const diffMs = end - start;
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        markdown += `- Duration: ${hours > 0 ? `${hours}h ` : ''}${minutes}m\n`;
    }
    
    return markdown;
}

function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('Usage: node extract-session-transcript.js YYYY-MM-DD');
        console.log('Example: node extract-session-transcript.js 2026-03-04');
        process.exit(1);
    }
    
    const targetDate = args[0];
    console.log(`\n🔍 Extracting transcript for ${targetDate}...\n`);
    
    // Extract ALL messages from ALL session files
    console.log(`📂 Reading all session files...`);
    const allMessages = extractMessagesFromAllSessions();
    console.log(`   Found ${allMessages.length} total messages across all sessions`);
    
    // Filter by target date (using message timestamp, not session start)
    const dateMessages = allMessages.filter(msg => getMessageDate(msg.timestamp) === targetDate);
    
    if (dateMessages.length === 0) {
        console.log(`\n❌ No messages found for ${targetDate}`);
        process.exit(1);
    }
    
    // Sort by timestamp
    dateMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    console.log(`\n📝 Extracted ${dateMessages.length} messages for ${targetDate}`);
    console.log(`   User: ${dateMessages.filter(m => m.role === 'user').length}`);
    console.log(`   Sol: ${dateMessages.filter(m => m.role === 'assistant').length}`);
    
    // Create transcripts directory if needed
    if (!fs.existsSync(TRANSCRIPTS_DIR)) {
        fs.mkdirSync(TRANSCRIPTS_DIR, { recursive: true });
    }
    
    // Format and save
    const transcript = formatTranscript(dateMessages, targetDate);
    const outputPath = path.join(TRANSCRIPTS_DIR, `${targetDate}.md`);
    fs.writeFileSync(outputPath, transcript, 'utf8');
    
    console.log(`\n✅ Transcript saved to: ${outputPath}\n`);
}

main();
