import {Gameboard, Ship, Player} from "./index.js"
import "./styles.css"

function AddShips(Parent) {
    const ShipContainer = document.createElement("div")
    ShipContainer.classList.add("ShipContainer")
    Parent.appendChild(ShipContainer)

    const ShipContainerTitle = document.createElement("div")
    ShipContainerTitle.classList.add("ShipContainerTitle")
    ShipContainerTitle.textContent = "Ship Container"
    ShipContainer.appendChild(ShipContainerTitle)

}

const Singleplayer = document.querySelector('.Single')
const Twoplayer = document.querySelector('.Double')

Twoplayer.addEventListener("click", () => {
    const Player1 = new Player(prompt("What is Player 1's name"))
    const Player2 = new Player(prompt("What is Player 2's name"))

    const Selection = document.querySelector(".Selection")
    Selection.remove()

    const PlayContainer = document.createElement("div")
    const body = document.querySelector('body')
    body.appendChild(PlayContainer)

    const Setup = document.createElement("div")
    Setup.classList.add("Setup")
    PlayContainer.appendChild(Setup)

    const AttackView = document.createElement("div")
    AttackView.classList.add("Attackview")
    PlayContainer.appendChild(AttackView)

    //Create the grid for the defense view 
    for (let i = 0; i < 10; i++) {
        let squarerow = document.createElement('div') 
        squarerow.classList.add("squarecontainer")
        Setup.appendChild(squarerow)

        for (let j = 0; j < 10; j++) {
            let square = document.createElement('div')
            square.classList.add("square")
            squarerow.appendChild(square)
        }
    }

    //Message telling you to place the boats 
    const Message = document.createElement("div")
    Message.classList.add("Message")
    Message.textContent = "Place Your Ships"
    body.appendChild(Message)

    //Change title to Player 1 
    const Heading = document.querySelector(".Heading")
    Heading.textContent = "Player 1"

    //Code 
    AddShips(body)
    


    //for (let i = 0; i < 10; i++) {
    //    let squarerow = document.createElement('div') 
    //    squarerow.classList.add("squarecontainer")
    //    AttackView.appendChild(squarerow)
//
    //    for (let j = 0; j < 10; j++) {
    //        let square = document.createElement('div')
    //        square.classList.add("square")
    //        squarerow.appendChild(square)
    //    }
    //}



})