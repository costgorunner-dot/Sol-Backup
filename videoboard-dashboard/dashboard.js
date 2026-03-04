// Dashboard JavaScript

// Mock data (replace with real API calls later)
const projectStats = {
    totalScenes: 24,
    drafts: 14,
    inProgress: 7,
    completed: 3,
    estimatedRuntime: "4:32",
    characters: 2,
    locations: 3
};

// Update stats on page load
function updateDashboard() {
    // Update stat cards
    document.getElementById('total-scenes').textContent = projectStats.totalScenes;
    document.getElementById('drafts').textContent = projectStats.drafts;
    document.getElementById('in-progress').textContent = projectStats.inProgress;
    document.getElementById('completed').textContent = projectStats.completed;
    document.getElementById('runtime').textContent = projectStats.estimatedRuntime;
    
    // Calculate and update progress bar
    const progress = Math.round((projectStats.completed / projectStats.totalScenes) * 100);
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `${progress}% Complete (${projectStats.completed}/${projectStats.totalScenes} scenes)`;
    
    // Update recent activity (mock data)
    const activities = [
        { time: '10:30 AM', action: 'Scene 5 marked as "In Progress"', type: 'progress' },
        { time: '9:15 AM', action: 'New scene created: "Astra emerges from portal"', type: 'create' },
        { time: 'Yesterday', action: 'Character reference uploaded for Astra', type: 'upload' }
    ];
    
    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = activities.map(a => `
        <div class="activity-item">
            <strong>${a.time}</strong> — ${a.action}
        </div>
    `).join('');
}

// Action button handlers
function generatePrompt() {
    alert('Generate Prompt button clicked!\\nThis would copy a formatted prompt to clipboard for ComfyUI.');
    console.log('Generating prompt for current scene...');
}

function exportScene() {
    alert('Export Scene button clicked!\\nThis would package all scene assets for external use.');
    console.log('Exporting scene package...');
}

function markComplete() {
    alert('Mark Complete button clicked!\\nThis would update scene status to completed.');
    console.log('Marking scene as complete...');
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', updateDashboard);
