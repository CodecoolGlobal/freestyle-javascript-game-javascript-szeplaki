function initGame() {
    let snakeSpeed = 1;
    let intervalTime = 0;
    let interval = 0;
    let snake = [107, 106, 105]

    createBoard()
    initSnake(snake)
    setInterval(startGame, 2000)

    // Your game can start here, but define separate functions, don't write everything in here :)
}

function initSnake(snake) {
        document.getElementById(`${snake[0]}`).classList.add('snake-head');
        document.getElementById(`${snake[1]}`).classList.add('snake');
        document.getElementById(`${snake[2]}`).classList.add('snake-tail');
}


function startGame() {
    let snakeSpeed = 1;
    let intervalTime = 2000;
    let interval = 0;
    interval = setInterval(moveSnake, intervalTime);
}

function moveSnake() {
    console.log('1 round')
    let head = document.getElementsByClassName('snake-head');
    let tail = document.getElementsByClassName('snake-tail');
    head.className.remove('snake-head');
    head.className.add('snake');
    tail.className.remove('snake-tail');
    let nextHead = head.id++
    let nextTail = tail.id++
    document.getElementById(`${nextHead}`).classList.add('snake-head');
    document.getElementById(`${nextTail}`).classList.add('snake-tail');
}


function createBoard(){
    let center = document.createElement('center');
    let Board = document.createElement('table');
    let row = 0;
    let col = 0;
    for (let i = 0; i < 15; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < 15; j++) {
            let td = document.createElement('td');
            td.setAttribute('id', col)
            col++;
            if ((i + j) % 2 === 0) {
                td.setAttribute('class', 'cell mediumseagreen-cell');
                tr.appendChild(td);
            } else {
                td.setAttribute('class', 'cell lightgreen-cell');
                tr.appendChild(td);
            }
        }
        Board.appendChild(tr);
    }
    center.appendChild(Board);

    // Modifying table attribute properties
    Board.setAttribute('cellspacing', '0');
    Board.setAttribute('width', '800px');
    document.body.appendChild(center);
}
initGame();
