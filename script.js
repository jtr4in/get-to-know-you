let currentCard = null;
let isQuestion = true;
let players = [];
let currentPlayerIndex = 0;
let isHeadToHeadMode = false;
let isRecallEnabled = true;
let selectedCategory = 'Icebreaker';
let scoreLimit = 20;
let timer;
let timeLeft = 600; // 10 minutes in seconds
const FULL_DASH_ARRAY = 157; // Circumference of the circle

function startTimer() {
    clearInterval(timer);
    timeLeft = 600; // Reset to 10 minutes
    timer = setInterval(function() {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer-text').textContent = timeString;
        
        const circleDashoffset = calculateTimeFraction() * FULL_DASH_ARRAY;
        document.getElementById('timer-circle').style.strokeDashoffset = circleDashoffset;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up!");
            // You can add more actions here when the time is up
        }
    }, 1000);
}

function calculateTimeFraction() {
    return timeLeft / 600; // 600 is the total time in seconds (10 minutes)
}

function showTimer() {
    document.getElementById('timer').style.display = 'block';
}

function hideTimer() {
    document.getElementById('timer').style.display = 'none';
}
const cards = {
    'Icebreaker': [
        { 
            question: "What's your favorite way to spend a weekend?",
            challenges: [
                "Describe your weekend plans while pretending to be a news anchor.",
                "Answer as if you're trying to convince someone to join you.",
                "Explain your answer using only 5 words."
            ]
        },
        { 
            question: "Do you have any hidden talents?",
            challenges: [
                "Demonstrate the talent without speaking for 10 seconds.",
                "Explain your hidden talent like you're teaching a class.",
                "Describe it as if you're auditioning for a talent show."
            ]
        },

        { 
            question: "What's your favorite way to spend a weekend?",
            challenges: [
                "Describe your weekend plans while pretending to be a news anchor.",
                "Answer as if you're trying to convince someone to join you.",
                "Explain your answer using only 5 words."
            ]
        },
        { 
            question: "Do you have any hidden talents?",
            challenges: [
                "Demonstrate the talent without speaking for 10 seconds.",
                "Explain your hidden talent like you're teaching a class.",
                "Describe it as if you're auditioning for a talent show."
            ]
        },
        { 
            question: "What's the most interesting place you've ever visited?",
            challenges: [
                "Explain while pretending you're a travel guide.",
                "Describe the place using only adjectives.",
                "Answer as if you're writing a postcard from that location."
            ]
        },
        { 
            question: "If you could live anywhere in the world, where would it be?",
            challenges: [
                "Answer in the form of a real estate commercial.",
                "Describe the location without naming it.",
                "Explain why you'd live there in the style of a motivational speaker."
            ]
        },
        { 
            question: "What's your favorite type of music or band?",
            challenges: [
                "Hum a tune from the music or band.",
                "Describe the music using only sound effects.",
                "Answer as if you're hosting a radio show."
            ]
        },
        { 
            question: "Would you rather have the ability to fly but only as fast as a snail, or be able to run at super speed but only for 10 seconds at a time?",
            challenges: [
                "Give your answer like a superhero explaining their powers.",
                "Explain while pretending to fly or run.",
                "Answer in slow motion."
            ]
        },
        { 
            question: "Would you rather have a pet dinosaur or a pet dragon?",
            challenges: [
                "Describe how you'd introduce your pet to a friend.",
                "Answer as if you’re reading from a storybook.",
                "Explain while pretending to train your pet."
            ]
        },
        { 
            question: "Would you rather be able to speak every language fluently but never be able to write, or be able to write in every language but never speak?",
            challenges: [
                "Answer as if you're debating this on a talk show.",
                "Explain while pretending to use sign language.",
                "Answer while mimicking your favorite language accent."
            ]
        },
        { 
            question: "Would you rather live in a house made entirely of chocolate or a house made entirely of marshmallows?",
            challenges: [
                "Describe what it's like living in the house while pretending you're inside it.",
                "Answer as if you're giving a cooking show demonstration.",
                "Explain which one you'd choose in the style of a real estate agent."
            ]
        },
        { 
            question: "Would you rather always have to wear socks on your hands or always have to wear gloves on your feet?",
            challenges: [
                "Answer while trying to use socks on your hands.",
                "Explain while doing a funny hand gesture.",
                "Pretend you're explaining this situation to a fashion expert."
            ]
        },
        { 
            question: "If you could have any animal as a pet, what would it be?",
            challenges: [
                "Describe the pet like you're reading from a nature documentary.",
                "Explain how you’d introduce your pet at a party.",
                "Answer while pretending to be your chosen animal."
            ]
        },
        { 
            question: "What's your favorite season and why?",
            challenges: [
                "Describe the season using only sounds associated with it.",
                "Answer as if you're a weather forecaster.",
                "Explain while acting out activities you’d do in that season."
            ]
        },
        { 
            question: "If you had to eat only one food for the rest of your life, what would it be?",
            challenges: [
                "Describe the food like you're in a cooking show.",
                "Answer as if you're trying to convince a picky eater to try it.",
                "Explain it in the style of a dramatic movie scene."
            ]
        },
        { 
            question: "What's your favorite holiday?",
            challenges: [
                "Explain as if you're the holiday's spokesperson.",
                "Describe how you celebrate it in the form of a poem.",
                "Answer while mimicking your favorite holiday character."
            ]
        },
        { 
            question: "If you could instantly master any skill, what would it be?",
            challenges: [
                "Explain the skill like you're demonstrating it.",
                "Describe it like you're teaching a class about it.",
                "Answer in the style of a motivational speaker."
            ]
        },
        { 
            question: "What's your favorite board game?",
            challenges: [
                "Describe the game as if you're narrating a sports event.",
                "Explain the game in the style of a commercial.",
                "Answer while mimicking a piece from the game."
            ]
        },
        {
            question: "If you had a million dollars, what would you do with it?",
            challenges: [
                "Answer as if you're on a game show.",
                "Describe how you'd spend it in the style of a financial advisor.",
                "Explain your answer in 10 seconds or less."
            ]
        },
        { 
            question: "What's the best gift you've ever received?",
            challenges: [
                "Describe it as if you're unboxing it for the first time.",
                "Answer as if you're giving an acceptance speech for the gift.",
                "Explain the gift without mentioning what it is."
            ]
        },
        { 
            question: "If you could meet any fictional character, who would it be?",
            challenges: [
                "Introduce the character as if you're hosting a talk show.",
                "Answer while pretending to be that character.",
                "Describe the meeting like it's happening in slow motion."
            ]
        },
        { 
            question: "What's your favorite thing to do in the morning?",
            challenges: [
                "Explain it as if you're a fitness instructor.",
                "Answer while pretending to wake up slowly.",
                "Describe it like you're advertising a morning routine product."
            ]
        },
        { 
            question: "What's the most fun party you've ever been to?",
            challenges: [
                "Describe the party as if you're making a movie trailer.",
                "Answer while pretending you're still at the party.",
                "Explain it using only sound effects and hand gestures."
            ]
        },
        { 
            question: "If you could have dinner with any celebrity, who would it be?",
            challenges: [
                "Describe what you'd order for the celebrity.",
                "Answer as if you're both on a cooking show together.",
                "Explain why you'd invite them as if you're pitching a TV show."
            ]
        },
        { 
            question: "What's your favorite animal and why?",
            challenges: [
                "Describe the animal like you're narrating a wildlife documentary.",
                "Answer while imitating the sounds the animal makes.",
                "Explain why it's your favorite using only gestures."
            ]
        },
        { 
            question: "If you could be famous for anything, what would it be?",
            challenges: [
                "Describe your fame like you're giving an interview on a talk show.",
                "Answer while giving an Oscar-worthy performance.",
                "Explain it as if you're a fan who's meeting your famous self."
            ]
        },
        { 
            question: "If you could have any fictional character's powers, whose would you want?",
            challenges: [
                "Answer like you're explaining how you'd use those powers in your daily life.",
                "Pretend you're demonstrating the powers in action.",
                "Describe the powers in the style of a comic book narrator."
            ]
        },
        { 
            question: "What's your go-to karaoke song?",
            challenges: [
                "Answer by singing a line from the song.",
                "Describe the song as if you're reviewing it for a music magazine.",
                "Explain why it's your favorite while mimicking the singer."
            ]
        },
        { 
            question: "What's the most unusual job you've ever had?",
            challenges: [
                "Answer while pretending you're still working that job.",
                "Describe the job like you're writing an online job review.",
                "Explain it in the style of a recruitment ad."
            ]
        },
        { 
            question: "If you could live in any movie universe, which would it be?",
            challenges: [
                "Describe your life in that universe like you're in a commercial for it.",
                "Answer while acting as a character from that universe.",
                "Explain the movie universe without saying its name."
            ]
        },
        { 
            question: "What's the funniest thing that's ever happened to you?",
            challenges: [
                "Tell the story as if you're doing stand-up comedy.",
                "Answer while laughing the whole time.",
                "Describe the situation as if you're telling it to a close friend."
            ]
        },
        { 
            question: "What's your least favorite chore?",
            challenges: [
                "Describe it as if you're teaching someone how to do it.",
                "Answer while miming doing the chore.",
                "Explain why you dislike it like you're writing a complaint letter."
            ]
        },
        { 
            question: "What's your favorite outdoor activity?",
            challenges: [
                "Describe it as if you're narrating an adventure documentary.",
                "Answer while pretending you're doing the activity.",
                "Explain it like you're promoting an outdoor adventure company."
            ]
        },
        { 
            question: "If you could invent anything, what would it be?",
            challenges: [
                "Pitch your invention like you're on a TV infomercial.",
                "Describe your invention without saying what it does.",
                "Explain it as if you're presenting it to a group of investors."
            ]
        },
        { 
            question: "What's your favorite TV show?",
            challenges: [
                "Describe the show without naming any characters or titles.",
                "Answer as if you're narrating a dramatic scene from the show.",
                "Explain why you love it in the style of a TV critic."
            ]
        },
        { 
            question: "If you could be any age for the rest of your life, what would it be?",
            challenges: [
                "Answer like you're an actor in a youth commercial.",
                "Explain why in the style of a motivational speaker.",
                "Describe the age using only facial expressions."
            ]
        },
        { 
            question: "What's your favorite vacation destination?",
            challenges: [
                "Answer as if you're giving a travel vlog review.",
                "Describe the place using only 3 words.",
                "Explain it while pretending you're there right now."
            ]
        },
        { 
            question: "If you were a type of weather, what would you be?",
            challenges: [
                "Describe your weather in a dramatic weather forecast.",
                "Answer while mimicking the sounds of that weather.",
                "Explain why you chose it using only body language."
            ]
        },
        { 
            question: "What's the strangest talent you have?",
            challenges: [
                "Demonstrate the talent without explaining for 10 seconds.",
                "Answer like you're auditioning for a talent show.",
                "Describe it as if it's a magical superpower."
            ]
        },
        { 
            question: "If you could change your name, what would it be?",
            challenges: [
                "Answer like you're introducing yourself in a spy movie.",
                "Explain the name change like you're at a job interview.",
                "Describe your new name using only hand gestures."
               ]
        },
        { 
            question: "What's the best gift you've ever received?",
            challenges: [
                "Describe the gift as if you're on a shopping channel.",
                "Answer as if you're unwrapping the gift for the first time.",
                "Explain without naming the gift and have others guess what it is."
            ]
        },
        { 
            question: "If you could meet any fictional character, who would it be?",
            challenges: [
                "Explain why while acting like that character.",
                "Describe the meeting as if you're writing a movie scene.",
                "Answer as if you're at a fan convention meeting them."
            ]
        },
        { 
            question: "What's your favorite thing to do in the morning?",
            challenges: [
                "Describe it while pretending you're in a yoga class.",
                "Answer as if you're hosting a morning talk show.",
                "Explain it like you're advertising a new morning routine product."
            ]
        },
        { 
            question: "What's the most fun party you've ever been to?",
            challenges: [
                "Describe it as if you're narrating a wild party movie scene.",
                "Answer as if you're still at the party.",
                "Explain it using only sound effects and gestures."
            ]
        },
        { 
            question: "If you could have dinner with any celebrity, who would it be?",
            challenges: [
                "Describe what you'd order for them.",
                "Pretend you're interviewing them during dinner.",
                "Explain it as if you're hosting a celebrity cooking show."
            ]
        },
        { 
            question: "What's your favorite animal and why?",
            challenges: [
                "Describe the animal like you're narrating a nature documentary.",
                "Mimic the sound of your favorite animal as part of your answer.",
                "Explain while pretending to be the animal."
            ]
        },
        { 
            question: "If you could be famous for anything, what would it be?",
            challenges: [
                "Describe your fame like you're on a late-night talk show.",
                "Answer while giving a fake acceptance speech.",
                "Pretend you're a fan telling someone why you're famous."
            ]
        },
        { 
            question: "If you could have any fictional character's powers, whose would you want?",
            challenges: [
                "Describe how you'd use the powers in daily life.",
                "Answer while pretending to use the powers.",
                "Explain the powers as if you're a comic book narrator."
            ]
        },
        { 
            question: "What's your go-to karaoke song?",
            challenges: [
                "Sing a line from the song.",
                "Describe the song as if you're a music critic.",
                "Explain while mimicking the singer."
            ]
        },
        { 
            question: "What's the most unusual job you've ever had?",
            challenges: [
                "Explain it like you're still doing the job.",
                "Describe it as if you're writing a job review.",
                "Pretend you're training someone else to do the job."
            ]
        },
        { 
            question: "If you could live in any movie universe, which would it be?",
            challenges: [
                "Describe your life in that universe like it's a movie trailer.",
                "Answer while acting as a character from that universe.",
                "Explain it without saying the movie's name."
            ]
        },
        { 
            question: "What's the funniest thing that's ever happened to you?",
            challenges: [
                "Tell the story like you're doing stand-up comedy.",
                "Answer while pretending to laugh the whole time.",
                "Explain it as if you're telling the story to a close friend."
            ]
        },
        { 
            question: "What's your least favorite chore?",
            challenges: [
                "Describe it like you're teaching someone how to do it.",
                "Answer while pretending to do the chore.",
                "Explain why you dislike it as if you're writing a complaint letter."
            ]
        },
        { 
            question: "What's your favorite outdoor activity?",
            challenges: [
                "Describe it as if you're narrating an adventure documentary.",
                "Pretend you're doing the activity while explaining it.",
                "Explain it like you're promoting an outdoor adventure company."
            ]
        },
        { 
            question: "If you could invent anything, what would it be?",
            challenges: [
                "Pitch your invention like you're on a TV show.",
                "Describe the invention while drawing it in the air.",
                "Explain the invention using only sound effects."
            ]
        },
    
        { 
         question: "If you could have a conversation with anyone, dead or alive, who would it be?",
         challenges: [
             "Explain why you'd choose this person like you're giving a TED Talk.",
             "Answer as if you're already having the conversation.",
             "Describe the conversation without revealing who it is and let others guess."
         ]
     },
     { 
         question: "What's your dream car?",
         challenges: [
             "Describe the car like you're narrating a car commercial.",
             "Answer while pretending you're driving the car.",
             "Explain the features as if you're showing it to a friend."
         ]
     },
     { 
         question: "What's the best prank you've ever pulled?",
         challenges: [
             "Describe it as if you're sharing the story on a prank show.",
             "Answer while pretending you're pulling the prank right now.",
             "Explain it like you're explaining how to set up the prank."
         ]
     },
     { 
         question: "If you could live under the sea, what sea creature would you be?",
         challenges: [
             "Answer while imitating the sea creature's movements.",
             "Describe the sea creature like you're narrating a nature documentary.",
             "Explain why you'd be that creature without mentioning its name."
         ]
     },
     { 
         question: "What's your favorite way to exercise?",
         challenges: [
             "Answer while pretending you're doing the exercise.",
             "Describe it as if you're a fitness instructor leading a class.",
             "Explain it in slow motion, mimicking the movements."
         ]
     },
     { 
         question: "If you were a superhero, what would your superpower be?",
         challenges: [
             "Answer while demonstrating how you'd use your superpower.",
             "Describe your power like you're a superhero being interviewed.",
             "Explain it as if you're pitching the idea for a superhero movie."
         ]
     },
            // ... more questions with their specific challenges
    ],
    'First Date': [
        { 
            question: "Hem or hate them?",
            challenges: [
                "Answer while acting out a dramatic 'love-hate' relationship.",
                "Respond by making a pro/con list in the air.",
                "Explain it like you're giving a political speech."
            ]
        },
        { 
            question: "If you could live in any time period, past or future, when would it be?",
            challenges: [
                "Answer while pretending you're stepping through a time portal.",
                "Explain it as if you're trying to convince someone to join you in that era.",
                "Describe the time period like you're writing a travel brochure for it."
            ]
        },
        { 
            question: "What’s your favorite way to spend a Saturday night—out or in?",
            challenges: [
                "Answer while mimicking what you'd be doing during that night.",
                "Explain it as if you're a social media influencer documenting the night.",
                "Describe your Saturday night in slow motion."
            ]
        },
        { 
            question: "If you were to host a dinner party, what would you cook?",
            challenges: [
                "Describe the menu like you're on a cooking show.",
                "Answer while pretending to serve the food to your guests.",
                "Explain the dishes while doing a taste test, like a food critic."
            ]
        },
        { 
            question: "What’s your favorite way to exercise or stay active?",
            challenges: [
                "Pretend you're doing the exercise as you explain it.",
                "Answer as if you're leading a fitness class.",
                "Describe your routine like you're giving a motivational speech."
            ]
        },
        { 
            question: "What’s one thing you’re really proud of?",
            challenges: [
                "Explain it like you're accepting an award.",
                "Answer while mimicking the actions you're proud of.",
                "Describe it in a whisper, like it's a secret accomplishment."
            ]
        },
        { 
            question: "What’s a place you’ve always wanted to visit but haven’t yet?",
            challenges: [
                "Describe the place like you're a tour guide.",
                "Explain it like you're pitching it as the next big vacation destination.",
                "Answer while pretending to take pictures of the place."
            ]
        },
        { 
            question: "What’s your favorite way to celebrate your birthday?",
            challenges: [
                "Describe your ideal birthday celebration like you're planning an event.",
                "Explain it while mimicking the key activities you'd do.",
                "Pretend you're narrating a birthday vlog about your special day."
            ]
        },
        { 
            question: "If you had a free day tomorrow, how would you spend it?",
            challenges: [
                "Answer like you're a lifestyle coach planning the perfect day.",
                "Pretend you're walking through your ideal day as you explain it.",
                "Describe it like you're writing an itinerary for a relaxing day."
            ]
        },
        { 
            question: "What’s something quirky about you that people might not guess at first?",
            challenges: [
                "Reveal it like you're confessing a funny secret.",
                "Answer while mimicking your quirky habit.",
                "Explain it like you're doing a quirky character impression."
            ]
        },
        { 
            question: "Do you prefer the beach, the mountains, or the city for vacations?",
            challenges: [
                "Answer while pretending you're in that location.",
                "Describe the location like you're narrating a vacation advertisement.",
                "Explain it while mimicking a key activity from the destination."
            ]
        },
        { 
            question: "What’s your favorite memory from childhood?",
            challenges: [
                "Describe it like you're telling a bedtime story.",
                "Answer while pretending you're reliving the memory in real-time.",
                "Explain it as if you're sharing the memory with a close friend."
            ]
        },
        { 
            question: "What’s one thing on your bucket list you’re determined to do?",
            challenges: [
                "Describe it like you're being interviewed about your life goals.",
                "Answer while pretending to check off the item from your bucket list.",
                "Explain it like you're a motivational speaker inspiring others to achieve it."
            ]
        },
        { 
            question: "How do you usually spend your Sundays?",
            challenges: [
                "Answer while pretending you're going through your typical Sunday routine.",
                "Explain it like you're giving a calming weekend guide.",
                "Describe your Sunday in three slow-motion parts."
            ]
        },
        { 
            question: "What’s a show or movie you’ve watched more than once?",
            challenges: [
                "Explain why you love it like you're a film critic.",
                "Pretend you're acting out a scene from the show or movie.",
                "Answer while mimicking the theme song or iconic moment from the show."
            ]
        },
        { 
            question: "Do you prefer cats, dogs, or neither?",
            challenges: [
                "Answer while pretending to be the pet of your choice.",
                "Explain your preference like you're a pet expert giving advice.",
                "Describe it in a high-energy, 'animal lover' TV commercial style."
            ]
        },
        { 
            question: "What’s your favorite way to stay motivated when things get tough?",
            challenges: [
                "Describe it like you're giving a motivational speech.",
                "Answer as if you're giving advice to someone in need of motivation.",
                "Explain it while mimicking the actions that help you stay motivated."
            ]
        },
        { 
            question: "If you could trade lives with someone for a day, who would it be?",
            challenges: [
                "Answer while pretending you're already in that person's shoes.",
                "Describe the day like you're making a vlog of the experience.",
                "Explain your choice like you're pitching a reality show about the swap."
            ]
        },
        { 
            question: "What’s something simple that brings you joy?",
            challenges: [
                "Answer while mimicking that simple joy.",
                "Describe it as if you're telling a heartwarming story.",
                "Explain it like you're sharing a feel-good moment in a movie."
            ]
        },
        { 
            question: "Do you prefer calling, texting, or video chatting?",
            challenges: [
                "Explain your preference while mimicking the action.",
                "Answer as if you're pitching your favorite communication style in a commercial.",
                "Describe a typical conversation in your preferred method of communication."
            ]
        },
        { 
            question: "What’s your favorite thing about your job (or studies)?",
            challenges: [
                "Answer as if you're giving a presentation at work or school.",
                "Describe it like you're a career coach explaining the best part.",
                "Explain it in an excited, 'first day on the job' style."
            ]
        },
        { 
            question: "If you could relive any year of your life, which year would it be and why?",
            challenges: [
                "Answer like you're narrating a highlight reel of that year.",
                "Describe it while pretending you're back in that moment.",
                "Explain it like you're writing a memoir about that year."
            ]

        }, { 
            question: "What’s your biggest deal-breaker in a relationship?",
            challenges: [
                "Explain it while pretending to act out a dramatic breakup scene.",
                "Respond in the style of a relationship advice column.",
                "Describe it as if you're hosting a reality TV dating show."
            ]
        },
        { 
            question: "How do you handle conflicts or disagreements in relationships?",
            challenges: [
                "Explain it like you're giving a TED Talk on conflict resolution.",
                "Describe it while acting out both sides of the disagreement.",
                "Answer while pretending to mediate a heated argument."
            ]
        },
        { 
            question: "What’s something you’ve learned from past relationships?",
            challenges: [
                "Share it like you're giving a life lesson in a motivational video.",
                "Answer while making a scrapbook of memories as you talk.",
                "Describe it in a poetic way, as if writing a song."
            ]
        },
        { 
            question: "What’s the most important quality you’re looking for in a partner?",
            challenges: [
                "Describe it while creating a fictional character sketch.",
                "Explain it like you're pitching a new dating app feature.",
                "Answer while drawing a diagram of the ideal partner."
            ]
        },
        { 
            question: "How do you usually express affection in a relationship?",
            challenges: [
                "Explain it while demonstrating your favorite affection gesture.",
                "Describe it like you're writing a romantic movie scene.",
                "Answer while using props to illustrate your methods."
            ]
        },
        { 
            question: "What’s a habit you have that might drive your partner crazy?",
            challenges: [
                "Act it out while narrating the annoyance it causes.",
                "Explain it like you're presenting a humorous stand-up routine.",
                "Describe it while pretending to apologize for the habit."
            ]
        },
        { 
            question: "How important is physical chemistry to you in a relationship?",
            challenges: [
                "Explain it while mimicking various romantic movie moments.",
                "Describe it using dance moves to illustrate the chemistry.",
                "Answer as if you're a scientist presenting a chemistry experiment."
            ]
        },
        { 
            question: "What does 'trust' mean to you in a relationship?",
            challenges: [
                "Explain it while using building blocks to represent trust.",
                "Describe it like you're writing a poem about trust.",
                "Answer while acting out scenarios of trust-building."
            ]
        },
        { 
            question: "What’s the longest relationship you’ve ever been in, and why did it end?",
            challenges: [
                "Tell the story like a dramatic retelling of a movie plot.",
                "Explain it while drawing a timeline of the relationship.",
                "Answer while impersonating the main characters in the relationship."
            ]
        },
        { 
            question: "What’s your communication style—direct or subtle?",
            challenges: [
                "Demonstrate both styles with examples from imaginary conversations.",
                "Describe your style while using exaggerated gestures.",
                "Answer while mimicking different communication styles of people."
            ]
        },
        { 
            question: "How do you usually handle stress or tough situations in life?",
            challenges: [
                "Explain it like you're a life coach giving advice.",
                "Describe it while acting out a stressful situation and your response.",
                "Answer in a calming voice as if you're guiding someone through stress relief."
            ]
        },
        { 
            question: "What’s your love language—how do you prefer to give and receive love?",
            challenges: [
                "Describe it while acting out your love language.",
                "Explain it as if you're presenting a workshop on love languages.",
                "Answer while pretending to give a gift in your love language."
            ]
        },
        { 
            question: "Do you think it’s important to have your own space and independence in a relationship?",
            challenges: [
                "Explain it while creating a small 'space' around yourself.",
                "Describe it like you're writing a manifesto on independence.",
                "Answer while demonstrating what independence looks like."
            ]
        },
        { 
            question: "Are you someone who likes to plan ahead, or do you prefer spontaneity?",
            challenges: [
                "Explain your style while planning a spontaneous trip on the spot.",
                "Describe it like you're running a travel agency for planned vs. spontaneous trips.",
                "Answer while pretending to pack a bag for both types of adventures."
            ]
        },
        { 
            question: "What’s your stance on marriage and long-term commitment?",
            challenges: [
                "Explain it as if you're giving a speech at a wedding.",
                "Describe your thoughts while imagining your ideal wedding day.",
                "Answer while playing the role of a marriage counselor."
            ]
        },
        { 
            question: "How do you feel about kids—whether having them or not?",
            challenges: [
                "Describe it while acting out a conversation with imaginary children.",
                "Explain it like you're writing a children's story.",
                "Answer while pretending to play with kids in a park."
            ]
        },
        { 
            question: "Do you believe in soulmates or that love is something you build over time?",
            challenges: [
                "Explain it like you're debating the topic on a talk show.",
                "Describe it as if you're telling a fable about love.",
                "Answer while sketching a heart with the word 'soulmate' in it."
            ]
        },
        { 
            question: "How important is career success to you compared to personal life?",
            challenges: [
                "Explain it while balancing imaginary scales of career and personal life.",
                "Describe it like you're writing a personal mission statement.",
                "Answer while using hand gestures to emphasize the balance."
            ]
        },
        { 
            question: "How do you feel about staying in vs. going out on weekends?",
            challenges: [
                "Act out both scenarios—staying in and going out.",
                "Explain it like you're a restaurant or movie reviewer.",
                "Describe your perfect weekend as if narrating a documentary."
            ]
        },
        { 
            question: "What’s something you’re passionate about that you want your partner to support?",
            challenges: [
                "Describe it while showcasing a visual representation of your passion.",
                "Explain it like you're pitching a business idea to a partner.",
                "Answer while pretending to host a podcast about your passion."
            ]
        },
        { 
            question: "How do you like to handle finances—are you more of a saver or a spender?",
            challenges: [
                "Explain it like you're a financial advisor giving tips.",
                "Describe it while acting out a budget meeting.",
                "Answer while demonstrating both saving and spending habits."
            ]
        },
        { 
            question: "What’s the most important lesson life has taught you so far?",
            challenges: [
                "Describe it like you're writing a motivational book.",
                "Explain it while using metaphors to illustrate the lesson.",
                "Answer while dramatically recalling a pivotal moment."
            ]
        },
        { 
            question: "What role does your family play in your life and relationships?",
            challenges: [
                "Describe it while acting out a family gathering.",
                "Explain it like you're writing a family history story.",
                "Answer while mimicking conversations with family members."
            ]
        },
        { 
            question: "How do you approach difficult conversations—head-on or avoid until necessary?",
            challenges: [
                "Explain it while demonstrating both approaches.",
                "Describe it as if you're conducting a workshop on effective communication.",
                "Answer while role-playing a difficult conversation."
            ]
        },
        { 
            question: "What’s something non-negotiable for you in a partner?",
            challenges: [
                "Explain it like you're creating a dating profile.",
                "Describe it while listing it on imaginary sticky notes.",
                "Answer while dramatically presenting a 'non-negotiable' sign."
            ]
        },
        { 
            question: "How do you feel about sharing responsibilities in a relationship, like household chores?",
            challenges: [
                "Explain it like you're hosting a cooking show about teamwork.",
                "Describe it while acting out dividing chores.",
                "Answer while pretending to organize a chore chart."
            ]
        },
        { 
            question: "What do you think is the key to maintaining a healthy, long-term relationship?",
            challenges: [
                "Describe it like you're giving a TED Talk on relationships.",
                "Explain it while creating a visual map of key elements.",
                "Answer while pretending to be a relationship expert."
            ]
        },
        { 
            question: "How do you handle jealousy or possessiveness in a relationship?",
            challenges: [
                "Explain it like you're narrating a drama unfolding.",
                "Describe it while acting out scenarios of jealousy.",
                "Answer while calmly practicing deep breathing techniques."
            ]
        },
        { 
            question: "What’s one thing you’ve never been willing to compromise on in past relationships?",
            challenges: [
                "Share it like you're telling a cautionary tale.",
                "Explain it while drawing a line in the sand.",
                "Answer while acting out the moment you stood your ground."
            ]
        },
        { 
            question: "How important is alone time for you, even when you’re in a relationship?",
            challenges: [
                "Describe it while building a cozy fort for alone time.",
                "Explain it as if you're giving a self-care workshop.",
                "Answer while pretending to enjoy a peaceful moment alone."
            ]
        },
        { 
            question: "How do you prioritize work-life balance in your relationships?",
            challenges: [
                "Describe it while acting out a typical day balancing work and personal life.",
                "Explain it as if you're giving a workshop on time management.",
                "Share it while drawing a balance scale to illustrate your priorities."
            ]
        },
        { 
            question: "What does a supportive partner look like to you?",
            challenges: [
                "Sketch a quick doodle of your ideal supportive partner.",
                "Describe them while role-playing their supportive actions.",
                "Explain it as if you're auditioning for a role in a romantic movie."
            ]
        },
        { 
            question: "What’s your view on emotional vulnerability in a relationship?",
            challenges: [
                "Share your thoughts while using exaggerated facial expressions.",
                "Explain it like you're delivering a heartfelt monologue.",
                "Answer while creating a list of 'dos and don'ts' for vulnerability."
            ]
        },
        { 
            question: "How important is intimacy in maintaining a strong connection?",
            challenges: [
                "Describe the different forms of intimacy while acting them out.",
                "Explain it like you're giving a lecture on the psychology of intimacy.",
                "Answer while using props to demonstrate intimacy."
            ]
        },
        { 
            question: "What’s your take on sharing past relationship experiences with a new partner?",
            challenges: [
                "Share your opinion while making a visual graph of 'dos and don'ts'.",
                "Describe it as if you're narrating a story from a movie.",
                "Explain it while pretending to conduct an interview with your past self."
            ]
        },
        { 
            question: "How do you handle differences in political or social beliefs with your partner?",
            challenges: [
                "Explain it while acting out a friendly debate.",
                "Describe it like you're giving advice to someone in a similar situation.",
                "Answer while drawing a venn diagram of common ground."
            ]
        },
        { 
            question: "What’s your biggest fear when it comes to relationships?",
            challenges: [
                "Share it like you're telling a ghost story.",
                "Describe it while acting out the scenario in a humorous way.",
                "Answer while pretending to be a psychologist analyzing fears."
            ]
        },
        { 
            question: "What’s your ideal scenario for resolving disagreements?",
            challenges: [
                "Explain it while role-playing a peaceful mediation session.",
                "Describe it as if you're writing a guide for couples.",
                "Share it while drawing a flowchart of the resolution process."
            ]
        },
        { 
            question: "How do you know when you’re ready to take the next step in a relationship?",
            challenges: [
                "Describe the signs while pretending to be a relationship guru.",
                "Explain it while using a checklist to illustrate readiness.",
                "Answer while acting out a scenario of taking that next step."
            ]
        },
        { 
            question: "What’s one thing you think couples should do to keep the romance alive?",
            challenges: [
                "Share your idea while performing a romantic gesture.",
                "Describe it like you're presenting a romantic comedy plot.",
                "Answer while creating a 'romance survival kit' list."
            ]
        },
        { 
            question: "How do you manage your personal time and shared time in a relationship?",
            challenges: [
                "Explain it while drawing a calendar with your plans.",
                "Share your strategy like you're giving a time management seminar.",
                "Describe it while acting out both personal and shared time activities."
            ]
        },
        { 
            question: "What’s the most meaningful way someone has shown they care about you?",
            challenges: [
                "Share it while acting out the gesture.",
                "Describe it like you're narrating a touching movie scene.",
                "Answer while making a heartfelt card to illustrate the gesture."
            ]
        },
        { 
            question: "How do you define 'loyalty' in a relationship?",
            challenges: [
                "Explain it while creating a loyalty badge or symbol.",
                "Describe it like you're writing a declaration of loyalty.",
                "Share it while role-playing scenarios that test loyalty."
            ]
        },
        { 
            question: "How important is it to you to share the same values with a partner?",
            challenges: [
                "Explain it while building a 'values pyramid' with blocks.",
                "Share your thoughts as if you're giving a TED Talk on values.",
                "Answer while drawing a venn diagram of shared values."
            ]
        },
        { 
            question: "What’s the biggest challenge you’ve faced in your personal relationships?",
            challenges: [
                "Describe it while pretending to narrate a documentary.",
                "Share it like you're giving a motivational speech about overcoming challenges.",
                "Explain it while acting out the challenge and your response."
            ]
        },
        { 
            question: "What’s your perspective on giving second chances in a relationship?",
            challenges: [
                "Explain it while weighing pros and cons on a scale.",
                "Describe it like you're conducting an experiment on second chances.",
                "Answer while role-playing a scenario of giving a second chance."
            ]
        },
        { 
            question: "How do you handle vulnerability in tough situations?",
            challenges: [
                "Explain it while acting out a tough situation and your response.",
                "Describe it like you're sharing a personal story in a podcast.",
                "Answer while creating a visual representation of vulnerability."
            ]
        },
        { 
            question: "What’s one thing that helps you feel secure in a relationship?",
            challenges: [
                "Share it while creating a security 'safety net' with props.",
                "Describe it like you're giving a tutorial on building trust.",
                "Answer while role-playing a scenario that illustrates security."
            ]
        },
        { 
            question: "How do you think financial responsibility should be shared in a partnership?",
            challenges: [
                "Explain it while drawing a budget plan on a whiteboard.",
                "Describe it like you're conducting a financial planning seminar.",
                "Answer while acting out a negotiation about finances."
            ]
        },
        { 
            question: "What’s one habit you’ve developed from being in a past relationship?",
            challenges: [
                "Describe it while demonstrating the habit.",
                "Explain it like you're writing a self-help book chapter.",
                "Answer while role-playing the scenario where the habit was formed."
            ]
        },
        { 
            question: "What’s something you’re still working on in terms of personal growth?",
            challenges: [
                "Share it while drawing a personal growth tree.",
                "Explain it like you're presenting your growth journey in a timeline.",
                "Answer while acting out the steps you're taking for growth."
            ]
        },
        { 
            question: "How do you feel about public displays of affection—love them or avoid them?",
            challenges: [
                "Describe it while acting out both love and avoidance scenarios.",
                "Explain it like you're giving a debate speech.",
                "Answer while demonstrating a funny PDA moment."
            ]
        },
        { 
            question: "What’s your definition of a 'power couple'?",
            challenges: [
                "Share your definition while creating a visual representation.",
                "Describe it like you're casting for a power couple in a movie.",
                "Answer while role-playing a power couple in action."
            ]
        },
        { 
            question: "How do you prefer to handle social media boundaries in a relationship?",
            challenges: [
                "Explain it while drawing a social media boundary map.",
                "Describe it as if you're giving a workshop on digital boundaries.",
                "Answer while acting out scenarios involving social media."
            ]
        },
        { 
            question: "What do you think is the most important aspect of trust between partners?",
            challenges: [
                "Describe it while building a 'trust bridge' with blocks.",
                "Explain it like you're giving a TED Talk on building trust.",
                "Answer while role-playing a trust-building exercise."
            ]
        },
        { 
            question: "How do you usually handle conflicts in a relationship—talk it out right away or wait to cool down?",
            challenges: [
                "Act out a conflict resolution scene, switching roles halfway.",
                "Create a mini skit with a partner where you demonstrate both approaches.",
                "Draw a comic strip illustrating a funny version of your conflict resolution style."
            ]
        },
        { 
            question: "What’s the biggest reason your last relationship ended?",
            challenges: [
                "Reenact the breakup scene with dramatic flair.",
                "Use props to create a 'relationship graveyard' to symbolize what went wrong.",
                "Write a funny obituary for the relationship and read it aloud."
            ]
        },
        { 
            question: "How do you feel about staying friends with exes?",
            challenges: [
                "Describe it while pretending to be on a talk show discussing the topic.",
                "Act out a humorous scenario where you run into an ex unexpectedly.",
                "Use a stuffed animal to represent your feelings and have a conversation with it."
            ]
        },
        { 
            question: "What’s something you’ve been accused of in a relationship that surprised you?",
            challenges: [
                "Role-play the accusation as if it’s a scene in a courtroom drama.",
                "Draw a caricature of yourself illustrating the accusation humorously.",
                "Tell the story in the style of a dramatic soap opera."
            ]
        },
        { 
            question: "What’s your approach to jealousy in a relationship?",
            challenges: [
                "Create a funny 'Jealousy Survival Kit' and list items included.",
                "Act out a scenario where jealousy goes hilariously wrong.",
                "Describe your approach as if you're giving a TED Talk on 'Managing Jealousy'."
            ]
        },
        { 
            question: "How do you feel about your partner having close friends of the opposite sex?",
            challenges: [
                "Pretend to conduct a talk show with a fictional guest discussing boundaries.",
                "Draw a 'friendship map' showing your thoughts on relationships with opposite-sex friends.",
                "Act out a humorous scenario of an over-the-top reaction to a partner's friendship."
            ]
        },
        { 
            question: "What’s one habit of yours that might annoy a partner over time?",
            challenges: [
                "Demonstrate the habit with exaggerated motions as if in a comedy sketch.",
                "Create a funny jingle or song about the habit and perform it.",
                "Draw a cartoon illustrating the annoyance with your habit."
            ]
        },
        { 
            question: "How do you react when things don’t go your way?",
            challenges: [
                "Act out a dramatic response like you're in a movie scene.",
                "Create a humorous 'reaction chart' showing different scenarios and your responses.",
                "Perform a mini stand-up routine describing your worst reactions."
            ]
        },
        { 
            question: "How do you typically react when your partner needs space?",
            challenges: [
                "Act out a funny scene where you pretend to give space, but in a hilariously exaggerated way.",
                "Create a 'space bubble' using imaginary props and demonstrate how you respect it.",
                "Draw a comic strip of your reaction, showing different scenarios of handling space."
            ]
        },
        { 
            question: "What’s something you’ve never been willing to compromise on in past relationships?",
            challenges: [
                "Present it like a courtroom case, defending your stance with exaggerated arguments.",
                "Create a funny Venn diagram showing what you’d compromise on versus what you wouldn’t.",
                "Role-play a negotiation where you refuse to budge on your non-negotiable."
            ]
        },
        { 
            question: "How do you handle it when someone disagrees with your opinions?",
            challenges: [
                "Perform a dramatic reenactment of a disagreement, adding comedic flair.",
                "Create a humorous 'disagreement manual' with silly rules for handling conflict.",
                "Act out a mock debate with a partner, exaggerating both sides of the argument."
            ]
        },
        { 
            question: "What’s your perspective on apologizing in a relationship—easy or difficult for you?",
            challenges: [
                "Write and perform a funny apology poem or song to demonstrate your approach.",
                "Act out an exaggerated apology scene as if you're in a romantic comedy.",
                "Create a flowchart showing your thought process when deciding to apologize."
            ]
        },
        { 
            question: "How do you feel about your partner having privacy in a relationship, like keeping their phone password?",
            challenges: [
                "Pretend to be a detective trying to figure out the mystery of the hidden password.",
                "Create a 'privacy scoreboard' showing how you measure trust in a humorous way.",
                "Act out a scenario where you comically invade their privacy but then realize it’s not cool."
            ]
        },
        { 
            question: "What’s one thing you’ve done in a past relationship that you regret?",
            challenges: [
                "Draw a regretful cartoon and explain the situation as a funny story.",
                "Role-play the moment of regret as if it’s a dramatic scene in a movie.",
                "Create a mock 'Regret Hall of Fame' with items representing different regrets."
            ]
        },
        { 
            question: "How do you usually respond when someone points out a flaw or mistake of yours?",
            challenges: [
                "Perform a funny reenactment of your usual reaction, exaggerated for comedic effect.",
                "Create a silly 'Flaw Report Card' to humorously grade your responses.",
                "Act out a scenario where you handle criticism with an over-the-top positive twist."
            ]
        },
        { 
            question: "What’s something your ex might say was challenging about being with you?",
            challenges: [
                "Imitate your ex’s voice as you describe their perspective in a humorous way.",
                "Create a mock 'interview' where you answer questions as if you’re your ex.",
                "Draw a funny representation of the challenges your ex might mention."
            ]
        },
        { 
            question: "How do you deal with feelings of jealousy in a relationship?",
            challenges: [
                "Create a 'Jealousy Survival Kit' and present the items in a funny way.",
                "Act out a humorous scene where jealousy spirals into a ridiculous situation.",
                "Write a comedic monologue about your inner thoughts when feeling jealous."
            ]
        },
        { 
            question: "What’s a behavior you can’t tolerate in a relationship, no matter what?",
            challenges: [
                "Act out an exaggerated version of your reaction to the intolerable behavior.",
                "Create a 'Dealbreaker Bingo' card and explain each item with humor.",
                "Role-play a funny intervention where you address the behavior in a comedic way."
            ]
        },
        { 
            question: "Have you ever ghosted someone, and if so, why?",
            challenges: [
                "Create a funny ghost character and explain your reasoning as if you're in a haunted house.",
                "Perform a comedic skit showing the ghosting process with exaggerated effects.",
                "Draw a 'ghosting map' outlining the steps taken in a humorous manner."
            ]
        },
        { 
            question: "How do you react when someone cancels plans last minute?",
            challenges: [
                "Dramatically reenact your reaction as if you just lost a big game.",
                "Create a funny 'Cancellation Emergency Kit' with humorous items included.",
                "Perform a mock talk show segment discussing your feelings about last-minute cancellations."
            ]
        },
        { 
            question: "What’s something you think people misunderstand about you?",
            challenges: [
                "Create a humorous infographic showing the misconceptions and the truth.",
                "Act out a scenario where someone misunderstands you, and you hilariously correct them.",
                "Write a funny monologue addressing the common misunderstandings you face."
            ]
        },
        { 
            question: "How do you usually react when you don’t get what you want in a relationship?",
            challenges: [
                "Perform a comedic skit showing an exaggerated tantrum.",
                "Create a humorous flowchart of your thought process during disappointment.",
                "Role-play a funny conversation with a friend about your reaction."
            ]
        },
        { 
            question: "What’s the most controlling thing a partner has done, and how did you respond?",
            challenges: [
                "Act out a dramatic scene of the controlling behavior with over-the-top reactions.",
                "Create a humorous 'Control Meter' showing levels of controlling behavior.",
                "Perform a mock 'reality show' segment about your response to the controlling act."
            ]
        },
        { 
            question: "How do you handle situations where your partner is more successful than you?",
            challenges: [
                "Create a humorous trophy for your partner's success and present it.",
                "Role-play a funny conversation where you celebrate their success in an over-the-top way.",
                "Draw a comic strip illustrating your supportive reaction to their achievements."
            ]
        },
        { 
            question: "What’s one thing that would make you end a relationship immediately?",
            challenges: [
                "Act out the scenario that would lead to the breakup in a funny way.",
                "Create a 'Dealbreaker List' and explain each item with humor.",
                "Perform a dramatic monologue describing the moment of decision to end it."
            ]
        },
        { 
            question: "What’s the biggest lie you’ve told in a relationship?",
            challenges: [
                "Act out a comedic skit illustrating the lie and the consequences.",
                "Create a mock 'Truth or Lie' game where you present the lie and have others guess.",
                "Draw a funny cartoon representing the lie and its fallout."
            ]
        },
        { 
            question: "How do you usually handle criticism, even if it’s constructive?",
            challenges: [
                "Perform a humorous interpretation of your response to constructive criticism.",
                "Create a 'Criticism Flowchart' showing your reactions in a funny way.",
                "Role-play a mock conversation where you receive feedback with exaggerated reactions."
            ]
        },
        { 
            question: "What’s something that always triggers your temper in a relationship?",
            challenges: [
                "Act out a funny overreaction to the trigger in a comedic scene.",
                "Create a 'Temper Trigger Map' showing various triggers and humorous responses.",
                "Perform a monologue detailing the absurdity of your triggers in a light-hearted way."
            ]
        }, { 
            question: "How do you usually show appreciation for your partner?",
            challenges: [
                "Share a specific story where you showed appreciation and ask your partner how they prefer to receive it.",
                "Write down three different appreciation gestures and exchange them to see how you can incorporate each other’s ideas."
            ]
        },
        { 
            question: "What’s the kindest thing a partner has ever done for you?",
            challenges: [
                "Discuss how that act of kindness made you feel and what it taught you about relationships.",
                "Invite your partner to share a similar story and compare your experiences."
            ]
        },
        { 
            question: "How do you ensure good communication in a relationship?",
            challenges: [
                "Discuss what communication styles work best for you and your partner and why.",
                "Role-play a scenario where you practice a communication technique that you find effective."
            ]
        },
        { 
            question: "How do you support your partner during tough times?",
            challenges: [
                "Share a time when you needed support and how your partner can help in similar situations.",
                "Create a list of supportive actions you both can take during tough times and discuss them."
            ]
        },
        { 
            question: "What’s something you consistently do to show your partner that you care?",
            challenges: [
                "Discuss how these actions resonate with you emotionally and explore their impact.",
                "Make a commitment to try one new way of showing care that your partner suggests."
            ]
        },
        { 
            question: "How do you handle your partner’s emotional needs when they’re different from your own?",
            challenges: [
                "Talk about specific instances where you managed emotional differences and what you learned from them.",
                "Share tools or strategies that help you both navigate these differences."
            ]
        },
        { 
            question: "What’s the best compliment you’ve ever received from a partner?",
            challenges: [
                "Discuss why that compliment meant so much to you and how it impacted your self-esteem.",
                "Ask your partner to give you a compliment right now and share what they appreciate about you."
            ]
        },
        { 
            question: "How do you handle conflict in a way that strengthens your relationship?",
            challenges: [
                "Share a conflict you’ve navigated well in the past and what you learned from it.",
                "Discuss your conflict resolution styles and how you can blend them for a better outcome."
            ]
        },
        { 
            question: "What’s something you admire in your friends’ relationships?",
            challenges: [
                "Discuss what qualities you’d like to incorporate into your own relationship and why.",
                "Reflect on how those admired qualities can inspire your relationship."
            ]
        },
        { 
            question: "How do you balance time spent with your partner and time for yourself?",
            challenges: [
                "Share your thoughts on personal space and why it’s important to you.",
                "Create a schedule together that incorporates both quality time and personal time."
            ]
        },
        { 
            question: "What’s one way you’ve grown from past relationships?",
            challenges: [
                "Discuss what lessons you’ve learned and how they’ve shaped your current relationship perspective.",
                "Invite your partner to share their own growth stories and what they’ve learned."
            ]
        },
        { 
            question: "How do you make sure your partner feels heard and understood?",
            challenges: [
                "Practice active listening by sharing something personal and letting your partner reflect it back to you.",
                "Discuss techniques you can both use to enhance understanding in your conversations."
            ]
        },
        { 
            question: "What’s the most meaningful gift you’ve ever given a partner?",
            challenges: [
                "Share the story behind that gift and its significance.",
                "Discuss what thoughtful gifts would resonate with each of you and why."
            ]
        },
        { 
            question: "How do you show love and support for your partner when they’re feeling down?",
            challenges: [
                "Talk about specific actions that make you feel supported and ask your partner for their preferences.",
                "Create a ‘support toolkit’ together with ideas for how to uplift each other."
            ]
        },
        { 
            question: "What’s something you do to make sure your partner feels appreciated regularly?",
            challenges: [
                "Discuss the small gestures that matter most and how they impact your relationship.",
                "Make a pact to try a new appreciation gesture this week and share your experiences afterward."
            ]
        },
        { 
            question: "How do you make compromises in a relationship without feeling like you’re giving up too much?",
            challenges: [
                "Share a recent compromise and how it affected you both.",
                "Discuss ways to find middle ground that honors both partners' needs."
            ]
        },
        { 
            question: "What’s one thing you love doing for your partner that makes them smile?",
            challenges: [
                "Share your favorite stories about making each other smile and why those moments matter.",
                "Plan a small surprise or thoughtful gesture for your partner to try out next."
            ]
        },
        { 
            question: "How do you handle your partner’s quirks and differences with acceptance?",
            challenges: [
                "Discuss a quirk you’ve learned to love about each other and how it adds to your relationship.",
                "Explore how embracing differences has enriched your bond."
            ]
        },
        { 
            question: "What’s one quality you believe makes a strong relationship thrive?",
            challenges: [
                "Discuss how you embody that quality in your own relationship and where you can improve.",
                "Reflect on how you can actively nurture that quality together."
            ]
        },
        { 
            question: "How do you encourage your partner’s personal growth and goals?",
            challenges: [
                "Share your partner’s goals and discuss how you can support each other in achieving them.",
                "Talk about personal growth areas you want to focus on and how to encourage each other."
            ]
        },
        { 
            question: "How do you practice honesty and transparency in a relationship?",
            challenges: [
                "Discuss the importance of honesty in your relationship and share experiences where it made a difference.",
                "Create a safe space for discussing any current concerns openly."
            ]
        },
        { 
            question: "What’s something you’ve learned about yourself from being in a healthy relationship?",
            challenges: [
                "Share insights about yourself that have emerged through your partnership.",
                "Discuss how your partner has helped you discover new aspects of yourself."
            ]
        },
        { 
            question: "How do you make your partner feel valued in everyday situations?",
            challenges: [
                "Talk about daily rituals or habits that enhance feelings of value.",
                "Plan to incorporate at least one new daily gesture that shows value."
            ]
        },
        { 
            question: "What’s one way you express your love when words aren’t enough?",
            challenges: [
                "Discuss non-verbal cues that resonate with you both and share how they enhance your connection.",
                "Explore new non-verbal ways to express love that you can both try."
            ]
        },
        { 
            question: "How do you prioritize trust and openness in your relationships?",
            challenges: [
                "Reflect on trust-building moments in your relationship and how they’ve strengthened your bond.",
                "Create a list of trust-enhancing practices to implement moving forward."
            ]
        }
    ],
        // ... more questions with their specific challenges
    
    'Dating': [
        {
            question: "What was your first impression of me?",
            challenges: [
                "Answer while holding your partner's hand.",
                "Give your response as if it's a secret you've never told anyone."
            ]
        },
        { 
            question: "What was your first impression of me?",
            challenges: [
                "Answer while holding your partner's hand.",
                "Give your response as if it's a secret you've never told anyone."
            ]
        },
        { 
            question: "What’s your idea of a perfect date?",
            challenges: [
                "Draw a sketch of your ideal date and share it with each other.",
                "Describe it using only three words and have your partner guess the details."
            ]
        },
        { 
            question: "How did you feel about dating before we met?",
            challenges: [
                "Share one word that sums up your feelings at that time.",
                "Create a quick timeline of your dating experiences leading up to now."
            ]
        },
        { 
            question: "What’s the best date you’ve ever been on?",
            challenges: [
                "Reenact a moment from that date.",
                "Write a short poem about that experience and share it."
            ]
        },
        { 
            question: "What are your thoughts on love at first sight?",
            challenges: [
                "Describe a moment when you felt an instant connection with someone.",
                "Share a movie scene that represents your view on love at first sight."
            ]
        },
        { 
            question: "What’s your favorite memory from our time together?",
            challenges: [
                "Close your eyes and describe the memory in vivid detail.",
                "Create a mini scrapbook page for that memory."
            ]
        },
        { 
            question: "How do you feel about public displays of affection?",
            challenges: [
                "Act out your favorite public display of affection in a fun way.",
                "Share a time you felt uncomfortable with PDA and why."
            ]
        },
        { 
            question: "What’s something you’ve always wanted to try on a date?",
            challenges: [
                "List three ideas and have your partner pick one to plan for the future.",
                "Discuss why you haven’t done it yet and how you can make it happen."
            ]
        },
        { 
            question: "What do you find most attractive in a partner?",
            challenges: [
                "List three qualities and ask your partner to rate them from 1 to 3.",
                "Draw a ‘dream partner’ outline highlighting those traits."
            ]
        },
        { 
            question: "What’s your go-to conversation starter on a date?",
            challenges: [
                "Create a new conversation starter together.",
                "Role-play using that starter with each other."
            ]
        },
        { 
            question: "How do you feel about texting versus talking on the phone?",
            challenges: [
                "Send a silly text to each other while discussing.",
                "Play a quick game where you guess what the other person prefers based on their reactions."
            ]
        },
        { 
            question: "What’s your favorite way to spend a day with someone you care about?",
            challenges: [
                "Plan an entire day together using your favorite activities.",
                "Share a story of a day that you loved and why."
            ]
        },
        { 
            question: "What’s the most romantic thing someone has done for you?",
            challenges: [
                "Write a short letter to that person expressing gratitude.",
                "Recreate a part of that romantic gesture together."
            ]
        },
        { 
            question: "What’s your biggest fear about dating?",
            challenges: [
                "Share your fear and then list three ways you can overcome it together.",
                "Discuss how you can support each other in overcoming those fears."
            ]
        },
        { 
            question: "What do you think makes a relationship successful?",
            challenges: [
                "List three key ingredients together and create a relationship recipe.",
                "Discuss how you can apply those ingredients to your relationship."
            ]
        },
        { 
            question: "How do you feel about surprises on a date?",
            challenges: [
                "Plan a surprise for each other to be revealed at a later date.",
                "Share a past surprise you loved or hated and why."
            ]
        },
        { 
            question: "What’s your favorite dating app or platform?",
            challenges: [
                "Share the funniest or most interesting profile you’ve seen.",
                "Create a fictional dating profile for a humorous character together."
            ]
        },
        { 
            question: "How do you feel about group dates versus one-on-one dates?",
            challenges: [
                "Discuss the pros and cons of each and make a decision for your next date.",
                "Share a memorable group date experience and what made it special."
            ]
        },
        { 
            question: "What’s the best compliment you can give a date?",
            challenges: [
                "Compliment your partner using a unique or funny angle.",
                "Practice giving compliments to each other that go beyond the surface."
            ]
        },
        { 
            question: "What’s your opinion on dating someone with different interests?",
            challenges: [
                "Share a time you dated someone with different interests and what you learned.",
                "List three interests you’d be willing to explore for each other."
            ]
        },
        { 
            question: "What are your thoughts on relationship timelines?",
            challenges: [
                "Discuss your ideal timeline and why it matters to you.",
                "Create a timeline together of your relationship milestones."
            ]
        },
        { 
            question: "How do you feel about cheesy pickup lines?",
            challenges: [
                "Take turns sharing your favorite cheesy pickup lines.",
                "Make up a new cheesy pickup line to use on each other."
            ]
        }, { 
            question: "What was your first impression of me?",
            challenges: [
                "Describe your first impression in a poetic format.",
                "Share your first impression while making direct eye contact.",
                "Use three emojis to express your first impression."
            ]
        },
        { 
            question: "What’s your favorite type of cuisine to enjoy on a date?",
            challenges: [
                "List your top three dishes from that cuisine and why you love them.",
                "Draw your favorite dish from that cuisine and explain your choice.",
                "Create a short menu for a themed dinner date night."
            ]
        },
        { 
            question: "What’s your ideal way to spend a weekend together?",
            challenges: [
                "Write a brief itinerary for the perfect weekend date.",
                "Share three activities you’d like to do together this weekend.",
                "Draw a quick map of your ideal weekend getaway."
            ]
        },
        { 
            question: "What’s a quality you admire in other couples?",
            challenges: [
                "Discuss a couple you admire and what makes their relationship special.",
                "Write down three qualities you think strengthen a relationship.",
                "Share how you can embody that quality in your own relationship."
            ]
        },
        { 
            question: "How do you feel about sharing personal goals with a partner?",
            challenges: [
                "Each write down one personal goal and share it with each other.",
                "Discuss how you can support each other in achieving your goals.",
                "List three shared goals you’d like to work on together."
            ]
        },
        { 
            question: "What’s your go-to movie or show for a date night?",
            challenges: [
                "Describe your favorite scene from that movie or show.",
                "Act out a short scene together as a fun improv.",
                "Share why that movie or show resonates with you."
            ]
        },
        { 
            question: "What’s your take on long-distance relationships?",
            challenges: [
                "Share a personal experience related to long-distance relationships.",
                "List three ways to keep a long-distance relationship exciting.",
                "Discuss how you would keep the connection strong."
            ]
        },
        { 
            question: "How do you feel about sharing passwords or social media accounts?",
            challenges: [
                "Discuss your views on privacy and trust in a relationship.",
                "Share one thing you’d feel comfortable sharing and one you wouldn’t.",
                "Write down what trust means to you in a relationship."
            ]
        },
        { 
            question: "What’s your opinion on taking breaks in a relationship?",
            challenges: [
                "Discuss the reasons a break might be beneficial or detrimental.",
                "List three things you’d need to discuss if considering a break.",
                "Share how you would handle your feelings during a break."
            ]
        },
        { 
            question: "What’s a funny or awkward date experience you’ve had?",
            challenges: [
                "Share your story and act out a funny moment from it.",
                "Write a humorous review of that date as if you were critiquing it.",
                "List three lessons learned from that experience."
            ]
        },
        { 
            question: "What’s your love language?",
            challenges: [
                "Explain your love language using a recent example.",
                "Discuss how you prefer to receive love versus how you give love.",
                "List three ways you can express love to each other based on your love languages."
            ]
        },
        { 
            question: "How do you handle disagreements in a relationship?",
            challenges: [
                "Role-play a disagreement and how you’d resolve it.",
                "Share your preferred method of resolving conflicts.",
                "List three ground rules you’d want to establish for disagreements."
            ]
        },
        { 
            question: "What’s your biggest pet peeve in a relationship?",
            challenges: [
                "Share a humorous example of a pet peeve you've encountered.",
                "List three ways you can address this pet peeve constructively.",
                "Discuss how you would handle it if it were an issue in your relationship."
            ]
        },
        { 
            question: "What’s a childhood memory that makes you smile?",
            challenges: [
                "Share the memory in detail, including how it made you feel.",
                "Draw a quick sketch of that memory or describe a scene from it.",
                "List three things you learned from that memory that you still carry today."
            ]
        },
        { 
            question: "What’s your favorite way to celebrate special occasions?",
            challenges: [
                "Describe a memorable celebration you’ve had and why it was special.",
                "List three ideas for how to celebrate your next anniversary.",
                "Share a fun tradition you’d like to start together."
            ]
        },
        { 
            question: "How do you typically show appreciation for your partner?",
            challenges: [
                "List three ways you’ve shown appreciation recently.",
                "Share a specific moment when you felt really appreciated.",
                "Discuss how you can improve expressing appreciation in your relationship."
            ]
        },
        { 
            question: "What’s a skill you’d love to learn together?",
            challenges: [
                "Discuss why you want to learn this skill and how it would benefit you.",
                "Make a plan on how you could start learning it together.",
                "List three resources or classes you could explore together."
            ]
        },
        { 
            question: "What’s your idea of a perfect vacation?",
            challenges: [
                "Describe your ideal vacation destination and what you'd do there.",
                "Create a list of must-have items for your dream vacation.",
                "Discuss who would plan the itinerary and why."
            ]
        },
        { 
            question: "How do you define success in a relationship?",
            challenges: [
                "Share one personal definition of success and how it applies to relationships.",
                "Discuss three indicators that show you’re thriving in a relationship.",
                "List three ways you can support each other in achieving that success."
            ]
        },
        { 
            question: "What’s one thing you’ve always wanted to try on a date?",
            challenges: [
                "List three unique date ideas you’d like to experience together.",
                "Discuss what excites you about trying something new.",
                "Share a short story of a past date that was particularly memorable."
            ]
        },
        { 
            question: "What’s your favorite thing about being in a relationship?",
            challenges: [
                "Share a specific moment that exemplifies that favorite thing.",
                "List three qualities you value in a partner that contribute to that enjoyment.",
                "Discuss how you can enhance that aspect of your relationship."
            ]
        }, { 
            question: "What’s the most spontaneous thing you’ve ever done?",
            challenges: [
                "Act out the moment as if you’re telling a story to a friend.",
                "Share why spontaneity is important in a relationship.",
                "Create a spontaneous plan for an unexpected date together."
            ]
        },
        { 
            question: "What is your idea of a perfect date night?",
            challenges: [
                "Draw a picture of your ideal date night setup.",
                "Each describe your favorite part of a perfect date night.",
                "List three unusual ideas for a date night."
            ]
        },
        { 
            question: "What do you find most attractive in a partner?",
            challenges: [
                "Share an example of when you felt attracted to someone’s personality.",
                "List three traits you admire in famous couples.",
                "Create a silly 'attractiveness scale' and rate each other."
            ]
        },
        { 
            question: "What’s something you’ve always wanted to learn together?",
            challenges: [
                "Discuss how learning together can strengthen a relationship.",
                "Make a quick plan for how you’d start learning that skill.",
                "Share an unexpected fact about a skill you want to learn."
            ]
        },
        { 
            question: "How do you feel about public displays of affection?",
            challenges: [
                "Demonstrate your idea of a cute PDA in a playful way.",
                "Share a funny or embarrassing PDA moment you've witnessed.",
                "List three ways to express affection without going overboard in public."
            ]
        },
        { 
            question: "What’s your biggest dream for the future?",
            challenges: [
                "Create a vision board for your dream future using imaginary items.",
                "Discuss how you envision achieving that dream together.",
                "Share a quirky twist on your dream for a laugh."
            ]
        },
        { 
            question: "What’s your favorite way to unwind after a long day?",
            challenges: [
                "Act out your ideal unwinding routine.",
                "Share a funny story about a time you tried to relax and failed.",
                "List three things you’d do together to unwind."
            ]
        },
        { 
            question: "What’s the most ridiculous thing you believed as a child?",
            challenges: [
                "Share the story behind that belief and how you found out it was wrong.",
                "Act out how you would explain that belief to a child today.",
                "Create a list of three funny misconceptions you had growing up."
            ]
        },
        { 
            question: "What’s a dealbreaker for you in a relationship?",
            challenges: [
                "Discuss a time when a dealbreaker became clear to you.",
                "List three things you can agree to disagree on.",
                "Share a lighthearted story about a dealbreaker from someone else."
            ]
        },
        { 
            question: "What’s your go-to karaoke song?",
            challenges: [
                "Sing a few lines of your go-to karaoke song together.",
                "Explain why that song is your favorite karaoke choice.",
                "Invent a silly new verse for your karaoke song."
            ]
        },
        { 
            question: "How do you feel about surprise gifts?",
            challenges: [
                "Share a time you received an unforgettable surprise gift.",
                "List three surprising gifts you would love to receive.",
                "Create a silly backstory for a gift you’d want to give each other."
            ]
        },
        { 
            question: "What’s a food you could never live without?",
            challenges: [
                "Create a short advertisement for your favorite food.",
                "List three meals you could eat every day without getting tired of them.",
                "Share a quirky food combo you secretly enjoy."
            ]
        },
        { 
            question: "What’s your favorite way to celebrate an achievement?",
            challenges: [
                "Share a personal achievement and how you celebrated it.",
                "Act out a celebration for a hypothetical achievement together.",
                "Create a list of unusual ways to celebrate a success."
            ]
        },
        { 
            question: "What’s a fun fact about yourself that most people don’t know?",
            challenges: [
                "Share that fun fact with a funny twist.",
                "Draw a quick doodle representing your fun fact.",
                "List three other surprising fun facts about yourself."
            ]
        },
        { 
            question: "What’s your idea of a great vacation?",
            challenges: [
                "Create a quick travel brochure for your ideal vacation destination.",
                "Share a funny travel mishap you’ve experienced.",
                "List three bucket-list destinations you’d love to visit together."
            ]
        },
        { 
            question: "What would you choose as your spirit animal?",
            challenges: [
                "Describe your spirit animal and why it resonates with you.",
                "Imitate your spirit animal in a playful way.",
                "List three qualities of your spirit animal you wish to embody."
            ]
        },
        { 
            question: "How do you feel about trying new things?",
            challenges: [
                "Share a recent new experience you’ve had.",
                "Discuss how trying new things can improve a relationship.",
                "List three things you’d like to try together."
            ]
        },
        { 
            question: "What’s your favorite childhood memory?",
            challenges: [
                "Share the story behind that memory with excitement.",
                "Draw a quick representation of that memory.",
                "List three things that made your childhood special."
            ]
        },
        { 
            question: "What’s your take on honesty in a relationship?",
            challenges: [
                "Discuss how honesty impacts trust and intimacy.",
                "List three ways to foster open communication.",
                "Share a lighthearted story about an honest mistake."
            ]
        },
        { 
            question: "What do you think makes a successful partnership?",
            challenges: [
                "Discuss the key ingredients for a successful relationship.",
                "Create a silly recipe for a perfect partnership.",
                "List three role models in relationships you admire."
            ]
        },
        { 
            question: "What’s your favorite way to express love?",
            challenges: [
                "Demonstrate your love language through a quick act.",
                "List three creative ways to show love unexpectedly.",
                "Share a funny story about a time you expressed love awkwardly."
            ]
        },
        { 
            question: "What’s the weirdest food combination you enjoy?",
            challenges: [
                "Act out how you discovered this weird combo.",
                "Discuss why you think it works despite being unusual.",
                "List three bizarre food combinations you’d like to try together."
            ]
        },
        { 
            "question": "What’s a personal value that you hold dear, and why is it important to you?",
            "challenges": [
                "Share your answer while looking into each other's eyes for 30 seconds.",
                "Write your answers down on napkins or paper and then read them aloud.",
                "Use only three words to describe the value you chose."
            ]
        },
        { 
            "question": "How do you define success in your life?",
            "challenges": [
                "Draw a quick sketch that represents your idea of success.",
                "Share your answer while giving each other a light shoulder massage.",
                "List three things you would change in your life to feel more successful."
            ]
        },
        { 
            "question": "What role does family play in your life?",
            "challenges": [
                "Tell a family story that shaped who you are today.",
                "Hold hands while discussing, to create a sense of connection.",
                "Share a photo from your phone that represents your family."
            ]
        },
        { 
            "question": "How do you typically handle stress and difficult situations?",
            "challenges": [
                "Share your coping strategy while both mimicking a stress-relief technique.",
                "Take turns giving each other a compliment about handling stress well.",
                "Describe your method using only gestures for one minute."
            ]
        },
        { 
            "question": "What’s your perspective on work-life balance?",
            "challenges": [
                "Create a quick pros and cons list on a napkin about work-life balance.",
                "Discuss your answers while playing a quick game of thumb wrestling.",
                "Use a metaphor to explain your view on balance, like a seesaw or tightrope."
            ]
        },
        { 
            "question": "What are some goals you hope to achieve in the next five years?",
            "challenges": [
                "Share your goals while both pretending to be in a motivational seminar.",
                "Write your goals down and exchange the papers to read each other's.",
                "Discuss one goal while attempting to balance a book on your head."
            ]
        },
        { 
            "question": "How do you envision your ideal lifestyle in the future?",
            "challenges": [
                "Describe it while drawing a quick vision board on a napkin.",
                "Take turns describing it using only three adjectives.",
                "Share your vision while each pretending to be your future self."
            ]
        },
        { 
            "question": "What’s a lesson from your past that has shaped who you are today?",
            "challenges": [
                "Share your lesson while lightly tapping your partner's hand.",
                "Discuss it while taking turns making silly faces.",
                "Write a brief note of what you learned and exchange it."
            ]
        },
        { 
            "question": "How do you approach personal growth and self-improvement?",
            "challenges": [
                "Describe your approach while doing a simple yoga pose.",
                "Share an improvement story while giving each other a high five after each point.",
                "Talk about it while trying to balance a spoon on your nose."
            ]
        },
        { 
            "question": "What do you think is the key to a strong, lasting relationship?",
            "challenges": [
                "Discuss it while keeping a small object (like a ball) in between you.",
                "Share your key while making a tower of sugar packets or napkins.",
                "Talk about it in the form of a poem, even if it’s silly."
            ]
        },
        { 
            "question": "What are your thoughts on conflict resolution in relationships?",
            "challenges": [
                "Role-play a hypothetical conflict and how you would resolve it.",
                "Share your thoughts while making hand gestures that illustrate your points.",
                "Draw a cartoon version of a conflict resolution scenario."
            ]
        },
        { 
            "question": "How important is honesty in a relationship for you?",
            "challenges": [
                "Share your answer while holding a straight face for one minute.",
                "Discuss it while passing a small ball back and forth without dropping it.",
                "Create a 'honesty contract' on a napkin about how you'll be honest with each other."
            ]
        },
        { 
            "question": "How do you feel about taking risks in a relationship?",
            "challenges": [
                "Talk about a risk you took while both pretending to be on a rollercoaster.",
                "Describe it while passing an imaginary hot potato back and forth.",
                "Sketch a ‘risk meter’ on a napkin to represent how you feel."
            ]
        },
        { 
            "question": "What’s something you wish you could change about your past?",
            "challenges": [
                "Share your wish while making a funny face for every word.",
                "Talk about it while pretending to be reporters asking each other questions.",
                "Use an object on the table to symbolize your past change."
            ]
        },
        { 
            "question": "How do you handle change in your life?",
            "challenges": [
                "Describe it while each of you takes turns standing up and sitting down.",
                "Discuss your answer while mimicking what you’d do during a big change.",
                "Share a change story while balancing a pillow on your head."
            ]
        },
        { 
            "question": "What do you believe is your greatest strength?",
            "challenges": [
                "Share it while flexing your arms as if showing off your strength.",
                "Draw a superhero version of yourself and explain your strength.",
                "Discuss it while giving each other a gentle shoulder squeeze."
            ]
        },
        { 
            "question": "What’s your biggest dream for your life?",
            "challenges": [
                "Talk about it while creating a ‘dream jar’ using salt and pepper shakers.",
                "Share your dream while pretending to write it on an imaginary chalkboard.",
                "Discuss it while lightly tossing a small object back and forth."
            ]
        },
        { 
            "question": "How do you express gratitude to those you care about?",
            "challenges": [
                "Share your methods while making a heart shape with your hands.",
                "Discuss your answer while tossing an imaginary gratitude ball to each other.",
                "Draw a thank-you card design for someone special to you."
            ]
        },
        { 
            "question": "What inspires you to be a better person?",
            "challenges": [
                "Describe your inspirations while gently tapping your foot to a beat.",
                "Talk about it while pretending to climb a mountain with exaggerated movements.",
                "Share a story about inspiration while balancing on one leg."
            ]
        },
        { 
            "question": "What do you think is the most important factor in achieving happiness?",
            "challenges": [
                "Discuss it while creating a 'happiness graph' with imaginary lines in the air.",
                "Share your thoughts while using exaggerated hand movements to illustrate points.",
                "Talk about it while holding an object and passing it back and forth."
            ]
        },
        { 
            "question": "What are your views on vulnerability in relationships?",
            "challenges": [
                "Share your thoughts while gently touching your partner’s arm.",
                "Discuss it while each making a funny vulnerable face.",
                "Draw a symbol of vulnerability and explain it."
            ]
        }, {
            "question": "How do you handle disagreements with friends or family?",
            "challenges": [
                "Share a specific disagreement story while mimicking the emotions you felt.",
                "Take turns giving each other a playful critique of how you handled a past disagreement.",
                "Describe how you feel about the situation while doing a silly dance."
            ]
        },
        {
            "question": "What are your views on financial responsibility in a relationship?",
            "challenges": [
                "Use a piece of paper to draw your ideal financial agreement.",
                "Share your thoughts while making a small paper airplane and flying it.",
                "Discuss it while tossing a coin back and forth."
            ]
        },
        {
            "question": "How do you feel about your partner spending time with their ex?",
            "challenges": [
                "Describe your feelings while holding a piece of fruit and pretending it's a phone.",
                "Share your thoughts while making funny faces at each other.",
                "Act out a scenario of a partner meeting an ex and your reaction to it."
            ]
        },
        {
            "question": "What’s your perspective on loyalty and trust in relationships?",
            "challenges": [
                "Discuss it while passing a small object between you without dropping it.",
                "Describe your perspective while pretending to be a news anchor.",
                "Write your thoughts on a piece of paper and reveal them simultaneously."
            ]
        },
        {
            "question": "How do you typically react when someone lets you down?",
            "challenges": [
                "Share your reaction while pretending to be a dramatic movie character.",
                "Role-play how you would confront someone who disappointed you.",
                "Draw a quick comic strip of your typical reaction."
            ]
        },
        {
            "question": "What does commitment mean to you?",
            "challenges": [
                "Share your definition while both mimicking a statue for 30 seconds.",
                "Write your definitions on napkins and exchange them to read.",
                "Discuss it using only emojis or gestures."
            ]
        },
        {
            "question": "How do you feel about public displays of affection?",
            "challenges": [
                "Demonstrate your answer using playful gestures.",
                "Act out a scenario involving a public display of affection.",
                "Discuss your thoughts while giving each other a gentle shoulder squeeze."
            ]
        },
        {
            "question": "What’s your approach to handling jealousy?",
            "challenges": [
                "Share your approach while balancing a small object on your head.",
                "Describe a jealous moment in a playful way, using exaggeration.",
                "Discuss it while giving each other a gentle hand massage."
            ]
        },
        {
            "question": "How important is it for you to have similar interests as your partner?",
            "challenges": [
                "Draw a quick Venn diagram showing your interests and discuss overlaps.",
                "Share a random interest of yours while acting it out.",
                "Make a list of three interests you would love to share with your partner."
            ]
        },
        {
            "question": "How do you feel about making sacrifices in a relationship?",
            "challenges": [
                "Share a personal sacrifice story while doing a funny impression.",
                "Discuss it while lightly pushing against each other, like a playful wrestling match.",
                "Use a metaphor (like a bridge or a scale) to explain your perspective."
            ]
        },
        {
            "question": "What are your thoughts on personal space and independence in a relationship?",
            "challenges": [
                "Draw a quick diagram of your ideal personal space boundaries.",
                "Pretend to be your partner and describe your needs for space.",
                "Discuss while standing back-to-back for a minute."
            ]
        },
        {
            "question": "What do you think is a deal-breaker in a relationship?",
            "challenges": [
                "Act out a scenario involving a deal-breaker without speaking.",
                "Share your thoughts while making a tower out of sugar packets.",
                "Describe a deal-breaker using only gestures."
            ]
        },
        {
            "question": "How do you feel about integrating families in a relationship?",
            "challenges": [
                "Share your feelings while pretending to host a family dinner.",
                "Discuss it while pretending to be family members with different opinions.",
                "Draw a family tree and discuss where you see your relationship fitting in."
            ]
        },
        {
            "question": "What’s your view on sharing social media accounts or passwords?",
            "challenges": [
                "Discuss it while using funny voices to represent different viewpoints.",
                "Share your opinion while playing a quick game of finger football.",
                "Act out a scenario where you’re sharing accounts with humor."
            ]
        },
        {
            "question": "How important is it to you that your partner shares the same life goals?",
            "challenges": [
                "Write a quick list of your life goals and compare them.",
                "Discuss it while balancing a book on your head.",
                "Pretend to be a life coach giving advice on aligning goals."
            ]
        },
        {
            "question": "What does emotional support look like to you?",
            "challenges": [
                "Describe your answer while giving each other a gentle squeeze.",
                "Share a story of emotional support while pretending to be an advice columnist.",
                "Draw a heart on a napkin and write words that represent emotional support."
            ]
        },
        {
            "question": "How do you feel about taking risks in a relationship?",
            "challenges": [
                "Share your thoughts while taking turns jumping in your seats.",
                "Act out a daring relationship scenario together.",
                "Discuss while tossing a coin to represent risk-taking."
            ]
        },
        {
            "question": "How do you handle feelings of inadequacy or insecurity?",
            "challenges": [
                "Share your approach while doing a silly dance.",
                "Discuss it while gently pushing against each other as a way of illustrating support.",
                "Describe a time you felt insecure while pretending to be a news reporter."
            ]
        },
        {
            "question": "What are your thoughts on balancing work and relationship time?",
            "challenges": [
                "Share your ideas while stacking cups or other items in a fun way.",
                "Discuss it while each holding a piece of fruit as a metaphor for balance.",
                "Draw a scale on a napkin and represent how you would balance both."
            ]
        },
        {
            "question": "How do you view relationships with different lifestyles or routines?",
            "challenges": [
                "Role-play a day in the life of someone with a different routine.",
                "Discuss while each trying to balance a spoon on your nose.",
                "Draw a clock and illustrate your ideal daily routine."
            ]
        },
        {
            "question": "How important is it for you to have mutual friends in a relationship?",
            "challenges": [
                "Share your opinion while pretending to be a matchmaker.",
                "Discuss while taking turns doing a funny handshake.",
                "Write down pros and cons of mutual friends and share."
            ]
        },
        {
            "question": "What’s your opinion on discussing past relationships?",
            "challenges": [
                "Share your thoughts while pretending to conduct an interview.",
                "Discuss while making exaggerated facial expressions to show your feelings.",
                "Act out a scene from a past relationship, making it humorous."
            ]
        },
        {
            "question": "How do you handle situations where your partner has different views?",
            "challenges": [
                "Role-play a disagreement using funny voices.",
                "Discuss it while tossing a small ball back and forth.",
                "Draw a comic strip illustrating how to handle differing views."
            ]
        }, {
            "question": "What’s your view on honesty and transparency in a relationship?",
            "challenges": [
                "Share your thoughts while holding a small mirror and making eye contact.",
                "Describe a time you were completely honest while doing a silly dance.",
                "Use your hands to create a 'wall' and talk about transparency while moving your hands apart."
            ]
        },
        {
            "question": "How do you feel about discussing past relationships with a partner?",
            "challenges": [
                "Share your thoughts while pretending to write in a diary.",
                "Describe a past relationship in three emojis and explain your choices.",
                "Act out how you'd want to be told about a past relationship."
            ]
        },
        {
            "question": "What does self-care look like for you?",
            "challenges": [
                "Draw a quick illustration of your self-care routine while discussing it.",
                "Share your routine while pretending to give yourself a spa treatment.",
                "Describe it using only sounds or gestures."
            ]
        },
        {
            "question": "How do you handle situations where your partner's goals differ from yours?",
            "challenges": [
                "Act out a scenario where you support each other's goals.",
                "Discuss your views while balancing a small pillow on your heads.",
                "Describe how you'd compromise while making silly faces."
            ]
        },
        {
            "question": "How do you react to someone who is overly critical of you?",
            "challenges": [
                "Share your reaction while mimicking a famous movie character.",
                "Discuss while tossing a stress ball back and forth.",
                "Pretend to be a supportive friend giving advice to yourself."
            ]
        },
        {
            "question": "What’s your stance on being vulnerable with your partner?",
            "challenges": [
                "Share your thoughts while wrapped in a blanket like a burrito.",
                "Describe a vulnerable moment while playing with a stress toy.",
                "Discuss while drawing a heart shape in the air with your hands."
            ]
        },
        {
            "question": "How do you feel about sharing household responsibilities?",
            "challenges": [
                "Use your hands to create a 'team' gesture while discussing it.",
                "Draw a quick diagram of your ideal division of chores.",
                "Act out a chore you dislike while explaining why."
            ]
        },
        {
            "question": "What’s your take on exploring new things together as a couple?",
            "challenges": [
                "Share an idea for a fun activity while doing a spontaneous silly dance.",
                "Discuss while pretending to explore a new city, acting out sights you’d see.",
                "Create a bucket list together while passing a ball back and forth."
            ]
        },
        {
            "question": "How important is it for you to share similar values with your partner?",
            "challenges": [
                "Use objects on the table to create a 'value tree' while discussing.",
                "Share your values while making a funny face with each point.",
                "Act out how you would explain a value to someone who disagrees."
            ]
        },
        {
            "question": "How do you approach resolving conflicts in a relationship?",
            "challenges": [
                "Role-play a conflict resolution scenario while using exaggerated expressions.",
                "Discuss it while sitting back-to-back and facing away from each other.",
                "Share your approach while drawing a 'conflict resolution map' on a napkin."
            ]
        },
        {
            "question": "How do you feel about travel and adventure in a relationship?",
            "challenges": [
                "Share your thoughts while pretending to pack a suitcase.",
                "Discuss while playing travel-themed charades with each other.",
                "Create a travel itinerary together while passing a pen back and forth."
            ]
        },
        {
            "question": "What’s your approach to maintaining friendships outside of a relationship?",
            "challenges": [
                "Share your views while juggling small objects (like balls or napkins).",
                "Act out a scenario where you’re introducing your partner to friends.",
                "Describe your ideal friendship dynamic using only gestures."
            ]
        },
        {
            "question": "How do you deal with feelings of insecurity in a relationship?",
            "challenges": [
                "Share your approach while pretending to be a supportive friend.",
                "Discuss while making a list of positive affirmations for each other.",
                "Act out how you would comfort someone feeling insecure."
            ]
        },
        {
            "question": "What role does humor play in your relationships?",
            "challenges": [
                "Share a funny story while trying to make the other person laugh.",
                "Act out a humorous situation that could happen on a date.",
                "Discuss while drawing funny cartoons of each other."
            ]
        },
        {
            "question": "What’s your opinion on social media in a relationship?",
            "challenges": [
                "Share your thoughts while scrolling through a fake social media feed.",
                "Discuss while mimicking each other’s social media posts.",
                "Create a mock social media post about your relationship together."
            ]
        },
        {
            "question": "How do you feel about making long-term plans with a partner?",
            "challenges": [
                "Use props to create a visual representation of your long-term plans.",
                "Discuss while drawing a timeline of your ideal future together.",
                "Share your ideas while pretending to be a fortune teller."
            ]
        },
        {
            "question": "What’s one thing you need from a partner to feel supported?",
            "challenges": [
                "Describe it while pretending to be a superhero seeking help.",
                "Share while acting out a scene where you’re supporting each other.",
                "Draw a superhero emblem that represents your support needs."
            ]
        },
        {
            "question": "How do you feel about your partner's friendships with people of the opposite gender?",
            "challenges": [
                "Share your thoughts while pretending to give a news report.",
                "Discuss while doing a playful dance to express your feelings.",
                "Act out a funny scenario involving a friend of the opposite gender."
            ]
        },
        {
            "question": "What are your views on compromise in a relationship?",
            "challenges": [
                "Share your thoughts while balancing something on your head.",
                "Discuss while pretending to negotiate a treaty between two countries.",
                "Create a funny skit about compromising on a trivial matter."
            ]
        },
        {
            "question": "How do you feel about having different political beliefs in a relationship?",
            "challenges": [
                "Share your views while using a stuffed animal as your spokesperson.",
                "Discuss while taking turns making silly political speeches.",
                "Act out a debate on a topic you both agree on in a humorous way."
            ]
        },
        {
            "question": "What’s something you would like to change about the dating scene?",
            "challenges": [
                "Share your thoughts while acting out a scene from a bad date.",
                "Discuss while using funny voices to express your ideas.",
                "Create a fictional dating app idea together, using props on the table."
            ]
        },   {
            "question": "If you could be any character from a sitcom, who would you choose and why?",
            "challenges": [
                "Imitate that character's laugh for 10 seconds.",
                "Describe their quirks while doing your best impression of them.",
                "Act out a scene as that character with your partner."
            ]
        },
        {
            "question": "What’s the silliest thing you believed as a child?",
            "challenges": [
                "Share it while wearing a goofy hat or accessory.",
                "Draw a quick doodle of your belief and explain it.",
                "Pretend to be a news anchor reporting on your childhood belief."
            ]
        },
        {
            "question": "If you were a flavor of ice cream, what would you be and why?",
            "challenges": [
                "Mimic a famous chef while describing your flavor.",
                "Use gestures to act out how your flavor would be served.",
                "Pretend to scoop your ice cream flavor and offer it to your partner."
            ]
        },
        {
            "question": "What’s the weirdest nickname you’ve ever had?",
            "challenges": [
                "Tell the story behind it while making a funny face.",
                "Act out how you got the nickname using gestures.",
                "Use a funny voice to reenact how others called you by that name."
            ]
        },
        {
            "question": "If you could have any animal as a pet (real or imaginary), what would it be?",
            "challenges": [
                "Mimic the sounds your chosen pet would make.",
                "Act out a day in the life of your pet while your partner guesses.",
                "Describe your pet's personality using only three emojis."
            ]
        },
        {
            "question": "What’s your go-to dance move when no one’s watching?",
            "challenges": [
                "Demonstrate your move while standing on one leg.",
                "Teach your partner the move while singing a silly song.",
                "Describe the move as if you're giving a serious tutorial."
            ]
        },
        {
            "question": "What’s your guilty pleasure TV show or movie?",
            "challenges": [
                "Act out a scene from that show or movie.",
                "Describe the show using only three dramatic gestures.",
                "Pretend you’re pitching the show to someone who has never heard of it."
            ]
        },
        {
            "question": "If you could invent a holiday, what would it celebrate?",
            "challenges": [
                "Create a quick jingle for your holiday.",
                "Act out how people would celebrate it.",
                "Describe the holiday while throwing confetti around."
            ]
        },
        {
            "question": "What’s the most embarrassing fashion trend you followed?",
            "challenges": [
                "Act out a fashion show showcasing that trend.",
                "Draw a quick sketch of the outfit while explaining it.",
                "Describe a scenario where you wore it while pretending to be a model."
            ]
        },
        {
            "question": "If you could time travel to any decade for a week, which would you choose?",
            "challenges": [
                "Share your choice while doing a dance popular in that decade.",
                "Act out what you would wear if you traveled to that decade.",
                "Describe a day in that decade as if you're writing a diary entry."
            ]
        },
        {
            "question": "What’s the weirdest food combination you enjoy?",
            "challenges": [
                "Describe it while pretending to be a food critic tasting it.",
                "Act out the process of making your weird dish.",
                "Use props to illustrate your food combination while explaining it."
            ]
        },
        {
            "question": "If you had to communicate only through emojis for a day, which three would you choose?",
            "challenges": [
                "Use your body to represent the emojis.",
                "Draw your emojis in the air with your finger and guess each other’s.",
                "Create a short story using only those three emojis."
            ]
        },
        {
            "question": "What’s the funniest thing you’ve overheard in public?",
            "challenges": [
                "Reenact the moment using different voices.",
                "Describe it as if you’re narrating a dramatic story.",
                "Act out the scene using only facial expressions."
            ]
        },
        {
            "question": "If you could swap lives with any cartoon character, who would it be?",
            "challenges": [
                "Act out what a day in their life would look like.",
                "Draw a quick scene with your character and describe it.",
                "Mimic their voice while explaining why you chose them."
            ]
        },
        {
            "question": "What’s the strangest thing you’ve ever done on a dare?",
            "challenges": [
                "Act it out while your partner guesses what it was.",
                "Describe it in a dramatic fashion as if it's a horror story.",
                "Reenact how you felt at that moment using only your face."
            ]
        },
        {
            "question": "If you could have a superpower for a day, what would it be and how would you use it?",
            "challenges": [
                "Demonstrate how you would use your superpower.",
                "Act out your superhero persona with a cape made from a scarf.",
                "Describe your day as a superhero while your partner guesses the power."
            ]
        },
        {
            "question": "What’s the most ridiculous thing you believed in as a kid?",
            "challenges": [
                "Reenact your belief using props around you.",
                "Describe it using only sounds or gestures.",
                "Draw a picture of the belief while explaining it."
            ]
        },
        {
            "question": "If you could create a reality show, what would the premise be?",
            "challenges": [
                "Pitch your show with enthusiasm while acting as a host.",
                "Draw a quick poster for your reality show idea.",
                "Describe the most outrageous challenge from your show."
            ]
        },
        {
            "question": "What’s your secret talent that nobody knows about?",
            "challenges": [
                "Perform your talent right now for your partner.",
                "Describe how you discovered your talent in an exaggerated way.",
                "Act out how you would teach someone else that talent."
            ]
        },
        {
            "question": "If you had to live in any fictional universe, which would it be?",
            "challenges": [
                "Describe your life there while pretending to interact with the characters.",
                "Act out a day in that universe as if you're actually there.",
                "Draw a quick map of your fictional universe and explain it."
            ]
        },
        {
            "question": "What’s the most ridiculous argument you’ve ever had?",
            "challenges": [
                "Act out a dramatic reenactment of the argument.",
                "Describe it using only gestures and facial expressions.",
                "Use props to illustrate the argument while explaining it."
            ]
        },
        {
            "question": "If you could be a fly on the wall, where would you want to be?",
            "challenges": [
                "Describe what you would do as that fly using funny sound effects.",
                "Act out your fly-like behavior while narrating your thoughts.",
                "Pretend to be that fly and 'buzz' around your partner as you explain."
            ]
        }, {
            "question": "If you could only eat one food for the rest of your life, what would it be?",
            "challenges": [
                "Pretend you're a food critic describing that food in a dramatic way.",
                "Act out a cooking show segment where you prepare your dish.",
                "Share your answer while doing a silly food dance."
            ]
        },
        {
            "question": "What’s the most ridiculous fact you know?",
            "challenges": [
                "Explain it using only hand gestures.",
                "Act as if you’re giving a TED Talk on this fact.",
                "Draw a quick comic illustrating the fact."
            ]
        },
        {
            "question": "If you were a cartoon character, who would you be and why?",
            "challenges": [
                "Imitate that character's voice or catchphrase.",
                "Act out a scene involving that character.",
                "Describe their traits while your partner guesses who you are."
            ]
        },
        {
            "question": "What’s the worst haircut you’ve ever had?",
            "challenges": [
                "Recreate how you looked with that haircut using your hands.",
                "Share the story while making funny facial expressions.",
                "Draw a quick sketch of the haircut on a napkin or paper."
            ]
        },
        {
            "question": "If you could switch lives with anyone for a day, who would it be?",
            "challenges": [
                "Describe what your day would look like in their shoes.",
                "Act out a moment from that person’s life.",
                "Create a hashtag for your new life and explain it."
            ]
        },
        {
            "question": "What’s your favorite childhood game or activity?",
            "challenges": [
                "Demonstrate how to play it with your partner.",
                "Use props to act out the game rules.",
                "Describe a funny moment related to that game."
            ]
        },
        {
            "question": "What’s the most ridiculous thing you’ve done to impress someone?",
            "challenges": [
                "Reenact the moment dramatically.",
                "Describe it as if you’re narrating a suspenseful movie.",
                "Draw a quick illustration of what happened."
            ]
        },
        {
            "question": "If you could be an animal for a day, which one would you choose?",
            "challenges": [
                "Act out how that animal behaves.",
                "Explain why you chose that animal using only sounds.",
                "Describe your day in the wild as that animal."
            ]
        },
        {
            "question": "What’s your favorite joke or pun?",
            "challenges": [
                "Perform it as a stand-up comedy bit.",
                "Describe why it’s your favorite with exaggerated enthusiasm.",
                "Make up a follow-up joke that relates to it."
            ]
        },
        {
            "question": "What’s a habit you have that makes people laugh?",
            "challenges": [
                "Demonstrate that habit while making funny noises.",
                "Explain how you developed that habit using gestures.",
                "Share a story of when it got you into a funny situation."
            ]
        },
        {
            "question": "If you could only communicate using one meme for a day, which would it be?",
            "challenges": [
                "Act out the meme and see if your partner can guess it.",
                "Explain the meme's meaning as if you're teaching a class.",
                "Create a new meme idea together based on your choice."
            ]
        },
        {
            "question": "What fictional world would you want to live in?",
            "challenges": [
                "Describe a day in that world as if you were a tour guide.",
                "Act out a scene that could happen in that world.",
                "Use props to represent something from that world."
            ]
        },
        {
            "question": "What’s your favorite weird or obscure talent?",
            "challenges": [
                "Demonstrate that talent to your partner.",
                "Describe how you discovered that talent using humor.",
                "Challenge your partner to try and replicate it."
            ]
        },
        {
            "question": "If you had a theme song, what would it be?",
            "challenges": [
                "Sing a few lines or hum the melody.",
                "Describe the reasons behind your choice while dancing.",
                "Act out a music video for your song."
            ]
        },
        {
            "question": "What’s the most awkward situation you’ve found yourself in?",
            "challenges": [
                "Reenact it dramatically while your partner guesses.",
                "Share it while making exaggerated facial expressions.",
                "Draw a quick comic of that moment."
            ]
        },
        {
            "question": "If you could create a new ice cream flavor, what would it be?",
            "challenges": [
                "Describe the flavor while pretending to taste it.",
                "Act out how you would serve it to someone.",
                "Make up a jingle for your ice cream flavor."
            ]
        },
        {
            "question": "What’s the funniest thing you’ve ever overheard?",
            "challenges": [
                "Recreate the conversation with your partner acting as the other person.",
                "Describe it using funny accents.",
                "Share it while drawing the scene in the air."
            ]
        },
        {
            "question": "If you could instantly become an expert in anything, what would it be?",
            "challenges": [
                "Explain your newfound expertise dramatically.",
                "Act out what you would do with your expertise.",
                "Draw a quick illustration of yourself as an expert."
            ]
        },
        {
            "question": "What’s your most embarrassing moment from school?",
            "challenges": [
                "Reenact it for your partner.",
                "Describe the moment as if you're narrating a movie trailer.",
                "Use props to illustrate what happened."
            ]
        },
        {
            "question": "If you had to live in a world from a movie, which one would you pick?",
            "challenges": [
                "Describe a day in that world using props or gestures.",
                "Act out a scenario that could happen in that world.",
                "Draw a quick map of your favorite spot in that world."
            ]
        },
        {
            "question": "What’s your go-to karaoke song?",
            "challenges": [
                "Perform a short snippet of it for your partner.",
                "Explain why it’s your go-to with dramatic flair.",
                "Invent a new verse for the song that includes your partner."
            ]
        }
        // ... more questions with their specific challenges
    ],
    'Longterm': [
        {
            "question": "What are your core values, and how do they shape our partnership?",
            "challenges": [
                "Share your values while drawing them as symbols.",
                "Explain how a specific value has influenced a decision in our relationship.",
                "Describe a situation where our values aligned perfectly."
            ]
        },
        {
            "question": "What does a successful relationship look like to you?",
            "challenges": [
                "Create a vision board using available materials (napkins, menus, etc.).",
                "Act out a scene depicting that successful relationship.",
                "List three things you think we do well that contribute to success."
            ]
        },
        {
            "question": "How do you see our future together in five years?",
            "challenges": [
                "Draw a timeline of our future milestones.",
                "Describe a day in our life five years from now.",
                "Share your hopes for us in a dramatic monologue style."
            ]
        },
        {
            "question": "What is your perspective on financial management in a relationship?",
            "challenges": [
                "Create a budget plan together using imaginary numbers.",
                "Act out a scene where we discuss finances in a light-hearted way.",
                "Describe a past experience that shaped your views on money."
            ]
        },
        {
            "question": "What role do you think communication plays in our relationship?",
            "challenges": [
                "Demonstrate a good communication practice using role-play.",
                "Describe a time when communication improved our situation.",
                "Create a list of 'communication dos and don'ts' together."
            ]
        },
        {
            "question": "How do you handle conflict resolution in a relationship?",
            "challenges": [
                "Role-play a hypothetical conflict and how you would resolve it.",
                "Share a past conflict and how you wish it had been handled differently.",
                "Create a 'conflict resolution toolkit' list together."
            ]
        },
        {
            "question": "What are your thoughts on family dynamics and involvement in our relationship?",
            "challenges": [
                "Draw a family tree and highlight relationships.",
                "Share a story about your family that influences your view on family involvement.",
                "Discuss the benefits and challenges of family interactions in a light-hearted way."
            ]
        },
        {
            "question": "What does commitment mean to you?",
            "challenges": [
                "Explain your definition of commitment using a metaphor.",
                "Share an example of a commitment you made and how it affected you.",
                "Discuss how we can strengthen our commitment to each other."
            ]
        },
        {
            "question": "How do you feel about personal space and independence in a long-term relationship?",
            "challenges": [
                "Create a 'personal space map' showing how we can maintain independence.",
                "Share a funny story about needing personal space.",
                "Discuss how we can balance time together and apart."
            ]
        },
        {
            "question": "What are your views on raising children, if that's something we decide to do?",
            "challenges": [
                "Create a hypothetical 'parenting style guide' together.",
                "Share a story about a memorable childhood experience.",
                "Discuss what values you want to instill in children in a fun way."
            ]
        },
        {
            "question": "What do you think is the most important aspect of intimacy in a relationship?",
            "challenges": [
                "Share an intimate moment you've experienced that deepened your connection.",
                "Act out a romantic gesture you’d like to try.",
                "Discuss different forms of intimacy (emotional, physical, etc.) in a light-hearted manner."
            ]
        },
        {
            "question": "How do you define trust, and why is it important in our relationship?",
            "challenges": [
                "Describe a time when trust was tested and how it was resolved.",
                "Create a 'trust-building exercise' we can do together.",
                "Share a funny analogy about trust in relationships."
            ]
        },
        {
            "question": "What hobbies or interests would you like us to explore together?",
            "challenges": [
                "Create a mini itinerary for a weekend filled with shared activities.",
                "Describe an ideal date night that incorporates these hobbies.",
                "Role-play a scene from an activity you’d like to try."
            ]
        },
        {
            "question": "How do you handle stress and how can I support you during those times?",
            "challenges": [
                "Share a personal stress management technique while demonstrating it.",
                "Discuss a time you felt stressed and what helped you cope.",
                "Create a 'stress relief plan' we can use together."
            ]
        },
        {
            "question": "What are some traditions or rituals you’d like to establish in our relationship?",
            "challenges": [
                "Brainstorm a fun new tradition we could start together.",
                "Describe a meaningful tradition from your family or culture.",
                "Role-play a special occasion where we celebrate that tradition."
            ]
        },
        {
            "question": "What is something you think we could improve in our relationship?",
            "challenges": [
                "Share a specific improvement idea and discuss how to implement it.",
                "Create a 'relationship enhancement plan' with fun activities.",
                "Act out a situation where the improvement could be applied."
            ]
        },
        {
            "question": "How do you envision our retirement years together?",
            "challenges": [
                "Draw a picture of your retirement dream life.",
                "Describe a fun retirement activity we could enjoy together.",
                "Create a playful list of things we want to try when we retire."
            ]
        },
        {
            "question": "How do you think we can keep the spark alive in our long-term relationship?",
            "challenges": [
                "Share an example of a romantic gesture you’d like to try.",
                "Brainstorm spontaneous date ideas together.",
                "Discuss the importance of playfulness in our relationship."
            ]
        },
        {
            "question": "What legacy do you want to leave in our relationship?",
            "challenges": [
                "Describe what that legacy looks like in a fun way.",
                "Share a personal story that reflects your desired legacy.",
                "Create a 'legacy vision board' using available materials."
            ]
        },
        {
            "question": "How do you envision spending our vacations in the future?",
            "challenges": [
                "Draw a map of our ideal vacation destinations.",
                "Act out a scene from a vacation you dream of taking.",
                "Brainstorm a list of unique vacation activities we could do together."
            ]
        }, {
            "question": "What’s your biggest turn-on?",
            "challenges": [
                "Act out your biggest turn-on without words.",
                "Describe a time when you felt particularly attracted to me.",
                "Create a playful list of turn-ons we both share."
            ]
        },
        {
            "question": "How do you feel about exploring fantasies together?",
            "challenges": [
                "Share a fantasy you've thought about but haven't discussed.",
                "Create a fictional scenario where we explore a fantasy together.",
                "Draw or write a brief scene of a fantasy you’d like to experience."
            ]
        },
        {
            "question": "What’s something you’ve always wanted to try in the bedroom?",
            "challenges": [
                "Share a playful demonstration of how you’d introduce it.",
                "Create a 'bucket list' of intimate experiences together.",
                "Discuss a romantic movie scene you’d like to recreate."
            ]
        },
        {
            "question": "What’s your favorite memory of us being intimate?",
            "challenges": [
                "Recreate the moment with a short role-play.",
                "Describe it in detail, using only one word per sentence.",
                "Write a short poem about that memory."
            ]
        },
        {
            "question": "How do you feel about public displays of affection?",
            "challenges": [
                "Demonstrate a subtle PDA we could do right now.",
                "Share an experience where you felt awkward about PDA.",
                "Create a fun list of appropriate places for PDA."
            ]
        },
        {
            "question": "What’s a secret you’ve never shared with anyone about your desires?",
            "challenges": [
                "Share it with a playful twist, like a dramatic reveal.",
                "Create a list of desires we’d both like to explore.",
                "Use a fun analogy to describe your secret."
            ]
        },
        {
            "question": "How do you feel about spontaneity in our intimate life?",
            "challenges": [
                "Describe an impromptu intimate moment you’d love to have.",
                "Act out a spontaneous scenario we could try.",
                "Share a story where spontaneity added excitement to our relationship."
            ]
        },
        {
            "question": "What’s your idea of the perfect romantic date night?",
            "challenges": [
                "Create a detailed plan for that date night together.",
                "Role-play the date night scenario from start to finish.",
                "Draw a picture of what the ideal setting looks like."
            ]
        },
        {
            "question": "What’s something that always makes you feel closer to me?",
            "challenges": [
                "Share a specific example while holding hands.",
                "Discuss how we can enhance those moments together.",
                "Create a list of activities that bring us closer."
            ]
        },
        {
            "question": "How do you feel about experimenting with new things in our intimate life?",
            "challenges": [
                "Share a fun idea you’ve had for experimenting.",
                "Create a playful 'experiment checklist' together.",
                "Act out a hypothetical scenario involving new experiences."
            ]
        },
        {
            "question": "What’s your favorite part of our physical connection?",
            "challenges": [
                "Describe it in a poetic form.",
                "Demonstrate it with a light, playful touch.",
                "Share a memory related to that connection."
            ]
        },
        {
            "question": "How do you feel about aftercare in our intimate moments?",
            "challenges": [
                "Share a fun aftercare routine we could develop.",
                "Role-play how we would provide aftercare to each other.",
                "Discuss an experience where aftercare was important to you."
            ]
        },
        {
            "question": "What’s your take on being vulnerable during intimate moments?",
            "challenges": [
                "Describe a time when vulnerability deepened our connection.",
                "Act out a moment where vulnerability played a key role.",
                "Share how vulnerability affects your intimacy."
            ]
        },
        {
            "question": "What’s a sensual activity outside the bedroom that excites you?",
            "challenges": [
                "Create a short role-play of that activity.",
                "Discuss how we can incorporate it into our routine.",
                "Share a story related to that activity."
            ]
        },
        {
            "question": "How do you feel about incorporating playfulness into our intimate life?",
            "challenges": [
                "Share a playful idea for keeping things light.",
                "Act out a silly scenario that could happen.",
                "Discuss what playful moments we’ve enjoyed in the past."
            ]
        },
        {
            "question": "What’s your favorite way to feel desired?",
            "challenges": [
                "Share a specific scenario that makes you feel desired.",
                "Create a list of gestures that express desire for each other.",
                "Discuss a time when you felt most desired by me."
            ]
        },
        {
            "question": "What do you think is the biggest misconception about intimacy?",
            "challenges": [
                "Discuss it while keeping a straight face.",
                "Share a funny story related to that misconception.",
                "Act out a scene illustrating that misconception."
            ]
        },
        {
            "question": "How do you feel about keeping some mystery in our relationship?",
            "challenges": [
                "Create a fun 'mystery box' where we write down secrets.",
                "Share a playful mystery you’d like to explore together.",
                "Discuss how mystery has added excitement to our relationship."
            ]
        },
        {
            "question": "What’s one thing you want to learn more about regarding intimacy?",
            "challenges": [
                "Share a funny or surprising fact related to it.",
                "Create a mini-plan for how we could learn together.",
                "Discuss a time when you learned something new that surprised you."
            ]
        },
        {
            "question": "What’s your favorite way to flirt with me?",
            "challenges": [
                "Demonstrate your favorite flirty gesture.",
                "Describe a time when flirting led to a fun moment.",
                "Act out a scenario where we’re flirting in public."
            ]
        },
        {
            "question": "How do you feel about sharing intimate playlists or music?",
            "challenges": [
                "Create a playlist together on the spot.",
                "Share a song that reminds you of a special moment.",
                "Discuss how music enhances intimacy for you."
            ]
        },
        {
            "question": "What do you think is the sexiest thing about our relationship?",
            "challenges": [
                "Share it in a dramatic, exaggerated way.",
                "Discuss how that aspect has grown over time.",
                "Act out a scene that embodies that sexiness."
            ]
        }
, {
    "question": "What’s one thing you wish I would do more of during intimacy?",
    "challenges": [
        "Share your answer while maintaining eye contact.",
        "Demonstrate how you’d like me to do it.",
        "Describe a time when it made a difference in our connection."
    ]
},
{
    "question": "How do you feel about incorporating role play into our intimate life?",
    "challenges": [
        "Act out a short role-play scenario you’d like to try.",
        "Create a fun character for a potential role play.",
        "Discuss a favorite movie or book that inspires your idea."
    ]
},
{
    "question": "What’s your biggest fantasy that we haven’t explored yet?",
    "challenges": [
        "Share it in a playful way as if it’s a secret.",
        "Write a short story about us fulfilling that fantasy.",
        "Draw a picture that represents your fantasy."
    ]
},
{
    "question": "What’s one thing you think would spice up our relationship?",
    "challenges": [
        "List out three ideas and discuss them.",
        "Demonstrate one of those ideas in a fun way.",
        "Share a story from a past relationship that relates."
    ]
},
{
    "question": "What kind of intimacy do you think we should explore more?",
    "challenges": [
        "Share your thoughts while giving me a shoulder rub.",
        "Create a list of different types of intimacy to try.",
        "Act out a gentle example of that intimacy."
    ]
},
{
    "question": "How do you feel about discussing our intimate preferences openly?",
    "challenges": [
        "Share your thoughts using only gestures for 30 seconds.",
        "Describe a time when open communication enhanced our intimacy.",
        "Role-play a conversation where we discuss preferences."
    ]
},
{
    "question": "What’s your favorite way for us to connect emotionally?",
    "challenges": [
        "Share a moment that made you feel deeply connected.",
        "Demonstrate a gesture that signifies emotional connection.",
        "Create a list of activities we can do to enhance this connection."
    ]
},
{
    "question": "How do you feel about sharing intimate details with friends?",
    "challenges": [
        "Share a funny or light-hearted anecdote you’d be okay with.",
        "Discuss boundaries regarding sharing personal experiences.",
        "Create a 'no-go' list of things we both agree to keep private."
    ]
},
{
    "question": "What’s something you find incredibly sexy about me?",
    "challenges": [
        "Share it while giving me a playful compliment.",
        "Act out a moment that exemplifies that trait.",
        "Describe a scenario where you felt that trait was showcased."
    ]
},
{
    "question": "How do you feel about taking risks in our relationship?",
    "challenges": [
        "Share a time when taking a risk brought us closer.",
        "Role-play a situation where taking a risk pays off.",
        "Create a list of 'relationship risks' we could consider."
    ]
},
{
    "question": "What’s your favorite type of foreplay?",
    "challenges": [
        "Demonstrate your answer with a fun example.",
        "Create a playful 'foreplay menu' we can explore together.",
        "Discuss a memory of a time we enjoyed this together."
    ]
},
{
    "question": "How do you like to express your affection outside of intimacy?",
    "challenges": [
        "List three ways and demonstrate one.",
        "Share a memory of a time it made a difference.",
        "Discuss how these expressions contribute to our connection."
    ]
},
{
    "question": "What’s one intimate skill you’d like to learn together?",
    "challenges": [
        "Create a plan for how we’d learn it together.",
        "Role-play a lesson on that skill.",
        "Share a fun fact about that skill."
    ]
},

{
    "question": "What’s your idea of an ideal intimate evening?",
    "challenges": [
        "Share it while creating a vision board together.",
        "Act out the first few moments of that evening.",
        "Discuss which elements are most important to you."
    ]
},
{
    "question": "What’s something you’ve done to enhance our intimate life?",
    "challenges": [
        "Share it while maintaining eye contact.",
        "Role-play how that made you feel.",
        "Discuss how it can be improved or continued."
    ]
},
{
    "question": "How do you feel about cuddling and its role in our relationship?",
    "challenges": [
        "Share a cuddling position you find most comfortable.",
        "Demonstrate your ideal cuddle with me.",
        "Discuss a memory where cuddling deepened our bond."
    ]
},
{
    "question": "What’s your favorite way to initiate intimacy?",
    "challenges": [
        "Act it out as a playful demonstration.",
        "Describe a time when it worked particularly well.",
        "Create a list of 'intimacy initiators' together."
    ]
},
{
    "question": "How do you feel about taking time to reconnect after being busy?",
    "challenges": [
        "Share a moment where we successfully reconnected.",
        "Discuss how we can enhance our reconnection process.",
        "Role-play a scenario where we prioritize reconnecting."
    ]
},
{
    "question": "What’s your favorite part about our relationship dynamics?",
    "challenges": [
        "Describe it while giving me a playful touch.",
        "Act out a moment that exemplifies that dynamic.",
        "Discuss how it positively influences our intimacy."
    ]
},
{
    "question": "What’s something that makes you feel most desired?",
    "challenges": [
        "Share a moment when you felt especially desired.",
        "Act out how you would like to feel desired.",
        "Discuss how we can enhance that feeling in our relationship."
    ]
},
{
    "question": "What are your most significant childhood memories, and how do they shape who you are today?",
    "challenges": [
        "Share a specific memory while I listen without interrupting.",
        "Draw a picture that represents that memory.",
        "Discuss how this memory influences your current behavior."
    ]
},
{
    "question": "What are your greatest fears regarding our relationship, and how can we address them?",
    "challenges": [
        "Share your fear while I hold your hand.",
        "Write down your fear and put it in a 'fear jar' to address later.",
        "Discuss how we've faced fears together in the past."
    ]
},
{
    "question": "How do you define success in your life, both personally and professionally?",
    "challenges": [
        "Share your definition while I take notes on your thoughts.",
        "Create a vision board together that represents your goals.",
        "Discuss a time when you felt successful and why."
    ]
},
{
    "question": "What role does forgiveness play in your life, and how can we cultivate it in our relationship?",
    "challenges": [
        "Share a time you struggled with forgiveness.",
        "Write a letter of forgiveness, whether you send it or not.",
        "Discuss what forgiveness looks like in action for us."
    ]
},
{
    "question": "How do you handle failure, and what can we learn from it together?",
    "challenges": [
        "Share a personal failure and what you learned from it.",
        "Role-play how we would support each other during failure.",
        "Create a 'failure plan' for how to approach tough times together."
    ]
},
{
    "question": "What are your non-negotiable values, and how do they guide your decisions?",
    "challenges": [
        "Write down your top three values and share them.",
        "Discuss how these values impact our relationship.",
        "Role-play a situation where you stand by your values."
    ]
},
{
    "question": "What does emotional intimacy mean to you, and how can we strengthen it?",
    "challenges": [
        "Share a personal story that illustrates emotional intimacy.",
        "Create a list of activities that enhance our emotional connection.",
        "Role-play a scenario where emotional intimacy is tested."
    ]
},
{
    "question": "What past experiences have shaped your perspective on love and relationships?",
    "challenges": [
        "Share a pivotal experience that influenced your views.",
        "Draw a timeline of significant relationships and their impact on you.",
        "Discuss how these experiences affect our relationship."
    ]
},
{
    "question": "How do you cope with stress, and how can I support you during tough times?",
    "challenges": [
        "Share your go-to coping mechanisms while I take notes.",
        "Role-play a scenario where you need support and I respond.",
        "Create a 'stress relief plan' that we can use together."
    ]
},
{
    "question": "What does vulnerability mean to you, and how comfortable are you with being vulnerable?",
    "challenges": [
        "Share a time when you felt vulnerable and how it impacted you.",
        "Write a short poem about vulnerability together.",
        "Discuss ways we can create a safe space for vulnerability."
    ]
},
{
    "question": "What do you believe is the biggest challenge facing our relationship right now?",
    "challenges": [
        "Share your thoughts while I listen without interrupting.",
        "Write down potential solutions and discuss them.",
        "Role-play how we would handle this challenge together."
    ]
},
{
    "question": "How do you envision our future together, and what steps can we take to get there?",
    "challenges": [
        "Share your vision in detail, painting a picture with words.",
        "Create a 'relationship roadmap' outlining our goals.",
        "Discuss what steps we can take this week to work towards that future."
    ]
},
{
    "question": "What does unconditional love look like to you, and how can we practice it?",
    "challenges": [
        "Share examples of unconditional love from your life.",
        "Role-play scenarios where we show unconditional love.",
        "Discuss how we can better demonstrate this in our relationship."
    ]
},
{
    "question": "How do you feel about our communication style, and what can we improve?",
    "challenges": [
        "Share a communication pet peeve while I listen.",
        "Role-play a conversation to practice better communication.",
        "Create a list of communication techniques we can try."
    ]
},
{
    "question": "What are the biggest sacrifices you've made for love, and were they worth it?",
    "challenges": [
        "Share a sacrifice and how it impacted you.",
        "Discuss the lessons learned from that sacrifice.",
        "Role-play a situation where we support each other's sacrifices."
    ]
},
{
    "question": "What are your thoughts on commitment, and how do you define it?",
    "challenges": [
        "Share your definition of commitment while I listen.",
        "Discuss how commitment has evolved for you over time.",
        "Create a commitment 'contract' outlining our promises to each other."
    ]
},
{
    "question": "How do you feel about change, both personally and in our relationship?",
    "challenges": [
        "Share a recent change you faced and how you handled it.",
        "Discuss how we can support each other through changes.",
        "Role-play a scenario where we embrace change together."
    ]
},
{
    "question": "What does personal growth look like for you, and how can I support your journey?",
    "challenges": [
        "Share a personal growth goal you’re currently working on.",
        "Discuss how we can hold each other accountable.",
        "Create a 'growth plan' with specific steps to take together."
    ]
},
{
    "question": "What are your thoughts on sharing responsibilities in our relationship?",
    "challenges": [
        "Share your perspective on what responsibilities mean to you.",
        "Discuss how we can better share responsibilities.",
        "Role-play a situation where we delegate tasks effectively."
    ]
},
{
    "question": "How do you envision handling conflicts or disagreements in the future?",
    "challenges": [
        "Share your ideal conflict resolution strategy.",
        "Role-play a disagreement and how we’d resolve it together.",
        "Create a 'conflict resolution plan' we can refer to."
    ]
},
{
    "question": "What have you learned about yourself through our relationship?",
    "challenges": [
        "Share an insight while I listen without interrupting.",
        "Discuss how this insight has changed your behavior.",
        "Write down three things you've learned and share them."
    ]
},
{
    "question": "How do you want to celebrate our milestones and achievements together?",
    "challenges": [
        "Share your ideas while I take notes.",
        "Create a list of future milestones we want to celebrate.",
        "Role-play a celebration scenario for a significant milestone."
    ]
},
{
    "question": "What does it mean to you to feel secure in a relationship?",
    "challenges": [
        "Share what security looks like for you while I listen.",
        "Discuss how we can create a more secure environment.",
        "Write a short letter to your future self about feeling secure."
    ]
},
{
    "question": "What legacy do you want to leave in our relationship?",
    "challenges": [
        "Share your thoughts while I listen attentively.",
        "Create a 'relationship legacy' vision board together.",
        "Discuss how we can work towards that legacy now."
    ]
},   {
    "question": "What are your biggest dreams, and how can we support each other in achieving them?",
    "challenges": [
        "Share a dream that you've never revealed before.",
        "Create a joint vision board for our future together.",
        "Discuss what support looks like for each of us."
    ]
},
{
    "question": "How do you define trust, and what can we do to build it in our relationship?",
    "challenges": [
        "Share a moment when trust was tested in your life.",
        "Write down three ways we can enhance trust together.",
        "Discuss how we can rebuild trust if it’s ever broken."
    ]
},
{
    "question": "What are your thoughts on the role of humor in a relationship?",
    "challenges": [
        "Share a funny story that highlights humor's importance.",
        "Create a list of our favorite inside jokes.",
        "Role-play how humor can diffuse tension during a disagreement."
    ]
},
{
    "question": "How do you feel about emotional transparency, and how can we foster it?",
    "challenges": [
        "Share a feeling you often keep to yourself.",
        "Write down feelings you want to express more openly.",
        "Discuss ways to check in with each other emotionally."
    ]
},
{
    "question": "What does a healthy work-life balance look like for you, and how can we support each other in achieving it?",
    "challenges": [
        "Share a time when work-life balance was hard for you.",
        "Create a schedule that allows for both personal and shared time.",
        "Discuss how we can communicate our needs regarding time."
    ]
},
{
    "question": "What are your thoughts on conflict resolution, and how do you prefer to handle disagreements?",
    "challenges": [
        "Share a past conflict and how it was resolved.",
        "Role-play how we would approach a disagreement together.",
        "Create a 'conflict resolution plan' for us to follow."
    ]
},
{
    "question": "What role do you think gratitude plays in a relationship?",
    "challenges": [
        "Share something you’re grateful for about me.",
        "Write a short note of gratitude to each other.",
        "Discuss ways to regularly express gratitude."
    ]
},
{
    "question": "How do you approach change, both in life and relationships?",
    "challenges": [
        "Share a change that was particularly challenging for you.",
        "Discuss how we can adapt together during changes.",
        "Role-play a situation where change might affect us."
    ]
},
{
    "question": "What are your thoughts on personal growth within a relationship?",
    "challenges": [
        "Share a personal growth experience that impacted you.",
        "Write down individual goals for personal growth.",
        "Discuss how we can support each other’s growth journeys."
    ]
},
{
    "question": "How do you handle feelings of inadequacy, and how can I help you with this?",
    "challenges": [
        "Share a time you felt inadequate and how you coped.",
        "Discuss what support looks like when these feelings arise.",
        "Role-play how we would help each other through this."
    ]
},
{
    "question": "What are your thoughts on maintaining friendships outside of our relationship?",
    "challenges": [
        "Share a friendship that means a lot to you and why.",
        "Discuss how we can encourage each other’s friendships.",
        "Create a plan for double dates or group hangouts."
    ]
},
{
    "question": "How do you define intimacy beyond the physical aspect?",
    "challenges": [
        "Share an experience that deepened your emotional intimacy.",
        "Discuss activities that promote non-physical intimacy.",
        "Role-play a scenario where we connect emotionally."
    ]
},
{
    "question": "What do you think is the most important factor in sustaining love over time?",
    "challenges": [
        "Share a story of a couple you admire and why.",
        "Discuss what we can do to ensure our love grows.",
        "Create a list of practices we want to implement."
    ]
},
{
    "question": "What impact do you believe our families have on our relationship?",
    "challenges": [
        "Share a family value that you want to carry into our life.",
        "Discuss how we can balance family and our relationship.",
        "Role-play a family gathering scenario together."
    ]
},
{
    "question": "What are your thoughts on loyalty, and how can we demonstrate it to each other?",
    "challenges": [
        "Share a moment when you felt incredibly loyal to someone.",
        "Discuss how we can show loyalty in our daily lives.",
        "Create a loyalty pact outlining what it means for us."
    ]
},
{
    "question": "How do you feel about setting long-term relationship goals?",
    "challenges": [
        "Share a long-term goal you have for us as a couple.",
        "Write down five goals for our future together.",
        "Discuss a timeline for achieving these goals."
    ]
},
{
    "question": "What’s your perspective on vulnerability and its role in our relationship?",
    "challenges": [
        "Share a vulnerable moment from your life.",
        "Discuss how we can create a safe space for vulnerability.",
        "Role-play a situation where vulnerability is needed."
    ]
},
{
    "question": "How do you perceive love languages, and which one resonates with you the most?",
    "challenges": [
        "Share an example of how you like to express your love.",
        "Discuss how we can learn each other’s love languages.",
        "Create a list of love language actions for each other."
    ]
},
{
    "question": "What’s your view on sacrifice in relationships?",
    "challenges": [
        "Share a time when you made a sacrifice for someone you love.",
        "Discuss what sacrifices we are willing to make for each other.",
        "Role-play a scenario where we might need to sacrifice."
    ]
},
{
    "question": "How do you deal with external pressures that affect our relationship?",
    "challenges": [
        "Share a time when external pressures impacted you.",
        "Discuss strategies for managing these pressures together.",
        "Role-play a scenario involving external pressure."
    ]
},
{
    "question": "What do you believe is the key to keeping the passion alive over time?",
    "challenges": [
        "Share an example of a passionate moment we've had.",
        "Discuss ways to reignite passion in our relationship.",
        "Create a list of 'date night' ideas to keep things fresh."
    ]
},
{
    "question": "What fantasies or desires have you always wanted to explore together?",
    "challenges": [
        "Share a fantasy you’ve never told anyone.",
        "Write a steamy scene together based on your fantasies.",
        "Role-play a scenario from your fantasy."
    ]
},
{
    "question": "How do you feel about incorporating sensuality into our daily lives?",
    "challenges": [
        "Share a small, intimate gesture you love.",
        "Create a list of everyday moments where we can be more sensual.",
        "Act out a sensual routine together, like a slow dance."
    ]
},
{
    "question": "What does intimacy mean to you beyond physical attraction?",
    "challenges": [
        "Share a memory when you felt deeply connected to someone.",
        "Discuss what builds emotional intimacy for you.",
        "Role-play a scenario that enhances emotional closeness."
    ]
},
{
    "question": "How can we make our intimate moments more passionate?",
    "challenges": [
        "Share a passionate moment from a past relationship.",
        "Create a list of activities that ignite passion for us.",
        "Demonstrate a passionate kiss or embrace."
    ]
},
{
    "question": "What do you find most attractive about each other—physically and emotionally?",
    "challenges": [
        "Share something you’ve noticed that turns you on about me.",
        "Discuss ways we can enhance our attractiveness to each other.",
        "Compliment each other in a way that feels intimate."
    ]
},
{
    "question": "How do you feel about exploring new experiences in the bedroom?",
    "challenges": [
        "Share a new experience you’ve always wanted to try.",
        "Create a list of ‘adventurous’ things we could explore together.",
        "Discuss our boundaries while being adventurous."
    ]
},
{
    "question": "What role does touch play in your life and relationships?",
    "challenges": [
        "Share a type of touch that always makes you feel good.",
        "Demonstrate a sensual touch that feels comforting.",
        "Discuss the importance of non-sexual touch in our relationship."
    ]
},
{
    "question": "What are your thoughts on spicing things up in our relationship?",
    "challenges": [
        "Share a time when you felt a spark was missing and how to reignite it.",
        "Create a ‘spice jar’ of ideas to try together.",
        "Discuss how we can regularly keep things exciting."
    ]
},
{
    "question": "How do you envision our sexual connection evolving over time?",
    "challenges": [
        "Share your hopes for our sexual relationship in the future.",
        "Discuss how we can prioritize our intimate connection.",
        "Role-play how we can communicate our desires better."
    ]
},
{
    "question": "What’s one thing you’ve learned about yourself in intimate situations?",
    "challenges": [
        "Share a surprising realization you’ve had about your desires.",
        "Discuss how we can help each other explore and grow.",
        "Demonstrate how to communicate needs and wants effectively."
    ]
},
{
    "question": "How important is exploration and adventure in our intimacy?",
    "challenges": [
        "Share an adventurous or spontaneous experience that excited you.",
        "Create a list of ‘intimate adventures’ we could embark on together.",
        "Discuss how to incorporate spontaneity into our intimate life."
    ]
},
{
    "question": "How do you feel about the idea of intimacy as a form of communication?",
    "challenges": [
        "Share how intimacy has helped you communicate in the past.",
        "Discuss how we can use intimacy to express emotions better.",
        "Demonstrate a silent, intimate communication through touch."
    ]
},
{
    "question": "What role does vulnerability play in our intimate life?",
    "challenges": [
        "Share a vulnerable moment you experienced with someone.",
        "Discuss how we can create a safe space for vulnerability.",
        "Demonstrate a moment of vulnerability together."
    ]
},
{
    "question": "What do you consider to be the most romantic thing about us?",
    "challenges": [
        "Share a romantic moment from our relationship that stands out.",
        "Discuss how we can enhance the romance in our daily lives.",
        "Recreate a romantic gesture we’ve shared."
    ]
},
{
    "question": "How do you feel about using imagination in our intimate life?",
    "challenges": [
        "Share an imaginative scenario you’d like to explore together.",
        "Discuss how imagination enhances our connection.",
        "Role-play a scenario from your imagination."
    ]
},
{
    "question": "What would you consider an ideal date night to foster intimacy?",
    "challenges": [
        "Share your dream date night experience.",
        "Plan a ‘date night’ we can look forward to.",
        "Role-play how we would initiate a romantic evening."
    ]
},
{
    "question": "What’s your idea of a perfect morning together?",
    "challenges": [
        "Share a memory of a perfect morning with someone.",
        "Discuss how we can create a perfect morning routine.",
        "Demonstrate how we’d start a perfect morning together."
    ]
},
{
    "question": "How do you feel about the balance of power in our relationship?",
    "challenges": [
        "Share a moment when you felt powerful or vulnerable.",
        "Discuss how we can empower each other in our relationship.",
        "Demonstrate a scenario where we support each other’s power."
    ]
},
{
    "question": "What do you think is the key to a satisfying sexual connection?",
    "challenges": [
        "Share a personal insight about satisfaction and intimacy.",
        "Discuss how we can communicate our needs for satisfaction.",
        "Role-play how we would create a satisfying experience together."
    ]
},
{
    "question": "How do you feel about the balance between emotional and physical intimacy?",
    "challenges": [
        "Share how one aspect enhances the other in your experience.",
        "Discuss how we can ensure both forms of intimacy are nurtured.",
        "Demonstrate a physical connection that emphasizes emotional closeness."
    ]
}, {
    "question": "How do you feel about incorporating role-play into our intimate life?",
    "challenges": [
        "Share a character you’d love to play in a role-play scenario.",
        "Discuss boundaries and comfort levels around role-playing.",
        "Act out a brief role-play scene together."
    ]
},
{
    "question": "What are your thoughts on exploring different settings for intimacy?",
    "challenges": [
        "Share a non-traditional place where you'd like to be intimate.",
        "Discuss how changing environments might enhance our experience.",
        "Plan a spontaneous intimate date in an unexpected location."
    ]
},
{
    "question": "How do you define emotional intimacy, and how important is it to you?",
    "challenges": [
        "Share a time when emotional intimacy deepened your connection.",
        "Discuss how we can foster emotional intimacy in our relationship.",
        "Demonstrate a moment of emotional closeness through conversation."
    ]
},
{
    "question": "What do you think is the most underrated aspect of intimacy?",
    "challenges": [
        "Share a small gesture that enhances intimacy for you.",
        "Discuss how to incorporate more of these gestures into our lives.",
        "Demonstrate the gesture you find most intimate."
    ]
},
{
    "question": "How do you feel about experimenting with boundaries in our relationship?",
    "challenges": [
        "Share a boundary you've always been curious about exploring.",
        "Discuss what makes you feel secure when testing boundaries.",
        "Role-play a scenario where we explore new boundaries together."
    ]
},
{
    "question": "What’s your take on the balance between intimacy and independence?",
    "challenges": [
        "Share how you maintain independence while being intimate.",
        "Discuss how we can support each other’s independence.",
        "Demonstrate a way to celebrate each other’s individuality."
    ]
},
{
    "question": "How important is it to you to discuss past relationships during intimate moments?",
    "challenges": [
        "Share a lesson you learned from a past relationship that still applies.",
        "Discuss how past experiences shape our current intimacy.",
        "Role-play how to approach sensitive topics gently."
    ]
},
{
    "question": "What do you think about creating a ‘bucket list’ for our intimate life?",
    "challenges": [
        "Share one item you’d love to add to our intimacy bucket list.",
        "Discuss how we can prioritize these experiences together.",
        "Plan a date to start checking off items from the list."
    ]
},
{
    "question": "How do you feel about intimacy as a form of expression?",
    "challenges": [
        "Share a way you express yourself through intimacy.",
        "Discuss how to enhance that expression in our relationship.",
        "Demonstrate your preferred method of expressing intimacy."
    ]
},
{
    "question": "What’s one secret desire you’ve always wanted to share with a partner?",
    "challenges": [
        "Share the desire openly with me now.",
        "Discuss how this desire can be explored together.",
        "Create a plan for how we can fulfill this desire."
    ]
},
{
    "question": "How do you feel about discussing fantasies before exploring them?",
    "challenges": [
        "Share a fantasy you’ve had but haven’t acted on.",
        "Discuss how we can approach fantasy exploration together.",
        "Role-play discussing a fantasy with me openly."
    ]
},
{
    "question": "How important is physical touch in our relationship?",
    "challenges": [
        "Share a moment when physical touch made you feel deeply connected.",
        "Discuss ways to increase physical touch in our daily lives.",
        "Demonstrate a touch that feels particularly meaningful to you."
    ]
},
{
    "question": "What’s your favorite way to initiate intimacy?",
    "challenges": [
        "Share a memorable initiation you’ve experienced in the past.",
        "Discuss how to communicate our desires for initiation openly.",
        "Role-play an initiation scenario that excites both of us."
    ]
},
{
    "question": "How do you feel about intimate rituals, like date nights or cuddling before bed?",
    "challenges": [
        "Share a ritual you’d like to incorporate into our routine.",
        "Discuss how these rituals strengthen our connection.",
        "Demonstrate a new ritual that we can start together."
    ]
},
{
    "question": "What do you think makes a romantic gesture truly meaningful?",
    "challenges": [
        "Share a romantic gesture that left a lasting impression on you.",
        "Discuss how we can make our gestures more meaningful.",
        "Create a romantic gesture for each other right now."
    ]
},
{
    "question": "How do you feel about being playful during intimate moments?",
    "challenges": [
        "Share a playful experience you've had that felt intimate.",
        "Discuss ways to bring more playfulness into our intimacy.",
        "Demonstrate a playful gesture that feels intimate."
    ]
},
{
    "question": "What are your thoughts on exploring different types of intimacy (emotional, physical, spiritual)?",
    "challenges": [
        "Share which type of intimacy you feel is strongest for us.",
        "Discuss how to deepen our connection in each type.",
        "Role-play a scenario that enhances one type of intimacy."
    ]
},
{
    "question": "What’s something you find irresistibly sexy about me?",
    "challenges": [
        "Share the first time you found me particularly attractive.",
        "Discuss how to enhance those traits in each other.",
        "Compliment me in a way that feels intimate and genuine."
    ]
},
{
    "question": "How do you envision our intimate life in five years?",
    "challenges": [
        "Share your hopes for our relationship in the future.",
        "Discuss how we can achieve those hopes together.",
        "Plan a special experience to celebrate our future intimacy."
    ]
},
{
    "question": "What does ‘spicing things up’ mean to you?",
    "challenges": [
        "Share a specific way you’d like to spice things up.",
        "Discuss how we can keep the excitement alive over time.",
        "Demonstrate an example of ‘spicing things up’ together."
    ]
},
{
    "question": "How do you define ‘safety’ in our intimate life?",
    "challenges": [
        "Share how safety enhances your intimacy experience.",
        "Discuss boundaries that create a sense of safety for both of us.",
        "Role-play a scenario where we communicate boundaries clearly."
    ]
}, {
    "question": "How do you feel about incorporating sensory experiences into our intimate moments?",
    "challenges": [
        "Share a sensory experience you’ve always wanted to try together.",
        "Discuss how different senses enhance our intimacy.",
        "Plan a date night focused on one specific sense."
    ]
},
{
    "question": "What role does humor play in our intimate life?",
    "challenges": [
        "Share a funny moment that brought us closer.",
        "Discuss how we can incorporate more humor into our intimacy.",
        "Act out a humorous scenario related to intimacy."
    ]
},
{
    "question": "How do you feel about vulnerability in our intimate moments?",
    "challenges": [
        "Share a moment of vulnerability that strengthened our bond.",
        "Discuss how to create a safe space for vulnerability.",
        "Role-play a scenario that encourages openness and vulnerability."
    ]
},
{
    "question": "What’s your favorite way to reconnect after a disagreement?",
    "challenges": [
        "Share a method that has worked for you in the past.",
        "Discuss how we can make reconnection more intentional.",
        "Demonstrate a technique that helps you feel reconnected."
    ]
},
{
    "question": "How important is spontaneity to you in our intimate life?",
    "challenges": [
        "Share a spontaneous moment that brought us closer.",
        "Discuss ways to inject spontaneity into our relationship.",
        "Plan a surprise date to keep the spontaneity alive."
    ]
},
{
    "question": "What’s one thing you’d like to try that you think could spice up our intimacy?",
    "challenges": [
        "Share the reason you find this intriguing.",
        "Discuss any fears or hesitations about trying it.",
        "Plan a way to incorporate it into our intimacy."
    ]
},
{
    "question": "How do you feel about physical affection outside of the bedroom?",
    "challenges": [
        "Share a moment when public affection made you feel special.",
        "Discuss how we can be more affectionate in everyday life.",
        "Demonstrate a non-verbal sign of affection right now."
    ]
},
{
    "question": "What’s your take on exploring intimacy through creativity (like art or writing)?",
    "challenges": [
        "Share a creative project you’d love to do together.",
        "Discuss how creativity can enhance our connection.",
        "Start a quick creative project that represents our relationship."
    ]
},
{
    "question": "How do you feel about talking openly about our desires and boundaries?",
    "challenges": [
        "Share a boundary that’s important for you in intimacy.",
        "Discuss how we can communicate our desires more effectively.",
        "Role-play a conversation about desires and boundaries."
    ]
},
{
    "question": "What do you think is the biggest misconception about intimacy?",
    "challenges": [
        "Share a personal belief you’ve changed regarding intimacy.",
        "Discuss how we can challenge those misconceptions together.",
        "Demonstrate a common misconception and how we can redefine it."
    ]
},
{
    "question": "How do you feel about exploring intimate connections through fantasy?",
    "challenges": [
        "Share a fantasy that excites you.",
        "Discuss how fantasies can enhance our intimacy.",
        "Role-play a fantasy scenario you’d like to explore."
    ]
},
{
    "question": "What’s your favorite type of foreplay, and why?",
    "challenges": [
        "Share a memorable foreplay moment between us.",
        "Discuss how foreplay enhances our connection.",
        "Demonstrate your favorite foreplay technique."
    ]
},
{
    "question": "How do you feel about the impact of external stress on our intimate life?",
    "challenges": [
        "Share a time when stress affected our intimacy.",
        "Discuss strategies to mitigate stress together.",
        "Role-play a stress-reduction technique that works for you."
    ]
},
{
    "question": "What’s one intimate secret you’ve always wanted to know about me?",
    "challenges": [
        "Share the secret and why it interests you.",
        "Discuss how revealing secrets can deepen intimacy.",
        "Demonstrate openness by sharing a secret of your own."
    ]
},
{
    "question": "How do you feel about cuddling and its role in our relationship?",
    "challenges": [
        "Share a time when cuddling helped you feel closer.",
        "Discuss how we can incorporate more cuddling into our routine.",
        "Cuddle right now for a few minutes and share how it feels."
    ]
},
{
    "question": "How do you feel about discussing intimate health and safety?",
    "challenges": [
        "Share a concern or question you have about intimate health.",
        "Discuss how we can ensure safety in our relationship.",
        "Plan a time to have an open discussion about our health."
    ]
},
{
    "question": "What’s your perspective on the role of music in setting the mood for intimacy?",
    "challenges": [
        "Share a song that makes you feel romantic.",
        "Discuss how we can create a playlist for intimate moments.",
        "Play a romantic song and dance together."
    ]
},
{
    "question": "What’s one thing you wish you could change about how we express intimacy?",
    "challenges": [
        "Share a change you’d like to see and why.",
        "Discuss how we can make that change happen together.",
        "Demonstrate a new way of expressing intimacy right now."
    ]
},
{
    "question": "How do you feel about the idea of exploring intimate experiences as a form of adventure?",
    "challenges": [
        "Share an adventurous intimate experience you’d like to try.",
        "Discuss how adventure can bring excitement to our intimacy.",
        "Plan an adventurous date that includes an intimate element."
    ]
},
{
    "question": "What’s your take on the balance between routine and spontaneity in intimacy?",
    "challenges": [
        "Share a routine you enjoy and why it matters.",
        "Discuss how we can keep spontaneity alive in our routine.",
        "Role-play a spontaneous intimate moment we could try."
    ]
},
{
    "question": "How do you feel about using humor to navigate intimate challenges?",
    "challenges": [
        "Share a humorous situation related to intimacy you’ve experienced.",
        "Discuss how laughter can ease tension in intimate moments.",
        "Demonstrate a funny scenario that highlights our dynamic."
    ]
},
{
    "question": "What’s one thing you wish more couples would talk about regarding intimacy?",
    "challenges": [
        "Share your thoughts on why this topic is important.",
        "Discuss how we can encourage open conversations about intimacy.",
        "Role-play a conversation starter for couples about intimacy."
    ]
}, {
    "question": "What are the biggest fears you have about our future together?",
    "challenges": [
        "Share a personal fear and how it relates to our relationship.",
        "Discuss how we can support each other in facing those fears.",
        "Write down our fears and then discuss them openly."
    ]
},
{
    "question": "How do you define true love, and do you feel we embody that definition?",
    "challenges": [
        "Share a moment when you felt true love from me.",
        "Discuss how we can further embody that definition.",
        "Write letters to each other about what true love means."
    ]
},
{
    "question": "What childhood experiences shaped your view of relationships?",
    "challenges": [
        "Share a specific memory that stands out.",
        "Discuss how those experiences influence our relationship today.",
        "Role-play a scenario that reflects those childhood experiences."
    ]
},
{
    "question": "What does emotional intimacy mean to you, and how can we cultivate it?",
    "challenges": [
        "Share a moment of emotional intimacy we've experienced.",
        "Discuss ways to deepen our emotional connection.",
        "Create a ritual that promotes emotional intimacy."
    ]
},
{
    "question": "How do you handle feelings of inadequacy in our relationship?",
    "challenges": [
        "Share a time when you felt inadequate and how you dealt with it.",
        "Discuss how we can support each other in those moments.",
        "Role-play a scenario where we reassure each other."
    ]
},
{
    "question": "What are the most important lessons you've learned from past relationships?",
    "challenges": [
        "Share a lesson that significantly changed your perspective.",
        "Discuss how we can avoid similar pitfalls together.",
        "Write down lessons learned and share them."
    ]
},
{
    "question": "How do you feel about the balance of power in our relationship?",
    "challenges": [
        "Discuss any imbalances you perceive.",
        "Share what power means to you in a relationship.",
        "Role-play a scenario where power dynamics are challenged."
    ]
},
{
    "question": "What do you think is the key to maintaining passion in a long-term relationship?",
    "challenges": [
        "Share a passion moment that made our connection stronger.",
        "Discuss ways to keep the passion alive.",
        "Plan a date focused on rekindling that passion."
    ]
},
{
    "question": "What do you think are the biggest challenges we may face together?",
    "challenges": [
        "Share a specific challenge you worry about.",
        "Discuss how we can prepare for those challenges.",
        "Role-play a scenario where we overcome a challenge together."
    ]
},
{
    "question": "How do you feel about forgiveness in our relationship?",
    "challenges": [
        "Share a time you struggled to forgive someone.",
        "Discuss how we can improve our approach to forgiveness.",
        "Role-play how we can forgive each other in a conflict."
    ]
},
{
    "question": "What are your thoughts on the impact of societal expectations on our relationship?",
    "challenges": [
        "Discuss an expectation that feels burdensome.",
        "Share how we can break free from societal norms together.",
        "Role-play a scenario where we defy societal expectations."
    ]
},
{
    "question": "How do you envision our relationship evolving over the next five years?",
    "challenges": [
        "Share your hopes and dreams for our future.",
        "Discuss how we can work together to achieve those dreams.",
        "Write a letter to our future selves and share it."
    ]
},
{
    "question": "What does trust mean to you, and how can we build it stronger?",
    "challenges": [
        "Share a moment when trust was tested in our relationship.",
        "Discuss ways to enhance trust between us.",
        "Role-play a scenario where trust is reaffirmed."
    ]
},
{
    "question": "What are the most significant sacrifices you’re willing to make for our relationship?",
    "challenges": [
        "Share a past sacrifice you made for love.",
        "Discuss what sacrifices are necessary for us to thrive.",
        "Role-play a scenario where sacrifices are tested."
    ]
},
{
    "question": "How do you feel about change, and how can we navigate it together?",
    "challenges": [
        "Share a change that significantly impacted you.",
        "Discuss how we can support each other through transitions.",
        "Role-play a scenario where we face a change together."
    ]
},
{
    "question": "What role does gratitude play in our relationship?",
    "challenges": [
        "Share something you’re grateful for in our relationship.",
        "Discuss how we can express gratitude more regularly.",
        "Create a gratitude list for each other and share it."
    ]
},
{
    "question": "How do you envision our roles within the relationship changing over time?",
    "challenges": [
        "Share a role you’d like to take on in the future.",
        "Discuss how we can support each other in those roles.",
        "Role-play a scenario where we swap roles."
    ]
},
{
    "question": "What does it mean to you to be vulnerable, and how can we encourage that?",
    "challenges": [
        "Share a vulnerable moment that made you feel closer.",
        "Discuss how we can create a safe space for vulnerability.",
        "Role-play a scenario that requires vulnerability."
    ]
},
{
    "question": "How do you think we can better align our life goals?",
    "challenges": [
        "Share a personal goal that feels important to you.",
        "Discuss how we can work towards shared goals.",
        "Create a vision board together for our future."
    ]
},
{
    "question": "What’s the biggest risk you’ve ever taken for love?",
    "challenges": [
        "Share the story behind that risk and its outcome.",
        "Discuss how risks can impact relationships positively.",
        "Role-play a situation where we take a risk together."
    ]
},
{
    "question": "How do you perceive the concept of soulmate in the context of our relationship?",
    "challenges": [
        "Share your thoughts on whether we’re soulmates.",
        "Discuss what it means to find a soulmate.",
        "Role-play a scenario where we explore what being soulmates means."
    ]
},
{
    "question": "How do you feel about the intersection of love and freedom in our relationship?",
    "challenges": [
        "Share a time when you felt free in our love.",
        "Discuss how we can ensure both love and freedom coexist.",
        "Role-play a scenario where we express our freedoms within love."
    ]
},
{
    "question": "What are your thoughts on the importance of personal growth in a relationship?",
    "challenges": [
        "Share a personal growth experience that affected us.",
        "Discuss how we can support each other’s growth.",
        "Role-play a scenario where we help each other grow."
    ]
}

        // ... more questions with their specific challenges
    ],
    'Spicy': [
        {
            "question": "What is your biggest turn-on, and how can I incorporate that into our time together?",
            "challenges": [
                "Describe a fantasy you’ve had that involves us.",
                "Share a moment when you felt particularly turned on by me.",
                "Role-play a scenario where you act out that turn-on."
            ]
        },
        {
            "question": "How do you feel about experimenting with different locations for intimacy?",
            "challenges": [
                "Share a place where you’ve always wanted to be intimate.",
                "Discuss boundaries related to trying new locations.",
                "Create a list of places you both want to explore together."
            ]
        },
        {
            "question": "What type of touch do you find most pleasurable, and how can I give you that?",
            "challenges": [
                "Demonstrate your favorite type of touch on each other.",
                "Discuss areas of your body that you enjoy being touched.",
                "Create a mini massage session based on what you both enjoy."
            ]
        },
        {
            "question": "What’s a sexual fantasy you’ve never shared with anyone?",
            "challenges": [
                "Share the fantasy and discuss what excites you about it.",
                "Role-play a scenario inspired by that fantasy.",
                "Create a plan to explore that fantasy together in a safe way."
            ]
        },
        {
            "question": "How do you feel about incorporating toys or props into our intimacy?",
            "challenges": [
                "Share a type of toy you’re curious about trying.",
                "Discuss boundaries and comfort levels with props.",
                "Choose one toy or prop you both feel excited to explore."
            ]
        },
        {
            "question": "What is something you’ve always wanted to try in bed but haven’t yet?",
            "challenges": [
                "Discuss what has held you back from trying it.",
                "Role-play a scenario where you act it out together.",
                "Create a plan for how to incorporate it into your intimacy."
            ]
        },
        {
            "question": "How do you feel about dirty talk, and what words or phrases excite you?",
            "challenges": [
                "Practice using some phrases with each other.",
                "Discuss any boundaries related to dirty talk.",
                "Create a list of words or phrases that turn you on."
            ]
        },
        {
            "question": "What’s your ideal scenario for a romantic night in together?",
            "challenges": [
                "Share specific details about the setting, mood, and activities.",
                "Discuss how to make that scenario a reality.",
                "Plan a date night that incorporates elements of that scenario."
            ]
        },
        {
            "question": "How do you feel about role-playing in our intimate life?",
            "challenges": [
                "Discuss characters or scenarios you find intriguing.",
                "Role-play a short scene together.",
                "Create a plan for how to incorporate role-play into intimacy."
            ]
        },
        {
            "question": "What boundaries are important for you to feel safe and comfortable in our intimacy?",
            "challenges": [
                "Discuss how we can respect each other's boundaries.",
                "Share a past experience where boundaries were not respected.",
                "Create a list of boundaries that you both agree on."
            ]
        },
        {
            "question": "What are your thoughts on spontaneity in our intimate moments?",
            "challenges": [
                "Share a time when spontaneity led to a memorable experience.",
                "Discuss how to incorporate more spontaneity into your intimacy.",
                "Plan a spontaneous date or activity that could lead to intimacy."
            ]
        },
        {
            "question": "What’s your favorite way to initiate intimacy with me?",
            "challenges": [
                "Demonstrate your preferred way to initiate intimacy.",
                "Discuss any changes you’d like to see in how you initiate.",
                "Create a game where you take turns initiating intimacy."
            ]
        },
        {
            "question": "How do you feel about incorporating sensual massages into our intimacy?",
            "challenges": [
                "Give each other a sensual massage based on preferences.",
                "Discuss what feels best during a massage.",
                "Plan a night dedicated to relaxation and massage."
            ]
        },
        {
            "question": "What’s one thing you want to explore together that would deepen our connection?",
            "challenges": [
                "Discuss how it could enhance your intimacy.",
                "Create a plan to explore that together.",
                "Role-play a scenario that incorporates this exploration."
            ]
        },
        {
            "question": "How do you feel about public displays of affection, and what’s your comfort level?",
            "challenges": [
                "Share a time you felt excited by PDA.",
                "Discuss boundaries for public displays of affection.",
                "Practice a light PDA while out together."
            ]
        },
        {
            "question": "What’s your view on sharing fantasies or intimate desires with each other?",
            "challenges": [
                "Share a fantasy you’ve been hesitant to discuss.",
                "Role-play a scenario inspired by that fantasy.",
                "Create a safe space for ongoing discussions about desires."
            ]
        },
        {
            "question": "What are some sensual activities outside of intercourse that you enjoy?",
            "challenges": [
                "Discuss how to incorporate more of those activities.",
                "Try one of those activities together.",
                "Create a plan for a non-sexual intimate date night."
            ]
        },
        {
            "question": "How do you feel about exploring kinks or BDSM together?",
            "challenges": [
                "Share any kinks or interests you’re curious about.",
                "Discuss boundaries and safe words for exploration.",
                "Role-play a scenario that incorporates elements of BDSM."
            ]
        },
        {
            "question": "What does intimacy mean to you beyond physical connection?",
            "challenges": [
                "Share a moment that deepened your emotional intimacy.",
                "Discuss how to enhance that emotional connection.",
                "Create a plan for activities that foster emotional intimacy."
            ]
        },
        {
            "question": "What’s your favorite way to show affection outside of the bedroom?",
            "challenges": [
                "Share specific examples of when you felt loved.",
                "Discuss how to enhance those expressions of affection.",
                "Create a list of daily actions to show affection."
            ]
        },
        {
            "question": "What’s one thing you wish I knew about your sexual desires?",
            "challenges": [
                "Share that desire and discuss its importance.",
                "Role-play a scenario that incorporates that desire.",
                "Create a plan to explore that desire together."
            ]
        },
        {
            "question": "How do you feel about setting sexual goals together?",
            "challenges": [
                "Share a goal you’d like us to work on.",
                "Discuss how to support each other in reaching that goal.",
                "Create a timeline for those sexual goals."
            ]
        },{
            "question": "What is a secret desire you've had that you think could spice up our intimacy?",
            "challenges": [
                "Share the desire and discuss how it makes you feel.",
                "Write down your secret desire on a piece of paper and read it aloud.",
                "Create a fantasy scenario together that incorporates this desire."
            ]
        },
        {
            "question": "How do you feel about blindfolds or other sensory deprivation techniques during intimacy?",
            "challenges": [
                "Discuss what sensations you’d like to focus on.",
                "Experiment with a short period of blindfolding each other.",
                "Create a sensory exploration experience using different textures and sounds."
            ]
        },
        {
            "question": "What’s one intimate experience you’ve had that left a lasting impression on you?",
            "challenges": [
                "Share the details and discuss what made it special.",
                "Role-play a part of that experience together.",
                "Identify what elements of that experience you’d like to recreate."
            ]
        },
        {
            "question": "How do you feel about the idea of erotic literature or films in enhancing our intimacy?",
            "challenges": [
                "Share a scene from a book or movie that excites you.",
                "Choose a piece of erotic literature to read together.",
                "Discuss what elements you would want to incorporate from that literature into your intimacy."
            ]
        },
        {
            "question": "What are your thoughts on power dynamics or dominance and submission in the bedroom?",
            "challenges": [
                "Discuss your comfort levels with power dynamics.",
                "Explore a scenario where you switch roles and see how it feels.",
                "Create a safe word or signal to ensure comfort during exploration."
            ]
        },
        {
            "question": "What are some intimate things you find romantic or sexy that we haven’t explored yet?",
            "challenges": [
                "Share a specific example and discuss why it excites you.",
                "Create a 'bucket list' of intimate experiences you want to try.",
                "Plan a date night that incorporates one of these experiences."
            ]
        },
        {
            "question": "How do you feel about incorporating music into our intimate moments?",
            "challenges": [
                "Share a song that turns you on and discuss why.",
                "Create a playlist of songs that would enhance your intimacy.",
                "Experiment with playing music during an intimate moment and notice how it affects the mood."
            ]
        },
        {
            "question": "What’s a fantasy scenario involving role reversal that you’d like to try?",
            "challenges": [
                "Discuss the dynamics of that role reversal and what excites you.",
                "Act out a short scene where you switch roles.",
                "Create a plan for a full evening of exploring this role reversal."
            ]
        },
        {
            "question": "What are your thoughts on sensual or erotic massages as a form of foreplay?",
            "challenges": [
                "Give each other a sensual massage focusing on areas that excite you.",
                "Discuss techniques that work best for you during massages.",
                "Create a massage routine you can follow together."
            ]
        },
        {
            "question": "How do you feel about creating a safe word or phrase for our intimate moments?",
            "challenges": [
                "Discuss what makes you feel safe and comfortable.",
                "Choose a fun or silly safe word that you both agree on.",
                "Role-play a scenario where you use the safe word to see how it feels."
            ]
        },
        {
            "question": "What’s something you’d like to learn about each other’s bodies that we haven’t explored yet?",
            "challenges": [
                "Discuss specific areas or sensations you want to explore.",
                "Take turns giving each other a guided exploration of your bodies.",
                "Create a 'body map' where you mark sensitive areas or points of interest."
            ]
        },
        {
            "question": "How do you feel about spontaneous intimacy versus planned intimacy?",
            "challenges": [
                "Share a time when spontaneity led to an exciting experience.",
                "Plan a spontaneous date that could lead to intimacy.",
                "Discuss how to blend spontaneity with planned moments for intimacy."
            ]
        },
        {
            "question": "What’s your favorite type of foreplay, and how can I make it even better?",
            "challenges": [
                "Share specific techniques or actions that excite you.",
                "Demonstrate your favorite type of foreplay on each other.",
                "Create a 'foreplay menu' of things you both enjoy."
            ]
        },
        {
            "question": "How do you feel about nudity and being comfortable in your own skin around each other?",
            "challenges": [
                "Discuss any insecurities you may have about nudity.",
                "Try a 'clothing optional' evening to explore comfort levels.",
                "Share compliments about each other's bodies to boost confidence."
            ]
        },
        {
            "question": "What’s something you’ve always wanted to say during intimacy but haven’t yet?",
            "challenges": [
                "Share the words or phrases you’d like to say.",
                "Role-play a scenario where you say those things aloud.",
                "Discuss what holds you back from expressing those desires."
            ]
        },
        {
            "question": "How do you feel about integrating food or drink into our intimate moments?",
            "challenges": [
                "Share a food or drink that you find sexy and discuss why.",
                "Plan a 'food and intimacy' night where you explore this idea.",
                "Experiment with tasting different flavors on each other."
            ]
        },
        {
            "question": "What’s a kink or fetish you’re curious about exploring together?",
            "challenges": [
                "Discuss what excites you about that kink or fetish.",
                "Role-play a scenario that incorporates it and see how it feels.",
                "Create a plan to gradually explore this kink together."
            ]
        },
        {
            "question": "How do you feel about public displays of affection and where to draw the line?",
            "challenges": [
                "Discuss boundaries regarding public displays of affection.",
                "Share a memorable moment of PDA you’ve enjoyed.",
                "Plan a date where you intentionally practice some light PDA."
            ]
        },
        {
            "question": "What’s something you want to feel more during intimacy that you may not be experiencing now?",
            "challenges": [
                "Share specific feelings or sensations you want to enhance.",
                "Discuss how to create a more intimate atmosphere together.",
                "Experiment with new techniques to elicit those feelings."
            ]
        },
        {
            "question": "How do you envision our sexual relationship evolving over time?",
            "challenges": [
                "Discuss what you both hope for in the future.",
                "Create a vision board of your intimate future together.",
                "Set goals for what you want to explore in your intimacy."
            ]
        },
        {
            "question": "What role does humor play in our intimate life, and how can we use it to enhance connection?",
            "challenges": [
                "Share a funny or awkward intimate moment and how it affected you.",
                "Try incorporating humor into a romantic evening and see how it feels.",
                "Discuss how laughter can ease tension and improve intimacy."
            ]
        }, {
            "question": "What’s a sexual fantasy you’ve had that you’ve never shared before?",
            "challenges": [
                "Describe the fantasy in detail and discuss what excites you about it.",
                "Write it down and share it with each other without judgment.",
                "Role-play a scenario that resembles the fantasy."
            ]
        },
        {
            "question": "What boundaries are most important to you in our intimate life?",
            "challenges": [
                "Share a boundary you wish to explore further.",
                "Discuss how to communicate boundaries effectively during intimacy.",
                "Create a 'boundaries contract' that you both agree to."
            ]
        },
        
        {
            "question": "What’s a moment of intimacy that made you feel completely vulnerable?",
            "challenges": [
                "Share the moment and what it meant to you.",
                "Discuss how vulnerability can enhance intimacy.",
                "Create a safe space to practice vulnerability with each other."
            ]
        },
        {
            "question": "What are your thoughts on aftercare following intimacy?",
            "challenges": [
                "Discuss your personal needs for aftercare.",
                "Share ways you can support each other post-intimacy.",
                "Create a post-intimacy ritual that you both enjoy."
            ]
        },
        {
            "question": "How do you feel about exploring each other’s fantasies in a physical sense?",
            "challenges": [
                "Share a specific fantasy and how you envision exploring it.",
                "Act out a portion of the fantasy and see how it feels.",
                "Discuss what you learned about each other from this exploration."
            ]
        },
        {
            "question": "What’s something you wish you could change about our intimate life?",
            "challenges": [
                "Express your wish honestly and discuss why it matters.",
                "Identify a specific change you both agree on trying.",
                "Create an action plan to implement the change together."
            ]
        },
        {
            "question": "How do you define passion, and how do you want to cultivate it in our relationship?",
            "challenges": [
                "Share specific actions that make you feel passionate.",
                "Create a list of passionate activities to try together.",
                "Plan a romantic evening based on your definitions of passion."
            ]
        },
        {
            "question": "What are your thoughts on the role of communication in our intimate life?",
            "challenges": [
                "Discuss a time when communication improved your intimacy.",
                "Role-play a scenario where you practice open communication.",
                "Create a 'communication code' for when you’re intimate."
            ]
        },
        {
            "question": "How do you feel about the idea of intimacy evolving over time?",
            "challenges": [
                "Discuss how your intimate needs have changed in the past.",
                "Share what you hope to explore as your relationship grows.",
                "Create a vision board for your future intimate experiences."
            ]
        },
        {
            "question": "What’s the most intense emotional reaction you’ve had during intimacy?",
            "challenges": [
                "Share the experience and what triggered the reaction.",
                "Discuss how those emotions can enhance intimacy.",
                "Explore a scenario that might evoke similar emotions."
            ]
        },
        {
            "question": "What’s a taboo subject in intimacy that you want to explore together?",
            "challenges": [
                "Share why it feels taboo and what interests you about it.",
                "Research the topic together and discuss your findings.",
                "Create a safe environment to explore this subject without judgment."
            ]
        },
        {
            "question": "How do you feel about expressing your desires verbally during intimacy?",
            "challenges": [
                "Practice sharing a desire verbally while being intimate.",
                "Role-play a scenario where you encourage each other to express desires.",
                "Create a list of phrases you’d like to use during intimacy."
            ]
        },
        {
            "question": "What does sexual empowerment mean to you in our relationship?",
            "challenges": [
                "Discuss how you can empower each other sexually.",
                "Share a moment where you felt empowered during intimacy.",
                "Create an empowerment ritual to practice together."
            ]
        },
        {
            "question": "How do you want to incorporate spontaneity into our intimate life?",
            "challenges": [
                "Share a spontaneous moment that turned out well.",
                "Plan a surprise intimate experience for each other.",
                "Create a spontaneous intimacy checklist to guide future experiences."
            ]
        },
        {
            "question": "What’s a risk you’re willing to take to deepen our intimacy?",
            "challenges": [
                "Discuss why taking this risk excites you.",
                "Share a time when you took a risk and how it turned out.",
                "Create a plan to take the risk together."
            ]
        },
        {
            "question": "How do you feel about exploring our limits together?",
            "challenges": [
                "Share a limit you’re curious about pushing.",
                "Role-play a scenario where you safely explore that limit.",
                "Discuss how to support each other if boundaries are tested."
            ]
        },
        {
            "question": "What’s an intimate goal you’d like to achieve together?",
            "challenges": [
                "Discuss why this goal is important to you.",
                "Create a step-by-step plan to reach the goal.",
                "Set a date to check in on your progress together."
            ]
        },
        {
            "question": "How do you feel about the connection between emotional intimacy and physical intimacy?",
            "challenges": [
                "Discuss a time when emotional intimacy enhanced physical intimacy.",
                "Create a plan to enhance emotional intimacy in your relationship.",
                "Experiment with an emotional intimacy exercise together."
            ]
        },
        {
            "question": "What’s your biggest turn-on, and how can I incorporate it into our intimacy?",
            "challenges": [
                "Share the turn-on in detail and discuss why it excites you.",
                "Plan a date that revolves around this turn-on.",
                "Create a list of turn-ons you both want to explore."
            ]
        },
        {
            "question": "How do you feel about being more experimental in the bedroom?",
            "challenges": [
                "Share an idea for an experiment you’re curious about.",
                "Discuss the potential benefits and challenges of being experimental.",
                "Choose one experiment to try in the near future."
            ]
        },
        {
            "question": "What’s your ideal intimate setting, and how can we recreate it?",
            "challenges": [
                "Describe the setting in detail and what makes it special.",
                "Plan an evening to recreate that setting together.",
                "Discuss how different settings affect your intimate experiences."
            ]
        },{
            "question": "What’s a specific scenario you’ve fantasized about involving us?",
            "challenges": [
                "Describe it in vivid detail.",
                "Share what about it turns you on the most.",
                "Role-play a part of the fantasy."
            ]
        },
        {
            "question": "How do you feel about public displays of affection or intimacy?",
            "challenges": [
                "Describe a public place where you’d like to be intimate.",
                "Share a story of a time you felt excited by public intimacy.",
                "Plan a playful outing with the intention of being discreetly intimate."
            ]
        },
        {
            "question": "What part of your body do you feel the most confident about, and how do you want me to appreciate it?",
            "challenges": [
                "Show me how you want me to touch or kiss that area.",
                "Describe how it feels when someone admires that part of you.",
                "Share a specific moment when someone made you feel sexy about it."
            ]
        },
        {
            "question": "What’s a specific type of foreplay you’ve always wanted to try?",
            "challenges": [
                "Describe how it would feel to engage in that foreplay.",
                "Show me what you want me to do to you.",
                "Share how it would change the way we connect."
            ]
        },
        {
            "question": "How do you feel about dirty talk, and what words or phrases do you enjoy?",
            "challenges": [
                "Try incorporating dirty talk into our conversation.",
                "Share a phrase you’d like to hear me say.",
                "Practice saying a phrase to each other."
            ]
        },
        {
            "question": "What’s your biggest turn-on that you’ve never acted on?",
            "challenges": [
                "Describe the situation and what excites you about it.",
                "Discuss how we can make it happen together.",
                "Role-play a scenario related to it."
            ]
        },
        {
            "question": "What’s a sexual fantasy you think about often?",
            "challenges": [
                "Describe it to me in detail.",
                "Discuss why it appeals to you.",
                "Identify a way to incorporate elements of it into our relationship."
            ]
        },
        {
            "question": "What’s your favorite type of touch that really drives you wild?",
            "challenges": [
                "Show me how you want to be touched.",
                "Describe a time when that touch made you feel amazing.",
                "Experiment with that type of touch on each other."
            ]
        },
        
        {
            "question": "What’s the most adventurous place you’d want to have sex?",
            "challenges": [
                "Describe the scenario in detail.",
                "Share a story of a past adventure you enjoyed.",
                "Plan a trip to that place with intimacy in mind."
            ]
        },
        {
            "question": "What’s your take on role-playing, and what characters excite you?",
            "challenges": [
                "Discuss a specific scenario you’d enjoy.",
                "Role-play a short scene together.",
                "Share a fantasy character you’d like to embody."
            ]
        },
        {
            "question": "What’s one thing you’ve always wanted to learn about intimacy?",
            "challenges": [
                "Discuss why it interests you.",
                "Plan a way to explore it together.",
                "Share a resource or workshop you’d like to attend."
            ]
        },
        {
            "question": "What’s the most sensual thing someone has done for you?",
            "challenges": [
                "Describe it in detail.",
                "Discuss how it made you feel.",
                "Recreate the moment as closely as possible."
            ]
        },
        {
            "question": "How do you feel about incorporating food into our intimacy?",
            "challenges": [
                "Share a food you think would be fun to use.",
                "Plan a meal with the intention of being intimate afterwards.",
                "Describe a scene from a movie involving food and intimacy."
            ]
        },
        {
            "question": "What’s a secret you’ve always wanted to share with a partner?",
            "challenges": [
                "Share it with me in a safe space.",
                "Discuss why it’s significant to you.",
                "Explore how it could deepen our connection."
            ]
        },
        {
            "question": "How do you feel about fantasy scenarios involving multiple partners?",
            "challenges": [
                "Discuss what excites you about it.",
                "Share a fantasy involving this scenario.",
                "Identify elements you’d be comfortable exploring."
            ]
        },
        {
            "question": "What’s your ideal romantic setting for an intimate night?",
            "challenges": [
                "Describe it in detail.",
                "Create a plan for us to recreate it.",
                "Share a memory of a time you felt truly romantic."
            ]
        },
        {
            "question": "What’s the most intimate thing someone has ever said to you?",
            "challenges": [
                "Share how it made you feel.",
                "Discuss why it resonated with you.",
                "Explore how we can create similar intimacy."
            ]
        },
        {
            "question": "What’s a physical feature of mine that turns you on the most?",
            "challenges": [
                "Describe why it turns you on.",
                "Show me how you’d like to explore that feature.",
                "Discuss how it enhances your attraction to me."
            ]
        },
        {
            "question": "What do you think is the key to a fulfilling sexual relationship?",
            "challenges": [
                "Share your thoughts and expectations.",
                "Discuss how we can achieve that together.",
                "Create a list of things to explore as a couple."
            ]
        },
        {
            "question": "What’s something you wish more couples talked about regarding sex?",
            "challenges": [
                "Share your thoughts on the topic.",
                "Discuss how we can create an open dialogue.",
                "Role-play how a conversation could go."
            ]
        },
        {
            "question": "How do you feel about sharing fantasies with each other?",
            "challenges": [
                "Share one fantasy now.",
                "Discuss what makes it hard to share sometimes.",
                "Explore ways to create a safe space for sharing."
            ]
        },  {
            "question": "What’s your favorite type of foreplay?",
            "challenges": [
                "Describe exactly how you want it to be done.",
                "Act it out with me for a minute.",
                "Tell me what about it excites you the most."
            ]
        },
        {
            "question": "What’s your biggest turn-on when it comes to dirty talk?",
            "challenges": [
                "Try incorporating some dirty talk into our conversation.",
                "Share a phrase that drives you wild.",
                "Practice saying that phrase to each other."
            ]
        },
        {
            "question": "What’s your most intimate fantasy involving us?",
            "challenges": [
                "Describe it in detail.",
                "Identify one element you’d like to try together.",
                "Role-play a part of it."
            ]
        },
        {
            "question": "Where’s the most adventurous place you’ve ever had sex?",
            "challenges": [
                "Share the details of the experience.",
                "Describe how it felt to be in that place.",
                "Plan a future adventure together."
            ]
        },
        {
            "question": "What’s your favorite part of my body, and how do you want me to touch it?",
            "challenges": [
                "Demonstrate how you’d want to touch it.",
                "Tell me what you love about that part.",
                "Describe a time you enjoyed being touched there."
            ]
        },
        {
            "question": "How do you feel about sex toys, and do you have any favorites?",
            "challenges": [
                "Describe how you’d want to incorporate them into our intimacy.",
                "Share a toy you’ve always wanted to try.",
                "Plan a fun evening experimenting with them."
            ]
        },
        {
            "question": "What’s your favorite type of kiss, and how do you want it to feel?",
            "challenges": [
                "Show me the kiss you love the most.",
                "Describe what makes it special.",
                "Try to recreate that kiss with me."
            ]
        },
        {
            "question": "What’s your wildest sexual fantasy that you’d want to explore?",
            "challenges": [
                "Describe it in detail.",
                "Identify how we could make it happen.",
                "Share what excites you about that fantasy."
            ]
        },
        {
            "question": "How do you feel about role-playing, and what characters would you want to try?",
            "challenges": [
                "Describe a scenario you’d like to enact.",
                "Act out a short scene with me.",
                "Share why that character excites you."
            ]
        },
        {
            "question": "What’s one thing you’ve always wanted to try in bed but haven’t yet?",
            "challenges": [
                "Describe why it interests you.",
                "Plan how we could explore it together.",
                "Role-play a part of that experience."
            ]
        },
        {
            "question": "What’s your opinion on public displays of intimacy?",
            "challenges": [
                "Describe a place you’d like to be intimate in public.",
                "Share a story about a time you were excited by public intimacy.",
                "Plan a fun outing with a chance for intimacy."
            ]
        },
        {
            "question": "What’s your favorite way to be seduced?",
            "challenges": [
                "Describe what turns you on during seduction.",
                "Act out a seductive scenario.",
                "Share a personal experience that felt particularly seductive."
            ]
        },
        {
            "question": "How do you feel about combining food and intimacy?",
            "challenges": [
                "Share a food you think would be fun to use.",
                "Describe how you envision incorporating it into our intimacy.",
                "Plan a meal for us to enjoy with an intimate twist."
            ]
        },
        {
            "question": "What’s the most erotic dream you’ve ever had?",
            "challenges": [
                "Describe it in detail.",
                "Discuss what made it so appealing.",
                "Share how it made you feel upon waking."
            ]
        },
        {
            "question": "What do you find most attractive about me when we’re intimate?",
            "challenges": [
                "Describe specific traits or actions.",
                "Share a moment when you felt particularly drawn to me.",
                "Show me a gesture that conveys that attraction."
            ]
        },
        {
            "question": "What’s your idea of the perfect intimate evening?",
            "challenges": [
                "Describe it from start to finish.",
                "Share a specific element that excites you the most.",
                "Plan a night to try to recreate it together."
            ]
        },
        {
            "question": "How do you feel about incorporating music into our intimacy?",
            "challenges": [
                "Share a song that turns you on.",
                "Create a playlist together for intimate moments.",
                "Describe how the right music enhances the experience."
            ]
        },
        {
            "question": "What’s something about our intimacy that you’d like to improve?",
            "challenges": [
                "Describe what would make it better for you.",
                "Share a personal goal related to intimacy.",
                "Discuss how we can work on it together."
            ]
        },
        {
            "question": "What’s one sexual position you’ve always wanted to try?",
            "challenges": [
                "Describe how you envision it.",
                "Share why it appeals to you.",
                "Try to demonstrate or suggest how to position ourselves."
            ]
        },
        {
            "question": "How do you feel about intimacy after a disagreement?",
            "challenges": [
                "Discuss how we can reconnect afterward.",
                "Share a personal experience related to this.",
                "Plan a way to bridge that gap next time."
            ]
        },
        {
            "question": "What’s your perspective on intimacy as a form of connection?",
            "challenges": [
                "Discuss how intimacy strengthens our bond.",
                "Share a moment when intimacy felt particularly meaningful.",
                "Describe how you’d like to deepen that connection."
            ]
        },
        {
            "question": "What do you want our intimate life to look like in the future?",
            "challenges": [
                "Describe your ideal scenario.",
                "Share goals or experiences you’d like to pursue together.",
                "Plan steps we can take to achieve that vision."
            ]
        },{
            "question": "What’s your biggest turn-off during intimacy?",
            "challenges": [
                "Describe a time when it affected your experience.",
                "Share what you wish your partner knew about it.",
                "Plan a way we can avoid that in the future."
            ]
        },
        {
            "question": "What role does music play in your intimate experiences?",
            "challenges": [
                "Share a song that gets you in the mood.",
                "Create a short playlist together.",
                "Describe how music enhances your feelings."
            ]
        },
        {
            "question": "How do you feel about aftercare post-intimacy?",
            "challenges": [
                "Discuss what you need after intimacy.",
                "Plan a special aftercare routine together.",
                "Describe a time you felt particularly cared for after intimacy."
            ]
        },
        {
            "question": "What’s a sexy outfit you’d like to see me wear?",
            "challenges": [
                "Describe what it looks like.",
                "Explain why it turns you on.",
                "Share how you would like me to wear it."
            ]
        },
        {
            "question": "How do you feel about intimate massages?",
            "challenges": [
                "Describe the type of massage you’d enjoy.",
                "Share a memorable massage experience.",
                "Plan a relaxing massage night together."
            ]
        },
        {
            "question": "What’s your favorite way to initiate intimacy?",
            "challenges": [
                "Share how you feel when you initiate.",
                "Act out your favorite initiation technique.",
                "Discuss a time it worked particularly well."
            ]
        },
        {
            "question": "How do you feel about spontaneity in the bedroom?",
            "challenges": [
                "Describe a spontaneous experience you loved.",
                "Plan a spontaneous intimate moment for us.",
                "Discuss how spontaneity affects your feelings."
            ]
        },
        {
            "question": "What’s your fantasy about a romantic getaway?",
            "challenges": [
                "Describe the perfect location.",
                "Share what activities you’d want to do.",
                "Plan a mock getaway experience."
            ]
        },
        {
            "question": "What’s one sexual secret you’ve never told anyone?",
            "challenges": [
                "Share it with me now.",
                "Explain why it’s remained a secret.",
                "Discuss how it could change our intimacy."
            ]
        },
        {
            "question": "How do you feel about exploring BDSM or kink?",
            "challenges": [
                "Share what interests you about it.",
                "Discuss any boundaries you’d want to set.",
                "Plan a safe exploration session."
            ]
        },
        {
            "question": "What’s your ideal date night to set the mood?",
            "challenges": [
                "Describe what happens during the night.",
                "Discuss why it excites you.",
                "Plan a similar date night for us."
            ]
        },
        {
            "question": "What’s the most intimate thing you’ve done with someone?",
            "challenges": [
                "Describe the experience in detail.",
                "Share how it made you feel afterward.",
                "Discuss what you learned from it."
            ]
        },
        {
            "question": "How do you feel about incorporating role reversal in the bedroom?",
            "challenges": [
                "Share your thoughts on it.",
                "Describe a scenario you’d like to try.",
                "Plan how to communicate desires during it."
            ]
        },
        {
            "question": "What’s your favorite way to be kissed?",
            "challenges": [
                "Demonstrate how you’d like to be kissed.",
                "Describe what makes that kiss special.",
                "Discuss how it affects your mood."
            ]
        },
        {
            "question": "How do you feel about exploring fantasies with other people?",
            "challenges": [
                "Discuss your thoughts on it.",
                "Share a fantasy involving another person.",
                "Plan how we could explore fantasies together."
            ]
        },
        {
            "question": "What’s one thing that makes you feel most desired?",
            "challenges": [
                "Share a specific moment when you felt that way.",
                "Discuss how I can help you feel that way more often.",
                "Describe a time it affected your confidence."
            ]
        },
        {
            "question": "How do you feel about exploring each other’s bodies with blindfolds?",
            "challenges": [
                "Discuss how it would change your perception.",
                "Share a related experience you’ve had.",
                "Plan a fun blindfold exploration."
            ]
        },
        {
            "question": "What’s a fantasy involving food that excites you?",
            "challenges": [
                "Describe how you envision it.",
                "Discuss what food you’d want to use.",
                "Plan a food-themed intimate night."
            ]
        },
        {
            "question": "How do you feel about using props in intimacy?",
            "challenges": [
                "Share a prop you find interesting.",
                "Discuss how we could use it together.",
                "Plan a session incorporating props."
            ]
        },
        {
            "question": "What’s the most erotic movie or book you’ve experienced?",
            "challenges": [
                "Describe what made it so erotic.",
                "Share how it influenced your desires.",
                "Plan a themed movie night based on it."
            ]
        },
        {
            "question": "How do you feel about discussing past experiences during intimacy?",
            "challenges": [
                "Share a past experience that influences you.",
                "Discuss how it could enhance our connection.",
                "Plan how we could communicate openly."
            ]
        },
        {
            "question": "What’s one thing you wish your partner would do more during intimacy?",
            "challenges": [
                "Share why it’s important to you.",
                "Discuss how it affects your feelings.",
                "Plan how we can incorporate it more often."
            ]
        },{
            "question": "What’s your favorite sexual position and why?",
            "challenges": [
                "Describe it in detail.",
                "Demonstrate how it feels with movement.",
                "Share a memorable experience related to it."
            ]
        },
        {
            "question": "What’s the dirtiest fantasy you’ve ever had?",
            "challenges": [
                "Share the details openly.",
                "Discuss how you’d feel if it happened.",
                "Explore how we could make it a reality."
            ]
        },
        {
            "question": "How do you feel about dirty talk during intimacy?",
            "challenges": [
                "Give me an example of something you’d say.",
                "Share what words turn you on.",
                "Plan how to incorporate it into our intimacy."
            ]
        },
        {
            "question": "What’s one thing you’d love for me to do to you in bed?",
            "challenges": [
                "Describe how it would feel.",
                "Explain why it excites you.",
                "Discuss any boundaries related to it."
            ]
        },
        {
            "question": "What’s your biggest kink or fetish?",
            "challenges": [
                "Share how you discovered it.",
                "Discuss how you’d like to explore it together.",
                "Explain why it’s appealing to you."
            ]
        },
        {
            "question": "How do you feel about public displays of affection?",
            "challenges": [
                "Describe a public situation that excites you.",
                "Share a time you enjoyed PDA.",
                "Discuss how far you'd be willing to go."
            ]
        },
        {
            "question": "What’s the naughtiest thing you’ve ever done?",
            "challenges": [
                "Describe the experience in detail.",
                "Discuss how it felt afterward.",
                "Share how it changed your view on intimacy."
            ]
        },
        {
            "question": "How do you feel about incorporating toys into our intimacy?",
            "challenges": [
                "Discuss what you’d want to try.",
                "Share your thoughts on what could enhance our experiences.",
                "Plan how to introduce them safely."
            ]
        },
        {
            "question": "What’s your favorite way to receive pleasure?",
            "challenges": [
                "Demonstrate how it’s done.",
                "Describe the sensations involved.",
                "Share how you feel afterward."
            ]
        },
        {
            "question": "What’s one thing you want me to say to you during intimacy?",
            "challenges": [
                "Share why those words matter to you.",
                "Discuss how they would make you feel.",
                "Plan how we can communicate that."
            ]
        },
        {
            "question": "How do you feel about exploring new locations for intimacy?",
            "challenges": [
                "Describe your ideal spot.",
                "Discuss a place you've thought about trying.",
                "Plan a fantasy experience there."
            ]
        },
        {
            "question": "What’s your biggest turn-on right now?",
            "challenges": [
                "Share how it makes you feel.",
                "Describe a time it was particularly intense.",
                "Discuss how we can incorporate it together."
            ]
        },
        {
            "question": "How do you feel about being blindfolded during intimacy?",
            "challenges": [
                "Discuss what that would be like for you.",
                "Share how it could heighten your senses.",
                "Plan how we would safely explore it."
            ]
        },
        {
            "question": "What’s one thing you’d like to try that you've never done before?",
            "challenges": [
                "Describe it in detail.",
                "Discuss why it intrigues you.",
                "Plan how we can approach it together."
            ]
        },
        {
            "question": "What’s the most erotic dream you've ever had?",
            "challenges": [
                "Share the details openly.",
                "Discuss how it made you feel.",
                "Explore whether it’s something you'd want to try."
            ]
        },
        {
            "question": "How do you feel about taking control during intimacy?",
            "challenges": [
                "Discuss what that means for you.",
                "Describe a situation where you'd want to take the lead.",
                "Plan how to communicate this in the moment."
            ]
        },
        {
            "question": "What’s your favorite part of foreplay?",
            "challenges": [
                "Describe what makes it enjoyable for you.",
                "Share how it sets the mood.",
                "Plan ways to enhance our foreplay experience."
            ]
        },
        {
            "question": "What’s your stance on role-playing during intimacy?",
            "challenges": [
                "Share a scenario you find exciting.",
                "Discuss any boundaries or preferences.",
                "Plan a fun role-play experience."
            ]
        },
        {
            "question": "What’s one thing that always makes you feel desired?",
            "challenges": [
                "Share a specific memory associated with it.",
                "Discuss how it affects your intimacy.",
                "Plan how to create that feeling together."
            ]
        },
        {
            "question": "What’s the most sensual thing someone could do to you?",
            "challenges": [
                "Describe it in detail.",
                "Share how it would make you feel.",
                "Discuss how we can create that experience."
            ]
        },
        {
            "question": "How do you feel about experimenting with temperature play (hot and cold)?",
            "challenges": [
                "Share your thoughts on what excites you about it.",
                "Discuss any concerns or boundaries.",
                "Plan how to safely explore temperature play."
            ]
        },
        {
            "question": "What’s your favorite type of kissing, and why?",
            "challenges": [
                "Demonstrate the type of kiss.",
                "Describe how it makes you feel.",
                "Discuss how it can enhance our intimacy."
            ]
        }, {
            "question": "If I could give you a back massage right now, where would you want me to focus?",
            "challenges": [
                "Describe how that would feel.",
                "Show me how you would want me to touch you.",
                "Share a memory of a time when you enjoyed a great massage."
            ]
        },
        {
            "question": "If I could kiss you anywhere right now, where would it be?",
            "challenges": [
                "Demonstrate the type of kiss you’d want.",
                "Describe what that kiss would mean to you.",
                "Share a favorite kissing memory."
            ]
        },
        {
            "question": "If I could whisper a compliment in your ear right now, what would you want it to be?",
            "challenges": [
                "Explain why that compliment matters to you.",
                "Share how it would make you feel.",
                "Describe a time you felt truly appreciated."
            ]
        },
        {
            "question": "If I could hold you tightly right now, how would you want me to do it?",
            "challenges": [
                "Show me how you like to be held.",
                "Describe what that hold signifies to you.",
                "Share how being held makes you feel."
            ]
        },
        {
            "question": "If I could make your favorite drink right now, what would it be?",
            "challenges": [
                "Explain why you love that drink.",
                "Share a memory associated with it.",
                "Describe how it would enhance our mood."
            ]
        },
        {
            "question": "If I could plan a surprise date for us right now, what would you want it to involve?",
            "challenges": [
                "Describe every detail of that date.",
                "Explain what makes that date special.",
                "Share how you would want to feel during it."
            ]
        },
        {
            "question": "If I could sing a song to you right now, what song would you want me to sing?",
            "challenges": [
                "Explain why that song is meaningful.",
                "Describe how it connects to our relationship.",
                "Share a favorite memory associated with that song."
            ]
        },
        {
            "question": "If I could surprise you with a small gift right now, what would you hope it to be?",
            "challenges": [
                "Describe why that gift would make you happy.",
                "Explain how it reflects our relationship.",
                "Share a past gift that meant a lot to you."
            ]
        },
        {
            "question": "If I could plan an adventure for us right now, where would you want to go?",
            "challenges": [
                "Describe the adventure in detail.",
                "Explain why it excites you.",
                "Share how you envision our time together there."
            ]
        },
        {
            "question": "If I could make you laugh right now, what joke or funny story would you want to hear?",
            "challenges": [
                "Share the joke or story with me.",
                "Describe why laughter is important to you.",
                "Discuss how laughter enhances our intimacy."
            ]
        },
        {
            "question": "If I could draw you a bath right now, what would you want in it?",
            "challenges": [
                "Describe how you like to relax.",
                "Explain what elements would make it perfect.",
                "Share a past experience of relaxation."
            ]
        },
        {
            "question": "If I could cuddle with you right now, how would you want it to go?",
            "challenges": [
                "Demonstrate the type of cuddling position you enjoy.",
                "Describe how cuddling makes you feel.",
                "Share a favorite cuddling memory."
            ]
        },
        {
            "question": "If I could take you to a dream destination right now, where would it be?",
            "challenges": [
                "Describe what you’d want to do there.",
                "Explain why that place is special to you.",
                "Share how you would want to feel while there."
            ]
        },
        {
            "question": "If I could express one thing I love about you right now, what would you want it to be?",
            "challenges": [
                "Describe how hearing that makes you feel.",
                "Explain why it’s important to you.",
                "Share a memory that reflects that quality."
            ]
        },
        {
            "question": "If I could take away any stress from your day right now, what would you want me to do?",
            "challenges": [
                "Describe how that action would help you.",
                "Explain how you cope with stress.",
                "Share how I can support you better."
            ]
        },
        {
            "question": "If I could do something spontaneous right now, what would you want it to be?",
            "challenges": [
                "Describe how spontaneity excites you.",
                "Explain what you think would be fun.",
                "Share a past spontaneous moment you loved."
            ]
        },
        {
            "question": "If I could cook you any meal right now, what would you want?",
            "challenges": [
                "Describe why you love that meal.",
                "Explain how it makes you feel.",
                "Share a favorite memory associated with that dish."
            ]
        },
        {
            "question": "If I could write you a love note right now, what would you want me to say?",
            "challenges": [
                "Describe how words of affirmation affect you.",
                "Explain why receiving notes is meaningful.",
                "Share a favorite note you’ve received."
            ]
        },
        {
            "question": "If I could dance with you right now, what song would you want to dance to?",
            "challenges": [
                "Demonstrate how you would want to dance.",
                "Explain why that song is special.",
                "Share a memory related to dancing."
            ]
        },
        {
            "question": "If I could ask you to teach me something right now, what would it be?",
            "challenges": [
                "Describe how you would teach it to me.",
                "Explain why it’s meaningful for you to share.",
                "Share a related experience that impacted you."
            ]
        },
        {
            "question": "If I could promise to do one thing for you right now, what would it be?",
            "challenges": [
                "Explain why that promise matters to you.",
                "Describe how it would change things for you.",
                "Share how you would feel about the commitment."
            ]
        },
        {
            "question": "If I could let you choose any activity for us to do right now, what would it be?",
            "challenges": [
                "Describe why that activity excites you.",
                "Explain how it would help us connect.",
                "Share a related experience that you loved."
            ]
        }


        // ... more questions with their specific challenges
    ]
};

let questionHistory = [];
const RECALL_FREQUENCY = 10; // Ask a recall question every 5 cards
let cardsSinceLastRecall = 0;

let isCoopMode = false; // New variable to track co-op mode

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
        console.log("Initial category:", initialCategory); // Debugging line
    
        // Create a new slider for the game area
        const gameCategoryContainer = document.getElementById('game-category-container');
        gameCategoryContainer.innerHTML = `
            <div class="slider-container">
                <input type="range" id="game-category-slider" min="1" max="5" value="${initialCategoryValue}" step="0.01">
                <div class="slider-fill"></div>
            </div>
            <div id="game-category-value">${initialCategory}</div>
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
            
            console.log("Updated category:", category); // Debugging line
            isCoopMode = document.getElementById('coop-mode').checked;
            updateScoreDisplay();
        
            if (isCoopMode) {
                showTimer();
                startTimer();
            } else {
                hideTimer();
            }
        
        }
    
        // Initialize the game slider
        updateGameSlider(initialCategoryValue);
    
        const gameCategorySlider = document.getElementById('game-category-slider');
        const gameCategoryValue = document.getElementById('game-category-value');
    
        // Set up the event listener for the new slider
        gameCategorySlider.addEventListener('input', updateGameSlider);
    
        // Initialize the slider background
        updateSliderBackground(gameCategorySlider);
    
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
        <span id="game-category-value">${selectedCategory}</span>
        <input type="range" id="game-category-slider" min="1" max="5" value="${getCategoryValue(selectedCategory)}" step="0.01">
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

    isCoopMode = document.getElementById('coop-mode').checked;
    updateScoreDisplay();
    if (isCoopMode) {
        timeRemaining = 10 * 60; // Reset timer to 10 minutes
        startTimer();
    }
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
    if (isCoopMode) {
        const totalScore = players.reduce((sum, player) => sum + player.score, 0);
        const teamScoreElement = document.getElementById('team-score');
        if (teamScoreElement) {
            teamScoreElement.innerHTML = `<span>Team Score: ${totalScore}/${scoreLimit}</span>`;
        } else {
            console.warn('Team score element not found. Creating it.');
            const scoresContainer = document.getElementById('scores');
            if (scoresContainer) {
                const newTeamScoreElement = document.createElement('div');
                newTeamScoreElement.id = 'team-score';
                newTeamScoreElement.innerHTML = `<span>Team Score: ${totalScore}/${scoreLimit}</span>`;
                scoresContainer.appendChild(newTeamScoreElement);
            } else {
                console.error('Scores container not found. Unable to update scores.');
            }
        }
    } else {
        // Existing individual score update logic
        players.forEach((player, index) => {
            const scoreElement = document.getElementById(`player${index + 1}-score`);
            if (scoreElement) {
                scoreElement.lastChild.textContent = player.score;
            } else {
                console.warn(`Score element for player ${index + 1} not found.`);
            }
        });
    }
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
    cardsSinceLastRecall++;
    
    if (isRecallEnabled && cardsSinceLastRecall >= RECALL_FREQUENCY && Math.random() < 0.5) {
        cardsSinceLastRecall = 0;
        generateRecallQuestion();
    } else {
        // Your existing code to draw a regular card
        const categoryCards = cards[selectedCategory];
        if (!categoryCards || categoryCards.length === 0) {
            console.error('No cards available for the selected category');
            return;
        }

        const randomIndex = Math.floor(Math.random() * categoryCards.length);
        const drawnCard = categoryCards[randomIndex];

        currentCard = {
            question: drawnCard.question,
            challenge: drawnCard.challenges[Math.floor(Math.random() * drawnCard.challenges.length)],
            isRecall: false
        };

        displayCard();
    }

    if (!isCoopMode && document.getElementById('head-to-head').checked) {
        flipBoard();
    } else {
        resetBoardOrientation();
    }
}


function displayCard() {
    const mainCardElement = document.getElementById('main-card');
    const flippedCardElement = document.getElementById('flipped-card');
    const cardsContainer = document.getElementById('cards-container');
    
    mainCardElement.querySelector('#question').textContent = currentCard.question;
    
    if (currentCard.isRecall) {
        mainCardElement.style.backgroundColor = "#77459b"; // Deep Purple for recall questions
        mainCardElement.style.width = "100%"; // Stretch to full width
        mainCardElement.querySelector('#question').style.fontSize = "24px"; // Larger font for better visibility
        mainCardElement.querySelector('#question').innerHTML = currentCard.question; // Use innerHTML here
        flippedCardElement.style.display = "none"; // Hide the flipped card
        cardsContainer.style.justifyContent = "center"; // Center the main card
        const questionElement = mainCardElement.querySelector('#question');
        questionElement.style.fontSize = "24px"; // Larger font for better visibility
        questionElement.style.display = "flex";
        questionElement.style.flexDirection = "column";
        questionElement.style.justifyContent = "center";
        questionElement.style.height = "100%";
        questionElement.style.whiteSpace = "pre-wrap"; // Preserve line breaks
        questionElement.textContent = currentCard.question; // Use textContent to avoid HTML injection
        flippedCardElement.style.display = "none"; // Hide the flipped card
        cardsContainer.style.justifyContent = "center"; // Center the main card
    } else {
        mainCardElement.style.backgroundColor = "#ff4081"; // Pink for regular questions
        mainCardElement.style.width = "200px"; // Reset to original width
        mainCardElement.querySelector('#question').style.fontSize = "21px"; // Reset to original font size
        flippedCardElement.style.display = "flex"; // Show the flipped card
        flippedCardElement.style.backgroundColor = "#ca8fa2"; // Lighter pink for regular challenges
        flippedCardElement.querySelector('#challenge').textContent = currentCard.challenge;
        flippedCardElement.querySelector('#complete-text').textContent = "2 points";
        cardsContainer.style.justifyContent = "center"; // Center both cards
        cardsContainer.style.gap = "20px"; // Add gap between cards
        mainCardElement.querySelector('#question').textContent = currentCard.question; // Use textContent for regular questions
    }
    
    // Ensure other styles remain consistent
    mainCardElement.style.height = flippedCardElement.style.height = "250px";

    // Animate cards popping up
    animateCardPopUp(mainCardElement);
    if (!currentCard.isRecall) {
        animateCardPopUp(flippedCardElement);
    }
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
    if (isCoopMode) {
        // In co-op mode, add points only once to the team score
        players[0].score += points; // Use the first player's score as the team score
    } else {
        players[currentPlayerIndex].score += points;
    }
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
    const points = 2;
    if (isCoopMode) {
        // In co-op mode, add points only once to the team score
        players[0].score += points; // Use the first player's score as the team score
    } else {
        players[currentPlayerIndex].score += points;
    }
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
    
    // Store the current co-op mode setting
    const wasCoopMode = document.getElementById('coop-mode').checked;
    
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
    
    // Restore the co-op mode setting
    document.getElementById('coop-mode').checked = wasCoopMode;
    
    // Clear scores display
    document.getElementById('scores').innerHTML = '';
    
    // Stop the timer if it's running
    stopTimer();
    
    // Reset the timer
    timeRemaining = 10 * 60;
    
    // Reload the page to ensure all states are reset
    location.reload();
}

function updateCurrentPlayer() {
    if (isCoopMode) {
        const teamScoreBox = document.getElementById('team-score');
        if (teamScoreBox) {
            const currentPlayer = players[currentPlayerIndex];
            const totalScore = players.reduce((sum, player) => sum + player.score, 0);
            teamScoreBox.style.backgroundColor = currentPlayer.color;
            teamScoreBox.style.color = getContrastColor(currentPlayer.color);
            teamScoreBox.firstChild.textContent = `(${totalScore}/${scoreLimit}) ~ ${currentPlayer.name} ~ ${formatTime(timeRemaining)}  ` ;
        }
    } else {
        // Existing logic for competitive mode
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
            div.firstChild.textContent = div.firstChild.textContent.replace("'s turn", "");
        });

        const currentPlayerBox = document.getElementById(`player${currentPlayerIndex + 1}-score`);
        if (currentPlayerBox) {
            currentPlayerBox.firstChild.textContent += "'s turn";
        }
    }
}

function switchPlayer() {
    console.log("Switching player. Current index before switch:", currentPlayerIndex);
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    console.log("New current index after switch:", currentPlayerIndex);
    console.log("Current player after switch:", players[currentPlayerIndex].name);
    updateCurrentPlayer();
}

// Make sure this function exists in your code
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
    
    // Find the previous player's index
    const previousPlayerIndex = (currentPlayerIndex - 1 + players.length) % players.length;
    const previousPlayerName = players[previousPlayerIndex].name;
    console.log("Previous player name:", previousPlayerName);
    
    // Filter questions answered by the previous player
    const previousPlayerQuestions = questionHistory.filter(q => q.player === previousPlayerName);
    console.log("Previous player questions:", previousPlayerQuestions);
    
    // If there are no questions from the previous player, draw a regular card instead
    if (previousPlayerQuestions.length === 0) {
        console.log("No previous player questions, drawing regular card");
        drawCard();
        return;
    }

    const recalledQuestion = previousPlayerQuestions[Math.floor(Math.random() * previousPlayerQuestions.length)];
    console.log("Recalled question:", recalledQuestion);
    
    currentCard = {
        question: `What was ${recalledQuestion.player}'s answer to:\n\n"${recalledQuestion.question}"`,
        challenge: null, // No challenge for recall questions
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
    if (isCoopMode) {
        const totalScore = players.reduce((sum, player) => sum + player.score, 0);
        if (totalScore >= scoreLimit && !gameEndAlertShown) {
            stopTimer(); // Stop the timer
            triggerWinningCelebration();
            showWinnerModal("Team");
            gameEndAlertShown = true;
            return true;
        }
    } else {
        // Existing individual win condition logic
        const winningPlayer = players.find(player => player.score >= scoreLimit);
        if (winningPlayer && !gameEndAlertShown) {
            triggerWinningCelebration();
            showWinnerModal(winningPlayer.name);
            gameEndAlertShown = true;
            return true;
        }
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
    if (isCoopMode) {
        startTimer();
    }
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

function getCategoryValue(categoryName) {
    const categories = ['Icebreaker', 'First Date', 'Dating', 'Longterm', 'Spicy'];
    return categories.indexOf(categoryName) + 1;
}

function updateSettings() {
    // ... existing settings ...
    const wasCoopMode = isCoopMode;
    isCoopMode = document.getElementById('coop-mode').checked;
    if (wasCoopMode !== isCoopMode) {
        updateScoreDisplay(); // Recreate score display when switching modes
    }
    updateScores(); // Update scores after settings change
}

function updateScoreDisplay() {
    const scoresContainer = document.getElementById('scores');
    scoresContainer.innerHTML = '';
    
    if (isCoopMode) {
        // Display total score for all players
        const totalScore = players.reduce((sum, player) => sum + player.score, 0);
        const scoreDiv = document.createElement('div');
        scoreDiv.id = 'team-score';
        scoreDiv.style.width = '100%'; // Make it take up full width
        scoreDiv.style.textAlign = 'center'; // Center the text
        scoreDiv.style.padding = '10px'; // Add some padding
        scoreDiv.style.fontSize = '1.2em'; // Increase font size
        scoreDiv.innerHTML = `<span>Team Score: ${totalScore}/${scoreLimit}</span>`;
        scoresContainer.appendChild(scoreDiv);
        
      
    } else {
        // Display individual scores (existing logic)
        players.forEach((player, index) => {
            const scoreDiv = document.createElement('div');
            scoreDiv.id = `player${index + 1}-score`;
            scoreDiv.innerHTML = `<span>${player.name}</span><span>${player.score}</span>`;
            scoreDiv.style.color = player.color;
            scoresContainer.appendChild(scoreDiv);
        });
    }

    updateCurrentPlayer();
}
let timerInterval;
let timeRemaining = 10 * 60; // 10 minutes in seconds

function startTimer() {
    clearInterval(timerInterval); // Clear any existing timer
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (timeRemaining > 0) {
        timeRemaining--;
        updateCurrentPlayer(); // Update display
    } else {
        clearInterval(timerInterval);
        // Handle game over due to time running out
        alert("Time's up! Game over.");
        resetGame();
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
function stopTimer() {
    clearInterval(timerInterval);
}
let isPaused = false;

function togglePause() {
    isPaused = !isPaused;
    const pauseButton = document.getElementById('pause-game');
    
    if (isPaused) {
        // Pause the game and deduct a point
        pauseButton.textContent = 'Resume';
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        document.getElementById('draw-card').disabled = true;
        document.getElementById('skip-turn').disabled = true;
        
        // Deduct a point
        if (isCoopMode) {
            // In co-op mode, deduct from team score
            const totalScore = players.reduce((sum, player) => sum + player.score, 0);
            players.forEach(player => player.score = (totalScore - 1) / players.length);
        } else {
            // In competitive mode, deduct from current player
            players[currentPlayerIndex].score -= 1;
        }
        updateScores();
    } else {
        // Resume the game
        pauseButton.textContent = 'Pause (-1)';
        if (isCoopMode) {
            startTimer();
        }
        document.getElementById('draw-card').disabled = false;
        document.getElementById('skip-turn').disabled = false;
    }
    
    updateScoreDisplay();
}

// Update the button text in the HTML
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    document.getElementById('pause-game').textContent = 'Pause (-1)';
    document.getElementById('pause-game').addEventListener('click', togglePause);
});