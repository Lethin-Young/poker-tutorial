// ============================================
// Tutorial Engine - Lesson Rendering
// ============================================

import { t, getLang } from './i18n.js';
import {
  SUITS, SUIT_SYMBOLS, RANKS, RANK_VALUES,
  displayRank, isRed, createDeck, shuffleDeck,
  evaluateHand, compareHands, getHandStrength,
  startingHandStrength, aiDecision, HAND_NAMES_ZH, HAND_NAMES_EN
} from './poker.js';

// ========== Card HTML Rendering ==========

export function renderCard(rank, suit, options = {}) {
  const { size = '', faceDown = false, animated = false, delay = 0, highlighted = false } = options;
  const sizeClass = size ? ` ${size}` : '';
  const colorClass = isRed(suit) ? 'red' : 'black';
  const animClass = animated ? ' deal-anim' : '';
  const hlClass = highlighted ? ' highlighted' : '';
  const display = displayRank(rank);
  const symbol = SUIT_SYMBOLS[suit];

  if (faceDown) {
    return `<div class="playing-card face-down${sizeClass}${animClass}" ${delay ? `style="animation-delay:${delay}s"` : ''}></div>`;
  }

  return `<div class="playing-card ${colorClass}${sizeClass}${animClass}${hlClass}" ${delay ? `style="animation-delay:${delay}s"` : ''}>
    <span class="card-corner card-corner-tl">${display}<br>${symbol}</span>
    <span class="card-rank">${display}</span>
    <span class="card-suit">${symbol}</span>
    <span class="card-corner card-corner-br">${display}<br>${symbol}</span>
  </div>`;
}

export function renderCardFromObj(card, options = {}) {
  return renderCard(card.rank, card.suit, options);
}

// ========== Lesson Renderers ==========

export function renderLesson(lessonIndex, container, app) {
  const renderers = [
    renderWelcome,
    renderCardBasics,
    renderHandRankings,
    renderTablePositions,
    renderGameFlow,
    renderBettingActions,
    renderPractice,
  ];

  if (lessonIndex >= 0 && lessonIndex < renderers.length) {
    renderers[lessonIndex](container, app);
  }
}

// ---------- Lesson 0: Welcome ----------
function renderWelcome(container, app) {
  container.innerHTML = `
    <div class="lesson-container">
      <div class="welcome-screen">
        <div class="welcome-cards">
          ${renderCard('A', 's', { size: 'large' })}
          ${renderCard('K', 'h', { size: 'large' })}
          ${renderCard('Q', 's', { size: 'large' })}
          ${renderCard('J', 'h', { size: 'large' })}
          ${renderCard('T', 's', { size: 'large' })}
        </div>
        <h1>${t('welcomeTitle')}</h1>
        <p class="subtitle">${t('welcomeSubtitle')}</p>
        <div class="welcome-features">
          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3>${t('feature1Title')}</h3>
            <p>${t('feature1Desc')}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📚</div>
            <h3>${t('feature2Title')}</h3>
            <p>${t('feature2Desc')}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎮</div>
            <h3>${t('feature3Title')}</h3>
            <p>${t('feature3Desc')}</p>
          </div>
        </div>
        <button class="btn btn-primary" onclick="window.app.goToLesson(1)">
          ${t('startLearning')} →
        </button>
      </div>
    </div>
  `;
}

// ---------- Lesson 1: Card Basics ----------
function renderCardBasics(container) {
  const suitCards = [
    { suit: 's', name: t('l1Spade') },
    { suit: 'h', name: t('l1Heart') },
    { suit: 'd', name: t('l1Diamond') },
    { suit: 'c', name: t('l1Club') },
  ];

  const rankCards = RANKS.map(r => renderCard(r, 's', { size: 'small', animated: true, delay: RANKS.indexOf(r) * 0.05 })).join('');

  container.innerHTML = `
    <div class="lesson-container">
      <div class="lesson-header">
        <h1>${t('l1Title')}</h1>
        <p>${t('l1Subtitle')}</p>
      </div>

      <div class="lesson-section">
        <h2>🎴 ${t('l1SuitsTitle')}</h2>
        <p>${t('l1SuitsDesc')}</p>
        <div class="card-container">
          ${suitCards.map(s => `
            <div style="text-align:center">
              ${renderCard('A', s.suit)}
              <div style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-secondary)">${s.name}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="lesson-section">
        <h2>📊 ${t('l1RanksTitle')}</h2>
        <p>${t('l1RanksDesc')}</p>
        <div class="card-container">
          ${rankCards}
        </div>
        <div class="info-box tip mt-2">
          <h4>💡 ${getLang() === 'zh' ? '小贴士' : 'Tip'}</h4>
          <p>${t('l1RanksNote')}</p>
        </div>
      </div>

      <div class="lesson-section">
        <h2>🃏 ${t('l1DeckTitle')}</h2>
        <p>${t('l1DeckDesc')}</p>
      </div>

      ${renderNavButtons(1)}
    </div>
  `;
}

// ---------- Lesson 2: Hand Rankings ----------
function renderHandRankings(container) {
  const rankings = t('handRankings');

  const rankingsHTML = rankings.map((hand, i) => {
    const cardsHTML = hand.cards.map(([r, s]) => renderCard(r, s, { size: '' })).join('');
    return `
      <div class="hand-ranking-item rank-${i + 1}">
        <div class="hand-rank-number">${i + 1}</div>
        <div class="hand-rank-info">
          <h3>${hand.name}</h3>
          <p>${hand.desc}</p>
        </div>
        <div class="hand-rank-cards">${cardsHTML}</div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="lesson-container">
      <div class="lesson-header">
        <h1>${t('l2Title')}</h1>
        <p>${t('l2Subtitle')}</p>
      </div>

      <div class="hand-ranking-list">
        ${rankingsHTML}
      </div>

      <div class="quiz-container mt-3" id="quiz-section">
        <h2>✏️ ${t('l2QuizTitle')}</h2>
        <p class="quiz-question">${t('l2QuizQ')}</p>
        <div class="quiz-options">
          ${t('l2QuizOptions').map((opt, i) => `
            <div class="quiz-option" data-index="${i}" onclick="window.app.handleQuiz(${i})">${opt}</div>
          `).join('')}
        </div>
        <div id="quiz-result"></div>
      </div>

      ${renderNavButtons(2)}
    </div>
  `;
}

// ---------- Lesson 3: Table & Positions ----------
function renderTablePositions(container) {
  container.innerHTML = `
    <div class="lesson-container">
      <div class="lesson-header">
        <h1>${t('l3Title')}</h1>
        <p>${t('l3Subtitle')}</p>
      </div>

      <div class="poker-table-wrapper">
        <div class="poker-table">
          <div class="community-cards">
            ${renderCard('T', 'h', { size: 'small', faceDown: true })}
            ${renderCard('T', 'h', { size: 'small', faceDown: true })}
            ${renderCard('T', 'h', { size: 'small', faceDown: true })}
            ${renderCard('T', 'h', { size: 'small', faceDown: true })}
            ${renderCard('T', 'h', { size: 'small', faceDown: true })}
          </div>

          <div class="table-position pos-bottom">
            <div class="position-label" style="background:var(--gold);color:#000;">
              <span class="dealer-btn" style="display:inline;background:none;border:none;font-size:0.7rem;width:auto;height:auto;">D</span>
              ${t('l3Dealer').split('（')[0]}
            </div>
            <div class="position-cards">
              ${renderCard('A', 's', { size: 'small' })}
              ${renderCard('K', 'h', { size: 'small' })}
            </div>
          </div>

          <div class="table-position pos-bottom-right">
            <div class="position-label" style="background:rgba(231,76,60,0.8);">SB</div>
          </div>

          <div class="table-position pos-right">
            <div class="position-label" style="background:rgba(52,152,219,0.8);">BB</div>
          </div>

          <div class="table-position pos-top-right">
            <div class="position-label">UTG</div>
          </div>

          <div class="table-position pos-top">
            <div class="position-label">MP</div>
          </div>

          <div class="table-position pos-top-left">
            <div class="position-label">CO</div>
          </div>
        </div>
      </div>

      <div class="lesson-section mt-3">
        <h2>📍 ${t('l3PositionsTitle')}</h2>

        <div class="info-box tip">
          <h4>🟡 ${t('l3Dealer')}</h4>
          <p>${t('l3DealerDesc')}</p>
        </div>

        <div class="info-box warning">
          <h4>🔴 ${t('l3SB')}</h4>
          <p>${t('l3SBDesc')}</p>
        </div>

        <div class="info-box" style="border-left:4px solid #3498db;">
          <h4>🔵 ${t('l3BB')}</h4>
          <p>${t('l3BBDesc')}</p>
        </div>
      </div>

      <div class="lesson-section">
        <h2>💡 ${t('l3AdvantageTitle')}</h2>
        <p>${t('l3AdvantageDesc')}</p>
      </div>

      ${renderNavButtons(3)}
    </div>
  `;
}

// ---------- Lesson 4: Game Flow ----------
function renderGameFlow(container) {
  const stages = [
    { key: 'Preflop', icon: '🃏' },
    { key: 'Flop', icon: '3️⃣' },
    { key: 'Turn', icon: '4️⃣' },
    { key: 'River', icon: '5️⃣' },
    { key: 'Showdown', icon: '🏆' },
  ];

  const flowHTML = stages.map((s, i) => `
    <div class="flow-step ${i === 0 ? 'active' : ''}" data-step="${i}" onclick="window.app.setFlowStep(${i})">
      <div class="step-icon">${s.icon}</div>
      <div class="step-title">${t('l4' + s.key)}</div>
      <div class="step-desc">${t('l4' + s.key + 'Desc')}</div>
    </div>
  `).join('');

  const detailsHTML = stages.map((s, i) => `
    <div class="lesson-section flow-detail" id="flow-detail-${i}" style="${i !== 0 ? 'display:none' : ''}">
      <h2>${stages[i].icon} ${t('l4Detail' + s.key)}</h2>
      <p>${t('l4Detail' + s.key + 'Text')}</p>
      ${i === 0 ? `
        <div class="card-container mt-2">
          ${renderCard('A', 's', { animated: true, delay: 0 })}
          ${renderCard('K', 'h', { animated: true, delay: 0.15 })}
          <span style="font-size:2rem;color:var(--text-muted);display:flex;align-items:center;padding:0 1rem;">← ${getLang() === 'zh' ? '你的底牌' : 'Your hole cards'}</span>
        </div>
      ` : ''}
      ${i === 1 ? `
        <div class="card-container mt-2">
          ${renderCard('T', 'h', { animated: true, delay: 0 })}
          ${renderCard('7', 'd', { animated: true, delay: 0.15 })}
          ${renderCard('2', 's', { animated: true, delay: 0.3 })}
        </div>
      ` : ''}
      ${i === 2 ? `
        <div class="card-container mt-2">
          ${renderCard('T', 'h')} ${renderCard('7', 'd')} ${renderCard('2', 's')}
          ${renderCard('J', 'h', { animated: true, highlighted: true })}
        </div>
      ` : ''}
      ${i === 3 ? `
        <div class="card-container mt-2">
          ${renderCard('T', 'h')} ${renderCard('7', 'd')} ${renderCard('2', 's')} ${renderCard('J', 'h')}
          ${renderCard('Q', 's', { animated: true, highlighted: true })}
        </div>
      ` : ''}
      ${i === 4 ? `
        <div class="info-box success mt-2">
          <h4>🏆 ${t('l4BestHand')}</h4>
          <p>${t('l4BestHandDesc')}</p>
        </div>
      ` : ''}
    </div>
  `).join('');

  container.innerHTML = `
    <div class="lesson-container">
      <div class="lesson-header">
        <h1>${t('l4Title')}</h1>
        <p>${t('l4Subtitle')}</p>
      </div>

      <div class="flow-steps">${flowHTML}</div>
      ${detailsHTML}

      ${renderNavButtons(4)}
    </div>
  `;
}

// ---------- Lesson 5: Betting Actions ----------
function renderBettingActions(container) {
  const actions = [
    { key: 'Fold', icon: '🚫', color: 'var(--red)' },
    { key: 'Check', icon: '✋', color: 'var(--text-secondary)' },
    { key: 'Call', icon: '📞', color: 'var(--felt-light)' },
    { key: 'Raise', icon: '⬆️', color: 'var(--gold)' },
    { key: 'AllIn', icon: '🔥', color: '#e74c3c' },
  ];

  const actionsHTML = actions.map(a => `
    <div class="action-card">
      <h3><span style="color:${a.color}">${a.icon}</span> ${t('l5' + a.key)}</h3>
      <p>${t('l5' + a.key + 'Desc')}</p>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="lesson-container">
      <div class="lesson-header">
        <h1>${t('l5Title')}</h1>
        <p>${t('l5Subtitle')}</p>
      </div>

      <div class="action-grid">
        ${actionsHTML}
      </div>

      <div class="info-box tip mt-3">
        <h4>💡 ${t('l5TipTitle')}</h4>
        <p>${t('l5TipText')}</p>
      </div>

      ${renderNavButtons(5)}
    </div>
  `;
}

// ---------- Lesson 6: Practice Game ----------
function renderPractice(container, app) {
  container.innerHTML = `
    <div class="lesson-container">
      <div class="lesson-header">
        <h1>${t('l6Title')}</h1>
        <p>${t('l6Subtitle')}</p>
      </div>

      <div class="practice-wrapper" id="practice-game">
        <div id="game-content"></div>
      </div>

      ${renderNavButtons(6)}
    </div>
  `;

  // Initialize game
  if (!app.game || app.game.finished) {
    app.startNewHand();
  }
  app.renderGame();
}

// ========== Practice Game Logic ==========

export class PokerGame {
  constructor(chips = 1000) {
    this.initialChips = chips;
    this.reset();
  }

  reset() {
    this.playerChips = this.initialChips;
    this.aiChips = this.initialChips;
    this.startNewHand();
  }

  setChips(amount) {
    this.initialChips = amount;
    this.playerChips = amount;
    this.aiChips = amount;
    this.startNewHand();
  }

  startNewHand() {
    // Check if either player is out of chips
    if (this.playerChips <= 0) this.playerChips = 0;
    if (this.aiChips <= 0) this.aiChips = 0;

    const deck = shuffleDeck(createDeck());
    this.playerCards = [deck[0], deck[1]];
    this.aiCards = [deck[2], deck[3]];
    this.communityCards = [];
    this.fullCommunity = [deck[4], deck[5], deck[6], deck[7], deck[8]];
    this.pot = 0;
    this.stage = 'preflop';
    this.playerBet = 0;
    this.aiBet = 0;
    this.currentBet = 0;
    this.finished = false;
    this.result = null;
    this.message = '';
    this.showHint = false;
    this.playerFolded = false;
    this.aiFolded = false;
    this.aiRaisedPending = false; // Track if AI raised and player needs to respond

    // Post blinds
    const sbAmount = Math.min(10, this.playerChips);
    const bbAmount = Math.min(20, this.aiChips);
    this.playerBet = sbAmount;
    this.aiBet = bbAmount;
    this.playerChips -= sbAmount;
    this.aiChips -= bbAmount;
    this.pot = sbAmount + bbAmount;
    this.currentBet = bbAmount;
  }

  getAvailableActions() {
    if (this.finished) return [];
    if (this.playerChips <= 0 && this.aiChips <= 0) return [];

    const toCall = this.currentBet - this.playerBet;
    const actions = ['fold'];

    if (toCall <= 0) {
      actions.push('check');
    } else {
      actions.push('call');
    }

    if (this.playerChips > toCall && this.playerChips > 0) {
      actions.push('raise');
    }

    if (this.playerChips > 0) {
      actions.push('allin');
    }

    return actions;
  }

  playerAction(action, raiseAmount = 0) {
    if (this.finished) return;

    const toCall = Math.max(0, this.currentBet - this.playerBet);
    this.aiRaisedPending = false;

    switch (action) {
      case 'fold':
        this.playerFolded = true;
        this.finished = true;
        this.result = 'lose';
        // AI gets the pot
        this.aiChips += this.pot;
        this.pot = 0;
        this.message = t('l6YouFolded');
        return;

      case 'check':
        this._doAITurnAndMaybeAdvance();
        return;

      case 'call': {
        const callAmt = Math.min(toCall, this.playerChips);
        this.playerChips -= callAmt;
        this.playerBet += callAmt;
        this.pot += callAmt;
        // After calling, bets are equal → AI gets a turn or we advance
        this._doAITurnAndMaybeAdvance();
        return;
      }

      case 'raise': {
        const raiseTotal = Math.min(toCall + raiseAmount, this.playerChips);
        this.playerChips -= raiseTotal;
        this.playerBet += raiseTotal;
        this.pot += raiseTotal;
        this.currentBet = this.playerBet;
        // After raise, AI must respond
        this._doAIResponse();
        return;
      }

      case 'allin': {
        const allInAmt = this.playerChips;
        this.pot += allInAmt;
        this.playerBet += allInAmt;
        this.playerChips = 0;
        this.currentBet = Math.max(this.currentBet, this.playerBet);
        // AI must respond to potential raise
        this._doAIResponse();
        return;
      }
    }
  }

  // After player checks or calls (bets are equal), AI can act then advance
  _doAITurnAndMaybeAdvance() {
    if (this.finished) return;

    // If both bets are equal already (player checked/called), let AI act
    const decision = aiDecision(
      this.aiCards, this.communityCards,
      this.pot, this.currentBet, this.aiBet,
      this.aiChips, this.stage
    );

    switch (decision.action) {
      case 'fold':
        this.aiFolded = true;
        this.finished = true;
        this.result = 'win';
        this.playerChips += this.pot;
        this.pot = 0;
        this.message = t('l6AIFolded');
        return;

      case 'check':
        // Both checked → advance stage
        this._advanceStage();
        return;

      case 'call': {
        const callAmt = Math.min(this.currentBet - this.aiBet, this.aiChips);
        this.aiChips -= callAmt;
        this.aiBet += callAmt;
        this.pot += callAmt;
        // Bets equal → advance
        this._advanceStage();
        return;
      }

      case 'raise': {
        const toCallAI = Math.max(0, this.currentBet - this.aiBet);
        const totalAmt = Math.min(toCallAI + (decision.amount || 20), this.aiChips);
        this.aiChips -= totalAmt;
        this.aiBet += totalAmt;
        this.pot += totalAmt;
        this.currentBet = this.aiBet;
        // AI raised → player must respond (do NOT advance)
        this.aiRaisedPending = true;
        this.message = t('l6AIRaised');
        return;
      }
    }
  }

  // After player raises/allins, AI responds then we advance
  _doAIResponse() {
    if (this.finished) return;

    const decision = aiDecision(
      this.aiCards, this.communityCards,
      this.pot, this.currentBet, this.aiBet,
      this.aiChips, this.stage
    );

    switch (decision.action) {
      case 'fold':
        this.aiFolded = true;
        this.finished = true;
        this.result = 'win';
        this.playerChips += this.pot;
        this.pot = 0;
        this.message = t('l6AIFolded');
        return;

      case 'call':
      case 'check': {
        const callAmt = Math.min(Math.max(0, this.currentBet - this.aiBet), this.aiChips);
        this.aiChips -= callAmt;
        this.aiBet += callAmt;
        this.pot += callAmt;
        // Bets equal → advance
        this._advanceStage();
        return;
      }

      case 'raise': {
        // AI re-raises → player must respond again
        const toCallAI = Math.max(0, this.currentBet - this.aiBet);
        const totalAmt = Math.min(toCallAI + (decision.amount || 20), this.aiChips);
        this.aiChips -= totalAmt;
        this.aiBet += totalAmt;
        this.pot += totalAmt;
        this.currentBet = this.aiBet;
        this.aiRaisedPending = true;
        this.message = t('l6AIRaised');
        return;
      }
    }
  }

  _advanceStage() {
    if (this.finished) return;

    // Reset bets for next round
    this.playerBet = 0;
    this.aiBet = 0;
    this.currentBet = 0;
    this.message = '';

    switch (this.stage) {
      case 'preflop':
        this.stage = 'flop';
        this.communityCards = this.fullCommunity.slice(0, 3);
        break;
      case 'flop':
        this.stage = 'turn';
        this.communityCards = this.fullCommunity.slice(0, 4);
        break;
      case 'turn':
        this.stage = 'river';
        this.communityCards = this.fullCommunity.slice(0, 5);
        break;
      case 'river':
        this.stage = 'showdown';
        this._doShowdown();
        break;
    }

    // If both are all-in, run remaining stages automatically
    if (!this.finished && this.playerChips <= 0 && this.aiChips <= 0) {
      this._runOutRemainingStages();
    }
  }

  _runOutRemainingStages() {
    while (!this.finished) {
      switch (this.stage) {
        case 'preflop':
          this.stage = 'flop';
          this.communityCards = this.fullCommunity.slice(0, 3);
          break;
        case 'flop':
          this.stage = 'turn';
          this.communityCards = this.fullCommunity.slice(0, 4);
          break;
        case 'turn':
          this.stage = 'river';
          this.communityCards = this.fullCommunity.slice(0, 5);
          break;
        case 'river':
          this.stage = 'showdown';
          this._doShowdown();
          return;
        default:
          return;
      }
    }
  }

  _doShowdown() {
    this.finished = true;
    this.communityCards = this.fullCommunity.slice(0, 5);

    const playerHand = evaluateHand([...this.playerCards, ...this.communityCards]);
    const aiHand = evaluateHand([...this.aiCards, ...this.communityCards]);

    const cmp = compareHands(playerHand, aiHand);
    const lang = getLang();
    const names = lang === 'zh' ? HAND_NAMES_ZH : HAND_NAMES_EN;

    this.playerHandName = names[playerHand.rank] || playerHand.name;
    this.aiHandName = names[aiHand.rank] || aiHand.name;

    if (cmp > 0) {
      this.result = 'win';
      this.playerChips += this.pot;
    } else if (cmp < 0) {
      this.result = 'lose';
      this.aiChips += this.pot;
    } else {
      this.result = 'tie';
      this.playerChips += Math.floor(this.pot / 2);
      this.aiChips += Math.ceil(this.pot / 2);
    }
    this.pot = 0;
  }

  getHint() {
    const strength = this.communityCards.length >= 3
      ? getHandStrength(this.playerCards, this.communityCards)
      : startingHandStrength(this.playerCards[0], this.playerCards[1]);

    if (this.stage === 'preflop') {
      if (strength > 65) return t('hintStrongPreflop');
      if (strength > 35) return t('hintMediumPreflop');
      return t('hintWeakPreflop');
    }

    if (strength > 55) return t('hintStrongHand');
    if (strength > 35) return t('hintDecentHand');
    if (strength > 20) return t('hintDrawHand');
    return t('hintWeakHand');
  }

  getStageName() {
    const stageKeys = {
      preflop: 'l6Preflop',
      flop: 'l6Flop',
      turn: 'l6Turn',
      river: 'l6River',
      showdown: 'l6Showdown',
    };
    return t(stageKeys[this.stage] || 'l6Preflop');
  }
}

// ========== Helper: Nav Buttons ==========

function renderNavButtons(lessonIndex) {
  const totalLessons = 7;
  return `
    <div class="lesson-nav">
      ${lessonIndex > 0 ? `
        <button class="btn btn-secondary" onclick="window.app.goToLesson(${lessonIndex - 1})">
          ← ${t('prev')}
        </button>
      ` : '<div></div>'}
      ${lessonIndex < totalLessons - 1 ? `
        <button class="btn btn-primary" onclick="window.app.goToLesson(${lessonIndex + 1})">
          ${t('next')} →
        </button>
      ` : '<div></div>'}
    </div>
  `;
}
