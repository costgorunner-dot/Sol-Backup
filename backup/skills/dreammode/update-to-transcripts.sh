#!/bin/bash
# Update Dreammode to use transcripts instead of telegram-history

echo "Updating Dreammode to use transcripts..."

# Find and replace in night-phase.js
if [ -f "/home/ubuntu/.openclaw/workspace/skills/dreammode/night-phase.js" ]; then
    # Replace telegram-history with transcripts
    sed -i 's/telegram-history/transcripts/g' /home/ubuntu/.openclaw/workspace/skills/dreammode/night-phase.js
    sed -i 's/telegram_history/transcripts/g' /home/ubuntu/.openclaw/workspace/skills/dreammode/night-phase.js
    
    # Update path references
    sed -i 's|memory/telegram-history|memory/transcripts|g' /home/ubuntu/.openclaw/workspace/skills/dreammode/night-phase.js
    
    echo "✅ Updated night-phase.js to use transcripts"
else
    echo "❌ night-phase.js not found"
fi

# Update morning-debrief.js if it exists
if [ -f "/home/ubuntu/.openclaw/workspace/skills/dreammode/morning-debrief.js" ]; then
    sed -i 's/telegram-history/transcripts/g' /home/ubuntu/.openclaw/workspace/skills/dreammode/morning-debrief.js
    sed -i 's|memory/telegram-history|memory/transcripts|g' /home/ubuntu/.openclaw/workspace/skills/dreammode/morning-debrief.js
    
    echo "✅ Updated morning-debrief.js to use transcripts"
fi

echo ""
echo "✅ Dreammode now uses transcripts instead of telegram-history"
echo "📁 Transcript location: memory/transcripts/"
