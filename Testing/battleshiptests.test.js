import { Ship } from "../src/index.js"

test("isSunk function works", () => {
    const sub = new Ship(2)
    sub.length = 2
    sub.hits = 2
    expect(sub.isSunk()).toBe(true)
})