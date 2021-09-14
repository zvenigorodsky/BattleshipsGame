class Map{        // creating a tracking map
    constructor(){
        let grid=[];
        for(let i=0;i<10;i++){
            grid.push([]);
            for(let j=0;j<10;j++){
                grid[i].push(0);
            }
        }
        return grid;
    }
}


// meaning of map values:
// 0 = water
// 1 = ship part
// 2 = miss
// 3 = hit


            

mapFiller = (grid,mapNum) => {      // filing the UI map with water tiles
    mapNum *= 100;
    for(let i=mapNum-100;i<mapNum;i++){
        var water_div = document.createElement("div");
        water_div.setAttribute("class", "water");
        water_div.setAttribute("id", i);
        document.getElementsByClassName(grid)[0].appendChild(water_div);
    }   
}


changeDivClass = (position, div) => {
    document.getElementById(String(position)).setAttribute("class", div);
}


caulculate = (cord) => cord[0]*10+cord[1];// caulculate position [x,y] => x*10+y == id


Ship = (map, size, cord, dir = 0) => {   // cord must be an array as such [x,y]
    let position =caulculate(cord); 
    if (map == player2.ownMap){
        position += 200;
    }
    if (size == 1){
        if (map[cord[0]][cord[1]] == 1){
            console.log("a ship already exists at these coordinates"); // dont forget to implement with UI
        }
        else{
        changeDivClass(position, "ship");
        map[cord[0]][cord[1]] = 1;
    }   }
    else if (size == 2){        
        if (dir == 0 && cord[1] < 9){
            if (map[cord[0]][cord[1]] == 1 ||
                map[cord[0]][cord[1]+1] == 1){
                console.log("a ship already exists at these coordinates"); // dont forget to implement with UI
            }else{
            changeDivClass(position, "ship");
            changeDivClass(position + 1, "ship");
            map[cord[0]][cord[1]] = 1;
            map[cord[0]][cord[1]+1] = 1;
        }}
        else if(dir == 1 && cord[0] < 9){
            if (map[cord[0]][cord[1]] == 1 || 
                map[cord[0]+1][cord[1]] == 1){
                console.log("a ship already exists at these coordinates"); // dont forget to implement with UI
            }
            else{
            changeDivClass(position, "ship");
            changeDivClass(position + 10, "ship");
            map[cord[0]][cord[1]] = 1;
            map[cord[0]+1][cord[1]] = 1;
        }}
        else{
            console.log("wrong parameters"); // dont forget to implement with UI
        }
    }
    else if (size == 3){
        if (dir == 0 && cord[1] < 8 ){
            if (map[cord[0]][cord[1]] == 1 ||
                map[cord[0]][cord[1]+1] == 1 ||
                map[cord[0]][cord[1]+2] == 1){
                console.log("a ship already exists at these coordinates"); // dont forget to implement with UI
            }
            else{
            changeDivClass(position, "ship");
            changeDivClass(position + 1, "ship");
            changeDivClass(position + 2, "ship");
            map[cord[0]][cord[1]] = 1;
            map[cord[0]][cord[1]+1] = 1;
            map[cord[0]][cord[1]+2] = 1;}}
        else if(dir == 1 && cord[0] < 8){
            if (map[cord[0]][cord[1]] == 1 ||
                map[cord[0]+1][cord[1]] == 1 ||
                map[cord[0]+2][cord[1]] == 1){
                console.log("a ship already exists at these coordinates"); // dont forget to implement with UI
            }
            else{
            changeDivClass(position, "ship");
            changeDivClass(position + 10, "ship");
            changeDivClass(position + 20, "ship");
            map[cord[0]][cord[1]] = 1;
            map[cord[0]+1][cord[1]] = 1;
            map[cord[0]+2][cord[1]] = 1;
        }}
        else{
            console.log("wrong parameters"); // dont forget to implement with UI
        }
    }
        else{
            console.log("wrong parameters"); // dont forget to implement with UI
    }
}
    
    

shot = (cord, enemyMap) =>{      // cord must be in array format as such: [x,y], and the map should be the one getting shot
        let position = caulculate(cord); // caulculate position [x,y] => x*10+y == id
        if (enemyMap == player2.ownMap){
            let posFriendly = position + 100;
            let posFoe = position + 200;
            if (enemyMap[cord[0]][cord[1]] == 1){
                changeDivClass(posFriendly, "hit");
                changeDivClass(posFoe, "hit");
                enemyMap[cord[0]][cord[1]] = 3;
            }
            else{
                changeDivClass(posFriendly, "miss");
                changeDivClass(posFoe, "miss");
                enemyMap[cord[0]][cord[1]] = 2;
            }
        }     
        else{
            let posFriendly = position + 300;
            let posFoe = position;
            if (enemyMap[cord[0]][cord[1]] == 1){
                changeDivClass(posFriendly, "hit");
                changeDivClass(posFoe, "hit");
                enemyMap[cord[0]][cord[1]] = 3;
            }
            else{
                changeDivClass(posFriendly, "miss");
                changeDivClass(posFoe, "miss");
                enemyMap[cord[0]][cord[1]] = 2;
            }
        }
        
        
    }                      


class Player{
    constructor(x){
        let ownMap = new Map;
        let enemyMap = new Map;
        this.ownMap = ownMap;
        this.enemyMap = enemyMap; 
        let grid = "grid" + x;
        let grid2 = "grid" + (x + 1);
        mapFiller(grid,ownMap = x);
        mapFiller(grid2,enemyMap = x + 1);
    }
}


let player1 = new Player(1);
let player2 = new Player(3);


let readyButton = document.getElementById("ready");

changeTurns = (curtain) => readyButton.onclick = () => {
    curtain.style.zIndex = -2;
    readyButton.style.zIndex = -1;
}


let placeButton1 = document.getElementById("place1");
let placeButton2 = document.getElementById("place2");
let inputBox1 = document.getElementById("placementCoordinates1");
let inputBox2 = document.getElementById("placementCoordinates2");
let curtain1 = document.getElementById("curtain1");
let curtain2 = document.getElementById("curtain2");
let shipCount = 0;
placingShips = (playerMap,placeButton,inputBox,curtain1,curtain2) => placeButton.addEventListener("click", putShip =function(){
    try{
        var userInput = inputBox.value.trim();
        userInput = parseInt(userInput);   
        let tilt = userInput%10;
        let cord = [Math.floor(userInput/100),Math.floor((userInput/10)%10)]; //translating input to match proper syntax 
        let size = 0;
        if(shipCount < 6){
            size = 1;
            document.getElementById("message").style.zIndex = 10;
            document.getElementById("message").style.color = "black";
            document.getElementById("message").innerHTML = "you are placing a 1X1 ship"
        }
        else if(shipCount < 12 && shipCount >= 6){
            size = 2;
            document.getElementById("message").style.zIndex = 10;
            document.getElementById("message").style.color = "black";
            document.getElementById("message").innerHTML = "you are placing a 2X1 ship"
        }
        else if(shipCount >= 12){
            size = 3;
            document.getElementById("message").style.zIndex = 10;
            document.getElementById("message").style.color = "black";
            document.getElementById("message").innerHTML = "you are placing a 3X1 ship"
        }
        shipCount++;
        Ship(playerMap,size, cord, tilt);
        curtain1.style.zIndex = 2;
        readyButton.style.zIndex = 1;
        changeTurns(curtain2);
        let count = 0;      // looping through the whole map
        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
                if (playerMap == player2.ownMap && playerMap[i][j] == '1'){
                    count++;
                }
                if (count == 18){
                    for ( let i = 0;i<6;i++){
                    document.getElementsByClassName("zPlacement")[i].style.zIndex = -5;
                    document.getElementsByClassName("zShot")[i].style.zIndex = 0;
                }
            }
            }
        }
    }
    catch(err){
        document.getElementById("error").style.zIndex = 10;
        document.getElementById("error").style.color = "black";
        setTimeout(()=> {
        document.getElementById("error").style.zIndex = -10;
        document.getElementById("error").style.color = "white";
        }, 3000);
        placingShips(playerMap,placeButton,inputBox,curtain1,curtain2);
    }
    
});

let shootButton1 = document.getElementById("shoot1");
let shootButton2 = document.getElementById("shoot2");
let shootBox1 = document.getElementById("shootingCoordinates1");            
let shootBox2 = document.getElementById("shootingCoordinates2");   

placingShots = (enemyPlayerMap,shootButton,inputBox,curtain1,curtain2) => shootButton.addEventListener("click",() => {
    try {
    var userInput = inputBox.value.trim();
    userInput = parseInt(userInput);
    let cord = [Math.floor(userInput/10),Math.floor(userInput%10)]; //translating input to match proper syntax 
    shot(cord,enemyPlayerMap);
    curtain1.style.zIndex = 2;
    readyButton.style.zIndex = 1;
    changeTurns(curtain2);  
    console.log(enemyPlayerMap);
    let countHits =0;
    for(let i=0;i<10;i++){           // looping through the whole map
        for(let j=0;j<10;j++){
            if (enemyPlayerMap[i][j] == '1'){
                break;
            }
            else if(enemyPlayerMap[i][j] == '0' ||
                    enemyPlayerMap[i][j] == '2'){
                continue;
            }
            else if(enemyPlayerMap[i][j] == '3'){
                countHits++;
                if (countHits == 2){
                    if (enemyPlayerMap == player1.ownMap){
                        document.getElementById("curtain4").innerHTML = "Player 2 Won!";
                    }
                    else if(enemyPlayerMap == player2.ownMap){
                        document.getElementById("curtain4").innerHTML = "Player 1 Won!";
                    }
                    document.getElementById("curtain4").style.zIndex = 10;
                    document.getElementById("curtain4").style.color = "black";
                }
                }
            }
        }
    }
    catch(err){
        document.getElementById("error").style.zIndex = 10;
        document.getElementById("error").style.color = "black";
        setTimeout(()=> {
        document.getElementById("error").style.zIndex = -10;
        document.getElementById("error").style.color = "white";
        }, 3000);
        placingShots(enemyPlayerMap,shootButton,inputBox,curtain1,curtain2);
    }
});

// THE GAME
game = () => {
changeTurns(curtain1);
   placingShips(player1.ownMap,placeButton1,inputBox1,curtain1,curtain2);
   placingShips(player2.ownMap,placeButton2,inputBox2,curtain2,curtain1);
   placingShots(player2.ownMap,shootButton1,shootBox1,curtain1,curtain2);
   placingShots(player1.ownMap,shootButton2,shootBox2,curtain2,curtain1);

}


game();
