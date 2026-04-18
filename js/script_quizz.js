document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("menu-btn");
    const menu = document.getElementById("menu");

    if (btn && menu) {
        btn.addEventListener("click", () => {
            menu.classList.toggle("active");
            btn.classList.toggle("open");
        });
    }

    let questions = [];
    const quizForm = document.getElementById("quizForm");
    const questionsContainer = document.getElementById("questionsContainer");

    // Gestion dynamique du chemin du JSON selon la page
    const jsonPath = window.location.pathname.includes('/pages/') ? "../js/fichier.json" : "js/fichier.json";

    if (questionsContainer) {
        fetch(jsonPath)
            .then(reponse => reponse.json())
            .then(data => {
                questions = data;
                afficherQuestions(questions);
            })
            .catch(err => console.error("Erreur chargement questions:", err));
    }

    function afficherQuestions(questions) {
        questionsContainer.innerHTML = "";

        questions.forEach(q => {
            const div = document.createElement("article");
            div.className = "quiz-question";
            div.innerHTML = `<h3>${q.question}</h3>`;
            const optionsDiv = document.createElement("div");
            optionsDiv.className = "quiz-options";
            
            q.options.forEach(opt => {
                optionsDiv.innerHTML += `
                <label>
                    <input type="radio" name="${q.id}" value="${opt}"> ${opt}
                </label>`;
            });
            div.appendChild(optionsDiv);
            questionsContainer.appendChild(div);
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

        const scoreElement = document.getElementById("score");
        if (scoreElement) {
            scoreElement.textContent = `Score : ${score}/${total}`;
            scoreElement.style.display = "inline-block";
        }
    }

    if (quizForm) {
        quizForm.addEventListener("submit", calculScore);
        quizForm.addEventListener("reset", () => {
            const scoreElement = document.getElementById("score");
            if (scoreElement) scoreElement.style.display = "none";
        });
    }
});