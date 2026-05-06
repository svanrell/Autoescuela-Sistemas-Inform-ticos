import * as components from './components.js';

/**
 * app.js - Gestión de Múltiples Exámenes e Historial
 */

const state = {
    allExams: [],
    currentExam: null,
    currentIndex: 0,
    score: 0,
    isAnswered: false,
    view: 'home', // 'home', 'menu', 'test', 'results', 'history'
    history: JSON.parse(localStorage.getItem('examHistory') || '[]')
};

const appContainer = document.getElementById('app');

async function init() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        state.allExams = data.exams;
        render();
    } catch (error) {
        console.error("Error cargando datos:", error);
    }
}

function render() {
    appContainer.innerHTML = components.createHeader("Sistemas Pro");

    switch (state.view) {
        case 'home':
            appContainer.innerHTML += components.createLanding();
            setupLandingListeners();
            break;
        case 'menu':
            appContainer.innerHTML += components.createMenu({ exams: state.allExams });
            setupMenuListeners();
            break;
        case 'test':
            renderTest();
            break;
        case 'results':
            renderResults();
            break;
        case 'history':
            appContainer.innerHTML += components.createHistoryView(state.history);
            setupHistoryListeners();
            break;
    }
}

function setupLandingListeners() {
    document.getElementById('start-app-btn').addEventListener('click', () => {
        state.view = 'menu';
        render();
    });
}

function setupMenuListeners() {
    // Listener para tarjetas de examen
    const examCards = document.querySelectorAll('.exam-card');
    examCards.forEach(card => {
        card.addEventListener('click', () => {
            const examId = card.dataset.id;
            state.currentExam = state.allExams.find(e => e.id === examId);
            state.currentIndex = 0;
            state.score = 0;
            state.view = 'test';
            render();
        });
    });

    // Listener para historial
    document.getElementById('view-history-btn').addEventListener('click', () => {
        state.view = 'history';
        render();
    });
}

function renderTest() {
    const { currentExam, currentIndex } = state;
    const question = currentExam.questions[currentIndex];
    
    appContainer.innerHTML += components.createProgressBar(currentIndex, currentExam.questions.length);
    appContainer.innerHTML += components.createQuestionCard(question);

    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', handleAnswer);
    });

    document.getElementById('exit-exam-btn').addEventListener('click', () => {
        if (confirm('¿Seguro que quieres salir del examen? No se guardará tu progreso.')) {
            state.view = 'menu';
            render();
        }
    });
}

function handleAnswer(event) {
    if (state.isAnswered) return;
    
    state.isAnswered = true;
    const btn = event.currentTarget;
    const selected = parseInt(btn.dataset.index);
    const correct = state.currentExam.questions[state.currentIndex].correct;

    if (selected === correct) {
        state.score++;
        btn.classList.add('correct');
    } else {
        btn.classList.add('incorrect');
        document.querySelectorAll('.option-btn')[correct].classList.add('correct');
    }

    setTimeout(() => {
        state.currentIndex++;
        state.isAnswered = false;
        
        if (state.currentIndex >= state.currentExam.questions.length) {
            saveToHistory();
            state.view = 'results';
        }
        render();
    }, 1200);
}

function renderResults() {
    appContainer.innerHTML += components.createResultsView(
        state.score, 
        state.currentExam.questions.length,
        state.currentExam.title
    );
    
    document.getElementById('back-menu-btn').addEventListener('click', () => {
        state.view = 'menu';
        render();
    });
}

function setupHistoryListeners() {
    document.getElementById('close-history-btn').addEventListener('click', () => {
        state.view = 'menu';
        render();
    });
}

function saveToHistory() {
    const entry = {
        title: state.currentExam.title,
        icon: state.currentExam.icon,
        score: state.score,
        total: state.currentExam.questions.length,
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    state.history.push(entry);
    localStorage.setItem('examHistory', JSON.stringify(state.history));
}

init();
