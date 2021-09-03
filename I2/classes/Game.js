class Game {
  constructor(
    selectPlayerOne,
    selectPlayerTwo,
    selectMove,
    elementSticks,
    blockHighScore,
    blockStartGame,
    blockAddPlayer,
    blockGame,
    inputPlayer
  ) {
    this.selectPlayerOne = selectPlayerOne;
    this.selectPlayerTwo = selectPlayerTwo;
    this.selectMove = selectMove;
    this.elementSticks = elementSticks;
    this.blockHighScore = blockHighScore;
    this.blockStartGame = blockStartGame;
    this.blockAddPlayer = blockAddPlayer;
    this.blockGame = blockGame;
    this.inputPlayer = inputPlayer;

    this.highScores = [];
    this.players = [];
    this.playerOne = null;
    this.playerTwo = null;
    this.stack = 21;
    this.turn = Math.floor(Math.random() * 2) + 1;

    //player in turn
    // highscore
  }

  start() {
    if (this.selectPlayerOne.value == this.selectPlayerTwo.value) {
      alert("Player 1 and Player 2 cant be the same player");
      return;
    }
    this.playerOne = this.players[this.selectPlayerOne.value];
    this.playerTwo = this.players[this.selectPlayerTwo.value];
    this.blockStartGame.style.display = "none";
    this.blockAddPlayer.style.display = "none";
    this.blockHighScore.style.display = "none";
    this.blockGame.style.display = "block";
    this.blockGame.querySelector("h2").innerHTML = this.getPlayerHasTurn().name;
    let sticks = [];
    for (let n = 0; n < this.stack; n++) {
      sticks.push(`<img style="width:10px;" src="img/stick.svg" />`);
    }
    this.elementSticks.innerHTML = sticks.join("");
  }

  addPlayerToSelect() {
    this.players.push(new Player(this.inputPlayer.value));
    var name = this.inputPlayer.value;
    var option = document.createElement("option");
    var option2 = document.createElement("option");
    option.text = name;
    option2.text = name;
    option.value = this.players.length - 1;
    option2.value = this.players.length - 1;
    this.selectPlayerOne.add(option);
    this.selectPlayerTwo.add(option2);
    this.inputPlayer.value = "";
  }

  makeMove() {
    this.stack -= this.selectMove.value;
    this.selectMove.value = "start";
    if (this.stack == 0) {
      if (this.turn == 1) {
        this.win(this.playerTwo);
      } else {
        this.win(this.playerOne);
      }
    }
    if (this.stack == 1) {
      this.selectMove.querySelector("#s2").style.display = "none";
      this.selectMove.querySelector("#s3").style.display = "none";
    }
    if (this.stack == 2) {
      this.selectMove.querySelector("#s3").style.display = "none";
    }
    let sticks = [];
    for (let n = 0; n < this.stack; n++) {
      sticks.push(`<img style="width:10px;" src="img/stick.svg" />`);
    }
    this.elementSticks.innerHTML = sticks.join("");
    if (this.turn == 1) {
      this.turn = 2;
    } else {
      this.turn = 1;
    }
    if (this.stack !== 21) {
      this.blockGame.querySelector("h2").innerHTML = this.getPlayerHasTurn().name;
    }
  }

  resetGame() {
    this.playerOne = null;
    this.playerTwo = null;
    this.stack = 21;
    this.turn = Math.floor(Math.random() * 2) + 1;

    this.blockStartGame.style.display = "block";
    this.blockAddPlayer.style.display = "block";
    this.blockHighScore.style.display = "block";
    this.blockGame.style.display = "none";
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
    let highScoresMapedToString = this.highScores
      .map((a) => {
        return `<tr>
         <td>${a.name}</td>
        <td>${a.score}</td>
      </tr>`;
      })
      .join("");
    this.blockHighScore.querySelector("tbody").innerHTML = highScoresMapedToString;
    this.resetGame();
    swal(`Grattis ${player.name} `, "Du vann!", "success");
  }

  getPlayerHasTurn() {
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
  // Possible methods for a player to do ...
}
