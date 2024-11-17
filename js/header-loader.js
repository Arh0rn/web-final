// Функция для загрузки header из файла
document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
});

function loadHeader() {
    const path = getHeaderPath();

    fetch(path)
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("header-container").innerHTML = data;
            highlightActivePage(); // Переносим вызов сюда, чтобы элементы были уже загружены в DOM
        })
        .catch((error) => {
            console.error("Ошибка загрузки header:", error);
        });
}

// Функция для определения правильного пути к header.html
function getHeaderPath() {
    const currentPath = window.location.pathname;

    // Проверяем, если мы находимся на странице курсов (например, courses.html или других страницах с курсами)
    if (currentPath.includes("courses")) {
        return "/components/header.html"; // Путь для страницы courses, абсолютный путь от корня
    } else {
        return "/components/header.html"; // Путь для стандартной страницы (например, main page), абсолютный путь от корня
    }
}

function highlightActivePage() {
    const currentPage = window.location.pathname.split("/").pop(); // Получаем имя файла текущей страницы

    // Находим все ссылки в меню после того, как загружен header
    const links = document.querySelectorAll(".navbar-nav .nav-link");

    // Проходим по каждой ссылке и добавляем/удаляем класс active
    links.forEach((link) => {
        const href = link.getAttribute("href"); // Получаем значение атрибута href
        if (href.includes(currentPage)) {
            link.classList.add("active"); // Добавляем класс active для соответствующей ссылки
        } else {
            link.classList.remove("active"); // Убираем класс active для остальных ссылок
        }
    });
}
