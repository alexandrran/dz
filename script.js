// Проверка аутентификации и обновление интерфейса
function login(username) {
    localStorage.setItem('username', username);
    updateUI();
}

function logout() {
    localStorage.removeItem('username');
    updateUI();
}

function updateUI() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('auth-status').textContent = `Добро пожаловать, ${username}`;
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('logout-btn').style.display = 'block';
    } else {
        document.getElementById('auth-status').textContent = 'Вы не вошли';
        document.getElementById('login-btn').style.display = 'block';
        document.getElementById('logout-btn').style.display = 'none';
    }
}

// Обработчики для кнопок "Войти" и "Выйти"
document.getElementById('login-btn').addEventListener('click', () => {
    const username = prompt('Введите ваше имя:');
    if (username) login(username);
});
document.getElementById('logout-btn').addEventListener('click', logout);

// Настройка переключения темы и сохранение выбора в localStorage
const themeToggleButton = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.toggle('night-theme', savedTheme === 'night');
}

themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('night-theme');
    const theme = document.body.classList.contains('night-theme') ? 'night' : 'day';
    localStorage.setItem('theme', theme);
});

// Фильтрация и сохранение выбранного фильтра в localStorage
document.getElementById('filter-select').addEventListener('change', (event) => {
    const selectedFilter = event.target.value;
    localStorage.setItem('filter', selectedFilter);
    applyFilter(selectedFilter);
});

// Функция для применения фильтра к списку номеров
function applyFilter(filter) {
    const roomItems = document.querySelectorAll('.room-item');
    roomItems.forEach(item => {
        const roomType = item.getAttribute('data-type');
        item.style.display = (filter === 'all' || roomType === filter) ? 'block' : 'none';
    });
}

// Загрузка фильтра при старте
const savedFilter = localStorage.getItem('filter');
if (savedFilter) {
    document.getElementById('filter-select').value = savedFilter;
    applyFilter(savedFilter);
}

// Инициализация интерфейса при загрузке
updateUI();
