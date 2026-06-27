import {Gameboard, Ship, Player} from "./index.js"
import "./styles.css"

//Calculate distance for the coordinates
function CalculateDistance(start, end, ship) {
    let distance = null
    if (start[0] == end[0]) distance = Math.abs(start[1] - end[1])
    if (start[1] == end[1]) distance = Math.abs(start[0] - end[0])

    if (ship == "Destroyer" && distance != 1) {
        alert("The distance should be only 2 units")
        return true
    }

    if (ship == "Submarine" && distance != 2) {
        alert("The distance should be only 3 units")
        return true
    }

    if (ship == "Cruiser" && distance != 3) {
        alert("The distance should be only 4 units")
        return true
    }

    if (ship == "Battleship" && distance != 4) {
        alert("The distance should be only 5 units")
        return true
    }

    if (ship == "Aircraft-Carrier" && distance != 5) {
        alert("The distance should be only 6 units")
        return true
    }
}

//Places the markers 
function PlaceShips(start, end, Gameboard, Ship) {
    let PositionArray = []
    if (start[0] == end[0]) {
        let Begin = start[1]
        let Finish = end[1]

        while (Begin <= Finish) {
            if (Gameboard.board[Begin - 1][start[0] - 1]) {
                alert("That space is already taken")
                return false
            }

            PositionArray.push([Begin - 1, start[0] - 1])
            Begin += 1
        }

        for (let item of PositionArray) {
            let x = item[0]
            let y = item[1]
            Gameboard.board[x][y] = Ship[0]
        }
    }

    if (start[1] == end[1]) {
        let Begin = start[0]
        let Finish = end[0]

        while (Begin <= Finish) {
            if (Gameboard.board[Begin - 1][start[1] - 1]) {
            alert("That space is already taken")
            return false
        }

            PositionArray.push([Begin - 1, start[1] - 1])
            Begin += 1
        }

        for (let item of PositionArray) {
            let x = item[0]
            let y = item[1]
            Gameboard.board[x][y] = Ship[0]
        }
    }
    console.log(PositionArray)
    return PositionArray
}

function AddShips(Parent, Player) {
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
        ShipOption.textContent = `${ShipArray[i]} ${i + 2} Spaces`
        ShipContainList.appendChild(ShipOption)
    }

    //Create the ship coordinate for start and end
    const ShipCoordinateStart = document.createElement('input')
    ShipCoordinateStart.type = "text"
    ShipCoordinateStart.classList.add("ShipCoordinateStart")
    ShipCoordinateStart.placeholder = "Enter a start coordinate"
    ShipContainer.appendChild(ShipCoordinateStart)

    const ShipCoordinateEnd = document.createElement('input')
    ShipCoordinateEnd.type = "text"
    ShipCoordinateEnd.classList.add("ShipCoordinateEnd")
    ShipCoordinateEnd.placeholder = "Enter an end coordinate"
    ShipContainer.appendChild(ShipCoordinateEnd)


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

        if (!ShipCoordinateStart.value && !ShipCoordinateEnd.value) {
            alert("Please Enter a Coordinate")
            return
        }

        if (!/^[0-9, ]+$/.test(ShipCoordinateStart.value) && !/^[0-9, ]+$/.test(ShipCoordinateEnd.value)) {
            alert("Please enter a valid coordinate e.g. 1,2")
            return
        }

        //Get the x and y coordinates for the start and the end
        let ShipCoordinateStartList = ShipCoordinateStart.value.split(",")
        let ShipCoordinateEndList = ShipCoordinateEnd.value.split(",")
        const Startx = parseInt(ShipCoordinateStartList[0])
        const Starty = parseInt(ShipCoordinateStartList[1])
        const Endx = parseInt(ShipCoordinateEndList[0])
        const Endy = parseInt(ShipCoordinateEndList[1])
        const Ship = ShipContainList.value
        
        if (Startx < 1 || Startx > 10 || Starty < 1 || Starty > 10 || Endx < 1 || Endx > 10 || Endy < 1 || Endy > 10) {
            alert("Please Enter a coodinate between 1 and 10 for the start and end points")
            return
        }

        //Check to see if the coordinates fit with the ship length 
        if (CalculateDistance([Startx, Starty], [Endx, Endy], Ship)) return

        //Check to see if the user is trying to place them diagonally 
        if (Startx != Endx && Starty != Endy) {
            alert("Ships can only be placed horizontally and vertically")
            return
        }

        //Add the ship to the gameboard array  
        const PlaceShipReturn = PlaceShips([Startx, Starty], [Endx, Endy], Player.Gameboard, Ship)
        if (!PlaceShipReturn) return 
        console.log(Player.Gameboard)

        //Find the squares which have ships on them 
        const DomCoordinates = PlaceShipReturn.map(array => array[1] + array[0] * 10)
        console.log(DomCoordinates)

        //select all the grid 
        const squares = document.querySelectorAll('.square');
        squares.forEach((element, index) => {
            const row = Math.floor(index / 10);
            const col = index % 10;
            const flipped = (9 - row) * 10 + col;
        
            if (DomCoordinates.includes(flipped))
                element.textContent = Ship[0];
        
            element.addEventListener("click", () => {
                console.log(flipped);
            });
        });

        //Remove a ship from the list when it is placed
        ShipContainList.remove(ShipContainList.selectedIndex)
        ShipArray.splice(ShipArray.indexOf(Ship), 1)

        
        



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

    //Code to add ships
    AddShips(body, Player1)

   
    //Message telling you to place the boats 
    const Message = document.createElement("div")
    Message.classList.add("Message")
    Message.textContent = "Place Your Ships"
    body.appendChild(Message)

    //Change title to Player 1 
    const Heading = document.querySelector(".Heading")
    Heading.textContent = "Player 1"

    
    
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