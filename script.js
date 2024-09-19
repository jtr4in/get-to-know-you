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

let cards = {
  "fun-and-light": [
    { "question": "What's your favorite way to spend a weekend?", "challenge": "Describe your answer while holding an imaginary microphone." },
    { "question": "Do you have any hidden talents?", "challenge": "Say your answer while acting like you're talking to a baby." }
  ],
  "relationships": [
    { "question": "What was your first impression of me?", "challenge": "Answer while pretending you're in a dramatic soap opera scene." },
    { "question": "What is your favorite memory from when we were dating?", "challenge": "Answer your question in slow motion, like you're in a movie." }
  ],
  "deep-thoughts": [
    { "question": "What are your core values, and how do they shape your decisions?", "challenge": "Say your answer while pretending you're playing charades." },
    { "question": "How do you define success in your life?", "challenge": "Answer your question while speaking like a sports commentator." }
  ]
};

let isCardsLoaded = true; // Set this to true since cards are now embedded

// Remove the loadCards function and its call

let questionHistory = [];
const RECALL_FREQUENCY = 5; // Ask a recall question every 5 cards
let cardsSinceLastRecall = 0;

const recallChallenges = [
    "Explain {player}'s likely response, but speak as if you're giving a weather forecast.",
    "Recall {player}'s answer and deliver it like a motivational speech.",
    "Describe {player}'s response while pretending you're ordering at a fancy restaurant.",
    "Share what you think {player}'s answer was, but say it in the style of a news reporter.",
    "Recall {player}'s answer, but pretend you're narrating an audiobook.",
    "Explain {player}'s answer as if you're telling a ghost story.",
    "Summarize {player}'s response as if you're giving directions to a tourist.",
    "Recall {player}'s answer while speaking like a robot.",
    "Describe {player}'s answer as if you're a detective explaining a mystery.",
    "Share {player}'s likely answer as if you're announcing it over a loudspeaker.",
    "Pretend you're a movie trailer voice-over, and recall {player}'s answer.",
    "Describe {player}'s answer as if you're calling a sports play-by-play.",
    "Recall {player}'s answer while pretending you're giving an important business presentation.",
    "Explain {player}'s answer as if you're auditioning for a role in a movie.",
    "Recall {player}'s answer as if you're explaining it to a child.",
    "Explain {player}'s answer while pretending you're hosting a cooking show.",
    "Describe {player}'s likely response as if you're making a toast at a wedding.",
    "Pretend you're pitching {player}'s answer as the next big invention.",
    "Recall {player}'s answer while speaking as if you're on a video call with bad reception.",
    "Describe {player}'s answer as if you're making a confession.",
    "Share {player}'s answer as if you're narrating a documentary.",
    "Recall {player}'s response while pretending you're telling a bedtime story.",
    "Explain {player}'s likely response using only three words.",
    "Pretend you're in an elevator pitch and describe {player}'s answer in under 10 seconds.",
    "Recall {player}'s answer and explain it like you're delivering a stand-up comedy routine.",
    "Share {player}'s answer while pretending you're speaking to royalty.",
    "Recall {player}'s answer in a monotone, as if you're a robot reading data.",
    "Explain {player}'s response while pretending you're on a first date.",
    "Summarize {player}'s answer while pretending you're in a heated courtroom debate.",
    "Share {player}'s likely response while imitating a TV commercial jingle.",
    "Explain {player}'s answer as if you're the host of a nature documentary.",
    "Recall {player}'s response while pretending you're explaining it to a toddler.",
    "Summarize {player}'s likely answer while pretending you're an auctioneer.",
    "Explain {player}'s answer like a fitness instructor leading a workout.",
    "Recall {player}'s answer as if you're a sports coach motivating your team.",
    "Share {player}'s answer while pretending you're talking to an alien from another planet.",
    "Describe {player}'s response as if you're creating an advertisement for it.",
    "Recall {player}'s answer while pretending you're on a reality TV show.",
    "Explain {player}'s response while speaking in a movie trailer voice.",
    "Summarize {player}'s answer like you're announcing the winner of a competition.",
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
    return document.getElementById('category-select').value || 'fun-and-light';
}

function setDefaultCategory() {
    const categorySelect = document.getElementById('category-select');
    categorySelect.value = 'fun-and-light';
}

function getCardsFromCategory(category) {
    if (category === 'all') {
        return Object.values(cards).flat();
    }
    return cards[category];
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
    
    switchPlayer();
    drawCard();
    if (document.getElementById('head-to-head').checked) {
        toggleHeadToHeadMode();
    }
}

function completeChallenge() {
    const points = isWithinTimeLimit ? 3 : 2;
    players[currentPlayerIndex].score += points;
    updateScores();
    switchPlayer();
    drawCard();
    if (document.getElementById('head-to-head').checked) {
        toggleHeadToHeadMode();
    }
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 90;
    isWithinTimeLimit = true;
    updateTimerDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timer);
            isWithinTimeLimit = false;
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerContainer = document.getElementById('timer-container');
    const timerValue = document.getElementById('timer-value');
    const completeText = document.getElementById('complete-text');
    const timerNote = document.getElementById('timer-note');

    if (timeLeft > 0) {
        timerValue.textContent = timeLeft;
        timerContainer.style.display = 'inline';
        completeText.textContent = '3 points';
        timerNote.textContent = '';
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

document.getElementById('start-game').addEventListener('click', () => {
    if (!isCardsLoaded) {
        console.log('Cards not loaded yet, waiting...');
        setTimeout(startGame, 1000); // Wait 1 second and try again
    } else {
        startGame();
    }
});

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
}

function toggleHeadToHeadMode() {
    isHeadToHeadMode = !isHeadToHeadMode;
    document.body.classList.toggle('head-to-head-mode', isHeadToHeadMode);
}

function generateRecallQuestion() {
    const recalledQuestion = questionHistory[Math.floor(Math.random() * questionHistory.length)];
    const recallPlayer = players.find(player => player.name !== recalledQuestion.player);
    const challenge = recallChallenges[Math.floor(Math.random() * recallChallenges.length)];
    
    currentCard = {
        question: `${recalledQuestion.player}'s answer to: "${recalledQuestion.question}"`,
        challenge: challenge.replace('{player}', recalledQuestion.player),
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

document.getElementById('add-player').addEventListener('click', addPlayer);
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('draw-card').addEventListener('click', drawCard);
document.getElementById('main-card').addEventListener('click', handleCardClick);
document.getElementById('flipped-card').addEventListener('click', handleCardClick);
document.getElementById('category-select').addEventListener('change', drawCard);
document.getElementById('reset-game').addEventListener('click', resetGame);
document.getElementById('game-logo').addEventListener('click', handleLogoClick);
document.getElementById('head-to-head').addEventListener('change', toggleHeadToHeadMode);
document.getElementById('recall-questions').addEventListener('change', toggleRecallQuestions);

// Initial setup is now handled by the startGame function
