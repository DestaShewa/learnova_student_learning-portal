document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateProgressPage();

        setupResetButton();

    }
);


/* =========================
   COMPLETED LESSONS
========================= */

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

        console.error(
            "Could not load completed lessons:",
            error
        );

        return [];
    }
}


/* =========================
   QUIZ SCORE
========================= */

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


/* =========================
   QUIZ ATTEMPTS
========================= */

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


/* =========================
   CORRECT ANSWERS
========================= */

function getQuizCorrectAnswers() {

    const correct =
        Number(
            localStorage.getItem(
                "learnovaQuizCorrectAnswers"
            ) || 0
        );

    return Number.isFinite(correct)
        ? correct
        : 0;
}


/* =========================
   TOTAL QUESTIONS
========================= */

function getQuizTotalQuestions() {

    const total =
        Number(
            localStorage.getItem(
                "learnovaQuizTotalQuestions"
            ) || 0
        );

    return Number.isFinite(total)
        ? total
        : 0;
}


/* =========================
   MAIN UPDATE
========================= */

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
                    (
                        completedLessons.length /
                        totalLessons
                    ) * 100
                );


        updateStatisticsCards(
            completedLessons.length,
            overallProgress
        );


        updateOverallProgress(
            overallProgress,
            completedLessons.length,
            totalLessons
        );


        updateSubjectProgress(
            completedLessons
        );


        updateQuizProgress();

        updateProgressTable(
            completedLessons
        );

    } catch (error) {

        console.error(
            "Could not update progress:",
            error
        );
    }
}


/* =========================
   STATISTICS CARDS
========================= */

function updateStatisticsCards(
    completedCount,
    overallProgress
) {

    const lessonsElement =
        document.querySelector(
            "[data-stat-lessons]"
        );

    const progressElement =
        document.querySelector(
            "[data-stat-progress]"
        );

    const scoreElement =
        document.querySelector(
            "[data-stat-score]"
        );

    const attemptsElement =
        document.querySelector(
            "[data-stat-attempts]"
        );


    if (lessonsElement) {

        lessonsElement.textContent =
            completedCount;
    }


    if (progressElement) {

        progressElement.textContent =
            `${overallProgress}%`;
    }


    if (scoreElement) {

        scoreElement.textContent =
            `${getQuizScore()}%`;
    }


    if (attemptsElement) {

        attemptsElement.textContent =
            getQuizAttempts();
    }
}


/* =========================
   OVERALL PROGRESS
========================= */

function updateOverallProgress(
    progress,
    completedCount,
    totalCount
) {

    const progressElement =
        document.querySelector(
            "progress"
        );


    if (progressElement) {

        progressElement.value =
            progress;

        progressElement.textContent =
            `${progress}%`;
    }


    const progressText =
        document.querySelector(
            "[data-overall-progress]"
        );


    if (progressText) {

        progressText.textContent =
            `${progress}%`;
    }


    const description =
        document.querySelector(
            "[data-progress-description]"
        );


    if (!description) {
        return;
    }


    if (totalCount === 0) {

        description.textContent =
            "No lessons are available.";

        return;
    }


    if (progress === 100) {

        description.textContent =
            "Excellent! You completed all available lessons. 🎉";

        return;
    }


    if (completedCount === 0) {

        description.textContent =
            "Start completing lessons to increase your progress.";

        return;
    }


    const remaining =
        totalCount -
        completedCount;


    description.textContent =
        `${remaining} lesson${
            remaining === 1
                ? ""
                : "s"
        } remaining to complete your current lessons.`;
}


/* =========================
   SUBJECT PROGRESS
========================= */

function updateSubjectProgress(
    completedLessons
) {

    const container =
        document.querySelector(
            "#subject-statistics"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    subjects.forEach(
        (subject) => {

            const subjectLessons =
                lessons.filter(
                    (lesson) =>
                        lesson.subject ===
                        subject.name
                );


            const completedSubjectLessons =
                subjectLessons.filter(
                    (lesson) =>
                        completedLessons.includes(
                            lesson.id
                        )
                ).length;


            const subjectProgress =
                subjectLessons.length === 0
                    ? 0
                    : Math.round(
                        (
                            completedSubjectLessons /
                            subjectLessons.length
                        ) * 100
                    );


            const item =
                document.createElement(
                    "article"
                );


            item.className =
                "subject-stat";


            item.innerHTML = `

                <div class="subject-stat-header">

                    <div>

                        <h3>
                            ${subject.name}
                        </h3>

                        <p>
                            ${
                                completedSubjectLessons
                            }
                            /
                            ${
                                subjectLessons.length
                            }
                            lessons
                        </p>

                    </div>

                    <strong>
                        ${subjectProgress}%
                    </strong>

                </div>


                <div
                    class="stat-progress-bar">

                    <span
                        style="
                            width: ${subjectProgress}%;
                        ">
                    </span>

                </div>

            `;


            container.appendChild(
                item
            );
        }
    );
}


/* =========================
   QUIZ PROGRESS
========================= */

function updateQuizProgress() {

    const score =
        getQuizScore();

    const attempts =
        getQuizAttempts();

    const correct =
        getQuizCorrectAnswers();

    const total =
        getQuizTotalQuestions();


    const scoreElement =
        document.querySelector(
            "[data-quiz-score]"
        );


    if (scoreElement) {

        scoreElement.textContent =
            `${score}%`;
    }


    const correctElement =
        document.querySelector(
            "[data-quiz-correct]"
        );


    if (correctElement) {

        correctElement.textContent =
            `${correct} / ${total}`;
    }


    const attemptsElement =
        document.querySelector(
            "[data-quiz-attempts]"
        );


    if (attemptsElement) {

        attemptsElement.textContent =
            attempts;
    }
}


/* =========================
   PROGRESS TABLE
========================= */

function updateProgressTable(
    completedLessons
) {

    const tableBody =
        document.querySelector(
            "tbody"
        );


    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = "";


    subjects.forEach(
        (subject) => {

            const subjectLessons =
                lessons.filter(
                    (lesson) =>
                        lesson.subject ===
                        subject.name
                );


            const completed =
                subjectLessons.filter(
                    (lesson) =>
                        completedLessons.includes(
                            lesson.id
                        )
                ).length;


            const total =
                subjectLessons.length;


            const progress =
                total === 0
                    ? 0
                    : Math.round(
                        (
                            completed /
                            total
                        ) * 100
                    );


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <th scope="row">
                    ${subject.name}
                </th>

                <td>
                    ${completed}
                </td>

                <td>
                    ${total}
                </td>

                <td>
                    ${progress}%
                </td>

            `;


            tableBody.appendChild(
                row
            );
        }
    );
}


/* =========================
   RESET
========================= */

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
            "Are you sure you want to reset all learning progress?"
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


        keys.forEach(
            (key) => {

                localStorage.removeItem(
                    key
                );

            }
        );


        window.location.reload();


    } catch (error) {

        console.error(
            "Could not reset progress:",
            error
        );
    }
}