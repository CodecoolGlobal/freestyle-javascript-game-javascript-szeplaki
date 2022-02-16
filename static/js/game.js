let snake = [getSnakeCoordinates(7, 0),
                getSnakeCoordinates(7, 1),
                getSnakeCoordinates(7, 2)]

let snakeDirection = 'right';

function initGame() {
    let snakeSpeed = 1;
    let intervalTime = 0;
    let interval = 0;

    createBoard();
    initSnake(snake);
    startGame();
    createMenu();
    // Your game can start here, but define separate functions, don't write everything in here :)
}

function initSnake(snake) {
        document.querySelector(`[data-row="${snake[0].row}"][data-col="${snake[0].col}"]` ).classList.add('snake-tail');
        document.querySelector(`[data-row="${snake[1].row}"][data-col="${snake[1].col}"]` ).classList.add('snake');
        document.querySelector(`[data-row="${snake[2].row}"][data-col="${snake[2].col}"]` ).classList.add('snake-head');
}

function startGame() {
    document.addEventListener('keydown', function(e) {
            switch (e.keyCode) {
                case 37:
                    snakeDirection = 'left'
                    break;
                case 38:
                    snakeDirection = 'up'
                    break;
                case 39:
                    snakeDirection = 'right'
                    break;
                case 40:
                    snakeDirection = 'down'
                    break;
            }})
    let snakeSpeed = 1;
    let intervalTime = 500;
    let interval = 0;
    interval = setInterval(() => moveSnake(snakeDirection), intervalTime);
}

function getSnakeCoordinates(row, col) {
    return {row:row, col:col}
}

function moveSnake(snakeDirection) {
    let head = document.getElementsByClassName('snake-head')[0];
    let middle = document.getElementsByClassName('snake')[0];
    let tail = document.getElementsByClassName('snake-tail')[0];
    let head_row = Number(head.dataset.row)
    let head_col = Number(head.dataset.col)
    switch (snakeDirection) {
        case 'left':
            head_col -= 1;
            break;
        case 'up':
            head_row -= 1;
            break;
        case 'right':
            head_col += 1;
            console.log(head_col)
            break;
        case 'down':
            head_row += 1;
            break;
    }


    let elementOfNewHeadCoords = document.querySelector(`[data-row="${head_row}"][data-col="${head_col}"]` );
    elementOfNewHeadCoords.classList.add('snake-head')
    head.classList.add('snake');
    head.classList.remove('snake-head');
    middle.classList.add('snake-tail');
    middle.classList.remove('snake')
    tail.classList.remove('snake-tail');

}


function createBoard(){
    let center = document.createElement('center');
    let Board = document.createElement('table');
    let rowCounter = 0;
    for (let i = 0; i < 15; i++) {
        let tr = document.createElement('tr');
        tr.dataset.row = rowCounter.toString();
        let colCounter = 0;
        for (let j = 0; j < 15; j++) {
            let td = document.createElement('td');
            td.dataset.row = rowCounter.toString();
            td.dataset.col = colCounter.toString();
            colCounter++;
            if ((i + j) % 2 === 0) {
                td.setAttribute('class', 'cell mediumseagreen-cell');
                tr.appendChild(td);
            } else {
                td.setAttribute('class', 'cell lightgreen-cell');
                tr.appendChild(td);
            }
        }rowCounter++;
        Board.appendChild(tr);
    }
    center.appendChild(Board);

    // Modifying table attribute properties
    Board.setAttribute('cellspacing', '0');
    Board.setAttribute('width', '800px');
    document.body.appendChild(center);
    // drop_apple_on_board(Board)
}

function createMenu(){
    let menu = document.createElement('div');
    menu.className = "menu";
    let menuOption1 = document.createElement('div');
    menuOption1.className = "option";
    let startGame = document.createElement('button');
    startGame.id = 'Start';
    startGame.textContent = 'Start Game';
    startGame.onclick = (e)=> {chosenEvent(e)};
    menuOption1.appendChild(startGame);
    let menuOption2 = document.createElement('div');
    menuOption2.className = "option";
    let highScore = document.createElement('button');
    highScore.id = 'high-score';
    highScore.textContent = 'Highest Scores';
    highScore.onclick = (e) => {chosenEvent(e)};
    menuOption2.appendChild(highScore)
    let menuOption3 = document.createElement('div');
    menuOption3.className = "option";
    let credits = document.createElement('button');
    credits.id = 'credits';
    credits.textContent = 'Credits';
    credits.onclick = (e) => {chosenEvent(e)};
    menuOption3.appendChild(credits)
    menu.append(menuOption1);
    menu.append(menuOption2);
    menu.append(menuOption3);
    document.body.appendChild(menu);
}

function chosenEvent(e){
    if (e.target.id === 'Start'){
        removeMenu();
        createBoard();
    }else if (e.target.id === 'high-score'){
        removeMenu();
        displayHighScore();

    }else if (e.target.id === 'credits'){
        removeMenu();
        displayCredit();
    }
}

function removeMenu() {
    let menu = document.getElementsByClassName('menu');
    while (menu.length > 0) {
        menu[0].remove();
        }

}

function displayHighScore(){
    removeMenu();
    let pTag = document.createElement('h1');
    pTag.textContent = "highscores"
    document.body.appendChild(pTag);

}

function displayCredit(){
    removeMenu();
    let pTag2 = document.createElement('p');
    pTag2.textContent = "credits";
    document.body.appendChild(pTag2);
}
initGame();


function drop_apple_on_board(Board){
    const rnd_col = Math.floor(Math.random() * 14) + 0;
    const rnd_row = Math.floor(Math.random() * 14) + 0;
    console.log(rnd_col, rnd_row)
    Board.children[rnd_col].children[rnd_row].innerHTML = "";
    return Board
}
