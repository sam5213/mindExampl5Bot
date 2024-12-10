document.addEventListener("DOMContentLoaded", function() {
    const questionDiv = document.getElementById("questions");
    questionDiv.innerHTML = "Loading questions...";

    fetch("https://sam5213.github.io/get-questions")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            questionDiv.innerHTML = ''; // Очистим перед выводом новых вопросов
            data.forEach(q => {
                const question = document.createElement("div");
                question.innerHTML = `<p>${q.question}</p>`;
                questionDiv.appendChild(question);
            });
        })
        .catch(error => {
            questionDiv.innerHTML = 'Error loading questions: ' + error;
        });
});
