let currentCard = null;
let isQuestion = true;
let timer = null;
let timeLeft = 30;
let players = [];
let currentPlayerIndex = 0;
let isTimerDisabled = true;
let isWithinTimeLimit = true;

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
    
    document.getElementById('player-setup').classList.add('hidden');
    document.getElementById('game-area').classList.remove('hidden');
    
    document.getElementById('reset-game').classList.remove('hidden');
    
    updatePlayerNames();
    updateScores();
    updateCurrentPlayer();
    drawCard();
    
    // Show point system for multiplayer mode
    if (players.length > 1) {
        document.querySelectorAll('.card-footer').forEach(footer => footer.style.display = 'block');
    } else {
        // Hide point system for single player mode
        document.querySelectorAll('.card-footer').forEach(footer => footer.style.display = 'none');
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
    return document.getElementById('category-select').value;
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
    
    // Add pop animation
    clickedCard.classList.add('card-pop-animation');
    setTimeout(() => {
        clickedCard.classList.remove('card-pop-animation');
    }, 300); // 300ms matches the animation duration
    
    if (clickedCard.id === 'main-card') {
        answerQuestion();
    } else if (clickedCard.id === 'flipped-card') {
        completeChallenge();
    }
}

function answerQuestion() {
    const points = isWithinTimeLimit ? 3 : 2;
    players[currentPlayerIndex].score += points;
    updateScores();
    animateScoreBox(currentPlayerIndex);
    switchPlayer();
    drawCard();
}

function completeChallenge() {
    const points = isWithinTimeLimit ? 3 : 2;
    players[currentPlayerIndex].score += points;
    updateScores();
    animateScoreBox(currentPlayerIndex);
    switchPlayer();
    drawCard();
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
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

    if (timeLeft > 0) {
        timerValue.textContent = timeLeft;
        timerContainer.style.display = 'flex';
        completeText.textContent = 'Complete for 3 points';
    } else {
        timerContainer.style.display = 'none';
        completeText.textContent = 'Complete for 2 points';
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
    const scoresContainer = document.getElementById('scores');
    scoresContainer.style.backgroundColor = players[currentPlayerIndex].color;
    scoresContainer.style.color = getContrastColor(players[currentPlayerIndex].color);

    // Remove the current-player-box class and "'s turn" text from all player boxes
    document.querySelectorAll('#scores > div').forEach(div => {
        div.classList.remove('current-player-box');
        div.firstChild.textContent = div.firstChild.textContent.replace("'s turn", "");
    });

    // Add the current-player-box class to the current player's box and append "'s turn"
    const currentPlayerBox = document.getElementById(`player${currentPlayerIndex + 1}-score`);
    currentPlayerBox.classList.add('current-player-box');
    currentPlayerBox.firstChild.textContent += "'s turn";

    // Add background pop animation
    scoresContainer.classList.remove('background-pop-animation');
    void scoresContainer.offsetWidth; // Trigger reflow
    scoresContainer.classList.add('background-pop-animation');
}

function animateScoreBox(playerIndex) {
    const scoreElement = document.getElementById(`player${playerIndex + 1}-score`);
    scoreElement.classList.add('pop-animation');
    // Remove the class after the animation completes
    setTimeout(() => {
        scoreElement.classList.remove('pop-animation');
    }, 300); // 300ms matches the animation duration
}

document.getElementById('add-player').addEventListener('click', addPlayer);
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('draw-card').addEventListener('click', drawCard);
document.getElementById('main-card').addEventListener('click', handleCardClick);
document.getElementById('flipped-card').addEventListener('click', handleCardClick);
document.getElementById('category-select').addEventListener('change', drawCard);
document.getElementById('reset-game').addEventListener('click', resetGame);

// Initial setup is now handled by the startGame function