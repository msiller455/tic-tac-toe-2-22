/*----- constants -----*/
const players = {
    '1': 'pink',
    '-1': 'blue'
}

const winCombos = [
    [0, 1, 2],    
    [3, 4, 5],    
    [6, 7, 8],    
    [0, 3, 6],    
    [1, 4, 7],    
    [2, 5, 8],    
    [0, 4, 8],    
    [2, 4, 6],    
]

/*----- app's state (variables) -----*/
let board, turn, score, winner

/*----- cached element references -----*/
const tbodyEl = document.querySelector('tbody')
const h1El = document.querySelector('h1')
const buttonEl = document.querySelector('button')
const h2El = document.querySelector('h2')

/*----- event listeners -----*/
tbodyEl.addEventListener('click', handlePlayerClick)

buttonEl.addEventListener('click', function(evt) {
    init()
})

/*----- functions -----*/
function init() {
    board = [null, null, null, null, null, null, null, null, null]
    turn = 1
    score = score || {
        '1': 0,
        '-1': 0
    }
    winner = null
    render()
}

function render() {
    // How to do with if statement. OK but ideal
    // if(turn === 1) {
    //     h1El.textContent = "Pink's turn"
    // } else {
    //     h1El.textContent = "Blue's turn"
    // }
    if(winner) {
        h1El.textContent = `Congrats ${players[winner].toUpperCase()}`
    } else {
        h1El.textContent = `${ players[turn].toUpperCase() }'s turn`
    }

    board.forEach(function(square, idx) {
        const tdEl = document.getElementById('sq' + idx)
        if(square) {
            tdEl.innerHTML = `<div style="background: ${ players[square] }"></div>`
        } else {
            tdEl.innerHTML = ''
        }
    })

    h2El.textContent = `${players[1].toUpperCase()} Score: ${score[1]} ${players[-1].toUpperCase()} Score: ${score[-1]}`
}

function handlePlayerClick(evt) {
    const idx = evt.target.id[2]
    if(!board[idx] && !winner) {
        board[idx] = turn
        checkWin()
        changeTurn()
        render()
    }
}

function changeTurn() {
    turn *= -1
}

function checkWin() {
    winCombos.forEach(function(combo) {
        if( Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3 ) {
            winner = board[combo[0]]
            score[winner] += 1
            
        }
    })
}



/*---- Runs the game -----*/
init()