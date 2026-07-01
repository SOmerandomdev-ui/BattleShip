export class Ship {
    constructor(name, length) {
        this.name = name 
        this.length = length
        this.hits = 0
        this.sunk = false
    }

    hit() {
        this.hits += 1 
        return this.isSunk()  
    }

    isSunk() {
        if (this.hits == this.length) return true
        return false
    }
}

export class Gameboard {
    constructor() {
        this.board = []
        this.ships = 5
        for (let i = 0; i < 10; i++) {
            let row = []
            for (let j = 0; j < 10; j++) row.push(null)
            this.board.push(row)
        }
    }

    recieveAttack(x, y) {
        if (this.board[x][y] == "hit") {
            alert("You can't choose a square you already hit")
            return false
        }

        //if there is a ship there
        else if (this.board[x][y]) {
            if (this.board[x][y].hit()) {
                this.ships -= 1
            }
            this.board[x][y] = "hit"
            return true 
        }

        //if nothing is there 
        this.board[x][y] = "hit"
        return true 

    }
}

export class Player {
    constructor(name) {
        this.name = name
        this.Gameboard = new Gameboard
    }
}

