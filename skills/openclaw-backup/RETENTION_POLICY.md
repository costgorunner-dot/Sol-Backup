# OpenClaw Backup Retention Policy

**Created:** February 20, 2026
**Last Updated:** February 20, 2026

---

## 🎯 **Retention Rules**

### **Permanent Backups (Never Deleted)**

**WORKING MODEL - February 20, 2026**
- **Commit:** b7afcff
- **Created:** February 20, 2026 at 3:15 PM PST
- **Status:** ✅ PERMANENT
- **Reason:** First stable, complete working system
- **Marker:** WORKING_MODEL.md in backup root

**How to mark a backup as permanent:**
1. Create file: `backup/WORKING_MODEL.md` in backup
2. Or include "PERMANENT" in commit message
3. Script will automatically detect and protect

---

### **Daily Backups**

**Retention:** Last 14 days (2 weeks)

**What gets deleted:**
- Backups older than 14 days
- NOT marked as permanent
- NOT tagged with PERMANENT marker

**What stays:**
- Last 14 days of daily backups
- All permanent backups
- All tagged backups

---

## 📅 **Cleanup Schedule**

**Cleanup runs:** Every Sunday at 7:00 PM PST
**Script:** `/home/ubuntu/.openclaw/workspace/skills/openclaw-backup/scripts/cleanup.sh`
**Cron job:** TBD (can add later)

---

## 🗂️ **Backup Organization**

```
GitHub Repository: costgorunner-dot/Sol-Backup
├── backup/
│   ├── WORKING_MODEL.md         ← Permanent marker
│   ├── BACKUP_INFO.md            ← Current backup info
│   ├── skills/                   ← All skills
│   ├── memory/                   ← Complete memory
│   ├── workspace/                ← Core files
│   ├── config/                   ← Configuration
│   └── cron/                     ← Cron definitions
└── tags:
    ├── WORKING-MODEL-2026-02-20 ← Permanent
    └── archive/YYYY-MM-DD       ← Old backups (tagged, not deleted)
```

---

## 🔐 **How It Works**

### **Backup Creation**
1. Script creates timestamped backup
2. Checks for WORKING_MODEL.md
3. If present, tags as permanent
4. Pushes to GitHub

### **Cleanup Process**
1. Runs weekly (Sundays)
2. Scans all backup commits
3. Identifies:
   - Permanent backups (keep forever)
   - Recent backups (<14 days, keep)
   - Old backups (>14 days, archive)
4. Archives old backups with tags
5. Does NOT delete from Git history

---

## ✅ **Current Backups**

| Date | Time | Status | Retention |
|------|------|--------|-----------|
| Feb 20, 2026 | 3:15 PM | ✅ WORKING MODEL | PERMANENT |

---

## 🎯 **Future Backups**

**Daily at 9:30 AM PST**
- Kept for 14 days
- Then archived (not deleted)
- Git history preserves everything

---

## 🔄 **Recovery Options**

### **From Permanent Backup**
```bash
git checkout WORKING-MODEL-2026-02-20
bash scripts/restore.sh
```

### **From Recent Backup**
```bash
git checkout main
bash scripts/restore.sh
```

### **From Archived Backup**
```bash
git tag -l "archive/*"  # List archived backups
git checkout archive/2026-02-15
bash scripts/restore.sh
```

---

## 💡 **Benefits**

- ✅ Always have permanent working model
- ✅ 2 weeks of daily backups for recovery
- ✅ Git history preserves everything
- ✅ Repository doesn't get cluttered
- ✅ Can recover any version if needed

---

## 📝 **Manual Cleanup**

To run cleanup manually:
```bash
bash /home/ubuntu/.openclaw/workspace/skills/openclaw-backup/scripts/cleanup.sh
```

---

**Your backups are organized, protected, and automatically managed!** 🗂️
