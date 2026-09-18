document.addEventListener("DOMContentLoaded", () => {
    updateProgressPage();
});

function getCompletedLessons() {
    return JSON.parse(
        localStorage.getItem("learnovaCompletedLessons") || "[]"
    );
}

function getQuizScore() {
    return Number(
        localStorage.getItem("learnovaQuizScore") || 0
    );
}

function updateProgressPage() {
    const completedLessons = getCompletedLessons();

    const totalLessons = lessons.length;

    const overallProgress =
        totalLessons === 0
            ? 0
            : Math.round(
                (completedLessons.length / totalLessons) * 100
            );

    const progressElement = document.querySelector(
        "progress"
    );

    if (progressElement) {
        progressElement.value = overallProgress;
        progressElement.textContent = `${overallProgress}%`;
    }

    const progressText = document.querySelector(
        "[data-overall-progress]"
    );

    if (progressText) {
        progressText.textContent =
            `${overallProgress}% Complete`;
    }

    updateSubjectProgress(completedLessons);
    updateQuizProgress();
}

function updateSubjectProgress(completedLessons) {
    const tableBody = document.querySelector("tbody");

    if (!tableBody) {
        return;
    }

    const mathematicsLessons = lessons.filter(
        (lesson) =>
            lesson.subject === "Mathematics"
    );

    const completedMathLessons =
        mathematicsLessons.filter((lesson) =>
            completedLessons.includes(lesson.id)
        ).length;

    const mathematicsProgress =
        mathematicsLessons.length === 0
            ? 0
            : Math.round(
                (completedMathLessons /
                    mathematicsLessons.length) *
                    100
            );

    tableBody.innerHTML = `
        <tr>
            <th scope="row">Mathematics</th>
            <td>${completedMathLessons}</td>
            <td>${mathematicsLessons.length}</td>
            <td>${mathematicsProgress}%</td>
        </tr>

        <tr>
            <th scope="row">Science</th>
            <td>0</td>
            <td>0</td>
            <td>0%</td>
        </tr>

        <tr>
            <th scope="row">English</th>
            <td>0</td>
            <td>0</td>
            <td>0%</td>
        </tr>
    `;
}

function updateQuizProgress() {
    const quizScore = getQuizScore();

    const scoreElement = document.querySelector(
        "[data-quiz-score]"
    );

    if (scoreElement) {
        scoreElement.textContent =
            `Latest Score: ${quizScore}%`;
    }

    const quizCompleted =
        localStorage.getItem(
            "learnovaQuizCompleted"
        ) === "true";

    const completedElement = document.querySelector(
        "[data-quiz-completed]"
    );

    if (completedElement) {
        completedElement.textContent =
            `Quizzes Completed: ${
                quizCompleted ? 1 : 0
            }`;
    }
}