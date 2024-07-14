function createQuiz(words) {
    const quizContainer = document.querySelector('.quiz');
    let score = 0;
    const selectedWords = words.sort(() => 0.5 - Math.random()).slice(0, 100);

    selectedWords.forEach(word => {
        const question = document.createElement('div');
        question.className = 'quiz-question';
        question.innerHTML = `<p>What is the translation of "${word.english}"?</p>`;
        const options = document.createElement('ul');
        options.className = 'options';

        const correctOption = document.createElement('li');
        correctOption.innerText = word.french;
        correctOption.addEventListener('click', () => {
            correctOption.classList.add('correct');
            score++;
            updateScore(score);
            showExampleSentence(word.example, question);
        });

        const incorrectOptions = words.filter(w => w !== word).sort(() => 0.5 - Math.random()).slice(0, 3).map(w => {
            const option = document.createElement('li');
            option.innerText = w.french;
            option.addEventListener('click', () => {
                option.classList.add('incorrect');
                updateScore(score);
                showExampleSentence(word.example, question);
            });
            return option;
        });

        const allOptions = [correctOption, ...incorrectOptions].sort(() => 0.5 - Math.random());
        allOptions.forEach(option => options.appendChild(option));

        question.appendChild(options);
        quizContainer.appendChild(question);
    });

    const scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'score';
    scoreDisplay.innerHTML = `<p>Score: ${score}</p>`;
    quizContainer.appendChild(scoreDisplay);
}

function updateScore(score) {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.innerHTML = `<p>Score: ${score}</p>`;
}

function showExampleSentence(example, questionElement) {
    let exampleContainer = questionElement.querySelector('.example-sentence');
    if (!exampleContainer) {
        exampleContainer = document.createElement('div');
        exampleContainer.className = 'example-sentence';
        questionElement.appendChild(exampleContainer);
    }
    exampleContainer.innerHTML = `<p>Example: ${example}</p>`;
}
