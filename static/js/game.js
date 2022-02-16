let score = 0;
let counter = 0;

function initGame() {
    createMenu();

    let snakeSpeed = 1;
    let intervalTime = 0;
    let interval = 0;
    let snake = [getSnakeCoordinates(7, 2),
                getSnakeCoordinates(7, 1),
                getSnakeCoordinates(7, 0)]


    initSnake(snake)
    setInterval(startGame, 2000)


    // Your game can start here, but define separate functions, don't write everything in here :)
}

function initSnake(snake) {
        document.querySelector(`[data-row="${snake[0].row}"][data-col="${snake[0].col}"]` ).classList.add('snake-head');
        document.querySelector(`[data-row="${snake[1].row}"][data-col="${snake[1].col}"]` ).classList.add('snake');
        document.querySelector(`[data-row="${snake[2].row}"][data-col="${snake[2].col}"]` ).classList.add('snake-tail');
}

function startGame() {
    let snakeSpeed = 1;
    let intervalTime = 2000;
    let interval = 0;
    interval = setInterval(moveSnake, intervalTime);
}

function getSnakeCoordinates(row, col) {
    return {row:row, col:col}
}

function moveSnake(snake) {
    debugger;
    let head = document.getElementsByClassName('snake-head');
    let middle = document.getElementsByClassName('snake')
    let tail = document.getElementsByClassName('snake-tail');
    head[0].classList.add("snake");
    head[0].classList.remove('snake-head');
    tail[0].classList.remove('snake-tail');
    // let nextHead = snake[0].row, snake[0].col
    // let nextTail = tail.id++
    // document.getElementById(`${nextHead}`).classList.add('snake-head');
    // document.getElementById(`${nextTail}`).classList.add('snake-tail');
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
    drop_apple_on_board(Board)
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
initGame();


function drop_apple_on_board(Board){
    const rnd_col = Math.floor(Math.random() * 14) + 0;
    const rnd_row = Math.floor(Math.random() * 14) + 0;
    console.log(rnd_col, rnd_row)
    Board.children[rnd_col].children[rnd_row].innerHTML = "APPLE";
    return Board
}

