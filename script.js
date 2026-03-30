const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionSection = document.getElementById('question-section');
const successSection = document.getElementById('success-section');

// Array of cute/pleading phrases for the "No" button
const noMessages = [
    "No",
    "No please 🥺",
    "Are you sure?",
    "Really sure? 😭",
    "Think again!",
    "Last chance!",
    "Surely not? 💔",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart! ❤️‍🩹",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
    "Please? 🥺",
    "I'll be so sad 😭",
    "Just say yes! 🥰"
];

let messageIndex = 0;
let yesSize = 1.2; // initial font size in rem for the Yes button
let paddingVertical = 12;
let paddingHorizontal = 30;

const msgElement = document.getElementById('message-text');

let isInitialMessage = true;

function moveNoButton() {
    // Hide the No button completely
    noBtn.classList.add('hidden');

    // Display the next persuasive text inside the glass container
    messageIndex = (messageIndex + 1) % noMessages.length;
    msgElement.textContent = noMessages[messageIndex];
    msgElement.classList.remove('hidden');

    // If it's not the first appearance, move it to a random location!
    if (!isInitialMessage) {
        const container = document.getElementById('main-container');
        
        // Boundaries logic
        const maxX = container.clientWidth - msgElement.offsetWidth - 20;
        const maxY = container.clientHeight - msgElement.offsetHeight - 20;

        const randomX = Math.max(10, Math.floor(Math.random() * maxX));
        const randomY = Math.max(10, Math.floor(Math.random() * maxY));

        // Disable horizontal centering transform so we can freely move it with left/top
        msgElement.style.transform = 'none';
        msgElement.style.left = randomX + 'px';
        msgElement.style.top = randomY + 'px';
    } else {
        // Prepare for the next hover interactions making it jump
        isInitialMessage = false;
        // Seed its top position once so transition is silky smooth later
        msgElement.style.top = msgElement.offsetTop + 'px';
    }
}

// Bind interactions to the initial No button
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Bind interactions to the text message so it acts exactly as the No button
msgElement.style.cursor = 'pointer';
msgElement.addEventListener('mouseover', moveNoButton);
msgElement.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});
msgElement.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// SUCCESS - Yes Button logic
yesBtn.addEventListener('click', () => {
    questionSection.classList.add('hidden');
    successSection.classList.remove('hidden');
    
    // Trigger confetti / hearts festival!
    spawnHearts(60);
});

// Ambient floating hearts background
function spawnHearts(count = 15) {
    const container = document.getElementById('particles');
    const template = document.getElementById('heart-template');
    
    // Define some cute emojis
    const emojis = ['❤️', '💖', '💕', '🥰', '✨', '💝', '💘'];
    
    for(let i=0; i<count; i++) {
        setTimeout(() => {
            const heart = template.content.cloneNode(true).querySelector('.heart');
            
            // Random styling
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            
            heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            
            container.appendChild(heart);
            
            // Remove after animation completes to keep the DOM clean
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * (1000 / count)); // stagger the spawn time slightly
    }
}

// Initial ambient hearts ticking in background
setInterval(() => spawnHearts(2), 2000);
