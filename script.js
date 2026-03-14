/** 
 * ПРАКТИЧЕСКАЯ РАБОТА: BOM И ТАЙМЕРЫ
 * Все строки прокомментированы. Обоснования "ПОЧЕМУ?" добавлены к таймерам.
 */

// --- БЛОК 0: СМЕНА ТЕМЫ ---
const themeBtn = document.getElementById('theme-toggle'); // Получаем плавающую кнопку
themeBtn.onclick = () => { // Обработка клика
    const isDark = document.body.classList.toggle('dark-theme'); // Переключаем класс темы на body
    themeBtn.textContent = isDark ? '🌙' : '☀️'; // Меняем иконку (луна/солнце)
};

// --- ЗАДАНИЕ 1: СЕКУНДОМЕР ---
let seconds = 0; // Переменная счетчика секунд
let intervalId = null; // ID интервала (из подсказки ТЗ)
const display = document.getElementById("stopwatch-display"); // Дисплей вывода времени

function updateDisplay() { // Функция обновления текста на дисплее
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0"); // Часы
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0"); // Минуты
    const s = String(seconds % 60).padStart(2, "0"); // Секунды
    display.textContent = `${h}:${m}:${s}`; // Вывод в формате ЧЧ:ММ:СС
}

document.getElementById("stopwatch-start").onclick = () => { // Старт
    if (intervalId !== null) return; // Защита от двойного запуска (ТЗ стр. 6)
    // Использую setInterval, потому что нам нужно повторять инкремент строго каждую 1000мс
    intervalId = setInterval(() => { seconds++; updateDisplay(); }, 1000);
};

document.getElementById("stopwatch-stop").onclick = () => { // Стоп
    // Использую clearInterval здесь, так как необходимо прекратить выполнение функции интервала
    clearInterval(intervalId); intervalId = null; // Очистка ID
};

document.getElementById("stopwatch-reset").onclick = () => { // Сброс
    // clearInterval нужен для остановки процесса перед обнулением переменных (ТАБУ)
    clearInterval(intervalId); intervalId = null; seconds = 0; updateDisplay(); 
};

// --- ЗАДАНИЕ 2: ОБРАТНЫЙ ОТСЧЕТ ---
let timeLeft = 0; // Оставшееся время (из подсказки ТЗ)
let countdownId = null; // ID интервала (из подсказки ТЗ)
const cdInput = document.getElementById("countdown-input"); // Поле ввода
const cdDisplay = document.getElementById("countdown-display"); // Дисплей

document.getElementById("countdown-start").onclick = () => { // Запуск
    const val = parseInt(cdInput.value, 10); // Преобразование ввода в число
    if (isNaN(val) || val <= 0) { // Валидация ввода (ТЗ стр. 7)
        cdDisplay.textContent = "❌ Введите число > 0"; // Вывод ошибки текстом
        return;
    }
    if (countdownId !== null) clearInterval(countdownId); // Сброс старого таймера перед новым пуском
    timeLeft = val; // Установка времени
    // Использую setInterval, так как значение должно уменьшаться циклично раз в секунду
    countdownId = setInterval(() => {
        if (timeLeft <= 0) { // Конец отсчета
            // clearInterval обязателен при достижении нуля, чтобы остановить выполнение кода
            clearInterval(countdownId); countdownId = null; cdDisplay.textContent = "⌛ Время вышло!"; return;
        }
        timeLeft--; // Уменьшение счетчика
        const m = String(Math.floor(timeLeft / 60)).padStart(2, "0"); // Расчет минут
        const s = String(timeLeft % 60).padStart(2, "0"); // Расчет секунд
        cdDisplay.textContent = `${m}:${s}`; // Формат ММ:СС
    }, 1000);
};

document.getElementById("countdown-stop").onclick = () => { clearInterval(countdownId); countdownId = null; }; // Пауза
document.getElementById("countdown-reset").onclick = () => { // Сброс
    clearInterval(countdownId); countdownId = null; cdInput.value = ""; cdDisplay.textContent = "00:00"; 
};

// --- ЗАДАНИЕ 3: УВЕДОМЛЕНИЯ (Используем структуру из подсказки ТЗ стр. 8) ---
let showTimerId = null; // ID таймера задержки показа
let hideTimerId = null; // ID таймера автоматического скрытия
const toast = document.getElementById("notification"); // Элемент уведомления

document.getElementById("notification-show").onclick = () => { // Клик на кнопку
    // Согласно подсказке ТЗ: если нажали повторно — отменяем старый таймер запуска
    if (showTimerId !== null) clearTimeout(showTimerId); 
    
    // Использую setTimeout, так как уведомление должно появиться один раз спустя 3000мс
    showTimerId = setTimeout(() => {
        toast.style.display = "block"; // Показываем блок
        
        // Использую setTimeout для автоматического скрытия через 5 секунд после появления
        hideTimerId = setTimeout(() => { toast.style.display = "none"; }, 5000);
    }, 3000);
};

document.getElementById("notification-close").onclick = () => { // Закрытие вручную
    // Использую clearTimeout, чтобы отменить запланированное авто-скрытие, если юзер закрыл сам
    clearTimeout(hideTimerId); toast.style.display = "none"; // Прячем блок немедленно
};

// --- ЗАДАНИЕ 4: ИНФОРМАЦИЯ О БРАУЗЕРЕ (BOM) ---
const infoBlock = document.getElementById("browser-info"); // Ссылка на блок вывода

function displayBrowserInfo() { // Функция формирования списка
    // Определение типа устройства (регулярка из ТЗ стр. 9)
    const isMob = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    // Функция для короткого вывода декодированной строки (понятной пользователю)
    const formatShort = (str, len) => {
        const decoded = decodeURIComponent(str); // Декодируем (кириллица вместо %D0)
        return decoded.length > len ? decoded.substring(0, len) + "..." : decoded; // Обрезаем по лимиту
    };

    // Формируем HTML: только URL и Путь короткие, остальные - полные (ТЗ стр. 9)
    const info = `
        <ul>
            <li><strong>1. URL:</strong> <span>${formatShort(location.href, 30)}</span></li> <!-- КОРОТКИЙ И ДЕКОДИРОВАННЫЙ -->
            <li><strong>2. Протокол:</strong> <span>${location.protocol}</span></li> <!-- Полный -->
            <li><strong>3. Домен:</strong> <span>${location.hostname}</span></li> <!-- Полный -->
            <li><strong>4. Путь:</strong> <span>${formatShort(location.pathname, 20)}</span></li> <!-- КОРОТКИЙ И ДЕКОДИРОВАННЫЙ -->
            <li><strong>5. Язык:</strong> <span>${navigator.language}</span></li> <!-- Полный -->
            <li><strong>6. User Agent:</strong> <span>${navigator.userAgent.substring(0, 100)}...</span></li> <!-- Лимит 100 по ТЗ -->
            <li><strong>7. Статус:</strong> <span>${navigator.onLine ? "🟢 Онлайн" : "🔴 Офлайн"}</span></li> <!-- Полный -->
            <li><strong>8. Экран:</strong> <span>${screen.width} x ${screen.height}</span></li> <!-- Полный -->
            <li><strong>9. Окно:</strong> <span>${window.innerWidth} x ${window.innerHeight}</span></li> <!-- Полный -->
            <li><strong>10. Устройство:</strong> <span>${isMob ? "📱 Мобильное" : "💻 Десктоп"}</span></li> <!-- Полный -->
        </ul>`;
    infoBlock.innerHTML = info; // Вывод в DOM
}

document.getElementById("browser-info-btn").onclick = displayBrowserInfo; // Событие на кнопку
document.getElementById("browser-update-btn").onclick = displayBrowserInfo; // Событие на Обновить
window.addEventListener("resize", () => { if (infoBlock.innerHTML !== "") displayBrowserInfo(); }); // Обновление при ресайзе

// --- ЗАДАНИЕ 5: АВТОСОХРАНЕНИЕ ---
let autosaveId = null; // ID интервала (из подсказки ТЗ стр. 10)
const area = document.getElementById("autosave-textarea"); // Поле текста
const indicator = document.getElementById("autosave-indicator"); // Статус
const toggleBtn = document.getElementById("autosave-toggle"); // Кнопка управления

function saveToLS() { // Функция записи в localStorage
    const text = area.value.trim(); // Чтение данных без пробелов
    if (text === "") return; // Валидация: пустые строки не сохраняем (ТЗ стр. 10)
    localStorage.setItem("draft", text); // Сохранение под ключом "draft"
    indicator.textContent = `✅ Сохранено в ${new Date().toLocaleTimeString()}`; // Время сохранения
}

window.addEventListener("load", () => { // Восстановление при загрузке окна
    const saved = localStorage.getItem("draft"); // Поиск записи
    if (saved) { area.value = saved; indicator.textContent = "📄 Черновик восстановлен"; }
    // Использую setInterval для цикличного сохранения каждые 10 сек (10000мс) по ТЗ
    autosaveId = setInterval(saveToLS, 10000); 
});

toggleBtn.onclick = () => { // Обработчик кнопки управления интервалом
    if (autosaveId === null) { // Если выключено
        autosaveId = setInterval(saveToLS, 10000); // Запускаем
        toggleBtn.textContent = "Остановить автосохранение"; // Меняем текст
    } else { // Если включено
        // Использую clearInterval здесь, так как пользователь остановил процесс вручную
        clearInterval(autosaveId); autosaveId = null; toggleBtn.textContent = "Возобновить автосохранение";
    }
};

document.getElementById("autosave-clear").onclick = () => { // Очистка черновика
    localStorage.removeItem("draft"); area.value = ""; indicator.textContent = "🗑️ Удалено";
};

// --- ЗАДАНИЕ 6: POMODORO ---
let pTime = 25 * 60; // 25 минут в секундах
let pId = null; // ID интервала помидора

document.getElementById("pomo-start").onclick = () => { // Старт сессии
    if (pId !== null) return; // Защита от повторного запуска
    // Использую setInterval для отсчета времени помидора каждую секунду
    pId = setInterval(() => {
        if (pTime <= 0) { // Завершение сессии
            // clearInterval необходим в конце, чтобы остановить процесс отсчета
            clearInterval(pId); pId = null; pTime = 25 * 60; // Сброс
            document.getElementById("sessions-count").textContent = Number(document.getElementById("sessions-count").textContent) + 1;
            alert("🍅 Помидор завершен!"); return;
        }
        pTime--; // Уменьшение
        const m = String(Math.floor(pTime / 60)).padStart(2, "0"); // Мин
        const s = String(pTime % 60).padStart(2, "0"); // Сек
        document.getElementById("pomo-display").textContent = `${m}:${s}`; // Вывод
    }, 1000);
};

document.getElementById("pomo-pause").onclick = () => { clearInterval(pId); pId = null; }; // Пауза
document.getElementById("pomo-reset").onclick = () => { clearInterval(pId); pId = null; pTime = 25 * 60; document.getElementById("pomo-display").textContent = "25:00"; }; // Сброс





