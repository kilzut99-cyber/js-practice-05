// --- БЛОК 0: СМЕНА ТЕМЫ ---
const themeBtn = document.getElementById('theme-toggle'); // Получаем кнопку-переключатель темы
const checkAutoTheme = () => { // Функция автоматической настройки темы
    const hour = new Date().getHours(); // Получаем текущий час (0-23)
    const isNight = hour >= 21 || hour < 6; // Условие ночного времени (после 21 или до 6 утра)
    document.body.classList.toggle('dark-theme', isNight); // Включаем темную тему, если сейчас ночь
    themeBtn.textContent = isNight ? '🌙' : '☀️'; // Меняем иконку на луну или солнце
};
checkAutoTheme(); // Запускаем проверку темы сразу при загрузке скрипта
themeBtn.onclick = () => { // Обработка клика по кнопке темы
    const isDark = document.body.classList.toggle('dark-theme'); // Переключаем класс темы вручную
    themeBtn.textContent = isDark ? '🌙' : '☀️'; // Обновляем иконку кнопки
};

// --- ЗАДАНИЕ 1: СЕКУНДОМЕР (Структура из PDF стр. 3) ---
let seconds = 0; // Переменная для хранения общего количества секунд
let intervalId = null; // Переменная для хранения ID интервала (из подсказки в ТЗ)
const display = document.getElementById("stopwatch-display"); // Элемент для вывода времени

function updateDisplay() { // Функция обновления текста на экране
    const h = Math.floor(seconds / 3600); // Вычисляем полные часы
    const m = Math.floor((seconds % 3600) / 60); // Вычисляем полные минуты
    const s = seconds % 60; // Вычисляем остаток секунд
    // Форматируем вывод в ЧЧ:ММ:СС с добавлением нулей слева через padStart
    display.textContent = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

document.getElementById("stopwatch-start").onclick = () => { // Клик по кнопке "Старт"
    if (intervalId !== null) return; // Если таймер уже запущен, выходим (защита от двойного запуска)
    // Использую setInterval, потому что по ТЗ нужно обновлять время каждую 1000мс (1 секунду)
    intervalId = setInterval(() => {
        seconds++; // Увеличиваем счетчик секунд
        updateDisplay(); // Обновляем дисплей на странице
    }, 1000); // Установка интервала в 1 секунду
};

document.getElementById("stopwatch-stop").onclick = () => { // Клик по кнопке "Стоп"
    // Использую clearInterval здесь, так как нужно остановить процесс счета секунд
    clearInterval(intervalId);
    intervalId = null; // Важно: сбрасываем ID, чтобы кнопка "Старт" снова могла работать
};

document.getElementById("stopwatch-reset").onclick = () => { // Клик по кнопке "Сброс"
    clearInterval(intervalId); // Остановка таймера перед сбросом (обязательное требование ТАБУ)
    intervalId = null; // Очистка ID
    seconds = 0; // Обнуление переменной времени
    updateDisplay(); // Возврат дисплея в состояние 00:00:00
};

// --- ЗАДАНИЕ 2: ОБРАТНЫЙ ОТСЧЕТ (Структура из PDF стр. 3-4) ---
let timeLeft = 0; // Переменная для хранения оставшегося времени (из подсказки в ТЗ)
let countdownId = null; // ID интервала обратного отсчета (из подсказки в ТЗ)
const cdInput = document.getElementById("countdown-input"); // Поле ввода секунд
const cdDisplay = document.getElementById("countdown-display"); // Дисплей вывода

document.getElementById("countdown-start").onclick = () => { // Клик по кнопке "Запустить"
    const inputValue = parseInt(cdInput.value, 10); // Преобразуем введенный текст в целое число
    // Валидация: проверяем, что введено число больше нуля
    if (isNaN(inputValue) || inputValue <= 0) {
        cdDisplay.textContent = "❌ Введите число > 0"; // Вывод ошибки на страницу (не alert)
        return; // Прекращаем выполнение функции
    }
    if (countdownId !== null) clearInterval(countdownId); // Если таймер уже запущен — останавливаем старый перед новым пуском
    timeLeft = inputValue; // Устанавливаем время из инпута
    // Использую setInterval, потому что нужно уменьшать значение каждую секунду
    countdownId = setInterval(() => {
        if (timeLeft <= 0) { // Если время закончилось
            clearInterval(countdownId); // Останавливаем таймер (обязательно по ТЗ)
            countdownId = null; // Сбрасываем ID
            cdDisplay.textContent = "⌛ Время вышло!"; // Показываем сообщение об окончании на странице
            return; // Выходим из интервала
        }
        timeLeft--; // Уменьшаем счетчик на 1
        const m = Math.floor(timeLeft / 60); // Считаем минуты
        const s = timeLeft % 60; // Считаем секунды
        cdDisplay.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`; // Вывод в формате ММ:СС
    }, 1000); // Шаг интервала — 1 секунда
};

document.getElementById("countdown-stop").onclick = () => { // Кнопка "Остановить"
    clearInterval(countdownId); // Использую clearInterval для паузы
    countdownId = null; // Сброс ID
};

document.getElementById("countdown-reset").onclick = () => { // Кнопка "Сброс"
    clearInterval(countdownId); // Остановка таймера
    countdownId = null; // Сброс ID
    cdInput.value = ""; // Очистка поля ввода
    cdDisplay.textContent = "00:00"; // Очистка дисплея
};

// --- ЗАДАНИЕ 3: УВЕДОМЛЕНИЯ (Структура из PDF стр. 4-5) ---
let showTimerId = null; // ID таймера для задержки показа (из подсказки в ТЗ)
let hideTimerId = null; // ID таймера для автоматического скрытия (из подсказки в ТЗ)
const toast = document.getElementById("notification"); // Элемент уведомления

document.getElementById("notification-show").onclick = () => { // Клик на "Показать через 3 сек"
    if (showTimerId !== null) clearTimeout(showTimerId); // Если нажали повторно — отменяем старый таймер запуска (ТЗ)
    // Использую setTimeout, так как уведомление должно появиться с задержкой в 3 секунды (3000мс)
    showTimerId = setTimeout(() => {
        toast.style.display = "block"; // Делаем уведомление видимым
        // Использую setTimeout здесь, чтобы скрыть блок автоматически через 5 секунд после показа
        hideTimerId = setTimeout(() => {
            toast.style.display = "none"; // Прячем блок
        }, 5000); // 5 секунд показа
    }, 3000); // 3 секунды задержки
};

document.getElementById("notification-close").onclick = () => { // Клик на крестик в уведомлении
    // Использую clearTimeout, чтобы отменить запланированное авто-скрытие, если пользователь закрыл сам
    clearTimeout(hideTimerId);
    toast.style.display = "none"; // Прячем блок немедленно
};

// --- ЗАДАНИЕ 4: ИНФОРМАЦИЯ О БРАУЗЕРЕ (BOM) ---
// Получаем ссылки на элементы из DOM (подсказка стр. 5)
const infoBtn = document.getElementById("browser-info-btn"); // Кнопка "Показать"
const updateBtn = document.getElementById("browser-update-btn"); // Кнопка "Обновить"
const infoBlock = document.getElementById("browser-info"); // Контейнер для списка

// Основная функция вывода данных (структура из подсказки стр. 5-6)
function displayBrowserInfo() {
    // 10. Определение устройства через регулярное выражение (требование ТЗ)
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const deviceType = isMobile ? "📱 Мобильное устройство" : "💻 Десктоп";
    
    // 7. Определение онлайн-статуса (требование ТЗ)
    const onlineStatus = navigator.onLine ? "🟢 Онлайн" : "🔴 Офлайн";

    // Формируем HTML-разметку списка из 10 пунктов (требование ТЗ стр. 5)
    const info = `
        <ul>
            <li><strong>1. URL:</strong> ${location.href}</li> <!-- Текущий URL страницы -->
            <li><strong>2. Протокол:</strong> ${location.protocol}</li> <!-- http: или https: -->
            <li><strong>3. Домен:</strong> ${location.hostname}</li> <!-- Имя хоста -->
            <li><strong>4. Путь:</strong> ${location.pathname}</li> <!-- Путь к файлу -->
            <li><strong>5. Язык:</strong> ${navigator.language}</li> <!-- Язык браузера -->
            <!-- 6. User Agent с ограничением в 100 символов (требование ТЗ стр. 5) -->
            <li><strong>6. User Agent:</strong> ${navigator.userAgent.substring(0, 100)}...</li>
            <li><strong>7. Статус:</strong> ${onlineStatus}</li> <!-- Онлайн или Офлайн -->
            <li><strong>8. Разрешение экрана:</strong> ${screen.width} x ${screen.height}</li> <!-- Screen object -->
            <li><strong>9. Размер окна:</strong> ${window.innerWidth} x ${window.innerHeight}</li> <!-- Window object -->
            <li><strong>10. Устройство:</strong> ${deviceType}</li> <!-- Результат проверки регуляркой -->
        </ul>
    `;
    
    // Выводим сформированную строку в блок (требование ТЗ стр. 6)
    infoBlock.innerHTML = info;
}

// Назначаем обработчик на кнопку "Показать информацию"
infoBtn.addEventListener("click", displayBrowserInfo);

// Назначаем обработчик на кнопку "Обновить информацию"
updateBtn.addEventListener("click", displayBrowserInfo);

// Дополнительное требование ТЗ: при изменении размера окна данные должны обновляться (стр. 5)
// Использую событие 'resize', потому что нужно пересчитывать window.innerWidth/innerHeight
window.addEventListener("resize", () => {
    // Если информация уже была выведена (блок не пустой), обновляем её
    if (infoBlock.innerHTML !== "") {
        displayBrowserInfo();
    }
});

// --- ЗАДАНИЕ 5: АВТОСОХРАНЕНИЕ (Структура из PDF стр. 8) ---
let autosaveId = null; // ID интервала автосохранения (из подсказки в ТЗ)
const area = document.getElementById("autosave-textarea"); // Поле для текста
const indicator = document.getElementById("autosave-indicator"); // Элемент статуса
const toggleBtn = document.getElementById("autosave-toggle"); // Кнопка включения/выключения

function saveToLocalStorage() { // Функция сохранения данных
    const text = area.value.trim(); // Получаем текст без лишних пробелов
    if (text === "") return; // Валидация: не сохраняем в localStorage пустые строки (ТЗ стр. 7)
    localStorage.setItem("draft", text); // Записываем текст в хранилище под ключом "draft"
    indicator.textContent = `✅ Сохранено в ${new Date().toLocaleTimeString()}`; // Обновляем индикатор времени
}

function startAutosave() { // Функция запуска процесса
    // Использую setInterval, потому что по ТЗ сохранение должно происходить каждые 10 секунд (10000мс)
    autosaveId = setInterval(saveToLocalStorage, 10000);
    toggleBtn.textContent = "Остановить автосохранение"; // Меняем текст на кнопке
}

// При загрузке страницы восстанавливаем данные (ТЗ стр. 7)
window.addEventListener("load", () => {
    const saved = localStorage.getItem("draft"); // Пытаемся получить сохраненный текст
    if (saved) {
        area.value = saved; // Восстанавливаем текст в поле
        indicator.textContent = "📄 Черновик восстановлен"; // Сообщаем об этом
    }
    startAutosave(); // Сразу запускаем таймер сохранения
});

toggleBtn.onclick = () => { // Обработчик кнопки управления интервалом
    if (autosaveId === null) { // Если сохранение сейчас выключено
        startAutosave(); // Запускаем его
    } else { 
        // Использую clearInterval здесь, так как пользователь принудительно остановил процесс
        clearInterval(autosaveId);
        autosaveId = null; // Сбрасываем ID
        toggleBtn.textContent = "Возобновить автосохранение"; // Меняем текст
    }
};

document.getElementById("autosave-clear").onclick = () => { // Кнопка очистки
    localStorage.removeItem("draft"); // Удаляем запись из памяти браузера
    area.value = ""; // Очищаем поле ввода
    indicator.textContent = "🗑️ Черновик удален"; // Обновляем статус
};