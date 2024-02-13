const gameInfo = document.querySelector(".game-info");
const button = document.querySelector(".btn");
const boxes = document.querySelectorAll(".box");
const winX = document.querySelector(".win-X");
const winO = document.querySelector(".win-O"); 

let currentPlayer;
let gameGrid;
let xCount = 0;
let oCount = 0;


const winingPositions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6], 
    [1,4,7], 
    [2,5,8],
    [0,4,8],
    [2,4,6] 
];

// Function for intialise the game
function initGame(){
    currentPlayer = "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;    
    gameGrid=["","","","","","","","",""];
    winO.innerText = `X - ${xCount}`;
    winX.innerText =`O - ${oCount}`;
    boxes.forEach((box, index) => {
        box.innerText ="";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    })
    button.classList.remove("active"); 
}
initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer ="X";
    }
    gameInfo.innerText =`Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";
    winingPositions.forEach((position)=>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" ) && (gameGrid[position[0]]=== gameGrid[position[1]] ) &&(gameGrid[position[1]] === gameGrid[position[2]])){
            if(gameGrid[position[0]] === "X"){
                answer ="X";
                xCount++;
            }
            else{
                answer = "O";
                oCount++;
            }
            // Disable PointerEvent
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            winO.innerText = `X - ${xCount}`;
            winX.innerText =`O - ${oCount}`;
        }
    });
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        button.classList.add("active");
    }
    // Tie condition
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    });
    if(fillCount === 9){
        gameInfo.innerText = `Game Tie!`;
        button.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click",() => {
        handleClick(index);
    })
})

button.addEventListener("click", initGame);

