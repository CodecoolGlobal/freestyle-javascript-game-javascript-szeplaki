function initGame() {
    createBoard()
    // Your game can start here, but define separate functions, don't write everything in here :)
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
    drop_apple_on_board(Board)
}
initGame();


function drop_apple_on_board(Board){
    const rnd_col = Math.floor(Math.random() * 14) + 0;
    const rnd_row = Math.floor(Math.random() * 14) + 0;
    console.log(rnd_col, rnd_row)
    Board.children[rnd_col].children[rnd_row].innerHTML = "APPLE";
    return Board
}
