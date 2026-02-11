const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');

let noButtonClickCount = 0;
const isMobile = window.innerWidth <= 768;

yesBtn.addEventListener('click', function() {
    message.textContent = '🎉 Yay! Happy Valentine\'s Day, Mwaahhh! 💕';
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    createConfetti();
});

noBtn.addEventListener('click', function() {
    noButtonClickCount++;
    
    const messages = [
        'Sure na ka da? 🥺',
        'Wehh? 😢',
        'Paminsara Mayo... 💔',
        'isa na lang gid 🤞',
        'Please HEHE.🙏',
        'Agay Ahh! 💔',
        'Last nalang gid! 😭',
        'Indi ka gid ya saakon? 😢',
        'Sige na, indi na ko mag ask liwat. 😔',
        'Pilitay ni ya! 😭',
    ];
    
    if (noButtonClickCount <= messages.length) {
        message.textContent = messages[noButtonClickCount - 1];
    }
    
    // Make the No button harder to click
    if (noButtonClickCount > 0) {
        if (isMobile) {
            // On mobile, use smaller movements
            const randomX = (Math.random() - 0.5) * 100;
            const randomY = (Math.random() - 0.5) * 100;
            noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
        } else {
            // On desktop, use larger movements
            const randomX = (Math.random() - 0.5) * 200;
            const randomY = (Math.random() - 0.5) * 200;
            noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }
    }
    
    // Make the Yes button bigger each time
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = (currentSize + 2) + 'px';
    yesBtn.style.padding = '15px ' + (40 + noButtonClickCount * 5) + 'px';
});

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.background = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'][Math.floor(Math.random() * 5)];
        confetti.style.animation = `confettiFall ${2 + Math.random()}s ease-in forwards`;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Setup floating gifts positions and animations
function setupGifts() {
    const gifts = document.querySelectorAll('.gifts .gift');
    gifts.forEach((g, i) => {
        const left = Math.random() * 90 + 2; // percent
        const delay = Math.random() * -8; // negative to start at different phases
        const dur = 5 + Math.random() * 6; // 5-11s
        g.style.left = left + '%';
        g.style.setProperty('--dur', dur + 's');
        g.style.animationDelay = delay + 's';
        // Slight horizontal sway using translateX in a CSS variable is hard, so random rotate
        g.style.transform = `translateY(0) rotate(${(Math.random()-0.5)*30}deg)`;
        // Stagger initial vertical position
        g.style.bottom = (Math.random() * 40 - 20) + 'px';
    });
}

// Handle window resize to update mobile detection
window.addEventListener('resize', function() {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
        location.reload();
    }
});

// Initialize after DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupGifts);
} else {
    setupGifts();
}
