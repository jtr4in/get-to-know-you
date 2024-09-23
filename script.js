let currentCard = null;
let isQuestion = true;
let timer = null;
let timeLeft = 90;
let players = [];
let currentPlayerIndex = 0;
let isTimerDisabled = true;
let isWithinTimeLimit = true;
let isHeadToHeadMode = false;
let isRecallEnabled = true;
let isTimerEnabled = true;
let selectedCategory = 'Icebreaker';
let scoreLimit = 10;

const cards = {
    'Icebreaker': [
        { question: "What's your favorite way to spend a weekend?" },
        { question: "Do you have any hidden talents?" },
        { question: "What's the most interesting place you've ever visited?" },
        { question: "If you could live anywhere in the world, where would it be?" },
    ],
    'First Date': [
        { question: "What's your ideal first date?" },
        { question: "What's the most adventurous thing you've ever done?" },
        { question: "What's your favorite book or movie, and why?" },
        { question: "What's your passion in life?" },
    ],
    'Dating': [
        { question: "What was your first impression of me?" },
        { question: "What is your favorite memory from when we were dating?" },
        { question: "What's your love language?" },
        { question: "Where do you see our relationship in 5 years?" },
    ],
    'Longterm': [
        { question: "What are your core values, and how do they shape our marriage?" },
        { question: "How do you define success in our relationship?" },
        { question: "What's your favorite thing about being married to me?" },
        { question: "How can we keep our relationship exciting and fresh?" },
    ],
    'Spicy': [
        { question: "What's your biggest fantasy?" },
        { question: "What's something new you'd like to try in the bedroom?" },
        { question: "What's the most daring place you've ever considered being intimate?" },
        { question: "If you could plan a perfect romantic getaway, what would it include?" },
    ]
};

let questionHistory = [];
const RECALL_FREQUENCY = 5; // Ask a recall question every 5 cards
let cardsSinceLastRecall = 0;

const recallChallengesIcebreaker = [
    "Answer as if you're hosting a game show.",
    "Answer in the form of a knock-knock joke.",
    "Answer as if you're narrating a children's story.",
    "Answer while doing a silly dance.",
    "Answer as if you're a famous sports commentator.",
    "Answer while pretending to be a superhero.",
    "Answer using only sound effects.",
    "Answer while clapping between each word.",
    "Answer as if you're on a news broadcast.",
    "Answer while mimicking a robot."
];

const recallChallengesFirstDate = [
    "Answer while maintaining a playful smile.",
    "Answer as if you're on a reality dating show.",
    "Answer while tracing your finger along the table.",
    "Answer as if you're texting a crush.",
    "Answer while giving a subtle wink.",
    "Answer as if you're sharing a secret.",
    "Answer while softly humming.",
    "Answer as if you're leaving a cute voice message.",
    "Answer while playfully mimicking the other person's voice.",
    "Answer while giving a quick compliment."
];

const recallChallengesDating = [
    "Answer as if you're writing in your diary.",
    "Answer while holding eye contact for 5 seconds.",
    "Answer as if you're reflecting on your relationship.",
    "Answer while gently touching their hand.",
    "Answer as if you're describing your partner to a close friend.",
    "Answer while taking a slow, deep breath.",
    "Answer while smiling warmly.",
    "Answer as if you're sharing a favorite memory.",
    "Answer while holding the other player's gaze.",
    "Answer as if you're planning a surprise for your partner."
];

const recallChallengesLongterm = [
    "Answer as if you're writing your wedding vows.",
    "Answer while placing your hand on your heart.",
    "Answer as if you're reminiscing about your first date.",
    "Answer as if you're writing a love song.",
    "Answer while softly holding their gaze.",
    "Answer as if you're expressing your deepest feelings.",
    "Answer while lightly touching the other person’s shoulder.",
    "Answer as if you're renewing your vows.",
    "Answer while reflecting on your future together.",
    "Answer while recalling your happiest moment together."
];

const recallChallengesSpicy = [
    "Answer while leaning in close.",
    "Answer while softly brushing your partner’s hand.",
    "Answer with a sultry tone.",
    "Answer as if you're whispering a secret.",
    "Answer while slowly tracing a shape with your finger.",
    "Answer as if you're sharing a hidden fantasy.",
    "Answer while biting your lip.",
    "Answer as if you're describing a dream.",
    "Answer while softly running your fingers through your hair.",
    "Answer while giving a flirty smile."
];


function initializeSinglePlayer() {
    players = [{ name: "Player 1", score: 0 }];
    startGame();
    // Hide point system for single player mode
    document.querySelectorAll('.card-footer').forEach(footer => footer.style.display = 'none');
}

function showMultiplayerSetup() {
    document.getElementById('player-setup').classList.add('hidden');
    document.getElementById('multiplayer-setup').classList.remove('hidden');
}

function addPlayer() {
    const playerInputs = document.getElementById('player-inputs');
    const newInputGroup = document.createElement('div');
    newInputGroup.className = 'player-input-group';
    const playerCount = playerInputs.children.length + 1;
    newInputGroup.innerHTML = `
        <input type="text" class="player-name" placeholder="Player ${playerCount} Name">
        <input type="color" class="player-color" value="#${Math.floor(Math.random()*16777215).toString(16)}">
    `;
    playerInputs.appendChild(newInputGroup);
}

function startGame() {
    const playerInputGroups = document.querySelectorAll('.player-input-group');
    players = Array.from(playerInputGroups).map((group, index) => ({
        name: group.querySelector('.player-name').value || `Player ${index + 1}`,
        score: 0,
        color: group.querySelector('.player-color').value
    }));
    
    // Store the selected category
    selectedCategory = getSelectedCategory();
    
    document.getElementById('player-setup').classList.add('hidden');
    document.getElementById('game-area').classList.remove('hidden');
    
    document.getElementById('reset-game').classList.remove('hidden');
    
    scoreLimit = parseInt(document.getElementById('score-limit').value) || 10;
    
    // Initialize recall setting
    isRecallEnabled = document.getElementById('recall-questions').checked;
    
    updatePlayerNames();
    updateScores();
    updateCurrentPlayer();
    drawCard();
    
    // Show point system and toggle for multiplayer mode
    if (players.length > 1) {
        document.querySelectorAll('.card-footer').forEach(footer => footer.style.display = 'block');
        document.querySelector('.toggle-container').classList.remove('hidden');
    } else {
        // Hide point system and toggle for single player mode
        document.querySelectorAll('.card-footer').forEach(footer => footer.style.display = 'none');
        document.querySelector('.toggle-container').classList.add('hidden');
    }
}

function updatePlayerNames() {
    const scoresContainer = document.getElementById('scores');
    scoresContainer.innerHTML = '';
    scoresContainer.style.display = 'flex';
    scoresContainer.style.flexWrap = 'wrap';
    scoresContainer.style.justifyContent = 'center';
    
    players.forEach((player, index) => {
        const scoreDiv = document.createElement('div');
        scoreDiv.id = `player${index + 1}-score`;
        scoreDiv.innerHTML = `<span>${player.name}</span><span>0</span>`;
        scoreDiv.style.color = player.color;
        scoresContainer.appendChild(scoreDiv);
    });

    updateCurrentPlayer(); // Add this line to set the initial background color
}

function getContrastColor(hexcolor) {
    // Convert hex to RGB
    const r = parseInt(hexcolor.substr(1,2),16);
    const g = parseInt(hexcolor.substr(3,2),16);
    const b = parseInt(hexcolor.substr(5,2),16);
    
    // Calculate luminance
    const yiq = ((r*299)+(g*587)+(b*114))/1000;
    
    // Return black or white depending on luminance
    return (yiq >= 128) ? 'black' : 'white';
}

// Update these functions to work with any number of players
function updateScores() {
    players.forEach((player, index) => {
        const scoreElement = document.getElementById(`player${index + 1}-score`);
        scoreElement.lastChild.textContent = player.score;
    });
}

function switchPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updateCurrentPlayer();
}

function getSelectedCategory() {
    const sliderValue = document.getElementById('category-slider').value;
    const categories = ['Icebreaker', 'First Date', 'Dating', 'Longterm', 'Spicy'];
    return categories[parseInt(sliderValue) - 1];
}

function getCardsFromCategory(category) {
    if (category === 'all') {
        return Object.values(cards).flat();
    }
    return cards[category];
}

function drawCard() {
    cardsSinceLastRecall++;
    
    if (isRecallEnabled && cardsSinceLastRecall >= RECALL_FREQUENCY && questionHistory.length > 0) {
        generateRecallQuestion();
        cardsSinceLastRecall = 0;
    } else {
        const categoryCards = getCardsFromCategory(selectedCategory);
        
        let newCard;
        do {
            newCard = categoryCards[Math.floor(Math.random() * categoryCards.length)];
        } while (newCard === currentCard && categoryCards.length > 1);
        
        // Select a challenge based on the selected category
        let randomChallenge;
        switch (selectedCategory) {
            case 'Icebreaker':
                randomChallenge = recallChallengesIcebreaker[Math.floor(Math.random() * recallChallengesIcebreaker.length)];
                break;
            case 'First Date':
                randomChallenge = recallChallengesFirstDate[Math.floor(Math.random() * recallChallengesFirstDate.length)];
                break;
            case 'Dating':
                randomChallenge = recallChallengesDating[Math.floor(Math.random() * recallChallengesDating.length)];
                break;
            case 'Longterm':
                randomChallenge = recallChallengesLongterm[Math.floor(Math.random() * recallChallengesLongterm.length)];
                break;
            case 'Spicy':
                randomChallenge = recallChallengesSpicy[Math.floor(Math.random() * recallChallengesSpicy.length)];
                break;
            default:
                randomChallenge = "";
        }
        
        currentCard = {
            question: newCard.question,
            challenge: randomChallenge
        };
        
        displayCard();
        resetTimer();
    }
}

function displayCard() {
    const mainCardElement = document.getElementById('main-card');
    const flippedCardElement = document.getElementById('flipped-card');
    
    mainCardElement.querySelector('#question').textContent = currentCard.question;
    flippedCardElement.querySelector('#challenge').textContent = currentCard.challenge;
    
    // Add or remove the recall-question class based on whether it's a recall question
    if (currentCard.isRecall) {
        mainCardElement.classList.add('recall-question');
        flippedCardElement.classList.add('recall-question');
    } else {
        mainCardElement.classList.remove('recall-question');
        flippedCardElement.classList.remove('recall-question');
    }
    
    // Animate cards popping up
    animateCardPopUp(mainCardElement);
    animateCardPopUp(flippedCardElement);
}

function animateCardPopUp(cardElement) {
    cardElement.classList.remove('pop-up', 'disappear-to-left', 'disappear-to-right');
    void cardElement.offsetWidth; // Trigger reflow
    cardElement.classList.add('pop-up');
}

function handleCardClick(event) {
    const clickedCard = event.currentTarget;
    
    // Animate card disappearing
    animateCardDisappear(clickedCard);
    
    // Wait for animation to complete before processing the click
    setTimeout(() => {
        if (clickedCard.id === 'main-card') {
            answerQuestion();
        } else if (clickedCard.id === 'flipped-card') {
            completeChallenge();
        }
        
        // Add this line to flip the view after processing the card
        if (isHeadToHeadMode) {
            flipView();
        }
    }, 500); // 500ms matches the animation duration
}

function animateCardDisappear(cardElement) {
    cardElement.classList.remove('pop-up');
    void cardElement.offsetWidth; // Trigger reflow
    cardElement.classList.add(cardElement.id === 'main-card' ? 'disappear-to-left' : 'disappear-to-right');
}

function answerQuestion() {
    const points = 1; // Change this to always award 1 point for questions
    players[currentPlayerIndex].score += points;
    updateScores();
    
    // Store the question for potential recall later
    questionHistory.push({
        question: currentCard.question,
        player: players[currentPlayerIndex].name
    });
    
    // Limit the history to the last 10 questions
    if (questionHistory.length > 10) {
        questionHistory.shift();
    }
    
    if (!checkGameEnd()) {
        switchPlayer();
        drawCard();
        if (document.getElementById('head-to-head').checked) {
            flipView();
        }
    }
}

function completeChallenge() {
    const points = isTimerEnabled ? (isWithinTimeLimit ? 3 : 2) : 2;
    players[currentPlayerIndex].score += points;
    updateScores();
    
    if (!checkGameEnd()) {
        switchPlayer();
        drawCard();
        if (document.getElementById('head-to-head').checked) {
            flipView();
        }
    }
}

let isTimerRunning = false;

function toggleTimer() {
    const timerButton = document.getElementById('timer-button');
    
    if (!isTimerRunning) {
        // Start the timer
        isTimerRunning = true;
        isTimerEnabled = true;
        timerButton.textContent = 'Stop Timer';
        timerButton.classList.add('active');
        startTimer();
    } else {
        // Stop the timer
        stopTimer();
    }
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 90;
    isWithinTimeLimit = true;
    updateTimerDisplay();
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            stopTimer();
        }
    }, 1000);
}

function stopTimer() {
    isTimerRunning = false;
    isTimerEnabled = false;
    clearInterval(timer);
    document.getElementById('timer-button').textContent = 'Start Timer';
    document.getElementById('timer-button').classList.remove('active');
    updateTimerDisplay();
}

function resetTimer() {
    stopTimer();
    timeLeft = 90;
    isWithinTimeLimit = true;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const timerContainer = document.getElementById('timer-container');
    const timerValue = document.getElementById('timer-value');
    const completeText = document.getElementById('complete-text');

    if (isTimerRunning) {
        timerContainer.style.display = 'inline';
        timerValue.textContent = timeLeft;
        completeText.textContent = '3 points';
    } else {
        timerContainer.style.display = 'none';
        completeText.textContent = '2 points';
    }
}

function resetGame() {
    players.forEach(player => player.score = 0);
    currentPlayerIndex = 0;
    updateScores();
    updateCurrentPlayer();
    drawCard();
}

function updateCurrentPlayer() {
    document.querySelectorAll('#scores > div').forEach((div, index) => {
        if (index === currentPlayerIndex) {
            div.classList.add('current-player-box');
            div.style.backgroundColor = players[index].color;
            div.style.color = getContrastColor(players[index].color);
        } else {
            div.classList.remove('current-player-box');
            div.style.backgroundColor = '';
            div.style.color = '';
        }
        div.firstChild.textContent = div.firstChild.textContent.replace("'s answering", "");
    });

    const currentPlayerBox = document.getElementById(`player${currentPlayerIndex + 1}-score`);
    currentPlayerBox.firstChild.textContent += "'s answering";
}

function resetToPlayerSetup() {
    document.getElementById('game-area').classList.add('hidden');
    document.getElementById('player-setup').classList.remove('hidden');
    document.getElementById('reset-game').classList.add('hidden');
    document.querySelector('.toggle-container').classList.add('hidden'); // Add this line
    
    // Reset the game state
    players = [];
    currentPlayerIndex = 0;
    currentCard = null;
    clearInterval(timer);
    selectedCategory = 'Icebreaker'; // Reset the selected category
    
    // Clear player inputs
    const playerInputs = document.getElementById('player-inputs');
    playerInputs.innerHTML = `
        <div class="player-input-group">
            <input type="text" class="player-name" placeholder="Player 1 Name">
            <input type="color" class="player-color" value="#cfe8fc">
        </div>
        <div class="player-input-group">
            <input type="text" class="player-name" placeholder="Player 2 Name">
            <input type="color" class="player-color" value="#a4ffaf">
        </div>
    `;
    
    // Reset the category slider
    document.getElementById('category-slider').value = '1';
    document.getElementById('category-value').textContent = 'Icebreaker';
    
    document.getElementById('score-limit').value = '10';
}

function toggleHeadToHeadMode() {
    isHeadToHeadMode = document.getElementById('head-to-head').checked;
    document.body.classList.toggle('head-to-head-mode', isHeadToHeadMode);
}

function generateRecallQuestion() {
    const recalledQuestion = questionHistory[Math.floor(Math.random() * questionHistory.length)];
    const recallPlayer = players.find(player => player.name !== recalledQuestion.player);
    
    // Select a challenge based on the selected category
    let randomChallenge;
    switch (selectedCategory) {
        case 'Icebreaker':
            randomChallenge = recallChallengesIcebreaker[Math.floor(Math.random() * recallChallengesIcebreaker.length)];
            break;
        case 'First Date':
            randomChallenge = recallChallengesFirstDate[Math.floor(Math.random() * recallChallengesFirstDate.length)];
            break;
        case 'Dating':
            randomChallenge = recallChallengesDating[Math.floor(Math.random() * recallChallengesDating.length)];
            break;
        case 'Longterm':
            randomChallenge = recallChallengesLongterm[Math.floor(Math.random() * recallChallengesLongterm.length)];
            break;
        case 'Spicy':
            randomChallenge = recallChallengesSpicy[Math.floor(Math.random() * recallChallengesSpicy.length)];
            break;
        default:
            randomChallenge = "";
    }
    
    currentCard = {
        question: `${recalledQuestion.player}'s answer to: "${recalledQuestion.question}"`,
        challenge: randomChallenge.replace('{player}', recalledQuestion.player),
        isRecall: true
    };
    
    displayCard();
    resetTimer();
}

function toggleRecallQuestions() {
    isRecallEnabled = document.getElementById('recall-questions').checked;
    // Reset the card count when toggling to avoid immediate recall question
    cardsSinceLastRecall = 0;
}

// Add this new function to handle logo click
function handleLogoClick() {
    if (!document.getElementById('game-area').classList.contains('hidden')) {
        resetToPlayerSetup();
    }
}

// Add this new function to handle flipping the view
function flipView() {
    document.body.style.transition = 'transform 0.5s ease-in-out';
    document.body.style.transform = document.body.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
}

function checkGameEnd() {
    const winner = players.find(player => player.score >= scoreLimit);
    if (winner) {
        alert(`${winner.name} wins the game!`);
        resetToPlayerSetup();
        return true;
    }
    return false;
}

// Get the modal
var modal = document.getElementById("settings-modal");

// Get the button that opens the modal
var btn = document.getElementById("settings-button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.classList.add("show");
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.classList.remove("show");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove("show");
    }
}

// Make sure these event listeners are at the end of the file
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add-player').addEventListener('click', addPlayer);
    document.getElementById('start-game').addEventListener('click', startGame);
    document.getElementById('draw-card').addEventListener('click', drawCard);
    document.getElementById('main-card').addEventListener('click', handleCardClick);
    document.getElementById('flipped-card').addEventListener('click', handleCardClick);
    document.getElementById('reset-game').addEventListener('click', resetGame);
    document.getElementById('game-logo').addEventListener('click', handleLogoClick);
    document.getElementById('head-to-head').addEventListener('change', toggleHeadToHeadMode);
    document.getElementById('recall-questions').addEventListener('change', toggleRecallQuestions);
    document.getElementById('timer-button').addEventListener('click', toggleTimer);

    const categorySlider = document.getElementById('category-slider');
    const categoryValue = document.getElementById('category-value');
    const categories = {
        1: { name: 'Icebreaker', color: '#1b2ae3' }, // Blue
        2: { name: 'First Date', color: '#551fab' }, // Intermediate between blue and cyan
        3: { name: 'Dating', color: '#86167b' }, // Cyan
        4: { name: 'Longterm', color: '#af0e53' }, // Green
        5: { name: 'Spicy', color: '#ff0000' } // Red
    };
    
    function updateCategory() {
        const category = categories[categorySlider.value];
        categoryValue.textContent = category.name;
        categoryValue.style.color = category.color;
        selectedCategory = category.name; // Update the selectedCategory variable
    }
    
    categorySlider.addEventListener('input', updateCategory);
    
    // Initialize the category display
    updateCategory();
});