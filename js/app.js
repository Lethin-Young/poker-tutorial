// ============================================
// Main Application Entry Point
// ============================================

import { translations, setLang, getLang, t, updateStaticTexts } from './i18n.js';
import { renderLesson, renderCardFromObj, PokerGame, renderCard } from './tutorial.js';
import { getHandStrength, startingHandStrength, displayRank, SUIT_SYMBOLS, isRed } from './poker.js';

class App {
  constructor() {
    this.currentLesson = 0;
    this.completedLessons = new Set();
    this.game = null;
    this.raiseAmount = 40;

    this.loadProgress();
    this.bindEvents();
    this.render();
  }

  // ========== State ==========

  loadProgress() {
    try {
      const saved = localStorage.getItem('poker-tutorial-progress');
      if (saved) {
        const data = JSON.parse(saved);
        this.currentLesson = data.currentLesson || 0;
        this.completedLessons = new Set(data.completedLessons || []);
        if (data.lang) {
          setLang(data.lang);
        }
      }
    } catch (e) { /* ignore */ }
  }

  saveProgress() {
    try {
      localStorage.setItem('poker-tutorial-progress', JSON.stringify({
        currentLesson: this.currentLesson,
        completedLessons: [...this.completedLessons],
        lang: getLang(),
      }));
    } catch (e) { /* ignore */ }
  }

  // ========== Events ==========

  bindEvents() {
    // Language toggle
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        setLang(lang);
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.render();
        this.saveProgress();
      });
    });

    // Set initial lang button state
    const currentLang = getLang();
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === currentLang);
    });
  }

  // ========== Navigation ==========

  goToLesson(index) {
    if (this.currentLesson >= 0 && this.currentLesson < 6) {
      this.completedLessons.add(this.currentLesson);
    }
    this.currentLesson = index;
    this.saveProgress();
    this.render();
    // Scroll to top
    document.getElementById('content-area')?.scrollTo(0, 0);
  }

  // ========== Rendering ==========

  render() {
    updateStaticTexts();
    this.renderSidebar();
    this.renderMobileNav();
    this.renderContent();
  }

  renderSidebar() {
    const list = document.getElementById('lesson-list');
    if (!list) return;

    const lessons = t('lessons');
    list.innerHTML = lessons.map((lesson, i) => {
      const isActive = i === this.currentLesson;
      const isCompleted = this.completedLessons.has(i);
      let cls = '';
      if (isActive) cls = 'active';
      else if (isCompleted) cls = 'completed';

      return `
        <li class="${cls}" onclick="window.app.goToLesson(${i})">
          <span class="lesson-icon">${isCompleted && !isActive ? '✓' : i}</span>
          <span>${lesson.icon} ${lesson.title}</span>
        </li>
      `;
    }).join('');
  }

  renderMobileNav() {
    let mobileNav = document.querySelector('.mobile-nav');
    if (!mobileNav) {
      mobileNav = document.createElement('div');
      mobileNav.className = 'mobile-nav';
      const main = document.getElementById('app-main');
      if (main) main.parentNode.insertBefore(mobileNav, main);
    }

    const lessons = t('lessons');
    mobileNav.innerHTML = lessons.map((lesson, i) => {
      const isActive = i === this.currentLesson;
      return `<div class="mobile-nav-item ${isActive ? 'active' : ''}" onclick="window.app.goToLesson(${i})">${lesson.icon} ${lesson.title}</div>`;
    }).join('');
  }

  renderContent() {
    const container = document.getElementById('content-area');
    if (!container) return;
    renderLesson(this.currentLesson, container, this);
  }

  // ========== Quiz Handler ==========

  handleQuiz(selectedIndex) {
    const correctIndex = t('l2QuizAnswer');
    const options = document.querySelectorAll('.quiz-option');
    const resultDiv = document.getElementById('quiz-result');

    options.forEach((opt, i) => {
      opt.style.pointerEvents = 'none';
      if (i === correctIndex) opt.classList.add('correct');
      if (i === selectedIndex && i !== correctIndex) opt.classList.add('wrong');
    });

    if (selectedIndex === correctIndex) {
      resultDiv.innerHTML = `<div class="quiz-result correct">✓ ${t('l2QuizCorrect')}</div>`;
    } else {
      resultDiv.innerHTML = `<div class="quiz-result wrong">✗ ${t('l2QuizWrong')}</div>`;
    }
  }

  // ========== Game Flow Step ==========

  setFlowStep(index) {
    document.querySelectorAll('.flow-step').forEach((el, i) => {
      el.classList.toggle('active', i === index);
    });
    document.querySelectorAll('.flow-detail').forEach((el, i) => {
      el.style.display = i === index ? '' : 'none';
    });
  }

  // ========== Practice Game ==========

  startNewHand() {
    if (!this.game) {
      this.game = new PokerGame();
    } else {
      this.game.startNewHand();
    }
    this.raiseAmount = 40;
  }

  renderGame() {
    const container = document.getElementById('game-content');
    if (!container) return;

    const g = this.game;
    if (!g) return;

    const strength = g.communityCards.length >= 3
      ? getHandStrength(g.playerCards, g.communityCards)
      : startingHandStrength(g.playerCards[0], g.playerCards[1]);

    const strengthColor = strength > 60 ? '#2ecc71' : strength > 35 ? '#f39c12' : '#e74c3c';

    // Game info bar with chip controls
    let html = `
      <div class="game-info-bar">
        <div class="chip-count">
          <span class="chip-icon">$</span>
          ${t('l6YourChips')}: <span class="text-gold">${g.playerChips}</span>
        </div>
        <div class="game-stage-label">${g.getStageName()}</div>
        <div class="chip-count">
          <span class="chip-icon">$</span>
          ${t('l6AIChips')}: <span class="text-gold">${g.aiChips}</span>
        </div>
      </div>
    `;

    // Chip reset controls
    html += `
      <div class="chip-controls">
        <button class="btn btn-secondary btn-sm" onclick="window.app.resetChips()">
          🔄 ${t('l6ResetChips')}
        </button>
        <div class="chip-custom-input">
          <input type="number" id="custom-chips" min="100" max="100000" step="100" value="${g.initialChips}" placeholder="${t('l6ChipsAmount')}">
          <button class="btn btn-primary btn-sm" onclick="window.app.setCustomChips()">
            ${t('l6SetChips')}
          </button>
        </div>
      </div>
    `;

    // === REDESIGNED TABLE: vertical layout with clear separation ===
    html += `<div class="practice-table-v2">`;

    // AI section
    html += `
      <div class="table-section ai-section">
        <div class="section-label">${t('l6AI')}</div>
        <div class="card-row">
          ${g.finished && !g.playerFolded && !g.aiFolded
            ? g.aiCards.map(c => renderCardFromObj(c, { animated: true })).join('')
            : `${renderCard('', '', { faceDown: true })} ${renderCard('', '', { faceDown: true })}`
          }
        </div>
        ${g.finished && g.aiHandName ? `<div class="hand-name">${g.aiHandName}</div>` : ''}
      </div>
    `;

    // Divider + Pot (clearly visible)
    html += `
      <div class="table-divider">
        <div class="pot-display">
          <span class="pot-label">${t('l6Pot')}</span>
          <span class="pot-amount">${g.pot}</span>
        </div>
      </div>
    `;

    // Community cards section (clearly separated horizontal row)
    html += `
      <div class="table-section community-section">
        <div class="section-label">${t('l6CommunityCards')}</div>
        <div class="community-card-row">
          ${[0,1,2,3,4].map(i => {
            if (i < g.communityCards.length) {
              return renderCardFromObj(g.communityCards[i], { animated: true, delay: i * 0.1 });
            } else {
              return '<div class="card-placeholder"></div>';
            }
          }).join('')}
        </div>
      </div>
    `;

    // Divider
    html += `<div class="table-divider-thin"></div>`;

    // Player section
    html += `
      <div class="table-section player-section">
        <div class="section-label">${t('l6You')}</div>
        <div class="card-row">
          ${g.playerCards.map(c => renderCardFromObj(c, { animated: true })).join('')}
        </div>
        ${!g.finished ? `
          <div class="strength-display">
            ${t('l6HandStrength')}
            <div class="hand-strength-bar">
              <div class="hand-strength-fill" style="width:${strength}%;background:${strengthColor}"></div>
            </div>
          </div>
        ` : ''}
        ${g.finished && g.playerHandName ? `<div class="hand-name">${g.playerHandName}</div>` : ''}
      </div>
    `;

    html += `</div>`; // close practice-table-v2

    // AI raise message
    if (g.aiRaisedPending && g.message) {
      html += `<div class="game-hint" style="border-color:var(--red);background:rgba(231,76,60,0.08);color:#e98b82;">
        <span class="hint-icon">⚠️</span> ${g.message}
      </div>`;
    }

    // Result or actions
    if (g.finished) {
      let resultText = '';
      let resultClass = '';
      if (g.result === 'win') { resultText = t('l6Win'); resultClass = 'text-green'; }
      else if (g.result === 'lose') { resultText = t('l6Lose'); resultClass = 'text-red'; }
      else { resultText = t('l6Tie'); resultClass = 'text-gold'; }

      html += `
        <div class="game-message">
          <div class="${resultClass}" style="font-size:1.5rem;margin-bottom:0.5rem">${resultText}</div>
          <div style="font-size:0.9rem;color:var(--text-secondary)">${g.message || ''}</div>
        </div>
        <div class="game-actions">
          <button class="btn btn-primary" onclick="window.app.newHandAndRender()">
            ${t('l6PlayAgain')}
          </button>
        </div>
      `;

      // Show congrats if first completion
      if (!this.completedLessons.has(6)) {
        this.completedLessons.add(6);
        this.saveProgress();
        html += `
          <div class="info-box success mt-3">
            <h4>${t('l6CongratsTutorial')}</h4>
            <p>${t('l6CongratsText')}</p>
          </div>
        `;
      }
    } else {
      const actions = g.getAvailableActions();
      const toCall = Math.max(0, g.currentBet - g.playerBet);

      html += `<div class="game-actions">`;
      if (actions.includes('fold')) {
        html += `<button class="btn btn-danger" onclick="window.app.gameAction('fold')">${t('l6Fold')}</button>`;
      }
      if (actions.includes('check')) {
        html += `<button class="btn btn-secondary" onclick="window.app.gameAction('check')">${t('l6Check')}</button>`;
      }
      if (actions.includes('call')) {
        html += `<button class="btn btn-success" onclick="window.app.gameAction('call')">${t('l6Call')} (${toCall})</button>`;
      }
      if (actions.includes('raise')) {
        html += `<button class="btn btn-primary" onclick="window.app.gameAction('raise')">${t('l6Raise')}</button>`;
      }
      if (actions.includes('allin')) {
        html += `<button class="btn btn-danger" onclick="window.app.gameAction('allin')" style="background:linear-gradient(135deg,#e74c3c,#c0392b)">${t('l6AllIn')} (${g.playerChips})</button>`;
      }
      html += `</div>`;

      // Raise slider
      if (actions.includes('raise')) {
        const minRaise = 20;
        const maxRaise = Math.max(minRaise, g.playerChips - toCall);
        html += `
          <div class="raise-slider-group">
            <input type="range" min="${minRaise}" max="${maxRaise}" value="${Math.min(this.raiseAmount, maxRaise)}"
              oninput="window.app.raiseAmount=parseInt(this.value);document.getElementById('raise-amt').textContent=this.value">
            <span class="raise-amount" id="raise-amt">${Math.min(this.raiseAmount, maxRaise)}</span>
          </div>
        `;
      }

      // Hint button
      html += `
        <div style="text-align:center;margin-top:0.8rem">
          <button class="btn btn-secondary" style="font-size:0.8rem" onclick="window.app.toggleHint()">
            💡 ${t('l6ShowHint')}
          </button>
        </div>
      `;

      if (g.showHint) {
        html += `<div class="game-hint"><span class="hint-icon">💡</span> ${g.getHint()}</div>`;
      }
    }

    container.innerHTML = html;
  }

  gameAction(action) {
    if (!this.game) return;
    this.game.playerAction(action, this.raiseAmount);
    this.renderGame();
  }

  resetChips() {
    if (!this.game) return;
    this.game.reset();
    this.raiseAmount = 40;
    this.renderGame();
  }

  setCustomChips() {
    const input = document.getElementById('custom-chips');
    if (!input) return;
    const amount = parseInt(input.value);
    if (isNaN(amount) || amount < 100) return;
    if (!this.game) {
      this.game = new PokerGame(amount);
    } else {
      this.game.setChips(amount);
    }
    this.raiseAmount = 40;
    this.renderGame();
  }

  newHandAndRender() {
    this.startNewHand();
    this.renderGame();
  }

  toggleHint() {
    if (!this.game) return;
    this.game.showHint = !this.game.showHint;
    this.renderGame();
  }
}

// Initialize
const app = new App();
window.app = app;
