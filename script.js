let XPlayer = document.getElementById('X-Player');
let OPlayer = document.getElementById('O-Player');
let GameBox = document.getElementById('GameBox');
let box = document.getElementsByClassName('box');
let restartBtn = document.getElementById('restart');
let playerText = document.getElementById('playerText');
let scores = document.getElementById('Score');

let score = {
    X: 0,
    O: 0,
    Draw: 0
}

function InitializePlayer() {
    XPlayer.addEventListener("click", () => {
        playerText.innerHTML = "Selected as a X player";
        currentPlayer = 'X';
    });

    OPlayer.addEventListener("click", () => {
        playerText.innerHTML = "Selected as an O player";
        currentPlayer = 'O';    
    });
}
InitializePlayer();


let player = ['X', 'O'];
let currentPlayer = player[0];

function displayPlayer() {
    for (let i = 0; i < box.length; i++) {
        const StartGame = box[i];

        StartGame.addEventListener('click', () => {
            if (StartGame.innerHTML !== '') {
                return;
            }

            StartGame.innerHTML = currentPlayer;


            if (WonPlayer()) {
                playerText.innerHTML = `Winner is ${currentPlayer}!`;
                let winner = WonPlayer();
                winner.forEach(i => box[i].style.backgroundColor = 'Navy');

                score[currentPlayer] += 1;
                UpdateScore();
                return;
        
            }

            if (DrawGame()) {
                playerText.innerHTML = 'It is a Draw!';
                score.Draw += 1;
                UpdateScore();
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerText.innerHTML = `Current Player: ${currentPlayer}!`;
        });
    }
}

function UpdateScore(){
    scores.innerHTML = `X:${score.X} | O:${score.O} | Draw:${score.Draw}`;
}

const WinningPossibility = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const WonPlayer = () => {
    for (let i = 0; i < WinningPossibility.length; i++) {
        const [a, b, c] = WinningPossibility[i];
        if (box[a].innerHTML && (box[a].innerHTML === box[b].innerHTML && box[a].innerHTML === box[c].innerHTML)) {
            return [a, b, c];
        }
    }
    return false;
}

const DrawGame = () => {
   for(let i = 0; i < box.length; i++){
    if(box[i].innerHTML === '') return false;
   }
   return true;
};

restartBtn.addEventListener('click', () => {
    for (let i = 0; i < box.length; i++) {
        box[i].innerHTML = '';
        box[i].style.backgroundColor = '';
    }
    playerText.innerHTML = 'Game is restarted!';
    currentPlayer = player[0];
});

displayPlayer();
