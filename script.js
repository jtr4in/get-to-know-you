let currentCard = null;
let isQuestion = true;
let timer = null;
let timeLeft = 30;
let players = [];
let currentPlayerIndex = 0;
let isTimerDisabled = true;
let isWithinTimeLimit = true;
let isHeadToHeadMode = false;
let isRecallEnabled = true;

const cards = {
    'fun-and-light': [
        // Get to Know You cards
        { question: "What's your favorite way to spend a weekend?", challenge: "Describe your answer while holding an imaginary microphone." },
        { question: "Do you have any hidden talents?", challenge: "Say your answer while acting like you're talking to a baby." },
        { question: "What's the most interesting place you've ever visited?", challenge: "Pretend you're narrating the answer like an audiobook." },
        { question: "If you could live anywhere in the world, where would it be?", challenge: "Say your answer with your best robot voice." },
        { question: "What's your favorite type of music or band?", challenge: "Describe your answer while holding an imaginary microphone." },
        { question: "Would you rather have the ability to fly but only as fast as a snail, or be able to run at super speed but only for 10 seconds at a time?", challenge: "Explain your answer while talking as if you're very sleepy." },
        { question: "Would you rather have a pet dinosaur or a pet dragon?", challenge: "Say your answer while acting like you're talking to a baby." },
        { question: "Would you rather be able to speak every language fluently but never be able to write, or be able to write in every language but never speak?", challenge: "Answer your question while speaking like a sports commentator." },
        { question: "Would you rather live in a house made entirely of chocolate or a house made entirely of marshmallows?", challenge: "Say your answer with your best robot voice." },
        { question: "Would you rather always have to wear socks on your hands or always have to wear gloves on your feet?", challenge: "Answer as if you're a tour guide explaining it to someone." },
        { question: "If you could have any animal as a pet, what would it be?", challenge: "Say your answer with your best robot voice." },
        { question: "What's your favorite season and why?", challenge: "Say your answer while pretending you're balancing a book on your head." },
        { question: "If you had to eat only one food for the rest of your life, what would it be?", challenge: "Answer as if you're telling a secret." },
        { question: "What's your favorite holiday?", challenge: "Describe your answer while pretending you're drawing in the air." },
        { question: "If you could instantly master any skill, what would it be?", challenge: "Answer while pretending you're in a dramatic soap opera scene." },
        { question: "What's your favorite board game?", challenge: "Answer your question while speaking like a sports commentator." },
        { question: "If you had a million dollars, what would you do with it?", challenge: "Answer as if you're a tour guide explaining it to someone." },
        { question: "What's your favorite dessert?", challenge: "Say your answer while pretending you're playing charades." },
        { question: "If you could be any age for a week, what age would you be?", challenge: "Answer as if you're a tour guide explaining it to someone." },
        { question: "What's your dream job?", challenge: "Say your answer while pretending you're playing charades." },
        { question: "If you could live in any time period, what would it be?", challenge: "Pretend you're narrating the answer like an audiobook." },
        { question: "What's the weirdest food you've ever eaten?", challenge: "Describe your answer while keeping eye contact." },
        { question: "If you were a color, what color would you be?", challenge: "Answer while pretending you're on a reality TV show." },
        { question: "What's the best gift you've ever received?", challenge: "Answer as if you're telling a secret." },
        { question: "If you could meet any fictional character, who would it be?", challenge: "Answer while pretending you're in a dramatic soap opera scene." },
        { question: "What's your favorite thing to do in the morning?", challenge: "Describe your answer while tapping the table rhythmically." },
        { question: "What's the most fun party you've ever been to?", challenge: "Answer as if you're telling a secret." },
        { question: "If you could have dinner with any celebrity, who would it be?", challenge: "Say your answer like you're reading a poem aloud." },
        { question: "What's your favorite animal and why?", challenge: "Say your answer like you're reading a poem aloud." },
        { question: "If you could be famous for anything, what would it be?", challenge: "Answer as if you're telling a secret." },
        { question: "If you could have any fictional character's powers, whose would you want?", challenge: "Answer while pretending you're on a reality TV show." },
        { question: "What's your go-to karaoke song?", challenge: "Say your answer while acting like you're talking to a baby." },
        { question: "What's the most unusual job you've ever had?", challenge: "Explain your answer as if you're giving an important speech." },
        { question: "If you could live in any movie universe, which would it be?", challenge: "Describe your answer while holding an imaginary microphone." },
        { question: "What's the funniest thing that's ever happened to you?", challenge: "Answer your question in slow motion, like you're in a movie." },
        { question: "What's your least favorite chore?", challenge: "Describe your answer while keeping eye contact." },
        { question: "What's your favorite outdoor activity?", challenge: "Answer while pretending you're in a dramatic soap opera scene." },
        { question: "If you could invent anything, what would it be?", challenge: "Explain your answer while whispering." },
        { question: "What's your favorite TV show?", challenge: "Say your answer while acting like you're talking to a baby." },
        { question: "If you could be any age for the rest of your life, what would it be?", challenge: "Answer as if you're telling a secret." },
        { question: "What's your favorite vacation destination?", challenge: "Say your answer while pretending you're playing charades." },
        { question: "If you were a type of weather, what would you be?", challenge: "Answer your question while speaking like a sports commentator." },
        { question: "What's the strangest talent you have?", challenge: "Answer as if you're telling a secret." },
        { question: "If you could change your name, what would it be?", challenge: "Answer while pretending you're in a dramatic soap opera scene." },
        { question: "What's your favorite subject in school?", challenge: "Explain your answer as if you're giving an important speech." },
        { question: "What's your favorite drink?", challenge: "Explain your answer as if you're giving an important speech." },
        { question: "If you could have one wish granted, what would it be?", challenge: "Describe your answer while tapping the table rhythmically." },
        { question: "What's your favorite sport to watch or play?", challenge: "Explain your answer as if you're giving an important speech." },
        { question: "If you could have a conversation with anyone, dead or alive, who would it be?", challenge: "Say your answer while pretending you're playing charades." },
        { question: "What's your dream car?", challenge: "Answer while pretending you're in a dramatic soap opera scene." },
        { question: "What's the best prank you've ever pulled?", challenge: "Explain your answer while talking as if you're very sleepy." },
        { question: "If you could live under the sea, what sea creature would you be?", challenge: "Describe your answer while holding an imaginary microphone." },
        { question: "What's your favorite way to exercise?", challenge: "Say your answer while acting like you're talking to a baby." },
        { question: "If you were a superhero, what would your superpower be?", challenge: "Say your answer while pretending you're balancing a book on your head." },
        { question: "What's the most interesting book you've ever read?", challenge: "Describe your answer while pretending you're drawing in the air." },
        { question: "If you could have a personal robot, what would you ask it to do?", challenge: "Explain your answer as if you're giving an important speech." },
        { question: "What's your favorite app on your phone?", challenge: "Explain your answer while whispering." },
        { question: "If you were a fruit, what kind would you be?", challenge: "Say your answer with your best robot voice." },
        { question: "What's the best concert or live event you've ever been to?", challenge: "Explain your answer while talking as if you're very sleepy." },
        { question: "What's one thing you always keep in your bag or pocket?", challenge: "Say your answer while pretending you're playing charades." },
        { question: "If you could visit any planet, which one would it be?", challenge: "Answer as if you're a tour guide explaining it to someone." },
        { question: "What's your favorite snack?", challenge: "Answer while pretending you're in a dramatic soap opera scene." },
        { question: "If you could turn invisible for one day, what would you do?", challenge: "Say your answer while pretending you're playing charades." },
        { question: "What's the best meal you've ever had?", challenge: "Answer while pretending you're in a dramatic soap opera scene." },
        { question: "If you could live in any fictional world, what would it be?", challenge: "Answer while pretending you're in a dramatic soap opera scene." },
        { question: "What's the weirdest dream you've ever had?", challenge: "Answer while pretending you're on a reality TV show." },
        { question: "If you could play any musical instrument, what would it be?", challenge: "Answer your question while speaking like a sports commentator." },
        { question: "What's your favorite thing to do on a rainy day?", challenge: "Say your answer while pretending you're balancing a book on your head." },
        { question: "If you could design a theme park ride, what would it be?", challenge: "Answer while pretending you're in a dramatic soap opera scene." },
        { question: "What's the most unique job you've ever heard of?", challenge: "Pretend you're narrating the answer like an audiobook." },
        { question: "If you could only eat one type of cuisine for the rest of your life, what would it be?", challenge: "Pretend you're narrating the answer like an audiobook." },
        { question: "What's your favorite video game?", challenge: "Describe your answer while tapping the table rhythmically." },
        { question: "If you could be any mythical creature, what would you be?", challenge: "Describe your answer while keeping eye contact." },
        { question: "What's the silliest thing you've ever done?", challenge: "Say your answer while pretending you're playing charades." },
        { question: "If you could be fluent in any language, what would it be?", challenge: "Answer as if you're telling a secret." },
        { question: "What's your favorite guilty pleasure TV show or movie?", challenge: "Explain your answer while whispering." },
        { question: "If you could be any cartoon character, who would it be?", challenge: "Answer while pretending you're on a reality TV show." },
        { question: "What's the most creative thing you've ever done?", challenge: "Answer while pretending you're in a dramatic soap opera scene." },
        { question: "If you could be any video game character, who would it be?", challenge: "Say your answer while acting like you're talking to a baby." },
        { question: "What's the most unusual thing you've ever seen?", challenge: "Answer while pretending you're in a dramatic soap opera scene." },
        { question: "If you could live anywhere for a year, where would it be?", challenge: "Answer your question while speaking like a sports commentator." },
        { question: "What's the most exciting sporting event you've ever been to?", challenge: "Describe your answer while keeping eye contact." },
        { question: "If you could have any animal as a pet, what would it be?", challenge: "Explain your answer while whispering." },
        { question: "What's your favorite thing to do with friends?", challenge: "Answer as if you're a tour guide explaining it to someone." },
        { question: "If you could swim in any substance, what would it be?", challenge: "Answer your question while pretending you're a news reporter." },
        { question: "What's the best advice you've ever received?", challenge: "Answer your question while pretending you're a news reporter." },
        { question: "If you were a candy, what kind would you be?", challenge: "Answer your question in slow motion, like you're in a movie." },
        { question: "What's your favorite icebreaker game?", challenge: "Say your answer while pretending you're playing charades." },
        { question: "If you could spend a day with any animal, what would it be?", challenge: "Answer as if you're telling a secret." },
        { question: "What's the funniest joke you've ever heard?", challenge: "Say your answer while pretending you're balancing a book on your head." },
        { question: "If you could write a book, what would it be about?", challenge: "Say your answer like you're reading a poem aloud." },
        { question: "What's the coolest thing you've ever built or created?", challenge: "Answer as if you're telling a secret." },
        { question: "If you could have any career for a week, what would it be?", challenge: "Describe your answer while holding an imaginary microphone." },
    ],
    'relationships': [
        // Married Couples cards
        { question: "What was your first impression of me?", challenge: "Answer while pretending you're in a dramatic soap opera scene." },
        { question: "What is your favorite memory from when we were dating?", challenge: "Answer your question in slow motion, like you're in a movie." },
        { question: "What is the most memorable trip we've taken together?", challenge: "Say your answer while pretending you're balancing a book on your head." },
        { question: "What was the first thing you noticed about me?", challenge: "Pretend you're narrating the answer like an audiobook." },
        { question: "What do you remember about our first kiss?", challenge: "Say your answer like you're reading a poem aloud." },
        { question: "What is your biggest sexual fantasy?", challenge: "Explain your answer while whispering." },
        { question: "Is there a new position you'd like to try?", challenge: "Answer while pretending you're on a reality TV show." },
        { question: "What's the most memorable sexual experience we've had?", challenge: "Answer your question while pretending you're a news reporter." },
        { question: "What's one thing you've always wanted to do in bed but haven't?", challenge: "Pretend you're narrating the answer like an audiobook." },
        { question: "Do you have any secret kinks or fetishes?", challenge: "Answer as if you're a tour guide explaining it to someone." },
        { question: "What is your favorite thing about our relationship?", challenge: "Describe your answer while tapping the table rhythmically." },
        { question: "What is one thing we do that always makes you laugh?", challenge: "Say your answer like you're reading a poem aloud." },
        { question: "If our relationship had a theme song, what genre would it be?", challenge: "Answer your question in slow motion, like you're in a movie." },
        { question: "What's one thing I do that always makes you smile?", challenge: "Say your answer while pretending you're playing charades." },
        { question: "What's your favorite meal we've shared together?", challenge: "Say your answer while pretending you're playing charades." },
        { question: "What's one thing we do together that you love?", challenge: "Pretend you're narrating the answer like an audiobook." },
        { question: "What do you think makes us a great team?", challenge: "Say your answer like you're reading a poem aloud." },
        { question: "What is one thing you love about me?", challenge: "Answer while pretending you're on a reality TV show." },
        { question: "What's your favorite way to spend time with me?", challenge: "Explain your answer while talking as if you're very sleepy." },
        { question: "What's one tradition we've started that you love?", challenge: "Describe your answer while keeping eye contact." },
        { question: "If we could go on any vacation, where would you take us?", challenge: "Answer while pretending you're on a reality TV show." },
        { question: "What is your favorite memory of us?", challenge: "Explain your answer while talking as if you're very sleepy." },
        { question: "What is the most romantic thing we've ever done together?", challenge: "Say your answer like you're reading a poem aloud." },
        { question: "What was your favorite date we've ever had?", challenge: "Say your answer with your best robot voice." },
        { question: "If our relationship had a theme song, what would it be?", challenge: "Answer as if you're telling a secret." },
        { question: "What's the most thoughtful gift you've ever received from me?", challenge: "Say your answer while acting like you're talking to a baby." },
        { question: "What's one thing we've accomplished together that you're proud of?", challenge: "Describe your answer while holding an imaginary microphone." },
        { question: "What is one thing you think we should do more as a couple?", challenge: "Describe your answer while tapping the table rhythmically." },
        { question: "If we could plan our perfect weekend, what would we do?", challenge: "Say your answer while acting like you're talking to a baby." },
        { question: "What's one way I've helped you become a better person?", challenge: "Describe your answer while pretending you're drawing in the air." },
        { question: "What's your favorite compliment I've ever given you?", challenge: "Describe your answer while pretending you're drawing in the air." },
        { question: "If we could relive one moment from our relationship, what would it be?", challenge: "Explain your answer while talking as if you're very sleepy." },
        { question: "What's one quality of mine that you admire?", challenge: "Answer your question in slow motion, like you're in a movie." },
        { question: "What's one thing about our relationship that makes you feel loved?", challenge: "Say your answer while pretending you're balancing a book on your head." },
        { question: "If you could describe me in one word, what would it be?", challenge: "Describe your answer while tapping the table rhythmically." },
        { question: "What's the best surprise we've ever given each other?", challenge: "Answer your question while pretending you're a news reporter." },
        { question: "What's the most adventurous thing we've done together?", challenge: "Answer as if you're telling a secret." },
        { question: "What's one thing you think we're really good at as a couple?", challenge: "Say your answer with your best robot voice." },
        { question: "What's our favorite way we show affection to each other?", challenge: "Explain your answer while whispering." },
        { question: "What's one moment that made you feel really close to me?", challenge: "Say your answer while pretending you're playing charades." },
        { question: "What's one thing you're really looking forward to doing with me in the future?", challenge: "Say your answer while pretending you're balancing a book on your head." },
        { question: "What's one thing you think makes our relationship unique?", challenge: "Say your answer with your best robot voice." },
        { question: "If our love was a movie, what would the title be?", challenge: "Answer your question in slow motion, like you're in a movie." },
        { question: "What's one thing you think we could work on as a couple?", challenge: "Say your answer like you're reading a poem aloud." },
        { question: "What's the funniest thing we've ever done together?", challenge: "Describe your answer while keeping eye contact." },
        { question: "What's one thing that makes you feel loved?", challenge: "Describe your answer while pretending you're drawing in the air." },
        { question: "What's one thing we've learned about each other that has strengthened our relationship?", challenge: "Answer your question while pretending you're a news reporter." },
        { question: "What's one thing we've done that made you feel really happy?", challenge: "Say your answer while pretending you're balancing a book on your head." },
        { question: "What's one thing you want to do together but haven't had the chance?", challenge: "Answer your question while pretending you're a news reporter." },
        { question: "What's one tradition you hope we always keep?", challenge: "Explain your answer while talking as if you're very sleepy." },
        { question: "What's one thing that always makes you think of me?", challenge: "Answer your question in slow motion, like you're in a movie." },
        { question: "If we were to take a road trip anywhere, where would we go?", challenge: "Describe your answer while pretending you're drawing in the air." },
        { question: "What's one place you can't wait to visit with me?", challenge: "Answer as if you're a tour guide explaining it to someone." },
        { question: "What's your favorite thing about the way we communicate?", challenge: "Explain your answer as if you're giving an important speech." },
        { question: "What's one thing that makes you feel appreciated in our relationship?", challenge: "Explain your answer while talking as if you're very sleepy." },
        { question: "What's your favorite thing to do to relax with me?", challenge: "Answer as if you're a tour guide explaining it to someone." },
        { question: "What's one thing you think we're really good at as a couple?", challenge: "Answer as if you're a tour guide explaining it to someone." },
        { question: "What's one thing you love about our home?", challenge: "Answer your question in slow motion, like you're in a movie." },
        { question: "What's one thing you've learned from me since we've been together?", challenge: "Answer as if you're telling a secret." },
        { question: "What's your favorite thing about the way we handle challenges?", challenge: "Say your answer while pretending you're balancing a book on your head." },
        { question: "If you could give us one piece of advice for the future, what would it be?", challenge: "Answer as if you're telling a secret." },
        { question: "What's one thing we always do together that you look forward to?", challenge: "Answer while pretending you're in a dramatic soap opera scene." },
        { question: "What's one thing you appreciate about how we make decisions together?", challenge: "Explain your answer while whispering." },
        { question: "What's one thing that makes you feel proud of us?", challenge: "Answer while pretending you're on a reality TV show." },
        { question: "If we could travel back in time, what moment would you want to relive?", challenge: "Explain your answer as if you're giving an important speech." },
        { question: "What's one thing you've learned about love from our relationship?", challenge: "Say your answer with your best robot voice." },
        { question: "What's your favorite activity that we do just for fun?", challenge: "Answer while pretending you're on a reality TV show." },
        { question: "What's one thing that brings us closer?", challenge: "Pretend you're narrating the answer like an audiobook." },
        { question: "What's one quality you think helps our relationship thrive?", challenge: "Describe your answer while tapping the table rhythmically." },
        { question: "What's one thing you're excited about for our future?", challenge: "Explain your answer as if you're giving an important speech." },
        { question: "What's one word you'd use to describe our connection?", challenge: "Say your answer with your best robot voice." },
        { question: "What's one thing you think we've mastered as a couple?", challenge: "Say your answer with your best robot voice." },
        { question: "What's your favorite memory of us being spontaneous?", challenge: "Answer as if you're a tour guide explaining it to someone." },
        { question: "What's one thing you love to hear me say?", challenge: "Answer your question while pretending you're a news reporter." },
        { question: "What's one thing that always makes you feel appreciated by me?", challenge: "Say your answer while pretending you're balancing a book on your head." },
        { question: "What's one thing you wish we could do right now?", challenge: "Say your answer while pretending you're balancing a book on your head." },
        { question: "What's one thing you think makes our relationship stronger?", challenge: "Answer your question while pretending you're a news reporter." },
        { question: "What's one moment you felt really connected to me?", challenge: "Pretend you're narrating the answer like an audiobook." },
        { question: "What's one thing you think we've gotten better at as a couple?", challenge: "Explain your answer while talking as if you're very sleepy." },
        { question: "What's one word you'd use to describe our love?", challenge: "Describe your answer while holding an imaginary microphone." },
        { question: "What's one way I show you that I care?", challenge: "Say your answer while acting like you're talking to a baby." },
        { question: "What's your favorite way to celebrate with me?", challenge: "Pretend you're narrating the answer like an audiobook." },
        { question: "What's one thing you hope we never stop doing?", challenge: "Answer while pretending you're on a reality TV show." },
    ],
    'deep-thoughts': [
        // Deep and Personal cards
        { question: "What are your core values, and how do they shape your decisions?", challenge: "Say your answer while pretending you're playing charades." },
        { question: "How do you define success in your life?", challenge: "Answer your question while speaking like a sports commentator." },
        { question: "What does happiness mean to you?", challenge: "Answer while pretending you're on a reality TV show." },
        { question: "What do you think is your greatest strength and your greatest weakness?", challenge: "Answer while pretending you're on a reality TV show." },
        { question: "How do you handle conflicts or disagreements in relationships?", challenge: "Describe your answer while holding an imaginary microphone." },
       { question: "If you could only eat food that was shaped like animals or food that was colored like rainbows, which would you choose?", challenge: "Pretend you're narrating the answer like an audiobook." },
        { question: "Would you rather have a pet that can talk but only in riddles or one that can sing but only in opera?", challenge: "Answer as if you're telling a secret." },
        { question: "If you could switch lives with any fictional character for a day, who would it be and why?", challenge: "Pretend you're narrating the answer like an audiobook." },
        { question: "Would you rather live in a world where everything is made of cheese or everything is made of marshmallows?", challenge: "Describe your answer while pretending you're drawing in the air." },
        { question: "If you could have any one of your childhood toys come to life, which would you choose and what would you do with it?", challenge: "Say your answer with your best robot voice." },
        { question: "What is one belief you hold that you feel defines you?", challenge: "Pretend you're narrating the answer like an audiobook." },
        { question: "What do you think is the meaning of life?", challenge: "Answer while pretending you're on a reality TV show." },
        { question: "What is your biggest fear, and how do you deal with it?", challenge: "Describe your answer while holding an imaginary microphone." },
        { question: "What does friendship mean to you?", challenge: "Answer while pretending you're in a dramatic soap opera scene." },
        { question: "If you could give your younger self one piece of advice, what would it be?", challenge: "Answer your question while pretending you're a news reporter." },
        { question: "What do you think makes someone a good person?", challenge: "Answer as if you're a tour guide explaining it to someone." },
        { question: "What do you want your legacy to be?", challenge: "Answer your question while speaking like a sports commentator." },
        { question: "What motivates you to keep going during tough times?", challenge: "Answer as if you're telling a secret." },
        { question: "How do you want to be remembered by others?", challenge: "Pretend you're narrating the answer like an audiobook." },
        { question: "What's the most important lesson you've learned so far?", challenge: "Describe your answer while pretending you're drawing in the air." },
        { question: "What role does gratitude play in your life?", challenge: "Describe your answer while pretending you're drawing in the air." },
        { question: "How do you handle failure?", challenge: "Explain your answer as if you're giving an important speech." },
        { question: "What are the qualities you value most in a friend?", challenge: "Describe your answer while tapping the table rhythmically." },
        { question: "How do you deal with regret?", challenge: "Answer your question while speaking like a sports commentator." },
        { question: "What is your personal definition of success?", challenge: "Describe your answer while keeping eye contact." },
        { question: "If you could change one thing about yourself, what would it be?", challenge: "Say your answer while pretending you're balancing a book on your head." },
        { question: "What is your biggest strength?", challenge: "Say your answer while acting like you're talking to a baby." },
        { question: "What is your biggest weakness?", challenge: "Explain your answer while talking as if you're very sleepy." },
        { question: "What does self-care mean to you?", challenge: "Explain your answer as if you're giving an important speech." },
        { question: "What motivates you to be your best self?", challenge: "Answer as if you're telling a secret." },
        { question: "How do you define true happiness?", challenge: "Explain your answer while talking as if you're very sleepy." },
        { question: "What is your most meaningful accomplishment?", challenge: "Describe your answer while tapping the table rhythmically." },
        { question: "What is your greatest fear about the future?", challenge: "Say your answer with your best robot voice." },
        { question: "What does forgiveness mean to you?", challenge: "Describe your answer while pretending you're drawing in the air." },
        { question: "What's one value you will never compromise on?", challenge: "Answer your question in slow motion, like you're in a movie." },
        { question: "How do you want to grow as a person in the next year?", challenge: "Say your answer with your best robot voice." },
        { question: "What's one thing that brings you peace?", challenge: "Answer your question while pretending you're a news reporter." },
        { question: "What does success in relationships mean to you?", challenge: "Describe your answer while pretending you're drawing in the air." },
        { question: "What's one piece of advice you would give to someone struggling?", challenge: "Describe your answer while holding an imaginary microphone." },
        { question: "What's one thing you think everyone should try at least once?", challenge: "Say your answer while pretending you're playing charades." },
        { question: "How do you find balance in your life?", challenge: "Explain your answer while whispering." },
        { question: "What's the most important decision you've ever made?", challenge: "Answer as if you're telling a secret." },
        { question: "What does success look like to you?", challenge: "Answer your question while speaking like a sports commentator." },
        { question: "How do you define love?", challenge: "Answer while pretending you're on a reality TV show." },
        { question: "What's the best way to deal with conflict?", challenge: "Answer as if you're a tour guide explaining it to someone." },
        { question: "What's one thing you're most proud of?", challenge: "Say your answer while pretending you're playing charades." },
        { question: "What does living a meaningful life look like to you?", challenge: "Describe your answer while tapping the table rhythmically." },
        { question: "What's one thing you want to improve about yourself?", challenge: "Answer your question while pretending you're a news reporter." },
        { question: "What does kindness mean to you?", challenge: "Say your answer with your best robot voice." },
        { question: "What's one thing that brings you hope?", challenge: "Explain your answer while whispering." },
        { question: "How do you handle disappointment?", challenge: "Describe your answer while tapping the table rhythmically." },
        { question: "What's the best way to overcome a challenge?", challenge: "Explain your answer as if you're giving an important speech." },
        { question: "What does self-awareness mean to you?", challenge: "Say your answer like you're reading a poem aloud." },
        { question: "What does integrity look like in your life?", challenge: "Explain your answer while whispering." },
        { question: "What's your biggest regret, and how have you moved past it?", challenge: "Answer as if you're telling a secret." },
        { question: "How do you make decisions when you're faced with a difficult choice?", challenge: "Describe your answer while holding an imaginary microphone." },
        { question: "What's the most valuable lesson you've learned about relationships?", challenge: "Explain your answer while talking as if you're very sleepy." },
        { question: "What does courage mean to you?", challenge: "Explain your answer while talking as if you're very sleepy." },
        { question: "What's one thing you would never compromise on?", challenge: "Answer while pretending you're on a reality TV show." },
        { question: "What's the biggest challenge you've faced, and how did you overcome it?", challenge: "Pretend you're narrating the answer like an audiobook." },
        { question: "What's one quality you admire in others?", challenge: "Describe your answer while holding an imaginary microphone." },
        { question: "What's one thing you want to accomplish before you die?", challenge: "Describe your answer while pretending you're drawing in the air." },
        { question: "What's the most important value you live by?", challenge: "Answer as if you're telling a secret." },
        { question: "What's one thing you would tell your future self?", challenge: "Answer while pretending you're on a reality TV show." },
        { question: "What's the most important relationship in your life?", challenge: "Pretend you're narrating the answer like an audiobook." },
        { question: "What does respect mean to you?", challenge: "Explain your answer while whispering." },
        { question: "What's one thing you wish more people understood about you?", challenge: "Say your answer while pretending you're balancing a book on your head." },
        { question: "What's one moment in your life that made you change your perspective?", challenge: "Say your answer while pretending you're playing charades." },
        { question: "What's one belief you used to hold but no longer do?", challenge: "Describe your answer while holding an imaginary microphone." },
        { question: "What's one thing you're afraid to fail at?", challenge: "Answer your question in slow motion, like you're in a movie." },
        { question: "What does growth mean to you?", challenge: "Explain your answer while whispering." },
        { question: "What's one thing you wish you could do better?", challenge: "Say your answer while acting like you're talking to a baby." },
        { question: "How do you define personal freedom?", challenge: "Answer as if you're a tour guide explaining it to someone." },
        { question: "What's one thing you need to let go of?", challenge: "Explain your answer while talking as if you're very sleepy." },
        { question: "What's one thing you wish more people appreciated about life?", challenge: "Answer while pretending you're on a reality TV show." },
        { question: "What does loyalty mean to you?", challenge: "Describe your answer while holding an imaginary microphone." },
        { question: "How do you find meaning in everyday life?", challenge: "Say your answer while pretending you're balancing a book on your head." },
        { question: "What's one goal you're working toward right now?", challenge: "Explain your answer as if you're giving an important speech." },
        { question: "What's one thing you wish you had done differently?", challenge: "Say your answer while acting like you're talking to a baby." },
        { question: "How do you prioritize what's important in your life?", challenge: "Answer as if you're a tour guide explaining it to someone." },
        { question: "What's one quality you think everyone should cultivate?", challenge: "Explain your answer while talking as if you're very sleepy." },
        { question: "What's one thing you think the world needs more of?", challenge: "Pretend you're narrating the answer like an audiobook." },
        { question: "What does resilience mean to you?", challenge: "Explain your answer while whispering." },
        { question: "What's the most important thing you've learned from failure?", challenge: "Answer while pretending you're in a dramatic soap opera scene." },
        { question: "What's one thing you're most grateful for?", challenge: "Explain your answer while whispering." },
        { question: "What does authenticity mean to you?", challenge: "Say your answer like you're reading a poem aloud." },
        { question: "What's one way you want to make a difference in the world?", challenge: "Answer as if you're telling a secret." },
        { question: "What does honesty mean to you?", challenge: "Describe your answer while pretending you're drawing in the air." },
        { question: "What's one thing you think is misunderstood about success?", challenge: "Pretend you're narrating the answer like an audiobook." },
        { question: "What's the most important lesson you've learned about yourself?", challenge: "Describe your answer while holding an imaginary microphone." },
        { question: "What's one thing you've changed your mind about recently?", challenge: "Answer while pretending you're in a dramatic soap opera scene." },
        { question: "How do you define your personal identity?", challenge: "Describe your answer while holding an imaginary microphone." },
    ]
};


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
    "Recall {player}'s response while pretending you're giving an important business presentation.",
    "Explain {player}'s answer as if you're auditioning for a role in a movie.",
    "Recall {player}'s answer as if you're explaining it to a child.",
    "Explain {player}'s answer while pretending you're hosting a cooking show.",
    "Describe {player}'s likely response as if you're making a toast at a wedding.",
    "Pretend you're pitching {player}'s answer as the next big invention.",
    "Recall {player}'s answer while speaking as if you're on a video call with bad reception.",
    "Describe {player}'s response as if you're making a confession.",
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
    "Recall {player}'s response as if you're a sports coach motivating your team.",
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
        
        currentCard = newCard;
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
