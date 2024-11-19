document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
});

function loadHeader() {
    const path = getHeaderPath();

    fetch(path)
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("header-container").innerHTML = data;
            highlightActivePage();
        })
        .catch((error) => {
            console.error("Error loading header:", error);
        });
}

function getHeaderPath() {
    const currentPath = window.location.pathname;

    return "/components/header.html";
}

function highlightActivePage() {
    const currentPage = window.location.pathname.split("/").pop();

    const links = document.querySelectorAll(".navbar-nav-h .nav-link-h");

    links.forEach((link) => {
        const href = link.getAttribute("href");

        if (href.includes(currentPage)) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}
