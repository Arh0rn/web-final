document.addEventListener("DOMContentLoaded", () => {
    loadFooter();
});

function loadFooter() {
    const path = getFooterPath();

    fetch(path)
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("footer-container").innerHTML = data;
        })
        .catch((error) => {
            console.error("Error loading footer:", error);
        });
}

function getFooterPath() {
    const currentPath = window.location.pathname;

    return "/components/footer.html";
}
