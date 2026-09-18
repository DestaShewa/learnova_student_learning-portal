document.addEventListener("DOMContentLoaded", () => {
    renderLessons();
});

function getCompletedLessons() {
    try {
        const data = localStorage.getItem(
            "learnovaCompletedLessons"
        );

        const lessons = data
            ? JSON.parse(data)
            : [];

        return Array.isArray(lessons)
            ? lessons
            : [];
    } catch (error) {
        return [];
    }
}

function saveCompletedLessons(
    completedLessons
) {
    try {
        localStorage.setItem(
            "learnovaCompletedLessons",
            JSON.stringify(completedLessons)
        );

        return true;
    } catch (error) {
        console.error(
            "Could not save progress:",
            error
        );

        return false;
    }
}

function renderLessons() {
    const lessonList =
        document.querySelector(
            ".lesson-list"
        );

    if (!lessonList) {
        return;
    }

    try {
        const completedLessons =
            getCompletedLessons();

        lessonList.innerHTML = "";

        if (
            !Array.isArray(lessons) ||
            lessons.length === 0
        ) {
            lessonList.innerHTML = `
                <div class="error-message">
                    No lessons are available.
                </div>
            `;

            return;
        }

        lessons.forEach((lesson) => {
            const isCompleted =
                completedLessons.includes(
                    lesson.id
                );

            const article =
                document.createElement(
                    "article"
                );

            article.className =
                "lesson-card";

            article.innerHTML = `
                <div>
                    <p>
                        Lesson ${lesson.id}
                    </p>

                    <h2>
                        ${lesson.title}
                    </h2>

                    <p>
                        ${lesson.description}
                    </p>

                    <p>
                        Duration:
                        ${lesson.duration}
                    </p>

                    ${
                        isCompleted
                            ? `
                                <p>
                                    <strong>
                                        Completed ✓
                                    </strong>
                                </p>
                            `
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

            lessonList.appendChild(
                article
            );
        });

        setupLessonButtons();

    } catch (error) {
        console.error(
            "Could not render lessons:",
            error
        );

        lessonList.innerHTML = `
            <div class="error-message">
                Something went wrong while
                loading lessons.
            </div>
        `;
    }
}

function setupLessonButtons() {
    const buttons =
        document.querySelectorAll(
            "[data-lesson-id]"
        );

    buttons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const lessonId =
                    Number(
                        button.dataset
                            .lessonId
                    );

                completeLesson(
                    lessonId
                );
            }
        );
    });
}

function completeLesson(lessonId) {
    const completedLessons =
        getCompletedLessons();

    if (
        !completedLessons.includes(
            lessonId
        )
    ) {
        completedLessons.push(
            lessonId
        );
    }

    const saved =
        saveCompletedLessons(
            completedLessons
        );

    if (saved) {
        renderLessons();
    }
}