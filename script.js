// Основные переменные
let currentTheme = 'light';
let soundEnabled = true;
let gameActive = false;
let gameTime = 60;
let gameTimer;
let foundPhosphates = 0;
let totalPhosphates = 5;
let gameScore = 0;
let currentCase = 0;
let quizScore = 0;
let moleculeRotation = 0;
let moleculeZoom = 1;

// Данные для игры
const products = [
    { name: "Порошок 'Чистота'", icon: "🧼", phosphate: true, ingredients: ["Фосфаты", "ПАВ", "Ароматизаторы"] },
    { name: "Мыло детское", icon: "🧴", phosphate: false, ingredients: ["Глицерин", "Масла", "Экстракты"] },
    { name: "Средство для посуды 'Блеск'", icon: "🍽️", phosphate: true, ingredients: ["Фосфаты", "SLS", "Консерванты"] },
    { name: "Гель для стирки 'Свежесть'", icon: "👕", phosphate: true, ingredients: ["Фосфаты", "Энзимы", "Отбеливатель"] },
    { name: "Ополаскиватель 'Нежность'", icon: "🌸", phosphate: false, ingredients: ["Кондиционер", "Эфирные масла"] },
    { name: "Пятновыводитель 'Сила'", icon: "🔴", phosphate: true, ingredients: ["Фосфаты", "Пероксид", "ПАВ"] },
    { name: "Мыло хозяйственное", icon: "🧽", phosphate: false, ingredients: ["Жиры", "Щёлочь", "Вода"] },
    { name: "Средство для ванной", icon: "🛁", phosphate: true, ingredients: ["Фосфаты", "Хлор", "ПАВ"] },
    { name: "Шампунь детский", icon: "👶", phosphate: false, ingredients: ["Пантенол", "Ромашка", "Без SLS"] },
    { name: "Кондиционер для белья", icon: "👚", phosphate: false, ingredients: ["Аромамасла", "Смягчитель"] },
    { name: "Отбеливатель 'Белизна'", icon: "⚪", phosphate: false, ingredients: ["Перкарбонат", "Активатор"] },
    { name: "Средство для окон", icon: "🪟", phosphate: false, ingredients: ["Спирт", "Аммиак", "Вода"] }
];

// Данные для викторины
const quizCases = [
    {
        number: 1,
        question: "После стирки новым порошком у ребёнка появилась сыпь. В составе обнаружены фосфаты. Ваши действия?",
        options: [
            "Продолжить использование, это аллергия на ткань",
            "Сменить порошок на бесфосфатный",
            "Уменьшить дозу порошка вдвое",
            "Добавить больше кондиционера"
        ],
        correct: 1,
        evidence: "Фосфаты разрушают защитный барьер кожи, особенно у детей."
    },
    {
        number: 2,
        question: "На этикетке средства для посуды указано: 'Sodium Phosphate'. Что это значит?",
        options: [
            "Натуральный экстракт",
            "Безопасная пищевая добавка",
            "Фосфатное соединение",
            "Витамин для очистки"
        ],
        correct: 2,
        evidence: "Sodium Phosphate — фосфат натрия, относится к фосфатным соединениям."
    },
    {
        number: 3,
        question: "Пруд возле дачи зацвёл зелёным цветом. Возможная причина?",
        options: [
            "Жаркая погода",
            "Сброс фосфатных удобрений",
            "Размножение лягушек",
            "Естественный процесс"
        ],
        correct: 1,
        evidence: "Фосфаты из удобрений вызывают эвтрофикацию — цветение водоёмов."
    },
    {
        number: 4,
        question: "Какой знак искать на упаковке, чтобы избежать фосфатов?",
        options: [
            "ECOCERT или Листок жизни",
            "Знак ISO",
            "Штрих-код",
            "Знак переработки"
        ],
        correct: 0,
        evidence: "ECOCERT и 'Листок жизни' гарантируют отсутствие фосфатов."
    },
    {
        number: 5,
        question: "Безопасная домашняя замена стирального порошка?",
        options: [
            "Хозяйственное мыло + сода",
            "Отбеливатель + кондиционер",
            "Шампунь + ополаскиватель",
            "Уксус + соль"
        ],
        correct: 0,
        evidence: "Хоз. мыло и сода эффективно очищают без вреда для здоровья."
    }
];

// Альтернативы фосфатным средствам
const alternatives = [
    "Стиральный порошок без фосфатов",
    "Эко-гель для посуды",
    "Мыльные орехи для стирки",
    "Сода + уксус для уборки",
    "Горчичный порошок для посуды",
    "Энзимные пятновыводители"
];

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initSound();
    initHouseInteraction();
    initSkinSlider();
    initRiverCanvas();
    initGame();
    initQuiz();
    initChecklist();
    initMoleculeViewer();
    initEventListeners();
    animateStats();
    updateScheme();
});

// Инициализация темы
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    document.getElementById('themeToggle').addEventListener('click', function() {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        playSound('click');
    });
}

function setTheme(theme) {
    currentTheme = theme;
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Управление звуком
function initSound() {
    const savedSound = localStorage.getItem('sound') || 'enabled';
    soundEnabled = savedSound === 'enabled';
    updateSoundIcon();
    
    document.getElementById('soundToggle').addEventListener('click', function() {
        soundEnabled = !soundEnabled;
        localStorage.setItem('sound', soundEnabled ? 'enabled' : 'disabled');
        updateSoundIcon();
        playSound('click');
    });
}

function updateSoundIcon() {
    const icon = document.querySelector('#soundToggle i');
    icon.className = soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
}

function playSound(type) {
    if (!soundEnabled) return;
    
    const sound = document.getElementById(type + 'Sound');
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Звук не воспроизведён:", e));
    }
}

// Анимация статистики
function animateStats() {
    animateCounter('stat1', 0, 78, 2000); // 78% средств с фосфатами
    animateCounter('stat2', 0, 34, 2500); // 34% заболеваний кожи
    animateCounter('stat3', 0, 65, 3000); // 65% водоёмов загрязнено
}

function animateCounter(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    let startTime = null;
    
    function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        const value = Math.floor(start + (end - start) * percentage);
        element.textContent = value + (elementId === 'stat1' ? '%' : '%');
        
        if (percentage < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end + (elementId === 'stat1' ? '%' : '%');
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Взаимодействие с домом
function initHouseInteraction() {
    const rooms = document.querySelectorAll('.room');
    
    rooms.forEach(room => {
        room.addEventListener('mouseenter', function() {
            const roomType = this.dataset.room;
            showRoomInfo(roomType);
            animateDots(this);
            playSound('click');
        });
        
        room.addEventListener('click', function() {
            const roomType = this.dataset.room;
            alert(getRoomAlert(roomType));
        });
    });
}

function showRoomInfo(roomType) {
    const info = {
        bathroom: "Ванная: стиральные порошки, гели для душа",
        kitchen: "Кухня: средства для посуды, чистящие средства",
        bedroom: "Спальня: постельное белье после стирки"
    };
    
    // Можно добавить всплывающую подсказку
    console.log(info[roomType]);
}

function animateDots(roomElement) {
    const dots = roomElement.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.style.animationDelay = `${index * 0.2}s`;
    });
}

function getRoomAlert(roomType) {
    const alerts = {
        bathroom: "🧴 В ванной чаще всего содержатся фосфаты в стиральных порошках и чистящих средствах. Проверьте состав!",
        kitchen: "🍽️ На кухне фосфаты прячутся в средствах для мытья посуды. Ищите надпись 'phosphate-free'.",
        bedroom: "🛏️ В спальне фосфаты могут оставаться на постельном белье после стирки. Тщательно полоскайте!"
    };
    return alerts[roomType];
}

// Слайдер кожи
function initSkinSlider() {
    const slider = document.getElementById('skinSlider');
    const valueDisplay = document.getElementById('skinValue');
    const damagedSkin = document.querySelector('.damaged');
    
    slider.addEventListener('input', function() {
        const value = this.value;
        valueDisplay.textContent = value + '%';
        
        // Анимация повреждения кожи
        const damagePercent = value + '%';
        damagedSkin.style.clipPath = `polygon(0 0, ${damagePercent} 0, ${damagePercent} 100%, 0% 100%)`;
        
        // Цвет текста в зависимости от значения
        if (value > 70) {
            valueDisplay.style.color = 'var(--danger)';
        } else if (value > 30) {
            valueDisplay.style.color = 'var(--warning)';
        } else {
            valueDisplay.style.color = 'var(--primary)';
        }
    });
}

// Канвас реки
function initRiverCanvas() {
    const canvas = document.getElementById('riverCanvas');
    const ctx = canvas.getContext('2d');
    let pollutionLevel = 0;
    let algae = [];
    
    // Инициализация водорослей
    for (let i = 0; i < 5; i++) {
        algae.push({
            x: Math.random() * canvas.width,
            y: canvas.height - 50 + Math.random() * 30,
            size: 5 + Math.random() * 10,
            growth: 0
        });
    }
    
    function drawRiver() {
        // Очистка канваса
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Рисуем реку
        ctx.fillStyle = pollutionLevel > 0 ? '#0d9488' : '#06b6d4';
        ctx.fillRect(0, canvas.height - 100, canvas.width, 100);
        
        // Волны
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(0, canvas.height - 80 + i * 10);
            ctx.bezierCurveTo(
                100, canvas.height - 85 + i * 10,
                200, canvas.height - 75 + i * 10,
                canvas.width, canvas.height - 80 + i * 10
            );
            ctx.stroke();
        }
        
        // Рыбы (меньше при загрязнении)
        const fishCount = Math.max(1, 5 - Math.floor(pollutionLevel / 20));
        for (let i = 0; i < fishCount; i++) {
            const x = (Date.now() / 1000 * 20 + i * 100) % (canvas.width + 50) - 50;
            const y = canvas.height - 60 + Math.sin(Date.now() / 1000 + i) * 10;
            drawFish(x, y);
        }
        
        // Водоросли (больше при загрязнении)
        algae.forEach(alga => {
            const maxSize = 20 + pollutionLevel / 2;
            alga.size = Math.min(alga.size + pollutionLevel / 100, maxSize);
            
            ctx.fillStyle = pollutionLevel > 0 ? '#84cc16' : '#10b981';
            ctx.beginPath();
            ctx.ellipse(alga.x, alga.y, alga.size, alga.size / 2, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Стебель
            ctx.fillStyle = '#065f46';
            ctx.fillRect(alga.x - 2, alga.y, 4, 50);
        });
        
        // Пузырьки воздуха (меньше при загрязнении)
        for (let i = 0; i < 10 - pollutionLevel / 10; i++) {
            const x = Math.random() * canvas.width;
            const y = canvas.height - 100 + (Date.now() / 100 + i * 50) % 100;
            const size = 2 + Math.random() * 3;
            
            ctx.fillStyle = `rgba(255, 255, 255, ${0.5 - pollutionLevel / 100})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Уровень загрязнения
        if (pollutionLevel > 0) {
            ctx.fillStyle = `rgba(132, 204, 22, ${pollutionLevel / 100})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height - 100);
            
            ctx.fillStyle = 'white';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`Загрязнение: ${Math.round(pollutionLevel)}%`, canvas.width / 2, 30);
        }
    }
    
    function drawFish(x, y) {
        ctx.fillStyle = pollutionLevel > 50 ? '#6b7280' : '#f59e0b';
        ctx.beginPath();
        ctx.ellipse(x, y, 15, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Хвост
        ctx.beginPath();
        ctx.moveTo(x - 15, y);
        ctx.lineTo(x - 25, y - 10);
        ctx.lineTo(x - 25, y + 10);
        ctx.closePath();
        ctx.fill();
        
        // Глаз
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(x + 8, y - 3, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Анимация
    function animate() {
        drawRiver();
        requestAnimationFrame(animate);
    }
    animate();
    
    // Обработчики кнопок
    document.getElementById('polluteRiver').addEventListener('click', function() {
        pollutionLevel = Math.min(100, pollutionLevel + 20);
        updateToxicity(pollutionLevel);
        playSound('click');
    });
    
    document.getElementById('cleanRiver').addEventListener('click', function() {
        pollutionLevel = 0;
        algae.forEach(alga => alga.size = 5 + Math.random() * 10);
        updateToxicity(0);
        playSound('success');
    });
}

function updateToxicity(level) {
    const fill = document.getElementById('toxicityFill');
    const value = document.querySelector('.toxicity-value');
    
    fill.style.width = level + '%';
    
    if (level > 70) {
        value.textContent = 'Очень высокая';
        value.style.color = 'var(--danger)';
    } else if (level > 40) {
        value.textContent = 'Средняя';
        value.style.color = 'var(--warning)';
    } else if (level > 10) {
        value.textContent = 'Низкая';
        value.style.color = 'var(--primary)';
    } else {
        value.textContent = 'Минимальная';
        value.style.color = 'var(--primary)';
    }
}

// Игра "Найди фосфаты"
function initGame() {
    generateProducts();
    
    document.getElementById('startGame').addEventListener('click', startGame);
    document.getElementById('resetGame').addEventListener('click', resetGame);
    document.getElementById('downloadChecklist').addEventListener('click', downloadChecklist);
}

function generateProducts() {
    const shelf = document.getElementById('shelf');
    shelf.innerHTML = '';
    
    // Перемешиваем продукты
    const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
    
    shuffledProducts.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.className = `product ${product.phosphate ? 'danger' : 'safe'}`;
        productElement.dataset.phosphate = product.phosphate;
        productElement.innerHTML = `
            <div class="product-icon">${product.icon}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-ingredients">${product.ingredients.join(', ')}</div>
        `;
        
        productElement.addEventListener('click', function() {
            if (!gameActive) return;
            
            const hasPhosphate = this.dataset.phosphate === 'true';
            
            if (hasPhosphate) {
                if (!this.classList.contains('selected')) {
                    this.classList.add('selected');
                    foundPhosphates++;
                    gameScore += 100;
                    updateGameStats();
                    playSound('success');
                    
                    if (foundPhosphates === totalPhosphates) {
                        endGame(true);
                    }
                }
            } else {
                this.style.borderColor = 'var(--danger)';
                gameScore = Math.max(0, gameScore - 50);
                updateGameStats();
                playSound('error');
                
                setTimeout(() => {
                    this.style.borderColor = '';
                }, 500);
            }
        });
        
        shelf.appendChild(productElement);
    });
}

function startGame() {
    gameActive = true;
    gameTime = 60;
    foundPhosphates = 0;
    gameScore = 0;
    
    document.getElementById('startGame').disabled = true;
    document.getElementById('gameResults').style.display = 'none';
    
    // Сброс всех продуктов
    document.querySelectorAll('.product').forEach(product => {
        product.classList.remove('selected');
    });
    
    updateGameStats();
    
    // Таймер
    gameTimer = setInterval(() => {
        gameTime--;
        updateGameStats();
        
        if (gameTime <= 0) {
            endGame(false);
        }
    }, 1000);
    
    playSound('click');
}

function resetGame() {
    clearInterval(gameTimer);
    gameActive = false;
    document.getElementById('startGame').disabled = false;
    generateProducts();
    updateGameStats();
}

function updateGameStats() {
    document.getElementById('gameTimer').textContent = gameTime;
    document.getElementById('gameFound').textContent = `${foundPhosphates}/${totalPhosphates}`;
    document.getElementById('gameScore').textContent = gameScore;
}

function endGame(won) {
    clearInterval(gameTimer);
    gameActive = false;
    document.getElementById('startGame').disabled = false;
    
    const results = document.getElementById('gameResults');
    const message = document.getElementById('gameMessage');
    const alternativesList = document.getElementById('alternativesList');
    
    results.style.display = 'block';
    
    if (won) {
        message.textContent = `Поздравляем! Вы нашли все фосфаты за ${60 - gameTime} секунд!`;
        message.style.color = 'var(--primary)';
        playSound('success');
    } else {
        message.textContent = `Время вышло! Вы нашли ${foundPhosphates} из ${totalPhosphates} фосфатов.`;
        message.style.color = 'var(--danger)';
        playSound('error');
    }
    
    // Показываем альтернативы
    alternativesList.innerHTML = '';
    alternatives.forEach(alt => {
        const li = document.createElement('li');
        li.textContent = alt;
        alternativesList.appendChild(li);
    });
}

function downloadChecklist() {
    const checklistContent = `
        ЧЕК-ЛИСТ БЕЗОПАСНОСТИ ОТ ФОСФАТОВ
        ==================================
        
        1. ПРОВЕРЬТЕ СРЕДСТВА:
        - Стиральные порошки
        - Средства для посуды
        - Чистящие средства
        
        2. ЧИТАЙТЕ СОСТАВ:
        Избегайте: Фосфаты, Sodium Phosphate, Potassium Phosphate
        
        3. ВЫБИРАЙТЕ ЗНАКИ:
        ✅ ECOCERT
        ✅ EU Ecolabel
        ✅ Листок жизни
        
        4. БЕЗОПАСНЫЕ АЛЬТЕРНАТИВЫ:
        ${alternatives.join('\n        ')}
        
        5. ДОМАШНИЕ СРЕДСТВА:
        - Сода + хозяйственное мыло
        - Уксус для ополаскивания
        - Горчичный порошок для посуды
        
        Сгенерировано на сайте "Фосфаты: невидимая угроза"
        ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([checklistContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'чеклист-без-фосфатов.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    playSound('click');
}

// Викторина
function initQuiz() {
    displayCase();
    
    document.getElementById('submitAnswer').addEventListener('click', checkAnswer);
    document.getElementById('retryQuiz').addEventListener('click', resetQuiz);
}

function displayCase() {
    const caseData = quizCases[currentCase];
    
    document.getElementById('caseNumber').textContent = caseData.number;
    document.getElementById('caseQuestion').textContent = caseData.question;
    document.getElementById('caseEvidence').textContent = `💡 Подсказка: ${caseData.evidence}`;
    
    const optionsContainer = document.getElementById('caseOptions');
    optionsContainer.innerHTML = '';
    
    caseData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'case-option';
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        
        optionElement.addEventListener('click', function() {
            document.querySelectorAll('.case-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
        });
        
        optionsContainer.appendChild(optionElement);
    });
    
    document.getElementById('quizCase').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
}

function checkAnswer() {
    const selectedOption = document.querySelector('.case-option.selected');
    
    if (!selectedOption) {
        alert('Выберите вариант ответа!');
        return;
    }
    
    const selectedIndex = parseInt(selectedOption.dataset.index);
    const correctIndex = quizCases[currentCase].correct;
    
    // Подсветка правильного/неправильного ответа
    document.querySelectorAll('.case-option').forEach((option, index) => {
        if (index === correctIndex) {
            option.style.borderColor = 'var(--primary)';
            option.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
        } else if (index === selectedIndex && index !== correctIndex) {
            option.style.borderColor = 'var(--danger)';
            option.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
        }
        option.style.pointerEvents = 'none';
    });
    
    if (selectedIndex === correctIndex) {
        quizScore++;
        playSound('success');
    } else {
        playSound('error');
    }
    
    // Переход к следующему вопросу или показ результатов
    setTimeout(() => {
        if (currentCase < quizCases.length - 1) {
            currentCase++;
            displayCase();
        } else {
            showQuizResults();
        }
    }, 2000);
}

function showQuizResults() {
    document.getElementById('quizCase').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    
    document.getElementById('quizScore').textContent = quizScore;
    
    const rankTitle = document.getElementById('rankTitle');
    if (quizScore === 5) {
        rankTitle.textContent = 'Звание: ЭЛИТНЫЙ ЭКО-ДЕТЕКТИВ 🕵️‍♂️';
        rankTitle.style.color = 'var(--warning)';
    } else if (quizScore >= 3) {
        rankTitle.textContent = 'Звание: СТАЖЁР ЭКО-ДЕТЕКТИВА 🔍';
        rankTitle.style.color = 'var(--primary)';
    } else {
        rankTitle.textContent = 'Звание: НАБЛЮДАТЕЛЬ 👀';
        rankTitle.style.color = 'var(--gray)';
    }
}

function resetQuiz() {
    currentCase = 0;
    quizScore = 0;
    displayCase();
    playSound('click');
}

// Чек-лист
function initChecklist() {
    document.getElementById('generateChecklist').addEventListener('click', generateChecklistPreview);
    document.getElementById('rinseBtn').addEventListener('click', simulateRinse);
}

function generateChecklistPreview() {
    const selectedRooms = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.dataset.room);
    
    let previewHTML = '<h4>Ваш чек-лист безопасности:</h4><ul>';
    
    selectedRooms.forEach(room => {
        const tasks = getRoomTasks(room);
        previewHTML += `<li><strong>${getRoomName(room)}:</strong><ul>`;
        tasks.forEach(task => {
            previewHTML += `<li>${task}</li>`;
        });
        previewHTML += '</ul></li>';
    });
    
    previewHTML += '</ul>';
    previewHTML += '<p><strong>Проверяйте составы, выбирайте эко-средства, берегите здоровье!</strong></p>';
    
    document.getElementById('checklistPreview').innerHTML = previewHTML;
    document.getElementById('checklistPreview').style.display = 'block';
    
    playSound('click');
}

function getRoomName(room) {
    const names = {
        kitchen: 'Кухня',
        bathroom: 'Ванная',
        laundry: 'Прачечная',
        kids: 'Детская'
    };
    return names[room] || room;
}

function getRoomTasks(room) {
    const tasks = {
        kitchen: [
            'Проверить средство для посуды на фосфаты',
            'Заменить чистящие порошки на соду',
            'Использовать уксус для удаления накипи'
        ],
        bathroom: [
            'Проверить стиральный порошок',
            'Заменить чистящие средства на лимонную кислоту',
            'Использовать эко-гели для душа'
        ],
        laundry: [
            'Выбрать бесфосфатный порошок',
            'Использовать температуру 60°C для полоскания',
            'Применять уксус вместо кондиционера'
        ],
        kids: [
            'Проверить детский порошок',
            'Использовать гипоаллергенные средства',
            'Двойное полоскание детских вещей'
        ]
    };
    return tasks[room] || ['Проверить все средства в комнате'];
}

function simulateRinse() {
    const water = document.getElementById('rinseWater');
    water.style.height = '100px';
    water.style.backgroundColor = 'var(--water-blue)';
    
    // Анимация полоскания
    let bubbles = 0;
    const bubbleInterval = setInterval(() => {
        water.innerHTML += '<div class="bubble" style="position:absolute;width:10px;height:10px;background-color:white;border-radius:50%;left:' + 
            (Math.random() * 90 + 5) + '%;top:' + (Math.random() * 80 + 10) + '%;"></div>';
        bubbles++;
        
        if (bubbles > 20) {
            clearInterval(bubbleInterval);
            setTimeout(() => {
                water.innerHTML = '';
                water.style.backgroundColor = '#22d3ee';
            }, 1000);
        }
    }, 100);
    
    playSound('click');
}

// Молекулярный вьювер
function initMoleculeViewer() {
    const modal = document.getElementById('moleculeModal');
    const closeBtn = document.querySelector('.close-modal');
    const openBtns = document.querySelectorAll('.molecule-viewer-btn');
    
    openBtns.forEach(btn => {
        btn.addEventListener('click', openMoleculeViewer);
    });
    
    closeBtn.addEventListener('click', closeMoleculeViewer);
    
    // Обработчики управления молекулой
    document.getElementById('rotateMolecule').addEventListener('click', rotateMolecule);
    document.getElementById('zoomIn').addEventListener('click', () => zoomMolecule(1.2));
    document.getElementById('zoomOut').addEventListener('click', () => zoomMolecule(0.8));
    
    // Рисуем начальную молекулу
    drawMolecule();
}

function openMoleculeViewer() {
    document.getElementById('moleculeModal').style.display = 'flex';
    playSound('click');
}

function closeMoleculeViewer() {
    document.getElementById('moleculeModal').style.display = 'none';
}

function drawMolecule() {
    const canvas = document.getElementById('moleculeCanvas');
    const ctx = canvas.getContext('2d');
    
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Центр канваса
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Фосфор (центральный атом)
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30 * moleculeZoom, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = `${20 * moleculeZoom}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('P', centerX, centerY);
        
        // Кислород (4 атома)
        const angles = [0, 90, 180, 270];
        angles.forEach(angle => {
            const rad = (angle + moleculeRotation) * Math.PI / 180;
            const x = centerX + Math.cos(rad) * 80 * moleculeZoom;
            const y = centerY + Math.sin(rad) * 80 * moleculeZoom;
            
            // Связь
            ctx.strokeStyle = '#6b7280';
            ctx.lineWidth = 4 * moleculeZoom;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();
            
            // Атом кислорода
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(x, y, 25 * moleculeZoom, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = 'white';
            ctx.font = `${18 * moleculeZoom}px Arial`;
            ctx.fillText('O', x, y);
        });
        
        // Заряд
        ctx.fillStyle = '#3b82f6';
        ctx.font = `${16 * moleculeZoom}px Arial`;
        ctx.fillText('3-', centerX, centerY + 50 * moleculeZoom);
    }
    
    render();
}

function rotateMolecule() {
    moleculeRotation = (moleculeRotation + 45) % 360;
    drawMolecule();
    playSound('click');
}

function zoomMolecule(factor) {
    moleculeZoom = Math.max(0.5, Math.min(3, moleculeZoom * factor));
    drawMolecule();
    playSound('click');
}

// Схема распространения
function updateScheme() {
    const steps = document.querySelectorAll('.scheme-step');
    let currentStep = 0;
    
    document.getElementById('playScheme').addEventListener('click', function() {
        this.disabled = true;
        
        const interval = setInterval(() => {
            steps.forEach(step => step.classList.remove('active'));
            steps[currentStep].classList.add('active');
            
            currentStep++;
            if (currentStep >= steps.length) {
                clearInterval(interval);
                this.disabled = false;
                steps.forEach(step => step.classList.remove('active'));
                steps[0].classList.add('active');
                currentStep = 0;
            }
        }, 800);
        
        playSound('click');
    });
}

// Органы тела
function initEventListeners() {
    // Начало расследования
    document.getElementById('startInvestigation').addEventListener('click', function() {
        document.getElementById('investigate').scrollIntoView({ behavior: 'smooth' });
        playSound('click');
    });
    
    // Клик по органам
    document.querySelectorAll('.organ').forEach(organ => {
        organ.addEventListener('click', function() {
            const organName = this.dataset.organ;
            const info = {
                stomach: 'Желудок: фосфаты могут нарушать всасывание минералов.',
                lungs: 'Лёгкие: вдыхание порошков с фосфатами раздражает дыхательные пути.',
                kidneys: 'Почки: выводят фосфаты, при избытке — нагрузка увеличивается.',
                liver: 'Печень: обезвреживает токсины, включая фосфатные соединения.'
            };
            
            alert(`🧬 ${organName.toUpperCase()}\n\n${info[organName]}`);
            playSound('click');
        });
    });
    
    // Печать гайда
    document.getElementById('printGuide').addEventListener('click', function(e) {
        e.preventDefault();
        window.print();
    });
    
    // Воспроизведение звуков при кликах
    document.querySelectorAll('button, .room, .product, .case-option').forEach(element => {
        element.addEventListener('click', function() {
            if (this.id !== 'soundToggle') {
                playSound('click');
            }
        });
    });
}

// Запуск анимации схемы при скролле
window.addEventListener('scroll', function() {
    const scheme = document.querySelector('.interactive-scheme');
    const schemePosition = scheme.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (schemePosition < screenPosition) {
        scheme.classList.add('animated');
    }
});
