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
        { question: "What's your favorite way to spend a weekend?", challenge: "Act out your ideal weekend in charades." },
        { question: "Do you have any hidden talents?", challenge: "Demonstrate your hidden talent or make one up on the spot." },
        { question: "What's the most interesting place you've ever visited?", challenge: "Describe the place using only five words." },
        { question: "If you could live anywhere in the world, where would it be?", challenge: "Draw a quick sketch of your dream home in this location." },
        { question: "What's your favorite type of music or band?", challenge: "Hum or sing a few bars from your favorite song." },
        { question: "Would you rather have the ability to fly but only as fast as a snail, or be able to run at super speed but only for 10 seconds at a time?", challenge: "Demonstrate your choice in slow motion." },
        { question: "Would you rather have a pet dinosaur or a pet dragon?", challenge: "Make the sound your chosen pet would make." },
        { question: "Would you rather be able to speak every language fluently but never be able to write, or be able to write in every language but never speak?", challenge: "Try to communicate your choice without speaking." },
        { question: "Would you rather live in a house made entirely of chocolate or a house made entirely of marshmallows?", challenge: "Pretend to 'eat' your way out of your chosen house." },
        { question: "Would you rather always have to wear socks on your hands or always have to wear gloves on your feet?", challenge: "Try to perform a simple task with your choice." },
        { question: "If you could have any animal as a pet, what would it be?", challenge: "Pretend to train your chosen pet." },
        { question: "What's your favorite season and why?", challenge: "Act out the best part of that season." },
        { question: "If you had to eat only one food for the rest of your life, what would it be?", challenge: "Pretend to eat that food as if it's your first time." },
        { question: "What's your favorite holiday?", challenge: "Describe it without using any words." },
        { question: "If you could instantly master any skill, what would it be?", challenge: "Pretend to perform your mastered skill." },
        { question: "What's your favorite board game?", challenge: "Mimic playing that board game in 10 seconds." },
        { question: "If you had a million dollars, what would you do with it?", challenge: "Pretend you're making your first million-dollar purchase." },
        { question: "What's your favorite dessert?", challenge: "Act out making that dessert." },
        { question: "If you could be any age for a week, what age would you be?", challenge: "Act like you're that age for 15 seconds." },
        { question: "What's your dream job?", challenge: "Pretend you're doing that job right now." },
        { question: "If you could live in any time period, what would it be?", challenge: "Act out a typical day from that era." },
        { question: "What's the weirdest food you've ever eaten?", challenge: "Pretend you're eating it again and react." },
        { question: "If you were a color, what color would you be?", challenge: "Explain your color choice using only body language." },
        { question: "What's the best gift you've ever received?", challenge: "Pretend you're opening that gift again." },
        { question: "If you could meet any fictional character, who would it be?", challenge: "Act out a scene where you meet them." },
        { question: "What's your favorite thing to do in the morning?", challenge: "Mime your morning routine." },
        { question: "What's the most fun party you've ever been to?", challenge: "Recreate the moment using just sound effects." },
        { question: "If you could have dinner with any celebrity, who would it be?", challenge: "Pretend you're having that dinner conversation." },
        { question: "What's your favorite animal and why?", challenge: "Imitate that animal for 10 seconds." },
        { question: "If you could be famous for anything, what would it be?", challenge: "Give an award speech for your newfound fame." },
        { question: "If you could have any fictional character's powers, whose would you want?", challenge: "Act out using those powers." },
        { question: "What's your go-to karaoke song?", challenge: "Sing a quick line from that song." },
        { question: "What's the most unusual job you've ever had?", challenge: "Pretend you're doing that job now." },
        { question: "If you could live in any movie universe, which would it be?", challenge: "Act out a scene from that universe." },
        { question: "What's the funniest thing that's ever happened to you?", challenge: "Act out the moment using no words." },
        { question: "What's your least favorite chore?", challenge: "Pretend to do it in slow motion." },
        { question: "What's your favorite outdoor activity?", challenge: "Mimic doing that activity for 10 seconds." },
        { question: "If you could invent anything, what would it be?", challenge: "Pretend you're using your invention." },
        { question: "What's your favorite TV show?", challenge: "Act out a famous scene from that show." },
        { question: "If you could be any age for the rest of your life, what would it be?", challenge: "Act like you're that age for 10 seconds." },
        { question: "What's your favorite vacation destination?", challenge: "Pretend you're relaxing at that destination." },
        { question: "If you were a type of weather, what would you be?", challenge: "Act out the weather you've chosen." },
        { question: "What's the strangest talent you have?", challenge: "Show your talent or make up a new one." },
        { question: "If you could change your name, what would it be?", challenge: "Introduce yourself with your new name in an exaggerated way." },
        { question: "What's your favorite subject in school?", challenge: "Teach a 10-second lesson on that subject." },
        { question: "What's your favorite drink?", challenge: "Pretend you're serving and drinking it." },
        { question: "If you could have one wish granted, what would it be?", challenge: "Act out what happens after your wish comes true." },
        { question: "What's your favorite sport to watch or play?", challenge: "Act out playing or watching that sport." },
        { question: "If you could have a conversation with anyone, dead or alive, who would it be?", challenge: "Pretend you're talking to that person." },
        { question: "What's your dream car?", challenge: "Pretend you're driving it." },
        { question: "What's the best prank you've ever pulled?", challenge: "Mimic your prank in 10 seconds." },
        { question: "If you could live under the sea, what sea creature would you be?", challenge: "Pretend you're that sea creature." },
        { question: "What's your favorite way to exercise?", challenge: "Demonstrate your favorite workout move." },
        { question: "If you were a superhero, what would your superpower be?", challenge: "Act out using your superpower in an emergency." },
        { question: "What's the most interesting book you've ever read?", challenge: "Pretend you're explaining the plot to someone who's never heard of it." },
        { question: "If you could have a personal robot, what would you ask it to do?", challenge: "Give your robot a command and react to its response." },
        { question: "What's your favorite app on your phone?", challenge: "Pretend you're using that app." },
        { question: "If you were a fruit, what kind would you be?", challenge: "Describe yourself as that fruit without speaking." },
        { question: "What's the best concert or live event you've ever been to?", challenge: "Act out the most exciting moment from that event." },
        { question: "What's one thing you always keep in your bag or pocket?", challenge: "Pretend you're pulling it out and explaining why you need it." },
        { question: "If you could visit any planet, which one would it be?", challenge: "Pretend you're exploring that planet." },
        { question: "What's your favorite snack?", challenge: "Pretend you're sharing it with everyone." },
        { question: "If you could turn invisible for one day, what would you do?", challenge: "Pretend you're invisible and sneaking around." },
        { question: "What's the best meal you've ever had?", challenge: "Pretend you're tasting it again for the first time." },
        { question: "If you could live in any fictional world, what would it be?", challenge: "Act out a scene in that world." },
        { question: "What's the weirdest dream you've ever had?", challenge: "Act out a part of that dream." },
        { question: "If you could play any musical instrument, what would it be?", challenge: "Pretend you're playing that instrument." },
        { question: "What's your favorite thing to do on a rainy day?", challenge: "Mimic your rainy day activity." },
        { question: "If you could design a theme park ride, what would it be?", challenge: "Pretend you're riding your creation." },
        { question: "What's the most unique job you've ever heard of?", challenge: "Pretend you're doing that job." },
        { question: "If you could only eat one type of cuisine for the rest of your life, what would it be?", challenge: "Pretend you're a chef cooking that cuisine." },
        { question: "What's your favorite video game?", challenge: "Act out a scene from that game." },
        { question: "If you could be any mythical creature, what would you be?", challenge: "Pretend you're that creature." },
        { question: "What's the silliest thing you've ever done?", challenge: "Recreate the moment in 10 seconds." },
        { question: "If you could be fluent in any language, what would it be?", challenge: "Pretend you're speaking in that language." },
        { question: "What's your favorite guilty pleasure TV show or movie?", challenge: "Pretend you're watching it and reacting." },
        { question: "If you could be any cartoon character, who would it be?", challenge: "Act out a scene as that character." },
        { question: "What's the most creative thing you've ever done?", challenge: "Act like you're doing it again." },
        { question: "If you could be any video game character, who would it be?", challenge: "Act out a scene as that character." },
        { question: "What's the most unusual thing you've ever seen?", challenge: "Describe it without using words." },
        { question: "If you could live anywhere for a year, where would it be?", challenge: "Pretend you're packing for that destination." },
        { question: "What's the most exciting sporting event you've ever been to?", challenge: "Act out a moment from that event." },
        { question: "If you could have any animal as a pet, what would it be?", challenge: "Pretend you're playing with your chosen pet." },
        { question: "What's your favorite thing to do with friends?", challenge: "Pretend you're doing that activity with invisible friends." },
        { question: "If you could swim in any substance, what would it be?", challenge: "Pretend you're swimming in it." },
        { question: "What's the best advice you've ever received?", challenge: "Pretend you're giving that advice to someone else." },
        { question: "If you were a candy, what kind would you be?", challenge: "Describe yourself as that candy in five words." },
        { question: "What's your favorite icebreaker game?", challenge: "Pretend you're playing it." },
        { question: "If you could spend a day with any animal, what would it be?", challenge: "Pretend you're spending time with that animal." },
        { question: "What's the funniest joke you've ever heard?", challenge: "Pretend you're telling it." },
        { question: "If you could write a book, what would it be about?", challenge: "Pretend you're reading a passage from your book." },
        { question: "What's the coolest thing you've ever built or created?", challenge: "Describe it with only gestures." },
        { question: "If you could have any career for a week, what would it be?", challenge: "Pretend you're at work in that career." },
    ],
    'relationships': [
        // Married Couples cards
        { question: "What was your first impression of me?", challenge: "Reenact your first meeting in an exaggerated way." },
        { question: "What is your favorite memory from when we were dating?", challenge: "Tell the story in the style of a fairy tale." },
        { question: "What is the most memorable trip we've taken together?", challenge: "Plan an imaginary dream vacation for us in 30 seconds." },
        { question: "What was the first thing you noticed about me?", challenge: "Draw a quick sketch highlighting that feature." },
        { question: "What do you remember about our first kiss?", challenge: "Describe it using only sound effects." },
        { question: "What is your biggest sexual fantasy?", challenge: "Write it down and seal it in an envelope to open later." },
        { question: "Is there a new position you'd like to try?", challenge: "Draw a stick figure diagram of it." },
        { question: "What's the most memorable sexual experience we've had?", challenge: "Recreate the mood with a 30-second interpretive dance." },
        { question: "What's one thing you've always wanted to do in bed but haven't?", challenge: "Whisper it in your partner's ear." },
        { question: "Do you have any secret kinks or fetishes?", challenge: "Act it out using only facial expressions." },
        { question: "What is your favorite thing about our relationship?", challenge: "Describe it in three words using charades." },
        { question: "What is one thing we do that always makes you laugh?", challenge: "Reenact that funny moment." },
        { question: "If our relationship had a theme song, what genre would it be?", challenge: "Act out a scene from that genre." },
        { question: "What's one thing I do that always makes you smile?", challenge: "Pretend you're reacting to that moment." },
        { question: "What's your favorite meal we've shared together?", challenge: "Describe that meal using only facial expressions." },
        { question: "What's one thing we do together that you love?", challenge: "Plan an activity we can do together in 30 seconds." },
        { question: "What do you think makes us a great team?", challenge: "Show it by pretending we're on a sports team together." },
        { question: "What is one thing you love about me?", challenge: "Describe it without using any words." },
        { question: "What's your favorite way to spend time with me?", challenge: "Act out that activity." },
        { question: "What's one tradition we've started that you love?", challenge: "Describe it in five words or fewer." },
        { question: "If we could go on any vacation, where would you take us?", challenge: "Plan our imaginary vacation in 30 seconds." },
        { question: "What is your favorite memory of us?", challenge: "Reenact that memory using sound effects only." },
        { question: "What is the most romantic thing we've ever done together?", challenge: "Recreate that moment in slow motion." },
        { question: "What was your favorite date we've ever had?", challenge: "Act out part of that date." },
        { question: "If our relationship had a theme song, what would it be?", challenge: "Hum or sing a few bars from the song." },
        { question: "What's the most thoughtful gift you've ever received from me?", challenge: "Pretend you're opening that gift again." },
        { question: "What's one thing we've accomplished together that you're proud of?", challenge: "Describe that accomplishment using only gestures." },
        { question: "What is one thing you think we should do more as a couple?", challenge: "Act out that activity." },
        { question: "If we could plan our perfect weekend, what would we do?", challenge: "Describe it in five words or fewer." },
        { question: "What's one way I've helped you become a better person?", challenge: "Describe it with only facial expressions." },
        { question: "What's your favorite compliment I've ever given you?", challenge: "Act out receiving that compliment again." },
        { question: "If we could relive one moment from our relationship, what would it be?", challenge: "Reenact that moment in exaggerated fashion." },
        { question: "What's one quality of mine that you admire?", challenge: "Act out that quality in 10 seconds." },
        { question: "What's one thing about our relationship that makes you feel loved?", challenge: "Show it by miming an action of love." },
        { question: "If you could describe me in one word, what would it be?", challenge: "Act out that word using charades." },
        { question: "What's the best surprise we've ever given each other?", challenge: "Pretend you're surprised all over again." },
        { question: "What's the most adventurous thing we've done together?", challenge: "Act out a scene from that adventure." },
        { question: "What's one thing you think we're really good at as a couple?", challenge: "Show it by acting out a scenario where we excel." },
        { question: "What's our favorite way we show affection to each other?", challenge: "Mimic that gesture without words." },
        { question: "What's one moment that made you feel really close to me?", challenge: "Describe that moment in five words." },
        { question: "What's one thing you're really looking forward to doing with me in the future?", challenge: "Pretend we're doing that activity now." },
        { question: "What's one thing you think makes our relationship unique?", challenge: "Act out that unique trait in 10 seconds." },
        { question: "If our love was a movie, what would the title be?", challenge: "Act out the opening scene of that movie." },
        { question: "What's one thing you think we could work on as a couple?", challenge: "Act out a scenario where we improve on that." },
        { question: "What's the funniest thing we've ever done together?", challenge: "Reenact that funny moment in slow motion." },
        { question: "What's one thing that makes you feel loved?", challenge: "Act it out without speaking." },
        { question: "What's one thing we've learned about each other that has strengthened our relationship?", challenge: "Explain it in five words or fewer." },
        { question: "What's one thing we've done that made you feel really happy?", challenge: "Pretend you're reliving that happy moment." },
        { question: "What's one thing you want to do together but haven't had the chance?", challenge: "Plan out how we can make it happen." },
        { question: "What's one tradition you hope we always keep?", challenge: "Describe that tradition using only gestures." },
        { question: "What's one thing that always makes you think of me?", challenge: "Act out your thoughts without words." },
        { question: "If we were to take a road trip anywhere, where would we go?", challenge: "Pretend you're giving directions to our destination." },
        { question: "What's one place you can't wait to visit with me?", challenge: "Describe it using only sound effects." },
        { question: "What's your favorite thing about the way we communicate?", challenge: "Show it by miming a conversation between us." },
        { question: "What's one thing that makes you feel appreciated in our relationship?", challenge: "Act it out in 10 seconds." },
        { question: "What's your favorite thing to do to relax with me?", challenge: "Pretend you're doing that activity right now." },
        { question: "What's one thing you think we're really good at as a couple?", challenge: "Show it by acting out a scenario where we excel." },
        { question: "What's one thing you love about our home?", challenge: "Describe it in five words." },
        { question: "What's one thing you've learned from me since we've been together?", challenge: "Teach that lesson to an imaginary friend." },
        { question: "What's your favorite thing about the way we handle challenges?", challenge: "Act out how we handle challenges." },
        { question: "If you could give us one piece of advice for the future, what would it be?", challenge: "Pretend you're giving us that advice in a dramatic voice." },
        { question: "What's one thing we always do together that you look forward to?", challenge: "Pretend you're about to do that thing." },
        { question: "What's one thing you appreciate about how we make decisions together?", challenge: "Act out how we typically make decisions." },
        { question: "What's one thing that makes you feel proud of us?", challenge: "Describe it in five words or fewer." },
        { question: "If we could travel back in time, what moment would you want to relive?", challenge: "Reenact that moment in slow motion." },
        { question: "What's one thing you've learned about love from our relationship?", challenge: "Describe it using only hand gestures." },
        { question: "What's your favorite activity that we do just for fun?", challenge: "Act out that activity without speaking." },
        { question: "What's one thing that brings us closer?", challenge: "Show it by miming a scenario where we grow closer." },
        { question: "What's one quality you think helps our relationship thrive?", challenge: "Act it out in 10 seconds." },
        { question: "What's one thing you're excited about for our future?", challenge: "Plan out how we can achieve it in 30 seconds." },
        { question: "What's one word you'd use to describe our connection?", challenge: "Act out that word using only facial expressions." },
        { question: "What's one thing you think we've mastered as a couple?", challenge: "Pretend you're teaching a class on that topic." },
        { question: "What's your favorite memory of us being spontaneous?", challenge: "Reenact that spontaneous moment." },
        { question: "What's one thing you love to hear me say?", challenge: "Act out how you react when I say it." },
        { question: "What's one thing that always makes you feel appreciated by me?", challenge: "Act out your feelings of appreciation." },
        { question: "What's one thing you wish we could do right now?", challenge: "Pretend we're doing it." },
        { question: "What's one thing you think makes our relationship stronger?", challenge: "Describe it using only facial expressions." },
        { question: "What's one moment you felt really connected to me?", challenge: "Reenact that moment with exaggerated emotion." },
        { question: "What's one thing you think we've gotten better at as a couple?", challenge: "Act out that improvement in slow motion." },
        { question: "What's one word you'd use to describe our love?", challenge: "Act out that word using charades." },
        { question: "What's one way I show you that I care?", challenge: "Act out that moment in an exaggerated way." },
        { question: "What's your favorite way to celebrate with me?", challenge: "Pretend we're celebrating together." },
        { question: "What's one thing you hope we never stop doing?", challenge: "Describe it in five words or fewer." },
    ],
    'deep-thoughts': [
        // Deep and Personal cards
        { question: "What are your core values, and how do they shape your decisions?", challenge: "Create a quick acrostic poem using one of your core values." },
        { question: "How do you define success in your life?", challenge: "Pantomime what success looks like to you." },
        { question: "What does happiness mean to you?", challenge: "Express your idea of happiness through a series of emojis." },
        { question: "What do you think is your greatest strength and your greatest weakness?", challenge: "Act out a scenario where your strength saves the day." },
        { question: "How do you handle conflicts or disagreements in relationships?", challenge: "Role-play a conflict resolution scenario with an imaginary person." },
       { question: "If you could only eat food that was shaped like animals or food that was colored like rainbows, which would you choose?", challenge: "Create a menu for your chosen food type." },
        { question: "Would you rather have a pet that can talk but only in riddles or one that can sing but only in opera?", challenge: "Imitate your chosen pet." },
        { question: "If you could switch lives with any fictional character for a day, who would it be and why?", challenge: "Act out a scene as that character." },
        { question: "Would you rather live in a world where everything is made of cheese or everything is made of marshmallows?", challenge: "Describe how you'd brush your teeth in this world." },
        { question: "If you could have any one of your childhood toys come to life, which would you choose and what would you do with it?", challenge: "Have a conversation with your chosen toy." },
        { question: "What is one belief you hold that you feel defines you?", challenge: "Describe that belief using only body language." },
        { question: "What do you think is the meaning of life?", challenge: "Act out your answer in a 10-second performance." },
        { question: "What is your biggest fear, and how do you deal with it?", challenge: "Pretend you're conquering that fear in real time." },
        { question: "What does friendship mean to you?", challenge: "Express friendship using only facial expressions." },
        { question: "If you could give your younger self one piece of advice, what would it be?", challenge: "Pretend you're giving that advice to an imaginary friend." },
        { question: "What do you think makes someone a good person?", challenge: "Act out an example of someone being a good person." },
        { question: "What do you want your legacy to be?", challenge: "Mimic giving a speech about your legacy." },
        { question: "What motivates you to keep going during tough times?", challenge: "Pretend you're pushing through a tough challenge in slow motion." },
        { question: "How do you want to be remembered by others?", challenge: "Describe your legacy using only hand gestures." },
        { question: "What's the most important lesson you've learned so far?", challenge: "Teach that lesson as if you're a professor." },
        { question: "What role does gratitude play in your life?", challenge: "Express gratitude without using any words." },
        { question: "How do you handle failure?", challenge: "Act out bouncing back from a failure." },
        { question: "What are the qualities you value most in a friend?", challenge: "Describe those qualities using just body language." },
        { question: "How do you deal with regret?", challenge: "Act out a scenario where you overcome regret." },
        { question: "What is your personal definition of success?", challenge: "Describe success in five words or fewer." },
        { question: "If you could change one thing about yourself, what would it be?", challenge: "Pretend you're making that change right now." },
        { question: "What is your biggest strength?", challenge: "Act out a situation where you use that strength." },
        { question: "What is your biggest weakness?", challenge: "Act out a scenario where your weakness shows." },
        { question: "What does self-care mean to you?", challenge: "Pretend you're teaching a self-care workshop." },
        { question: "What motivates you to be your best self?", challenge: "Act out what inspires you to be your best." },
        { question: "How do you define true happiness?", challenge: "Act out a moment of pure happiness." },
        { question: "What is your most meaningful accomplishment?", challenge: "Reenact the moment you achieved it." },
        { question: "What is your greatest fear about the future?", challenge: "Describe your fear using only hand gestures." },
        { question: "What does forgiveness mean to you?", challenge: "Act out a scenario where you forgive someone." },
        { question: "What's one value you will never compromise on?", challenge: "Describe that value in five words or fewer." },
        { question: "How do you want to grow as a person in the next year?", challenge: "Pretend you're celebrating after achieving that growth." },
        { question: "What's one thing that brings you peace?", challenge: "Describe that peaceful feeling using facial expressions." },
        { question: "What does success in relationships mean to you?", challenge: "Act out a successful relationship moment." },
        { question: "What's one piece of advice you would give to someone struggling?", challenge: "Pretend you're giving that advice on a stage." },
        { question: "What's one thing you think everyone should try at least once?", challenge: "Pretend you're doing that thing right now." },
        { question: "How do you find balance in your life?", challenge: "Act out a moment of balancing competing priorities." },
        { question: "What's the most important decision you've ever made?", challenge: "Reenact the moment you made that decision." },
        { question: "What does success look like to you?", challenge: "Describe it using just body language." },
        { question: "How do you define love?", challenge: "Act out a loving moment using no words." },
        { question: "What's the best way to deal with conflict?", challenge: "Act out a conflict resolution scenario in slow motion." },
        { question: "What's one thing you're most proud of?", challenge: "Act out the moment you realized your pride." },
        { question: "What does living a meaningful life look like to you?", challenge: "Describe it with only gestures." },
        { question: "What's one thing you want to improve about yourself?", challenge: "Pretend you're making that improvement right now." },
        { question: "What does kindness mean to you?", challenge: "Act out a scenario where you show kindness to someone." },
        { question: "What's one thing that brings you hope?", challenge: "Act out receiving hopeful news." },
        { question: "How do you handle disappointment?", challenge: "Act out your reaction to receiving disappointing news." },
        { question: "What's the best way to overcome a challenge?", challenge: "Act out overcoming a tough obstacle." },
        { question: "What does self-awareness mean to you?", challenge: "Pretend you're teaching a class on self-awareness." },
        { question: "What does integrity look like in your life?", challenge: "Act out a moment where you showed integrity." },
        { question: "What's your biggest regret, and how have you moved past it?", challenge: "Pretend you're giving advice on overcoming regret." },
        { question: "How do you make decisions when you're faced with a difficult choice?", challenge: "Reenact making a difficult decision." },
        { question: "What's the most valuable lesson you've learned about relationships?", challenge: "Teach that lesson in five words or fewer." },
        { question: "What does courage mean to you?", challenge: "Act out a moment of courage in your life." },
        { question: "What's one thing you would never compromise on?", challenge: "Describe that principle in five words." },
        { question: "What's the biggest challenge you've faced, and how did you overcome it?", challenge: "Act out facing that challenge and overcoming it." },
        { question: "What's one quality you admire in others?", challenge: "Act out someone displaying that quality." },
        { question: "What's one thing you want to accomplish before you die?", challenge: "Pretend you're celebrating after achieving it." },
        { question: "What's the most important value you live by?", challenge: "Describe it using only facial expressions." },
        { question: "What's one thing you would tell your future self?", challenge: "Pretend you're writing a letter to your future self." },
        { question: "What's the most important relationship in your life?", challenge: "Act out a meaningful moment in that relationship." },
        { question: "What does respect mean to you?", challenge: "Describe respect in five words or fewer." },
        { question: "What's one thing you wish more people understood about you?", challenge: "Act out that understanding using no words." },
        { question: "What's one moment in your life that made you change your perspective?", challenge: "Reenact that moment with exaggerated emotion." },
        { question: "What's one belief you used to hold but no longer do?", challenge: "Act out how you changed your mind." },
        { question: "What's one thing you're afraid to fail at?", challenge: "Describe that fear using just gestures." },
        { question: "What does growth mean to you?", challenge: "Pretend you're explaining growth to a classroom." },
        { question: "What's one thing you wish you could do better?", challenge: "Act out trying to improve at that thing." },
        { question: "How do you define personal freedom?", challenge: "Describe freedom using only body language." },
        { question: "What's one thing you need to let go of?", challenge: "Pretend you're letting go of it physically." },
        { question: "What's one thing you wish more people appreciated about life?", challenge: "Act out showing appreciation for that thing." },
        { question: "What does loyalty mean to you?", challenge: "Describe loyalty in five words or fewer." },
        { question: "How do you find meaning in everyday life?", challenge: "Act out a meaningful moment in your day." },
        { question: "What's one goal you're working toward right now?", challenge: "Pretend you're celebrating achieving that goal." },
        { question: "What's one thing you wish you had done differently?", challenge: "Act out a scenario where you make a different choice." },
        { question: "How do you prioritize what's important in your life?", challenge: "Pretend you're teaching someone how to set priorities." },
        { question: "What's one quality you think everyone should cultivate?", challenge: "Describe that quality using only gestures." },
        { question: "What's one thing you think the world needs more of?", challenge: "Act out contributing to that thing in the world." },
        { question: "What does resilience mean to you?", challenge: "Act out bouncing back from a difficult situation." },
        { question: "What's the most important thing you've learned from failure?", challenge: "Teach that lesson in five words." },
        { question: "What's one thing you're most grateful for?", challenge: "Pretend you're expressing gratitude in an exaggerated way." },
        { question: "What does authenticity mean to you?", challenge: "Act out being your most authentic self." },
        { question: "What's one way you want to make a difference in the world?", challenge: "Pretend you're making that difference in 10 seconds." },
        { question: "What does honesty mean to you?", challenge: "Describe honesty using just facial expressions." },
        { question: "What's one thing you think is misunderstood about success?", challenge: "Act out explaining the truth about success." },
        { question: "What's the most important lesson you've learned about yourself?", challenge: "Act out a moment where you learned that lesson." },
        { question: "What's one thing you've changed your mind about recently?", challenge: "Act out how you realized the change." },
        { question: "How do you define your personal identity?", challenge: "Pretend you're writing a book about yourself." },
    ]
};

let questionHistory = [];
const RECALL_FREQUENCY = 5; // Ask a recall question every 5 cards
let cardsSinceLastRecall = 0;

const recallChallenges = [
    "Act out {player}'s likely response without using words.",
    "Draw a quick sketch that represents {player}'s possible answer.",
    "Use only facial expressions to convey {player}'s probable reaction to the question.",
    "Hum a tune that you think represents {player}'s answer.",
    "Strike a pose that embodies what you think {player}'s answer might have been.",
    "Use three emojis to represent {player}'s possible answer.",
    "Mime an activity that could be related to {player}'s answer.",
    "Create a short rhyme or jingle about what you think {player} might have said.",
    "Use interpretive dance to express {player}'s potential answer.",
    "Make a sound effect that represents {player}'s likely response."
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
        timerNote.textContent = '-1 point at 0s';
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
        div.firstChild.textContent = div.firstChild.textContent.replace(" is answering", "");
    });

    const currentPlayerBox = document.getElementById(`player${currentPlayerIndex + 1}-score`);
    currentPlayerBox.firstChild.textContent += " is answering";
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
            <input type="color" class="player-color" value="#FF0000">
        </div>
        <div class="player-input-group">
            <input type="text" class="player-name" placeholder="Player 2 Name">
            <input type="color" class="player-color" value="#2196F3">
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
        question: `What did ${recalledQuestion.player} answer to this question: "${recalledQuestion.question}"`,
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

document.getElementById('add-player').addEventListener('click', addPlayer);
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('draw-card').addEventListener('click', drawCard);
document.getElementById('main-card').addEventListener('click', handleCardClick);
document.getElementById('flipped-card').addEventListener('click', handleCardClick);
document.getElementById('category-select').addEventListener('change', drawCard);
document.getElementById('reset-game').addEventListener('click', resetGame);
document.getElementById('game-title').addEventListener('click', resetToPlayerSetup);
document.getElementById('head-to-head').addEventListener('change', toggleHeadToHeadMode);
document.getElementById('recall-questions').addEventListener('change', toggleRecallQuestions);

// Initial setup is now handled by the startGame function