document.addEventListener("DOMContentLoaded", () => {
    renderSubjects();
});


/* =========================
   RENDER SUBJECTS
========================= */

function renderSubjects() {

    const container =
        document.querySelector("#subject-grid");

    if (!container) {
        return;
    }

    try {

        container.innerHTML = "";

        if (
            !Array.isArray(subjects) ||
            subjects.length === 0
        ) {
            container.innerHTML = `
                <div class="error-message">
                    No subjects available.
                </div>
            `;

            return;
        }


        subjects.forEach((subject) => {

            /*
             * Find all lessons belonging
             * to this subject.
             */
            const subjectLessons =
                lessons.filter(
                    (lesson) =>
                        lesson.subjectId ===
                        subject.id
                );


            /*
             * Create subject card
             */
            const card =
                document.createElement("article");

            card.className =
                "subject-card";


            /*
             * Card content
             */
            card.innerHTML = `

                <div class="subject-card-content">

                    <p class="subject-label">
                        Learnova
                    </p>

                    <h2>
                        ${subject.name}
                    </h2>

                    <p>
                        ${subject.description}
                    </p>

                    <p>
                        <strong>
                            ${subjectLessons.length}
                        </strong>

                        Lesson${
                            subjectLessons.length === 1
                                ? ""
                                : "s"
                        }
                    </p>

                </div>


                <a
                    href="lessons.html?subject=${subject.id}"
                    class="subject-button"
                >
                    View Lessons
                </a>

            `;


            container.appendChild(card);

        });

    } catch (error) {

        console.error(
            "Could not render subjects:",
            error
        );

        container.innerHTML = `
            <div class="error-message">
                Something went wrong while
                loading subjects.
            </div>
        `;
    }
}