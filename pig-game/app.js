/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

/*
3 Enhancements
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/



var currentScore, globalScores, activePlayer, gameRunning, prevDiceScore, winningScore;

// initialize the game
init()

// handle the roll dice
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gameRunning) {
        var diceScore = Math.floor(Math.random() * 6) + 1;
        if (diceScore === 1) {
            currentScore = 0;
            document.getElementById('current-' + activePlayer).textContent = '0';
             
            nextPlayer();
        } 
        else if ((diceScore === 6) && (prevDiceScore === 6)) {
            currentScore = 0;
            globalScores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            document.getElementById('current-' + activePlayer).textContent = '0';
             
            nextPlayer();
        } 
        else {
            currentScore += diceScore;
            globalScores[activePlayer] += diceScore;
        }
        
        if (globalScores[activePlayer] >= winningScore) {
            gameRunning = false;
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        }
        else {
            document.querySelector('.dice').style.display = 'block';
            document.querySelector('.dice').src = 'dice-' + diceScore + '.png'            
        }
        
        document.getElementById('score-' + activePlayer).textContent = globalScores[activePlayer];
        document.getElementById('current-' + activePlayer).textContent = currentScore;
        prevDiceScore = diceScore;
    }
}
)


// handle the start new game
document.querySelector('.btn-new').addEventListener('click', init)

// handle the hold 
document.querySelector('.btn-hold').addEventListener('click', nextPlayer)

// read final score
document.querySelector('.final-score').addEventListener('input', function() {
    winningScore = document.querySelector('.final-score').value;
    console.log('winningScore: ' + winningScore);    
})

function init() {
    console.log('initialize');
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.dice').style.display = 'none';
    
    currentScore = 0;
    globalScores = [0,0];
    activePlayer = 0;
    gameRunning = true;
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('.final-score').value = 100;
    winningScore = document.querySelector('.final-score').value;
}

function nextPlayer() {
    if (gameRunning) {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        currentScore = 0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.getElementById('score-' + activePlayer).textContent = globalScores[activePlayer];
        document.getElementById('current-' + activePlayer).textContent = currentScore;
        document.querySelector('.dice').style.display = 'none';
    }
}