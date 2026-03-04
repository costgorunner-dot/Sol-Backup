#!/usr/bin/env node
/**
 * Telegram Message Logger
 * Appends incoming Telegram messages to memory/telegram-history.json
 * 
 * Usage: node log-message.js <messageId> <sender> <text> [timestamp]
 * 
 * Or pipe JSON: echo '{"messageId":"123","sender":"456","text":"hi"}' | node log-message.js
 */

const fs = require('fs');
const path = require('path');

const HISTORY_FILE = path.join(process.env.HOME || '/home/ubuntu', '.openclaw/workspace/memory/telegram-history.json');
const MAX_MESSAGES = 1000;

function parseArgs() {
  // Check if stdin has data
  if (process.argv.length === 2 && !process.stdin.isTTY) {
    // Read from stdin
    let data = '';
    return new Promise((resolve) => {
      process.stdin.on('data', chunk => data += chunk);
      process.stdin.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          console.error('Failed to parse stdin JSON:', e.message);
          process.exit(1);
        }
      });
    });
  }
  
  // Parse command line args
  if (process.argv.length < 5) {
    console.error('Usage: node log-message.js <messageId> <sender> <text> [timestamp]');
    console.error('   or: echo \'{"messageId":"123","sender":"456","text":"hi"}\' | node log-message.js');
    process.exit(1);
  }
  
  return Promise.resolve({
    messageId: process.argv[2],
    sender: process.argv[3],
    text: process.argv[4],
    timestamp: process.argv[5] || new Date().toISOString()
  });
}

function loadHistory() {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      const data = fs.readFileSync(HISTORY_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Warning: Could not load history, starting fresh:', e.message);
  }
  return [];
}

function saveHistory(history) {
  // Ensure directory exists
  const dir = path.dirname(HISTORY_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Trim to max messages
  if (history.length > MAX_MESSAGES) {
    history = history.slice(-MAX_MESSAGES);
  }
  
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
  console.log(`✅ Logged message ${history[history.length - 1].messageId} (${history.length} total)`);
}

async function main() {
  const message = await parseArgs();
  
  // Add timestamp if not provided
  if (!message.timestamp) {
    message.timestamp = new Date().toISOString();
  }
  
  // Add chatId if not provided (assume same as sender for DMs)
  if (!message.chatId) {
    message.chatId = message.sender;
  }
  
  // Load existing history
  const history = loadHistory();
  
  // Check for duplicates
  const exists = history.some(m => m.messageId === message.messageId);
  if (exists) {
    console.log(`⚠️  Message ${message.messageId} already logged, skipping`);
    return;
  }
  
  // Append new message
  history.push(message);
  
  // Save
  saveHistory(history);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
