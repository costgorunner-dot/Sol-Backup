#!/usr/bin/env node
/**
 * Dreammode Historical Backfill
 * 
 * Processes all transcripts chronologically from Feb 18 → today
 * - Extracts topics progressively
 * - Tracks relationship evolution
 * - Identifies patterns over time
 * - Generates complete historical analysis
 */

const fs = require('fs');
const path = require('path');

const TRANSCRIPTS_DIR = path.join(process.env.HOME, '.openclaw', 'workspace', 'memory', 'transcripts');
const DREAMMODE_DIR = path.join(process.env.HOME, '.openclaw', 'dreammode');
const RELATIONSHIP_FILE = path.join(DREAMMODE_DIR, 'relationship-events.json');

// Track cumulative knowledge
let cumulativeTopics = {};
let relationshipTimeline = [];
let allDecisions = [];
let allPatterns = [];

function getTranscriptDates() {
    const files = fs.readdirSync(TRANSCRIPTS_DIR)
        .filter(f => f.endsWith('.md'))
        .map(f => f.replace('.md', ''))
        .sort();
    
    return files;
}

function extractTopicsFromTranscript(date, content) {
    const topics = [];
    const lines = content.split('\n');
    
    // Keywords that indicate important topics
    const topicKeywords = [
        'VideoBoard', 'LTX-2', 'MiniCPM', 'Team TAU', 'Astra', 'Dreammode',
        'Jotty', 'Tavily', 'Piper', 'Telegram', 'backup', 'weather',
        'hardware', 'RAM', 'Mac Studio', 'Orb Night', 'video project',
        'relationship', 'friend', 'buddy', 'partner'
    ];
    
    let currentSpeaker = null;
    let currentTime = null;
    let messageBuffer = [];
    
    for (const line of lines) {
        if (line.startsWith('## [')) {
            // Process previous message
            if (currentSpeaker && messageBuffer.length > 0) {
                const fullMessage = messageBuffer.join(' ');
                
                // Check for topic keywords
                for (const keyword of topicKeywords) {
                    if (fullMessage.toLowerCase().includes(keyword.toLowerCase())) {
                        topics.push({
                            date: date,
                            time: currentTime,
                            topic: keyword,
                            speaker: currentSpeaker,
                            context: fullMessage.substring(0, 150),
                            mentions: (fullMessage.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length
                        });
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
    
    return topics;
}

function extractDecisionsFromTranscript(date, content) {
    const decisions = [];
    
    // Decision indicators
    const decisionPatterns = [
        /(?:decided|chose|picked|went with|will use|using) (.+?)(?:\.|instead|over)/gi,
        /(?:the plan is|plan:|next step:|going to) (.+?)(?:\.|$)/gi
    ];
    
    const lines = content.split('\n');
    
    for (const line of lines) {
        for (const pattern of decisionPatterns) {
            const matches = line.matchAll(pattern);
            for (const match of matches) {
                decisions.push({
                    date: date,
                    decision: match[1].trim(),
                    context: line.trim().substring(0, 200)
                });
            }
        }
    }
    
    return decisions;
}

function analyzeRelationshipProgression(date, events) {
    const dayEvents = events.filter(e => e.date === date);
    
    if (dayEvents.length === 0) return null;
    
    const summary = {
        date: date,
        totalEvents: dayEvents.length,
        trustExpansions: dayEvents.filter(e => e.type === 'trust-expansion').length,
        energyShifts: dayEvents.filter(e => e.type === 'energy-shift').length,
        phrasesBorn: dayEvents.filter(e => e.type === 'phrase-born').length,
        topMoment: null
    };
    
    // Find most significant moment
    const significant = dayEvents
        .filter(e => e.confidence >= 0.8)
        .sort((a, b) => b.confidence - a.confidence)[0];
    
    if (significant) {
        summary.topMoment = {
            time: significant.time,
            type: significant.type,
            preview: significant.message.substring(0, 100)
        };
    }
    
    return summary;
}

function processDay(date, events) {
    console.log(`\n📅 Processing ${date}...`);
    
    // Load transcript
    const transcriptPath = path.join(TRANSCRIPTS_DIR, `${date}.md`);
    if (!fs.existsSync(transcriptPath)) {
        console.log(`   ⚠️  No transcript found`);
        return null;
    }
    
    const content = fs.readFileSync(transcriptPath, 'utf8');
    
    // Extract data
    const topics = extractTopicsFromTranscript(date, content);
    const decisions = extractDecisionsFromTranscript(date, content);
    const relationship = analyzeRelationshipProgression(date, events);
    
    // Update cumulative topics
    for (const topic of topics) {
        if (!cumulativeTopics[topic.topic]) {
            cumulativeTopics[topic.topic] = {
                firstMentioned: date,
                totalMentions: 0,
                dates: []
            };
        }
        cumulativeTopics[topic.topic].totalMentions += topic.mentions;
        if (!cumulativeTopics[topic.topic].dates.includes(date)) {
            cumulativeTopics[topic.topic].dates.push(date);
        }
    }
    
    // Track decisions
    allDecisions.push(...decisions);
    
    // Track relationship
    if (relationship) {
        relationshipTimeline.push(relationship);
    }
    
    console.log(`   ✅ Topics: ${topics.length}, Decisions: ${decisions.length}, Events: ${relationship?.totalEvents || 0}`);
    
    return {
        date,
        topics,
        decisions,
        relationship
    };
}

function generateHistoricalAnalysis() {
    console.log('\n\n📊 Generating Historical Analysis...\n');
    
    let analysis = `# Dreammode Historical Analysis\n\n`;
    analysis += `**Generated:** ${new Date().toISOString().split('T')[0]}\n`;
    analysis += `**Period:** Feb 18 - Mar 2, 2026 (13 days)\n`;
    analysis += `**Total Transcripts:** ${relationshipTimeline.length}\n\n`;
    
    analysis += `---\n\n`;
    
    // Topic Evolution
    analysis += `## 📈 Topic Evolution\n\n`;
    const sortedTopics = Object.entries(cumulativeTopics)
        .sort((a, b) => b[1].totalMentions - a[1].totalMentions)
        .slice(0, 15);
    
    for (const [topic, data] of sortedTopics) {
        analysis += `### ${topic}\n`;
        analysis += `- **First mentioned:** ${data.firstMentioned}\n`;
        analysis += `- **Total mentions:** ${data.totalMentions}\n`;
        analysis += `- **Days active:** ${data.dates.length}\n\n`;
    }
    
    // Relationship Progression
    analysis += `---\n\n`;
    analysis += `## 💙 Relationship Progression\n\n`;
    
    for (const day of relationshipTimeline) {
        if (day.totalEvents > 0) {
            analysis += `### ${day.date}\n`;
            analysis += `- **Events:** ${day.totalEvents}\n`;
            analysis += `- **Trust expansions:** ${day.trustExpansions}\n`;
            analysis += `- **Energy shifts:** ${day.energyShifts}\n`;
            analysis += `- **Phrases born:** ${day.phrasesBorn}\n`;
            
            if (day.topMoment) {
                analysis += `- **Key moment:** [${day.topMoment.time}] ${day.topMoment.type}\n`;
                analysis += `  _"${day.topMoment.preview}..._"_\n`;
            }
            analysis += `\n`;
        }
    }
    
    // Key Decisions
    analysis += `---\n\n`;
    analysis += `## ✅ Key Decisions Timeline\n\n`;
    
    const importantDecisions = allDecisions.slice(0, 10);
    for (const decision of importantDecisions) {
        analysis += `**[${decision.date}]** ${decision.decision}\n\n`;
    }
    
    // Patterns
    analysis += `---\n\n`;
    analysis += `## 🔍 Patterns Detected\n\n`;
    
    // Calculate patterns
    const totalEvents = relationshipTimeline.reduce((sum, d) => sum + d.totalEvents, 0);
    const avgEventsPerDay = (totalEvents / relationshipTimeline.length).toFixed(1);
    
    analysis += `- **Total relationship events:** ${totalEvents}\n`;
    analysis += `- **Average events per day:** ${avgEventsPerDay}\n`;
    analysis += `- **Busiest day:** ${relationshipTimeline.sort((a, b) => b.totalEvents - a.totalEvents)[0]?.date || 'N/A'}\n\n`;
    
    analysis += `**So it folds, so it flows.** 🌊✨\n`;
    
    return analysis;
}

function main() {
    console.log('\n🚀 Dreammode Historical Backfill\n');
    console.log('=' .repeat(50));
    
    // Load relationship events
    let events = [];
    if (fs.existsSync(RELATIONSHIP_FILE)) {
        const data = JSON.parse(fs.readFileSync(RELATIONSHIP_FILE, 'utf8'));
        events = data.allEvents || [];
        console.log(`✅ Loaded ${events.length} relationship events\n`);
    }
    
    // Get all transcript dates
    const dates = getTranscriptDates();
    console.log(`📅 Found ${dates.length} transcripts to process\n`);
    
    // Process each day chronologically
    for (const date of dates) {
        processDay(date, events);
    }
    
    // Generate analysis
    const analysis = generateHistoricalAnalysis();
    
    // Save outputs
    const analysisPath = path.join(DREAMMODE_DIR, 'historical-analysis.md');
    fs.writeFileSync(analysisPath, analysis, 'utf8');
    console.log(`\n✅ Historical analysis saved to: ${analysisPath}\n`);
    
    // Save cumulative topics
    const topicsPath = path.join(DREAMMODE_DIR, 'cumulative-topics.json');
    fs.writeFileSync(topicsPath, JSON.stringify(cumulativeTopics, null, 2), 'utf8');
    console.log(`✅ Cumulative topics saved to: ${topicsPath}\n`);
    
    // Print summary
    console.log('\n📊 FINAL SUMMARY\n');
    console.log(`Topics tracked: ${Object.keys(cumulativeTopics).length}`);
    console.log(`Decisions identified: ${allDecisions.length}`);
    console.log(`Days analyzed: ${relationshipTimeline.length}`);
    console.log(`Total relationship events: ${relationshipTimeline.reduce((sum, d) => sum + d.totalEvents, 0)}`);
    console.log('\n✅ Complete!\n');
}

main();
