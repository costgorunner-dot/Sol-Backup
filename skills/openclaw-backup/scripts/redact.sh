#!/bin/bash
# Redact sensitive data from files
# Used by backup script to ensure no API keys are committed

# Patterns to redact
PATTERNS=(
    "sk-or-v1-[a-zA-Z0-9]*:INSERT_OPENROUTER_API_KEY_HERE"
    "tvly-dev-[a-zA-Z0-9]*:INSERT_TAVILY_API_KEY_HERE"
    "ghp_[a-zA-Z0-9]*:INSERT_GITHUB_TOKEN_HERE"
    "[a-f0-9]\{32\}\.klnF[A-Z0-9]*:INSERT_ZAI_API_KEY_HERE"
    "836d75[a-f0-9]*\.klnF[A-Z0-9]*:INSERT_ZAI_API_KEY_HERE"
)

# Function to redact a file
redact_file() {
    local file="$1"
    
    for pattern in "${PATTERNS[@]}"; do
        IFS=':' read -r search replace <<< "$pattern"
        sed -i "s/$search/$replace/g" "$file" 2>/dev/null || true
    done
}

# Export function for use in backup script
export -f redact_file
