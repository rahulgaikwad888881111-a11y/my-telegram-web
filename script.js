const tg = window.Telegram.WebApp;
tg.expand();
tg.headerColor = '#1a1a2e'; // Colors the top bar of the Telegram app

// Initialize
const user = tg.initDataUnsafe?.user;
if (user) {
    document.getElementById('user-name').innerText = user.first_name;
    document.getElementById('user-id').innerText = `#${user.id}`;
}

// Navigation System
function navigate(pageId, btn) {
    tg.HapticFeedback.impactOccurred('medium');
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    // Show selected page
    document.getElementById(pageId).classList.remove('hidden');
    
    // Update button styles
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// Spin Logic
let balance = 1000;
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');

spinBtn.onclick = () => {
    tg.HapticFeedback.notificationOccurred('success');
    spinBtn.disabled = true;
    
    const rotation = Math.floor(Math.random() * 360) + 1440;
    wheel.style.transform = `rotate(${rotation}deg)`;
    
    setTimeout(() => {
        const win = Math.floor(Math.random() * 50) + 10;
        balance += win;
        document.getElementById('balance').innerText = balance.toLocaleString();
        spinBtn.disabled = false;
        tg.showAlert(`You earned ${win} credits!`);
    }, 3000);
};
