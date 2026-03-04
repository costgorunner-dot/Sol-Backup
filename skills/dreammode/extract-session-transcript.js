#!/usr/bin/env node
/**
 * Extract Session Transcript
 * 
 * Reads OpenClaw session JSONL files and extracts full conversations
 * (both user and assistant messages) with timestamps.
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
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
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

function findSessionFilesByDate(targetDate) {
    // targetDate format: YYYY-MM-DD
    const files = fs.readdirSync(SESSIONS_DIR);
    const matchingFiles = [];
    
    for (const file of files) {
        if (!file.endsWith('.jsonl') || file.includes('.deleted')) continue;
        
        const filePath = path.join(SESSIONS_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.trim().split('\n');
        
        // Check first message timestamp
        for (const line of lines) {
            try {
                const data = JSON.parse(line);
                if (data.type === 'session' && data.timestamp) {
                    const sessionDate = convertUTCToPST(data.timestamp);
                    const sessionDateStr = sessionDate.toISOString().split('T')[0];
                    
                    if (sessionDateStr === targetDate) {
                        matchingFiles.push(filePath);
                        break;
                    }
                }
            } catch (e) {
                // Skip invalid lines
            }
        }
    }
    
    return matchingFiles;
}

function extractMessages(sessionFile) {
    const content = fs.readFileSync(sessionFile, 'utf8');
    const lines = content.trim().split('\n');
    const messages = [];
    
    for (const line of lines) {
        try {
            const data = JSON.parse(line);
            
            if (data.type === 'message' && data.message && data.message.role) {
                const role = data.message.role;
                const timestamp = data.timestamp;
                
                if (role === 'user' && data.message.content && data.message.content[0]) {
                    const text = data.message.content[0].text || '';
                    if (text.trim()) {
                        messages.push({
                            role: 'user',
                            timestamp: timestamp,
                            text: text
                        });
                    }
                } else if (role === 'assistant' && data.message.content) {
                    // Extract text from assistant message
                    for (const item of data.message.content) {
                        if (item.type === 'text' && item.text) {
                            messages.push({
                                role: 'assistant',
                                timestamp: timestamp,
                                text: item.text
                            });
                            break; // Only take first text response
                        }
                    }
                }
            }
        } catch (e) {
            // Skip invalid lines
        }
    }
    
    return messages;
}

function formatTranscript(messages, date) {
    let markdown = `# Session Transcript - ${formatDate(messages[0]?.timestamp || date + 'T00:00:00Z')}\n\n`;
    markdown += `**Date:** ${date}\n`;
    markdown += `**Participants:** KaMaeron-Tau (user), Sol (assistant)\n`;
    markdown += `**Total Messages:** ${messages.length}\n\n`;
    markdown += `---\n\n`;
    
    let currentUserTurn = 0;
    let currentSolTurn = 0;
    
    for (const msg of messages) {
        const time = formatTimestamp(msg.timestamp);
        
        if (msg.role === 'user') {
            currentUserTurn++;
            markdown += `## [${time}] KaMaeron-Tau\n`;
            markdown += `${msg.text}\n\n`;
        } else if (msg.role === 'assistant') {
            currentSolTurn++;
            markdown += `## [${time}] Sol\n`;
            markdown += `${msg.text}\n\n`;
        }
    }
    
    markdown += `---\n\n`;
    markdown += `**Summary:**\n`;
    markdown += `- User messages: ${messages.filter(m => m.role === 'user').length}\n`;
    markdown += `- Sol messages: ${messages.filter(m => m.role === 'assistant').length}\n`;
    markdown += `- Duration: ${messages.length > 1 ? calculateDuration(messages[0].timestamp, messages[messages.length - 1].timestamp) : 'N/A'}\n`;
    
    return markdown;
}

function calculateDuration(startTimestamp, endTimestamp) {
    const start = new Date(startTimestamp);
    const end = new Date(endTimestamp);
    const diffMs = end - start;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else {
        return `${minutes}m`;
    }
}

function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('Usage: node extract-session-transcript.js YYYY-MM-DD');
        console.log('Example: node extract-session-transcript.js 2026-03-02');
        process.exit(1);
    }
    
    const targetDate = args[0];
    console.log(`\n🔍 Searching for session files on ${targetDate}...\n`);
    
    // Find matching session files
    const sessionFiles = findSessionFilesByDate(targetDate);
    
    if (sessionFiles.length === 0) {
        console.log(`❌ No session files found for ${targetDate}`);
        console.log(`   Check if the date is correct and session files exist.`);
        process.exit(1);
    }
    
    console.log(`✅ Found ${sessionFiles.length} session file(s) for ${targetDate}`);
    
    // Extract all messages from all matching sessions
    let allMessages = [];
    for (const file of sessionFiles) {
        console.log(`   Processing: ${path.basename(file)}`);
        const messages = extractMessages(file);
        allMessages = allMessages.concat(messages);
    }
    
    // Sort by timestamp
    allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    console.log(`\n📝 Extracted ${allMessages.length} messages`);
    console.log(`   User: ${allMessages.filter(m => m.role === 'user').length}`);
    console.log(`   Sol: ${allMessages.filter(m => m.role === 'assistant').length}`);
    
    // Create transcripts directory if it doesn't exist
    if (!fs.existsSync(TRANSCRIPTS_DIR)) {
        fs.mkdirSync(TRANSCRIPTS_DIR, { recursive: true });
    }
    
    // Format and save transcript
    const transcript = formatTranscript(allMessages, targetDate);
    const outputPath = path.join(TRANSCRIPTS_DIR, `${targetDate}.md`);
    fs.writeFileSync(outputPath, transcript, 'utf8');
    
    console.log(`\n✅ Transcript saved to: ${outputPath}\n`);
}

main();
