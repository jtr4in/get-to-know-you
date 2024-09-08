let currentCard = null;
let isQuestion = true;
let timer = null;
let timeLeft = 30;
let players = [
    { name: "Player 1", score: 0 },
    { name: "Player 2", score: 0 }
];
let currentPlayerIndex = 0;

const cards = {
    'get-to-know': [
        { question: "What's your favorite way to spend a weekend?", challenge: "Act out your ideal weekend in charades." },
        { question: "Do you have any hidden talents?", challenge: "Demonstrate your hidden talent or make one up on the spot." },
        { question: "What's the most interesting place you've ever visited?", challenge: "Describe the place using only five words." },
        { question: "If you could live anywhere in the world, where would it be?", challenge: "Draw a quick sketch of your dream home in this location." },
        { question: "What's your favorite type of music or band?", challenge: "Hum or sing a few bars from your favorite song." },
    ],
    'married-couples': [
        { question: "What was your first impression of me?", challenge: "Reenact your first meeting in an exaggerated way." },
        { question: "What is your favorite memory from when we were dating?", challenge: "Tell the story in the style of a fairy tale." },
        { question: "What is the most memorable trip we've taken together?", challenge: "Plan an imaginary dream vacation for us in 30 seconds." },
        { question: "What was the first thing you noticed about me?", challenge: "Draw a quick sketch highlighting that feature." },
        { question: "What do you remember about our first kiss?", challenge: "Describe it using only sound effects." },
    ],
    'spice-up': [
        { question: "What is your biggest sexual fantasy?", challenge: "Write it down and seal it in an envelope to open later." },
        { question: "Is there a new position you'd like to try?", challenge: "Draw a stick figure diagram of it." },
        { question: "What's the most memorable sexual experience we've had?", challenge: "Recreate the mood with a 30-second interpretive dance." },
        { question: "What's one thing you've always wanted to do in bed but haven't?", challenge: "Whisper it in your partner's ear." },
        { question: "Do you have any secret kinks or fetishes?", challenge: "Act it out using only facial expressions." },
    ],
    'deep-personal': [
        { question: "What are your core values, and how do they shape your decisions?", challenge: "Create a quick acrostic poem using one of your core values." },
        { question: "How do you define success in your life?", challenge: "Pantomime what success looks like to you." },
        { question: "What does happiness mean to you?", challenge: "Express your idea of happiness through a series of emojis." },
        { question: "What do you think is your greatest strength and your greatest weakness?", challenge: "Act out a scenario where your strength saves the day." },
        { question: "How do you handle conflicts or disagreements in relationships?", challenge: "Role-play a conflict resolution scenario with an imaginary person." },
    ],
    'would-you-rather': [
        { question: "Would you rather have the ability to fly but only as fast as a snail, or be able to run at super speed but only for 10 seconds at a time?", challenge: "Demonstrate your choice in slow motion." },
        { question: "Would you rather have a pet dinosaur or a pet dragon?", challenge: "Make the sound your chosen pet would make." },
        { question: "Would you rather be able to speak every language fluently but never be able to write, or be able to write in every language but never speak?", challenge: "Try to communicate your choice without speaking." },
        { question: "Would you rather live in a house made entirely of chocolate or a house made entirely of marshmallows?", challenge: "Pretend to 'eat' your way out of your chosen house." },
        { question: "Would you rather always have to wear socks on your hands or always have to wear gloves on your feet?", challenge: "Try to perform a simple task with your choice." },
    ],
    'hypothetical': [
        { question: "If you could only eat food that was shaped like animals or food that was colored like rainbows, which would you choose?", challenge: "Create a menu for your chosen food type." },
        { question: "Would you rather have a pet that can talk but only in riddles or one that can sing but only in opera?", challenge: "Imitate your chosen pet." },
        { question: "If you could switch lives with any fictional character for a day, who would it be and why?", challenge: "Act out a scene as that character." },
        { question: "Would you rather live in a world where everything is made of cheese or everything is made of marshmallows?", challenge: "Describe how you'd brush your teeth in this world." },
        { question: "If you could have any one of your childhood toys come to life, which would you choose and what would you do with it?", challenge: "Have a conversation with your chosen toy." },
    ]
};

function startGame() {
    const player1Name = document.getElementById('player1-name').value || "Player 1";
    const player2Name = document.getElementById('player2-name').value || "Player 2";
    players[0].name = player1Name;
    players[1].name = player2Name;
    
    document.getElementById('player-setup').classList.add('hidden');
    document.getElementById('game-area').classList.remove('hidden');
    
    updatePlayerNames();
    updateScores();
    updateCurrentPlayer();
    drawCard();
}

function updatePlayerNames() {
    document.getElementById('player1-score').firstChild.textContent = `${players[0].name}: `;
    document.getElementById('player2-score').firstChild.textContent = `${players[1].name}: `;
}

function updateScores() {
    document.getElementById('player1-score').lastChild.textContent = players[0].score;
    document.getElementById('player2-score').lastChild.textContent = players[1].score;
}

function updateCurrentPlayer() {
    document.getElementById('current-player').firstChild.textContent = players[currentPlayerIndex].name.toUpperCase();
}

function switchPlayer() {
    currentPlayerIndex = 1 - currentPlayerIndex; // Toggle between 0 and 1
    updateCurrentPlayer();
}

function getSelectedCategory() {
    return document.getElementById('category-select').value;
}

function getSelectedDifficulty() {
    return document.getElementById('difficulty-select').value;
}

function getCardsFromCategory(category) {
    if (category === 'all') {
        return Object.values(cards).flat();
    }
    return cards[category];
}

function drawCard() {
    const category = getSelectedCategory();
    const categoryCards = getCardsFromCategory(category);
    
    let newCard;
    do {
        newCard = categoryCards[Math.floor(Math.random() * categoryCards.length)];
    } while (newCard === currentCard && categoryCards.length > 1);
    
    currentCard = newCard;
    displayCard();
    resetTimer();
}

function displayCard() {
    const mainCardElement = document.getElementById('main-card');
    const flippedCardElement = document.getElementById('flipped-card');
    
    mainCardElement.querySelector('#question').textContent = currentCard.question;
    flippedCardElement.querySelector('#challenge').textContent = currentCard.challenge;
}

function handleCardClick(event) {
    const clickedCard = event.currentTarget;
    if (clickedCard.id === 'main-card') {
        answerQuestion();
    } else if (clickedCard.id === 'flipped-card') {
        completeChallenge();
    }
}

function answerQuestion() {
    players[currentPlayerIndex].score += 1;
    updateScores();
    switchPlayer();
    drawCard();
}

function completeChallenge() {
    players[currentPlayerIndex].score += 3;
    updateScores();
    switchPlayer();
    drawCard();
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    updateTimerDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timer);
            switchPlayer();
            drawCard();
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('timer-value').textContent = timeLeft;
}

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('draw-card').addEventListener('click', drawCard);
document.getElementById('main-card').addEventListener('click', handleCardClick);
document.getElementById('flipped-card').addEventListener('click', handleCardClick);
document.getElementById('category-select').addEventListener('change', drawCard);
document.getElementById('difficulty-select').addEventListener('change', drawCard);

// Initial setup is now handled by the startGame function