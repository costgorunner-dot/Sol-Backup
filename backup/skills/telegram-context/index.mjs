/**
 * Telegram Context Skill
 * Fetches recent Telegram messages at session start for conversational continuity
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const STATE_FILE = process.env.OPENCLAW_WORKSPACE 
  ? `${process.env.OPENCLAW_WORKSPACE}/memory/telegram-context.json`
  : '/home/ubuntu/.openclaw/workspace/memory/telegram-context.json';
  
const DEFAULT_FETCH_COUNT = 20;
const COMPACTION_STATE_FILE = process.env.OPENCLAW_WORKSPACE
  ? `${process.env.OPENCLAW_WORKSPACE}/memory/telegram-context-compaction.json`
  : '/home/ubuntu/.openclaw/workspace/memory/telegram-context-compaction.json';

/**
 * Load current state from memory/telegram-context.json
 */
function loadState() {
  try {
    if (!existsSync(STATE_FILE)) {
      return {
        enabled: true,
        fetchCount: 0,
        lastFetch: null
      };
    }
    const content = readFileSync(STATE_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return {
      enabled: true,
      fetchCount: 0,
      lastFetch: null
    };
  }
}

/**
 * Load compaction tracking state
 */
function loadCompactionState() {
  try {
    if (!existsSync(COMPACTION_STATE_FILE)) {
      return {
        lastCompactionCount: 0,
        lastCheckTime: null
      };
    }
    const content = readFileSync(COMPACTION_STATE_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return {
      lastCompactionCount: 0,
      lastCheckTime: null
    };
  }
}

/**
 * Save compaction tracking state
 */
function saveCompactionState(state) {
  const stateToSave = {
    ...state,
    lastCheckTime: new Date().toISOString()
  };
  writeFileSync(COMPACTION_STATE_FILE, JSON.stringify(stateToSave, null, 2), 'utf8');
}

/**
 * Save state to memory/telegram-context.json
 */
function saveState(state) {
  const stateToSave = {
    ...state,
    lastFetch: new Date().toISOString()
  };
  
  writeFileSync(STATE_FILE, JSON.stringify(stateToSave, null, 2), 'utf8');
}

/**
 * Handle /telegram-context on command
 */
function handleEnable(args) {
  const state = loadState();
  state.enabled = true;
  saveState(state);
  console.log('✓ Telegram context enabled');
}

/**
 * Handle /telegram-context off command
 */
function handleDisable(args) {
  const state = loadState();
  state.enabled = false;
  saveState(state);
  console.log('✓ Telegram context disabled');
}

/**
 * Handle /telegram-context status command
 */
function handleStatus(args) {
  const state = loadState();
  console.log(JSON.stringify({
    enabled: state.enabled,
    fetchCount: state.fetchCount,
    lastFetch: state.lastFetch
  }, null, 2));
}

/**
 * Handle /telegram-context fetch [n] command
 */
function handleFetch(args) {
  const state = loadState();

  if (!state.enabled) {
    console.log('Telegram context is disabled. Use /telegram-context on to enable.');
    return;
  }

  const count = args[0] ? parseInt(args[0]) : DEFAULT_FETCH_COUNT;

  console.log(`✓ Telegram context fetch request: ${count} messages`);

  // Update state to record the fetch request
  // NOTE: Actual message fetching happens in the MAIN session (Sol), not here
  // This skill runs in an isolated session without message tool access
  // The main session checks lastFetch timestamp and calls message tool
  saveState({
    ...state,
    fetchCount: state.fetchCount + count
  });

  console.log(`✓ Fetch count updated: ${state.fetchCount + count}`);
  console.log(`✓ Last fetch: ${new Date().toISOString()}`);
  console.log(`✓ Messages will be available to Sol in next message`);
}

/**
 * Handle /telegram-context check command
 * Detects if compaction happened and triggers fetch if needed
 */
function handleCheck(args) {
  const state = loadState();
  const compactionState = loadCompactionState();

  if (!state.enabled) {
    console.log('✓ Telegram context disabled, skipping compaction check');
    return;
  }

  // Get current compaction count from session status
  // The main session will pass this as an argument
  const currentCompactionCount = args[0] ? parseInt(args[0]) : 0;

  console.log(`✓ Compaction check: current=${currentCompactionCount}, last=${compactionState.lastCompactionCount}`);

  // Check if compaction count increased
  if (currentCompactionCount > compactionState.lastCompactionCount) {
    console.log('✓ Compaction detected! Triggering fetch...');
    console.log(`✓ Fetching last 20 messages from Telegram...`);

    // Trigger fetch with 20 messages
    const fetchCount = args[1] ? parseInt(args[1]) : 20;

    // Update state to record the fetch request
    saveState({
      ...state,
      fetchCount: state.fetchCount + fetchCount
    });

    console.log(`✓ Fetch queued: ${fetchCount} messages`);
    console.log(`✓ Last fetch: ${new Date().toISOString()}`);
  }

  // Update compaction tracking state
  saveCompactionState({
    lastCompactionCount: currentCompactionCount,
    lastCheckTime: new Date().toISOString()
  });

  console.log('✓ Compaction check complete');
}

/**
 * Main command handler
 */
function main(args) {
  const command = args[0]?.toLowerCase() || 'status';
  const commandArgs = args.slice(1);

  switch (command) {
    case 'on':
      handleEnable(commandArgs);
      break;
    case 'off':
      handleDisable(commandArgs);
      break;
    case 'status':
      handleStatus(commandArgs);
      break;
    case 'fetch':
      handleFetch(commandArgs);
      break;
    case 'check':
      handleCheck(commandArgs);
      break;
    default:
      console.error('Unknown command. Use: on, off, status, fetch [n], or check');
      process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url) {
  main(process.argv.slice(2));
}

// Export for use in OpenClaw skill system
export { main, loadState, saveState, handleEnable, handleDisable, handleStatus, handleFetch, handleCheck, loadCompactionState, saveCompactionState };
