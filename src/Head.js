class Head {
  constructor(el, apple, body) {
 
    this.node = document.createElement('img');
    this.node.setAttribute('id', 'head');
    this.node.setAttribute('src', 'src/assets/snake.png');
    el.appendChild(this.node);

    this.currentDirection = state.direction;
    this.SPEED = 250;
    this.apple = apple;
    this.node.style.top = 0;
    this.node.style.left = 0;

    this.board = el;
    this.body = body;

   setTimeout(this.move.bind(this), this.SPEED);

  }

  move() {

    if (state.gameOver) state.gameStop();

    const head = this.node;

    const originalTop = head.style.top;
    const originalLeft = head.style.left;

    let direction = this.currentDirection;

    let topPosition = Number(head.style.top.replace('px', ''));
    let leftPosition = Number(head.style.left.replace('px', ''));

    if (direction === 'right') {
     if (leftPosition < 650) {  
        head.style.left = `${(leftPosition += 50)}px`;
      }
    }

    if (direction === 'left') {
      if (leftPosition >= 50) {
         head.style.left = `${(leftPosition -= 50)}px`;
      } else {
        state.gameOver = true;
      }
    }

    if (direction === 'up') {
      if (topPosition >= 50) {
         head.style.top = `${(topPosition -= 50)}px`;
      } else {
          state.gameOver = true;
      }
    }

    if (direction === 'down') {
      if (topPosition < 650) {
        head.style.top = `${(topPosition += 50)}px`;
      } else {
        state.gameOver = true;
      }
    }
    
    // body hitting itself
    if (this.body.isBodyCollision(head.style.top, head.style.left)) {
      state.gameOver = true;
    }

    // snake head hitting apple
    if (this.apple.getLeft() === head.style.left && this.apple.getTop() === head.style.top) {
      
      // grow snake by 1
      this.body.addNode();

      // add to score by 1 and re-render
      state.score +=1;
      renderScore();

      // move apple to new position (and check for body collision)
      this.apple.moveRandom();

    }

    // keep track of body position
    this.body.move(originalTop, originalLeft);

    setTimeout(this.move.bind(this), this.SPEED);
  }
}
