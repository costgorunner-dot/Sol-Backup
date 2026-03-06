---
name: openclaw-backup
description: Backup and restore your OpenClaw customizations, skills, memory, and configurations to GitHub. Automated backup every 2 days with easy restore capability.
homepage: https://github.com/costgorunner-dot/Sol-Backup
metadata:
  openclaw:
    emoji: "💾"
    requires:
      bins: ["git", "tar"]
      env: ["GITHUB_TOKEN", "GITHUB_REPO"]
    permissions:
      - file:read
      - file:write
      - exec:git
---

# OpenClaw Backup Skill

Automated backup system for your OpenClaw customizations. Backs up your skills, memory, configurations, and all custom work to your GitHub repository.

## What Gets Backed Up

### ✅ Included in Backup
- **Skills** - All custom skills in `~/.openclaw/workspace/skills/`
- **Memory** - Complete memory system (`memory/` directory)
- **Workspace files** - SOUL.md, USER.md, AGENTS.md, HEARTBEAT.md, etc.
- **Configuration** - Main config files (openclaw.json)
- **Cron definitions** - Automated job definitions
- **Any other customizations** you've made

### ❌ Not Backed Up
- OpenClaw core files (you'll get latest version on restore)
- Session transcripts (raw logs already extracted to memory)
- Logs, cache, temporary files
- Credentials (you'll need to re-add API keys)

## Commands

### Backup Commands
```bash
/backup create     # Create backup and push to GitHub
/backup status     # Show backup status and last run
/backup list       # List all backups in repository
```

### Restore Commands
```bash
/backup restore              # Restore from latest backup
/backup restore <commit>     # Restore from specific commit
```

## Setup

The skill is already configured with your GitHub repository:
- **Repository:** costgorunner-dot/Sol-Backup
- **Branch:** main
- **Auto-backup:** Every 2 days at 3:00 AM

## How It Works

### Backup Process
1. Collects all your custom files
2. Creates timestamped backup
3. Commits to local Git repository
4. Pushes to GitHub (private repo)
5. Updates backup log

### Restore Process
1. Clones from GitHub repository
2. Verifies backup integrity
3. Restores all custom files
4. Recreates directory structure
5. Confirms successful restore

## Backup Schedule

Automated backups run every 2 days at 3:00 AM via cron job.

Manual backup anytime with:
```bash
/backup create
```

## First Backup

Your first backup has been created and pushed to GitHub. You can view it at:
https://github.com/costgorunner-dot/Sol-Backup

## Restore on New Machine

If you need to restore to a new OpenClaw installation:

1. Install OpenClaw (get latest version)
2. Install this backup skill
3. Run: `/backup restore`
4. Re-add API keys to `~/.openclaw/credentials/`
5. Restart OpenClaw

Everything else will be restored exactly as it was.

## Files in This Skill

```
~/.openclaw/workspace/skills/openclaw-backup/
├── SKILL.md              # This file
├── scripts/
│   ├── backup.sh         # Backup automation
│   ├── restore.sh        # Restore automation
│   └── setup.sh          # Initial setup
└── .backup-config.json   # Configuration
```

## Configuration

Configuration stored in `.backup-config.json`:
```json
{
  "githubRepo": "costgorunner-dot/Sol-Backup",
  "branch": "main",
  "lastBackup": "2026-02-20T14:30:00Z",
  "autoBackup": true,
  "backupInterval": "2 days"
}
```

## Troubleshooting

### Backup fails to push
- Check GitHub token is valid
- Verify repository exists and is accessible
- Check internet connection

### Restore fails
- Verify repository exists
- Check GitHub token permissions
- Ensure OpenClaw is installed first

### Missing files after restore
- Check backup log in repository
- Verify all files were committed
- Re-run restore with specific commit

## Security Notes

- ✅ API keys are NOT backed up (you'll need to re-add)
- ✅ Repository is private (your data stays yours)
- ✅ GitHub token stored securely
- ✅ Only your customizations backed up

## Support

If you need help:
- Check backup logs in GitHub repository
- Review SKILL.md for usage instructions
- Run `/backup status` for current state

---

**Created:** February 20, 2026
**Author:** Sol
**Repository:** https://github.com/costgorunner-dot/Sol-Backup
