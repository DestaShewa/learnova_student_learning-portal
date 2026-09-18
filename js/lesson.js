document.addEventListener(
    "DOMContentLoaded",
    () => {
        renderLesson();
    }
);


function getLessonId() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return Number(
        params.get("id")
    );
}


function getCompletedLessons() {

    try {

        const data =
            localStorage.getItem(
                "learnovaCompletedLessons"
            );

        const completed =
            data
                ? JSON.parse(data)
                : [];

        return Array.isArray(completed)
            ? completed
            : [];

    } catch (error) {

        console.error(
            "Could not load completed lessons:",
            error
        );

        return [];
    }
}


function saveCompletedLessons(
    completedLessons
) {

    try {

        localStorage.setItem(
            "learnovaCompletedLessons",
            JSON.stringify(
                completedLessons
            )
        );

        return true;

    } catch (error) {

        console.error(
            "Could not save completed lessons:",
            error
        );

        return false;
    }
}


function renderLesson() {

    const container =
        document.querySelector(
            "#lesson-content"
        );

    if (!container) {
        return;
    }


    const lessonId =
        getLessonId();


    const lesson =
        lessons.find(
            (item) =>
                item.id === lessonId
        );


    if (!lesson) {

        container.innerHTML = `
            <div class="error-message">
                Lesson not found.
            </div>

            <div class="progress-actions">
                <a href="lessons.html">
                    ← Back to Lessons
                </a>
            </div>
        `;

        return;
    }


    const completedLessons =
        getCompletedLessons();


    const isCompleted =
        completedLessons.includes(
            lesson.id
        );


    container.innerHTML = `

        <div class="section-header">

            <p>
                ${lesson.subject}
            </p>

            <h1>
                ${lesson.title}
            </h1>

            <p>
                ${lesson.description}
            </p>

        </div>


        <article class="lesson-detail-card">

            <div class="lesson-meta">

                <span>
                    📚 ${lesson.subject}
                </span>

                <span>
                    ⏱ ${lesson.duration}
                </span>

            </div>


            <section class="lesson-section">

                <h2>
                    Introduction
                </h2>

                <p>
                    ${lesson.content.introduction}
                </p>

            </section>


            <section class="lesson-section">

                <h2>
                    Explanation
                </h2>

                <p>
                    ${lesson.content.explanation}
                </p>

            </section>


            <section class="lesson-section">

                <h2>
                    Examples
                </h2>

                <ul class="lesson-examples">

                    ${lesson.content.examples
                        .map(
                            (example) => `
                                <li>
                                    ${example}
                                </li>
                            `
                        )
                        .join("")}

                </ul>

            </section>


            <section class="lesson-section">

                <h2>
                    Key Points
                </h2>

                <ul class="lesson-key-points">

                    ${lesson.content.keyPoints
                        .map(
                            (point) => `
                                <li>
                                    ${point}
                                </li>
                            `
                        )
                        .join("")}

                </ul>

            </section>


            <div class="lesson-actions">

                <button
                    type="button"
                    id="complete-lesson"
                    ${
                        isCompleted
                            ? "disabled"
                            : ""
                    }
                >

                    ${
                        isCompleted
                            ? "Completed ✓"
                            : "Mark Lesson Complete"
                    }

                </button>


                <a
                    href="lessons.html"
                >
                    ← Back to Lessons
                </a>

            </div>


            <p
                id="lesson-message"
                aria-live="polite"
            ></p>

        </article>
    `;


    setupCompleteButton(
        lesson.id
    );
}


function setupCompleteButton(
    lessonId
) {

    const button =
        document.querySelector(
            "#complete-lesson"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

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


            const message =
                document.querySelector(
                    "#lesson-message"
                );


            if (!saved) {

                if (message) {

                    message.textContent =
                        "Could not save your progress.";

                    message.className =
                        "profile-error";
                }

                return;
            }


            button.textContent =
                "Completed ✓";

            button.disabled =
                true;


            if (message) {

                message.textContent =
                    "Lesson completed successfully!";

                message.className =
                    "profile-success";
            }
        }
    );
}