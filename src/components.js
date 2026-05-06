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

/**
 * Crea el Menú Principal con selección de exámenes
 */
export const createMenu = (data) => {
    const examCards = data.exams.map(exam => `
        <div class="exam-card" data-id="${exam.id}">
            <div class="exam-icon">${exam.icon}</div>
            <div class="exam-info">
                <h3>${exam.title}</h3>
                <p>${exam.description}</p>
            </div>
            <div class="exam-meta">${exam.questions.length} Preguntas</div>
        </div>
    `).join('');

    return `
        <div class="menu-container">
            <div class="card main-card">
                <h2>Elige tu desafío</h2>
                <p class="question-text">Selecciona un examen para comenzar o revisa tu historial.</p>
                <div class="exams-grid">
                    ${examCards}
                </div>
                <button id="view-history-btn" class="btn-secondary">📜 Ver Historial de Exámenes</button>
            </div>
        </div>
    `;
};

export const createProgressBar = (current, total) => {
    const percentage = (current / total) * 100;
    return `
        <div class="progress-container">
            <div class="progress-fill" style="width: ${percentage}%"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">
            <span>Pregunta ${current + 1} de ${total}</span>
            <span>${Math.round(percentage)}%</span>
        </div>
    `;
};

export const createQuestionCard = (questionData) => {
    const { question, options, category } = questionData;
    const optionsHTML = options.map((option, index) => `
        <button class="option-btn" data-index="${index}">
            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
            <span class="option-text">${option}</span>
        </button>
    `).join('');

    return `
        <article class="card">
            <div class="category-badge">${category}</div>
            <h2 class="question-text">${question}</h2>
            <div class="options-grid">
                ${optionsHTML}
            </div>
        </article>
    `;
};

export const createResultsView = (score, total, examTitle) => {
    const percentage = (score / total) * 100;
    let icon = percentage >= 50 ? "🎉" : "💪";
    
    return `
        <div class="card results-header">
            <div class="hero-icon">${icon}</div>
            <h2>¡Examen Finalizado!</h2>
            <p style="color: var(--text-muted); margin-bottom: 1rem;">${examTitle}</p>
            <div class="score-circle">
                <span class="score-num">${score}</span>
                <span class="score-total">de ${total}</span>
            </div>
            <div class="results-actions">
                <button id="back-menu-btn" class="btn-primary">Finalizar y Volver</button>
            </div>
        </div>
    `;
};

/**
 * Crea la Vista de Historial / Resumen
 */
export const createHistoryView = (history) => {
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
        : `<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No hay exámenes realizados todavía.</p>`;

    return `
        <div class="card history-container">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h2>Tu Historial</h2>
                <button id="close-history-btn" class="btn-icon">✖</button>
            </div>
            <div class="history-list">
                ${historyRows}
            </div>
            <div class="history-summary">
                <div class="summary-box">
                    <span class="summary-val">${history.length}</span>
                    <span class="summary-lab">Total</span>
                </div>
                <div class="summary-box">
                    <span class="summary-val">${history.filter(h => h.score >= (h.total/2)).length}</span>
                    <span class="summary-lab">Aprobados</span>
                </div>
            </div>
        </div>
    `;
};
