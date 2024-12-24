// Tabelas de classificação
const leaderboards = {
    easy: [],
    medium: [],
    hard: []
};

const maxLeaderboardSize = 7;
let randomNumber = null;
let attempts = 0;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadLeaderboards();
    initializeGame();
    updateAllLeaderboardsUI();

    document.getElementById('checkButton').addEventListener('click', checkGuess);
    document.getElementById('restartButton').addEventListener('click', initializeGame);
    document.getElementById('difficulty').addEventListener('change', initializeGame);
});

function initializeGame() {
    const difficulty = parseInt(document.getElementById('difficulty').value);
    randomNumber = Math.floor(Math.random() * difficulty) + 1;
    attempts = 0;

    document.getElementById('guessInput').value = '';
    document.getElementById('message').textContent = '';
    document.getElementById('result').textContent = '';
    document.getElementById('restartButton').classList.add('hidden');
    document.getElementById('checkButton').disabled = false;
    document.getElementById('guessInput').disabled = false;
}

function checkGuess() {
    const userGuess = parseInt(document.getElementById('guessInput').value);
    const difficulty = getSelectedDifficulty();

    if (isNaN(userGuess)) {
        document.getElementById('message').textContent = "Por favor, insira um número válido.";
        return;
    }

    attempts++;

    if (userGuess === randomNumber) {
        document.getElementById('result').textContent = `🎉 Você acertou o número em ${attempts} tentativas!`;
        document.getElementById('checkButton').disabled = true;
        document.getElementById('guessInput').disabled = true;
        document.getElementById('restartButton').classList.remove('hidden');

        const playerName = prompt("Parabéns! Insira seu nome (exatamente 3 caracteres):");
        if (playerName && playerName.length === 3) {
            addToLeaderboard(difficulty, playerName, attempts);
        } else {
            alert("Nome inválido! Deve conter exatamente 3 caracteres.");
        }
    } else if (userGuess < randomNumber) {
        document.getElementById('message').textContent = "Tente um número maior! 📈";
    } else {
        document.getElementById('message').textContent = "Tente um número menor! 📉";
    }
}

function getSelectedDifficulty() {
    const difficultySelect = document.getElementById('difficulty').value;
    return difficultySelect === "50" ? "easy" :
           difficultySelect === "100" ? "medium" : "hard";
}

function addToLeaderboard(difficulty, playerName, attempts) {
    const leaderboard = leaderboards[difficulty];
    const lowestScore = leaderboard[leaderboard.length - 1]?.attempts || Infinity;

    if (leaderboard.length < maxLeaderboardSize || attempts < lowestScore) {
        leaderboard.push({ name: playerName, attempts });
        leaderboard.sort((a, b) => a.attempts - b.attempts);

        if (leaderboard.length > maxLeaderboardSize) {
            leaderboard.pop();
        }

        saveLeaderboards();
        updateLeaderboardUI(difficulty);
    }
}

function saveLeaderboards() {
    localStorage.setItem('leaderboards', JSON.stringify(leaderboards));
}

function loadLeaderboards() {
    const savedLeaderboards = localStorage.getItem('leaderboards');
    if (savedLeaderboards) {
        const parsedLeaderboards = JSON.parse(savedLeaderboards);
        Object.keys(parsedLeaderboards).forEach(difficulty => {
            leaderboards[difficulty] = parsedLeaderboards[difficulty];
        });
    }
}

function updateLeaderboardUI(difficulty) {
    const leaderboard = leaderboards[difficulty];
    const leaderboardElement = document.getElementById(`leaderboard-${difficulty}`);
    leaderboardElement.innerHTML = '';

    leaderboard.forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${index + 1}° ${entry.name}</span> <span>${entry.attempts} tentativas</span>`;
        leaderboardElement.appendChild(li);
    });
}

function updateAllLeaderboardsUI() {
    ['easy', 'medium', 'hard'].forEach(updateLeaderboardUI);
}


/* Menu Animado */

let toggleBtn = document.querySelector('.toggleBtn');
        let menu = document.querySelector('.menu');
        toggleBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
        });