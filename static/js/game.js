let snake = [getSnakeCoordinates(7, 0),
                getSnakeCoordinates(7, 1),
                getSnakeCoordinates(7, 2)]

let snakeDirection = 'right';
let score = 0;
let counter = 0;


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
    let intervalTime = 500;
    setInterval(() => moveSnake(snakeDirection), intervalTime);
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


    let elementOfNewHeadCoords = document.querySelector(`[data-row="${head_row}"][data-col="${head_col}"]`);
    elementOfNewHeadCoords.classList.add('snake-head')
    head.classList.add('snake');
    head.classList.remove('snake-head');
    middle.classList.add('snake-tail');
    middle.classList.remove('snake')
    tail.classList.remove('snake-tail');
}

function createBoard(){
    let timer = document.createElement('div');
    timer.className = 'timer';
    let countingTime = document.createElement('p');
    countingTime.id = 'counter';
    countingTime.innerHTML = 'Time: ' + counter.toString();
    setInterval(function (){
         document.getElementById('counter').innerHTML = 'Time: ' + counter.toString();
        counter++
        }
        , 1000);
    timer.appendChild(countingTime);
    let displayScore = document.createElement('div');
    displayScore.className = 'Score';
    let pTag = document.createElement('p');
    pTag.textContent = 'Score: ' + score.toString();
    displayScore.appendChild(pTag);
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
    document.body.appendChild(timer);
    document.body.appendChild(displayScore);
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
    let hsForm = document.createElement('form');
    hsForm.action = '/high-score';
    let highScore = document.createElement('button');
    highScore.type = 'submit';
    highScore.value = score.toString();
    highScore.textContent = 'High Score';
    hsForm.append(highScore)
    menuOption2.appendChild(hsForm);
    let menuOption3 = document.createElement('div');
    menuOption3.className = "option";
    let credits = document.createElement('button');
    credits.id = 'credits';
    credits.textContent = 'Credits';
    credits.onclick = (e) => {chosenEvent(e)};
    menuOption3.appendChild(credits)
    document.body.appendChild(menu);
    let menuOption4 = document.createElement('div');
    menuOption4.className = "option";
    let quitForm = document.createElement('form');
    quitForm.action = '/logout';
    quitForm.method = 'POST';
    let quit = document.createElement('button');
    quit.type = 'submit';
    quit.textContent = 'Quit';
    quitForm.append(quit);
    menuOption4.appendChild(quitForm);
    menu.append(menuOption1);
    menu.append(menuOption2);
    menu.append(menuOption3);
    menu.append(menuOption4);
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

function saveHighScore(){
    let formToSend = document.createElement('form')
    formToSend.action = '/high-score';
    formToSend.method = 'POST';
    let inputScore = document.createElement('input');
    inputScore.type = 'hidden';
    inputScore.value = score.toString(); //here comes the highscore
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



function drop_apple_on_board(Board){
    const rnd_col = Math.floor(Math.random() * 14) + 0;
    const rnd_row = Math.floor(Math.random() * 14) + 0;
    console.log(rnd_col, rnd_row)
    Board.children[rnd_col].children[rnd_row].innerHTML = "APPLE";
    return Board
}
function initGame() {
    createMenu();
    createBoard();
    initSnake(snake);
    startGame();
    // Your game can start here, but define separate functions, don't write everything in here :)
}
initGame();