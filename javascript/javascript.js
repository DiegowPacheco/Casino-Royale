// Prompt for player name
const playerName = prompt("Enter your name:");

// Dice object
function Dice() {
    this.roll = function() {
      return Math.floor(Math.random() * 6) + 1;
    };
  }
  
// Dice instances 4x dices 2x for each player
  const playerDice1 = new Dice();
  const playerDice2 = new Dice();
  const computerDice1 = new Dice();
  const computerDice2 = new Dice();
  
  let playerScore = 0;
  let playerTotal = 0;
  let computerScore = 0;
  let computerTotal = 0;
  let rollCount = 0;
  
// Set initial dice images to "dice1.png" when the page loads using forEach arrow function
document.addEventListener("DOMContentLoaded", function() {
  const diceElements = document.querySelectorAll(".dice");
  diceElements.forEach(diceElement => {
    updateDiceImage(diceElement, 1); 
  });
});

// Update the dice image based on the roll value
  function updateDiceImage(diceElement, rollValue) {
    const diceImage = `images/dice${rollValue}.png`;
    diceElement.setAttribute("src", diceImage);
    diceElement.setAttribute("alt", `Dice ${rollValue}`);
  }
  
 // Function to update the player's score and total score
  function updatePlayerScore(score) {
    playerScore = score;
    document.getElementById("player-score").textContent = score;
    playerTotal += score;
    document.getElementById("player-total").textContent = playerTotal;
  }
  
// Function to update the computer's score and total score
  function updateComputerScore(score) {
    computerScore = score;
    document.getElementById("computer-score").textContent = score;
    computerTotal += score;
    document.getElementById("computer-total").textContent = computerTotal;
  }
  
// Function to check if any of the dice values is 1 to convert to 0 points
  function isOne(value1, value2) {
    return value1 === 1 || value2 === 1;
  }
  
// Function to check if both dice values are the same to multiply it by 2
  function isPair(value1, value2) {
    return value1 === value2;
  }
  
// Function to calculate the score based on the dice values
  function calculateScore(value1, value2) {
    if (isOne(value1, value2)) {
      return 0;
    } else if (isPair(value1, value2)) {
      return (value1 + value2) * 2;
    } else {
      return value1 + value2;
    }
  }
  
// Function to display the game result messages
  function displayResult() {
    let message = "";
    if (playerTotal > computerTotal) {
      message = `${playerName} wins!`;
    } else if (playerTotal < computerTotal) {
      message = "Computer wins!";
    } else {
      message = "It's a tie!";
    }
    document.getElementById("result-message").textContent = message;
  }
  
// Function to roll the dice and update the game state using some of the functions above
  function rollDice() {
    if (rollCount < 3) {
      const playerDiceValue1 = playerDice1.roll();
      const playerDiceValue2 = playerDice2.roll();
      const computerDiceValue1 = computerDice1.roll();
      const computerDiceValue2 = computerDice2.roll();
  
      updateDiceImage(document.getElementById("player-dice1"), playerDiceValue1);
      updateDiceImage(document.getElementById("player-dice2"), playerDiceValue2);
      updateDiceImage(document.getElementById("computer-dice1"), computerDiceValue1);
      updateDiceImage(document.getElementById("computer-dice2"), computerDiceValue2);
  
      const playerScore = calculateScore(playerDiceValue1, playerDiceValue2);
      const computerScore = calculateScore(computerDiceValue1, computerDiceValue2);
  
      updatePlayerScore(playerScore);
      updateComputerScore(computerScore);
  
      rollCount++;
    }
  
    if (rollCount === 3) {
      document.getElementById("roll-btn").setAttribute("disabled", "true");
      displayResult();
    }
  }
  
// Function to reset the game
  function resetGame() {
    rollCount = 0;
    playerScore = 0;
    playerTotal = 0;
    computerScore = 0;
    computerTotal = 0;
  
    const diceElements = document.querySelectorAll(".dice");
    diceElements.forEach(diceElement => {
      diceElement.src = "images/dice1.png";
    });
  
    document.getElementById("player-score").textContent = "0";
    document.getElementById("player-total").textContent = "0";
    document.getElementById("computer-score").textContent = "0";
    document.getElementById("computer-total").textContent = "0";
    document.getElementById("result-message").textContent = "";
  
    document.getElementById("roll-btn").removeAttribute("disabled");
  }
  
// Event listeners for roll the dice and reset 
  document.getElementById("roll-btn").addEventListener("click", rollDice);
  document.getElementById("reset-btn").addEventListener("click", resetGame);

// Update player name
  document.getElementById("player-name").textContent = playerName;

