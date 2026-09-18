document.addEventListener("DOMContentLoaded", () => {
    renderLessons();
    setupLessonSearch();
});


/* =========================
   LOCAL STORAGE
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
            "Could not load progress:",
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


/* =========================
   RENDER LESSONS
========================= */

function renderLessons(
    filteredLessons = lessons
) {

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
            !Array.isArray(
                filteredLessons
            ) ||
            filteredLessons.length === 0
        ) {

            lessonList.innerHTML = `
                <div class="error-message">
                    No lessons found.
                </div>
            `;

            return;
        }

        filteredLessons.forEach(
            (lesson) => {

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
            }
        );

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


/* =========================
   LESSON BUTTONS
========================= */

function setupLessonButtons() {

    const buttons =
        document.querySelectorAll(
            "[data-lesson-id]"
        );

    buttons.forEach(
        (button) => {

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
        }
    );
}


function completeLesson(
    lessonId
) {

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

        const searchInput =
            document.querySelector(
                "#lesson-search-input"
            );

        if (searchInput) {

            filterLessons(
                searchInput.value
            );

        } else {

            renderLessons();
        }
    }
}

/* =========================
   SEARCH + FILTER
========================= */

function setupLessonSearch() {

    const searchInput =
        document.querySelector(
            "#lesson-search-input"
        );

    const subjectFilter =
        document.querySelector(
            "#subject-filter"
        );

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener(
        "input",
        applyLessonFilters
    );

    if (subjectFilter) {

        subjectFilter.addEventListener(
            "change",
            applyLessonFilters
        );
    }

    applyLessonFilters();
}


function applyLessonFilters() {

    const searchInput =
        document.querySelector(
            "#lesson-search-input"
        );

    const subjectFilter =
        document.querySelector(
            "#subject-filter"
        );

    const searchTerm =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";

    const selectedSubject =
        subjectFilter
            ? subjectFilter.value
            : "all";

    const filteredLessons =
        lessons.filter(
            (lesson) => {

                const matchesSearch =
                    lesson.title
                        .toLowerCase()
                        .includes(searchTerm) ||
                    lesson.description
                        .toLowerCase()
                        .includes(searchTerm) ||
                    lesson.subject
                        .toLowerCase()
                        .includes(searchTerm);

                const matchesSubject =
                    selectedSubject === "all" ||
                    lesson.subject ===
                        selectedSubject;

                return (
                    matchesSearch &&
                    matchesSubject
                );
            }
        );

    renderLessons(
        filteredLessons
    );

    updateSearchResult(
        filteredLessons.length,
        searchTerm,
        selectedSubject
    );
}


/* =========================
   RESULT MESSAGE
========================= */

function updateSearchResult(
    resultCount,
    searchTerm,
    selectedSubject
) {

    const resultElement =
        document.querySelector(
            "#lesson-search-result"
        );

    if (!resultElement) {
        return;
    }

    const hasFilter =
        selectedSubject !== "all";

    if (!searchTerm && !hasFilter) {

        resultElement.textContent =
            `${lessons.length} lessons available.`;

        return;
    }

    resultElement.textContent =
        `${resultCount} lesson${
            resultCount === 1
                ? ""
                : "s"
        } found.`;
}