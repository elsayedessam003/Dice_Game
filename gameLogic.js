let currentScore;
let totalScore;
let scores;
let activePlayer;
let isPlaying;
const newGame = document.querySelector(".new-game");
const rollDice = document.querySelector(".roll-dice");
const hold = document.querySelector(".hold");

function init() {
    scores = [0, 0];
    currentScore = 0;
    totalScore = 0;
    activePlayer = 0;
    isPlaying = true;
    document.querySelectorAll("p").forEach((el) => (el.textContent = "0"));
    document.querySelector(".dice img").src = "./images/dice-1.png";
    document.querySelector(".player-1").classList.add("active");
    document.querySelector(".player-2").classList.remove("active");
    document.querySelector('.player-1').style.background = "purple";
    document.querySelector('.winner-message').textContent = '';
    rollDice.classList.remove('hidden');
    hold.classList.remove('hidden');
}

function switchPlayer() {
    document.querySelector(`.player-${activePlayer + 1}`).classList.remove('active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    
    document.querySelector(`.player-${activePlayer + 1}`).classList.add('active');
    
    if (activePlayer === 0) {
        document.querySelector('.player-1').style.background = "purple";
        document.querySelector('.player-2').style.background = "";
    } else {
        document.querySelector('.player-1').style.background = "";
        document.querySelector('.player-2').style.background = "purple";
    }
}

function displayWinner(player) {
    document.querySelector(`.player-${player + 1}`).classList.add('winner');
    document.querySelector('.winner-message').textContent = `Player ${player + 1} wins!`;
}

rollDice.addEventListener("click", function(){
    if(isPlaying) {
        let dice = Math.trunc(Math.random() * 6) + 1;
        document.querySelector('.dice img').src = `./images/dice-${dice}.png`;
            if (dice !== 1) {
            currentScore += dice;
            document.querySelector(`.player-${activePlayer + 1} .current-score`).textContent = currentScore;
            }
            else {
            scores[activePlayer] = 0;
            document.querySelector(`.player-${activePlayer + 1} .current-score`).textContent = '0';
            document.querySelector(`.player-${activePlayer + 1} .total-score`).textContent = '0';
            switchPlayer();
            }
    }
});

hold.addEventListener("click",function(){
    if(isPlaying){
        scores[activePlayer] += currentScore;
        document.querySelector(`.player-${activePlayer + 1} .total-score`).textContent = scores[activePlayer];
            if (scores[activePlayer] >= 50) {
            playing = false;
            displayWinner(activePlayer);
            rollDice.classList.add('hidden');
            hold.classList.add('hidden');
            }
            else {
            switchPlayer();
            }
    }
})

newGame.addEventListener("click", init);
init();