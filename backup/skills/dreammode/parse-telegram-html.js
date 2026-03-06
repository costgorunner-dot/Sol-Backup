#!/usr/bin/env node
/**
 * Parse Telegram HTML Export
 *
 * Extracts messages from Telegram HTML export files.
 * Handles both sides of conversation with proper names.
 */

const fs = require('fs');
const path = require('path');

function parseHTML(html) {
    const messages = [];

    // Split into message blocks
    const messageBlocks = html.split(/<div class="message default clearfix"/);

    let currentDate = '';

    for (const block of messageBlocks) {
        // Check if it's a date header
        if (block.includes('class="message service"')) {
            const dateMatch = block.match(/<div class="body details">\s*([^<]+)\s*<\/div>/);
            if (dateMatch) {
                currentDate = dateMatch[1].trim();
            }
            continue;
        }

        // Extract message data
        const fromNameMatch = block.match(/<div class="from_name">\s*([^<]+)\s*<\/div>/);
        const textMatch = block.match(/<div class="text">\s*([\s\S]*?)\s*<\/div>/);
        const dateMatch = block.match(/title="([^"]+)"/);

        if (textMatch) {
            let fromName = fromNameMatch ? fromNameMatch[1].trim() : 'KaMaeron-Tau';
            let text = textMatch[1].trim();
            let timestamp = dateMatch ? dateMatch[1] : '';

            // Clean up text (remove HTML tags)
            text = text.replace(/<[^>]*>/g, '').trim();

            // Normalize names
            if (fromName.includes('KaMaeron') || fromName === 'K') {
                fromName = 'KaMaeron-Tau';
            } else if (fromName.includes('Astra') || fromName.includes('Sol')) {
                fromName = 'Sol';
            }

            if (text) {
                messages.push({
                    date: currentDate,
                    timestamp: timestamp,
                    from: fromName,
                    text: text
                });
            }
        }
    }

    return messages;
}

function convertToTranscript(messages) {
    // Group by date
    const byDate = {};
    for (const msg of messages) {
        if (!byDate[msg.date]) {
            byDate[msg.date] = [];
        }
        byDate[msg.date].push(msg);
    }

    // Generate transcripts
    const transcripts = {};

    for (const [date, msgs] of Object.entries(byDate)) {
        // Convert date format (18 February 2026 -> 2026-02-18)
        const dateParts = date.match(/(\d+)\s+(\w+)\s+(\d+)/);
        if (dateParts) {
            const day = dateParts[1].padStart(2, '0');
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                               'July', 'August', 'September', 'October', 'November', 'December'];
            const month = (monthNames.indexOf(dateParts[2]) + 1).toString().padStart(2, '0');
            const year = dateParts[3];
            const isoDate = `${year}-${month}-${day}`;

            let markdown = `# Session Transcript - ${date}\n\n`;
            markdown += `**Date:** ${isoDate}\n`;
            markdown += `**Participants:** KaMaeron-Tau (user), Sol (assistant)\n`;
            markdown += `**Total Messages:** ${msgs.length}\n\n`;
            markdown += `---\n\n`;

            for (const msg of msgs) {
                // Extract time from timestamp
                const timeMatch = msg.timestamp.match(/(\d{2}\.\d{2}\.\d{4}\s+\d{2}:\d{2})/);
                const time = timeMatch ? timeMatch[1].split(' ')[1] : '??:??';

                markdown += `## [${time}] ${msg.from}\n`;
                markdown += `${msg.text}\n\n`;
            }

            markdown += `---\n\n`;
            markdown += `**Summary:**\n`;
            markdown += `- KaMaeron-Tau messages: ${msgs.filter(m => m.from === 'KaMaeron-Tau').length}\n`;
            markdown += `- Sol messages: ${msgs.filter(m => m.from === 'Sol').length}\n`;

            transcripts[isoDate] = markdown;
        }
    }

    return transcripts;
}

function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log('Usage: node parse-telegram-html.js <file.html>');
        process.exit(1);
    }

    const inputFile = args[0];
    console.log(`\n📖 Reading: ${inputFile}\n`);

    const html = fs.readFileSync(inputFile, 'utf8');
    const messages = parseHTML(html);

    console.log(`✅ Parsed ${messages.length} messages`);

    // Show first few messages as sample
    console.log(`\n📝 First 5 messages:`);
    messages.slice(0, 5).forEach(msg => {
        console.log(`   [${msg.date}] ${msg.from}: ${msg.text.substring(0, 50)}...`);
    });

    // Convert to transcripts
    const transcripts = convertToTranscript(messages);
    const dates = Object.keys(transcripts).sort();

    console.log(`\n📅 Found ${dates.length} days of conversations:`);
    dates.forEach(date => {
        const msgCount = transcripts[date].split('\n').filter(l => l.startsWith('## [')).length;
        console.log(`   ${date}: ${msgCount} messages`);
    });

    // Save transcripts
    const outputDir = path.join(process.env.HOME, '.openclaw', 'workspace', 'memory', 'transcripts');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const [date, markdown] of Object.entries(transcripts)) {
        const outputPath = path.join(outputDir, `${date}.md`);
        fs.writeFileSync(outputPath, markdown, 'utf8');
        console.log(`   ✅ Saved: ${outputPath}`);
    }

    console.log(`\n✅ Complete! ${dates.length} transcripts created.\n`);
}

main();
