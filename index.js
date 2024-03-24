
function boardPlugin(NUMBER_SQUARES = 500) {
    const board = document.querySelector('#board')

    for (let i = 0; i < NUMBER_SQUARES; i++) {
        const square = document.createElement('div')
        square.classList.add('square')

        square.addEventListener('mouseover', () => setColor(square))
        square.addEventListener('mouseleave', () => removeColor(square))

        board.append(square)
    }
}

function setColor(element) {
    const color = `rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()})`
    element.style.backgroundColor = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function removeColor(element) {
    element.style.backgroundColor = '#1d1d1d'
    element.style.boxShadow = '0 0 2px #1d1d1d'
}

function getRandomColor() {
    return Math.floor(Math.random() * 355)
}

// function sleep(milliseconds) {
//     const date = Date.now();
//     let currentDate = null;
//     do {
//       currentDate = Date.now();
//     } 
//     while (currentDate - date < milliseconds);
// }

class Board {
    constructor(num_squars) {
        this.num_squars = num_squars

        this.createBoard()

        this.boardPlugin(num_squars, this.board)
    }

    createBoard() {
        const body = document.querySelector('#body')
        const board = document.createElement('div')
        board.classList.add('board')
        board.id = 'board'
        body.append(board)
        this.board = board
    }

    boardPlugin(NUMBER_SQUARES, board) {
        for (let i = 0; i < NUMBER_SQUARES; i++) {
            const square = document.createElement('div')
            square.classList.add('square')
    
            square.addEventListener('mouseover', () => setColor(square))
            square.addEventListener('mouseleave', () => removeColor(square))
    
            board.append(square)
        }
    }
}

class SnakeGame{
    constructor(num_squars) {
        this.num_squars = num_squars

        this.x = 0
        this.y = 0

        this.x1 = 0
        this.y1 = 0

        this.score = 0

        this.path = []

        this.vector = 'right'

        this.createBoard()

        this.boardPlugin(num_squars, this.board)

        if(confirm("начать игру?"))
        {
            this.start()
        }
    }

    createBoard() {
        const body = document.querySelector('#body')
        const board = document.createElement('div')
        board.classList.add('board')
        board.id = 'board'
        board.style.width = `${this.num_squars * 20}px`
        body.append(board)
        this.board = board
    }

    boardPlugin(NUMBER_SQUARES, board) {
        for (let i = 0; i < NUMBER_SQUARES; i++) 
        {
            for (let j = 0; j < NUMBER_SQUARES; j++) 
            {
                const square = document.createElement('div')
                square.id = `px${j}_${i}`;
                square.classList.add('squareSnake')        
                board.append(square)
            }
        }
    }

    changeColor(element, index) {
        const color = `${index}`
        element.style.backgroundColor = color
        element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
    }

    changeColorBack(element) {
        element.style.backgroundColor = '#1d1d1d'
        element.style.boxShadow = '0 0 2px #1d1d1d'
    }

    restart()
    {
        this.x = 0
        this.y = 0

        this.x1 = 0
        this.y1 = 0

        this.score = 0

        this.path = []

        this.vector = 'right'

        for (let i = 0; i < this.num_squars; i++) 
        {
            for (let j = 0; j <this.num_squars; j++) 
            {
                const square = document.querySelector(`#px${j}_${i}`)

                this.changeColorBack(square)
            }
        }

        this.start()
    }

    start(){
        let lastSquar = null

        let i = 0

        let point = {x: null, y: null}

        let interval = setInterval(() => {

            const head = document.querySelector(`#px${this.x}_${this.y}`)

            if(head.style.backgroundColor == "rgb(0, 255, 0)")
            {
                if(confirm("Игра окончена\nваш счёт " + this.score + " очков\nначать новую игру?"))
                {
                    this.restart()
                }

                clearInterval(interval)

                return
            }

            this.changeColor(head, "rgb(0, 255, 0)")

            lastSquar = document.querySelector(`#px${this.x1}_${this.y1}`)

            if(point.x == null)
            {
                let isSnake = true
                while(isSnake)
                {
                    point.x = Math.floor(Math.random() * (this.num_squars - 1))

                    point.y = Math.floor(Math.random() * (this.num_squars - 1))

                    const cherry = document.querySelector(`#px${point.x}_${point.y}`)

                    if(cherry.style.backgroundColor != "rgb(0, 255, 0)")
                    {
                        this.changeColor(cherry, "red")
                        isSnake = false
                    }
                }
            }
            else if(point.x == this.x && point.y == this.y)
            {
                let isSnake = true
                while(isSnake)
                {
                    point.x = Math.floor(Math.random() * (this.num_squars - 1))

                    point.y = Math.floor(Math.random() * (this.num_squars - 1))

                    const cherry = document.querySelector(`#px${point.x}_${point.y}`)

                    if(cherry.style.backgroundColor != "rgb(0, 255, 0)")
                    {
                        this.changeColor(cherry, "red")
                        isSnake = false
                    }
                }
                this.score++
                i--
            }

            if(i > 2)
            {
                this.move(this.vector, true)
            }
            else
            {
                this.move(this.vector, false)
            }

            if(lastSquar != null && i > 2)
            {
                this.changeColorBack(lastSquar)
            }
            else{
                i++
            }
        }, 100)
    }

    move(index, moveLast) // 0 - up, 1 - down, 2 - right, 3 - left
    {
        this.path.push(index)

        switch(index){
            case 'up':
                if(this.path[this.path.length-2] != 'down')
                {
                    this.y--

                    if(this.y < 0)
                    {
                        this.y = this.num_squars - 1
                    } 
                }
                else
                {
                    this.path[this.path.length - 1] = 'down'

                    this.vector = 'down'

                    this.y++

                    if(this.y == this.num_squars)
                    {
                        this.y = 0
                    } 
                }
                break

            case 'down':
                if(this.path[this.path.length-2] != 'up')
                {
                    this.y++

                    if(this.y == this.num_squars)
                    {
                        this.y = 0
                    } 
                }
                else
                {
                    this.path[this.path.length - 1] = 'up'

                    this.vector = 'up'

                    this.y--

                    if(this.y < 0)
                    {
                        this.y = this.num_squars - 1
                    } 
                }
                break

            case 'left':
                if(this.path[this.path.length-2] != 'right')
                {
                    this.x--

                    if(this.x == -1)
                    {
                        this.x = this.num_squars - 1
                    } 
                }
                else
                {
                    this.path[this.path.length - 1] = 'right'

                    this.vector = 'right'

                    this.x++

                    if(this.x == this.num_squars)
                    {
                        this.x = 0
                    } 
                }
                break

            case 'right':
                if(this.path[this.path.length-2] != 'left')
                {
                    this.x++

                    if(this.x == this.num_squars)
                    {
                        this.x = 0
                    }  
                }
                else
                {
                    this.path[this.path.length - 1] = 'left'

                    this.vector = 'left'

                    this.x--

                    if(this.x == -1)
                    {
                        this.x = this.num_squars - 1
                    } 
                }
                break
        }
        
        if(moveLast)
        {
            switch(this.path[0]){
                case 'up':
                    this.y1--
    
                    if(this.y1 == -1)
                    {
                        this.y1 = this.num_squars - 1
                    } 
                    break
                case 'down':
                    this.y1++
    
                    if(this.y1 == this.num_squars)
                    {
                        this.y1 = 0
                    } 
                    break
                case 'left':
                    this.x1--
    
                    if(this.x1 == -1)
                    {
                        this.x1 = this.num_squars - 1
                    } 
                    break
                case 'right':
                    this.x1++
    
                    if(this.x1 == this.num_squars)
                    {
                        this.x1 = 0
                    }
                    break
            }
            
            this.path.shift();
        }
    }
}

const game = new SnakeGame(25)

document.addEventListener('keydown', function(event) 
{
    switch(event.code)
    {
        case 'KeyW':
            if(game.vector != 'down')
            {
                game.vector = 'up'
            }
            break
        case 'KeyS':
            if(game.vector != 'up')
            {
                game.vector = 'down'
            }
            break
        case 'KeyD':
            if(game.vector != 'left')
            {
                game.vector = 'right'
            }
            break
        case 'KeyA':
            if(game.vector != 'right')
            {
                game.vector = 'left'
            }
            break   
        case 'ArrowUp':
            if(game.vector != 'down')
            {
                game.vector = 'up'
            }
            break
        case 'ArrowDown':
            if(game.vector != 'up')
            {
                game.vector = 'down'
            }
            break
        case 'ArrowRight':
            if(game.vector != 'left')
            {
                game.vector = 'right'
            }
            break
        case 'ArrowLeft':
            if(game.vector != 'right')
            {
                game.vector = 'left'
            }
            break
    }
});