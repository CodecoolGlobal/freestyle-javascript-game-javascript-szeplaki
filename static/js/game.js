function initGame() {
    createBoard()
    // Your game can start here, but define separate functions, don't write everything in here :)
}

function createBoard(){
    let center = document.createElement('center');
    let Board = document.createElement('table');
    let counter = 0;
    for (let i = 0; i < 15; i++) {
        let tr = document.createElement('tr');

        for (let j = 0; j < 15; j++) {

            let td = document.createElement('td');
            td.setAttribute('id', counter)
            counter++;
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
