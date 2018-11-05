/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


var scores, roundScore, activePlayer, gamePlaying;


initial();

gamePlaying = true;

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {

        //Random Number
        var dice = Math.floor(Math.random() * 6) + 1;

        //Display the Result
        var DOMdice = document.querySelector('.dice')
        DOMdice.style.display = 'block';
        DOMdice.src = 'dice-' + dice + '.png';

        //Update score if they did not roll a 1.
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //The player looses current round point and other player has their turn.
            nextPlayer();
        }


    }
   


});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {

        //Add current score to global score.
        scores[activePlayer] += roundScore;

        //Update visual(UI).
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won game.
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('Winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next Player
            nextPlayer();
        }

    }
})

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', initial);


function initial() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    //At game start, die does not appear. Here i make that possible by setting the display to 'none'.
    document.querySelector('.dice').style.display = 'none';

    //At the start of the game, just like the die is not there, I also want all scores to be 0. 
    //I do this here by using the 'getElementByID' to specify the values as 0. 

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('Winner');
    document.querySelector('.player-1-panel').classList.remove('Winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}








