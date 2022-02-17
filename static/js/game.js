let snake = [getSnakeCoordinates(7, 0),
                getSnakeCoordinates(7, 1),
                getSnakeCoordinates(7, 2)]
let intervalTime = 500;
let snakeDirection = 'right';
let score = 0;
let counter = 0;
let counterDataId = 1;
let globalRow = 15;
let globalCol = 15;
let gameInterval = {};

let gameOverSound = document.querySelector('#gameOver');
let appleSound = document.querySelector('#appleSound');


function initSnake(snake) {
        document.querySelector(`[data-row="${snake[0].row}"][data-col="${snake[0].col}"]` ).classList.add('snake-tail');
        document.querySelector(`[data-row="${snake[1].row}"][data-col="${snake[1].col}"]` ).classList.add('snake');
        document.querySelector(`[data-row="${snake[1].row}"][data-col="${snake[1].col}"]` ).dataset.id = "0";
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
    gameInterval = setInterval(() => moveSnake(snakeDirection), intervalTime);
    setInterval(function (){
         document.getElementById('counter').innerHTML = 'Time: ' + counter.toString();
        counter++;
        }
        , 1000);
}

function getSnakeCoordinates(row, col) {
    return {row:row, col:col}
}


function moveSnake(snakeDirection) {
    let head = document.getElementsByClassName('snake-head')[0];
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
            break;
        case 'down':
            head_row += 1;
            break;
    }

    let elementOfNewHeadCoords = document.querySelector(`[data-row="${head_row}"][data-col="${head_col}"]`);
    checkWall(head_row, head_col);
    checkSnake(elementOfNewHeadCoords);

    if (elementOfNewHeadCoords.classList.contains('apple')) {
        appleSound.src = 'static/sfx/appleSound.wav';
        appleSound.play();
        elementOfNewHeadCoords.classList.remove('apple');
        elementOfNewHeadCoords.classList.add('snake-head');
        head.classList.add('snake');
        head.dataset.id = counterDataId.toString();
        counterDataId++;
        score += 100;
        document.getElementById('score').textContent = 'Score: ' + score.toString();
        head.classList.remove('snake-head');
        let appleCoords = dropAppleOnBoard(globalRow, globalCol);
        let coordsToCheck = document.querySelector(`[data-row="${appleCoords.appleRow}"][data-col="${appleCoords.appleCol}"]`);
        if (coordsToCheck.classList.contains('snake') || coordsToCheck.classList.contains('snake-tail')) {
            while (coordsToCheck.classList.contains('snake') === true || coordsToCheck.classList.contains('snake-tail') === true) {
                dropAppleOnBoard(globalRow, globalCol);
            }
        } else {
            document.querySelector(`[data-row="${appleCoords.appleRow}"][data-col="${appleCoords.appleCol}"]`).classList.add('apple');
        }
    } else {
        let middles = document.querySelectorAll("[data-id]");
        let array = []
        for (let elem of middles) {
            let dataId = elem.getAttribute('data-id');
            array.push(Number(dataId));
        }
        let minimumNumber = Math.min(...array);
        let newTail = document.querySelector(`[data-id = '${minimumNumber}']`);
        elementOfNewHeadCoords.classList.add('snake-head');
        head.classList.add('snake');
        head.classList.remove('snake-head');
        head.dataset.id = counterDataId.toString();
        counterDataId++;
        delete newTail.dataset.id;
        newTail.classList.add('snake-tail');
        newTail.classList.remove('snake');
        tail.classList.remove('snake-tail');
    }
}

function checkWall(row, col){
    if (row === globalRow || col === globalCol || row === -1 || col === -1) {
        gameOver();
    }
}


function checkSnake(elementOfNewHeadCoords) {
    if (elementOfNewHeadCoords.classList.contains('snake') || elementOfNewHeadCoords.classList.contains('snake-tail')) {
        gameOver();
    }
}


function gameOver() {
    let h1 = document.querySelector('h1');
    h1.textContent = 'Game over!';
    gameOverSound.src = 'static/sfx/game_over.wav';
    gameOverSound.play();
    clearInterval(gameInterval)
    createMenu()
}


function createBoard(globalRow, globalCol){
    let timer = document.createElement('div');
    timer.className = 'timer';
    let countingTime = document.createElement('p');
    countingTime.id = 'counter';
    countingTime.innerHTML = 'Time: ' + counter.toString();
    timer.appendChild(countingTime);
    let displayScore = document.createElement('div');
    displayScore.className = 'Score';
    let pTag = document.createElement('p');
    pTag.setAttribute('id', 'score');
    pTag.textContent = 'Score: ' + score.toString();
    displayScore.appendChild(pTag);
    let center = document.createElement('center');
    let Board = document.createElement('table');
    let rowCounter = 0;
    for (let i = 0; i < globalRow; i++) {
        let tr = document.createElement('tr');
        tr.dataset.row = rowCounter.toString();
        let colCounter = 0;
        for (let j = 0; j < globalCol; j++) {
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
    let appleCoords = dropAppleOnBoard(globalRow, globalCol);
    Board.children[appleCoords.appleRow].children[appleCoords.appleCol].classList.add('apple');
    saveHighScore();
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
        createBoard(globalRow, globalCol);
        initSnake(snake);
        startGame();

    }else if (e.target.id === 'high-score'){
        removeMenu();
        displayHighScore();

    }else if (e.target.id === 'credits'){
        removeMenu();
        displayCredit();
    }else if (e.target.id === 'backToMain'){
        removeCredits();
        createMenu();
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
    let credits = document.createElement('div');
    credits.className = 'credits'
    let header = document.createElement('h1');
    header.id = 'header';
    header.textContent = 'Credits'
    let container = document.createElement('div');
    container.className = 'container';
    let pTag = document.createElement('p');
    pTag.id = 'roller';
    pTag.textContent = "Some words";
    container.append(pTag);
    let btnContainer = document.createElement('div');
    btnContainer.className = 'hidden-button';
    let button = document.createElement('button');
    button.id = 'backToMain';
    button.textContent = 'Back';
    button.onclick = (e) => {chosenEvent(e)};
    btnContainer.append(button);
    credits.append(header);
    credits.append(container);
    credits.append(btnContainer)
    document.body.appendChild(credits);
    let creators = ['Creators of JavaSnake',
               'Éva Széplaki',
               'Barbara Szabó-Huszár',
               'Bálint Vitai',
               'Gyula Borbély',
               'Special Thanks',
               'to All Mentors for helping us build the game',
               'Codecool for allowing us to have FUN in JS',
               'and to You guys for playing the game!'
               ];
    creators.forEach((creator, index) => {
        setTimeout(() => {
            pTag.textContent = creator;}, index * 4000)
    })

}

function removeCredits(){
    let credits = document.getElementsByClassName('credits')
    while (credits.length > 0){
        credits[0].remove();
    }
}

function dropAppleOnBoard(globalRow, globalCol){
    const rnd_col = Math.floor(Math.random() * (globalCol-1)) + 0;
    const rnd_row = Math.floor(Math.random() * (globalRow-1)) + 0;
    let appleCoords = {
        appleRow: rnd_row,
        appleCol: rnd_col
    }
    return appleCoords;
}
function initGame() {
    createMenu();
    // Your game can start here, but define separate functions, don't write everything in here :)
}
initGame();