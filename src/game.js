import {Gameboard, Ship, Player} from "./index.js"
import "./styles.css"

function AddShips(Parent) {
    //Ship Container title
    const ShipContainer = document.createElement('div')
    ShipContainer.classList.add("ShipContainer")
    Parent.appendChild(ShipContainer)

    const ShipContainerTitle = document.createElement("div")
    ShipContainerTitle.classList.add("ShipContainerTitle")
    ShipContainerTitle.textContent = "Ship Container"
    ShipContainer.appendChild(ShipContainerTitle)

    const ShipContainList = document.createElement('select')
    ShipContainList.classList.add("ShipContainList")
    ShipContainer.appendChild(ShipContainList)

    const Placeholder = document.createElement('option')
    Placeholder.textContent = "Select Ship"
    ShipContainList.appendChild(Placeholder)

    //Create the ship Selection
    let ShipArray = ["Destroyer", "Submarine", "Cruiser", "Battleship", "Aircraft-Carrier"]
    for (let i = 0; i < 5; i++) {
        const ShipOption = document.createElement('option')
        ShipOption.classList.add(`${ShipArray[i]}`)
        ShipOption.value = ShipArray[i]
        ShipOption.textContent = `${ShipArray[i]} ${i + 1} Spaces`
        ShipContainList.appendChild(ShipOption)
    }

    //Create the ship coordinate
    const ShipCoordinate = document.createElement('input')
    ShipCoordinate.type = "text"
    ShipCoordinate.classList.add("ShipCoordinate")
    ShipCoordinate.placeholder = "Enter a coordinate"
    ShipContainer.appendChild(ShipCoordinate)

    //submission button and the event listener for it
    const Submission = document.createElement("button")
    ShipContainer.appendChild(Submission)
    Submission.classList.add("Submission")
    Submission.textContent = "Submit"
    
    //Submission for checking if the Ship and coordinate are valid 
    Submission.addEventListener("click", (e) => {
        e.preventDefault()

        if (ShipContainList.value == "Select Ship") {
            alert("Please Enter a ship")
            return
        }

        if (!ShipCoordinate.value) {
            alert("Please Enter a Coodinate")
            return
        }

        if (!/^[0-9,]+$/.test(ShipCoordinate.value)) {
            alert("Please enter a valid coordinate e.g. 1,2")
            return
        }

        let ShipCoordinateList = ShipCoordinate.value.split(",")
        if (parseInt(ShipCoordinateList[0]) < 1 || parseInt(ShipCoordinateList[0]) > 10 || parseInt(ShipCoordinateList[1]) < 1 || parseInt(ShipCoordinateList[1]) > 10) {
            alert("Please Enter a coodinate between 1 and 10")
            return
        }

        ShipContainList.remove(ShipContainList.selectedIndex)


    })


    
    

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

    //select all the grid 
    const squares = document.querySelectorAll('.square')
    squares.forEach(element => {
        element.addEventListener("click", () =>
        element.style.background = "red")
    });

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