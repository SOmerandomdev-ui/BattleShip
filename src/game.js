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

function RobotPlaceShips(Gameboard) {
    const Ship1 = new Ship("Destoryer", 2)
    const Ship2 = new Ship("Submarine", 3)
    const Ship3 = new Ship("Cruiser", 4)
    const Ship4 = new Ship("Battleship", 5)
    const Ship5 = new Ship("Aircraft-Carrier", 6)

    for (let i = 1; i < 6; i++) { 
        //Track which spots are not taken 
        const PositionArray = []
        //Get start and end coords based on the ship length we are looking at 
        let Startx = Math.floor(Math.random() * (10 - i));
        let Starty = Math.floor(Math.random() * (10 - i));
        let Endx = Startx
        let Endy = Starty

        Math.random() < 0.5 ? Endx += i : Endy += i
        
        //For the y-axis
        if (Startx == Endx) {
            while (Starty <= Endy) {
                if (Gameboard.board[Startx][Starty]) {
                    PositionArray.length = 0 
                    i--
                    break  
                }
        
                PositionArray.push([Startx, Starty] )
                Starty += 1
        }
        }

        if (Starty == Endy) {
            while (Startx <= Endx) {
                if (Gameboard.board[Startx][Starty]) {
                    PositionArray.length = 0 
                    i--
                    break  
                }
        
                PositionArray.push([Startx, Starty] )
                Startx += 1
        }
        }

        for (let item of PositionArray) {
            let x = item[0]
            let y = item[1]

            switch (PositionArray.length){
                case 2: 
                    Gameboard.board[x][y] = Ship1
                    break
                case 3: 
                    Gameboard.board[x][y] = Ship2
                    break
                case 4: 
                    Gameboard.board[x][y] = Ship3
                    break
                case 5: 
                    Gameboard.board[x][y] = Ship4
                    break
                case 6: 
                    Gameboard.board[x][y] = Ship5
                    break 
            }
            
        }
       
    } 

    
    



}
//Places the markers on the Gameboard object 
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
            Gameboard.board[x][y] = Ship
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
            Gameboard.board[x][y] = Ship
        }
    }

    return PositionArray
}


function AddShipsDOM(Parent, Player, Complete) {
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
    let ShipArray = [["Destroyer", 2]]
    //["Destroyer", "Submarine", "Cruiser", "Battleship", "Aircraft-Carrier"]
    for (let i = 0; i < 1; i++) {
        const [name, size] = ShipArray[i]
        const ShipOption = document.createElement('option')
        ShipOption.classList.add(`${name}`)
        ShipOption.value = name
        ShipOption.dataset.size = size
        ShipOption.textContent = `${name} ${size} Spaces`
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
            alert("Please enter a valid coordinate e.g. 1, 2")
            return
        }

        //Get the x and y coordinates for the start and the end
        let ShipCoordinateStartList = ShipCoordinateStart.value.split(",")
        let ShipCoordinateEndList = ShipCoordinateEnd.value.split(",")
        const Startx = parseInt(ShipCoordinateStartList[0])
        const Starty = parseInt(ShipCoordinateStartList[1])
        const Endx = parseInt(ShipCoordinateEndList[0])
        const Endy = parseInt(ShipCoordinateEndList[1])
        
        //Make a ship object 
        const ShipObject = new Ship(ShipContainList.value, ShipContainList.selectedOptions[0].dataset.size)
        
        //Check to see if the start and end are out of bounds 
        if (Startx < 1 || Startx > 10 || Starty < 1 || Starty > 10 || Endx < 1 || Endx > 10 || Endy < 1 || Endy > 10) {
            alert("Please Enter a coodinate between 1 and 10 for the start and end points")
            return
        }

        //Check to see if the coordinates fit with the ship length 
        if (CalculateDistance([Startx, Starty], [Endx, Endy], Ship.name)) return

        //Check to see if the user is trying to place them diagonally 
        if (Startx != Endx && Starty != Endy) {
            alert("Ships can only be placed horizontally and vertically")
            return
        }

        //Add the ship to the gameboard DOM and add them to the Gameboard object 
        const PlaceShipReturn = PlaceShips([Startx, Starty], [Endx, Endy], Player.Gameboard, ShipObject)
        if (!PlaceShipReturn) return 

        //Find the squares which have ships on them 
        const DomCoordinates = PlaceShipReturn.map(array => array[1] + array[0] * 10)

        //select all the grid 
        const squares = document.querySelectorAll('.square');
        squares.forEach((element, index) => {
            const row = Math.floor(index / 10);
            const col = index % 10;
            const flipped = (9 - row) * 10 + col;
        
            if (DomCoordinates.includes(flipped))
                element.textContent = ShipObject.name[0];
        });

        //Remove a ship from the list when it is placed
        ShipContainList.remove(ShipContainList.selectedIndex)
        ShipArray.splice(ShipArray.indexOf(Ship), 1)

        if (ShipArray.length == 0) {
            ShipContainer.remove() 
            Complete()
        } 
    })
}

//Function for when the attack board is made and to logic for it 
function AttackSetup(Parent, button, Player1, Player2) {
    for (let i = 0; i < 10; i++) {
        let squarerow = document.createElement('div') 
        squarerow.classList.add("squarecontainer")
        Parent.prepend(squarerow)  

    for (let j = 0; j < 10; j++) {
        let square = document.createElement('div')
        square.classList.add("AttackSquare")
    
        squarerow.appendChild(square)
    }
}
    const AttackSquares = document.querySelectorAll(".AttackSquare")
    const DefenseSquares = document.querySelectorAll(".square")
    let selected = null
    let flippedIndex = null

    //While hovering over or clicking the squares it shrinks them, this is for better visibility and also tracks the index 
    AttackSquares.forEach((element, index) => {
        const col = index % 10
        const row = 9 - Math.floor(index / 10)
        const coords = [col, row]

        element.addEventListener("mouseover", () => {
            if (selected !== element) element.style.transform = "scale(0.90)"
        })

        element.addEventListener("mouseleave", () => {
            if (selected !== element) element.style.transform = "scale(1)"
        })

        element.addEventListener("click", () => {
            if (selected === element) {
                selected = null
                flippedIndex = null
                element.style.transform = "scale(1)"

            } else  {
                if (selected) {
                    selected.style.transform = "scale(1)" 
                }
                selected = element
                element.style.transform = "scale(0.9)"
                flippedIndex = coords
            }
        })
    })
    
    //When pressing the attack button 
    button.addEventListener("click", () => {
        if (!selected) {
            alert("Please select a square")
            return 
        }

        //Code for you attacking 
        if (Player2.Gameboard.board[flippedIndex[0]][flippedIndex[1]]) {
            selected.style.background = "black "
            selected.style.transform = "scale(1)"
            selected = null
        }

        else {
            selected.textContent = "X"
            selected.style.transform = "scale(1)"
            selected = null
        }

        if (Attack(Player2, flippedIndex)) {
            //Code for the computer attacking you 
            console.log(Player2.Gameboard.board)
            console.log(Player2.Gameboard.ships)
            let ComputerSquareAttackNumber = RobotAttack(Player1.Gameboard)

            Attack(Player1, ComputerSquareAttackNumber[0])
            DefenseSquares.forEach((element, index) => {
                if (index == ComputerSquareAttackNumber[1]) {
                    element.style.background = "rgb(255, 99, 99)"
                    element.style.transition = "background-color 0.5s ease"           
                }
            })
        }
    })
}

//Function to alter the gameboard object  
function Attack(Player, Coordinates, ChangeDOM) {
    const x = Coordinates[0]
    const y = Coordinates[1]

    (Player.Gameboard.recieveAttack(x, y))

    return CheckGameOver(Player, ChangeDOM)
    
} 

function RobotAttack(Gameboard) {  
    const RandomNumber = Math.floor(Math.random() * 100) // 0-99
    const col = RandomNumber % 10
    const row = Math.floor(RandomNumber / 10)
     if (Gameboard.board[col][row] == "hit") {
        return RobotAttack(Gameboard) 
    }
    else return [[col, row], RandomNumber]  
}

function CheckGameOver(Player, ChangeDOM) {
    if (Player.Gameboard.ships.length === 0) {
        alert(`${Player.name} has Lost`)
        ChangeDOM()
        return true

    }
    return false
}
const Singleplayer = document.querySelector('.Single')
const Twoplayer = document.querySelector('.Double')

Singleplayer.addEventListener("click", () => {
    const Player1 = new Player(prompt("What is Player 1's name"))
    const Player2 = new Player("Robot")

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

    //Code to add ships
    AddShipsDOM(body, Player1, () => {
        Message.textContent = "Pick Your shot"
        Setup.style.transform = "translate(-115%, -50%)"

        //Code to Add an attack button 
        const AttackButton = document.createElement('div')
        AttackButton.classList.add("AttackButton")
        AttackButton.textContent = "Attack Button"
        body.appendChild(AttackButton)

        //Code to add the robot ships 
        RobotPlaceShips(Player2.Gameboard) 
        console.log(Player2.Gameboard)

        AttackSetup(AttackView, AttackButton, Player1, Player2)


    })
})

//ADD CHEK LOGIC WITH A CALLBACK AND CHANGE THE DOM 