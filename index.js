// Word arrays for different difficulty levels
const words = {
    easy: [
        "cat", "dog", "sun", "run", "hat", "book", "tree", "fish", "bird", "jump",
        "play", "sing", "walk", "talk", "smile", "dance", "happy", "light", "house", "green"
    ],
    medium: [
        "computer", "keyboard", "monitor", "program", "software", "internet", "website",
        "database", "network", "developer", "language", "project", "system", "design",
        "function", "variable", "browser", "application", "framework", "algorithm"
    ],
    hard: [
        "cryptocurrency", "implementation", "authentication", "visualization", "infrastructure",
        "parallelization", "microservices", "optimization", "cybersecurity", "virtualization",
        "compatibility", "accessibility", "configuration", "documentation", "functionality",
        "architecture", "development", "integration", "performance", "responsive"
    ]
};

// Game settings
const levelSettings = {
    easy: { time: 7, points: 1 },
    medium: { time: 5, points: 2 },
    hard: { time: 4, points: 3 }
};

// DOM Elements
const elements = {
    container: document.querySelector(".container"),
    startButton: document.querySelector(".start"),
    difficultySelect: document.querySelector("#difficulty"),
    quoteDisplay: document.querySelector(".quote-display"),
    quoteInput: document.querySelector(".quote-input"),
    timeLeft: document.querySelector(".time span"),
    scoreGot: document.querySelector(".score .got"),
    scoreTotal: document.querySelector(".score .total"),
    wpmDisplay: document.querySelector(".wpm span"),
    finish: document.querySelector(".finish"),
    seconds: document.querySelector(".seconds")
};

let currentWords = [];
let score = 0;
let gameInterval;
let startTime;

// Initialize the game
function initGame() {
    const difficulty = elements.difficultySelect.value;
    currentWords = [...words[difficulty]];
    score = 0;
    elements.scoreGot.textContent = "0";
    elements.scoreTotal.textContent = currentWords.length.toString();
    elements.seconds.textContent = levelSettings[difficulty].time;
    elements.timeLeft.textContent = levelSettings[difficulty].time;
    elements.finish.textContent = "";
    elements.wpmDisplay.textContent = "0";
}

// Generate a random word
function generateWord() {
    if (currentWords.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * currentWords.length);
    const word = currentWords[randomIndex];
    currentWords.splice(randomIndex, 1);
    return word;
}

// Update WPM
function updateWPM(correctChars) {
    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
    const wpm = Math.round((correctChars / 5) / timeElapsed);
    elements.wpmDisplay.textContent = wpm.toString();
}

// Start the game
function startGame() {
    initGame();
    elements.startButton.style.display = "none";
    elements.quoteInput.value = "";
    elements.quoteInput.disabled = false;
    elements.quoteInput.focus();
    startTime = Date.now();
    
    const currentWord = generateWord();
    if (!currentWord) return;
    
    elements.quoteDisplay.textContent = currentWord;
    
    const difficulty = elements.difficultySelect.value;
    let timeLeft = levelSettings[difficulty].time;
    elements.timeLeft.textContent = timeLeft;
    
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    
    gameInterval = setInterval(() => {
        timeLeft--;
        elements.timeLeft.textContent = timeLeft;
        
        if (timeLeft === 0) {
            clearInterval(gameInterval);
            checkWord();
        }
    }, 1000);
}

// Check if the word is correct
function checkWord() {
    const inputWord = elements.quoteInput.value.trim().toLowerCase();
    const displayedWord = elements.quoteDisplay.textContent.toLowerCase();
    const difficulty = elements.difficultySelect.value;
    
    if (inputWord === displayedWord) {
        score += levelSettings[difficulty].points;
        elements.scoreGot.textContent = score;
        updateWPM(displayedWord.length);
        
        const nextWord = generateWord();
        if (nextWord) {
            elements.quoteDisplay.textContent = nextWord;
            elements.quoteInput.value = "";
            elements.timeLeft.textContent = levelSettings[difficulty].time;
            
            if (gameInterval) {
                clearInterval(gameInterval);
            }
            
            let timeLeft = levelSettings[difficulty].time;
            gameInterval = setInterval(() => {
                timeLeft--;
                elements.timeLeft.textContent = timeLeft;
                if (timeLeft === 0) {
                    clearInterval(gameInterval);
                    checkWord();
                }
            }, 1000);
        } else {
            endGame(true);
        }
    } else {
        endGame(false);
    }
}

// End the game
function endGame(won) {
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    
    elements.quoteInput.value = "";
    elements.quoteInput.disabled = true;
    
    const message = won 
        ? `Congratulations! Your final score is ${score} with ${elements.wpmDisplay.textContent} WPM!`
        : `Game Over! Your final score is ${score}`;
    
    elements.finish.textContent = message;
    elements.finish.style.color = won ? "#27ae60" : "#e74c3c";
    
    // Remove any existing restart buttons first
    const existingRestartButtons = elements.container.querySelectorAll("button.start:not(:first-child)");
    existingRestartButtons.forEach(button => button.remove());
    
    // Create new restart button
    const restartButton = document.createElement("button");
    restartButton.textContent = "Play Again";
    restartButton.className = "start";
    restartButton.onclick = resetGame;
    elements.container.appendChild(restartButton);
}

// Reset the game
function resetGame() {
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    
    elements.quoteInput.disabled = false;
    elements.quoteInput.value = "";
    elements.finish.textContent = "";
    
    // Remove all restart buttons except the original
    const restartButtons = elements.container.querySelectorAll("button.start:not(:first-child)");
    restartButtons.forEach(button => button.remove());
    
    // Reset game state
    score = 0;
    currentWords = [...words[elements.difficultySelect.value]];
    initGame();
    
    // Start the game immediately instead of showing the start button
    startGame();
}

// Event Listeners
elements.startButton.addEventListener("click", startGame);
elements.difficultySelect.addEventListener("change", initGame);
elements.quoteInput.addEventListener("paste", e => e.preventDefault());

// Initialize the game on load
initGame();
