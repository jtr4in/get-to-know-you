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
let scoreLimit = 20;

const cards = {
    'Icebreaker': [
        { question: "What's your favorite way to spend a weekend?" },
        { question: "Do you have any hidden talents?" },
        { question: "What's the most interesting place you've ever visited?" },
        { question: "If you could live anywhere in the world, where would it be?" },
        { question: "What's your favorite type of music or band?" },
        { question: "Would you rather have the ability to fly but only as fast as a snail, or be able to run at super speed but only for 10 seconds at a time?" },
        { question: "Would you rather have a pet dinosaur or a pet dragon?" },
        { question: "Would you rather be able to speak every language fluently but never be able to write, or be able to write in every language but never speak?" },
        { question: "Would you rather live in a house made entirely of chocolate or a house made entirely of marshmallows?" },
        { question: "Would you rather always have to wear socks on your hands or always have to wear gloves on your feet?" },
        { question: "If you could have any animal as a pet, what would it be?" },
        { question: "What's your favorite season and why?" },
        { question: "If you had to eat only one food for the rest of your life, what would it be?" },
        { question: "What's your favorite holiday?" },
        { question: "If you could instantly master any skill, what would it be?" },
        { question: "What's your favorite board game?" },
        { question: "If you had a million dollars, what would you do with it?" },
        { question: "What's your favorite dessert?" },
        { question: "If you could be any age for a week, what age would you be?" },
        { question: "What's your dream job?" },
        { question: "If you could live in any time period, what would it be?" },
        { question: "What's the weirdest food you've ever eaten?" },
        { question: "If you were a color, what color would you be?" },
        { question: "What's the best gift you've ever received?" },
        { question: "If you could meet any fictional character, who would it be?" },
        { question: "What's your favorite thing to do in the morning?" },
        { question: "What's the most fun party you've ever been to?" },
        { question: "If you could have dinner with any celebrity, who would it be?" },
        { question: "What's your favorite animal and why?" },
        { question: "If you could be famous for anything, what would it be?" },
        { question: "If you could have any fictional character's powers, whose would you want?" },
        { question: "What's your go-to karaoke song?" },
        { question: "What's the most unusual job you've ever had?" },
        { question: "If you could live in any movie universe, which would it be?" },
        { question: "What's the funniest thing that's ever happened to you?" },
        { question: "What's your least favorite chore?" },
        { question: "What's your favorite outdoor activity?" },
        { question: "If you could invent anything, what would it be?" },
        { question: "What's your favorite TV show?" },
        { question: "If you could be any age for the rest of your life, what would it be?" },
        { question: "What's your favorite vacation destination?" },
        { question: "If you were a type of weather, what would you be?" },
        { question: "What's the strangest talent you have?" },
        { question: "If you could change your name, what would it be?" },
        { question: "What's your favorite subject in school?" },
        { question: "What's your favorite drink?" },
        { question: "If you could have one wish granted, what would it be?" },
        { question: "What's your favorite sport to watch or play?" },
        { question: "If you could have a conversation with anyone, dead or alive, who would it be?" },
        { question: "What's your dream car?" },
        { question: "What's the best prank you've ever pulled?" },
        { question: "If you could live under the sea, what sea creature would you be?" },
        { question: "What's your favorite way to exercise?" },
        { question: "If you were a superhero, what would your superpower be?" },
        { question: "What's the most interesting book you've ever read?" },
        { question: "If you could have a personal robot, what would you ask it to do?" },
        { question: "What's your favorite app on your phone?" },
        { question: "If you were a fruit, what kind would you be?" },
        { question: "What's the best concert or live event you've ever been to?" },
        { question: "What's one thing you always keep in your bag or pocket?" },
        { question: "If you could visit any planet, which one would it be?" },
        { question: "What's your favorite snack?" },
        { question: "If you could turn invisible for one day, what would you do?" },
        { question: "What's the best meal you've ever had?" },
        { question: "If you could live in any fictional world, what would it be?" },
        { question: "What's the weirdest dream you've ever had?" },
        { question: "If you could play any musical instrument, what would it be?" },
        { question: "What's your favorite thing to do on a rainy day?" },
        { question: "If you could design a theme park ride, what would it be?" },
        { question: "What's the most unique job you've ever heard of?" },
        { question: "If you could only eat one type of cuisine for the rest of your life, what would it be?" },
        { question: "What's your favorite video game?" },
        { question: "If you could be any mythical creature, what would you be?" },
        { question: "What's the silliest thing you've ever done?" },
        { question: "If you could be fluent in any language, what would it be?" },
        { question: "What's your favorite guilty pleasure TV show or movie?" },
        { question: "If you could be any cartoon character, who would it be?" },
        { question: "What's the most creative thing you've ever done?" },
        { question: "If you could be any video game character, who would it be?" },
        { question: "What's the most unusual thing you've ever seen?" },
        { question: "If you could live anywhere for a year, where would it be?" },
        { question: "What's the most exciting sporting event you've ever been to?" },
        { question: "If you could have any animal as a pet, what would it be?" },
        { question: "What's your favorite thing to do with friends?" },
        { question: "If you could swim in any substance, what would it be?" },
        { question: "What's the best advice you've ever received?" },
        { question: "If you were a candy, what kind would you be?" },
        { question: "What's your favorite icebreaker game?" },
        { question: "If you could spend a day with any animal, what would it be?" },
        { question: "What's the funniest joke you've ever heard?" },
        { question: "If you could write a book, what would it be about?" },
        { question: "What's the coolest thing you've ever built or created?" },
        { question: "If you could have any career for a week, what would it be?" },
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
    { question: "What's a secret fantasy you've never shared before?" },
    { question: "Have you ever wanted to try role-playing in the bedroom?" },
    { question: "What's the most adventurous place you've been intimate?" },
    { question: "Do you have a favorite type of lingerie or attire that makes you feel sexy?" },
    { question: "How do you feel about incorporating toys into your intimate moments?" },
    { question: "What's a sensual activity you'd love to explore with a partner?" },
    { question: "Do you have any specific kinks or fetishes you're curious about?" },
    { question: "What's the most daring thing you've ever done during intimacy?" },
    { question: "How do you feel about being blindfolded or restrained?" },
    { question: "What's a sound or word that instantly turns you on?" },
    { question: "Do you prefer taking the lead or being led in intimate situations?" },
    { question: "Have you ever been intrigued by the idea of group intimacy?" },
    { question: "What's your favorite way to initiate intimacy?" },
    { question: "Have you ever had a dream that left you feeling aroused?" },
    { question: "What's a skill you'd like to improve to enhance your intimate experiences?" },
    { question: "What's the most risqué outfit you've ever worn or would like to wear?" },
    { question: "Do you enjoy watching erotic content alone or with a partner?" },
    { question: "What's an unexpected place that arouses you?" },
    { question: "Do you have a go-to move that always heightens the moment?" },
    { question: "How do you feel about experimenting with different types of touch?" },
    { question: "What's an erotic book or story that captivated you?" },
    { question: "Are you comfortable with sexting or sharing intimate photos?" },
    { question: "Have you ever tried mutual self-exploration with a partner?" },
    { question: "What's a daring adventure you'd like to embark on in the bedroom?" },
    { question: "Do you have any surprising turn-ons?" },
    { question: "How do you feel about incorporating dirty talk into intimacy?" },
    { question: "What's a song that always puts you in a sensual mood?" },
    { question: "Have you ever been intimate outdoors or in a public place?" },
    { question: "What's a scent that you find irresistibly seductive?" },
    { question: "Do you prefer morning intimacy or late-night encounters?" },
    { question: "What's the most passionate kiss you've ever experienced?" },
    { question: "Have you ever tried playing with temperature, like ice or heat?" },
    { question: "What's your favorite part of your body that you love to be touched?" },
    { question: "Do you have any fantasies involving specific costumes or outfits?" },
    { question: "What's the most memorable intimate moment you've had?" },
    { question: "How do you feel about watching yourselves in mirrors during intimacy?" },
    { question: "What's a sexual skill you admire in others?" },
    { question: "Are there any unconventional spots on your body that are sensitive?" },
    { question: "Have you ever been curious about tantric practices?" },
    { question: "How do you feel about combining travel with intimate exploration?" },
    { question: "Do you have a favorite position or one you'd like to try?" },
    { question: "What's a fantasy scenario that excites you?" },
    { question: "Do you enjoy being teased or teasing your partner?" },
    { question: "What's something that instantly ignites your desire?" },
    { question: "Have you ever experimented with role reversal in intimacy?" },
    { question: "What's the most provocative message you've ever sent?" },
    { question: "Do you enjoy spontaneous intimacy or prefer to plan ahead?" },
    { question: "What's a bold question you've always wanted to ask about intimacy?" },
    { question: "How open are you to discussing past experiences with a partner?" },
    { question: "Is there a boundary you're interested in exploring?" },
    { question: "Have you ever tried sensory deprivation to heighten pleasure?" },
    { question: "What's the most flattering intimate compliment you've received?" },
    { question: "Do you have a preferred time of day when you feel most passionate?" },
    { question: "What's a simple gesture that turns you on immediately?" },
    { question: "Have you ever incorporated technology into your intimate life?" },
    { question: "What's the most seductive act someone has done for you?" },
    { question: "Do you enjoy engaging multiple senses during intimacy?" },
    { question: "Have you ever fantasized about adding another person to the mix?" },
    { question: "What's your take on long-distance intimacy and keeping the spark alive?" },
    { question: "How do you feel about recording your intimate moments?" },
    { question: "What's an intimate adventure you'd like to plan with someone?" },
    { question: "Do you find the idea of public intimacy thrilling?" },
    { question: "What's a song that makes you feel irresistibly sexy?" },
    { question: "Have you ever had an unexpected intimate dream about someone?" },
    { question: "Is there a secret turn-on you'd be willing to share?" },
    { question: "Do you have a favorite intimate accessory or toy?" },
    { question: "What's a unique way you like to be touched?" },
    { question: "How open are you to experimenting with new positions or techniques?" },
    { question: "Have you explored any aspects of BDSM that intrigue you?" },
    { question: "What's the boldest outfit you've worn or wish to wear intimately?" },
    { question: "Do you enjoy sharing erotic content with a partner?" },
    { question: "What's an intimate experience that surpassed your expectations?" },
    { question: "How do you feel about creating art through intimate photography?" },
    { question: "Is there an unexpected area that you find particularly sensual?" },
    { question: "Do you enjoy giving or receiving sensual massages?" },
    { question: "What's a fantasy involving power dynamics that excites you?" },
    { question: "Have you ever wanted to reenact a steamy scene from media?" },
    { question: "What's a question about desire you'd like to be asked?" },
    { question: "How do you feel about receiving intimate gifts or surprises?" },
    { question: "In what ways do you express your sexuality outside intimate moments?" },
    { question: "Do you have any pre-intimacy rituals that enhance the experience?" },
    { question: "What's the most sensual experience you've had without physical touch?" },
    { question: "Are you interested in role-playing different personas?" },
    { question: "What's an intimate dream you aspire to fulfill?" },
    { question: "How do you feel about incorporating dance into your intimate life?" },
    { question: "Is there a specific setting that fuels your fantasies?" },
    { question: "Do you have any hidden tattoos or piercings that add to your allure?" },
    { question: "What's an intimate act that makes you feel empowered?" },
    { question: "Have you ever used or considered remote-controlled intimate devices?" },
    { question: "What's a method you use to build anticipation before intimacy?" },
    { question: "How do you feel about being intimate in front of a reflective surface?" },
    { question: "Is there a type of clothing that boosts your confidence in intimacy?" },
    { question: "Do costumes or cosplay play a role in your intimate fantasies?" },
    { question: "What's an unusual sensation you've found surprisingly pleasurable?" },
    { question: "How do you feel about incorporating tactile elements like feathers?" },
    { question: "What's an intimate question you've never been asked but wish you were?" },
    { question: "Do you prefer slow and sensual or intense and fiery encounters?" },
    { question: "Does the idea of historical or time-period fantasies intrigue you?" },
    { question: "Have you ever been curious about dominant or submissive roles?" },
    { question: "What's a game that you'd find exciting to play intimately?" },
    { question: "How do you feel about being the focal point during intimate moments?" },
    { question: "What's a non-verbal way you like to show you're interested?" },
    { question: "Do you enjoy the build-up of anticipation throughout the day?" },
    { question: "What's an intimate secret that makes you uniquely you?" },
    { question: "How do you feel about exploring fantasies that push your boundaries?" },
    { question: "What's a new experience you'd like to share with a partner?" },
    { question: "Do you have a favorite erotic poem or piece of literature?" },
    { question: "What's a subtle hint you give when you're in the mood?" },
    { question: "How do you feel about integrating food into intimate play?" },
    { question: "Have you ever been intrigued by the idea of voyeurism or exhibitionism?" },
    { question: "What's a sensory experience that heightens your pleasure?" },
    { question: "Do you enjoy whispered words or loud expressions during intimacy?" },
    { question: "What's a way to make everyday moments feel more intimate?" },
    { question: "How do you feel about planning an intimate getaway?" },
    { question: "What's a fantasy that involves a specific season or weather?" },
    { question: "Do you have any interest in learning new techniques together?" },
    { question: "What's a question about intimacy you've never felt comfortable asking?" },
]

};

let questionHistory = [];
const RECALL_FREQUENCY = 10; // Ask a recall question every 5 cards
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
    "Answer while mimicking a robot.",
    "Answer as if you're teaching a kindergarten class.",
    "Answer while tapping your fingers on the table.",
    "Answer like you're planning a surprise party.",
    "Answer while pretending to juggle.",
    "Answer as if you're telling a joke to make someone laugh.",
    "Answer as if you're giving a tourist guide tour.",
    "Answer while pretending to play an instrument.",
    "Answer while snapping your fingers with each word.",
    "Answer like you're describing a cartoon character.",
    "Answer with exaggerated hand movements.",
    "Answer while standing up and spinning around.",
    "Answer as if you're acting in a silent film.",
    "Answer in the style of a commercial jingle.",
    "Answer while giving thumbs up after every sentence.",
    "Answer as if you're a sports coach motivating your team.",
    "Answer while drumming your fingers like a drumroll.",
    "Answer while pretending to blow bubbles.",
    "Answer with your arms crossed the whole time.",
    "Answer as if you're casting a spell.",
    "Answer as if you're announcing a surprise party.",
    "Answer while drawing an imaginary picture in the air.",
    "Answer as if you're walking on a tightrope.",
    "Answer as if you're reading a bedtime story."
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
    "Answer while looking deeply into their eyes.",
    "Answer as if you're on a first phone call with a crush.",
    "Answer with a playful wink at the end.",
    "Answer as if you're texting a cute emoji.",
    "Answer as if you're writing a flirty text message.",
    "Answer while lightly drumming your fingers on the table.",
    "Answer like you're planning a surprise date.",
    "Answer as if you're asking someone out for the first time.",
    "Answer while blushing (pretend!).",
    "Answer while gently leaning forward.",
    "Answer with a playful tone.",
    "Answer while resting your chin in your hand.",
    "Answer as if you're on a video call with someone you're excited to meet.",
    "Answer while gently tapping the table with your fingers.",
    "Answer like you're revealing your secret crush.",
    "Answer with a warm laugh.",
    "Answer while subtly complimenting the other player.",
    "Answer while pretending to sip a drink.",
    "Answer with a gentle, teasing tone.",
    "Answer as if you're writing a sweet note to leave on someone's desk.",
    "Answer as if you're on a romantic walk.",
    "Answer while holding a smile the entire time.",
    "Answer while mimicking a love song lyric.",
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
    "Answer like you're telling your best friend how much you like someone.",
    "Answer while recalling your favorite memory of a date.",
    "Answer while lightly touching their arm.",
    "Answer as if you're planning a future adventure together.",
    "Answer while holding hands with the other player.",
    "Answer as if you're confessing something sweet.",
    "Answer while giving a gentle nod after each sentence.",
    "Answer as if you're writing in your journal about them.",
    "Answer while pretending to take their hand and lead them somewhere.",
    "Answer with a soft voice and a gentle laugh.",
    "Answer as if you're sharing a secret you only tell someone special.",
    "Answer while tracing an invisible heart on the table.",
    "Answer as if you're writing an anniversary card.",
    "Answer while describing how you feel in one word.",
    "Answer like you're telling your family about the person you love.",
    "Answer as if you're giving a toast at a romantic dinner.",
    "Answer while daydreaming about your future together.",
    "Answer while thinking about what makes them unique.",
    "Answer while holding back a happy tear.",
    "Answer as if you're making a promise for the future.",
    "Answer as if you're writing them a love letter for the next decade.",
    "Answer while reflecting on your favorite date with them.",
    "Answer while softly recalling a shared inside joke."
];



const recallChallengesLongterm = [
    "Answer as if you're writing your wedding vows.",
    "Answer while placing your hand on your heart.",
    "Answer as if you're reminiscing about your first date.",
    "Answer as if you're writing a love song.",
    "Answer while softly holding their gaze.",
    "Answer as if you're expressing your deepest feelings.",
    "Answer while lightly touching their shoulder.",
    "Answer as if you're renewing your vows.",
    "Answer while reflecting on your future together.",
    "Answer while reflecting on a major milestone you've shared.",
    "Answer as if you're writing your future together.",
    "Answer while softly repeating the last word of your answer.",
    "Answer while recalling your happiest memory together.",
    "Answer while gently touching their arm.",
    "Answer while thinking about how far you've come as a couple.",
    "Answer as if you're reminiscing about your wedding day.",
    "Answer while reflecting on the first time you knew they were special.",
    "Answer while looking into their eyes the entire time.",
    "Answer while sharing how proud you are of them.",
    "Answer while gently holding their hand.",
    "Answer while softly complimenting their best quality.",
    "Answer while gently reminiscing about your shared dreams.",
    "Answer like you're telling your family about the person you love.",
    "Answer as if you're giving a toast at a romantic dinner.",
    "Answer while daydreaming about your future together.",
    "Answer while thinking about what makes them unique.",
    "Answer while holding back a happy tear.",
    "Answer as if you're making a promise for the future.",
    "Answer as if you're writing them a love letter for the next decade.",
    "Answer while reflecting on your favorite date with them.",
    "Answer while softly recalling a shared inside joke."
];


const recallChallengesSpicy = [
    "Answer while gently holding each other's gaze for 10 seconds before speaking.",
    "Answer while tracing your partner's hand with your fingertips.",
    "Answer while softly caressing your partner's face with both hands.",
    "Answer while placing your hand over your partner's heart and feeling their heartbeat.",
    "Answer while giving each other a slow, meaningful hug before speaking.",
    "Answer while holding hands and interlocking fingers.",
    "Answer while whispering your response, leaning in close to their ear.",
    "Answer while gently kissing your partner's forehead before you speak.",
    "Answer while placing a soft kiss on their lips after each sentence.",
    "Answer while gently caressing your partner's neck with your fingertips.",
    "Answer while running your hand slowly down their back.",
    "Answer while placing your forehead gently against theirs.",
    "Answer while softly brushing your lips against their cheek.",
    "Answer while taking a slow, deep breath together before responding.",
    "Answer while wrapping your arms around each other and holding them close.",
    "Answer while giving your partner a soft, lingering kiss on their hand.",
    "Answer while gently placing your hand on their chest, feeling their breath.",
    "Answer while softly stroking their arm or shoulder as you speak.",
    "Answer while maintaining physical contact—whether through touch or leaning in.",
    "Answer while sitting close, your legs or feet touching throughout.",
    "Answer while placing a kiss on their neck before speaking.",
    "Answer while gently brushing your fingers through their hair.",
    "Answer while holding each other tightly, focusing on the warmth between you.",
    "Answer while caressing their face slowly, looking deeply into their eyes.",
    "Answer while taking turns kissing each other's hands and wrists."
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
    
    document.getElementById('score-limit').value = '20';
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
        question: `What was ${recalledQuestion.player}'s answer to: "${recalledQuestion.question}"`,
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