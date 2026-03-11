#!/usr/bin/env node
/**
 * Parse Telegram HTML chat exports into markdown transcripts
 */

const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2];
const outputDir = process.argv[3] || './';

if (!inputFile || !fs.existsSync(inputFile)) {
  console.log('Usage: node parse-telegram-html.js <input.html> [output-dir]');
  process.exit(1);
}

console.log(`Parsing: ${inputFile}`);
console.log(`Output: ${outputDir}`);

// Read HTML file
const html = fs.readFileSync(inputFile, 'utf8');
console.log(`File size: ${html.length} chars`);

// Extract messages using regex
const messages = [];

// Track current sender from previous message
let currentSender = null;

// Match message blocks - capture from opening div to matching closing div
// We'll find each message start and parse its content
const messageStartPattern = /<div class="message default[^"]*"[^>]*>/g;
let match;

while ((match = messageStartPattern.exec(html)) !== null) {
  const startPos = match.index;
  
  // Find the end of this message block by matching the same number of opening/closing divs
  let depth = 1;
  let pos = startPos + match[0].length;
  const divOpenPattern = /<div[^>]*>/g;
  const divClosePattern = /<\/div>/g;
  
  divOpenPattern.lastIndex = pos;
  divClosePattern.lastIndex = pos;
  
  while (depth > 0 && pos < html.length) {
    const openMatch = divOpenPattern.exec(html);
    const closeMatch = divClosePattern.exec(html);
    
    if (closeMatch && (!openMatch || closeMatch.index < openMatch.index)) {
      // Found closing div first
      depth--;
      pos = closeMatch.index + closeMatch[0].length;
      divOpenPattern.lastIndex = pos;
      divClosePattern.lastIndex = pos;
    } else if (openMatch) {
      // Found opening div first
      depth++;
      pos = openMatch.index + openMatch[0].length;
      divClosePattern.lastIndex = pos;
    } else {
      // No more divs, break
      break;
    }
  }
  
  const block = html.substring(startPos + match[0].length, pos);
  
  // Extract from_name (if present)
  const fromMatch = block.match(/<div class="from_name"[^>]*>([^<]+)<\/div>/);
  if (fromMatch) {
    currentSender = fromMatch[1].trim();
  }
  
  // Extract text
  const textMatch = block.match(/<div class="text"[^>]*>([\s\S]*?)<\/div>/);
  let text = '';
  if (textMatch) {
    text = textMatch[1]
      .replace(/<br\s*\/?>/g, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
  }
  
  // Extract date/time from title attribute
  const timeMatch = block.match(/title="(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2}):\d{2}(?: [A-Z]+[-+]\d{2}:\d{2})?"/);
  let dateStr = '';
  let timeStr = '';
  if (timeMatch) {
    dateStr = `${timeMatch[3]}-${timeMatch[2]}-${timeMatch[1]}`;
    timeStr = `${timeMatch[4]}:${timeMatch[5]}`;
  }
  
  if (text && currentSender) {
    messages.push({ from: currentSender, text, date: dateStr, time: timeStr });
  }
}

console.log(`Found ${messages.length} messages`);

// Group by date
const byDate = {};
messages.forEach(msg => {
  if (!msg.date) return;
  if (!byDate[msg.date]) {
    byDate[msg.date] = [];
  }
  byDate[msg.date].push(msg);
});

console.log(`Grouped into ${Object.keys(byDate).length} dates`);

// Write transcripts
const datesWritten = [];
Object.entries(byDate).forEach(([date, msgs]) => {
  if (msgs.length === 0) return;
  
  const outputFile = path.join(outputDir, `${date}.md`);
  
  // Convert date format for header (2026-02-18 -> February 18, 2026)
  // Avoid timezone issues by parsing manually
  const [year, month, day] = date.split('-');
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const monthName = monthNames[parseInt(month) - 1];
  const dayNum = parseInt(day);
  const dateObj = new Date(parseInt(year), parseInt(month) - 1, dayNum);
  const headerDate = `${dateObj.toLocaleDateString('en-US', { weekday: 'long' })}, ${monthName} ${dayNum}, ${year}`;
  
  let md = `# ${headerDate}\n\n`;
  md += `**Participants:** KaMaeron-Tau + Sol\n`;
  md += `**Messages:** ${msgs.length}\n\n---\n\n`;
  
  msgs.forEach(msg => {
    const time = msg.time || '00:00';
    md += `## [${time}] ${msg.from}\n${msg.text}\n\n`;
  });
  
  fs.writeFileSync(outputFile, md);
  datesWritten.push(date);
});

console.log(`Created ${datesWritten.length} transcript files`);
datesWritten.sort().forEach(d => console.log(`  - ${d}`));
