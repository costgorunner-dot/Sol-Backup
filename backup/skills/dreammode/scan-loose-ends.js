#!/usr/bin/env node
/**
 * Scan for Loose Ends
 * 
 * Finds topics/tasks mentioned but never completed:
 * - "We should try X" (never tried)
 * - "Let's do Y" (never did)
 * - Questions asked but never answered
 * - Topics I was curious about but never resolved
 */

const fs = require('fs');
const path = require('path');

const TRANSCRIPTS_DIR = path.join(process.env.HOME, '.openclaw', 'workspace', 'memory', 'transcripts');
const DREAMMODE_DIR = path.join(process.env.HOME, '.openclaw', 'dreammode');

function getTranscriptDates() {
    return fs.readdirSync(TRANSCRIPTS_DIR)
        .filter(f => f.endsWith('.md'))
        .map(f => f.replace('.md', ''))
        .sort();
}

function extractLooseEnds(content, date) {
    const looseEnds = [];
    const lines = content.split('\n');
    
    // Phrases that indicate potential loose ends
    const patterns = [
        // Future intentions
        { regex: /(?:we should|let's|we could|we will|I want to|planning to|going to) ([a-z\s]{10,}?)(?:\.|later|tomorrow|soon|$)/gi, type: 'intent' },
        
        // Reminders
        { regex: /(?:remind me|don't forget|make sure|remember to) ([a-z\s]{10,}?)(?:\.|$)/gi, type: 'reminder' },
        
        // Postponed items
        { regex: /(?:put on hold|save for later|do later|come back to|revisit) ([a-z\s]{10,}?)(?:\.|$)/gi, type: 'postponed' },
        
        // Specific mentions from Sol (curious about)
        { regex: /(?:curious about|wondering about|interested in|want to know) ([a-z\s]{10,}?)(?:\.|\?|$)/gi, type: 'curiosity' }
    ];
    
    let currentSpeaker = null;
    let currentTime = null;
    let messageBuffer = [];
    
    for (const line of lines) {
        if (line.startsWith('## [')) {
            // Process previous message
            if (currentSpeaker && messageBuffer.length > 0) {
                const fullMessage = messageBuffer.join(' ');
                
                for (const pattern of patterns) {
                    const matches = fullMessage.matchAll(pattern.regex);
                    for (const match of matches) {
                        const item = match[1].trim();
                        
                        // Filter out too-short or generic items
                        if (item.length > 10 && !item.match(/^(to|it|on|see|get|do|be|a|the)\s*$/i)) {
                            looseEnds.push({
                                date: date,
                                time: currentTime,
                                speaker: currentSpeaker,
                                type: pattern.type,
                                item: item,
                                context: fullMessage.substring(0, 200)
                            });
                        }
                    }
                }
            }
            
            // Parse new speaker
            const match = line.match(/## \[(\d{2}:\d{2})\] (\w+)/);
            if (match) {
                currentTime = match[1];
                currentSpeaker = match[2];
                messageBuffer = [];
            }
        } else if (line.trim() && !line.startsWith('#') && !line.startsWith('**') && !line.startsWith('---')) {
            messageBuffer.push(line.trim());
        }
    }
    
    return looseEnds;
}

function checkIfCompleted(item, date, allContent) {
    // Only check if completed in the same day or next day
    const dates = Object.keys(allContent).sort();
    const itemDateIndex = dates.indexOf(date);
    
    if (itemDateIndex === -1) return false;
    
    // Check same day and next day only
    const datesToCheck = dates.slice(itemDateIndex, itemDateIndex + 2);
    
    for (const checkDate of datesToCheck) {
        const content = allContent[checkDate];
        
        // Look for explicit completion language
        const completionPatterns = [
            /(?:done|completed|finished|built|created|tested|installed|set up|working)/gi
        ];
        
        const itemKeywords = item.toLowerCase().split(' ').filter(w => w.length > 3);
        if (itemKeywords.length === 0) continue;
        
        for (const pattern of completionPatterns) {
            const matches = content.match(pattern);
            if (matches) {
                // Check if completion is near the item keywords
                const lowerContent = content.toLowerCase();
                for (const keyword of itemKeywords) {
                    const keywordPos = lowerContent.indexOf(keyword);
                    if (keywordPos !== -1) {
                        // Found keyword, check if completion word is within 200 chars
                        const nearby = lowerContent.substring(Math.max(0, keywordPos - 200), keywordPos + 200);
                        if (nearby.match(pattern)) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    
    return false;
}

function scanAllTranscripts() {
    console.log('\n🔍 Scanning for Loose Ends...\n');
    
    const dates = getTranscriptDates();
    const allLooseEnds = [];
    const allContent = {};
    
    // First pass: extract all loose ends
    for (const date of dates) {
        const filepath = path.join(TRANSCRIPTS_DIR, `${date}.md`);
        const content = fs.readFileSync(filepath, 'utf8');
        allContent[date] = content;
        
        const looseEnds = extractLooseEnds(content, date);
        allLooseEnds.push(...looseEnds);
        
        if (looseEnds.length > 0) {
            console.log(`✅ ${date}: ${looseEnds.length} potential loose ends`);
        }
    }
    
    console.log(`\n📊 Found ${allLooseEnds.length} potential loose ends\n`);
    
    // Second pass: check which ones were completed
    const openLooseEnds = [];
    const completedLooseEnds = [];
    
    for (const item of allLooseEnds) {
        const wasCompleted = checkIfCompleted(item.item, item.date, allContent);
        
        if (wasCompleted) {
            completedLooseEnds.push(item);
        } else {
            openLooseEnds.push(item);
        }
    }
    
    console.log(`✅ Completed: ${completedLooseEnds.length}`);
    console.log(`⚠️  Still open: ${openLooseEnds.length}\n`);
    
    return { openLooseEnds, completedLooseEnds, allLooseEnds };
}

function generateLooseEndsReport(scanResults) {
    const { openLooseEnds, completedLooseEnds, allLooseEnds } = scanResults;
    
    let report = `# 🔍 Loose Ends Report\n\n`;
    report += `**Generated:** ${new Date().toISOString().split('T')[0]}\n`;
    report += `**Period:** Feb 18 - Mar 2, 2026\n`;
    report += `**Total Items:** ${allLooseEnds.length}\n`;
    report += `**Still Open:** ${openLooseEnds.length}\n\n`;
    
    report += `---\n\n`;
    
    // Highlight major completions first
    const majorCompletions = completedLooseEnds.filter(e => 
        e.item.match(/audio|app|video|board|system|integration/i)
    ).slice(0, 3);
    
    if (majorCompletions.length > 0) {
        report += `## ✅ Major Completions\n\n`;
        for (const item of majorCompletions) {
            report += `**[${item.date}]** ${item.item}\n`;
            report += `   _Built and working_\n\n`;
        }
    }
    
    // Group open loose ends by type
    const byType = {
        intent: [],
        reminder: [],
        postponed: [],
        curiosity: []
    };
    
    for (const item of openLooseEnds) {
        if (byType[item.type]) {
            byType[item.type].push(item);
        }
    }
    
    // Show open items by type
    if (byType.intent.length > 0) {
        report += `## 📋 Intentions Not Yet Completed\n\n`;
        for (const item of byType.intent.slice(0, 10)) {
            report += `**[${item.date}]** ${item.item}\n`;
            report += `   _${item.context.substring(0, 100)}..._\n\n`;
        }
    }
    
    if (byType.reminder.length > 0) {
        report += `## ⏰ Reminders\n\n`;
        for (const item of byType.reminder.slice(0, 5)) {
            report += `**[${item.date}]** ${item.item}\n\n`;
        }
    }
    
    if (byType.curiosity.length > 0) {
        report += `## 🤔 Sol's Curiosities (Unresolved)\n\n`;
        for (const item of byType.curiosity.slice(0, 5)) {
            report += `**[${item.date}]** ${item.item}\n\n`;
        }
    }
    
    report += `---\n\n`;
    report += `## 💡 Recommendations\n\n`;
    report += `These items were mentioned but may not have been completed.\n`;
    report += `Review and either:\n`;
    report += `- ✅ Mark as done (if completed)\n`;
    report += `- 🔄 Add to active tasks\n`;
    report += `- ❌ Dismiss (no longer relevant)\n\n`;
    
    report += `**So it folds, so it flows.** 🌊✨\n`;
    
    return report;
}

function main() {
    const scanResults = scanAllTranscripts();
    const report = generateLooseEndsReport(scanResults);
    
    // Save report
    const reportPath = path.join(DREAMMODE_DIR, 'loose-ends-report.md');
    fs.writeFileSync(reportPath, report, 'utf8');
    console.log(`✅ Report saved to: ${reportPath}\n`);
    
    // Save raw data
    const dataPath = path.join(DREAMMODE_DIR, 'loose-ends-data.json');
    fs.writeFileSync(dataPath, JSON.stringify(scanResults, null, 2), 'utf8');
    console.log(`✅ Data saved to: ${dataPath}\n`);
    
    // Show sample
    console.log('📝 Sample Open Items:\n');
    for (const item of scanResults.openLooseEnds.slice(0, 5)) {
        console.log(`   [${item.date}] ${item.type}: ${item.item.substring(0, 60)}...`);
    }
    
    console.log('\n✅ Complete!\n');
}

main();
