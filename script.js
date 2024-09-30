let currentCard = null;
let isQuestion = true;
let players = [];
let currentPlayerIndex = 0;
let isHeadToHeadMode = false;
let isRecallEnabled = true;
let selectedCategory = 'Icebreaker';
let scoreLimit = 20;

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
const RECALL_FREQUENCY = 10; // Ask a recall question every 5 cards
let cardsSinceLastRecall = 0;

const challengesIcebreaker = [
    "Answer in a whisper.",
    "Respond using only facial expressions for 10 seconds, then explain.",
    "Give your answer in the style of a movie trailer narrator.",
    "Answer while mimicking your favorite animal.",
    "Respond as if you're a superhero revealing your secret identity.",
    "Answer with an accent of your choice.",
    "Respond as if you're a time traveler from the year 3000.",
    "Give your answer in the form of a haiku.",
    "Answer as if you're a robot learning human emotions.",
    "Respond by singing your answer to a familiar tune.",
    "Answer while pretending you're underwater.",
    "Give your response as if you're a sports commentator.",
    "Answer in slow motion.",
    "Respond as if you're a royal addressing your subjects.",
    "Give your answer while doing your best celebrity impression."
];

const challengesFirstDate = [
    "Answer while maintaining eye contact for the full response.",
    "Give your response as if it's a cheesy pick-up line.",
    "Answer in the style of a poet professing their love.",
    "Respond as if you're trying to impress your date with your knowledge.",
    "Give your answer while pretending to be irresistibly charming.",
    "Answer as if you're in a romantic comedy meet-cute scene.",
    "Respond by complimenting your date after every sentence.",
    "Give your answer while pretending to be shy and bashful.",
    "Answer as if you're trying to make your date laugh.",
    "Respond in the style of your favorite romantic movie character.",
    "Give your answer while pretending to be love-struck.",
    "Answer as if you're trying to casually mention how cool you are.",
    "Respond by relating everything back to your 'impressive' achievements.",
    "Give your answer while playfully teasing your date.",
    "Answer as if you're nervously rambling on a first date."
];

const challengesDating = [
    "Answer while holding your partner's hand.",
        "Give your response as if it's a secret you've never told anyone.",
        "Answer in a sultry voice.",
        "Respond while giving your partner a compliment every few words.",
        "Give your answer as if you're proposing a romantic date idea.",
        "Answer while gazing lovingly into your partner's eyes.",
        "Respond as if you're writing a love letter to your partner.",
        "Give your answer while playfully feeding your partner an imaginary treat.",
        "Answer as if you're trying to convince your partner to move in together.",
        "Respond by incorporating your favorite shared memory with your partner.",
        "Give your answer while planning a surprise weekend getaway for your partner.",
        "Answer as if you're composing a romantic song for your partner.",
        "Respond by describing your perfect day together.",
        "Give your answer while pretending to slow dance with your partner.",
        "Answer as if you're sharing your hopes for your future together."
];

const challengesLongterm = [
  "Answer while slowly caressing your partner's arm or leg.",
        "Give your response in your most seductive voice.",
        "Answer while describing what you find most attractive about your partner.",
        "Respond by whispering three words at a time, pausing sensually between each set.",
        "Give your answer while imagining and describing a passionate scenario with your partner.",
        "Answer as if you're trying to seduce your partner for the first time.",
        "Respond by describing your favorite intimate moment together.",
        "Give your answer while playfully teasing your partner about their 'irresistible' qualities.",
        "Answer as if you're planning a steamy surprise for your partner.",
        "Respond by sharing a sensual fantasy involving your partner.",
        "Give your answer while describing how your partner makes you feel physically.",
        "Answer as if you're leaving a flirtatious voicemail for your partner.",
        "Respond by suggesting a playful, intimate dare for your partner.",
        "Give your answer while describing your ideal romantic evening together.",
        "Answer as if you're trying to convince your partner to take a sensual bath together."
   

];

const challengesSpicy = [
    "Answer while gently holding each other's gaze for 10 seconds before speaking.",
    "Answer while tracing your partner's hand with your fingertips.",
    "Answer while softly caressing your partner's face with both hands.",
    "Answer while whispering your response, leaning in close to their ear."
];

const challengesRecall = [
    "Answer as if you're a detective solving a mystery.",
    "Answer while mimicking the other player's mannerisms.",
    "Answer as if you're telling a secret.",
    "Answer while doing your best impression of the other player.",
    "Answer as if you're giving a dramatic speech.",
    "Answer while acting out the scenario in charades.",
    "Answer as if you're a time traveler from the future.",
    "Answer while using only three-word sentences.",
    "Answer as if you're a news reporter breaking a big story."
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
function updateGameSlider() {
    const slider = document.getElementById('game-category-slider');
    const fill = document.querySelector('#game-category-container .slider-fill');
    const categoryValue = document.getElementById('game-category-value');
    
    if (!slider || !fill || !categoryValue) return;

    const value = parseFloat(slider.value);
    const percentage = ((value - 1) / 4) * 100;
    
    fill.style.width = `${percentage}%`;
    
    const categories = ['Icebreaker', 'First Date', 'Dating', 'Longterm', 'Spicy'];
    const category = categories[Math.floor(value) - 1];
    categoryValue.textContent = category;
    
    // Update the selected category for the game
    selectedCategory = category;
    
    // Optionally, you might want to redraw a card here
    // drawCard();
}

function startGame() {
    const playerInputGroups = document.querySelectorAll('.player-input-group');
    function startGame() {
    
    
        const setupSlider = document.getElementById('category-slider');
        const initialCategoryValue = setupSlider.value;
        const initialCategory = getCategory(initialCategoryValue).name;
    
        // Create a new slider for the game area
        const gameCategoryContainer = document.getElementById('game-category-container');
        gameCategoryContainer.innerHTML = `
            <div class="slider-container">
                <input type="range" id="game-category-slider" min="1" max="5" value="${initialCategory}" step="0.01">
                <div class="slider-fill"></div>
            </div>
            <div id="game-category-value"></div>
        `;
        function updateGameSlider(initialValue) {
            const slider = document.getElementById('game-category-slider');
            const fill = document.querySelector('#game-category-container .slider-fill');
            const categoryValue = document.getElementById('game-category-value');
            
            if (!slider || !fill || !categoryValue) return;
        
            // Use the passed value if available, otherwise use the slider's current value
            const value = initialValue !== undefined ? initialValue : parseFloat(slider.value);
            
            // Ensure the slider's value is set correctly
            slider.value = value;
        
            const percentage = ((value - 1) / 4) * 100;
            
            fill.style.width = `${percentage}%`;
            
            const categories = ['Icebreaker', 'First Date', 'Dating', 'Longterm', 'Spicy'];
            const category = categories[Math.floor(value) - 1];
            categoryValue.textContent = category;
            
            // Update the selected category for the game
            selectedCategory = category;
            
            // Optionally, you might want to redraw a card here
            // drawCard();
        }
    
        const gameCategorySlider = document.getElementById('game-category-slider');
        const gameCategoryValue = document.getElementById('game-category-value');
    
        // Set up the event listener for the new slider
        gameCategorySlider.addEventListener('input', updateGameSlider);
    
        // Initialize the game slider
        updateGameSlider();
    
        // ... rest of the function ...
    }
    
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
    
    scoreLimit = parseInt(document.getElementById('score-limit').value) || 20;
    
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

    // Create a new slider for the game area
    const gameCategoryContainer = document.getElementById('game-category-container');
    gameCategoryContainer.innerHTML = `
        <span id="game-category-value">Icebreaker</span>
        <input type="range" id="game-category-slider" min="1" max="5" value="1" step="0.01">
    `;

    const gameCategorySlider = document.getElementById('game-category-slider');
    const gameCategoryValue = document.getElementById('game-category-value');

    // Set up the event listener for the new slider
    gameCategorySlider.addEventListener('input', (event) => {
        const value = parseFloat(event.target.value);
        const category = getCategory(value);
        gameCategoryValue.textContent = category.name;
        updateSliderBackground(gameCategorySlider);
        selectedCategory = category.name;
        drawCard(); // Redraw card with new category
    });

    // Initialize the slider background
    updateSliderBackground(gameCategorySlider);
}

function getCategory(value) {
    const categories = [
        { name: 'Icebreaker', color: '#1b2ae3' },
        { name: 'First Date', color: '#551fab' },
        { name: 'Dating', color: '#86167b' },
        { name: 'Longterm', color: '#af0e53' },
        { name: 'Spicy', color: '#ff0000' }
    ];
    const index = Math.min(Math.floor(value - 1), categories.length - 1);
    return categories[index];
}

function updateSliderBackground(slider) {
    const value = parseFloat(slider.value);
    const percentage = ((value - 1) / 4) * 100;
    const gradientStops = [
        { color: '#1b2ae3', position: 0 },
        { color: '#551fab', position: 25 },
        { color: '#86167b', position: 50 },
        { color: '#af0e53', position: 75 },
        { color: '#ff0000', position: 100 }
    ];
    
    const gradient = gradientStops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
    slider.style.background = `linear-gradient(to right, ${gradient})`;
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
    console.log("Switching player. Current index before switch:", currentPlayerIndex);
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    console.log("New current index after switch:", currentPlayerIndex);
    console.log("Current player after switch:", players[currentPlayerIndex].name);
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

let isFlipped = false;

function drawCard() {
    console.log("Drawing card for player:", players[currentPlayerIndex].name);
    cardsSinceLastRecall++;
    
    if (isRecallEnabled && cardsSinceLastRecall >= RECALL_FREQUENCY && questionHistory.length > 0) {
        console.log("Generating recall question");
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
                randomChallenge = challengesIcebreaker[Math.floor(Math.random() * challengesIcebreaker.length)];
                break;
            case 'First Date':
                randomChallenge = challengesFirstDate[Math.floor(Math.random() * challengesFirstDate.length)];
                break;
            case 'Dating':
                randomChallenge = challengesDating[Math.floor(Math.random() * challengesDating.length)];
                break;
            case 'Longterm':
                randomChallenge = challengesLongterm[Math.floor(Math.random() * challengesLongterm.length)];
                break;
            case 'Spicy':
                randomChallenge = challengesSpicy[Math.floor(Math.random() * challengesSpicy.length)];
                break;
            default:
                randomChallenge = "";
        }
        
        currentCard = {
            question: newCard.question,
            challenge: randomChallenge
        };
        
        displayCard();
    }

    if (document.getElementById('head-to-head').checked) {
        flipBoard();
    } else {
        resetBoardOrientation();
    }
}

function displayCard() {
    const mainCardElement = document.getElementById('main-card');
    const flippedCardElement = document.getElementById('flipped-card');
    
    mainCardElement.querySelector('#question').textContent = currentCard.question;
    
    if (currentCard.isRecall) {
        mainCardElement.style.backgroundColor = "#77459b"; // Deep Purple for recall questions
        flippedCardElement.style.backgroundColor = "#b45a5a"; // Firebrick Red for recall challenges
        flippedCardElement.querySelector('#challenge').textContent = "Uh...";
        flippedCardElement.querySelector('#complete-text').textContent = "-1 point";
    } else {
        mainCardElement.style.backgroundColor = "#ff4081"; // Pink for regular questions
        flippedCardElement.style.backgroundColor = "#ca8fa2"; // Lighter pink for regular challenges
        flippedCardElement.querySelector('#challenge').textContent = currentCard.challenge;
        flippedCardElement.querySelector('#complete-text').textContent = "2 points";
    }
    
    // Ensure other styles remain consistent
    mainCardElement.style.width = flippedCardElement.style.width = "200px";
    mainCardElement.style.height = flippedCardElement.style.height = "250px";

    
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
        
        // Flip the view after processing the card, if in head-to-head mode
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
    const points = 1;
    players[currentPlayerIndex].score += points;
    updateScores();
    
    // Store the question for potential recall later
    if (!currentCard.isRecall) {
        questionHistory.push({
            question: currentCard.question,
            player: players[currentPlayerIndex].name
        });
        
        // Limit the history to the last 10 questions
        if (questionHistory.length > 10) {
            questionHistory.shift();
        }
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
    let points;
    if (currentCard.isRecall) {
        points = -1; // Deduct 2 points for "Forgot" on recall questions
    } else {
        points = 2; // Award 2 points for completing regular challenges
    }
    
    players[currentPlayerIndex].score += points;
    updateScores();
    
    // Store the question for potential recall later, even for recall questions
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

function resetGame() {
    // Remove the stopConfetti() call since it's not defined
    gameEndAlertShown = false;
    document.getElementById('winner-modal').style.display = 'none';
    
    // Clear any ongoing confetti
    if (typeof confetti !== 'undefined' && confetti.reset) {
        confetti.reset();
    }
    
    // Clear the confetti interval if it exists
    if (typeof confettiInterval !== 'undefined') {
        clearInterval(confettiInterval);
    }
    
    // Reset game state
    currentCard = null;
    isQuestion = true;
    players = [];
    currentPlayerIndex = 0;
    isHeadToHeadMode = false;
    isRecallEnabled = true;
    selectedCategory = 'Icebreaker';
    scoreLimit = 20;
    questionHistory = [];
    cardsSinceLastRecall = 0;
    
    // Reset UI
    document.getElementById('game-area').classList.add('hidden');
    document.getElementById('player-setup').classList.remove('hidden');
    document.getElementById('reset-game').classList.add('hidden');
    document.querySelector('.toggle-container').classList.add('hidden');
    document.body.classList.remove('head-to-head-mode');
    document.body.style.transform = 'rotate(0deg)';
    
    // Reset player inputs
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
    
    // Reset category slider and score limit
    document.getElementById('category-slider').value = '1';
    document.getElementById('category-value').textContent = 'Icebreaker';
    document.getElementById('score-limit').value = '20';
    
    // Reset checkboxes
    document.getElementById('head-to-head').checked = false;
    document.getElementById('recall-questions').checked = true;
    
    // Clear scores display
    document.getElementById('scores').innerHTML = '';
    
    // Reload the page to ensure all states are reset
    location.reload();
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
    
    document.getElementById('score-limit').value = '20';
}

function toggleHeadToHeadMode() {
    isHeadToHeadMode = document.getElementById('head-to-head').checked;
    document.body.classList.toggle('head-to-head-mode', isHeadToHeadMode);
    if (!isHeadToHeadMode) {
        // Reset rotation when turning off head-to-head mode
        document.body.style.transform = 'rotate(0deg)';
    }
}

function generateRecallQuestion() {
    console.log("Generating recall question for player:", players[currentPlayerIndex].name);
    console.log("Current player index:", currentPlayerIndex);
    console.log("All players:", players);
    console.log("Question history:", questionHistory);
    
    // Find the other player's name
    const otherPlayerName = players.find(player => player.name !== players[currentPlayerIndex].name).name;
    console.log("Other player name:", otherPlayerName);
    
    // Filter questions answered by the other player
    const otherPlayerQuestions = questionHistory.filter(q => q.player === otherPlayerName);
    console.log("Other player questions:", otherPlayerQuestions);
    
    // If there are no questions from the other player, draw a regular card instead
    if (otherPlayerQuestions.length === 0) {
        console.log("No other player questions, drawing regular card");
        drawCard();
        return;
    }

    const recalledQuestion = otherPlayerQuestions[Math.floor(Math.random() * otherPlayerQuestions.length)];
    console.log("Recalled question:", recalledQuestion);
    
    const randomRecallChallenge = challengesRecall[Math.floor(Math.random() * challengesRecall.length)];
    
    currentCard = {
        question: `What was ${recalledQuestion.player}'s answer to: "${recalledQuestion.question}"`,
        challenge: randomRecallChallenge,
        isRecall: true
    };
    
    displayCard();
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
    const winningPlayer = players.find(player => player.score >= scoreLimit);
    if (winningPlayer && !gameEndAlertShown) {
        const winnerName = winningPlayer.name;
        document.getElementById('game-area').classList.add('hidden');
        document.getElementById('player-setup').classList.remove('hidden');
        
        // Trigger confetti effect
        triggerWinningCelebration();
        
        // Show modal immediately
        showWinnerModal(winnerName);
        gameEndAlertShown = true;
        
        return true;
    }
    return false;
}

function showWinnerModal(winnerName) {
    const modal = document.getElementById('winner-modal');
    const winnerMessage = document.getElementById('winner-message');
    winnerMessage.textContent = `${winnerName} wins!`;
    modal.style.display = 'block';

    const newGameButton = document.getElementById('new-game-button');
    newGameButton.onclick = function() {
        modal.style.display = 'none';
        resetGame();
    }

    // Close the modal if clicked outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            resetGame();
        }
    }
}
let gameEndAlertShown = false;


function triggerWinningCelebration() {
    // Play winning sound
    const winningSound = document.getElementById('winning-sound');
    winningSound.play();

    // Confetti effect
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    confettiInterval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(confettiInterval);
        }

        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
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

function skipTurn() {
    const points = 1; // Points to deduct for skipping
    players[currentPlayerIndex].score -= points;
    updateScores();
    
    if (!checkGameEnd()) {
        switchPlayer();
        drawCard();
        if (document.getElementById('head-to-head').checked) {
            flipView();
        }
    }
}


// Make sure these event listeners are at the end of the file
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add-player').addEventListener('click', addPlayer);
    document.getElementById('start-game').addEventListener('click', startGame);
    document.getElementById('draw-card').addEventListener('click', drawCard);
    document.getElementById('skip-turn').addEventListener('click', skipTurn); // Add event listener for skip button
    document.getElementById('main-card').addEventListener('click', handleCardClick);
    document.getElementById('flipped-card').addEventListener('click', handleCardClick);
    document.getElementById('reset-game').addEventListener('click', resetGame);
    document.getElementById('game-logo').addEventListener('click', handleLogoClick);
    document.getElementById('head-to-head').addEventListener('change', toggleHeadToHeadMode);
    document.getElementById('recall-questions').addEventListener('change', toggleRecallQuestions);

    const categorySlider = document.getElementById('category-slider');
    const categoryValue = document.getElementById('category-value');
    const categories = {
        1: { name: 'Icebreaker', color: '#1b2ae3' }, // Blue
        2: { name: 'First Date', color: '#551fab' }, // Purple
        3: { name: 'Dating', color: '#86167b' }, // Maroon
        4: { name: 'Longterm', color: '#af0e53' }, // Red
        5: { name: 'Spicy', color: '#ff0000' } // Bright Red
    };
    
    function updateSliderBackground(value) {
        const percentage = ((value - 1) / 4) * 100;
        const category = categories[Math.round(value)];
        categorySlider.style.background = `linear-gradient(to right, ${category.color} ${percentage}%, #ddd ${percentage}%)`;
    }
    
    categorySlider.addEventListener('input', (event) => {
        const value = parseFloat(event.target.value);
        const category = categories[Math.round(value)];
        categoryValue.textContent = category.name;
        updateSliderBackground(value);
    });
    
    // Initialize the slider with the starting category
    const initialCategory = categories[Math.round(categorySlider.value)];
    categoryValue.textContent = initialCategory.name;
    updateSliderBackground(parseFloat(categorySlider.value));

    // Add these new event listeners
    const termsLink = document.getElementById('terms-link');
    const privacyLink = document.getElementById('privacy-link');
    const termsModal = document.getElementById('terms-modal');
    const privacyModal = document.getElementById('privacy-modal');
    const closeBtns = document.getElementsByClassName('close');

    termsLink.onclick = function(e) {
        e.preventDefault();
        termsModal.classList.add('show');
    }

    privacyLink.onclick = function(e) {
        e.preventDefault();
        privacyModal.classList.add('show');
    }

    for (let closeBtn of closeBtns) {
        closeBtn.onclick = function() {
            termsModal.classList.remove('show');
            privacyModal.classList.remove('show');
        }
    }

    window.onclick = function(event) {
        if (event.target == termsModal || event.target == privacyModal) {
            termsModal.classList.remove('show');
            privacyModal.classList.remove('show');
        }
    }

    // Get the settings modal
    var settingsModal = document.getElementById("settings-modal");

    // Get the button that opens the settings modal
    var settingsBtn = document.getElementById("settings-button");

    // Get the <span> element that closes the settings modal
    var settingsCloseBtn = settingsModal.querySelector(".close");

    // When the user clicks the settings button, open the modal 
    settingsBtn.onclick = function() {
        settingsModal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the settings modal
    settingsCloseBtn.onclick = function() {
        settingsModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == settingsModal) {
            settingsModal.style.display = "none";
        }
    }
});

let isFlipMode = false;
let flipInterval;

function toggleFlipMode() {
    isFlipMode = !isFlipMode;
    if (isFlipMode) {
        startFlipping();
    } else {
        stopFlipping();
    }
}



// Add this event listener to your existing code
document.getElementById('head-to-head').addEventListener('change', toggleFlipMode);

function applyFlip() {
    if (isFlipped) {
        document.body.classList.add('head-to-head-mode');
    } else {
        document.body.classList.remove('head-to-head-mode');
    }
}

// Make sure to call this when the game starts or when flip mode is toggled
document.getElementById('head-to-head').addEventListener('change', function() {
    if (!this.checked) {
        isFlipped = false;
        document.body.classList.remove('head-to-head-mode');
    }
});

function flipBoard() {
    document.body.classList.toggle('head-to-head-mode');
}

function resetBoardOrientation() {
    document.body.classList.remove('head-to-head-mode');
}

// Event listener for the flip mode toggle
document.getElementById('head-to-head').addEventListener('change', function() {
    if (this.checked) {
        flipBoard();
    } else {
        resetBoardOrientation();
    }
});