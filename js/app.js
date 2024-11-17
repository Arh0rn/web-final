document.addEventListener("DOMContentLoaded", () => {
    const isMainPage = window.location.pathname.includes("index.html");
    loadCourses(isMainPage);
});

// Функция загрузки курсов из JSON файла
async function loadCourses(isMainPage = false) {
    try {
        const response = await fetch("../data/courses.json");
        const courses = await response.json();

        // Если на главной странице, показываем только первые три курса
        const displayedCourses = isMainPage ? courses.slice(0, 3) : courses;
        displayCourses(displayedCourses);
    } catch (error) {
        console.error("Ошибка загрузки курсов:", error);
    }
}

// Функция отображения курсов на странице
function displayCourses(courses) {
    const coursesList = document.getElementById("courses-list");
    coursesList.innerHTML = ""; // Очищаем контейнер курсов

    courses.forEach((course) => {
        const courseCard = createCourseCard(course);
        coursesList.appendChild(courseCard);
    });
}

// Функция для создания карточки курса
function createCourseCard(course) {
    const col = document.createElement("div");
    col.classList.add("col-md-4", "mb-4");

    const card = document.createElement("div");
    card.classList.add("card", "course-card", "shadow-sm");

    const img = document.createElement("img");
    img.src = course.image;
    img.classList.add("card-img-top");
    img.alt = course.title;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = course.title;

    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = course.description;

    const link = document.createElement("a");
    link.href = course.link;
    link.classList.add("btn", "btn-warning");
    link.textContent = "Начать курс";

    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(link);
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);

    return col;
}

// Function to toggle the sidebar visibility
