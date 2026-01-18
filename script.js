// Основные данные
const quizQuestions = [
    {
        question: "Что такое фосфаты в бытовой химии?",
        options: [
            "Питательные вещества для растений",
            "Соли фосфорной кислоты, смягчающие воду",
            "Натуральные эфирные масла",
            "Витаминные добавки для белья"
        ],
        correct: 1
    },
    {
        question: "Какой процент стиральных порошков содержит фосфаты?",
        options: [
            "10-20%",
            "30-40%",
            "50-60%",
            "70-80%"
        ],
        correct: 3
    },
    {
        question: "Как фосфаты влияют на кожу человека?",
        options: [
            "Увлажняют и питают",
            "Вызывают сухость и аллергию",
            "Защищают от солнца",
            "Не оказывают никакого влияния"
        ],
        correct: 1
    },
    {
        question: "Что такое эвтрофикация водоёмов?",
        options: [
            "Очищение воды",
            "Цветение водорослей из-за избытка фосфатов",
            "Образование льда",
            "Естественное старение озера"
        ],
        correct: 1
    },
    {
        question: "Какой знак гарантирует отсутствие фосфатов?",
        options: [
            "ISO 9001",
            "ECOCERT",
            "CE mark",
            "FCC"
        ],
        correct: 1
    }
];

// Глобальные переменные
let currentQuestionIndex = 0;
let userScore = 0;
let userAnswers = [];

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен');
    
    // Инициализация навигации
    initNavigation();
    
    // Инициализация слайдеров
    initSliders();
    
    // Инициализация чеклиста
    initChecklist();
    
    // Инициализация кнопок
    initButtons();
    
    // Инициализация викторины
    initQuiz();
    
    // Плавная прокрутка для навигации
    initSmoothScroll();
});

// Навигация
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Наблюдатель за секциями
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => observer.observe(section));
}

// Слайдеры
function initSliders() {
    const dangerSlider = document.getElementById('dangerSlider');
    const rinseSlider = document.getElementById('rinseSlider');
    const sliderValue = document.getElementById('sliderValue');
    const rinsePercent = document.getElementById('rinsePercent');
    
    if (dangerSlider && sliderValue) {
        dangerSlider.addEventListener('input', function() {
            const value = this.value;
            sliderValue.textContent = `${value}%`;
            
            // Меняем цвет текста в зависимости от значения
            if (value > 70) {
                sliderValue.style.color = '#c62828';
            } else if (value > 40) {
                sliderValue.style.color = '#f57c00';
            } else {
                sliderValue.style.color = '#2e7d32';
            }
        });
    }
    
    if (rinseSlider && rinsePercent) {
        rinseSlider.addEventListener('input', function() {
            const value = this.value;
            rinsePercent.textContent = `${value}%`;
            
            // Анимация изменения
            rinsePercent.style.transform = 'scale(1.2)';
            setTimeout(() => {
                rinsePercent.style.transform = 'scale(1)';
            }, 200);
        });
    }
}

// Чеклист
function initChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const printBtn = document.getElementById('printBtn');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.style.textDecoration = 'line-through';
                label.style.color = '#2e7d32';
                label.style.opacity = '0.7';
            } else {
                label.style.textDecoration = 'none';
                label.style.color = '';
                label.style.opacity = '1';
            }
        });
    });
    
    // Кнопка печати
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            const checklistContent = document.querySelector('.checklist-items').cloneNode(true);
            const checkboxes = checklistContent.querySelectorAll('input');
            checkboxes.forEach(cb => cb.remove());
            
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Чек-лист безопасности от фосфатов</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            h1 { color: #2e7d32; }
                            ul { list-style: none; padding: 0; }
                            li { padding: 10px; border-bottom: 1px solid #eee; }
                            .checked { text-decoration: line-through; color: #888; }
                            @media print { button { display: none; } }
                        </style>
                    </head>
                    <body>
                        <h1>Чек-лист безопасности от фосфатов</h1>
                        <ul>${checklistContent.innerHTML}</ul>
                        <button onclick="window.print()">🖨️ Печать</button>
                        <button onclick="window.close()">❌ Закрыть</button>
                    </body>
                </html>
            `);
            printWindow.document.close();
        });
    }
}

// Кнопки
function initButtons() {
    // Кнопки навигации викторины
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const retryBtn = document.getElementById('retryBtn');
    
    if (prevBtn) prevBtn.addEventListener('click', showPrevQuestion);
    if (nextBtn) nextBtn.addEventListener('click', showNextQuestion);
    if (retryBtn) retryBtn.addEventListener('click', resetQuiz);
    
    // Показать рецепты
    const recipeLinks = document.querySelectorAll('.alternatives');
    recipeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (e.target.tagName === 'I' || e.target.tagName === 'LI') {
                showRecipesModal();
            }
        });
    });
    
    // Закрытие модального окна
    const closeModalBtn = document.querySelector('.close-modal');
    const closeBtn = document.querySelector('.close-btn');
    
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('recipesModal');
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Викторина
function initQuiz() {
    displayQuestion();
}

function displayQuestion() {
    const questionData = quizQuestions[currentQuestionIndex];
    const questionElement = document.getElementById('quizQuestion');
    const optionsContainer = document.getElementById('quizOptions');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (!questionData || !questionElement || !optionsContainer) return;
    
    // Обновляем вопрос
    questionElement.textContent = questionData.question;
    
    // Обновляем прогресс
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    if (progressFill) progressFill.style.width = `${progress}%`;
    if (progressText) progressText.textContent = `Вопрос ${currentQuestionIndex + 1} из ${quizQuestions.length}`;
    
    // Очищаем варианты
    optionsContainer.innerHTML = '';
    
    // Добавляем новые варианты
    questionData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.textContent = option;
        
        // Проверяем, был ли уже выбран этот вариант
        if (userAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }
        
        optionElement.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Обновляем кнопки
    updateNavigationButtons();
}

function selectAnswer(answerIndex) {
    // Сохраняем ответ
    userAnswers[currentQuestionIndex] = answerIndex;
    
    // Снимаем выделение со всех вариантов
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Выделяем выбранный вариант
    document.querySelectorAll('.quiz-option')[answerIndex].classList.add('selected');
}

function showNextQuestion() {
    if (userAnswers[currentQuestionIndex] === undefined) {
        alert('Пожалуйста, выберите ответ!');
        return;
    }
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        showResults();
    }
}

function showPrevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentQuestionIndex === 0;
    }
    
    if (nextBtn) {
        const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
        nextBtn.innerHTML = isLastQuestion ? 
            'Завершить <i class="fas fa-check"></i>' : 
            'Далее <i class="fas fa-arrow-right"></i>';
    }
}

function showResults() {
    // Считаем правильные ответы
    userScore = 0;
    quizQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            userScore++;
        }
    });
    
    // Скрываем вопросы, показываем результаты
    document.querySelector('.quiz-progress').style.display = 'none';
    document.querySelector('.quiz-question').style.display = 'none';
    document.querySelector('.quiz-options').style.display = 'none';
    document.querySelector('.quiz-controls').style.display = 'none';
    
    const resultsElement = document.getElementById('quizResults');
    const scoreElement = document.getElementById('score');
    const messageElement = document.getElementById('resultMessage');
    
    if (resultsElement && scoreElement && messageElement) {
        resultsElement.style.display = 'block';
        scoreElement.textContent = `${userScore}/${quizQuestions.length}`;
        
        // Выбираем сообщение в зависимости от результата
        let message = '';
        if (userScore === quizQuestions.length) {
            message = 'Отлично! Ты настоящий эксперт по фосфатам! 🎯';
        } else if (userScore >= 3) {
            message = 'Хорошо! Ты разбираешься в теме! 👍';
        } else {
            message = 'Есть куда расти! Изучи материал ещё раз. 📚';
        }
        
        messageElement.textContent = message;
    }
}

function resetQuiz() {
    currentQuestionIndex = 0;
    userScore = 0;
    userAnswers = [];
    
    // Показываем вопросы, скрываем результаты
    document.querySelector('.quiz-progress').style.display = 'block';
    document.querySelector('.quiz-question').style.display = 'block';
    document.querySelector('.quiz-options').style.display = 'grid';
    document.querySelector('.quiz-controls').style.display = 'flex';
    document.getElementById('quizResults').style.display = 'none';
    
    displayQuestion();
}

// Модальное окно с рецептами
function showRecipesModal() {
    const modal = document.getElementById('recipesModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('recipesModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Простые звуковые эффекты (опционально)
function playSound(type) {
    // В реальном проекте можно добавить звуки
    console.log(`Воспроизведение звука: ${type}`);
}

// Экспорт для отладки
window.app = {
    currentQuestionIndex,
    userScore,
    showNextQuestion,
    showPrevQuestion,
    resetQuiz
};

console.log('Приложение готово!');
