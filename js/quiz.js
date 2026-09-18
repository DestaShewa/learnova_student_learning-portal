document.addEventListener("DOMContentLoaded", () => {
    renderQuiz();
});

function renderQuiz() {
    const quizForm =
        document.querySelector(
            "#quiz-form"
        );

    if (!quizForm) {
        return;
    }

    try {
        quizForm.innerHTML = "";

        if (
            !Array.isArray(
                quizQuestions
            ) ||
            quizQuestions.length === 0
        ) {
            quizForm.innerHTML = `
                <div class="error-message">
                    No quiz questions are available.
                </div>
            `;

            return;
        }

        quizQuestions.forEach(
            (question) => {
                const fieldset =
                    document.createElement(
                        "fieldset"
                    );

                const legend =
                    document.createElement(
                        "legend"
                    );

                legend.textContent =
                    `Question ${question.id}`;

                const questionText =
                    document.createElement(
                        "p"
                    );

                questionText.textContent =
                    question.question;

                fieldset.appendChild(
                    legend
                );

                fieldset.appendChild(
                    questionText
                );

                question.options.forEach(
                    (option) => {
                        const label =
                            document.createElement(
                                "label"
                            );

                        label.innerHTML = `
                            <input
                                type="radio"
                                name="question${question.id}"
                                value="${option}"
                            >
                            ${option}
                        `;

                        fieldset.appendChild(
                            label
                        );
                    }
                );

                quizForm.appendChild(
                    fieldset
                );
            }
        );

        const button =
            document.createElement(
                "button"
            );

        button.type = "submit";
        button.textContent =
            "Submit Quiz";

        quizForm.appendChild(button);

        quizForm.addEventListener(
            "submit",
            handleQuizSubmit
        );

    } catch (error) {
        console.error(
            "Could not render quiz:",
            error
        );

        quizForm.innerHTML = `
            <div class="error-message">
                Something went wrong while
                loading the quiz.
            </div>
        `;
    }
}

function handleQuizSubmit(event) {
    event.preventDefault();

    try {
        let score = 0;
        let unanswered = 0;

        quizQuestions.forEach(
            (question) => {
                const selectedAnswer =
                    document.querySelector(
                        `input[name="question${question.id}"]:checked`
                    );

                if (!selectedAnswer) {
                    unanswered++;
                    return;
                }

                if (
                    selectedAnswer.value ===
                    question.answer
                ) {
                    score++;
                }
            }
        );

        if (unanswered > 0) {
            showQuizError(
                `Please answer all questions. ${unanswered} question(s) remaining.`
            );

            return;
        }

        const percentage =
            Math.round(
                (score /
                    quizQuestions.length) *
                    100
            );

        saveQuizResult(
            score,
            percentage
        );

        showQuizResult(
            score,
            percentage
        );

    } catch (error) {
        console.error(
            "Could not submit quiz:",
            error
        );

        showQuizError(
            "Something went wrong. Please try again."
        );
    }
}

function saveQuizResult(
    score,
    percentage
) {
    try {
        localStorage.setItem(
            "learnovaQuizScore",
            percentage
        );

        localStorage.setItem(
            "learnovaQuizLastScore",
            percentage
        );

        localStorage.setItem(
            "learnovaQuizCompleted",
            "true"
        );

        const previousAttempts =
            Number(
                localStorage.getItem(
                    "learnovaQuizAttempts"
                ) || 0
            );

        localStorage.setItem(
            "learnovaQuizAttempts",
            previousAttempts + 1
        );

        localStorage.setItem(
            "learnovaQuizCorrectAnswers",
            score
        );

        localStorage.setItem(
            "learnovaQuizTotalQuestions",
            quizQuestions.length
        );

    } catch (error) {
        console.error(
            "Could not save quiz result:",
            error
        );
    }
}

function showQuizResult(
    score,
    percentage
) {
    const result =
        document.querySelector(
            "#quiz-result"
        );

    if (!result) {
        return;
    }

    result.innerHTML = `
        <h2>
            Quiz Complete!
        </h2>

        <p>
            You scored
            <strong>
                ${score}/${quizQuestions.length}
            </strong>
        </p>

        <p>
            Your score:
            <strong>
                ${percentage}%
            </strong>
        </p>

        <p>
            ${
                percentage >= 80
                    ? "Excellent work! 🎉"
                    : percentage >= 50
                    ? "Good work! Keep practicing."
                    : "Keep learning and try again."
            }
        </p>
    `;
}

function showQuizError(message) {
    const result =
        document.querySelector(
            "#quiz-result"
        );

    if (!result) {
        return;
    }

    result.innerHTML = `
        <div class="error-message">
            ${message}
        </div>
    `;
}