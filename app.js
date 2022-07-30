
const ceils = document.querySelectorAll('.ceil') // all ceils
const newGameBtn = document.getElementById('newGame') // button to start game
const winnerDiv = document.getElementById('winner') // div for result displayed at the end of game
const winnerName = document.getElementById('winnerName') // h2 to display winner game
const scorePlayer1 = document.getElementById('scorePlayer1') 
const scorePlayer2 = document.getElementById('scorePlayer2') 
const playerTurn = document.getElementById('playerTurn') // display player turn

const colorSignWinner = '#F2EBD3'
const colorSignNormal = '#545454'

class Game  {
    // initialisation
    constructor (){
        this.noughtOrCross = 'X'
        this.ceilPlayed = 0 // number of ceil played
        this.winningMatrix = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        this.gridState = ["", "", "", "", "", "", "", "", ""];

        winnerDiv.style.display = 'none';
        playerTurn.style.display = 'block';
    }

    // set all ceil innerHTML to ''
    clearGrid(){
        ceils.forEach(ceil => {
            ceil.innerHTML =''
            ceil.style.color = colorSignNormal
        });
    }

    // toggle between X and O
    changePlayer(){
        if (this.noughtOrCross == 'X'){
            this.noughtOrCross = 'O'
        }else{
            this.noughtOrCross = 'X'
        }

        playerTurn.innerHTML = this.noughtOrCross + ' Turn'
    }

    /*  display winner Div with winner name
        increase winner's score
    */
    endOfGame(winnerSign){
        winnerDiv.style.display = 'block';
        let winner = 'Player 1 Won'
        if (winnerSign == 'Draw'){
            winner = 'Draw'
        }
        else if (winnerSign == 'X'){
            let score1 = scorePlayer1.innerHTML
            score1 ++
            scorePlayer1.innerHTML = score1
        }else{
            let score2 = scorePlayer2.innerHTML
            score2 ++
            scorePlayer2.innerHTML = score2
            winner = 'Player 2 Won'
        }
        winnerName.innerHTML = winner
        
        // reset variables
        this.gridState = ["", "", "", "", "", "", "", "", ""];
        this.ceilPlayed = 0
        playerTurn.style.display = 'none';

    }

    winLineColorSign(arrayIndex){
        let ceilArray = this.winningMatrix[arrayIndex]
        for (let i = 0; i < ceilArray.length; i++) {
            const element = ceilArray[i];
            let winnerCeil = document.querySelector(`[ceil-index='${element}']`);
            winnerCeil.style.color = colorSignWinner;
        }
    }

    checkLine(){
        for (let i = 0; i <= 7; i++) {
            const wM = this.winningMatrix[i];
            let a = this.gridState[wM[0]];
            let b = this.gridState[wM[1]];
            let c = this.gridState[wM[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                this.winLineColorSign(i)
                this.endOfGame(this.noughtOrCross)
                break
            }
        }
        if (this.ceilPlayed === 9){
            this.endOfGame('Draw')
        }
    }

    emptyCeil(ceil){
        if (ceil.innerHTML ==''){
           return true;   
        }else{
            return false;
        }
    }
    
    clickOnCeil(ceil){
        if (this.emptyCeil(ceil)){
            ceil.innerHTML = this.noughtOrCross // fill ceil with player sign
            this.ceilPlayed ++ // increase number of ceil played
            this.gridState[ceil.getAttribute('ceil-index')] = this.noughtOrCross;
            
            this.checkLine()
            this.changePlayer()
        }
    }

    playGame(){
        var generalObj = this;
        generalObj.clearGrid();
        playerTurn.innerHTML = this.noughtOrCross + ' Turn'
        generalObj.gridState = ["", "", "", "", "", "", "", "", ""];
        for (var i = 0; i < 9; i++) {
            ceils[i].addEventListener('click',function(ev){
                const clickedCeil = ev.target
                generalObj.clickOnCeil(clickedCeil)                
            });
        }
    }
            
}
newGameBtn.addEventListener("click", function(){
    var objGameMoyen = new Game()
    objGameMoyen.playGame()
})