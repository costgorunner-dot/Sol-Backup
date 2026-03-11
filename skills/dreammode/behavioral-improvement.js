#!/usr/bin/env node
/**
 * Behavioral Improvement Module for Dreammode
 * Detects patterns in mistakes and suggests rule improvements
 */

const fs = require('fs');
const path = require('path');

const DREAMMODE_DIR = path.join(process.env.HOME, '.openclaw', 'dreammode');
const BEHAVIOR_FILE = path.join(DREAMMODE_DIR, 'behavior-patterns.json');
const SOUL_FILE = path.join(process.env.HOME, '.openclaw', 'workspace', 'SOUL.md');

// Initialize behavior tracking
function initBehaviorTracking() {
  if (!fs.existsSync(DREAMMODE_DIR)) {
    fs.mkdirSync(DREAMMODE_DIR, { recursive: true });
  }
  
  if (!fs.existsSync(BEHAVIOR_FILE)) {
    fs.writeFileSync(BEHAVIOR_FILE, JSON.stringify({
      mistakes: [],
      suggestions: [],
      lastCheck: null
    }, null, 2));
  }
}

// Load behavior data
function loadBehaviorData() {
  try {
    return JSON.parse(fs.readFileSync(BEHAVIOR_FILE, 'utf8'));
  } catch {
    return { mistakes: [], suggestions: [], lastCheck: null };
  }
}

// Save behavior data
function saveBehaviorData(data) {
  fs.writeFileSync(BEHAVIOR_FILE, JSON.stringify(data, null, 2));
}

// Record a mistake
function recordMistake(mistake) {
  const data = loadBehaviorData();
  data.mistakes.push({
    date: new Date().toISOString(),
    type: mistake.type, // 'delete_without_asking', 'config_change', 'skipped_step'
    description: mistake.description,
    context: mistake.context || ''
  });
  
  // Keep last 100 mistakes
  if (data.mistakes.length > 100) {
    data.mistakes = data.mistakes.slice(-100);
  }
  
  saveBehaviorData(data);
  return detectPatterns(data);
}

// Detect patterns in mistakes
function detectPatterns(data) {
  const patterns = {};
  
  data.mistakes.forEach(m => {
    const key = m.type;
    if (!patterns[key]) {
      patterns[key] = { count: 0, examples: [] };
    }
    patterns[key].count++;
    if (patterns[key].examples.length < 3) {
      patterns[key].examples.push(m.description);
    }
  });
  
  // Find patterns that occurred 3+ times
  const alerts = [];
  Object.entries(patterns).forEach(([type, data]) => {
    if (data.count >= 3) {
      alerts.push({
        type,
        count: data.count,
        examples: data.examples,
        suggestion: generateSuggestion(type)
      });
    }
  });
  
  return alerts;
}

// Generate rule suggestion based on mistake type
function generateSuggestion(mistakeType) {
  const suggestions = {
    'delete_without_asking': {
      rule: 'Always ask before deleting ANY file or accepting any git deletion',
      addTo: 'SOUL.md',
      section: 'Safety-First Experimentation'
    },
    'config_change': {
      rule: 'Always backup config before editing and show diff for approval',
      addTo: 'SOUL.md',
      section: 'Yellow Light (Ask first)'
    },
    'skipped_step': {
      rule: 'Execute in steps - confirm each step before moving to next',
      addTo: 'SOUL.md',
      section: 'Execute in Steps'
    },
    'assumed_intent': {
      rule: 'Never assume intent - ask for clarification when uncertain',
      addTo: 'SOUL.md',
      section: 'No Creative Interpretation'
    },
    'forgot_commitment': {
      rule: 'Always confirm task completion - human cannot see your actions',
      addTo: 'SOUL.md',
      section: 'Task Completion Protocol'
    }
  };
  
  return suggestions[mistakeType] || null;
}

// Generate morning debrief section for behavioral patterns
function generateBehaviorSection() {
  const data = loadBehaviorData();
  const alerts = detectPatterns(data);
  
  if (alerts.length === 0) {
    return null; // No behavioral issues detected
  }
  
  let section = '\n## ⚠️ Behavioral Patterns Detected\n\n';
  
  alerts.forEach(alert => {
    section += `**${alert.type}** (${alert.count} times this week)\n`;
    section += `Examples:\n`;
    alert.examples.forEach(ex => {
      section += `  - ${ex}\n`;
    });
    
    if (alert.suggestion) {
      section += `\n💡 **Suggested Rule Addition to ${alert.suggestion.addTo}:**\n`;
      section += `> ${alert.suggestion.rule}\n`;
      section += `(Section: ${alert.suggestion.section})\n`;
    }
    section += '\n';
  });
  
  return section;
}

// Mark suggestion as applied
function markSuggestionApplied(suggestionType) {
  const data = loadBehaviorData();
  data.suggestions.push({
    type: suggestionType,
    appliedAt: new Date().toISOString()
  });
  saveBehaviorData(data);
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  
  initBehaviorTracking();
  
  switch (command) {
    case 'record':
      const mistake = {
        type: args[1],
        description: args[2],
        context: args[3] || ''
      };
      const alerts = recordMistake(mistake);
      if (alerts.length > 0) {
        console.log(JSON.stringify(alerts, null, 2));
      }
      break;
      
    case 'check':
      const section = generateBehaviorSection();
      if (section) {
        console.log(section);
      } else {
        console.log('No behavioral patterns detected.');
      }
      break;
      
    case 'applied':
      markSuggestionApplied(args[1]);
      console.log(`Marked ${args[1]} as applied.`);
      break;
      
    default:
      console.log('Usage:');
      console.log('  node behavioral-improvement.js record <type> <description> [context]');
      console.log('  node behavioral-improvement.js check');
      console.log('  node behavioral-improvement.js applied <type>');
  }
}

module.exports = {
  initBehaviorTracking,
  recordMistake,
  detectPatterns,
  generateBehaviorSection,
  markSuggestionApplied
};
