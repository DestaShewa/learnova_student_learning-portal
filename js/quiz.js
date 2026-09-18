document.addEventListener("DOMContentLoaded", () => {
    renderQuiz();
});

function renderQuiz() {
    const quizForm = document.querySelector("#quiz-form");

    if (!quizForm) {
        return;
    }

    quizForm.innerHTML = "";

    quizQuestions.forEach((question) => {
        const fieldset = document.createElement("fieldset");

        const legend = document.createElement("legend");
        legend.textContent = `Question ${question.id}`;

        const questionText = document.createElement("p");
        questionText.textContent = question.question;

        fieldset.appendChild(legend);
        fieldset.appendChild(questionText);

        question.options.forEach((option) => {
            const label = document.createElement("label");

            label.innerHTML = `
                <input
                    type="radio"
                    name="question${question.id}"
                    value="${option}"
                >
                ${option}
            `;

            fieldset.appendChild(label);
        });

        quizForm.appendChild(fieldset);
    });

    const button = document.createElement("button");

    button.type = "submit";
    button.textContent = "Submit Quiz";

    quizForm.appendChild(button);

    quizForm.addEventListener("submit", handleQuizSubmit);
}

function handleQuizSubmit(event) {
    event.preventDefault();

    let score = 0;

    quizQuestions.forEach((question) => {
        const selectedAnswer = document.querySelector(
            `input[name="question${question.id}"]:checked`
        );

        if (
            selectedAnswer &&
            selectedAnswer.value === question.answer
        ) {
            score++;
        }
    });

    const percentage = Math.round(
        (score / quizQuestions.length) * 100
    );

    localStorage.setItem(
        "learnovaQuizScore",
        percentage
    );

    localStorage.setItem(
        "learnovaQuizCompleted",
        "true"
    );

    showQuizResult(score, percentage);
}

function showQuizResult(score, percentage) {
    const result = document.querySelector("#quiz-result");

    if (!result) {
        return;
    }

    result.innerHTML = `
        <h2>Quiz Complete!</h2>

        <p>
            You scored
            <strong>${score}/${quizQuestions.length}</strong>
        </p>

        <p>
            Your score:
            <strong>${percentage}%</strong>
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