document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadDashboardProfile();

        loadDashboardStatistics();

        loadContinueLearning();

        loadDashboardSubjects();

    }
);


function getDashboardProfile() {

    try {

        const data =
            localStorage.getItem(
                "learnovaStudentProfile"
            );


        if (!data) {

            return {
                name: "Student",
                grade: ""
            };
        }


        const profile =
            JSON.parse(data);


        return {

            name:
                profile.name ||
                "Student",

            grade:
                profile.grade ||
                ""

        };

    } catch (error) {

        console.error(
            "Could not load dashboard profile:",
            error
        );


        return {
            name: "Student",
            grade: ""
        };
    }
}


function getDashboardCompletedLessons() {

    try {

        const data =
            localStorage.getItem(
                "learnovaCompletedLessons"
            );


        const completed =
            data
                ? JSON.parse(data)
                : [];


        return Array.isArray(
            completed
        )
            ? completed
            : [];

    } catch (error) {

        console.error(
            "Could not load dashboard progress:",
            error
        );

        return [];
    }
}


function getDashboardQuizScore() {

    return Number(
        localStorage.getItem(
            "learnovaQuizScore"
        ) || 0
    );
}


function getDashboardQuizAttempts() {

    return Number(
        localStorage.getItem(
            "learnovaQuizAttempts"
        ) || 0
    );
}


function loadDashboardProfile() {

    const profile =
        getDashboardProfile();


    const nameElement =
        document.querySelector(
            "#dashboard-name"
        );


    if (nameElement) {

        nameElement.textContent =
            profile.name;
    }
}


function loadDashboardStatistics() {

    const completedLessons =
        getDashboardCompletedLessons();


    const totalLessons =
        lessons.length;


    const progress =
        totalLessons === 0
            ? 0
            : Math.round(
                (
                    completedLessons.length /
                    totalLessons
                ) * 100
            );


    const lessonsElement =
        document.querySelector(
            "[data-dashboard-lessons]"
        );


    const progressElement =
        document.querySelector(
            "[data-dashboard-progress]"
        );


    const scoreElement =
        document.querySelector(
            "[data-dashboard-score]"
        );


    const attemptsElement =
        document.querySelector(
            "[data-dashboard-attempts]"
        );


    if (lessonsElement) {

        lessonsElement.textContent =
            completedLessons.length;
    }


    if (progressElement) {

        progressElement.textContent =
            `${progress}%`;
    }


    if (scoreElement) {

        scoreElement.textContent =
            `${getDashboardQuizScore()}%`;
    }


    if (attemptsElement) {

        attemptsElement.textContent =
            getDashboardQuizAttempts();
    }
}


function loadContinueLearning() {

    const container =
        document.querySelector(
            "#continue-learning"
        );


    if (!container) {
        return;
    }


    const completedLessons =
        getDashboardCompletedLessons();


    const nextLesson =
        lessons.find(
            (lesson) =>
                !completedLessons.includes(
                    lesson.id
                )
        );


    if (!nextLesson) {

        container.innerHTML = `

            <div class="continue-complete">

                <h3>
                    🎉 All Lessons Completed!
                </h3>

                <p>
                    Excellent work!
                    You have completed
                    every available lesson.
                </p>

                <a href="pages/quiz.html">
                    Take the Quiz
                </a>

            </div>

        `;

        return;
    }


    container.innerHTML = `

        <article class="continue-card">

            <div>

                <p class="continue-label">
                    Next Lesson
                </p>

                <h3>
                    ${nextLesson.title}
                </h3>

                <p>
                    ${nextLesson.description}
                </p>

                <span>
                    ${nextLesson.subject}
                    ·
                    ${nextLesson.duration}
                </span>

            </div>


            <a
                href="pages/lesson.html?id=${nextLesson.id}"
            >
                Continue →
            </a>

        </article>

    `;
}


function loadDashboardSubjects() {

    const container =
        document.querySelector(
            "#dashboard-subjects"
        );


    if (!container) {
        return;
    }


    const completedLessons =
        getDashboardCompletedLessons();


    container.innerHTML = "";


    subjects.forEach(
        (subject) => {

            const subjectLessons =
                lessons.filter(
                    (lesson) =>
                        lesson.subjectId ===
                        subject.id
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


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "dashboard-subject-card";


            card.innerHTML = `

                <div class="dashboard-subject-icon">
                    ${
                        subject.id ===
                        "mathematics"
                            ? "📐"
                            : subject.id ===
                              "science"
                            ? "🔬"
                            : "📚"
                    }
                </div>


                <h3>
                    ${subject.name}
                </h3>


                <p>
                    ${completed}
                    /
                    ${total}
                    lessons completed
                </p>


                <div class="stat-progress-bar">

                    <span
                        style="
                            width: ${progress}%;
                        "
                    ></span>

                </div>


                <strong>
                    ${progress}%
                </strong>


                <a
                    href="pages/lessons.html?subject=${subject.id}"
                >
                    Explore →
                </a>

            `;


            container.appendChild(
                card
            );
        }
    );
}