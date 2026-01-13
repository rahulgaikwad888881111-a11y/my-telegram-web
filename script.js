const tg = window.Telegram.WebApp;
tg.expand();

// Set user data
const user = tg.initDataUnsafe?.user;
if (user) {
    document.getElementById('greeting').innerText = `Hey, ${user.first_name}!`;
    document.getElementById('full-name').innerText = `Name: ${user.first_name} ${user.last_name || ''}`;
    document.getElementById('user-id').innerText = `ID: ${user.id}`;
}

// Navigation Logic
function showPage(pageId) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
    tg.HapticFeedback.impactOccurred('light'); // Vibration on tap
}

// Spin Animation
const spinBtn = document.getElementById('spin-btn');
const wheel = document.getElementById('wheel');

spinBtn.onclick = () => {
    tg.HapticFeedback.notificationOccurred('success');
    wheel.style.transition = 'transform 2s ease-in-out';
    const randomDeg = Math.floor(Math.random() * 360) + 1080;
    wheel.style.transform = `rotate(${randomDeg}deg)`;
    
    document.getElementById('status-text').innerText = "Spinning...";
    
    setTimeout(() => {
        document.getElementById('status-text').innerText = "You won +10 Coins!";
    }, 2000);
};
