import { Ship } from "../src/index.js"

test("isSunk function works", () => {
    const sub = new Ship("sub", 2)
    sub.hits = 2
    expect(sub.isSunk()).toBe(true)
})

//Did not test this yet 
test("Hit function works for the ships", () => {
    const sub = new Ship("sub", 2)

    const Board = new Gameboard
    Board.board[0][0] = sub
    Board.board[0][1] = sub

    Board.recieveAttack(0, 0)

    expect(sub.hits).toBe(1)

})