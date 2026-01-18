// Данные для викторины
const quizData = [
    {
        question: "Где чаще всего содержатся фосфаты?",
        options: [
            "В фруктах и овощах",
            "В бытовой химии",
            "В натуральных маслах",
            "В дистиллированной воде"
        ],
        correct: 1,
        explanation: "Правильно! Фосфаты активно добавляют в стиральные порошки, моющие средства и другую бытовую химию для смягчения воды."
    },
    {
        question: "Какой вред фосфаты наносят экологии?",
        options: [
            "Укрепляют почву",
            "Очищают воздух",
            "Вызывают цветение водоемов",
            "Помогают растениям"
        ],
        correct: 2,
        explanation: "Верно! Фосфаты приводят к эвтрофикации - бурному росту водорослей, что вызывает гибель рыбы и нарушение экобаланса."
    },
    {
        question: "Как обозначаются фосфаты в составе продуктов?",
        options: [
            "Буквой 'P' в круге",
            "Sodium Tripolyphosphate",
            "Aqua или Water",
            "Natural extract"
        ],
        correct: 1,
        explanation: "Правильно! Sodium Tripolyphosphate - одно из распространенных названий фосфатов в составе."
    },
    {
        question: "Какая безопасная альтернатива фосфатам?",
        options: [
            "Хлор",
            "Формальдегид",
            "Мыльные орехи",
            "Асбест"
        ],
        correct: 2,
        explanation: "Верно! Мыльные орехи - натуральное и безопасное средство для стирки без химии."
    },
    {
        question: "Почему фосфаты опасны для кожи?",
        options: [
            "Они питают кожу",
            "Увлажняют ее",
            "Усиливают проникновение ПАВ",
            "Защищают от солнца"
        ],
        correct: 2,
        explanation: "Правильно! Фосфаты разрушают защитный барьер кожи и усиливают проникновение вредных веществ."
    }
];

// Данные для фактов
const facts = [
    "В Европе использование фосфатов в бытовой химии запрещено с 2013 года, что снизило загрязнение водоемов на 50%!",
    "Один грамм фосфатов стимулирует рост 5-10 кг водорослей!",
    "Фосфаты могут накапливаться в организме и вызывать нарушения обмена кальция.",
    "Детская одежда, постиранная порошком с фосфатами, может вызывать аллергию у 80% детей.",
    "Натуральные средства для уборки (сода, уксус) дешевле и эффективнее химических аналогов.",
    "При полоскании фосфаты удаляются только на 40-50%, остальное остается на вещах.",
    "Производители добавляют фосфаты, потому что это самый дешевый способ смягчения воды.",
    "В России предельно допустимая концентрация фосфатов выше, чем в Европе в 3-5 раз."
];

// Переменные викторины
let currentQuestion = 0;
let score = 0;

// Функции для плавной прокрутки
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Викторина
function checkAnswer(button, answer) {
    const questionData = quizData[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('next-question');
    
    // Отключаем все кнопки
    options.forEach(opt => {
        opt.disabled = true;
        opt.style.cursor = 'not-allowed';
    });
    
    // Проверяем ответ
    if (answer === String.fromCharCode(65 + questionData.correct)) {
        button.classList.add('correct');
        score++;
        feedback.innerHTML = `<div style="color: #2ecc71;"><i class="fas fa-check-circle"></i> ${questionData.explanation}</div>`;
    } else {
        button.classList.add('wrong');
        // Показываем правильный ответ
        options[questionData.correct].classList.add('correct');
        feedback.innerHTML = `<div style="color: #e74c3c;"><i class="fas fa-times-circle"></i> ${questionData.explanation}</div>`;
    }
    
    // Обновляем счет
    document.getElementById('score').textContent = score;
    
    // Показываем обратную связь и кнопку "Далее"
    feedback.style.display = 'block';
    nextBtn.style.display = 'flex';
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showQuizResults();
    }
}

function loadQuestion() {
    const questionData = quizData[currentQuestion];
    const questionElement = document.querySelector('.quiz-question h3');
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('next-question');
    
    // Загружаем вопрос
    questionElement.textContent = questionData.question;
    
    // Загружаем варианты ответов
    options.forEach((option, index) => {
        option.textContent = questionData.options[index];
        option.className = 'quiz-option';
        option.disabled = false;
        option.style.cursor = 'pointer';
        option.onclick = function() {
            checkAnswer(this, String.fromCharCode(65 + index));
        };
    });
    
    // Скрываем обратную связь и кнопку "Далее"
    feedback.style.display = 'none';
    nextBtn.style.display = 'none';
}

function showQuizResults() {
    const quizContainer = document.querySelector('.quiz-question');
    const percentage = (score / quizData.length) * 100;
    
    let message = '';
    let emoji = '';
    
    if (percentage === 100) {
        message = 'Отлично! Ты эксперт по фосфатам! 🎉';
        emoji = '🏆';
    } else if (percentage >= 70) {
        message = 'Хорошо! Ты много знаешь о фосфатах! 👍';
        emoji = '⭐';
    } else if (percentage >= 50) {
        message = 'Неплохо, но есть куда расти! 📚';
        emoji = '📖';
    } else {
        message = 'Попробуй еще раз и изучи информацию на сайте! 💪';
        emoji = '🎯';
    }
    
    quizContainer.innerHTML = `
        <h3>Викторина завершена!</h3>
        <div style="font-size: 4rem; margin: 1rem 0;">${emoji}</div>
        <p style="font-size: 1.2rem; margin-bottom: 1rem;">${message}</p>
        <p>Твой результат: <strong>${score} из ${quizData.length}</strong></p>
        <p>Это <strong>${percentage}%</strong> правильных ответов!</p>
        <button class="quiz-restart" onclick="restartQuiz()" style="margin-top: 2rem;">
            <i class="fas fa-redo"></i> Пройти еще раз
        </button>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('score').textContent = '0';
    loadQuestion();
}

// Факты
function showRandomFact() {
    const randomIndex = Math.floor(Math.random() * facts.length);
    document.getElementById('fact-text').textContent = facts[randomIndex];
}

// Поделиться проектом
function shareProject() {
    if (navigator.share) {
        navigator.share({
            title: 'Фосфаты: невидимая угроза',
            text: 'Узнай, как защитить себя и близких от фосфатов!',
            url: window.location.href
        });
    } else {
        // Альтернатива для браузеров без поддержки Web Share API
        navigator.clipboard.writeText(window.location.href);
        alert('Ссылка скопирована в буфер обмена! Поделись ею с друзьями! 📋');
    }
}

// Анимации при прокрутке
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами для анимации
    document.querySelectorAll('.card, .step, .effect-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем первый вопрос викторины
    loadQuestion();
    
    // Показываем случайный факт
    showRandomFact();
    
    // Инициализируем анимации
    initScrollAnimations();
    
    // Делаем навигацию активной при прокрутке
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
                link.style.color = 'var(--primary)';
            }
        });
    });
});

// Добавляем эффект параллакса для герой-секции
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * 0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});
