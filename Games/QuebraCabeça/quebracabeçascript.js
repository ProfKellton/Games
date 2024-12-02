const pieces = document.querySelectorAll('.piece');
let emptyIndex = 8; // Índice do espaço vazio (inicia na última posição)

// Lista de conjuntos de imagens para diferentes quebra-cabeças
const puzzles = [
    [
        '/Games/imagensG/imagensQuebraCabeca/PraiaParte1.png',  
        '/Games/imagensG/imagensQuebraCabeca/PraiaParte2.png',
        '/Games/imagensG/imagensQuebraCabeca/PraiaParte3.png',
        '/Games/imagensG/imagensQuebraCabeca/PraiaParte4.png',
        '/Games/imagensG/imagensQuebraCabeca/PraiaParte5.png',
        '/Games/imagensG/imagensQuebraCabeca/PraiaParte6.png',
        '/Games/imagensG/imagensQuebraCabeca/PraiaParte7.png',
        '/Games/imagensG/imagensQuebraCabeca/PraiaParte8.png'
    ],
    [
        '/Games/imagensG/imagensQuebraCabeca/cenario2Parte1.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenario2Parte2.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenario2Parte3.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenario2Parte4.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenario2Parte5.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenario2Parte6.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenario2Parte7.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenario2Parte8.png',  
    ],
    [
        '/Games/imagensG/imagensQuebraCabeca/cenario3Parte1.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenario3Parte2.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenario3Parte3.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenario3Parte4.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenario3Parte5.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenario3Parte6.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenario3Parte7.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenario3Parte8.png',  
    ],
    [
        '/Games/imagensG/imagensQuebraCabeca/cenarioGameParte1.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenarioGameParte2.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenarioGameParte3.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenarioGameParte4.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenarioGameParte5.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenarioGameParte6.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenarioGameParte7.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenarioGameParte8.png',  
    ],
    [
        '/Games/imagensG/imagensQuebraCabeca/cenarioGame3Parte1.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenarioGame3Parte2.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenarioGame3Parte3.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenarioGame3Parte4.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenarioGame3Parte5.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenarioGame3Parte6.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenarioGame3Parte7.png',  
        '/Games/imagensG/imagensQuebraCabeca/cenarioGame3Parte8.png',  
    ]
];

let currentPuzzle = 0; // Índice do quebra-cabeça atual
let images = puzzles[currentPuzzle]; // Conjunto de imagens atual

function init() {
    loadPuzzle(); // Carrega o quebra-cabeça atual
    addPieceClickEvents(); // Adiciona eventos de clique para mover as peças
}

// Carrega as peças do quebra-cabeça atual
function loadPuzzle() {
    pieces.forEach((piece, index) => {
        piece.innerHTML = ''; // Limpa o conteúdo anterior
        if (index < 8) {
            const img = document.createElement('img');
            img.src = images[index];
            piece.appendChild(img);
            piece.classList.remove('empty');
        } else {
            piece.classList.add('empty'); // Marca o espaço vazio
        }
    });
    emptyIndex = 8; // Redefine o índice do espaço vazio
}

// Adiciona eventos de clique às peças para que possam ser movidas
function addPieceClickEvents() {
    pieces.forEach((piece, index) => {
        piece.addEventListener('click', () => movePiece(index));
    });
}

// Troca para um novo conjunto de imagens aleatoriamente
function changePuzzle() {
    currentPuzzle = Math.floor(Math.random() * puzzles.length);
    images = puzzles[currentPuzzle];
    loadPuzzle(); // Recarrega o quebra-cabeça com as novas imagens
}

// Função para embaralhar as peças do quebra-cabeça atual
function shufflePuzzle() {
    const positions = Array.from(Array(9).keys()); // [0, 1, 2, 3, 4, 5, 6, 7, 8]

    // Embaralha as posições
    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    // Atualiza as peças de acordo com as posições embaralhadas
    pieces.forEach((piece, index) => {
        piece.innerHTML = ''; // Limpa o conteúdo anterior
        if (positions[index] < 8) {
            const img = document.createElement('img');
            img.src = images[positions[index]]; // Usa o conjunto de imagens atual
            piece.appendChild(img);
            piece.classList.remove('empty');
        } else {
            piece.classList.add('empty');
        }
    });

    emptyIndex = positions.indexOf(8); // Atualiza o índice do espaço vazio
}

// Move a peça se for adjacente ao espaço vazio
function movePiece(index) {
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;
    const clickedRow = Math.floor(index / 3);
    const clickedCol = index % 3;

    // Verifica se a peça clicada está adjacente ao espaço vazio
    if ((Math.abs(emptyRow - clickedRow) === 1 && emptyCol === clickedCol) ||
        (Math.abs(emptyCol - clickedCol) === 1 && emptyRow === clickedRow)) {
        swapPieces(index); // Se for adjacente, troca as peças
    }
}

// Troca a peça com o espaço vazio
function swapPieces(index) {
    const tempImg = pieces[index].innerHTML;
    pieces[index].innerHTML = ''; // Limpa a peça que foi clicada
    pieces[emptyIndex].innerHTML = tempImg; // Move a imagem para o espaço vazio

    pieces[emptyIndex].classList.remove('empty');
    pieces[index].classList.add('empty');
    
    emptyIndex = index; // Atualiza o índice do espaço vazio
}

init();


//Menu Animado

let toggleBtn = document.querySelector('.toggleBtn');
        let menu = document.querySelector('.menu');
        toggleBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
