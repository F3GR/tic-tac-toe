const selectedMenuOptions = document.querySelectorAll('.start-options button');
const selectedGameCells = document.querySelectorAll('.game-container button');

let gameBoard = [];

selectedMenuOptions.forEach((button) => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        let choice;

        if (!button.hasAttribute('disabled')) {
            choice = button.textContent;
            selectedMenuOptions.forEach((btn) => {
                btn.setAttribute('disabled', 'disabled');
            });
        };

        const players = newPlayers(choice);
        let playerXturn = true;

        selectedGameCells.forEach((btn) => {
            if (btn.hasAttribute('disabled')) {
                btn.removeAttribute('disabled');
            }
        });

        selectedGameCells.forEach((btn) => {
            btn.addEventListener('click', function(e) {
                if (btn.textContent === "") {
                    if (playerXturn === true) {
                        btn.textContent = "X";
                        gameBoard.push(parseInt(btn.getAttribute('data-number')));
                        playerXturn = false;
                        checkIfDraw(gameBoard);
                    } else {
                        btn.textContent = "O";
                        gameBoard.push(parseInt(btn.getAttribute('data-number')));
                        playerXturn = true;
                        checkIfDraw(gameBoard);
                    }
                };
            });
        });
    });
});



function newPlayers(choice) {
    const markers = ['X' , 'O'];

    let player1 = {
        name: 'Player 1',
        marker: choice,
    };

    let player2 = {
        name: 'Player 2',
        marker: undefined,
    };

    if (choice !== 'X') {
            player2.marker = markers[0];
    } else {
            player2.marker = markers[1];
    }

    return {
        player1,
        player2,
    }
}


function findWinner(selectedCells, gameBoard) {
    if (gameBoard.includes(0) && 
    ((gameBoard.includes(1) && gameBoard.includes(2)) || 
    gameBoard.includes(3) && gameBoard.includes(6) ||
    gameBoard.includes(4) && gameBoard.includes(8))) {
        return 
    }

    if (gameBoard.includes(1) && 
    (gameBoard.includes(4) && gameBoard.includes(7))) {
        return gameBoard[0];
    }

    if (gameBoard.includes(2) && 
    ((gameBoard.includes(4) && gameBoard.includes(6)) || 
    gameBoard.includes(5) && gameBoard.includes(8))) {
        return 
    }

    if (gameBoard.includes(3) && 
    (gameBoard.includes(4) && gameBoard.includes(5))) {
        return 
    }

    if (gameBoard.includes(6) && 
    (gameBoard.includes(7) && gameBoard.includes(8))) {
        return 
    }
}


function checkIfDraw(selectedCells) {
    let countValues = 0;
    for (cell in selectedCells) {
        if (cell.textContent !== "") {
            countValues++;
        }
    }

    if (countValues === selectedGameCells.length) {
        return true;
    } else {
        return false;
    }
}