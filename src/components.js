/**
 * components.js - Funciones Puras para la Vista
 */

export const createHeader = (title) => {
    return `
        <header class="header">
            <h1>${title}</h1>
            <p class="subtitle">Autoescuela de Sistemas - Panel de Control</p>
        </header>
    `;
};

export const createLanguageSelector = (currentLang) => {
    const langs = [
        { code: 'es', name: 'Castellano', flag: '🇪🇸' },
        { code: 'ca', name: 'Català', flag: '🇦🇩' },
        { code: 'en', name: 'English', flag: '🇬🇧' }
    ];

    const buttons = langs.map(lang => `
        <button class="lang-btn ${lang.code === currentLang ? 'active' : ''}" data-lang="${lang.code}">
            <span>${lang.flag}</span> ${lang.name}
        </button>
    `).join('');

    return `
        <div class="language-selector">
            ${buttons}
        </div>
    `;
};

export const createLanding = (t, currentLang) => {
    return `
        <div class="landing-container card">
            ${createLanguageSelector(currentLang)}
            <div class="hero-icon">🚀</div>
            <h2>${t.welcome}</h2>
            <p style="text-align: center; color: var(--text-muted); margin-bottom: 2rem; line-height: 1.6;">
                ${t.desc}
            </p>
            <div style="display: flex; flex-direction: column; gap: 1rem; width: 100%;">
                <button id="start-app-btn" class="btn-primary">${t.start}</button>
                <p style="text-align: center; font-size: 0.75rem; color: var(--text-muted);">
                    ${t.footer}
                </p>
            </div>
        </div>
    `;
};

/**
 * Crea el Menú Principal con selección de exámenes
 */
export const createRanking = (rankingData, t) => {
    const rankingRows = rankingData.map((user, index) => `
        <div class="ranking-item ${index === 0 ? 'top-1' : ''}">
            <div class="ranking-pos">${index + 1}º</div>
            <div class="ranking-name">${user.name}</div>
            <div class="ranking-score">${user.score}/${user.total}</div>
        </div>
    `).join('');

    return `
        <div class="ranking-section">
            <h3 style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                🏆 ${t.ranking_title}
            </h3>
            <div class="ranking-list">
                ${rankingRows}
            </div>
        </div>
    `;
};

export const createMenu = (data, t) => {
    const examCards = data.exams.map(exam => `
        <div class="exam-card" data-id="${exam.id}">
            <div class="exam-icon">${exam.icon}</div>
            <div class="exam-info">
                <h3>${exam.title}</h3>
                <p>${exam.description}</p>
            </div>
            <div class="exam-meta">${exam.questions.length} ${t.questions_count}</div>
        </div>
    `).join('');

    return `
        <div class="menu-container">
            <div class="dashboard-grid">
                <div class="card main-card">
                    <h2>${t.choose}</h2>
                    <p class="question-text">${t.choose_desc}</p>
                    <div class="exams-grid">
                        ${examCards}
                    </div>
                    <div class="menu-actions" style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
                        <button id="view-history-btn" class="btn-secondary" style="flex: 1; min-width: 200px;">${t.history_btn}</button>
                        <button id="back-home-btn" class="btn-secondary" style="flex: 1; min-width: 200px;">🏠 ${t.back_home}</button>
                    </div>
                </div>
                
                <aside class="card side-card">
                    ${createRanking(data.ranking, t)}
                </aside>
            </div>
        </div>
    `;
};

export const createProgressBar = (current, total, t) => {
    const percentage = (current / total) * 100;
    return `
        <div class="progress-container">
            <div class="progress-fill" style="width: ${percentage}%"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">
            <span>${t.question_label} ${current + 1} ${t.of} ${total}</span>
            <span>${Math.round(percentage)}%</span>
        </div>
    `;
};

export const createQuestionCard = (questionData, t) => {
    const { question, options, category } = questionData;
    const optionsHTML = options.map((option, index) => `
        <button class="option-btn" data-index="${index}">
            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
            <span class="option-text">${option}</span>
        </button>
    `).join('');

    return `
        <article class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <div class="category-badge">${category}</div>
                <button id="exit-exam-btn" class="btn-exit" title="${t.exit_title}">
                    <span class="exit-icon">🚪</span>
                    <span class="exit-text">${t.exit_label}</span>
                </button>
            </div>
            <h2 class="question-text">${question}</h2>
            <div class="options-grid">
                ${optionsHTML}
            </div>
        </article>
    `;
};

export const createResultsView = (score, total, examTitle, t) => {
    const percentage = (score / total) * 100;
    let icon = percentage >= 50 ? "🎉" : "💪";
    
    return `
        <div class="card results-header">
            <div class="hero-icon">${icon}</div>
            <h2>${t.exam_finished}</h2>
            <p style="color: var(--text-muted); margin-bottom: 1rem;">${examTitle}</p>
            <div class="score-circle">
                <span class="score-num">${score}</span>
                <span class="score-total">${t.of} ${total}</span>
            </div>
            <div class="results-actions">
                <button id="back-menu-btn" class="btn-primary">${t.back_menu}</button>
            </div>
        </div>
    `;
};

/**
 * Crea la Vista de Historial / Resumen
 */
export const createHistoryView = (history, t) => {
    const historyRows = history.length > 0 
        ? history.map(item => `
            <div class="history-item">
                <div class="history-main">
                    <span class="history-icon">${item.icon}</span>
                    <div class="history-details">
                        <strong>${item.title}</strong>
                        <small>${item.date}</small>
                    </div>
                </div>
                <div class="history-score ${item.score >= (item.total/2) ? 'pass' : 'fail'}">
                    ${item.score}/${item.total}
                </div>
            </div>
        `).reverse().join('')
        : `<p style="text-align: center; color: var(--text-muted); padding: 2rem;">${t.no_history}</p>`;

    return `
        <div class="card history-container">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h2>${t.your_history}</h2>
                <button id="close-history-btn" class="btn-icon">✖</button>
            </div>
            <div class="history-list">
                ${historyRows}
            </div>
            <div class="history-summary">
                <div class="summary-box">
                    <span class="summary-val">${history.length}</span>
                    <span class="summary-lab">${t.total}</span>
                </div>
                <div class="summary-box">
                    <span class="summary-val">${history.filter(h => h.score >= (h.total/2)).length}</span>
                    <span class="summary-lab">${t.passed}</span>
                </div>
            </div>
        </div>
    `;
};
