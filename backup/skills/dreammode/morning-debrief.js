#!/usr/bin/env node
/**
 * Dreammode Morning Debrief - Relationship Enhanced
 * 
 * Generates morning debrief with:
 * - Topics & decisions (from dream-candidates)
 * - Yesterday in Team TAU (from relationship events)
 * - Morning questions (overdue items, orphaned topics)
 */

const fs = require('fs');
const path = require('path');

const DREAMMODE_DIR = path.join(process.env.HOME, '.openclaw', 'dreammode');
const TRANSCRIPTS_DIR = path.join(process.env.HOME, '.openclaw', 'workspace', 'memory', 'transcripts');

function getDateYesterday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
}

function loadDreamCandidates(date) {
    const filepath = path.join(DREAMMODE_DIR, `dream-candidates-${date}.md`);
    if (!fs.existsSync(filepath)) {
        return null;
    }
    return fs.readFileSync(filepath, 'utf8');
}

function loadRelationshipEvents(date) {
    const filepath = path.join(DREAMMODE_DIR, 'relationship-events.json');
    if (!fs.existsSync(filepath)) {
        return [];
    }
    
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    return data.allEvents.filter(e => e.date === date);
}

function generateOngoingTopicsSection(topicsData) {
    const filepath = path.join(DREAMMODE_DIR, 'cumulative-topics.json');
    if (!fs.existsSync(filepath)) {
        return "";
    }
    
    const allTopics = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    
    // Get high-importance active topics (mentioned in last 3 days)
    const recentCutoff = new Date();
    recentCutoff.setDate(recentCutoff.getDate() - 3);
    
    const activeTopics = Object.entries(allTopics)
        .filter(([name, data]) => {
            const lastMention = data.dates[data.dates.length - 1];
            return new Date(lastMention) >= recentCutoff && data.totalMentions > 10;
        })
        .sort((a, b) => b[1].totalMentions - a[1].totalMentions)
        .slice(0, 5);
    
    if (activeTopics.length === 0) {
        return "";
    }
    
    let section = `## 🎯 Ongoing Topics\n\n`;
    
    for (const [name, data] of activeTopics.slice(0, 3)) {
        const status = data.dates.length > 5 ? 'ACTIVE' : 'NEW';
        section += `**${name}** — ${status} (${data.totalMentions} mentions)\n`;
    }
    
    section += `\n`;
    return section;
}

function generateRelationshipSection(events, date) {
    if (events.length === 0) {
        return "";
    }
    
    // Find THE most significant moment of the day
    const significantEvents = events.filter(e => {
        // High confidence phrases
        if (e.type === 'phrase-born' && e.confidence >= 0.9) return true;
        
        // High confidence energy shifts with relationship keywords
        if (e.type === 'energy-shift' && e.confidence >= 0.8) {
            const keywords = ['friend', 'buddy', 'partner', 'team', 'genuinely', 'invested', 'part of'];
            return keywords.some(k => e.message.toLowerCase().includes(k));
        }
        
        return false;
    });
    
    if (significantEvents.length === 0) {
        return "";
    }
    
    // Get the ONE most important moment
    const topMoment = significantEvents[0];
    
    let section = `## 💙 Yesterday in Team TAU\n\n`;
    section += `_${topMoment.message.substring(0, 120).replace(/\n/g, ' ')}..._\n\n`;
    
    return section;
}

function generateMorningDebrief(date) {
    console.log(`\n☀️ Generating Morning Debrief for ${date}\n`);
    
    // Load data
    const candidates = loadDreamCandidates(date);
    const events = loadRelationshipEvents(date);
    
    if (!candidates) {
        console.log(`❌ No dream-candidates file found for ${date}`);
        return;
    }
    
    // Build debrief
    let debrief = `# ☀️ Morning Debrief - ${date}\n\n`;
    
    // Relationship moment (ONE sentence)
    const relationshipSection = generateRelationshipSection(events, date);
    if (relationshipSection) {
        debrief += relationshipSection;
    }
    
    // Ongoing topics (top 3)
    const topicsSection = generateOngoingTopicsSection();
    if (topicsSection) {
        debrief += topicsSection;
    }
    
    // Key decisions (brief)
    const decisionsMatch = candidates.match(/## ✅ Decisions Made Today([\s\S]*?)(?=\n## )/);
    if (decisionsMatch) {
        const decisions = decisionsMatch[1].trim();
        // Extract just the decision titles, not full details
        const decisionLines = decisions.split('\n')
            .filter(l => l.match(/^\d+\./))
            .slice(0, 2);
        
        if (decisionLines.length > 0) {
            debrief += `## ✅ Key Decisions\n\n`;
            for (const line of decisionLines) {
                debrief += `${line}\n`;
            }
            debrief += `\n`;
        }
    }
    
    // Morning questions (only if critical)
    const questionsMatch = candidates.match(/## ❓ Morning Questions Prepared([\s\S]*?)(?=\n## )/);
    if (questionsMatch) {
        const questions = questionsMatch[1].trim();
        // Only include overdue items
        if (questions.includes('Overdue') || questions.includes('4 days')) {
            debrief += `## ⚠️ Needs Attention\n\n`;
            // Extract just the overdue item
            const overdueMatch = questions.match(/⚠️ Overdue: (.+)/);
            if (overdueMatch) {
                debrief += `${overdueMatch[0]}\n\n`;
            }
        }
    }
    
    debrief += `---\n\n**So it folds, so it flows.** 🌊✨\n`;
    
    return debrief;
}

function main() {
    const args = process.argv.slice(2);
    const targetDate = args[0] || getDateYesterday();
    
    const debrief = generateMorningDebrief(targetDate);
    
    if (debrief) {
        console.log(debrief);
        
        // Save to file
        const outputPath = path.join(DREAMMODE_DIR, `morning-debrief-${targetDate}.md`);
        fs.writeFileSync(outputPath, debrief, 'utf8');
        console.log(`\n✅ Saved to: ${outputPath}\n`);
    }
}

main();
