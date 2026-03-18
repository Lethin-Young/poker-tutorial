// ============================================
// Internationalization - Chinese & English
// ============================================

export const translations = {
  zh: {
    // App
    appTitle: '德州扑克教程',
    disclaimer: '本教程中的所有筹码仅用于演示目的，不涉及任何真实金钱交易。',
    footerDisclaimer: '⚠️ 所有筹码仅用于演示和学习目的，不涉及任何真实金钱交易。',
    lessonProgress: '课程进度',
    next: '下一课',
    prev: '上一课',
    startLearning: '开始学习',
    tryAgain: '再试一次',
    continue: '继续',

    // Lessons
    lessons: [
      { title: '欢迎', icon: '🏠' },
      { title: '认识扑克牌', icon: '🃏' },
      { title: '牌型排名', icon: '🏆' },
      { title: '牌桌与位置', icon: '🪑' },
      { title: '游戏流程', icon: '🔄' },
      { title: '下注动作', icon: '💰' },
      { title: '实战练习', icon: '🎮' },
    ],

    // Welcome
    welcomeTitle: '学会德州扑克',
    welcomeSubtitle: '从零开始，通过互动教程一步步掌握世界上最流行的扑克游戏。不需要任何基础，跟着我们的引导，你很快就能上手！',
    feature1Title: '互动教学',
    feature1Desc: '边学边练，不只是看',
    feature2Title: '从零开始',
    feature2Desc: '完全不需要基础',
    feature3Title: '实战模拟',
    feature3Desc: '在模拟游戏中巩固',

    // Lesson 1 - Card Basics
    l1Title: '认识扑克牌',
    l1Subtitle: '在开始学习德州扑克之前，让我们先来认识一下扑克牌的基础知识。',
    l1SuitsTitle: '四种花色',
    l1SuitsDesc: '一副标准扑克牌有四种花色。在德州扑克中，四种花色是等价的，没有大小之分。',
    l1Spade: '黑桃',
    l1Heart: '红心',
    l1Diamond: '方块',
    l1Club: '梅花',
    l1RanksTitle: '牌面大小',
    l1RanksDesc: '每种花色有13张牌，从小到大排列为：',
    l1RanksNote: '其中 A（Ace）既可以作为最大的牌（在 A-K-Q-J-10 顺子中），也可以作为最小的牌（在 A-2-3-4-5 顺子中）。',
    l1DeckTitle: '一副完整的牌',
    l1DeckDesc: '一副标准扑克牌共有52张牌（4种花色 × 13个面值）。德州扑克使用一副完整的52张牌来进行游戏。',

    // Lesson 2 - Hand Rankings
    l2Title: '牌型排名',
    l2Subtitle: '了解牌型排名是德州扑克最重要的基础知识。以下按从强到弱排列：',
    handRankings: [
      { name: '皇家同花顺', desc: '同花色的 A-K-Q-J-10', cards: [['A','s'],['K','s'],['Q','s'],['J','s'],['T','s']] },
      { name: '同花顺', desc: '同花色的连续五张牌', cards: [['9','h'],['8','h'],['7','h'],['6','h'],['5','h']] },
      { name: '四条', desc: '四张相同面值的牌', cards: [['K','s'],['K','h'],['K','d'],['K','c'],['7','s']] },
      { name: '葫芦', desc: '三条加一对', cards: [['Q','s'],['Q','h'],['Q','d'],['9','c'],['9','s']] },
      { name: '同花', desc: '五张同花色的牌', cards: [['A','d'],['J','d'],['8','d'],['5','d'],['3','d']] },
      { name: '顺子', desc: '五张连续面值的牌', cards: [['T','s'],['9','h'],['8','d'],['7','c'],['6','s']] },
      { name: '三条', desc: '三张相同面值的牌', cards: [['8','s'],['8','h'],['8','d'],['K','c'],['4','s']] },
      { name: '两对', desc: '两组不同的对子', cards: [['J','s'],['J','h'],['5','d'],['5','c'],['A','s']] },
      { name: '一对', desc: '两张相同面值的牌', cards: [['A','s'],['A','h'],['K','d'],['9','c'],['4','s']] },
      { name: '高牌', desc: '不构成任何组合，比最大的牌', cards: [['A','s'],['J','h'],['8','d'],['5','c'],['2','s']] },
    ],
    l2QuizTitle: '小测试',
    l2QuizQ: '以下哪个牌型最大？',
    l2QuizOptions: ['同花', '顺子', '葫芦', '两对'],
    l2QuizAnswer: 2,
    l2QuizCorrect: '答对了！葫芦（三条+一对）大于同花和顺子。',
    l2QuizWrong: '不太对哦。正确答案是葫芦。排名从高到低：皇家同花顺 > 同花顺 > 四条 > 葫芦 > 同花 > 顺子 > 三条 > 两对 > 一对 > 高牌。',

    // Lesson 3 - Table & Positions
    l3Title: '牌桌与位置',
    l3Subtitle: '了解牌桌上的位置对于德州扑克策略至关重要。',
    l3PositionsTitle: '关键位置',
    l3Dealer: '庄家（Dealer / Button）',
    l3DealerDesc: '每手牌的发牌起点，用"D"按钮标记。庄家位置是最有利的位置，因为你是最后一个行动的。',
    l3SB: '小盲注（Small Blind）',
    l3SBDesc: '庄家左手边第一个位置，必须在发牌前放入规定的小盲注筹码（通常是大盲注的一半）。',
    l3BB: '大盲注（Big Blind）',
    l3BBDesc: '小盲注左手边的位置，必须在发牌前放入规定的大盲注筹码。大盲注决定了这手牌的最低下注额。',
    l3AdvantageTitle: '位置的优势',
    l3AdvantageDesc: '在德州扑克中，位置越靠后越有优势。后位的玩家可以先观察其他玩家的行动，再做出自己的决定。庄家是最后行动的位置（翻牌后），因此被认为是最佳位置。',

    // Lesson 4 - Game Flow
    l4Title: '游戏流程',
    l4Subtitle: '一手德州扑克由以下几个阶段组成：',
    l4Preflop: '翻牌前',
    l4PreflopDesc: '每人发2张底牌',
    l4Flop: '翻牌',
    l4FlopDesc: '发3张公共牌',
    l4Turn: '转牌',
    l4TurnDesc: '发第4张公共牌',
    l4River: '河牌',
    l4RiverDesc: '发第5张公共牌',
    l4Showdown: '摊牌',
    l4ShowdownDesc: '比较牌型大小',
    l4DetailPreflop: '翻牌前（Pre-flop）',
    l4DetailPreflopText: '盲注入池后，每位玩家会收到2张只有自己能看到的底牌（也叫手牌或口袋牌）。然后从大盲注左边的玩家开始，按顺时针方向进行第一轮下注。',
    l4DetailFlop: '翻牌（Flop）',
    l4DetailFlopText: '第一轮下注结束后，桌面上会翻出3张公共牌。所有玩家都可以使用这些公共牌与自己的底牌组合。接着进行第二轮下注。',
    l4DetailTurn: '转牌（Turn）',
    l4DetailTurnText: '第二轮下注结束后，桌面上再翻出1张公共牌（第4张），然后进行第三轮下注。',
    l4DetailRiver: '河牌（River）',
    l4DetailRiverText: '第三轮下注结束后，翻出最后1张公共牌（第5张），进行最后一轮下注。',
    l4DetailShowdown: '摊牌（Showdown）',
    l4DetailShowdownText: '最后一轮下注结束后，还留在牌局中的玩家亮出手牌，用自己的2张底牌和5张公共牌中选出最佳的5张牌组合。牌型最大的玩家赢得底池。',
    l4BestHand: '最佳5张牌',
    l4BestHandDesc: '记住：你需要从总共7张牌（2张底牌 + 5张公共牌）中选出最好的5张来组成你的最终牌型。',

    // Lesson 5 - Betting Actions
    l5Title: '下注动作',
    l5Subtitle: '每一轮中，你可以选择以下几种动作：',
    l5Fold: '弃牌（Fold）',
    l5FoldDesc: '放弃这手牌和之前投入的筹码，退出当前牌局。如果你觉得手牌很差，弃牌是最明智的选择。',
    l5Check: '过牌（Check）',
    l5CheckDesc: '不下注也不弃牌，把行动权传给下一个玩家。只有当你前面没有人下注时，才能选择过牌。',
    l5Call: '跟注（Call）',
    l5CallDesc: '投入与当前最高下注相同的筹码，继续留在牌局中。',
    l5Raise: '加注（Raise）',
    l5RaiseDesc: '投入比当前最高下注更多的筹码。这会迫使其他玩家决定是跟注、再加注还是弃牌。',
    l5AllIn: '全下（All-in）',
    l5AllInDesc: '把你所有的筹码都押上。当你的筹码不足以跟注或你对自己的手牌非常有信心时，可以选择全下。',
    l5TipTitle: '下注策略提示',
    l5TipText: '好的玩家不仅看自己的牌，还会观察其他玩家的行为。如果你的手牌很强，可以适当加注来增加底池；如果手牌较弱，考虑弃牌以减少损失。',

    // Lesson 6 - Practice
    l6Title: '实战练习',
    l6Subtitle: '现在让我们来实际体验一手德州扑克！系统会给你提示和建议，帮助你做出最佳决策。',
    l6You: '你',
    l6AI: 'AI 对手',
    l6Pot: '底池',
    l6YourChips: '你的筹码',
    l6AIChips: 'AI 筹码',
    l6Fold: '弃牌',
    l6Check: '过牌',
    l6Call: '跟注',
    l6Raise: '加注',
    l6AllIn: '全下',
    l6NewHand: '发新牌',
    l6ShowHint: '显示提示',
    l6Preflop: '翻牌前',
    l6Flop: '翻牌',
    l6Turn: '转牌',
    l6River: '河牌',
    l6Showdown: '摊牌',
    l6Win: '🎉 你赢了！',
    l6Lose: '😔 你输了',
    l6Tie: '🤝 平局！',
    l6HandStrength: '手牌强度',
    l6AIFolded: 'AI 弃牌了，你赢得了底池！',
    l6YouTiedWith: '平局！你和AI的牌型相同。',
    l6CongratsTutorial: '🎉 恭喜完成教程！',
    l6CongratsText: '你已经学会了德州扑克的基本规则和策略。现在你可以继续练习，或者回顾之前的课程来加深理解。',
    l6PlayAgain: '再玩一局',
    l6BackToStart: '回到首页',
    l6YouFolded: '你弃牌了。',
    l6ResetChips: '重置筹码',
    l6CustomChips: '自定义筹码',
    l6SetChips: '设置',
    l6ChipsAmount: '筹码数量',
    l6AIRaised: 'AI 加注了！你需要决定是跟注、再加注还是弃牌。',
    l6CommunityCards: '公共牌',

    // Hints
    hintStrongPreflop: '你的起手牌很强！考虑加注来建立底池。',
    hintMediumPreflop: '这是一手还不错的起手牌。可以跟注看看翻牌。',
    hintWeakPreflop: '这手牌比较弱。如果前面有人大幅加注，考虑弃牌。',
    hintStrongHand: '你现在的牌型很强！可以考虑加注。',
    hintDecentHand: '你有一手还不错的牌。跟注是安全的选择。',
    hintWeakHand: '你的牌型较弱。如果对手加注很大，可以考虑弃牌。',
    hintDrawHand: '你有听牌的机会（可能凑成更好的牌型），可以考虑跟注看下一张牌。',
  },

  en: {
    // App
    appTitle: 'Poker Tutorial',
    disclaimer: 'All chips in this tutorial are for demonstration purposes only. No real money is involved.',
    footerDisclaimer: '⚠️ All chips are for demonstration and learning purposes only. No real money transactions involved.',
    lessonProgress: 'Progress',
    next: 'Next Lesson',
    prev: 'Previous',
    startLearning: 'Start Learning',
    tryAgain: 'Try Again',
    continue: 'Continue',

    // Lessons
    lessons: [
      { title: 'Welcome', icon: '🏠' },
      { title: 'Card Basics', icon: '🃏' },
      { title: 'Hand Rankings', icon: '🏆' },
      { title: 'Table & Positions', icon: '🪑' },
      { title: 'Game Flow', icon: '🔄' },
      { title: 'Betting Actions', icon: '💰' },
      { title: 'Practice Game', icon: '🎮' },
    ],

    // Welcome
    welcomeTitle: 'Learn Texas Hold\'em',
    welcomeSubtitle: 'Master the world\'s most popular poker game from scratch through interactive lessons. No prior experience needed — follow our guided tutorial and you\'ll be playing in no time!',
    feature1Title: 'Interactive',
    feature1Desc: 'Learn by doing, not just reading',
    feature2Title: 'From Zero',
    feature2Desc: 'No experience needed',
    feature3Title: 'Practice',
    feature3Desc: 'Apply skills in simulation',

    // Lesson 1 - Card Basics
    l1Title: 'Card Basics',
    l1Subtitle: 'Before diving into Texas Hold\'em, let\'s get familiar with the basics of a standard deck of cards.',
    l1SuitsTitle: 'Four Suits',
    l1SuitsDesc: 'A standard deck has four suits. In Texas Hold\'em, all suits are equal — no suit is higher than another.',
    l1Spade: 'Spades',
    l1Heart: 'Hearts',
    l1Diamond: 'Diamonds',
    l1Club: 'Clubs',
    l1RanksTitle: 'Card Rankings',
    l1RanksDesc: 'Each suit has 13 cards, ranked from lowest to highest:',
    l1RanksNote: 'The Ace (A) can be used as the highest card (in A-K-Q-J-10 straight) or the lowest card (in A-2-3-4-5 straight).',
    l1DeckTitle: 'A Complete Deck',
    l1DeckDesc: 'A standard deck has 52 cards (4 suits × 13 values). Texas Hold\'em uses one complete 52-card deck.',

    // Lesson 2 - Hand Rankings
    l2Title: 'Hand Rankings',
    l2Subtitle: 'Understanding hand rankings is the most important foundation of Texas Hold\'em. Listed from strongest to weakest:',
    handRankings: [
      { name: 'Royal Flush', desc: 'A-K-Q-J-10, all of the same suit', cards: [['A','s'],['K','s'],['Q','s'],['J','s'],['T','s']] },
      { name: 'Straight Flush', desc: 'Five consecutive cards of the same suit', cards: [['9','h'],['8','h'],['7','h'],['6','h'],['5','h']] },
      { name: 'Four of a Kind', desc: 'Four cards of the same rank', cards: [['K','s'],['K','h'],['K','d'],['K','c'],['7','s']] },
      { name: 'Full House', desc: 'Three of a kind plus a pair', cards: [['Q','s'],['Q','h'],['Q','d'],['9','c'],['9','s']] },
      { name: 'Flush', desc: 'Five cards of the same suit', cards: [['A','d'],['J','d'],['8','d'],['5','d'],['3','d']] },
      { name: 'Straight', desc: 'Five consecutive cards of different suits', cards: [['T','s'],['9','h'],['8','d'],['7','c'],['6','s']] },
      { name: 'Three of a Kind', desc: 'Three cards of the same rank', cards: [['8','s'],['8','h'],['8','d'],['K','c'],['4','s']] },
      { name: 'Two Pair', desc: 'Two different pairs', cards: [['J','s'],['J','h'],['5','d'],['5','c'],['A','s']] },
      { name: 'One Pair', desc: 'Two cards of the same rank', cards: [['A','s'],['A','h'],['K','d'],['9','c'],['4','s']] },
      { name: 'High Card', desc: 'No combination; highest card plays', cards: [['A','s'],['J','h'],['8','d'],['5','c'],['2','s']] },
    ],
    l2QuizTitle: 'Quick Quiz',
    l2QuizQ: 'Which of the following hands is the strongest?',
    l2QuizOptions: ['Flush', 'Straight', 'Full House', 'Two Pair'],
    l2QuizAnswer: 2,
    l2QuizCorrect: 'Correct! Full House (three of a kind + pair) beats Flush and Straight.',
    l2QuizWrong: 'Not quite. The correct answer is Full House. Rankings: Royal Flush > Straight Flush > Four of a Kind > Full House > Flush > Straight > Three of a Kind > Two Pair > One Pair > High Card.',

    // Lesson 3 - Table & Positions
    l3Title: 'Table & Positions',
    l3Subtitle: 'Understanding table positions is crucial for Texas Hold\'em strategy.',
    l3PositionsTitle: 'Key Positions',
    l3Dealer: 'Dealer (Button)',
    l3DealerDesc: 'The starting point for dealing. Marked with a "D" button. The dealer position is the most advantageous because you act last after the flop.',
    l3SB: 'Small Blind (SB)',
    l3SBDesc: 'First position to the left of the dealer. Must post the small blind (usually half of the big blind) before cards are dealt.',
    l3BB: 'Big Blind (BB)',
    l3BBDesc: 'Position to the left of the small blind. Must post the big blind before cards are dealt. The big blind sets the minimum bet for the hand.',
    l3AdvantageTitle: 'Positional Advantage',
    l3AdvantageDesc: 'In Texas Hold\'em, later positions have a significant advantage. Late position players can observe other players\' actions before making their decisions. The dealer acts last after the flop, making it the most powerful position.',

    // Lesson 4 - Game Flow
    l4Title: 'Game Flow',
    l4Subtitle: 'A hand of Texas Hold\'em consists of the following stages:',
    l4Preflop: 'Pre-flop',
    l4PreflopDesc: '2 hole cards dealt',
    l4Flop: 'Flop',
    l4FlopDesc: '3 community cards',
    l4Turn: 'Turn',
    l4TurnDesc: '4th community card',
    l4River: 'River',
    l4RiverDesc: '5th community card',
    l4Showdown: 'Showdown',
    l4ShowdownDesc: 'Compare hands',
    l4DetailPreflop: 'Pre-flop',
    l4DetailPreflopText: 'After the blinds are posted, each player receives 2 private hole cards. Betting begins with the player to the left of the big blind, going clockwise.',
    l4DetailFlop: 'Flop',
    l4DetailFlopText: 'After the first betting round, 3 community cards are dealt face-up on the table. All players can use these cards with their hole cards. A second round of betting follows.',
    l4DetailTurn: 'Turn',
    l4DetailTurnText: 'After the second betting round, a 4th community card is dealt face-up. A third round of betting follows.',
    l4DetailRiver: 'River',
    l4DetailRiverText: 'After the third betting round, the 5th and final community card is dealt face-up. The last round of betting takes place.',
    l4DetailShowdown: 'Showdown',
    l4DetailShowdownText: 'After the final betting round, remaining players reveal their hands. Each player makes the best 5-card hand from their 2 hole cards and 5 community cards. The best hand wins the pot.',
    l4BestHand: 'Best 5 Cards',
    l4BestHandDesc: 'Remember: you choose the best 5 cards from all 7 available (2 hole cards + 5 community cards) to form your final hand.',

    // Lesson 5 - Betting Actions
    l5Title: 'Betting Actions',
    l5Subtitle: 'During each betting round, you can choose from these actions:',
    l5Fold: 'Fold',
    l5FoldDesc: 'Give up your hand and any chips already in the pot. If your hand is weak, folding is the wisest choice.',
    l5Check: 'Check',
    l5CheckDesc: 'Pass the action to the next player without betting. You can only check if no one has bet before you in the current round.',
    l5Call: 'Call',
    l5CallDesc: 'Match the current highest bet to stay in the hand.',
    l5Raise: 'Raise',
    l5RaiseDesc: 'Bet more than the current highest bet. This forces other players to decide whether to call, re-raise, or fold.',
    l5AllIn: 'All-in',
    l5AllInDesc: 'Push all your chips into the pot. Use this when you don\'t have enough chips to call, or when you\'re very confident in your hand.',
    l5TipTitle: 'Betting Strategy Tip',
    l5TipText: 'Good players don\'t just look at their own cards — they observe other players\' behavior. If your hand is strong, raise to build the pot; if it\'s weak, consider folding to minimize losses.',

    // Lesson 6 - Practice
    l6Title: 'Practice Game',
    l6Subtitle: 'Now let\'s play an actual hand of Texas Hold\'em! The system will provide hints and suggestions to help you make the best decisions.',
    l6You: 'You',
    l6AI: 'AI Opponent',
    l6Pot: 'Pot',
    l6YourChips: 'Your Chips',
    l6AIChips: 'AI Chips',
    l6Fold: 'Fold',
    l6Check: 'Check',
    l6Call: 'Call',
    l6Raise: 'Raise',
    l6AllIn: 'All-in',
    l6NewHand: 'New Hand',
    l6ShowHint: 'Show Hint',
    l6Preflop: 'Pre-flop',
    l6Flop: 'Flop',
    l6Turn: 'Turn',
    l6River: 'River',
    l6Showdown: 'Showdown',
    l6Win: '🎉 You Won!',
    l6Lose: '😔 You Lost',
    l6Tie: '🤝 It\'s a Tie!',
    l6HandStrength: 'Hand Strength',
    l6AIFolded: 'AI folded. You win the pot!',
    l6YouTiedWith: 'It\'s a tie! You and AI have the same hand.',
    l6CongratsTutorial: '🎉 Tutorial Complete!',
    l6CongratsText: 'You\'ve learned the basic rules and strategies of Texas Hold\'em. You can continue practicing or review previous lessons to deepen your understanding.',
    l6PlayAgain: 'Play Again',
    l6BackToStart: 'Back to Start',
    l6YouFolded: 'You folded.',
    l6ResetChips: 'Reset Chips',
    l6CustomChips: 'Custom Chips',
    l6SetChips: 'Set',
    l6ChipsAmount: 'Chip Amount',
    l6AIRaised: 'AI raised! You need to decide: call, re-raise, or fold.',
    l6CommunityCards: 'Community Cards',

    // Hints
    hintStrongPreflop: 'You have a strong starting hand! Consider raising to build the pot.',
    hintMediumPreflop: 'This is a decent starting hand. Calling to see the flop is reasonable.',
    hintWeakPreflop: 'This hand is weak. Consider folding if there\'s a big raise ahead of you.',
    hintStrongHand: 'You have a very strong hand! Consider raising.',
    hintDecentHand: 'You have a decent hand. Calling is a safe choice.',
    hintWeakHand: 'Your hand is weak. Consider folding if the opponent bets big.',
    hintDrawHand: 'You have drawing potential (might improve to a better hand). Consider calling to see the next card.',
  }
};

let currentLang = 'zh';

export function setLang(lang) {
  currentLang = lang;
}

export function getLang() {
  return currentLang;
}

export function t(key) {
  const keys = key.split('.');
  let val = translations[currentLang];
  for (const k of keys) {
    if (val == null) return key;
    val = val[k];
  }
  return val ?? key;
}

export function updateStaticTexts() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);
    if (typeof text === 'string') {
      el.textContent = text;
    }
  });
  document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
}
