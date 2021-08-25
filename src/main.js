const state = {
  body: null,
  board: null,
  home: null,
  game: null,
  header: null,
  apple: null,
  snakeBoddy: null,
  head: null,
  score: 0,
  button: null,
  status: null,
  gameOver: false,
  gameReset: gameReset,
  timeout: null,
  gameStop: gameStop
} 

init = () => {

  state.body = document.querySelector('body');
  state.board = document.querySelector('#board');
  state.home = document.querySelector('#homescreen');
  state.game = document.querySelector('#game');
  state.button = document.querySelector("#button");
  state.header = document.querySelector('header');
  state.status = document.querySelector('#status');
}

button = () => {

   state.button.addEventListener('click', (e) => {

      switch (state.button.textContent) {

        case 'Start Game': gameRender();
              break;
        case 'Restart Game': gameReset();
             break;
      }
   });
}

gameRender = () => {

  renderScore(); // display current score

  state.header.style.visibility = "visible"; // unhide header
  state.game.style.display = "block"; // unhide game elements
  state.home.style.display = "none"; // hide home screen image
  state.button.classList.add("eightbit-btn--reset"); // convert to a "re-set button style" 
  state.button.textContent = "Restart Game";  // update button text
  state.button.style.visibility = "hidden"; // hide button until game over

  state.snakeBody = new Body(state.board);
  state.apple = new Apple(state.board, state.snakeBody);
  state.head =  new Head(state.board, state.apple, state.snakeBody);

  state.apple.moveRandom();

  state.body.addEventListener('keydown', (e) => {
  
    switch (e.code) {
      case 'ArrowLeft':  state.head.currentDirection !== 'right' ? state.head.currentDirection = 'left' : state.head.currentDirection = 'right';
            break;
      case 'ArrowRight': state.head.currentDirection !== 'left' ?  state.head.currentDirection = 'right' : state.head.currentDirection = 'left';
            break;
      case 'ArrowUp':    state.head.currentDirection !== 'down' ? state.head.currentDirection = "up" : state.head.currentDirection = 'down';
            break;
      case  'ArrowDown': state.head.currentDirection !== 'up' ? state.head.currentDirection = "down" : state.head.currentDirection = 'up'
            break;
    }

  });
}

function gameStop() {

  state.button.style.visibility = "visible";
  state.status.style.visibility = "visible";
}


function gameReset() {

  state.gameOver = false;
  state.button.style.visibility = "hidden";
  state.status.style.visibility = "hidden";

  state.score = 0;
  renderScore(); 

  state.apple.node.remove() 
  state.apple = null;

  state.head.node.remove();
  state.head = null;

  for (const node of state.snakeBody.nodes) {
    node.remove();
  }

  state.snakeBody.nodes = []
  state.snakeBoddy = null;

  state.snakeBody = new Body(state.board);
  state.apple = new Apple(state.board, state.snakeBody);
  
  state.apple.moveRandom();

  state.head =  new Head(state.board, state.apple, state.snakeBody);

}

renderScore = () => {

   document.querySelector("#score").textContent = `Score: ${state.score}`;
}

bootstrap = () => {

  init(); // init body and board
  button() // setup button
}

$(bootstrap);