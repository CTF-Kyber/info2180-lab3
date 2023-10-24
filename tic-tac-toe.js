const squares = document.querySelectorAll('#game-board div');
squares.forEach(square => {
  square.classList.add('square');
});

squares.forEach(square => {
    square.addEventListener('click', () => {
      // Check if the square is empty
      if (!square.classList.contains('X') && !square.classList.contains('O')) {
        // Add an "X" or "O" to the square, depending on whose turn it is
        const player = document.querySelector('#player-turn').textContent;
        square.classList.add(player);
  
        // Update the player turn
        document.querySelector('#player-turn').textContent = player === 'X' ? 'O' : 'X';
  
        // Check for a winner
        if (checkWinner()) {
          // Disable all squares
          squares.forEach(square => {
            square.classList.add('disabled');
          });
  
          // Display the winner message
          const status = document.querySelector('#status');
          status.textContent = `Congratulations! ${player} is the Winner!`;
          status.classList.add('you-won');
        }
      }
    });
  });

  squares.forEach(square => {
    square.addEventListener('mouseover', () => {
      square.classList.add('hover');
    });
  
    square.addEventListener('mouseout', () => {
      square.classList.remove('hover');
    });
  });

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (const combination of winningCombinations) {
      const square1 = squares[combination[0]];
      const square2 = squares[combination[1]];
      const square3 = squares[combination[2]];
  
      if (square1.classList.contains(square2.classList[0]) && square1.classList.contains(square3.classList[0])) {
        return true;
      }
    }
  
    return false;
  }

  const newGameButton = document.querySelector('#new-game-button');
newGameButton.addEventListener('click', () => {
  // Reset the game state
  squares.forEach(square => {
    square.classList.remove('X');
    square.classList.remove('O');
  });

  document.querySelector('#status').textContent = 'Player X\'s Turn';
  document.querySelector('#status').classList.remove('you-won');
});

squares.forEach(square => {
    square.addEventListener('click', () => {
      if (square.classList.contains('X') || square.classList.contains('O')) {
        // Prevent the user from placing a new "X" or "O" in the square
        event.preventDefault();
      }
    });
  });