class Body {

    constructor(board) {
        this.nodes = [];
        this.board = board;
    }

    addNode() {

        const newNode = document.createElement('img');
        newNode.setAttribute('id', 'body');
        newNode.setAttribute('src', 'src/assets/body.png');

        this.board.appendChild(newNode);
        this.nodes.push(newNode);
    }

    move(top, left) {

        for (let i = this.nodes.length - 1; i > 0; i--) {
            const currentNode = this.nodes[i];
            const previousNode = this.nodes[i-1];
            currentNode.style.top = previousNode.style.top;
            currentNode.style.left = previousNode.style.left;
        }

        if (this.nodes.length > 0) {
            this.nodes[0].style.top = top;
            this.nodes[0].style.left = left;
        }
    }

    isBodyCollision(top, left) {

        for (const node of this.nodes) {
            if (node.style.top === top && node.style.left === left) {
                return true;
            }
        }

        return false;
    }

    restart() {
        for (const node of this.nodes) {
            node.remove();
        }
        this.nodes = [];
    }
}