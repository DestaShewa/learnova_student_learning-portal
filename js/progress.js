document.addEventListener("DOMContentLoaded", () => {
    updateProgressPage();
    setupResetButton();
});

function getCompletedLessons() {
    try {
        const data =
            localStorage.getItem(
                "learnovaCompletedLessons"
            );

        const completedLessons =
            data
                ? JSON.parse(data)
                : [];

        return Array.isArray(
            completedLessons
        )
            ? completedLessons
            : [];

    } catch (error) {
        return [];
    }
}

function getQuizScore() {
    const score =
        Number(
            localStorage.getItem(
                "learnovaQuizScore"
            ) || 0
        );

    return Number.isFinite(score)
        ? score
        : 0;
}

function getQuizAttempts() {
    const attempts =
        Number(
            localStorage.getItem(
                "learnovaQuizAttempts"
            ) || 0
        );

    return Number.isFinite(attempts)
        ? attempts
        : 0;
}

function updateProgressPage() {
    try {
        const completedLessons =
            getCompletedLessons();

        const totalLessons =
            lessons.length;

        const overallProgress =
            totalLessons === 0
                ? 0
                : Math.round(
                    (completedLessons.length /
                        totalLessons) *
                        100
                );

        updateOverallProgress(
            overallProgress
        );

        updateSubjectProgress(
            completedLessons
        );

        updateQuizProgress();

    } catch (error) {
        console.error(
            "Could not update progress:",
            error
        );
    }
}

function updateOverallProgress(
    overallProgress
) {
    const progressElement =
        document.querySelector(
            "progress"
        );

    if (progressElement) {
        progressElement.value =
            overallProgress;

        progressElement.textContent =
            `${overallProgress}%`;
    }

    const progressText =
        document.querySelector(
            "[data-overall-progress]"
        );

    if (progressText) {
        progressText.textContent =
            `${overallProgress}% Complete`;
    }
}

function updateSubjectProgress(
    completedLessons
) {
    const tableBody =
        document.querySelector(
            "tbody"
        );

    if (!tableBody) {
        return;
    }

    const mathematicsLessons =
        lessons.filter(
            (lesson) =>
                lesson.subject ===
                "Mathematics"
        );

    const completedMathLessons =
        mathematicsLessons.filter(
            (lesson) =>
                completedLessons.includes(
                    lesson.id
                )
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
            <th scope="row">
                Mathematics
            </th>

            <td>
                ${completedMathLessons}
            </td>

            <td>
                ${mathematicsLessons.length}
            </td>

            <td>
                ${mathematicsProgress}%
            </td>
        </tr>

        <tr>
            <th scope="row">
                Science
            </th>

            <td>0</td>
            <td>0</td>
            <td>0%</td>
        </tr>

        <tr>
            <th scope="row">
                English
            </th>

            <td>0</td>
            <td>0</td>
            <td>0%</td>
        </tr>
    `;
}

function updateQuizProgress() {
    const quizScore =
        getQuizScore();

    const quizAttempts =
        getQuizAttempts();

    const scoreElement =
        document.querySelector(
            "[data-quiz-score]"
        );

    if (scoreElement) {
        scoreElement.textContent =
            `Latest Score: ${quizScore}%`;
    }

    const completedElement =
        document.querySelector(
            "[data-quiz-completed]"
        );

    if (completedElement) {
        completedElement.textContent =
            `Quizzes Completed: ${quizAttempts}`;
    }
}

function setupResetButton() {
    const resetButton =
        document.querySelector(
            "#reset-progress"
        );

    if (!resetButton) {
        return;
    }

    resetButton.addEventListener(
        "click",
        resetProgress
    );
}

function resetProgress() {
    const confirmed =
        window.confirm(
            "Are you sure you want to reset all progress?"
        );

    if (!confirmed) {
        return;
    }

    try {
        const keys = [
            "learnovaCompletedLessons",
            "learnovaQuizScore",
            "learnovaQuizLastScore",
            "learnovaQuizCompleted",
            "learnovaQuizAttempts",
            "learnovaQuizCorrectAnswers",
            "learnovaQuizTotalQuestions"
        ];

        keys.forEach((key) => {
            localStorage.removeItem(key);
        });

        window.location.reload();

    } catch (error) {
        console.error(
            "Could not reset progress:",
            error
        );
    }
}