const tg = window.Telegram.WebApp;
tg.ready(); tg.expand();

let balance = 0; // The mass counter
const canvas = document.getElementById('wheel-canvas');
const ctx = canvas.getContext('2d');
const prizes = ["50", "0", "10", "100", "0", "25", "5", "500", "0", "15"];
const colors = ["#1a1a1a", "#3498db", "#1a1a1a", "#3498db", "#1a1a1a", "#39ff14", "#1a1a1a", "#3498db", "#1a1a1a", "#3498db"];

let startAngle = 0;
const arc = Math.PI / (prizes.length / 2);

function draw() {
    prizes.forEach((p, i) => {
        const angle = startAngle + i * arc;
        ctx.fillStyle = colors[i];
        ctx.beginPath(); ctx.moveTo(150, 150);
        ctx.arc(150, 150, 140, angle, angle + arc, false);
        ctx.fill();
        ctx.fillStyle = "white"; ctx.save();
        ctx.translate(150 + Math.cos(angle + arc/2) * 100, 150 + Math.sin(angle + arc/2) * 100);
        ctx.rotate(angle + arc/2 + Math.PI/2);
        ctx.fillText(p, -ctx.measureText(p).width/2, 0); ctx.restore();
    });
}

function spin() {
    tg.HapticFeedback.impactOccurred('medium');
    let spinAngle = Math.random() * 10 + 20;
    let duration = 3000;
    let start = null;

    function animate(time) {
        if (!start) start = time;
        let progress = time - start;
        if (progress < duration) {
            startAngle += (spinAngle * (1 - progress/duration)) * Math.PI/180;
            draw();
            requestAnimationFrame(animate);
        } else {
            const index = Math.floor((360 - (startAngle * 180 / Math.PI + 90) % 360) / (arc * 180 / Math.PI));
            let win = parseInt(prizes[index]);
            balance += win; // Update balance logic
            document.getElementById('mass-balance').innerText = balance;
            tg.HapticFeedback.notificationOccurred('success');
        }
    }
    requestAnimationFrame(animate);
}

document.getElementById('spin-btn').onclick = spin;
draw();
