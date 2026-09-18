document.addEventListener("DOMContentLoaded", () => {
    renderLessons();
});

function getCompletedLessons() {
    return JSON.parse(
        localStorage.getItem("learnovaCompletedLessons") || "[]"
    );
}

function saveCompletedLessons(completedLessons) {
    localStorage.setItem(
        "learnovaCompletedLessons",
        JSON.stringify(completedLessons)
    );
}

function renderLessons() {
    const lessonList = document.querySelector(".lesson-list");

    if (!lessonList) {
        return;
    }

    const completedLessons = getCompletedLessons();

    lessonList.innerHTML = "";

    lessons.forEach((lesson) => {
        const isCompleted = completedLessons.includes(lesson.id);

        const article = document.createElement("article");
        article.className = "lesson-card";

        article.innerHTML = `
            <div>
                <p>Lesson ${lesson.id}</p>

                <h2>${lesson.title}</h2>

                <p>${lesson.description}</p>

                <p>Duration: ${lesson.duration}</p>

                ${
                    isCompleted
                        ? "<p><strong>Completed ✓</strong></p>"
                        : ""
                }
            </div>

            <button
                type="button"
                data-lesson-id="${lesson.id}"
                ${
                    isCompleted
                        ? "disabled"
                        : ""
                }
            >
                ${
                    isCompleted
                        ? "Completed"
                        : "Mark Complete"
                }
            </button>
        `;

        lessonList.appendChild(article);
    });

    setupLessonButtons();
}

function setupLessonButtons() {
    const buttons = document.querySelectorAll(
        "[data-lesson-id]"
    );

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const lessonId = Number(
                button.dataset.lessonId
            );

            completeLesson(lessonId);
        });
    });
}

function completeLesson(lessonId) {
    const completedLessons = getCompletedLessons();

    if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
    }

    saveCompletedLessons(completedLessons);

    renderLessons();
}