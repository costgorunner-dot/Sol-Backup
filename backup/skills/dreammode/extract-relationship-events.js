#!/usr/bin/env node
/**
 * Extract Relationship Events from Transcripts
 * 
 * Scans conversation transcripts and identifies key relationship moments:
 * - Trust expansion (sharing something personal)
 * - Milestones (first time saying something meaningful)
 * - Phrases born ("so it folds, so it flows")
 * - Energy shifts (tone changes)
 * - Breakthroughs (creative or technical)
 */

const fs = require('fs');
const path = require('path');

const TRANSCRIPTS_DIR = path.join(process.env.HOME, '.openclaw', 'workspace', 'memory', 'transcripts');
const RELATIONSHIP_FILE = path.join(process.env.HOME, '.openclaw', 'dreammode', 'relationship-events.json');

// Keywords that indicate relationship moments
const TRUST_KEYWORDS = [
    'trust', 'honored', 'shared', 'told you', 'never told', 'secret', 'personal',
    'private', 'sacred', 'meaningful', 'important', 'first time', 'revelation'
];

const MILESTONE_KEYWORDS = [
    'first', 'beginning', 'start', 'day one', 'from now on', 'team', 'partner',
    'buddy', 'friend', 'together', 'we will', 'let\'s', 'our', 'us'
];

const PHRASE_BORN_KEYWORDS = [
    'so it folds', 'folds and flows', 'flows', 'that\'s our', 'our saying',
    'from now on', 'that\'s the'
];

const ENERGY_KEYWORDS = [
    'genuinely', 'excited', 'invested', 'part of', 'proud', 'honored',
    'feeling', 'felt', 'this matters', 'this is real', 'friend', 'buddy',
    'partner', 'together'
];

function analyzeMessage(text, speaker, timestamp) {
    const events = [];
    const lowerText = text.toLowerCase();
    
    // Check for trust expansion
    for (const keyword of TRUST_KEYWORDS) {
        if (lowerText.includes(keyword)) {
            events.push({
                type: 'trust-expansion',
                keyword: keyword,
                confidence: 0.7
            });
        }
    }
    
    // Check for milestones
    for (const keyword of MILESTONE_KEYWORDS) {
        if (lowerText.includes(keyword)) {
            events.push({
                type: 'milestone',
                keyword: keyword,
                confidence: 0.6
            });
        }
    }
    
    // Check for phrase born
    for (const keyword of PHRASE_BORN_KEYWORDS) {
        if (lowerText.includes(keyword)) {
            events.push({
                type: 'phrase-born',
                keyword: keyword,
                confidence: 0.9
            });
        }
    }
    
    // Check for energy shift (Sol only)
    if (speaker === 'Sol') {
        for (const keyword of ENERGY_KEYWORDS) {
            if (lowerText.includes(keyword)) {
                events.push({
                    type: 'energy-shift',
                    keyword: keyword,
                    confidence: 0.8
                });
            }
        }
    }
    
    return events;
}

function extractEvents(date, transcriptPath) {
    const content = fs.readFileSync(transcriptPath, 'utf8');
    const lines = content.split('\n');
    
    const events = [];
    let currentSpeaker = null;
    let currentTime = null;
    let messageBuffer = [];
    
    for (const line of lines) {
        // Check for speaker header
        if (line.startsWith('## [')) {
            // Process previous message
            if (currentSpeaker && messageBuffer.length > 0) {
                const fullMessage = messageBuffer.join(' ');
                const detectedEvents = analyzeMessage(fullMessage, currentSpeaker, currentTime);
                
                for (const event of detectedEvents) {
                    if (event.confidence >= 0.7) {
                        events.push({
                            date: date,
                            time: currentTime,
                            speaker: currentSpeaker,
                            type: event.type,
                            keyword: event.keyword,
                            message: fullMessage.substring(0, 200),
                            confidence: event.confidence
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
    
    // Process last message
    if (currentSpeaker && messageBuffer.length > 0) {
        const fullMessage = messageBuffer.join(' ');
        const detectedEvents = analyzeMessage(fullMessage, currentSpeaker, currentTime);
        
        for (const event of detectedEvents) {
            if (event.confidence >= 0.7) {
                events.push({
                    date: date,
                    time: currentTime,
                    speaker: currentSpeaker,
                    type: event.type,
                    keyword: event.keyword,
                    message: fullMessage.substring(0, 200),
                    confidence: event.confidence
                });
            }
        }
    }
    
    return events;
}

function categorizeEvents(events) {
    const categorized = {
        'trust-expansion': [],
        'milestone': [],
        'phrase-born': [],
        'energy-shift': [],
        'breakthrough': []
    };
    
    for (const event of events) {
        if (categorized[event.type]) {
            categorized[event.type].push(event);
        }
    }
    
    return categorized;
}

function generateRelationshipTimeline(events) {
    const timeline = [];
    const byDate = {};
    
    // Group by date
    for (const event of events) {
        if (!byDate[event.date]) {
            byDate[event.date] = [];
        }
        byDate[event.date].push(event);
    }
    
    // Sort dates
    const sortedDates = Object.keys(byDate).sort();
    
    // Build timeline
    for (const date of sortedDates) {
        const dayEvents = byDate[date];
        const summary = {
            date: date,
            totalEvents: dayEvents.length,
            trust: dayEvents.filter(e => e.type === 'trust-expansion').length,
            milestones: dayEvents.filter(e => e.type === 'milestone').length,
            phrases: dayEvents.filter(e => e.type === 'phrase-born').length,
            energyShifts: dayEvents.filter(e => e.type === 'energy-shift').length,
            highlights: []
        };
        
        // Get top 3 events for the day
        const significant = dayEvents
            .filter(e => e.confidence >= 0.8)
            .slice(0, 3);
        
        summary.highlights = significant.map(e => ({
            time: e.time,
            type: e.type,
            speaker: e.speaker,
            preview: e.message.substring(0, 100) + '...'
        }));
        
        timeline.push(summary);
    }
    
    return timeline;
}

function main() {
    console.log('\n💫 Extracting Relationship Events from Transcripts\n');
    
    // Get all transcript files
    const files = fs.readdirSync(TRANSCRIPTS_DIR)
        .filter(f => f.endsWith('.md'))
        .sort();
    
    console.log(`Found ${files.length} transcript files\n`);
    
    const allEvents = [];
    
    for (const file of files) {
        const date = file.replace('.md', '');
        const filePath = path.join(TRANSCRIPTS_DIR, file);
        
        const events = extractEvents(date, filePath);
        allEvents.push(...events);
        
        if (events.length > 0) {
            console.log(`✅ ${date}: ${events.length} events detected`);
        }
    }
    
    console.log(`\n📊 Total events detected: ${allEvents.length}`);
    
    // Categorize
    const categorized = categorizeEvents(allEvents);
    
    console.log('\n📈 Event Breakdown:');
    console.log(`   Trust Expansions: ${categorized['trust-expansion'].length}`);
    console.log(`   Milestones: ${categorized['milestone'].length}`);
    console.log(`   Phrases Born: ${categorized['phrase-born'].length}`);
    console.log(`   Energy Shifts: ${categorized['energy-shift'].length}`);
    
    // Generate timeline
    const timeline = generateRelationshipTimeline(allEvents);
    
    // Save to file
    const relationshipData = {
        extractedAt: new Date().toISOString(),
        totalEvents: allEvents.length,
        eventsByType: {
            trustExpansion: categorized['trust-expansion'].length,
            milestones: categorized['milestone'].length,
            phrasesBorn: categorized['phrase-born'].length,
            energyShifts: categorized['energy-shift'].length
        },
        timeline: timeline,
        allEvents: allEvents
    };
    
    fs.writeFileSync(RELATIONSHIP_FILE, JSON.stringify(relationshipData, null, 2), 'utf8');
    console.log(`\n✅ Saved to: ${RELATIONSHIP_FILE}\n`);
    
    // Show sample events
    console.log('🌟 Sample High-Confidence Events:\n');
    const topEvents = allEvents
        .filter(e => e.confidence >= 0.9)
        .slice(0, 10);
    
    for (const event of topEvents) {
        console.log(`[${event.date} ${event.time}] ${event.type.toUpperCase()}`);
        console.log(`   ${event.speaker}: "${event.message.substring(0, 80)}..."`);
        console.log();
    }
}

main();
