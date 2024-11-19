document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".questions-container");
    const finishButton = document.querySelector("#finish-exam-button");

    let questions = [];

    fetch("../data/questions.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to load questions");
            }
            return response.json();
        })
        .then((data) => {
            questions = data;
            displayQuestions(questions);
        })
        .catch((error) => {
            console.error(error);
            container.innerHTML =
                "<p>Error loading questions. Please try again later.</p>";
        });

    function displayQuestions(questions) {
        const html = questions
            .map((q, index) => {
                const codeBlock = q.code
                    ? `<pre class="language-js"><code class="language-js">${q.code}</code></pre><br>`
                    : "<br>";
                const options = q.options
                    .map(
                        (option, i) =>
                            `<input type="radio" id="q${index}_o${i}" name="q${index}" value="${i}">
                 <label for="q${index}_o${i}">${option}</label><br>`
                    )
                    .join("");
                return `
            <div class="question-block" data-index="${index}">
              <p><strong>Question ${index + 1}:</strong> ${q.question}</p>
              ${codeBlock}
              ${options}
            </div>
          `;
            })
            .join("");

        container.innerHTML = html;
    }

    finishButton.addEventListener("click", () => {
        let allAnswered = true;
        let correctCount = 0;

        questions.forEach((question, index) => {
            const selected = document.querySelector(
                `input[name="q${index}"]:checked`
            );
            const questionBlock = document.querySelector(
                `.question-block[data-index="${index}"]`
            );

            questionBlock.classList.remove("wrong-answer", "correct-answer");

            if (!selected) {
                allAnswered = false;
                return;
            }

            if (parseInt(selected.value) === question.answer) {
                correctCount++;
                questionBlock.classList.add("correct-answer");
            } else {
                questionBlock.classList.add("wrong-answer");
            }
        });

        if (!allAnswered) {
            alert("Please answer all the questions before finishing the exam.");
            return;
        }

        const score = (correctCount / questions.length) * 100;

        if (score >= 70) {
            window.location.href = "/pages/final.html";
        } else {
            alert(
                `Your score is ${score.toFixed(
                    2
                )}%. Review the incorrect answers.`
            );
        }
    });
});
