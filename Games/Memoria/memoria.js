const cardImages = [
    '/Games/imagensG/imagensMemoria/laptop.png',
    '/Games/imagensG/imagensMemoria/computador.png',
    '/Games/imagensG/imagensMemoria/gabinete.png',
    '/Games/imagensG/imagensMemoria/headset.png',
    '/Games/imagensG/imagensMemoria/mouse.png',
    '/Games/imagensG/imagensMemoria/caixadesom2.png',
    '/Games/imagensG/imagensMemoria/Impressora.png',
    '/Games/imagensG/imagensMemoria/teclado.png'
];

let cardArray = [...cardImages, ...cardImages]; // Duplicar as imagens
let flippedCards = [];
let matchedCards = [];
const gameBoard = document.getElementById('game-board');

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    shuffle(cardArray);
    cardArray.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-image', image);
        card.innerHTML = `<img src="${image}" alt="Card image">`;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.getAttribute('data-image') === secondCard.getAttribute('data-image')) {
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];
    } else {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        flippedCards = [];
    }

    if (matchedCards.length === cardArray.length) {
        window.location.href = 'parabens.html'; // Redireciona para a página de parabéns
    }
}

document.getElementById('restart').addEventListener('click', () => {
    gameBoard.innerHTML = '';
    cardArray = [...cardImages, ...cardImages];
    matchedCards = [];
    createBoard();
});

createBoard();



/* Menu Animado */

let toggleBtn = document.querySelector('.toggleBtn');
        let menu = document.querySelector('.menu');
        toggleBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
