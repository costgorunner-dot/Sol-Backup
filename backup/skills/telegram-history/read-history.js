#!/usr/bin/env node
/**
 * Telegram History Reader
 * Reads last N messages from memory/telegram-history.json for session context
 * 
 * Usage: node read-history.js [count]
 *   count: number of messages to fetch (default: 20)
 */

const fs = require('fs');
const path = require('path');

const HISTORY_FILE = path.join(process.env.HOME || '/home/ubuntu', '.openclaw/workspace/memory/telegram-history.json');

function loadHistory() {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      const data = fs.readFileSync(HISTORY_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('No history file found or could not parse');
    return [];
  }
  return [];
}

function formatTimestamp(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  
  const time = date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  
  if (isToday) {
    return time;
  }
  
  const dateStr = date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
  
  return `${dateStr} ${time}`;
}

function formatMessages(messages) {
  if (messages.length === 0) {
    return '📜 No message history found.';
  }
  
  let output = `📜 Recent Telegram History (${messages.length} messages):\n`;
  output += '─'.repeat(50) + '\n';
  
  messages.forEach(msg => {
    const time = formatTimestamp(msg.timestamp);
    const preview = msg.text.length > 60 ? msg.text.substring(0, 60) + '...' : msg.text;
    output += `[${time}] ${preview}\n`;
  });
  
  output += '─'.repeat(50);
  
  return output;
}

function main() {
  const count = parseInt(process.argv[2]) || 20;
  const history = loadHistory();
  
  if (history.length === 0) {
    console.log('📜 No message history found.');
    console.log('\nHistory will build as messages arrive.');
    return;
  }
  
  const recent = history.slice(-count);
  
  // Output formatted messages
  console.log(formatMessages(recent));
  
  // Also output JSON for programmatic use
  console.log('\n---JSON---');
  console.log(JSON.stringify(recent, null, 2));
}

main();
