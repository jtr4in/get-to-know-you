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
        { question: "What’s your go-to comfort food? },
 { question: "Do you have a favorite spot in the city you like to visit? },
 { question: "If you could plan your ideal day, what would it include? },
 { question: "What’s your idea of a perfect weekend? },
 { question: "What's one hobby you've always wanted to try but haven’t yet? },
 { question: "What’s the best meal you’ve ever had? },
 { question: "Are you a morning person or a night owl? },
 { question: "If you could live anywhere in the world for a year, where would it be? },
 { question: "What was the last book or movie that really impacted you? },
 { question: "What’s the most spontaneous thing you’ve ever done? },
 { question: "What’s something you’d love to learn or get better at? },
 { question: "What’s one skill you think everyone should have? },
 { question: "What’s your favorite way to unwind after a long day? },
 { question: "Do you prefer road trips or air travel for vacations? },
 { question: "What's the most memorable trip you've ever taken? },
 { question: "What's your favorite season and why? },
 { question: "What’s something you’re passionate about that not many people know? },
 { question: "What’s one thing that always makes you laugh? },
 { question: "If you could have dinner with any celebrity, past or present, who would it be? },
 { question: "What’s your favorite kind of music, and does it depend on your mood? },
 { question: "What’s a small thing that can instantly make your day better? },
 { question: "If you could master one skill instantly, what would it be? },
 { question: "What’s one thing you’ve checked off your bucket list? },
 { question: "Do you believe in love at first sight, or do you think love grows over time? },
 { question: "If you could redo any day from your past, which day would it be and why? },
 { question: "What’s one thing you always keep in your fridge? },
 { question: "What’s your favorite holiday tradition? },
 { question: "What's the best advice you've ever received? },
 { question: "How do you feel about surprises—love them or hate them? },
 { question: "If you could live in any time period, past or future, when would it be? },
 { question: "What’s your favorite way to spend a Saturday night—out or in? },
 { question: "If you were to host a dinner party, what would you cook? },
 { question: "What’s your favorite way to exercise or stay active? },
 { question: "What’s one thing you’re really proud of? },
 { question: "What’s a place you’ve always wanted to visit but haven’t yet? },
 { question: "What’s your favorite way to celebrate your birthday? },
 { question: "If you had a free day tomorrow, how would you spend it? },
 { question: "What’s something quirky about you that people might not guess at first? },
 { question: "Do you prefer the beach, the mountains, or the city for vacations? },
 { question: "What’s your favorite memory from childhood? },
 { question: "What’s one thing on your bucket list you’re determined to do? },
 { question: "How do you usually spend your Sundays? },
 { question: "What’s a show or movie you’ve watched more than once? },
 { question: "Do you prefer cats, dogs, or neither? },
 { question: "What’s your favorite way to stay motivated when things get tough? },
 { question: "If you could trade lives with someone for a day, who would it be? },
 { question: "What’s something simple that brings you joy? },
 { question: "Do you prefer calling, texting, or video chatting? },
 { question: "What’s your favorite thing about your job (or studies)? },
 { question: "If you could relive any year of your life, which year would it be and why? },
 { question: "What’s your biggest deal-breaker in a relationship? },
 { question: "How do you handle conflicts or disagreements in relationships? },
 { question: "What’s something you’ve learned from past relationships? },
 { question: "What’s the most important quality you’re looking for in a partner? },
 { question: "How do you usually express affection in a relationship? },
 { question: "What’s a habit you have that might drive your partner crazy? },
 { question: "How important is physical chemistry to you in a relationship? },
 { question: "What does “trust” mean to you in a relationship? },
 { question: "What’s the longest relationship you’ve ever been in, and why did it end? },
 { question: "What’s your communication style—direct or subtle? },
 { question: "How do you usually handle stress or tough situations in life? },
 { question: "What’s your love language—how do you prefer to give and receive love? },
 { question: "Do you think it’s important to have your own space and independence in a relationship? },
 { question: "Are you someone who likes to plan ahead, or do you prefer spontaneity? },
 { question: "What’s your stance on marriage and long-term commitment? },
 { question: "How do you feel about kids—whether having them or not? },
 { question: "Do you believe in soulmates or that love is something you build over time? },
 { question: "How important is career success to you compared to personal life? },
 { question: "How do you feel about staying in vs. going out on weekends? },
 { question: "What’s something you’re passionate about that you want your partner to support? },
 { question: "How do you like to handle finances—are you more of a saver or a spender? },
 { question: "What’s the most important lesson life has taught you so far? },
 { question: "What role does your family play in your life and relationships? },
 { question: "How do you approach difficult conversations—head-on or avoid until necessary? },
 { question: "What’s something non-negotiable for you in a partner? },
 { question: "How do you feel about sharing responsibilities in a relationship, like household chores? },
 { question: "What do you think is the key to maintaining a healthy, long-term relationship? },
 { question: "How do you handle jealousy or possessiveness in a relationship? },
 { question: "What’s one thing you’ve never been willing to compromise on in past relationships? },
 { question: "How important is alone time for you, even when you’re in a relationship? },
 { question: "What’s your ideal balance between time spent together and time spent apart in a relationship? },
 { question: "What’s a personal boundary that you think is important in relationships? },
 { question: "How do you feel about public displays of affection? },
 { question: "Do you prefer to take the lead in a relationship, or are you more laid back? },
 { question: "What’s the best piece of advice you’ve ever received about relationships? },
 { question: "How do you like to celebrate special occasions in a relationship? },
 { question: "How important is travel or adventure in your life? },
 { question: "What do you think about having different interests or hobbies from your partner? },
 { question: "What’s your stance on maintaining friendships with exes? },
 { question: "How do you typically show appreciation for your partner? },
 { question: "How would you describe your perfect relationship dynamic? },
 { question: "What’s something you’ve always wanted to try in a relationship but haven’t yet? },
 { question: "How do you approach personal growth—are you always looking to improve yourself? },
 { question: "How do you handle it when your partner needs emotional support? },
 { question: "What’s your perspective on sharing passwords or being open with your phone in a relationship? },
 { question: "How do you feel about being vulnerable in a relationship? },
 { question: "What’s something you think is often misunderstood about you in relationships? },
 { question: "How do you like to resolve arguments—quickly or after taking time to cool down? },
 { question: "How important is it to you to set relationship goals and work on them together? },
 { question: "What’s one quality that would make you want to commit to someone long-term? },
 { question: "What’s your idea of a perfect date night? },
 { question: "If you could plan a spontaneous getaway, where would we go? },
 { question: "Do you believe in love at first sight or chemistry over time? },
 { question: "What’s the sexiest thing someone could do for you? },
 { question: "What’s something you find irresistibly attractive in a person? },
 { question: "What's your biggest turn-on? },
 { question: "What’s a non-physical trait that you find really attractive? },
 { question: "What’s the most adventurous thing you’ve done in a relationship? },
 { question: "Have you ever had a crush on someone you shouldn’t have? },
 { question: "What’s a guilty pleasure you’d never admit to most people? },
 { question: "What’s the most spontaneous or romantic thing you’ve done for someone? },
 { question: "If you could kiss anyone in the world, who would it be? },
 { question: "What’s one thing you wish you could do with no consequences? },
 { question: "What’s the craziest thing you’ve ever done for love? },
 { question: "Have you ever had a secret? },
 { question: "How do you prioritize work-life balance in your relationships? },
 { question: "What does a supportive partner look like to you? },
 { question: "What’s your view on emotional vulnerability in a relationship? },
 { question: "How important is intimacy in maintaining a strong connection? },
 { question: "What’s your take on sharing past relationship experiences with a new partner? },
 { question: "How do you handle differences in political or social beliefs with your partner? },
 { question: "What’s your biggest fear when it comes to relationships? },
 { question: "What’s your ideal scenario for resolving disagreements? },
 { question: "How do you know when you’re ready to take the next step in a relationship? },
 { question: "What’s one thing you think couples should do to keep the romance alive? },
 { question: "How do you manage your personal time and shared time in a relationship? },
 { question: "What’s the most meaningful way someone has shown they care about you? },
 { question: "How do you define “loyalty” in a relationship? },
 { question: "How important is it to you to share the same values with a partner? },
 { question: "What’s the biggest challenge you’ve faced in your personal relationships? },
 { question: "What’s your perspective on giving second chances in a relationship? },
 { question: "How do you handle vulnerability in tough situations? },
 { question: "What’s one thing that helps you feel secure in a relationship? },
 { question: "How do you think financial responsibility should be shared in a partnership? },
 { question: "What’s one habit you’ve developed from being in a past relationship? },
 { question: "What’s something you’re still working on in terms of personal growth? },
 { question: "How do you feel about public displays of affection—love them or avoid them? },
 { question: "What’s your definition of a "power couple"? },
 { question: "How do you prefer to handle social media boundaries in a relationship? },
 { question: "What do you think is the most important aspect of trust between partners? },
 { question: "How do you handle it when your partner needs space or time alone? },
 { question: "What’s something you hope your partner would never keep from you? },
 { question: "What’s your approach to balancing career ambitions and relationship commitments? },
 { question: "How do you usually approach introducing a partner to your family or friends? },
 { question: "What’s your biggest non-negotiable when it comes to commitment? },
 { question: "How important is personal freedom in a long-term relationship for you? },
 { question: "What’s something you wish more people understood about you? },
 { question: "How do you feel about maintaining individuality while being in a committed relationship? },
 { question: "What’s one way your relationships have made you a better person? },
 { question: "How do you typically handle tough conversations in a relationship? },
 { question: "What’s something about your personality that might take time for others to understand? },
 { question: "What’s your opinion on balancing ambition and romance? },
 { question: "How do you feel about discussing future plans early in a relationship? },
 { question: "What’s one way you like to show love without using words? },
 { question: "How important is equality and fairness in your relationship? },
 { question: "How do you know when to take the next step in a relationship, like moving in together? },
 { question: "What’s something you hope your partner appreciates about you? },
 { question: "How do you think a couple should handle big decisions like moving or career changes? },
 { question: "What’s your take on maintaining your own social circle while in a relationship? },
 { question: "How do you feel about compromise in a relationship—where’s your line? },
 { question: "How do you navigate situations where you and your partner want different things? },
 { question: "How important is it for your partner to share the same future goals (e.g., kids, travel, lifestyle)? },
 { question: "What’s one thing that’s crucial to a successful relationship for you? },
 { question: "How do you feel about long-distance relationships? },
 { question: "What’s something you want to be sure your future partner knows about you before things get serious? },
 { question: "How do you typically react when your partner needs space? },
 { question: "What’s something you’ve never been willing to compromise on in past relationships? },
 { question: "How do you handle it when someone disagrees with your opinions? },
 { question: "What’s your perspective on apologizing in a relationship—easy or difficult for you? },
 { question: "How do you feel about your partner having privacy in a relationship, like keeping their phone password? },
 { question: "What’s one thing you’ve done in a past relationship that you regret? },
 { question: "How do you usually respond when someone points out a flaw or mistake of yours? },
 { question: "What’s something your ex might say was challenging about being with you? },
 { question: "How do you deal with feelings of jealousy in a relationship? },
 { question: "What’s a behavior you can’t tolerate in a relationship, no matter what? },
 { question: "Have you ever ghosted someone, and if so, why? },
 { question: "How do you react when someone cancels plans last minute? },
 { question: "What’s something you think people misunderstand about you? },
 { question: "How do you usually react when you don’t get what you want in a relationship? },
 { question: "What’s the most controlling thing a partner has done, and how did you respond? },
 { question: "How do you handle situations where your partner is more successful than you? },
 { question: "What’s one thing that would make you end a relationship immediately? },
 { question: "What’s the biggest lie you’ve told in a relationship? },
 { question: "How do you usually handle criticism, even if it’s constructive? },
 { question: "What’s something that always triggers your temper in a relationship? },
 { question: "How do you feel about discussing finances early in a relationship? },
 { question: "What’s the most selfish thing you’ve done in a past relationship? },
 { question: "How do you deal with being wrong in an argument? },
 { question: "How do you react when your partner needs emotional support, but you’re struggling too? },
 { question: "What’s something you’ve hidden from a partner before and why? },
 { question: "How do you feel about the idea of keeping secrets in a relationship? },
 { question: "What’s one thing that really tests your patience in relationships? },
 { question: "How do you deal with someone who has different views on commitment than you? },
 { question: "What’s something that always gets under your skin in a relationship? },
 { question: "How do you usually react to relationship boundaries being set by your partner? },
 { question: "What’s a behavior of yours that you think could cause problems in a relationship? },
 { question: "How do you feel about your partner being friends with their ex? },
 { question: "What’s the most manipulative thing you’ve done to get your way? },
 { question: "How do you handle your partner hanging out with someone you don’t like? },
 { question: "What’s one thing you do that people might consider controlling? },
 { question: "How do you feel when your partner expresses a need you don’t fully agree with? },
 { question: "What’s the most selfish thing you’ve ever done for love? },
 { question: "How do you usually feel after a breakup—relief or regret? },
 { question: "What’s a personality trait of yours that can cause tension in a relationship? },
 { question: "How do you handle it when your partner doesn’t meet your expectations? },
 { question: "What’s the biggest argument you’ve had with a partner, and how did you handle it? },
 { question: "How do you feel about forgiving someone who’s betrayed your trust? },
 { question: "What’s one thing you wish your past partners understood about you? },
 { question: "How do you typically act when you feel like you’re losing control in a relationship? },
 { question: "What’s the hardest lesson you’ve learned from a past relationship? },
 { question: "How do you handle someone who doesn’t communicate the way you prefer? },
 { question: "What’s something you’ve done in the past that you’d never admit to your partner? },
 { question: "How do you respond when your partner expresses that they’re unhappy in the relationship? },
 { question: "What’s the most extreme thing you’ve done to get someone’s attention? },
 { question: "How do you deal with differences in life goals or values with a partner? },
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
       { question: "What's your favorite way to be seduced?" },
    { question: "What type of foreplay do you enjoy the most?" },
    { question: "Do you have a secret turn-on that you'd like to share?" },
    { question: "What's the most adventurous thing you've done intimately?" },
    { question: "Is there a romantic scene from a movie you'd like to recreate?" },
    { question: "How do you feel about role-playing fantasies?" },
    { question: "What's a sensual song that always gets you in the mood?" },
    { question: "Do you prefer slow and passionate or wild and spontaneous intimacy?" },
    { question: "Have you ever tried using toys during intimacy?" },
    { question: "What's an outfit or costume you'd like to see your partner wear?" },
    { question: "What's a compliment that makes you feel the most desired?" },
    { question: "Is there a scent or fragrance that turns you on?" },
    { question: "What's your favorite time of day for intimacy?" },
    { question: "Do you enjoy giving or receiving massages?" },
    { question: "What's a fantasy you've never told anyone about?" },
    { question: "How do you feel about public displays of affection?" },
    { question: "What's a surefire way to get you in the mood?" },
    { question: "Do you have a favorite spot where you like to be touched?" },
    { question: "What's the most memorable romantic gesture you've experienced?" },
    { question: "Are there any words or phrases that particularly excite you?" },
    { question: "What's a romantic setting that you'd love to experience?" },
    { question: "How important is eye contact during intimacy for you?" },
    { question: "Do you enjoy experimenting with different types of kisses?" },
    { question: "What's your opinion on trying new positions?" },
    { question: "Is there a love scene from a book that you'd like to try out?" },
    { question: "How do you feel about incorporating food into intimacy?" },
    { question: "What's an intimate activity you've always been curious about?" },
    { question: "Do you have a favorite piece of lingerie or underwear?" },
    { question: "What's the most romantic thing someone could do for you?" },
    { question: "How do you feel about sharing fantasies with your partner?" },
    { question: "Do you enjoy whispering sweet nothings during intimacy?" },
    { question: "What's an exotic location you'd love to be intimate in?" },
    { question: "How do you feel about being surprised in the bedroom?" },
    { question: "What's a sound or song that always relaxes you?" },
    { question: "Do you like to take control or be more submissive?" },
    { question: "Is there a love language you connect with the most?" },
    { question: "What's your favorite way to show affection?" },
    { question: "Do you enjoy slow dances or holding hands more?" },
    { question: "How do you feel about trying out romantic games?" },
    
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
