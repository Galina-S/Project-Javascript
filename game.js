function init() {
    const gameResult = document.querySelector('.header');
    const restartButton = document.querySelector('.restartButton');
    const items = document.querySelectorAll('.gridItem');
    const gridArray = Array.from(items);
    let currentPlayer = 'playerX';
    //tracking array
    let tracking = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    //loop through the board
    items.forEach(item => {
        item.addEventListener('click', (event)=> {
            //player's X turn
            const index = gridArray.indexOf(event.target);
            new Audio("./sounds/sound-x.wav").play()
            if (
                items[index].classList.contains('playerX') ||
                items[index].classList.contains('computer')
            ) {return;}
            items[index].classList.add('playerX');

            // delete the move from the cheking/tracking list
            const spliceNr = tracking.indexOf(index+1);
            tracking.splice(spliceNr,1);

            //win check Player X
            if (winCheck('playerX', items)) {
                new Audio("./sounds/winner.wav").play();
                gameResult.innerHTML = "Player X won the game!";
                document.body.classList.add('over');
                return;}

            //check draw
            if (tracking.length ===0) {
                new Audio("./sounds/draw.wav").play();
                gameResult.innerHTML = "You have a draw!";
                document.body.classList.add('over');
            }
    
            //computer's turn
            const random = Math.floor(Math.random()* tracking.length);
            const computerIndex = tracking[random];
            
            var delayInMilliseconds = 300;
            setTimeout(function() {
                new Audio("./sounds/sound-o.wav").play();
              }, delayInMilliseconds);
              items[computerIndex-1].classList.add('computer');

            //splicing the computer move from the tracking list
            tracking.splice(random,1);

            //win check for computer
            if (winCheck('computer', items)) {
                new Audio("./sounds/lose.wav").play();
                gameResult.innerHTML = "Computer won the game!";
                document.body.classList.add('over');
            }        
        })
    });
}

init();

function winCheck(playerName, items) {
 function check(position1, position2, position3) {
   if ( items[position1].classList.contains(playerName) &
        items[position2].classList.contains(playerName) &
        items[position3].classList.contains(playerName)) 
    {return true; }
    else {return false;}
 }
 if (check(0,3,6)) return true;
 else if( check(0, 4, 8)) return true;
 else if( check(0, 1, 2)) return true;
 else if( check(1, 4, 7)) return true;
 else if( check(2, 5, 8)) return true;
 else if( check(2, 4, 6)) return true;
 else if( check(3, 4, 5)) return true;
 else if( check(6, 7, 8)) return true;
}
