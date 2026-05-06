import * as components from './components.js';

/**
 * app.js - Gestión de Múltiples Exámenes e Historial
 */

const state = {
    allExams: [],
    ranking: [],
    currentExam: null,
    currentIndex: 0,
    score: 0,
    isAnswered: false,
    view: 'home', // 'home', 'menu', 'test', 'results', 'history'
    lang: localStorage.getItem('userLang') || 'es',
    history: JSON.parse(localStorage.getItem('examHistory') || '[]')
};

const translations = {
    es: {
        welcome: "¡Bienvenido a la Autoescuela de Sistemas!",
        desc: "La plataforma definitiva para dominar tus exámenes de sistemas informáticos. Hardware, Redes, Linux y más, con tests interactivos diseñados para tu éxito.",
        start: "Entrar a los Exámenes",
        footer: "Prepárate para el futuro de la informática.",
        choose: "Elige tu desafío",
        choose_desc: "Selecciona un examen para comenzar o revisa tu historial.",
        history_btn: "📜 Ver Historial de Exámenes",
        questions_count: "Preguntas",
        confirm_exit: "¿Seguro que quieres salir del examen? No se guardará tu progreso.",
        back_menu: "Finalizar y Volver",
        exit_label: "Salir",
        back_home: "Volver al Inicio",
        question_label: "Pregunta",
        of: "de",
        exit_title: "Salir del examen",
        exam_finished: "¡Examen Finalizado!",
        your_history: "Tu Historial",
        no_history: "No hay exámenes realizados todavía.",
        total: "Total",
        passed: "Aprobados",
        ranking_title: "Ranking de Estudiantes"
    },
    ca: {
        welcome: "Benvingut a l'Autoescola de Sistemes!",
        desc: "La plataforma definitiva per dominar els teus exàmens de sistemes informàtics. Hardware, Xarxes, Linux i més, amb tests interactius dissenyats per al teu èxit.",
        start: "Entrar als Exàmens",
        footer: "Prepara't per al futur de la informàtica.",
        choose: "Tria el teu desafiament",
        choose_desc: "Selecciona un examen per començar o revisa el teu historial.",
        history_btn: "📜 Veure Historial d'Exàmens",
        questions_count: "Preguntes",
        confirm_exit: "Segur que vols sortir de l'examen? No es guardarà el teu progrés.",
        back_menu: "Finalitzar i Tornar",
        exit_label: "Sortir",
        back_home: "Tornar a l'Inici",
        question_label: "Pregunta",
        of: "de",
        exit_title: "Sortir de l'examen",
        exam_finished: "Examen Finalitzat!",
        your_history: "El Teu Historial",
        no_history: "No hi ha exàmens realitzats encara.",
        total: "Total",
        passed: "Aprovats",
        ranking_title: "Rànquing d'Estudiants"
    },
    en: {
        welcome: "Welcome to the Systems School!",
        desc: "The ultimate platform to master your computer systems exams. Hardware, Networks, Linux and more, with interactive tests designed for your success.",
        start: "Enter Exams",
        footer: "Prepare for the future of IT.",
        choose: "Choose your challenge",
        choose_desc: "Select an exam to start or check your history.",
        history_btn: "📜 View Exam History",
        questions_count: "Questions",
        confirm_exit: "Are you sure you want to exit the exam? Your progress will not be saved.",
        back_menu: "Finish and Return",
        exit_label: "Exit",
        back_home: "Back to Home",
        question_label: "Question",
        of: "of",
        exit_title: "Exit exam",
        exam_finished: "Exam Finished!",
        your_history: "Your History",
        no_history: "No exams completed yet.",
        total: "Total",
        passed: "Passed",
        ranking_title: "Student Ranking"
    }
};

const appContainer = document.getElementById('app');

async function init() {
    const dataFile = state.lang === 'es' ? 'data.json' : `data_${state.lang}.json`;
    try {
        const [examsRes, rankingRes] = await Promise.all([
            fetch(dataFile),
            fetch('ranking.json')
        ]);
        const examsData = await examsRes.json();
        const rankingData = await rankingRes.json();
        
        state.allExams = examsData.exams;
        state.ranking = rankingData.ranking;
        render();
    } catch (error) {
        console.error("Error cargando datos:", error);
    }
}

function render() {
    const t = translations[state.lang];
    appContainer.innerHTML = components.createHeader("Sistemas Pro");

    switch (state.view) {
        case 'home':
            appContainer.innerHTML += components.createLanding(t, state.lang, state.ranking);
            setupLandingListeners();
            break;
        case 'menu':
            appContainer.innerHTML += components.createMenu({ 
                exams: state.allExams
            }, t);
            setupMenuListeners();
            break;
        case 'test':
            renderTest();
            break;
        case 'results':
            renderResults();
            break;
        case 'history':
            appContainer.innerHTML += components.createHistoryView(state.history, t);
            setupHistoryListeners();
            break;
    }
}

function setupLandingListeners() {
    document.getElementById('start-app-btn').addEventListener('click', () => {
        state.view = 'menu';
        render();
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.lang = btn.dataset.lang;
            localStorage.setItem('userLang', state.lang);
            init(); // Recargar datos para el nuevo idioma
        });
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

    // Listener para volver al inicio
    document.getElementById('back-home-btn').addEventListener('click', () => {
        state.view = 'home';
        render();
    });
}

function renderTest() {
    const t = translations[state.lang];
    const { currentExam, currentIndex } = state;
    const question = currentExam.questions[currentIndex];
    
    appContainer.innerHTML += components.createProgressBar(currentIndex, currentExam.questions.length, t);
    appContainer.innerHTML += components.createQuestionCard(question, t);

    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', handleAnswer);
    });

    document.getElementById('exit-exam-btn').addEventListener('click', () => {
        if (confirm(translations[state.lang].confirm_exit)) {
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
    const t = translations[state.lang];
    appContainer.innerHTML += components.createResultsView(
        state.score, 
        state.currentExam.questions.length,
        state.currentExam.title,
        t
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
