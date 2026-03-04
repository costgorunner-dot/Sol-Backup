#!/usr/bin/env node
/**
 * Smart Dreammode - Adaptive Memory Protection
 * 
 * Checks context level and runs Dreammode BEFORE compaction happens
 * - If context > 75%: Run NOW (emergency save)
 * - If context < 75%: Wait for scheduled time
 * 
 * Usage:
 *   node smart-dreammode.js [--force]
 * 
 * Options:
 *   --force  Run regardless of context level
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG = {
  contextThreshold: 75, // Run immediately if context > this percentage
  scheduledHour: 23,    // Scheduled time: 11 PM (23:00)
  scheduledMinute: 45,  // 11:45 PM
  logFile: path.join(process.env.HOME, '.openclaw', 'dreammode', 'smart-dreammode.log'),
  dreammodeScript: path.join(__dirname, 'night-phase.js')
};

function log(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  console.log(message);
  fs.appendFileSync(CONFIG.logFile, logEntry);
}

function getContextLevel() {
  try {
    // Method 1: Check OpenClaw status command
    try {
      const statusResult = execSync('openclaw status 2>&1 | grep -i context', { encoding: 'utf8', timeout: 5000 });
      const match = statusResult.match(/(\d+)%/);
      if (match) {
        return parseInt(match[1]);
      }
    } catch (e) {
      // Method 1 failed, try Method 2
    }
    
    // Method 2: Check session file for context info
    const sessionFile = path.join(process.env.HOME, '.openclaw', 'agents', 'main', 'sessions', 'current-session.json');
    if (fs.existsSync(sessionFile)) {
      const sessionData = JSON.parse(fs.readFileSync(sessionFile, 'utf8'));
      if (sessionData.contextPercent !== undefined) {
        return sessionData.contextPercent;
      }
    }
    
    // Method 3: Estimate from session history size
    const historyFile = path.join(process.env.HOME, '.openclaw', 'agents', 'main', 'sessions', 'history.jsonl');
    if (fs.existsSync(historyFile)) {
      const stats = fs.statSync(historyFile);
      const sizeKB = stats.size / 1024;
      // Rough estimate: 100KB ≈ 50% context
      const estimatedPercent = Math.round((sizeKB / 200) * 100);
      return Math.min(estimatedPercent, 100);
    }
    
    log('⚠️ Could not determine context level, assuming safe (50%)');
    return 50; // Default to safe level
  } catch (error) {
    log(`⚠️ Error checking context level: ${error.message}`);
    return 50; // Default to safe level
  }
}

function isScheduledTime() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  return currentHour === CONFIG.scheduledHour && 
         currentMinute >= CONFIG.scheduledMinute && 
         currentMinute < CONFIG.scheduledMinute + 15;
}

function getMinutesUntilScheduled() {
  const now = new Date();
  const scheduled = new Date();
  scheduled.setHours(CONFIG.scheduledHour, CONFIG.scheduledMinute, 0, 0);
  
  if (scheduled <= now) {
    scheduled.setDate(scheduled.getDate() + 1);
  }
  
  return Math.round((scheduled - now) / 1000 / 60);
}

function runDreammode(reason) {
  log(`🚀 Running Dreammode NOW (${reason})`);
  
  try {
    // Check if dreammode script exists
    if (!fs.existsSync(CONFIG.dreammodeScript)) {
      log(`❌ Dreammode script not found: ${CONFIG.dreammodeScript}`);
      log('ℹ️ Creating memory backup instead...');
      
      // Fallback: Create emergency memory backup
      const today = new Date().toISOString().split('T')[0];
      const memoryFile = path.join(process.env.HOME, '.openclaw', 'workspace', 'memory', `${today}.md`);
      const backupFile = path.join(process.env.HOME, '.openclaw', 'dreammode', `emergency-backup-${today}.md`);
      
      if (fs.existsSync(memoryFile)) {
        fs.copyFileSync(memoryFile, backupFile);
        log(`✅ Emergency backup created: ${backupFile}`);
      } else {
        log(`⚠️ No memory file found for today: ${memoryFile}`);
      }
      
      return;
    }
    
    // Run the actual dreammode script
    require(CONFIG.dreammodeScript);
    log('✅ Dreammode completed successfully');
  } catch (error) {
    log(`❌ Dreammode failed: ${error.message}`);
    
    // Create emergency backup on failure
    const today = new Date().toISOString().split('T')[0];
    const memoryFile = path.join(process.env.HOME, '.openclaw', 'workspace', 'memory', `${today}.md`);
    const backupFile = path.join(process.env.HOME, '.openclaw', 'dreammode', `emergency-backup-${today}.md`);
    
    if (fs.existsSync(memoryFile)) {
      fs.copyFileSync(memoryFile, backupFile);
      log(`✅ Emergency backup created: ${backupFile}`);
    }
  }
}

function main() {
  const args = process.argv.slice(2);
  const forceRun = args.includes('--force');
  
  log('═══════════════════════════════════════');
  log('🌙 Smart Dreammode - Context Check');
  log('═══════════════════════════════════════');
  
  // Check if forced
  if (forceRun) {
    log('⚡ Force mode enabled - running regardless of context');
    runDreammode('forced run');
    return;
  }
  
  // Get current context level
  const contextLevel = getContextLevel();
  log(`📊 Current context level: ${contextLevel}%`);
  
  // Decision logic
  if (contextLevel >= CONFIG.contextThreshold) {
    log(`⚠️ Context HIGH (${contextLevel}% >= ${CONFIG.contextThreshold}%)`);
    runDreammode(`emergency - context at ${contextLevel}%`);
  } else if (isScheduledTime()) {
    log(`⏰ Scheduled time reached (${CONFIG.scheduledHour}:${CONFIG.scheduledMinute})`);
    runDreammode('scheduled time');
  } else {
    const minutesUntil = getMinutesUntilScheduled();
    log(`✅ Context safe (${contextLevel}% < ${CONFIG.contextThreshold}%)`);
    log(`⏰ Waiting for scheduled time (in ${minutesUntil} minutes)`);
    log('ℹ️ No action needed now');
  }
  
  log('═══════════════════════════════════════');
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { getContextLevel, runDreammode };
