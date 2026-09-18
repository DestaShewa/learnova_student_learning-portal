document.addEventListener("DOMContentLoaded", () => {

    setupNavigation();

    setupTheme();

    updateHomeProgress();

});


/* =========================
   NAVIGATION
========================= */

function setupNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();

    const navLinks =
        document.querySelectorAll(
            "nav a"
        );

    navLinks.forEach((link) => {

        const linkPage =
            link.getAttribute("href")
                .split("/")
                .pop();

        if (linkPage === currentPage) {

            navLinks.forEach((item) => {
                item.removeAttribute(
                    "aria-current"
                );
            });

            link.setAttribute(
                "aria-current",
                "page"
            );
        }
    });
}


/* =========================
   LOCAL STORAGE
========================= */

function getCompletedLessons() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "learnovaCompletedLessons"
            ) || "[]"
        );

    } catch (error) {

        console.error(
            "Could not load completed lessons:",
            error
        );

        return [];
    }
}


function getQuizScore() {

    return Number(
        localStorage.getItem(
            "learnovaQuizScore"
        ) || 0
    );
}


/* =========================
   HOME PROGRESS
========================= */

function updateHomeProgress() {

    const progressText =
        document.querySelector(
            "[data-home-progress]"
        );

    if (!progressText) {
        return;
    }

    const completedLessons =
        getCompletedLessons();

    const totalLessons =
        lessons.length;

    const percentage =
        totalLessons === 0
            ? 0
            : Math.round(
                (
                    completedLessons.length /
                    totalLessons
                ) * 100
            );

    progressText.textContent =
        `${percentage}% Complete`;
}


/* =========================
   DARK MODE
========================= */

function setupTheme() {

    const themeToggle =
        document.querySelector(
            "#theme-toggle"
        );

    if (!themeToggle) {
        return;
    }

    const savedTheme =
        localStorage.getItem(
            "learnovaTheme"
        );

    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

    }

    updateThemeButton(
        themeToggle
    );

    themeToggle.addEventListener(
        "click",
        toggleTheme
    );
}


function toggleTheme() {

    const themeToggle =
        document.querySelector(
            "#theme-toggle"
        );

    const isDarkMode =
        document.body.classList.toggle(
            "dark-mode"
        );

    localStorage.setItem(
        "learnovaTheme",
        isDarkMode
            ? "dark"
            : "light"
    );

    updateThemeButton(
        themeToggle
    );
}


function updateThemeButton(
    button
) {

    if (!button) {
        return;
    }

    const isDarkMode =
        document.body.classList.contains(
            "dark-mode"
        );

    if (isDarkMode) {

        button.textContent =
            "☀️ Light Mode";

        button.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        button.setAttribute(
            "aria-pressed",
            "true"
        );

    } else {

        button.textContent =
            "🌙 Dark Mode";

        button.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        button.setAttribute(
            "aria-pressed",
            "false"
        );
    }
}