export class Ship {
    constructor(length) {
        this.length = length
        this.hit = 0
        this.sunk = false
    }

    hit() {
        this.hit += 1 
    }

    isSunk() {
        if (this.hits == this.length) return true
        return false
    }
}

export class Gameboard {
    constructor() {
        this.board = []
        for (let i = 0; i < 10; i++) {
            let row = []
            for (let j = 0; j < 10; j++) row.push(null)
            this.board.push(row)
        }
    }

    recieveAttack(x, y) {

    }
}

export class Player {
    constructor(name) {
        this.name = name
        this.Gameboard = new Gameboard
    }
}

