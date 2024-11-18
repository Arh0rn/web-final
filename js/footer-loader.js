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

// Function to determine the correct path to footer.html
function getFooterPath() {
    const currentPath = window.location.pathname;

    // If you want a different footer for specific pages, you can adjust the path here
    return "/components/footer.html"; // Absolute path from root for footer
}
