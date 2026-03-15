// === БЛОК 0: ЖИВЫЕ ЧАСЫ ===
setInterval(() => { // Запуск интервала для обновления времени каждую секунду (по техническому заданию - далее ТЗ)
    const now = new Date(); // Получение текущей даты
    // Форматирование времени в ЧЧ:ММ:СС с добавлением нулей слева
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    document.getElementById("current-time").textContent = time; // Вывод времени в HTML-блок
}, 1000); // Периодичность — 1000 мс (1 секунда)

// === ЗАДАНИЕ 1: СЕКУНДОМЕР ===
let swSec = 0; // Переменная для счета секунд
let timerIdentifier = null; // Обязательное имя переменной для ID таймера согласно ТЗ
const swDisplay = document.getElementById("stopwatch-display"); // Элемент табло времени

document.getElementById("stopwatch-start").addEventListener("click", () => { // Клик по кнопке Старт
    if (timerIdentifier !== null) return; // Строгая проверка: если таймер работает, повторно не запускаем
    // Использую setInterval для ежесекундного счета времени
    timerIdentifier = setInterval(() => {
        swSec++; // Инкремент секунд
        const h = Math.floor(swSec / 3600); // Расчет часов
        const m = Math.floor((swSec % 3600) / 60); // Расчет полных минут
        const s = swSec % 60; // Расчет остатка секунд
        // Формирование и вывод строки времени 00:00:00 (согласно скриншоту)
        swDisplay.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }, 1000); // Интервал — 1 секунда
});

document.getElementById("stopwatch-stop").addEventListener("click", () => { // Клик по кнопке Стоп
    // Использую clearInterval для остановки фонового выполнения кода
    clearInterval(timerIdentifier); 
    timerIdentifier = null; // Сброс идентификатора в null для возможности нового запуска
});

document.getElementById("stopwatch-reset").addEventListener("click", () => { // Клик по кнопке Сброс
    clearInterval(timerIdentifier); // Остановка таймера перед обнулением
    timerIdentifier = null; // Обнуление ID
    swSec = 0; // Сброс счетчика секунд
    swDisplay.textContent = "00:00:00"; // Возврат табло в исходное положение
});

// === ЗАДАНИЕ 2: ОБРАТНЫЙ ОТСЧЕТ (УВЕДОМЛЕНИЕ В СТРОКЕ) ===
let cdIntervalId = null; // Переменная для хранения ID интервала отсчета
const cdInp = document.getElementById("countdown-input"); // Поле ввода секунд
const cdStat = document.getElementById("countdown-status"); // Строка статуса (Остановлено/Осталось)

document.getElementById("countdown-start").addEventListener("click", () => { // Клик на Старт
    const val = parseInt(cdInp.value); // Чтение числа из текстового поля ввода
    if (isNaN(val) || val <= 0) return alert("Введите положительное число!"); // BOM alert при некорректном вводе
    if (cdIntervalId !== null) return; // Защита от одновременного запуска нескольких интервалов

    let left = val; // Локальный счетчик секунд
    cdStat.textContent = `Осталось: ${left} сек.`; // Установка начального текста в строку статуса

    // Использую setInterval для обновления статуса каждую секунду
    cdIntervalId = setInterval(() => {
        left--; // Уменьшение времени на 1 секунду
        if (left <= 0) { // Проверка достижения нуля
            clearInterval(cdIntervalId); // Использую clearInterval для остановки, когда время истекло
            cdIntervalId = null; // Сброс ID интервала
            cdStat.textContent = "Время вышло!"; // Сообщение о завершении в строку статуса
            alert("Время вышло!"); // Уведомление через диалоговое окно BOM (alert)
        } else {
            cdStat.textContent = `Осталось: ${left} сек.`; // Обновление текста со значением остатка
        }
    }, 1000); // Период — 1 секунда
});

document.getElementById("countdown-stop").addEventListener("click", () => { // Клик на Стоп
    clearInterval(cdIntervalId); // Остановка фонового обратного отсчета
    cdIntervalId = null; // Обнуление переменной ID интервала
    cdStat.textContent = "Остановлено"; // Статичное сообщение как на твоем скриншоте
});

// === ЗАДАНИЕ 3: УВЕДОМЛЕНИЯ С ПЕРЕМЕННЫМИ РАМКАМИ ===
let notificationTimerId = null; // Обязательное имя переменной согласно ТЗ для таймера уведомления
const nInp = document.getElementById("notification-input"); // Поле ввода текста (сбоку от кнопок)
const nDisplay = document.getElementById("notification-display"); // Блок вывода сообщения (снизу)

document.getElementById("show-notification").addEventListener("click", () => { // Клик Показать уведомление
    const text = nInp.value || "Успешно сохранено"; // Чтение текста или установка фразы по умолчанию
    nDisplay.textContent = text; // Вставка текста в блок уведомления
    nDisplay.className = "notification-box active-green"; // Установка класса зеленой сплошной рамки (скриншот)

    if (notificationTimerId !== null) clearTimeout(notificationTimerId); // Отмена старого таймера при новом клике

    // Использую setTimeout для одиночного скрытия уведомления через 3 секунды (согласно ТЗ)
    notificationTimerId = setTimeout(() => {
        nDisplay.className = "notification-box hidden"; // Скрытие блока уведомления
        notificationTimerId = null; // Сброс ID таймера после выполнения
    }, 3000); // Задержка — 3000 мс (3 секунды)
});

document.getElementById("cancel-notification").addEventListener("click", () => { // Клик Отменить удаление
    // Использую clearTimeout для отмены запланированного действия внутри setTimeout
    if (notificationTimerId !== null) {
        clearTimeout(notificationTimerId); // Остановка таймера скрытия
        notificationTimerId = null; // Обнуление переменной таймера
        nDisplay.className = "notification-box canceled-yellow"; // Смена стиля на желтый пунктир (скриншот)
        alert("Удаление уведомления отменено!"); // Подтверждение отмены через BOM alert
    }
});

// === ЗАДАНИЕ 4: BOM ПАРАМЕТРЫ (ИСПОЛЬЗУЮ ФУНКЦИЮ getBOMInfo С ПЕРЕЧИСЛЕНИЕМ) ===
function getBOMInfo() { // Функция для сбора и вывода расширенных данных BOM (согласно исходному коду)
    const list = document.getElementById("bom-info-list"); // Элемент списка в HTML документе
    list.innerHTML = ""; // Начальная очистка содержимого списка перед заполнением
    
    // Определение типа устройства и значка (💻 для ПК, 📱 для мобильных)
    const deviceIcon = /Mobi|Android|iPone|iPad|iPod/i.test(navigator.userAgent) ? "📱Мобильное устройство" : "💻 Десктоп";
    // Определение значка онлайн/офлайн статуса (🟢 онлайн, 🔴 офлайн)
    const onlineIcon = navigator.onLine ? "🟢 Онлайн" : "🔴 Офлайн";

    // Использую прямое перечисление через оператор += для вывода данных в список (как в исходном коде)
    list.innerHTML += `<li><strong>User-Agent:</strong> ${navigator.userAgent}</li>`; // Данные о браузере
    list.innerHTML += `<li><strong>Протокол:</strong> ${location.protocol}</li>`; // Используемый протокол (http/https)
    list.innerHTML += `<li><strong>Домен:</strong> ${location.hostname}</li>`; // Доменное имя текущего сайта
    list.innerHTML += `<li><strong>Устройство:</strong> ${deviceIcon}</li>`; // Тип устройства со значком
    list.innerHTML += `<li><strong>Статус сети:</strong> ${onlineIcon}</li>`; // Статус подключения с иконкой
    list.innerHTML += `<li><strong>Экран:</strong> ${screen.width}x${screen.height}</li>`; // Разрешение монитора
    list.innerHTML += `<li><strong>Окно:</strong> ${window.innerWidth}x${window.innerHeight}</li>`; // Размер вьюпорта
    list.innerHTML += `<li><strong>Cookies:</strong> ${navigator.cookieEnabled ? "Да" : "Нет"}</li>`; // Статус куков
    list.innerHTML += `<li><strong>URL:</strong> ${decodeURIComponent(location.href)}</li>`; // URL (декодирован для кириллицы)
    list.innerHTML += `<li><strong>Путь:</strong> ${decodeURIComponent(location.pathname)}</li>`; // Путь (декодирован)
}
getBOMInfo(); // Автоматический запуск функции заполнения BOM при загрузке страницы (согласно ТЗ)

// === ЗАДАНИЕ 5: LOCAL STORAGE (АВТОСОХРАНЕНИЕ КАЖДЫЕ 2 СЕКУНДЫ) ===
const area = document.getElementById("autosave-text"); // Поле ввода текста (textarea)
const sStatus = document.getElementById("save-status"); // Элемент вывода времени сохранения
const STORAGE_KEY = "bom_autosave"; // Ключ для хранения записи в LocalStorage (со скриншота)

// Восстановление: использую JSON.parse для перевода строки из хранилища в объект JavaScript
const savedDataString = localStorage.getItem(STORAGE_KEY); // Чтение данных из памяти LocalStorage
if (savedDataString !== null) { // Если запись существует (проверка !== null согласно ТЗ)
    const parsedData = JSON.parse(savedDataString); // Парсинг текстовой строки в объект данных
    area.value = parsedData.text; // Восстановление текста в textarea
    sStatus.textContent = `Сохранено: ${parsedData.time}`; // Показ метки времени последнего сохранения
}

// Автосохранение: использую setInterval для циклической записи данных каждые 2 сек (согласно ТЗ)
setInterval(() => {
    if (area.value.trim() === "") return; // Если текстовое поле пустое, сохранение не производится
    
    const objToSave = { // Создание объекта данных (структура из твоего скриншота)
        text: area.value, // Текущий текст из textarea
        time: new Date().toLocaleTimeString() // Текущее системное время в формате ЧЧ:ММ:СС
    };
    
    // Использую JSON.stringify, так как LocalStorage поддерживает только хранение строк
    localStorage.setItem(STORAGE_KEY, JSON.stringify(objToSave)); // Запись данных в хранилище LocalStorage
    sStatus.textContent = `Сохранено: ${objToSave.time}`; // Обновление текста статуса в HTML интерфейсе
}, 2000); // Период выполнения — 2 секунды (2000 мс) согласно условию ТЗ

document.getElementById("clear-storage").addEventListener("click", () => { // Обработчик кнопки Очистить
    // Использую confirm (диалог BOM) для получения подтверждения удаления данных пользователем
    if (confirm("Вы уверены, что хотите очистить сохраненные данные?")) {
        localStorage.removeItem(STORAGE_KEY); // Полное удаление записи из LocalStorage по заданному ключу
        area.value = ""; // Очистка текстового поля ввода на странице
        sStatus.textContent = "Сохранено: --:--:--"; // Сброс визуальной метки времени
        alert("Данные успешно удалены!"); // Подтверждение очистки через диалоговое окно alert
    }
});

// === СМЕНА ТЕМЫ ОФОРМЛЕНИЯ ===
document.getElementById("theme-toggle").addEventListener("click", function() { // Обработка клика по плавающей кнопке
    const body = document.body; // Получение ссылки на тег body
    const isLightNow = body.classList.toggle("light-theme"); // Переключение класса светлой темы и получение результата
    body.classList.toggle("dark-theme", !isLightNow); // Если светлый класс выключен — включаем темный
    this.textContent = isLightNow ? "☀️" : "🌙"; // Обновление значка на кнопке (солнце или луна)
});