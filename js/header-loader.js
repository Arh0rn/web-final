// Функция для загрузки header из файла
document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
});

function loadHeader() {
    fetch("../components/header.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("header-container").innerHTML = data;
        })
        .catch((error) => {
            console.error("Ошибка загрузки header:", error);
        });
}
