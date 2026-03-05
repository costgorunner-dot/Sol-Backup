#!/usr/bin/env node
/**
 * Night Phase Processing for Dream Mode
 * Processes evening/night session summaries and prepares for next day
 */

const fs = require('fs');
const path = require('path');

// Get the workspace directory from environment or default
const workspaceDir = process.env.WORKSPACE || '/home/ubuntu/.openclaw/workspace';
const memoryDir = path.join(workspaceDir, 'memory');

function main() {
  console.log('Night Phase Processing');
  console.log('======================');
  
  // Get current date
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  
  console.log('Processing for date:', dateStr);
  
  // Check for any pending summaries or loose ends
  const transcriptsDir = path.join(workspaceDir, 'transcripts');
  if (fs.existsSync(transcriptsDir)) {
    const files = fs.readdirSync(transcriptsDir);
    const todayFiles = files.filter(f => f.includes(dateStr));
    console.log('Found', todayFiles.length, 'transcript files for today');
  }
  
  // Create a night-phase marker
  const markerPath = path.join(workspaceDir, '.night-phase-complete');
  fs.writeFileSync(markerPath, 'Night phase completed at ' + now.toISOString() + '\n');
  
  console.log('Night phase processing complete');
  return 0;
}

// Run if executed directly
if (require.main === module) {
  process.exit(main());
}

module.exports = { main };
