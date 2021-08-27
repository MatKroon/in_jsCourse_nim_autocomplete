// NIM game

// CLASSES NEEDED

// Players
// Stack
//

class Game {
  constructor() {
    this.highScores = [];
    this.playerOne = null;
    this.playerTwo = null;
    this.stack = 21;
    this.turn = Math.floor(Math.random() * 2) + 1;
    //player in turn
    // highscore
  }

  getCurrentStack() {
    return this.stack;
  }

  makeMove(n) {
    this.stack -= n;
    if (this.stack == 0) {
      if (this.turn == 1) {
        this.win(this.playerTwo);
      } else {
        this.win(this.playerOne);
      }
    }
    if (this.turn == 1) {
      this.turn = 2;
    } else {
      this.turn = 1;
    }
  }

  resetGame() {
    this.playerOne = null;
    this.playerTwo = null;
    this.stack = 21;
    this.turn = Math.floor(Math.random() * 2) + 1;

    document.querySelector("#startGame").style.display = "block";
    document.querySelector("#addPlayer").style.display = "block";
    document.querySelector("#highscore").style.display = "block";
    document.querySelector("#game").style.display = "none";
    document.querySelector("#s2").style.display = "";
    document.querySelector("#s3").style.display = "";
  }

  win(player) {
    let i = this.highScores.findIndex((a) => a.name === player.name);

    if (i !== -1) {
      this.highScores[i].score += 2;
    } else {
      this.highScores.push({ name: player.name, score: 2 });
    }
    this.highScores.sort((a, b) => b.score - a.score);
    let highScoresMapedString = this.highScores
      .map((a) => {
        return `<tr>
         <td>${a.name}</td>
        <td>${a.score}</td>
      </tr>`;
      })
      .join("");

    document.querySelector("#fillScores").innerHTML = highScoresMapedString;

    this.resetGame();

    document.querySelector("#myModal").modal("show");

    // restart the game to the top...
  }

  setPlayerOne(player) {
    this.playerOne = player;
  }

  setPlayerTwo(player) {
    this.playerTwo = player;
  }

  getTurn() {
    if (this.playerTwo == null || this.playerOne == null) {
      console.log("players not selected");
    } else {
      if (this.turn == 1) {
        return this.playerOne;
      } else {
        return this.playerTwo;
      }
    }
  }
}

class Player {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

// ----------------------------------------------------------------
game = new Game();

let players = [];
let n = 0;

var input = document.querySelector("#addPlayerInput");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    addPlayer();
  }
});

function addPlayer() {
  players.push(new Player(document.querySelector("#addPlayerInput").value));
  var name = document.querySelector("#addPlayerInput").value;
  var option = document.createElement("option");
  var option2 = document.createElement("option");
  option.text = name;
  option2.text = name;

  option.value = n;
  option2.value = n;

  n += 1;
  document.querySelector("#selectPlayerOne").add(option);
  document.querySelector("#selectPlayerTwo").add(option2);

  document.querySelector("#addPlayerInput").value = "";
}

function startGame() {
  let playerOne = document.querySelector("#selectPlayerOne").value;
  let playerTwo = document.querySelector("#selectPlayerTwo").value;

  if (playerOne == playerTwo) {
    alert("Player 1 and Player 2 cant be the same player");
    return;
  }

  game.setPlayerOne(players[playerOne]); // need to find player based on name/index?
  game.setPlayerTwo(players[playerTwo]);

  document.querySelector("#startGame").style.display = "none";
  document.querySelector("#addPlayer").style.display = "none";
  document.querySelector("#highscore").style.display = "none";
  document.querySelector("#game").style.display = "block";

  document.querySelector("#selectedPlayer").innerHTML = game
    .getTurn()
    .getName();

  let sticks = [];
  for (let n = 0; n < game.getCurrentStack(); n++) {
    sticks.push(`<img style="width:10px;" src="img/stick.svg" />`);
  }

  document.querySelector("#sticksRepresentation").innerHTML = sticks.join("");
}

function makeMove() {
  game.makeMove(document.querySelector("#makeMove").value);
  document.querySelector("#makeMove").value = "start";
  if (game.getCurrentStack() == 2) {
    document.querySelector("#s3").style.display = "none";
  }

  if (game.getCurrentStack() == 1) {
    document.querySelector("#s2").style.display = "none";
    document.querySelector("#s3").style.display = "none";
  }

  let sticks = [];
  for (let n = 0; n < game.getCurrentStack(); n++) {
    sticks.push(`<img style="width:10px;" src="img/stick.svg" />`);
  }
  document.querySelector("#sticksRepresentation").innerHTML = sticks.join("");

  if (game.getCurrentStack() !== 21) {
    document.querySelector("#selectedPlayer").innerHTML = game
      .getTurn()
      .getName();
  }
}

// mattias = new Player("mattias");
// ira = new Player("ira");
