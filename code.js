const images = [
    "Images/apple.jpg", "Images/banana.jpg", "Images/grapes.jpg", "Images/mango.jpg",
    "Images/peach.jpg", "Images/pear.jpg", "Images/pineapple.jpg", "Images/watermelon.jpg"
];

const cards = [...images, ...images];

cards.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
let flippedCards = [];
let matchedCards = [];
let score = 0;
let timer = 0;
let timerInterval;

cards.forEach((image, index) => {
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');
    flipCard.setAttribute('data-id', index);

    const flipCardInner = document.createElement('div');
    flipCardInner.classList.add('flip-card-inner');

    const flipCardFront = document.createElement('div');
    flipCardFront.classList.add('flip-card-front');

    const flipCardBack = document.createElement('div');
    flipCardBack.classList.add('flip-card-back');
    flipCardBack.style.backgroundImage = `url(${image})`;

    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);
    flipCard.appendChild(flipCardInner);

    gameBoard.appendChild(flipCard);

    flipCard.addEventListener('click', flipCardHandler);
});

function flipCardHandler() {
    if (flippedCards.length === 2 || matchedCards.includes(this)) {
        return;
    }

    this.classList.add('show');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;

        if (firstCard.querySelector('.flip-card-back').style.backgroundImage === secondCard.querySelector('.flip-card-back').style.backgroundImage) {
            matchedCards.push(firstCard, secondCard);
            flippedCards = [];
            score++;
            scoreDisplay.innerText = `Score: ${score}`;

            if (matchedCards.length === cards.length) {
                clearInterval(timerInterval);  // Stop the timer
                alert('Congratulations! You matched all cards.');
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove('show');
                secondCard.classList.remove('show');
                flippedCards = [];
            }, 1000);
        }
        
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.innerText = `Time: ${timer}s`;
    }, 1000);
}
function showImagesForFirst5Seconds() {
    const allCards = document.querySelectorAll('.flip-card');
    allCards.forEach(card => {
        card.classList.add('show');
    });

    setTimeout(() => {
        allCards.forEach(card => {
            card.classList.remove('show');
        });

startTimer();
    }, 5000);
}
showImagesForFirst5Seconds();