// === ЛОГИКА ТЕМЫ (АВТО + РУЧНАЯ) ===
const themeBtn = document.getElementById("theme-toggle"); // Кнопка темы
const body = document.body; // Ссылка на body

function initTheme() { // Установка темы по времени
    const hour = new Date().getHours(); // Получаем текущий час
    if (hour >= 21 || hour < 6) { // Ночное время по ТЗ
        body.classList.add("dark-theme"); // Темная тема
        themeBtn.textContent = "Тема: Ночь (Авто)"; // Текст кнопки
    } else { // Дневное время
        body.classList.remove("dark-theme"); // Светлая тема
        themeBtn.textContent = "Тема: День (Авто)"; // Текст кнопки
    }
}
initTheme(); // Запуск функции при старте

themeBtn.addEventListener("click", () => { // Переключение вручную
    body.classList.toggle("dark-theme"); // Инверсия класса
    themeBtn.textContent = body.classList.contains("dark-theme") ? "Тема: Ночь" : "Тема: День"; // Обновление текста
});


// === ЗАДАНИЕ 1: СЕКУНДОМЕР (setInterval) ===
let swSec = 0, swId = null; // Секунды и ID интервала
const swDisp = document.getElementById("stopwatch-display"); // Табло

document.getElementById("stopwatch-start").addEventListener("click", () => { // Старт
    if (swId !== null) return; // Защита от дублей по ТЗ
    // Использую setInterval, так как нужно циклически увеличивать время каждую секунду
    swId = setInterval(() => { 
        swSec++; // +1 секунда
        const h = Math.floor(swSec / 3600), m = Math.floor((swSec % 3600) / 60), s = swSec % 60; // Расчеты
        swDisp.textContent = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`; // Формат 00:00:00
    }, 1000); // Интервал 1 сек
});

document.getElementById("stopwatch-stop").addEventListener("click", () => { // Стоп
    // Использую clearInterval, чтобы остановить выполнение фонового процесса
    clearInterval(swId); swId = null; 
});

document.getElementById("stopwatch-reset").addEventListener("click", () => { // Сброс
    // Использую clearInterval, чтобы остановить процесс перед очисткой переменных
    clearInterval(swId); swId = null; swSec = 0; swDisp.textContent = "00:00:00"; // Обнуление
});


// === ЗАДАНИЕ 2: ОБРАТНЫЙ ОТСЧЁТ (setInterval) - ИСПРАВЛЕНО ===
let cdId = null, cdLeft = 0; // ID и оставшееся время
const cdInput = document.getElementById("countdown-input"), cdDisp = document.getElementById("countdown-display"); // Ввод/Вывод

document.getElementById("countdown-start").addEventListener("click", () => { // Кнопка запуска
    const val = parseInt(cdInput.value); // Читаем ввод пользователя
    if (isNaN(val) || val <= 0) return cdDisp.textContent = "❌ Ошибка!"; // Валидация по ТЗ
    
    // Использую clearInterval, чтобы очистить старый таймер перед запуском нового (предотвращает "ускорение")
    if (cdId !== null) clearInterval(cdId); 
    
    cdLeft = val; // Устанавливаем новое время старта
    // Использую setInterval, чтобы уменьшать значение на 1 каждую секунду
    cdId = setInterval(() => {
        if (cdLeft <= 0) { // Проверка завершения
            // Использую clearInterval, так как время вышло и нам больше не нужно тратить ресурсы процессора
            clearInterval(cdId); cdId = null; 
            cdDisp.textContent = "⌛ Время вышло!"; // Сообщение об окончании
            return;
        }
        cdLeft--; // Минус одна секунда
        const m = Math.floor(cdLeft / 60), s = cdLeft % 60; // Расчет минут и секунд
        cdDisp.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`; // Формат ММ:СС
    }, 1000); // Задержка 1 сек
});

document.getElementById("countdown-stop").addEventListener("click", () => { // Пауза
    // Использую clearInterval, чтобы приостановить обратный отсчет по клику пользователя
    clearInterval(cdId); cdId = null; 
});

document.getElementById("countdown-reset").addEventListener("click", () => { // Сброс
    // Использую clearInterval, чтобы гарантированно остановить любой активный цикл отсчета
    clearInterval(cdId); cdId = null; cdLeft = 0; cdDisp.textContent = "00:00"; cdInput.value = ""; // Очистка всего
});


// === ЗАДАНИЕ 3: УВЕДОМЛЕНИЯ (setTimeout) ===
let showId = null, hideId = null; // Таймеры управления
const note = document.getElementById("notification"); // Блок сообщения

document.getElementById("notification-show").addEventListener("click", () => { // Показать
    // Использую clearTimeout, чтобы сбросить старый план показа, если пользователь кликнул снова (ТЗ)
    if (showId) clearTimeout(showId); 
    // Использую setTimeout для выполнения действия строго через 3 секунды задержки по ТЗ
    showId = setTimeout(() => {
        note.style.display = "flex"; // Показываем блок
        // Использую setTimeout для автоматического скрытия элемента ровно через 5 секунд после появления
        hideId = setTimeout(() => note.style.display = "none", 5000); 
    }, 3000); // 3 сек
});

document.getElementById("notification-close").addEventListener("click", () => { // Закрыть
    // Использую clearTimeout, чтобы отменить автоматическое скрытие, так как юзер закрыл вручную
    clearTimeout(hideId); note.style.display = "none"; 
});


// === ЗАДАНИЕ 4: ИНФОРМАЦИЯ О БРАУЗЕРЕ (BOM) - 10 ПУНКТОВ ===
document.getElementById("browser-info-btn").addEventListener("click", () => { // Кнопка сбора
    const block = document.getElementById("browser-info"); // Блок вывода
    // Регулярное выражение для определения мобильного устройства по User Agent (ТЗ)
    const isMob = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const device = isMob ? "📱 Мобильное устройство" : "💻 Десктоп";
    // Формируем 10 пунктов инфо, декодируя кириллицу в URL и Пути через decodeURIComponent
    block.innerHTML = `
        <ul style="padding:0; list-style:none;">
            <li><strong>1. Текущий URL:</strong> ${decodeURIComponent(location.href)}</li>
            <li><strong>2. Протокол:</strong> ${location.protocol}</li>
            <li><strong>3. Домен:</strong> ${location.hostname}</li>
            <li><strong>4. Путь:</strong> ${decodeURIComponent(location.pathname)}</li>
            <li><strong>5. Язык:</strong> ${navigator.language}</li>
            <li><strong>6. User Agent:</strong> ${navigator.userAgent}</li>
            <li><strong>7. Статус:</strong> ${navigator.onLine ? "🟢 Онлайн" : "🔴 Офлайн"}</li>
            <li><strong>8. Разрешение экрана:</strong> ${screen.width} x ${screen.height}</li>
            <li><strong>9. Размер окна:</strong> ${window.innerWidth} x ${window.innerHeight}</li>
            <li><strong>10. Устройство:</strong> ${device}</li>
        </ul>
    `;
});


// === ЗАДАНИЕ 5: АВТОСОХРАНЕНИЕ (setInterval + localStorage) ===
let autoId = null; // Хранитель интервала
const area = document.getElementById("autosave-textarea"), ind = document.getElementById("autosave-indicator"); // Поле и статус

function doSave() { // Функция сохранения
    const txt = area.value.trim(); // Получаем текст
    if (txt === "") return; // Условие ТЗ: не сохранять пустые данные
    localStorage.setItem("final_backup", txt); // Пишем в память под ключом
    ind.textContent = `💾 Сохранено: ${new Date().toLocaleTimeString()}`; // Статус времени
}

function startAuto() { // Запуск фонового процесса
    // Использую setInterval для автоматического сохранения черновика в память каждые 10 секунд
    autoId = setInterval(doSave, 10000); // 10 сек
}

document.getElementById("autosave-toggle").addEventListener("click", function() { // Переключатель кнопки
    if (autoId) { // Если процесс идет
        // Использую clearInterval для остановки фонового процесса сохранения по воле пользователя
        clearInterval(autoId); autoId = null; this.textContent = "Возобновить автосохранение"; 
    } else { // Если процесс на паузе
        startAuto(); this.textContent = "Остановить автосохранение";
    }
});

window.addEventListener("load", () => { // При загрузке страницы
    const bkp = localStorage.getItem("final_backup"); // Проверяем наличие данных в памяти
    if (bkp) { area.value = bkp; ind.textContent = "✅ Черновик восстановлен"; } // Возвращаем текст
    startAuto(); // Включаем автосохранение по умолчанию
});

document.getElementById("autosave-clear").addEventListener("click", () => { // Очистка
    localStorage.removeItem("final_backup"); area.value = ""; ind.textContent = "🗑 Черновик удален"; // Удаление всего
});