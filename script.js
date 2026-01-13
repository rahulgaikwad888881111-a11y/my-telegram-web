const tg = window.Telegram.WebApp;
tg.expand();
tg.backgroundColor = '#000000';
tg.headerColor = '#000000';

// Pull Real User Data
const user = tg.initDataUnsafe?.user;
if (user) {
    document.getElementById('p-name').innerText = user.first_name;
    document.getElementById('p-id').innerText = `ID: #${user.id.toString().slice(0,5)}`;
}

// Button Haptics
document.querySelectorAll('button, .grid-item').forEach(btn => {
    btn.onclick = () => {
        tg.HapticFeedback.impactOccurred('medium');
    };
});
