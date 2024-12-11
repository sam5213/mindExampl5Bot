const questions = [
    {
        question: "Как вы предпочитаете проводить выходные?",
        labels: [
            "Тихий домосед", "Книжный червь", "Уютный диван", "Прогулка в парке",
            "Кафе с другом", "Небольшая вечеринка", "Активный отдых",
            "Шумная компания", "Клубная ночь", "Звезда вечеринки"
        ]
    },
    {
        question: "Как вы реагируете на новое общество?",
        labels: [
            "Паника!", "Хочу домой", "Немного тревожно", "Осторожно наблюдаю",
            "Спокойно знакомлюсь", "Интересно послушать", "Активно общаюсь",
            "Душа компании", "Центр внимания", "Всем привет!"
        ]
    },
    {
        question: "Что для вас важнее в общении?",
        labels: [
            "Тишина золото", "Глубокие беседы", "Качество важнее", "Избранный круг",
            "Баланс важен", "Новые знакомства", "Широкий круг общения",
            "Больше друзей", "Все новые лица", "Количество решает"
        ]
    },
    {
        question: "Что вас больше радует?",
        labels: [
            "Полное одиночество", "Книга и чай", "Тихий вечер дома", "Фильм с близким",
            "Ужин с семьей", "Встреча с другом", "Небольшая компания",
            "Вечеринка с друзьями", "Новая тусовка", "Шумный праздник"
        ]
    },
    {
        question: "Как часто вы общаетесь с новыми людьми?",
        labels: [
            "Никогда", "Крайне редко", "Только по необходимости", "Иногда на работе",
            "Пару раз в месяц", "Раз в неделю", "Несколько раз в неделю",
            "Почти каждый день", "Ежедневно", "Постоянно знакомлюсь"
        ]
    },
    {
        question: "Как вы относитесь к публичным выступлениям?",
        labels: [
            "Ужас!", "Сильный страх", "Очень волнуюсь", "Некомфортно",
            "Немного тревожно", "Нормально справляюсь", "Уверенно выступаю",
            "Мне нравится", "Получаю удовольствие", "Обожаю сцену!"
        ]
    },
    {
        question: "Насколько важно для вас время в одиночестве?",
        labels: [
            "Жизненно необходимо", "Очень важно", "Нужно каждый день", "Часто нужно",
            "Периодически важно", "Иногда нужно", "Редко, но нужно",
            "Не очень важно", "Почти не нужно", "Скучно одному"
        ]
    }
];

let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);
let sliderValues = new Array(questions.length).fill(5);

const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const sliderEl = document.getElementById('slider');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

function displayQuestion() {
    const q = questions[currentQuestion];
    questionEl.innerHTML = `<img src="kitten-icon-${currentQuestion + 1}.svg" alt="Kitten icon" class="question-icon">${q.question}`;
    
    optionsEl.innerHTML = q.options.map((option, index) => `
        <label class="option">
            <input type="radio" name="answer" value="${option}" ${answers[currentQuestion] === option ? 'checked' : ''}>
            ${option}
        </label>
    `).join('');

    sliderEl.value = sliderValues[currentQuestion];
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.textContent = currentQuestion === questions.length - 1 ? 'Получить результат' : 'Далее';
}

function updateAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        answers[currentQuestion] = selectedOption.value;
    }
    sliderValues[currentQuestion] = parseInt(sliderEl.value);
}

function showResults() {
    const extrovertScore = answers.reduce((score, answer, index) => {
        return score + (index % 2 === 0 && answer === questions[index].options[0] ? 1 : 0);
    }, 0);
    const introvertScore = answers.length - extrovertScore;
    const averageSliderValue = sliderValues.reduce((sum, value) => sum + value, 0) / sliderValues.length;

    let result;
    if (extrovertScore > introvertScore || averageSliderValue > 5) {
        result = "Вы склонны к экстраверсии! Вы энергичны, общительны и любите проводить время с другими людьми.";
    } else if (extrovertScore < introvertScore || averageSliderValue < 5) {
        result = "Вы склонны к интроверсии! Вы цените время наедине с собой и предпочитаете глубокие, значимые отношения.";
    } else {
        result = "У вас сбалансированный тип личности! Вы умеете наслаждаться как общением, так и уединением.";
    }

    document.getElementById('result-text').textContent = result;
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
}

prevBtn.addEventListener('click', () => {
    updateAnswer();
    currentQuestion--;
    displayQuestion();
});

nextBtn.addEventListener('click', () => {
    updateAnswer();
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        showResults();
    }
});

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    answers = new Array(questions.length).fill(null);
    sliderValues = new Array(questions.length).fill(5);
    quizContainer.style.display = 'block';
    resultsContainer.style.display = 'none';
    displayQuestion();
});

displayQuestion();

