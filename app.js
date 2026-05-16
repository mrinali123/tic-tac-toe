let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let newgamebtn=document.querySelector("#renew");
let m=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turnO=true;
let playerX = "Player X";
let playerO = "Player O";
const modal = document.querySelector("#name-modal");
const startBtn = document.querySelector("#start-btn");
startBtn.addEventListener("click", () => {
    const xName = document.querySelector("#playerX-name").value.trim();
    const oName = document.querySelector("#playerO-name").value.trim();
    playerX = xName !== "" ? xName : "Player X";
    playerO = oName !== "" ? oName : "Player O";
    modal.style.display = "none";
    msg.innerText = `${playerO}'s turn (O)`;
    m.classList.remove("hide");
});
const winpatterns=[
    [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]
]
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO == true) {
            box.innerText = "O";
            turnO = false;
            msg.innerText = `${playerX}'s turn (X)`;  // ADD THIS
        } else {
            box.innerText = "X";
            turnO = true;
            msg.innerText = `${playerO}'s turn (O)`;  // ADD THIS
        }
        box.disabled = true;
        checkwinner();
    });
});
const showWinner=(winner)=>{
const winnerName = winner === "X" ? playerX : playerO;
msg.innerText = `Congratulations, ${winnerName} wins!`;
m.classList.remove("hide");
};
const showDraw = () => {
    msg.innerText = "It's a draw! Play Again";
    m.classList.remove("hide");
    disableboxes();
};
const checkwinner = () => {
    let won = false;
    for (let x of winpatterns) {
        let a = boxes[x[0]].innerText;
        let b = boxes[x[1]].innerText;
        let c = boxes[x[2]].innerText;
        if (a !== "" && b !== "" && c !== "") {
            if (a === b && b === c) {
                showWinner(a);
                won = true;
                break;
            }
        }
    }
    if (!won && checkDraw()) {
        showDraw();
    }
};
const checkDraw = () => {
    for (let box of boxes) {
        if (box.innerText === "") return false;
    }
    return true;
};
const disableboxes=()=>{
    for(let box of boxes)
    {
        box.disabled=true;
    }
};
const enableboxes=()=>{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
    }
};
const resetgame = () => {
    turnO = true;
    enableboxes();
    m.classList.remove("hide");               
    msg.innerText = `${playerO}'s turn (O)`;  
};
newgamebtn.addEventListener("click",resetgame);
reset.addEventListener("click",resetgame);
