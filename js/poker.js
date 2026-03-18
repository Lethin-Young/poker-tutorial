// ============================================
// Poker Engine - Cards, Deck, Hand Evaluation
// ============================================

export const SUITS = ['s', 'h', 'd', 'c'];
export const SUIT_SYMBOLS = { s: '♠', h: '♥', d: '♦', c: '♣' };
export const SUIT_NAMES = { s: 'spade', h: 'heart', d: 'diamond', c: 'club' };
export const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
export const RANK_DISPLAY = { T: '10', J: 'J', Q: 'Q', K: 'K', A: 'A' };
export const RANK_VALUES = {};
RANKS.forEach((r, i) => RANK_VALUES[r] = i + 2);

export const HAND_NAMES_ZH = [
  '高牌', '一对', '两对', '三条', '顺子', '同花', '葫芦', '四条', '同花顺', '皇家同花顺'
];
export const HAND_NAMES_EN = [
  'High Card', 'One Pair', 'Two Pair', 'Three of a Kind', 'Straight', 'Flush',
  'Full House', 'Four of a Kind', 'Straight Flush', 'Royal Flush'
];

export function createCard(rank, suit) {
  return { rank, suit };
}

export function cardToString(card) {
  return card.rank + card.suit;
}

export function displayRank(rank) {
  return RANK_DISPLAY[rank] || rank;
}

export function isRed(suit) {
  return suit === 'h' || suit === 'd';
}

export function createDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push(createCard(rank, suit));
    }
  }
  return deck;
}

export function shuffleDeck(deck) {
  const d = [...deck];
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
}

// Hand evaluation
function getRankCounts(cards) {
  const counts = {};
  for (const c of cards) {
    counts[c.rank] = (counts[c.rank] || 0) + 1;
  }
  return counts;
}

function getSuitCounts(cards) {
  const counts = {};
  for (const c of cards) {
    counts[c.suit] = (counts[c.suit] || 0) + 1;
  }
  return counts;
}

function isFlush(cards) {
  const suits = getSuitCounts(cards);
  return Object.values(suits).some(v => v >= 5);
}

function getFlushSuit(cards) {
  const suits = getSuitCounts(cards);
  for (const [suit, count] of Object.entries(suits)) {
    if (count >= 5) return suit;
  }
  return null;
}

function getSortedValues(cards) {
  return cards.map(c => RANK_VALUES[c.rank]).sort((a, b) => b - a);
}

function findStraight(values) {
  const unique = [...new Set(values)].sort((a, b) => b - a);
  // Check for regular straight
  for (let i = 0; i <= unique.length - 5; i++) {
    if (unique[i] - unique[i + 4] === 4) {
      let isSeq = true;
      for (let j = 0; j < 4; j++) {
        if (unique[i + j] - unique[i + j + 1] !== 1) { isSeq = false; break; }
      }
      if (isSeq) return unique[i];
    }
  }
  // Check for wheel (A-2-3-4-5)
  if (unique.includes(14) && unique.includes(2) && unique.includes(3) && unique.includes(4) && unique.includes(5)) {
    return 5;
  }
  return 0;
}

// Returns { rank: 0-9, kickers: [...], name }
export function evaluateHand(cards) {
  if (cards.length < 5) return { rank: 0, kickers: [0], name: '' };

  const allCombos = getCombinations(cards, 5);
  let best = { rank: -1, kickers: [], name: '' };

  for (const combo of allCombos) {
    const result = evaluate5(combo);
    if (compareHands(result, best) > 0) {
      best = result;
    }
  }
  return best;
}

function evaluate5(cards) {
  const values = getSortedValues(cards);
  const counts = getRankCounts(cards);
  const suitCounts = getSuitCounts(cards);
  const isFlushHand = Object.values(suitCounts).some(v => v === 5);
  const straightHigh = findStraight(values);
  const isStraight = straightHigh > 0;

  const groups = Object.entries(counts)
    .map(([rank, count]) => ({ rank, count, value: RANK_VALUES[rank] }))
    .sort((a, b) => b.count - a.count || b.value - a.value);

  // Royal Flush
  if (isFlushHand && isStraight && straightHigh === 14) {
    return { rank: 9, kickers: [14], name: 'Royal Flush' };
  }
  // Straight Flush
  if (isFlushHand && isStraight) {
    return { rank: 8, kickers: [straightHigh], name: 'Straight Flush' };
  }
  // Four of a Kind
  if (groups[0].count === 4) {
    return { rank: 7, kickers: [groups[0].value, groups[1].value], name: 'Four of a Kind' };
  }
  // Full House
  if (groups[0].count === 3 && groups[1].count === 2) {
    return { rank: 6, kickers: [groups[0].value, groups[1].value], name: 'Full House' };
  }
  // Flush
  if (isFlushHand) {
    return { rank: 5, kickers: values, name: 'Flush' };
  }
  // Straight
  if (isStraight) {
    return { rank: 4, kickers: [straightHigh], name: 'Straight' };
  }
  // Three of a Kind
  if (groups[0].count === 3) {
    const kickers = groups.filter(g => g.count === 1).map(g => g.value).slice(0, 2);
    return { rank: 3, kickers: [groups[0].value, ...kickers], name: 'Three of a Kind' };
  }
  // Two Pair
  if (groups[0].count === 2 && groups[1].count === 2) {
    const pairVals = [groups[0].value, groups[1].value].sort((a, b) => b - a);
    const kicker = groups.find(g => g.count === 1).value;
    return { rank: 2, kickers: [...pairVals, kicker], name: 'Two Pair' };
  }
  // One Pair
  if (groups[0].count === 2) {
    const kickers = groups.filter(g => g.count === 1).map(g => g.value).slice(0, 3);
    return { rank: 1, kickers: [groups[0].value, ...kickers], name: 'One Pair' };
  }
  // High Card
  return { rank: 0, kickers: values.slice(0, 5), name: 'High Card' };
}

export function compareHands(a, b) {
  if (a.rank !== b.rank) return a.rank - b.rank;
  for (let i = 0; i < Math.min(a.kickers.length, b.kickers.length); i++) {
    if (a.kickers[i] !== b.kickers[i]) return a.kickers[i] - b.kickers[i];
  }
  return 0;
}

function getCombinations(arr, k) {
  if (k === 0) return [[]];
  if (arr.length === 0) return [];
  const results = [];
  const [first, ...rest] = arr;
  // Include first
  for (const combo of getCombinations(rest, k - 1)) {
    results.push([first, ...combo]);
  }
  // Exclude first
  for (const combo of getCombinations(rest, k)) {
    results.push(combo);
  }
  return results;
}

// Get hand strength as a percentage (0-100) for display
export function getHandStrength(playerCards, communityCards) {
  const allCards = [...playerCards, ...communityCards];
  if (allCards.length < 2) return 0;

  const hand = evaluateHand(allCards);
  // Simple strength calculation based on hand rank
  const baseStrength = hand.rank * 10;
  const kickerBonus = (hand.kickers[0] || 0) / 14 * 8;
  return Math.min(100, baseStrength + kickerBonus + 2);
}

// Simple starting hand strength for preflop hints
export function startingHandStrength(card1, card2) {
  const v1 = RANK_VALUES[card1.rank];
  const v2 = RANK_VALUES[card2.rank];
  const suited = card1.suit === card2.suit;
  const pair = card1.rank === card2.rank;
  const high = Math.max(v1, v2);
  const low = Math.min(v1, v2);
  const gap = high - low;

  let strength = 0;

  if (pair) {
    strength = 50 + high * 3;
  } else {
    strength = high * 2 + low;
    if (suited) strength += 8;
    if (gap <= 2) strength += 5;
    if (gap <= 4) strength += 2;
  }

  // Bonus for premium hands
  if (pair && high >= 12) strength += 15; // QQ+
  if (high === 14 && low >= 12) strength += 12; // AK, AQ

  return Math.min(100, strength);
}

// AI decision making (simple)
export function aiDecision(aiCards, communityCards, pot, currentBet, aiBet, aiChips, stage) {
  const allCards = [...aiCards, ...communityCards];
  const handEval = communityCards.length >= 3 ? evaluateHand(allCards) : null;
  const preflopStrength = startingHandStrength(aiCards[0], aiCards[1]);
  const toCall = currentBet - aiBet;

  let strength;
  if (communityCards.length >= 3) {
    strength = getHandStrength(aiCards, communityCards);
  } else {
    strength = preflopStrength;
  }

  const rand = Math.random() * 100;

  // Strong hand
  if (strength > 65) {
    if (rand < 40) return { action: 'raise', amount: Math.min(pot, aiChips) };
    return { action: toCall > 0 ? 'call' : 'check' };
  }

  // Medium hand
  if (strength > 35) {
    if (toCall > pot * 0.5) {
      return rand < 30 ? { action: 'call' } : { action: 'fold' };
    }
    if (rand < 15) return { action: 'raise', amount: Math.min(Math.floor(pot * 0.5), aiChips) };
    return { action: toCall > 0 ? 'call' : 'check' };
  }

  // Weak hand
  if (toCall > 0) {
    if (toCall <= aiChips * 0.05 && rand < 40) return { action: 'call' };
    if (rand < 10) return { action: 'raise', amount: Math.min(Math.floor(pot * 0.75), aiChips) }; // bluff
    return { action: 'fold' };
  }

  return rand < 15
    ? { action: 'raise', amount: Math.min(Math.floor(pot * 0.5), aiChips) }
    : { action: 'check' };
}
