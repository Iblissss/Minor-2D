window.onload = ()=>{
    let gameCanvas = document.getElementById("gameCanvas");
    gameCanvas.height = 625;
    gameCanvas.width = 1000;
    startGame();

    document.getElementById("moveUp").onclick = moveUp;
    document.getElementById("moveDown").onclick = moveDown;
    document.getElementById("moveLeft").onclick = moveLeft;
    document.getElementById("moveRight").onclick = moveRight;
    document.getElementById("restart").onclick = restart;
    document.getElementById("quitGame").onclick = gameOver;
}

let playerTile = new Image();
let emptyTile = new Image();
let brickTile = new Image();
let cristalTile = new Image();

playerTile.src = "./images/hero.png";
emptyTile.src = "./images/tile_vide.png";
brickTile.src = "./images/tile_roche.png";
cristalTile.src = "./images/tile_cristal.png";

let gameBoard, score = 0, durability, playerX, playerY, isGameOver = false;
function startGame(){
    score = 0;
    durability = 40;
    gameBoard = [];
    for(let y = 0; y < 15; y++){
        gameBoard.push([]);
        for(let x = 0; x < 25; x++){
            gameBoard[y].push(1);
        }
    }
    gameBoard[7][12] = 3;
    playerX = 12;
    playerY = 7;
    let tenPercent = Math.floor(15*25/10);
    for(let i = 0; i < tenPercent; i++){
        let validTile = false;
        while(!validTile){
            let x = Math.floor(Math.random()*25);
            let y = Math.floor(Math.random()*15);
            if(gameBoard[y][x] === 1){
                validTile = true;
                gameBoard[y][x] = 2;
            }
        }
    }
    drawGame();
    document.getElementById("gemCount").innerHTML = score;
    document.getElementById("pickBar").style.width = "100%";
    document.getElementById("pickDurablity").innerHTML = durability+"/40";
}
function drawGame(){
    let gameCanvas = document.getElementById("gameCanvas");
    let ctx = gameCanvas.getContext("2d");

    for(let y = 0; y < 15; y++){
        for(let x = 0; x < 25; x++){
            if(gameBoard[y][x] === 0) ctx.drawImage(emptyTile,x*40,y*40,40,40);
            else if(gameBoard[y][x] === 1) ctx.drawImage(brickTile,x*40,y*40,40,40);
            else if(gameBoard[y][x] === 2) ctx.drawImage(cristalTile,x*40,y*40,40,40);
            else{
                ctx.drawImage(emptyTile,x*40,y*40,40,40);
                ctx.drawImage(playerTile,x*40,y*40,40,40);
            }
        }
    }
    let percent = Math.floor(durability/40*100);
    document.getElementById("pickBar").style.width = percent+"%";
    document.getElementById("pickDurablity").innerHTML = durability+"/40";
}
function moveUp(){
    if(playerY > 0 && !isGameOver){
        gameBoard[playerY][playerX] = 0;
        playerY--;
        if(gameBoard[playerY][playerX] === 2){
            score++;
            document.getElementById("gemCount").innerHTML = score;
        }
        if(gameBoard[playerY][playerX] != 0){
            durability--;
            if(durability === 0) gameOver();
        }
        gameBoard[playerY][playerX] = 3;
        drawGame();
    }
}
function moveDown(){
    if(playerY < 14 && !isGameOver){
        gameBoard[playerY][playerX] = 0;
        playerY++
        if(gameBoard[playerY][playerX] === 2){
            score++;
            document.getElementById("gemCount").innerHTML = score;
        }
        if(gameBoard[playerY][playerX] != 0){
            durability--;
            if(durability === 0) gameOver();
        }
        gameBoard[playerY][playerX] = 3;
       
        drawGame();
    }
}
function moveLeft(){
    if(playerX > 0 && !isGameOver){
        gameBoard[playerY][playerX] = 0;
        playerX--;
        if(gameBoard[playerY][playerX] === 2){
            score++;
            document.getElementById("gemCount").innerHTML = score;
        }
        if(gameBoard[playerY][playerX] != 0){
            durability--;
            if(durability === 0) gameOver();
        }
        gameBoard[playerY][playerX] = 3;
        drawGame();
    }
}
function moveRight(){
    if(playerX < 24 && !isGameOver){
        gameBoard[playerY][playerX] = 0;
        playerX++;
        if(gameBoard[playerY][playerX] === 2){
            score++;
            document.getElementById("gemCount").innerHTML = score;
        }
        if(gameBoard[playerY][playerX] != 0){
            durability--;
            if(durability === 0) gameOver();
        }
        gameBoard[playerY][playerX] = 3;
        drawGame();
    }
}
function gameOver(){
    if(!isGameOver){
        isGameOver = true;
        document.getElementById("score").innerHTML = score;
        document.getElementById("gameOverWindow").style.display = "block";
    }
}
function restart(){
    isGameOver = false;
    document.getElementById("gameOverWindow").style.display = "none";
    startGame();
}