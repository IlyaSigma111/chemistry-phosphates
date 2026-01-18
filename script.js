// Основные переменные и константы
let currentTheme = 'light';
let currentQuestion = 0;
let quizScore = 0;
let toxicityLevel = 30;
let rinseLevel = 50;

// Данные для викторины
const quizData = [
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

// Сообщения для результатов теста
const resultMessages = [
    { min: 0, max: 2, message: "Нужно больше изучать тему! Перечитай материал ещё раз." },
    { min: 3, max: 3, message: "Неплохо! Но есть куда расти. Обрати внимание на вопросы с ошибками." },
    { min: 4, max: 4, message: "Отлично! Ты хорошо разбираешься в теме фосфатов." },
    { min: 5, max: 5, message: "Превосходно! Ты настоящий эксперт по экологической безопасности!" }
];

// Инициализация при полной загрузке страницы
window.addEventListener('load', function() {
    console.log('Страница полностью загружена');
    initAll();
});

// Основная функция инициализации
function initAll() {
    console.log('Инициализация начата');
    
    initTheme();
    initAnimations();
    initQuiz();
    initSliders();
    initButtons();
    initChecklist();
    initParallax();
    initScrollAnimations();
    
    console.log('Инициализация завершена');
}

// Инициализация темы
function initTheme() {
    // Проверяем сохранённую тему
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        setTheme(savedTheme);
    }
    
    // Обработчик кнопки темы
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
            playSound('click');
        });
    }
}

function setTheme(theme) {
    currentTheme = theme;
    document.body.classList.toggle('dark-theme', theme === 'dark');
    
    const icon = document.querySelector('#themeBtn i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Анимация перехода
    document.body.style.transition = 'all 0.5s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 500);
}

// Инициализация анимаций
function initAnimations() {
    // Анимация молекулы
    const atoms = document.querySelectorAll('.atom');
    atoms.forEach((atom, index) => {
        atom.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Анимация статистики
    const stats = document.querySelectorAll('.stat-value');
    stats.forEach(stat => {
        const value = parseInt(stat.textContent);
        stat.textContent = '0';
        animateCounter(stat, 0, value, 2000);
    });
    
    // Анимация токсичности
    updateToxicity();
    
    // Анимация водорослей и рыб
    const algae = document.querySelector('.algae');
    const fish = document.querySelector('.fish');
    
    if (algae) {
        setInterval(() => {
            algae.style.transform = `scale(${1 + Math.random() * 0.3})`;
        }, 2000);
    }
    
    if (fish) {
        setInterval(() => {
            fish.style.transform = `translateX(${Math.random() * 10 - 5}px)`;
        }, 1500);
    }
}

// Анимация счёта
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + (element.classList.contains('stat-value') ? '%' : '');
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Обновление уровня токсичности
function updateToxicity() {
    const fill = document.getElementById('toxicityFill');
    if (fill) {
        fill.style.width = `${toxicityLevel}%`;
        
        // Меняем цвет в зависимости от уровня
        if (toxicityLevel > 70) {
            fill.style.background = 'linear-gradient(90deg, var(--primary), var(--danger))';
        } else if (toxicityLevel > 40) {
            fill.style.background = 'linear-gradient(90deg, var(--primary), var(--warning))';
        } else {
            fill.style.background = 'linear-gradient(90deg, var(--primary), var(--secondary))';
        }
    }
}

// Инициализация слайдеров
function initSliders() {
    const toxicitySlider = document.getElementById('toxicitySlider');
    const rinseSlider = document.getElementById('rinseSlider');
    const rinseValue = document.getElementById('rinseValue');
    
    if (rinseSlider && rinseValue) {
        rinseSlider.addEventListener('input', function() {
            rinseLevel = this.value;
            rinseValue.textContent = rinseLevel + '%';
            
            // Анимация изменения
            rinseValue.style.transform = 'scale(1.2)';
            setTimeout(() => {
                rinseValue.style.transform = 'scale(1)';
            }, 200);
            
            // Эффект для демонстрации
            const water = document.querySelector('.clean-water');
            if (water) {
                const opacity = 0.3 + (rinseLevel / 100) * 0.7;
                water.style.opacity = opacity.toString();
            }
        });
    }
    
    // Автоматическое изменение токсичности
    setInterval(() => {
        toxicityLevel = 30 + Math.sin(Date.now() / 5000) * 20;
        updateToxicity();
    }, 100);
}

// Инициализация кнопок
function initButtons() {
    // Кнопка начала
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            animateButton(this);
            playSound('click');
        });
    }
    
    // Кнопка проверки этикетки
    const checkLabelBtn = document.getElementById('checkLabel');
    if (checkLabelBtn) {
        checkLabelBtn.addEventListener('click', function() {
            showLabelScanner();
            animateButton(this);
            playSound('click');
        });
    }
    
    // Кнопка рецептов
    const recipeBtn = document.getElementById('showRecipe');
    if (recipeBtn) {
        recipeBtn.addEventListener('click', function() {
            showRecipes();
            animateButton(this);
            playSound('click');
        });
    }
    
    // Кнопка печати
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            printChecklist();
            animateButton(this);
            playSound('click');
        });
    }
    
    // Закрытие модального окна
    const closeModalBtn = document.querySelector('.close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            closeModal();
            playSound('click');
        });
    }
    
    // Закрытие по клику вне модального окна
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('recipeModal');
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Анимация кнопки
function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
}

// Воспроизведение звука
function playSound(type) {
    // В реальном проекте здесь был бы звуковой файл
    console.log('Воспроизведение звука:', type);
}

// Сканер этикетки
function showLabelScanner() {
    const ingredients = document.querySelector('.ingredients');
    if (ingredients) {
        // Подсвечиваем опасные ингредиенты
        const badIngredients = ingredients.querySelectorAll('.bad');
        
        badIngredients.forEach(ingredient => {
            ingredient.style.animation = 'badPulse 0.5s ease 3';
            ingredient.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.5)';
            
            setTimeout(() => {
                ingredient.style.boxShadow = '';
            }, 1500);
        });
        
        // Показываем предупреждение
        setTimeout(() => {
            alert('⚠️ ВНИМАНИЕ!\n\nОбнаружены опасные компоненты:\n- Фосфаты\n- Sodium phosphate\n\nРекомендуем выбрать средство без этих ингредиентов.');
        }, 800);
    }
}

// Показать рецепты
function showRecipes() {
    const modal = document.getElementById('recipeModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Закрыть модальное окно
function closeModal() {
    const modal = document.getElementById('recipeModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Инициализация чек-листа
function initChecklist() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.style.textDecoration = 'line-through';
                label.style.opacity = '0.7';
                label.style.color = 'var(--primary)';
                
                // Анимация галочки
                this.parentElement.style.transform = 'translateX(10px)';
                setTimeout(() => {
                    this.parentElement.style.transform = '';
                }, 300);
            } else {
                label.style.textDecoration = '';
                label.style.opacity = '';
                label.style.color = '';
            }
        });
    });
}

// Печать чек-листа
function printChecklist() {
    const checklistContent = `
        ===================================
        ЧЕК-ЛИСТ БЕЗОПАСНОСТИ ОТ ФОСФАТОВ
        ===================================
        
        [ ] 1. Проверить все стиральные порошки в доме
        [ ] 2. Заменить средство для посуды на бесфосфатное
        [ ] 3. Купить перчатки для уборки
        [ ] 4. Рассказать семье о вреде фосфатов
        
        ===================================
        РЕКОМЕНДАЦИИ:
        - Читайте состав средств
        - Выбирайте эко-сертификаты
        - Используйте натуральные средства
        - Тщательно полоскайте
        
        Сгенерировано: ${new Date().toLocaleDateString()}
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Чек-лист безопасности от фосфатов</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        line-height: 1.6;
                    }
                    h1 {
                        color: #10b981;
                        text-align: center;
                    }
                    .checklist {
                        background: #f9fafb;
                        padding: 20px;
                        border-radius: 10px;
                        margin: 20px 0;
                    }
                    .tip {
                        background: #fef3c7;
                        padding: 15px;
                        border-radius: 5px;
                        margin-top: 20px;
                        font-style: italic;
                    }
                    @media print {
                        body { padding: 0; }
                        button { display: none; }
                    }
                </style>
            </head>
            <body>
                <h1>Чек-лист безопасности от фосфатов</h1>
                <div class="checklist">
                    <pre>${checklistContent}</pre>
                </div>
                <div class="tip">
                    <strong>Совет:</strong> Распечатайте этот чек-лист и повесьте на холодильник!
                </div>
                <button onclick="window.print()">🖨️ Печать</button>
                <button onclick="window.close()">❌ Закрыть</button>
            </body>
        </html>
    `);
    printWindow.document.close();
}

// Инициализация викторины
function initQuiz() {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const retryBtn = document.getElementById('retryBtn');
    
    if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
    if (prevBtn) prevBtn.addEventListener('click', prevQuestion);
    if (submitBtn) submitBtn.addEventListener('click', submitQuiz);
    if (retryBtn) retryBtn.addEventListener('click', resetQuiz);
    
    displayQuestion();
}

// Отображение вопроса
function displayQuestion() {
    const questionData = quizData[currentQuestion];
    if (!questionData) return;
    
    // Обновляем прогресс
    updateProgress();
    
    // Отображаем вопрос
    const questionElement = document.getElementById('quizQuestion');
    if (questionElement) {
        questionElement.textContent = questionData.question;
        questionElement.style.animation = 'fadeIn 0.5s ease';
    }
    
    // Отображаем варианты ответов
    const optionsContainer = document.getElementById('quizOptions');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        questionData.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            
            optionElement.addEventListener('click', function() {
                selectOption(this);
            });
            
            optionsContainer.appendChild(optionElement);
        });
    }
    
    // Обновляем кнопки навигации
    updateNavigationButtons();
}

// Обновление прогресса
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const currentQuestionElement = document.getElementById('currentQuestion');
    
    if (progressFill) {
        const progress = ((currentQuestion + 1) / quizData.length) * 100;
        progressFill.style.width = `${progress}%`;
    }
    
    if (currentQuestionElement) {
        currentQuestionElement.textContent = currentQuestion + 1;
    }
}

// Выбор варианта ответа
function selectOption(optionElement) {
    // Снимаем выделение со всех вариантов
    const allOptions = document.querySelectorAll('.quiz-option');
    allOptions.forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Выделяем выбранный вариант
    optionElement.classList.add('selected');
    
    // Анимация выбора
    optionElement.style.animation = 'fadeIn 0.3s ease';
}

// Следующий вопрос
function nextQuestion() {
    const selectedOption = document.querySelector('.quiz-option.selected');
    
    if (!selectedOption && currentQuestion < quizData.length - 1) {
        alert('Пожалуйста, выберите ответ!');
        return;
    }
    
    // Проверяем ответ, если выбран
    if (selectedOption) {
        const selectedIndex = parseInt(selectedOption.dataset.index);
        const isCorrect = selectedIndex === quizData[currentQuestion].correct;
        
        if (isCorrect) {
            quizScore++;
            selectedOption.classList.add('correct');
        } else {
            selectedOption.classList.add('wrong');
            // Подсвечиваем правильный ответ
            const correctOption = document.querySelector(`.quiz-option[data-index="${quizData[currentQuestion].correct}"]`);
            if (correctOption) {
                correctOption.classList.add('correct');
            }
        }
        
        // Блокируем дальнейший выбор
        const allOptions = document.querySelectorAll('.quiz-option');
        allOptions.forEach(opt => {
            opt.style.pointerEvents = 'none';
        });
    }
    
    // Переход к следующему вопросу или завершение
    setTimeout(() => {
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            displayQuestion();
        } else {
            showResults();
        }
    }, 1500);
    
    playSound('click');
}

// Предыдущий вопрос
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        playSound('click');
    }
}

// Обновление кнопок навигации
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentQuestion === 0;
    }
    
    if (nextBtn && submitBtn) {
        if (currentQuestion === quizData.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-flex';
        } else {
            nextBtn.style.display = 'inline-flex';
            submitBtn.style.display = 'none';
        }
    }
}

// Завершение теста
function submitQuiz() {
    showResults();
    playSound('click');
}

// Показать результаты
function showResults() {
    const quizContainer = document.querySelector('.quiz-container');
    const quizResults = document.getElementById('quizResults');
    const scoreElement = document.getElementById('score');
    const resultText = document.getElementById('resultText');
    
    if (quizContainer) quizContainer.style.display = 'none';
    if (quizResults) quizResults.style.display = 'block';
    
    if (scoreElement) {
        scoreElement.textContent = `${quizScore}/${quizData.length}`;
        scoreElement.style.animation = 'scorePop 0.5s ease';
    }
    
    if (resultText) {
        const message = resultMessages.find(m => quizScore >= m.min && quizScore <= m.max);
        resultText.textContent = message ? message.message : 'Спасибо за участие!';
    }
}

// Сброс викторины
function resetQuiz() {
    currentQuestion = 0;
    quizScore = 0;
    
    const quizContainer = document.querySelector('.quiz-container');
    const quizResults = document.getElementById('quizResults');
    
    if (quizContainer) quizContainer.style.display = 'block';
    if (quizResults) quizResults.style.display = 'none';
    
    displayQuestion();
    playSound('click');
}

// Параллакс эффект
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
}

// Анимации при скролле
function initScrollAnimations() {
    const elements = document.querySelectorAll('.card, .danger-card, .step-card, .point');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Инициализация с задержкой для стабильности
setTimeout(() => {
    console.log('Запуск анимаций...');
}, 100);

// Обработка ошибок
window.onerror = function(msg, url, line) {
    console.error('Ошибка:', msg, 'в строке', line);
    return true;
};

// Экспорт функций для отладки
window.app = {
    initAll,
    setTheme,
    nextQuestion,
    prevQuestion,
    resetQuiz,
    showRecipes,
    printChecklist
};

console.log('Приложение готово к работе!');
