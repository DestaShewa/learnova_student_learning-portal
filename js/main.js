document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    updateHomeProgress();
});

function setupNavigation() {
    const currentPage =
        window.location.pathname.split("/").pop();

    const navLinks =
        document.querySelectorAll("nav a");

    navLinks.forEach((link) => {
        const linkPage =
            link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            navLinks.forEach((item) => {
                item.removeAttribute("aria-current");
            });

            link.setAttribute(
                "aria-current",
                "page"
            );
        }
    });
}

function getCompletedLessons() {
    try {
        return JSON.parse(
            localStorage.getItem(
                "learnovaCompletedLessons"
            ) || "[]"
        );
    } catch (error) {
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
                (completedLessons.length /
                    totalLessons) *
                    100
            );

    progressText.textContent =
        `${percentage}% Complete`;
}