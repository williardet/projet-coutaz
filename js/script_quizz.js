document.addEventListener("DOMContentLoaded", () => {
    let questions = [];

    fetch("../js/fichier.json")
        .then(reponse => reponse.json())
        .then(data => {
            questions = data;
            afficherQuestions(questions);
        });

    function afficherQuestions(questions) {
        const fieldset = document.getElementById("questionsContainer");
        fieldset.innerHTML = "";

        questions.forEach(q => {
            const div = document.createElement("div");
            div.innerHTML = `<p>${q.question}</p>`;
            q.options.forEach(opt => {
                div.innerHTML += `
                <label>
                    <input type="radio" name="${q.id}" value="${opt}"> ${opt}
                </label><br>`;
            });
            fieldset.appendChild(div);
        });
    }

    function calculScore(event) {
        event.preventDefault(); // empêche le rechargement du formulaire
        let score = 0;
        let total = questions.length;

        questions.forEach(q => {
            const selectionne = document.querySelector(`input[name="${q.id}"]:checked`);
            if (selectionne && selectionne.value === q.answer) {
                score++;
            }
        });

        document.getElementById("score").textContent = `Score : ${score}/${total}`;
    }

    document.getElementById("quizForm").addEventListener("submit", calculScore);
});