class Apple {
  constructor(el, body) {
    this.node = document.createElement('img');
    this.node.setAttribute('id', 'apple');
    this.node.setAttribute('src', 'src/assets/apple.png');
    this.body = body;

    el.appendChild(this.node);

  }

  getLeft() {
    return this.node.style.left;
  }

  getTop() {
    return this.node.style.top;
  }

  moveRandom() {

    const newTop = Math.floor(Math.random() * (13 + 1)) * 50;
    const newLeft = Math.floor(Math.random() * (13 + 1)) * 50;

   // while (this.body.isBodyCollision(`${newTop}px`, `${newLeft}px`)) {
    //   console.log("ggg");
   //    newTop = Math.floor(Math.random() * (13 + 1)) * 50;
   //     newLeft = Math.floor(Math.random() * (13 + 1)) * 50;
   // }
    
    this.node.style.top = `${newTop}px`;
    this.node.style.left = `${newLeft}px`;
  }


}
