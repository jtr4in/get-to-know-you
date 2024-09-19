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

const cards = {
    'fun-and-light': [
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
    'relationships': [
        { question: "What was your first impression of me?" },
        { question: "What is your favorite memory from when we were dating?" },
        { question: "What is the most memorable trip we've taken together?" },
        { question: "What was the first thing you noticed about me?" },
        { question: "What do you remember about our first kiss?" },
        { question: "What is your biggest sexual fantasy?" },
        { question: "Is there a new position you'd like to try?" },
        { question: "What's the most memorable sexual experience we've had?" },
        { question: "What's one thing you've always wanted to do in bed but haven't?" },
        { question: "Do you have any secret kinks or fetishes?" },
        { question: "What is your favorite thing about our relationship?" },
        { question: "What is one thing we do that always makes you laugh?" },
        { question: "If our relationship had a theme song, what genre would it be?" },
        { question: "What's one thing I do that always makes you smile?" },
        { question: "What's your favorite meal we've shared together?" },
        { question: "What's one thing we do together that you love?" },
        { question: "What do you think makes us a great team?" },
        { question: "What is one thing you love about me?" },
        { question: "What's your favorite way to spend time with me?" },
        { question: "What's one tradition we've started that you love?" },
        { question: "If we could go on any vacation, where would you take us?" },
        { question: "What is your favorite memory of us?" },
        { question: "What is the most romantic thing we've ever done together?" },
        { question: "What was your favorite date we've ever had?" },
        { question: "If our relationship had a theme song, what would it be?" },
        { question: "What's the most thoughtful gift you've ever received from me?" },
        { question: "What's one thing we've accomplished together that you're proud of?" },
        { question: "What is one thing you think we should do more as a couple?" },
        { question: "If we could plan our perfect weekend, what would we do?" },
        { question: "What's one way I've helped you become a better person?" },
        { question: "What's your favorite compliment I've ever given you?" },
        { question: "If we could relive one moment from our relationship, what would it be?" },
        { question: "What's one quality of mine that you admire?" },
        { question: "What's one thing about our relationship that makes you feel loved?" },
        { question: "If you could describe me in one word, what would it be?" },
        { question: "What's the best surprise we've ever given each other?" },
        { question: "What's the most adventurous thing we've done together?" },
        { question: "What's one thing you think we're really good at as a couple?" },
        { question: "What's our favorite way we show affection to each other?" },
        { question: "What's one moment that made you feel really close to me?" },
        { question: "What's one thing you're really looking forward to doing with me in the future?" },
        { question: "What's one thing you think makes our relationship unique?" },
        { question: "If our love was a movie, what would the title be?" },
        { question: "What's one thing you think we could work on as a couple?" },
        { question: "What's the funniest thing we've ever done together?" },
        { question: "What's one thing that makes you feel loved?" },
        { question: "What's one thing we've learned about each other that has strengthened our relationship?" },
        { question: "What's one thing we've done that made you feel really happy?" },
        { question: "What's one thing you want to do together but haven't had the chance?" },
        { question: "What's one tradition you hope we always keep?" },
        { question: "What's one thing that always makes you think of me?" },
        { question: "If we were to take a road trip anywhere, where would we go?" },
        { question: "What's one place you can't wait to visit with me?" },
        { question: "What's your favorite thing about the way we communicate?" },
        { question: "What's one thing that makes you feel appreciated in our relationship?" },
        { question: "What's your favorite thing to do to relax with me?" },
        { question: "What's one thing you think we're really good at as a couple?" },
        { question: "What's one thing you love about our home?" },
        { question: "What's one thing you've learned from me since we've been together?" },
        { question: "What's your favorite thing about the way we handle challenges?" },
        { question: "If you could give us one piece of advice for the future, what would it be?" },
        { question: "What's one thing we always do together that you look forward to?" },
        { question: "What's one thing you appreciate about how we make decisions together?" },
        { question: "What's one thing that makes you feel proud of us?" },
        { question: "If we could travel back in time, what moment would you want to relive?" },
        { question: "What's one thing you've learned about love from our relationship?" },
        { question: "What's your favorite activity that we do just for fun?" },
        { question: "What's one thing that brings us closer?" },
        { question: "What's one quality you think helps our relationship thrive?" },
        { question: "What's one thing you're excited about for our future?" },
        { question: "What's one word you'd use to describe our connection?" },
        { question: "What's one thing you think we've mastered as a couple?" },
        { question: "What's your favorite memory of us being spontaneous?" },
        { question: "What's one thing you love to hear me say?" },
        { question: "What's one thing that always makes you feel appreciated by me?" },
        { question: "What's one thing you wish we could do right now?" },
        { question: "What's one thing you think makes our relationship stronger?" },
        { question: "What's one moment you felt really connected to me?" },
        { question: "What's one thing you think we've gotten better at as a couple?" },
        { question: "What's one word you'd use to describe our love?" },
        { question: "What's one way I show you that I care?" },
        { question: "What's your favorite way to celebrate with me?" },
        { question: "What's one thing you hope we never stop doing?" },
    ],
    'deep-thoughts': [
        { question: "What are your core values, and how do they shape your decisions?" },
        { question: "How do you define success in your life?" },
        { question: "What does happiness mean to you?" },
        { question: "What do you think is your greatest strength and your greatest weakness?" },
        { question: "How do you handle conflicts or disagreements in relationships?" },
        { question: "If you could only eat food that was shaped like animals or food that was colored like rainbows, which would you choose?" },
        { question: "Would you rather have a pet that can talk but only in riddles or one that can sing but only in opera?" },
        { question: "If you could switch lives with any fictional character for a day, who would it be and why?" },
        { question: "Would you rather live in a world where everything is made of cheese or everything is made of marshmallows?" },
        { question: "If you could have any one of your childhood toys come to life, which would you choose and what would you do with it?" },
        { question: "What is one belief you hold that you feel defines you?" },
        { question: "What do you think is the meaning of life?" },
        { question: "What is your biggest fear, and how do you deal with it?" },
        { question: "What does friendship mean to you?" },
        { question: "If you could give your younger self one piece of advice, what would it be?" },
        { question: "What do you think makes someone a good person?" },
        { question: "What do you want your legacy to be?" },
        { question: "What motivates you to keep going during tough times?" },
        { question: "How do you want to be remembered by others?" },
        { question: "What's the most important lesson you've learned so far?" },
        { question: "What role does gratitude play in your life?" },
        { question: "How do you handle failure?" },
        { question: "What are the qualities you value most in a friend?" },
        { question: "How do you deal with regret?" },
        { question: "What is your personal definition of success?" },
        { question: "If you could change one thing about yourself, what would it be?" },
        { question: "What is your biggest strength?" },
        { question: "What is your biggest weakness?" },
        { question: "What does self-care mean to you?" },
        { question: "What motivates you to be your best self?" },
        { question: "How do you define true happiness?" },
        { question: "What is your most meaningful accomplishment?" },
        { question: "What is your greatest fear about the future?" },
        { question: "What does forgiveness mean to you?" },
        { question: "What's one value you will never compromise on?" },
        { question: "How do you want to grow as a person in the next year?" },
        { question: "What's one thing that brings you peace?" },
        { question: "What does success in relationships mean to you?" },
        { question: "What's one piece of advice you would give to someone struggling?" },
        { question: "What's one thing you think everyone should try at least once?" },
        { question: "How do you find balance in your life?" },
        { question: "What's the most important decision you've ever made?" },
        { question: "What does success look like to you?" },
        { question: "How do you define love?" },
        { question: "What's the best way to deal with conflict?" },
        { question: "What's one thing you're most proud of?" },
        { question: "What does living a meaningful life look like to you?" },
        { question: "What's one thing you want to improve about yourself?" },
        { question: "What does kindness mean to you?" },
        { question: "What's one thing that brings you hope?" },
        { question: "How do you handle disappointment?" },
        { question: "What's the best way to overcome a challenge?" },
        { question: "What does self-awareness mean to you?" },
        { question: "What does integrity look like in your life?" },
        { question: "What's your biggest regret, and how have you moved past it?" },
        { question: "How do you make decisions when you're faced with a difficult choice?" },
        { question: "What's the most valuable lesson you've learned about relationships?" },
        { question: "What does courage mean to you?" },
        { question: "What's one thing you would never compromise on?" },
        { question: "What's the biggest challenge you've faced, and how did you overcome it?" },
        { question: "What's one quality you admire in others?" },
        { question: "What's one thing you want to accomplish before you die?" },
        { question: "What's the most important value you live by?" },
        { question: "What's one thing you would tell your future self?" },
        { question: "What's the most important relationship in your life?" },
        { question: "What does respect mean to you?" },
        { question: "What's one thing you wish more people understood about you?" },
        { question: "What's one moment in your life that made you change your perspective?" },
        { question: "What's one belief you used to hold but no longer do?" },
        { question: "What's one thing you're afraid to fail at?" },
        { question: "What does growth mean to you?" },
        { question: "What's one thing you wish you could do better?" },
        { question: "How do you define personal freedom?" },
        { question: "What's one thing you need to let go of?" },
        { question: "What's one thing you wish more people appreciated about life?" },
        { question: "What does loyalty mean to you?" },
        { question: "How do you find meaning in everyday life?" },
        { question: "What's one goal you're working toward right now?" },
        { question: "What's one thing you wish you had done differently?" },
        { question: "How do you prioritize what's important in your life?" },
        { question: "What's one quality you think everyone should cultivate?" },
        { question: "What's one thing you think the world needs more of?" },
        { question: "What does resilience mean to you?" },
        { question: "What's the most important thing you've learned from failure?" },
        { question: "What's one thing you're most grateful for?" },
        { question: "What does authenticity mean to you?" },
        { question: "What's one way you want to make a difference in the world?" },
        { question: "What does honesty mean to you?" },
        { question: "What's one thing you think is misunderstood about success?" },
        { question: "What's the most important lesson you've learned about yourself?" },
        { question: "What's one thing you've changed your mind about recently?" },
        { question: "How do you define your personal identity?" },
    ]
};


let questionHistory = [];
const RECALL_FREQUENCY = 5; // Ask a recall question every 5 cards
let cardsSinceLastRecall = 0;

const recallChallenges = [
    "Answer as if you're giving a weather forecast.",
    "Answer as if you're delivering a motivational speech.",
    "Answer as if you're ordering at a fancy restaurant.",
    "Answer as if you're a TV news anchor delivering breaking news.",
    "Answer as if you're narrating an audiobook.",
    "Answer as if you're telling a ghost story.",
    "Answer as if you're giving directions to a tourist.",
    "Answer as if you're a robot delivering data.",
    "Answer as if you're a detective solving a mystery.",
    "Answer as if you're announcing over a loudspeaker.",
    "Answer as if you're a movie trailer narrator.",
    "Answer as if you're calling a sports play-by-play.",
    "Answer as if you're giving an important business presentation.",
    "Answer as if you're auditioning for a role in a movie.",
    "Answer as if you're explaining it to a child.",
    "Answer as if you're hosting a cooking show.",
    "Answer as if you're making a toast at a wedding.",
    "Answer as if you're pitching the next big invention.",
    "Answer as if you're on a video call with bad reception.",
    "Answer as if you're making a confession.",
    "Answer as if you're narrating a documentary.",
    "Answer as if you're telling a bedtime story.",
    "Answer as if you're only allowed to use three words.",
    "Answer as if you're in an elevator pitch with only 10 seconds.",
    "Answer as if you're delivering a stand-up comedy routine.",
    "Answer as if you're speaking to royalty.",
    "Answer as if you're reading data in a monotone voice.",
    "Answer as if you're on a first date.",
    "Answer as if you're in a heated courtroom debate.",
    "Answer as if you're singing a TV commercial jingle.",
    "Answer as if you're the host of a nature documentary.",
    "Answer as if you're explaining it to a toddler.",
    "Answer as if you're an auctioneer.",
    "Answer as if you're a fitness instructor leading a workout.",
    "Answer as if you're a sports coach motivating your team.",
    "Answer as if you're talking to an alien from another planet.",
    "Answer as if you're creating an advertisement for it.",
    "Answer as if you're on a reality TV show.",
    "Answer as if you're in a movie trailer voice.",
    "Answer as if you're announcing the winner of a competition.",
    "Answer as if you're a professor giving a lecture.",
    "Answer as if you're a game show host revealing the answer.",
    "Answer as if you're giving an Oscar acceptance speech.",
    "Answer as if you're reading a dramatic poem.",
    "Answer as if you're making a political campaign speech.",
    "Answer as if you're a DJ hyping up the crowd.",
    "Answer as if you're reporting the traffic on a radio station.",
    "Answer as if you're a sports commentator analyzing the play.",
    "Answer as if you're teaching a kindergarten class.",
    "Answer as if you're a pilot making an announcement to passengers.",
    "Answer as if you're at a press conference.",
    "Answer as if you're a yoga instructor leading a meditation.",
    "Answer as if you're an auctioneer selling an item.",
    "Answer as if you're hosting a late-night talk show.",
    "Answer as if you're in a police interrogation.",
    "Answer as if you're a stand-up comedian telling a joke.",
    "Answer as if you're a race car driver giving a post-race interview.",
    "Answer as if you're an astronaut reporting from space.",
    "Answer as if you're a chef describing a dish on a cooking show.",
    "Answer as if you're a judge announcing a verdict.",
    "Answer as if you're a radio DJ introducing a hit song.",
    "Answer as if you're a weathered sailor telling a sea tale.",
    "Answer as if you're a pop star introducing your latest single.",
    "Answer as if you're a contestant on a reality TV show giving a confession.",
    "Answer as if you're a scientist explaining a discovery to the public.",
    "Answer as if you're a magician revealing the secret to a trick.",
    "Answer as if you're an auctioneer trying to sell a rare item.",
    "Answer as if you're a bartender telling a regular customer's story.",
    "Answer as if you're a travel guide showcasing a famous landmark.",
    "Answer as if you're a librarian explaining the plot of a book.",
    "Answer as if you're a CEO announcing a new product launch.",
    "Answer as if you're a soldier reporting from the battlefield.",
    "Answer as if you're a fashion designer describing a runway look.",
    "Answer as if you're a detective revealing the conclusion to a mystery.",
    "Answer as if you're a parent explaining a life lesson to a child.",
    "Answer as if you're a poet reciting a heartfelt piece.",
    "Answer as if you're a teacher explaining a math problem.",
    "Answer as if you're a tour guide on a safari.",
    "Answer as if you're an actor rehearsing a dramatic monologue.",
    "Answer as if you're a spy sharing classified information.",
    "Answer as if you're a comedian delivering a punchline.",
    "Answer as if you're a sports fan cheering at a game.",
    "Answer as if you're a podcaster discussing a controversial topic.",
    "Answer as if you're a poet at an open mic night.",
    "Answer as if you're a bartender giving drink recommendations.",
    "Answer as if you're a novelist describing the climax of your book.",
    "Answer as if you're an auctioneer selling the most expensive item of the night.",
    "Answer as if you're a yoga instructor leading a breathing exercise.",
    "Answer as if you're a football coach giving a halftime speech.",
    "Answer as if you're an emergency responder giving instructions.",
    "Answer as if you're a travel blogger describing an exotic destination.",
    "Answer as if you're a professor giving a history lesson.",
    "Answer as if you're a pirate reading a treasure map.",
    "Answer as if you're a detective interviewing a suspect.",
    "Answer as if you're a journalist at a crime scene.",
    "Answer as if you're a theater director coaching an actor.",
    "Answer as if you're a chef describing the perfect meal.",
    "Answer as if you're a contestant on a cooking competition.",
    "Answer as if you're a referee explaining a controversial call.",
    "Answer as if you're a politician making a campaign promise.",
    "Answer as if you're an author doing a book reading.",
    "Answer as if you're a detective solving a cold case.",
    "Answer as if you're a historian retelling an ancient legend.",
    "Answer as if you're a pilot giving a pre-flight briefing.",
    "Answer as if you're a musician introducing a song to a live audience.",
    "Answer as if you're a motivational speaker inspiring a crowd.",
    "Answer as if you're a talk show host interviewing a celebrity.",
    "Answer as if you're a fitness coach guiding through a tough workout.",
    "Answer as if you're a tour guide at a haunted house.",
    "Answer as if you're a magician performing a grand finale.",
    "Answer as if you're a child describing their favorite toy.",
    "Answer as if you're an explorer discovering a new land.",
    "Answer as if you're a scientist explaining a complex experiment.",
    "Answer as if you're a sailor recounting an epic storm at sea.",
    "Answer as if you're a game show contestant answering the final question.",
    "Answer as if you're a judge on a talent competition.",
    "Answer as if you're a sports announcer calling the final seconds of a game.",
    "Answer as if you're trying to explain it while balancing on a unicycle.",
    "Answer as if you're a cat explaining the secret to catching the red dot.",
    "Answer as if you're a goldfish with a 3-second memory.",
    "Answer as if you're a caveman discovering fire for the first time.",
    "Answer as if you're a toddler who just learned the word 'no'.",
    "Answer as if you're a potato trying to explain why you belong in a salad.",
    "Answer as if you're an alien trying to describe human behavior.",
    "Answer as if you're a vampire who hasn't had coffee in 400 years.",
    "Answer as if you're a superhero delivering a monologue before saving the world.",
    "Answer as if you're a chicken trying to explain why you crossed the road.",
    "Answer as if you're in the middle of a dramatic soap opera scene.",
    "Answer as if you're a pirate who forgot where they buried the treasure.",
    "Answer as if you're a clown who's allergic to balloons.",
    "Answer as if you're a wizard who forgot the magic spell.",
    "Answer as if you're a donut trying to explain your hole.",
    "Answer as if you're a squirrel who's just found the world's largest acorn.",
    "Answer as if you're a ninja caught in the act of buying socks.",
    "Answer as if you're a professional wrestler trash-talking before a match.",
    "Answer as if you're a turtle trying to win a race against a rabbit.",
    "Answer as if you're a pizza trying to convince people pineapple belongs on top.",
    "Answer as if you're a time traveler who accidentally landed in a karaoke bar.",
    "Answer as if you're a sandwich in a food court fighting for the top spot.",
    "Answer as if you're a penguin trying to describe what summer feels like.",
    "Answer as if you're a zombie trying to order takeout.",
    "Answer as if you're a T-Rex attempting to tie your shoes.",
    "Answer as if you're a penguin learning how to fly.",
    "Answer as if you're a ghost who got stuck in a selfie.",
    "Answer as if you're a marshmallow explaining why you're always toasted.",
    "Answer as if you're a sock who's been separated from your partner in the laundry.",
    "Answer as if you're a traffic cone directing an angry goose.",
    "Answer as if you're a llama explaining the benefits of spit.",
    "Answer as if you're a disco ball describing a quiet library.",
    "Answer as if you're a cactus trying to cuddle.",
    "Answer as if you're a sandwich explaining why you hate crust.",
    "Answer as if you're a snowman giving a TED talk about summer.",
    "Answer as if you're a couch trying to resist people sitting on you.",
    "Answer as if you're a spaghetti noodle trying not to be overcooked.",
    "Answer as if you're a penguin auditioning for a Broadway musical.",
    "Answer as if you're a fork trying to understand the purpose of a spoon.",
    "Answer as if you're a rubber duck leading a group of synchronized swimmers.",
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
    
    document.getElementById('player-setup').classList.add('hidden');
    document.getElementById('game-area').classList.remove('hidden');
    
    document.getElementById('reset-game').classList.remove('hidden');
    
    updatePlayerNames();
    updateScores();
    updateCurrentPlayer();
    setDefaultCategory(); // Add this line to set the default category
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

function drawCard() {
    cardsSinceLastRecall++;
    
    if (isRecallEnabled && cardsSinceLastRecall >= RECALL_FREQUENCY && questionHistory.length > 0) {
        generateRecallQuestion();
        cardsSinceLastRecall = 0;
    } else {
        const category = getSelectedCategory();
        const categoryCards = getCardsFromCategory(category);
        
        let newCard;
        do {
            newCard = categoryCards[Math.floor(Math.random() * categoryCards.length)];
        } while (newCard === currentCard && categoryCards.length > 1);
        
        // Randomly select a challenge from recallChallenges
        const randomChallenge = recallChallenges[Math.floor(Math.random() * recallChallenges.length)];
        
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