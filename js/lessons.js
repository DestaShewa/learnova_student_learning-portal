document.addEventListener("DOMContentLoaded", () => {
    renderLessons();
    setupLessonSearch();
});


/* =========================
   PROGRESS
========================= */

function getCompletedLessons() {
    try {
        const data = localStorage.getItem(
            "learnovaCompletedLessons"
        );

        const completedLessons = data
            ? JSON.parse(data)
            : [];

        return Array.isArray(completedLessons)
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


function saveCompletedLessons(completedLessons) {
    try {
        localStorage.setItem(
            "learnovaCompletedLessons",
            JSON.stringify(completedLessons)
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


/* =========================
   RENDER LESSONS
========================= */

function renderLessons(filteredLessons = lessons) {
    const lessonList =
        document.querySelector(".lesson-list");

    if (!lessonList) {
        return;
    }

    try {
        const completedLessons =
            getCompletedLessons();

        lessonList.innerHTML = "";

        if (
            !Array.isArray(filteredLessons) ||
            filteredLessons.length === 0
        ) {
            lessonList.innerHTML = `
                <div class="error-message">
                    No lessons found.
                </div>
            `;

            return;
        }


        filteredLessons.forEach((lesson) => {

            const isCompleted =
                completedLessons.includes(
                    lesson.id
                );


            const article =
                document.createElement("article");

            article.className =
                "lesson-card";


            article.innerHTML = `
                <div>

                    <p>
                        ${lesson.subject}
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


                <a
                    href="lesson.html?id=${lesson.id}"
                    class="lesson-open-button"
                >
                    ${
                        isCompleted
                            ? "Review Lesson"
                            : "Open Lesson"
                    }
                </a>
            `;


            lessonList.appendChild(article);
        });

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


    /*
     * Search input
     */
    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyLessonFilters
        );
    }


    /*
     * Subject filter
     */
    if (subjectFilter) {

        subjectFilter.addEventListener(
            "change",
            applyLessonFilters
        );


        /*
         * Check URL:
         *
         * lessons.html?subject=science
         */
        const params =
            new URLSearchParams(
                window.location.search
            );


        const subject =
            params.get("subject");


        if (
            subject &&
            subjects.some(
                (item) =>
                    item.id === subject
            )
        ) {
            subjectFilter.value =
                subject;
        }
    }


    /*
     * Initial render
     */
    applyLessonFilters();
}


/* =========================
   APPLY FILTERS
========================= */

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
        lessons.filter((lesson) => {

            /*
             * Search by:
             * - title
             * - description
             * - subject
             */
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


            /*
             * Filter by subject ID
             */
            const matchesSubject =
                selectedSubject === "all" ||
                lesson.subjectId ===
                    selectedSubject;


            return (
                matchesSearch &&
                matchesSubject
            );
        });


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
   SEARCH RESULT MESSAGE
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


    const hasSubjectFilter =
        selectedSubject !== "all";


    /*
     * No search/filter
     */
    if (
        !searchTerm &&
        !hasSubjectFilter
    ) {

        resultElement.textContent =
            `${lessons.length} lessons available.`;

        return;
    }


    /*
     * Search/filter active
     */
    resultElement.textContent =
        `${resultCount} lesson${
            resultCount === 1
                ? ""
                : "s"
        } found.`;
}


/* =========================
   COMPLETE LESSON
========================= */

function completeLesson(lessonId) {

    const completedLessons =
        getCompletedLessons();


    /*
     * Don't add duplicate lesson IDs
     */
    if (
        completedLessons.includes(
            lessonId
        )
    ) {
        return;
    }


    completedLessons.push(
        lessonId
    );


    const saved =
        saveCompletedLessons(
            completedLessons
        );


    if (saved) {

        /*
         * Re-render current list
         * so completion state updates.
         */
        applyLessonFilters();
    }
}