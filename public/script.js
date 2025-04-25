//@ts-check

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString()

    let element = document.getElementById('clock')
    if (element !== null) element.textContent = timeString;

    element = document.getElementById('date')
    if (element !== null) element.textContent = dateString;
}

setInterval(updateClock, 100);
updateClock();

function updateMs() {
    const now = new Date();

    const element = document.getElementById('ms')
    if (element !== null) element.textContent = `${now.getMilliseconds()}`;
}

setInterval(updateMs);
updateMs();

let cache = {
    data: {},
    timestamp: 0,
    ttl: 5000 // Time to live: 5 seconds
};

async function updateInfo() {
    const now = Date.now();

    if (!cache.data || now - cache.timestamp > cache.ttl) {
        const res = await fetch('/api/info');
        cache.data = await res.json();
        cache.timestamp = now;
    }

    const element = document.getElementById('info')
    if (element !== null) element.textContent = cache.data.message;
}

// Refresh info every 5 seconds
setInterval(updateInfo, 5000);
updateInfo();