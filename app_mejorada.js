/************************************
|  Author: Pablo Gutiérrez Barceló  |
|  Project: The Mars Rover          |
|  Start-Date: 09/10/17             |
|  End-Date: 11/10/17               |
*************************************/
/* OPTIONAL EXTRA
- Can change the size of square in squareSize
- Can select the number of obstables in area
- Can select number of rovers CPU*/
// Change here the max number squares (10x10), (20x20)...etc
var squareSize = 10; /* 10x10 */
var numberOfRovers = 4; /* de 1 a 4 automaticos colocados en cada esquina*/
var numberOfObstacles = 15; /* Cant use more than 50% */
var obstacles = [];
var rover = [];
var answer = ""; // Contain status of program (reboot, continue, finish)
// Static Initial position for each rover
var placeNewRovers = [
  [0,0],
  [squareSize-1,0],
  [squareSize-1,squareSize-1],
  [0,squareSize-1]
];
/* Constructor rover*/
function newRover(intNumRover){
  rover.push({
    direction: 'N',
    x: placeNewRovers[intNumRover][0],
    y: placeNewRovers[intNumRover][1],
    travelLog: [{ x:placeNewRovers[intNumRover][0],
                 y:placeNewRovers[intNumRover][1]}],
    commands: ""
  });
}
function newObstacle(){
  var rightPlace = false;
  var coorX, coorY;
  do{
    coorX = Math.floor(Math.random() * squareSize);
    coorY = Math.floor(Math.random() * squareSize);
    rightPlace = existSomethingThere(coorX,coorY);
  }while(rightPlace);
  console.log("Obstacle created:["+coorX+","+coorY+"]");
  obstacles.push({
    x: coorX,
    y: coorY
  });
}
// Check if exist something where we want to put our Obstacle
function existSomethingThere(coorX,coorY){
  // Search if the object generated is placed where is a rover
  for(var coordinateEqualInRover in rover){
    if(rover[coordinateEqualInRover].x === coorX && rover[coordinateEqualInRover].y === coorY){
      return true;
    }
  }
  // Search if the object generated is placed where is another obstacle
  for(var coordinateEqualInObstacle in obstacles){
    if(obstacles[coordinateEqualInObstacle].x === coorX && obstacles[coordinateEqualInObstacle].y === coorY){
      return true;
    }
  }
  return false; //false = not exist
}
function existObstacleOrRover(coorX,coorY){

  for(var coordinateEqualInRover in rover){
    if(rover[coordinateEqualInRover].x === coorX && rover[coordinateEqualInRover].y === coorY){
      return "rover";
    }
  }
  // Search if the object generated is placed where is another obstacle
  for(var coordinateEqualInObstacle in obstacles){
    if(obstacles[coordinateEqualInObstacle].x === coorX && obstacles[coordinateEqualInObstacle].y === coorY){
      return "obstacle";
    }
  }
  return false; //false = not exist
}
// Create number of Rovers selected in numberOfRovers
function createRovers(){
  if(numberOfRovers>4){
    numberOfRovers = 4;
    console.log("Is not possible to select more than 4 rovers, changing to 4");
  }
  else if(numberOfRovers<1){
    numberOfRovers = 1;
    console.log("Is not possible to select less than 1 rovers, changing to 1");
  }
  for(var i=0;i<numberOfRovers;i++){
    newRover(i);
  }
}
// Create number of obstacles selected in numberOfObstacles
function createObstacles(){
  // If numberOfObscables is more than 50% of squareSize fit to 50%
  if(numberOfObstacles>(Math.floor((Math.pow(squareSize)-numberOfRovers)/2))){
    numberOfObstacles = Math.floor((Math.pow(squareSize)-numberOfRovers)/2);
    console.log("Is not possible to select more than 50% squareSize of obstacles, setting to 50%");
  } else if(numberOfObstacles < 0){
      numberOfObstacles = 0;
      console.log("numberOfRovers is less than 0, setting to 0");
  }
  for(var i=0;i<numberOfObstacles;i++){
    newObstacle(i);
  }
}
// Sanitizate list commands and enter in rover[0].commands
function listCommands() {
  var taskDirection = prompt("Insert list of commands: \n(f)orward,(b)ackward,(r)ight or (l)eft\nEXAMPLE: rrffflflb","");
  if (taskDirection!=null){
    var taskDirectionSanitizated = "";
    taskDirection = taskDirection.toUpperCase();
    for (var i=0;i<taskDirection.length;i++){
      if (taskDirection[i] == 'F' || taskDirection[i] == 'B' || taskDirection[i] == 'R' || taskDirection[i] == 'L'){
        taskDirectionSanitizated = taskDirectionSanitizated + taskDirection[i];
      }
    }
  if(taskDirectionSanitizated!=""){
    rover[0].commands=taskDirectionSanitizated;
    return false;
  }
  else if(taskDirectionSanitizated==""){
    console.log("Empty string detected or not valid commands inserted, please insert something");
    return true;
  }
  }else{
    console.log("Button cancel pressed");
    return false;
  }
}
// Create same number of orders as Human selected
function createOrders(numOrdersUser){
  /* FBRL random */
  for (roverCPU = 1;roverCPU < numberOfRovers; roverCPU++){
    var commandsToComplete = "";
    var possible = "FBRL";
    for (var i = 0; i < numOrdersUser; i++){
      commandsToComplete += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    rover[roverCPU].commands = commandsToComplete;
  }
}
// MOVE FUCTIONS
function turnLeft(roverObject,actualRover){
  var rotateOptionSelected;
  console.log("Rover Nº:"+actualRover);
  switch(roverObject.direction) {
    case 'N':
      roverObject.direction = 'W';
      logDirection(roverObject.direction);
      break;
    case 'S':
      roverObject.direction = 'E';
      logDirection(roverObject.direction);
      break;
    case 'E':
      roverObject.direction = 'N';
      logDirection(roverObject.direction);
      break;
    case 'W':
      roverObject.direction = 'S';
      logDirection(roverObject.direction);
      break;
    default:
      return roverObject.direction;
  }
}
function turnRight(roverObject,actualRover){
  var rotateOptionSelected;
  console.log("Rover Nº:"+actualRover);
  switch(roverObject.direction) {
    case 'N':
      roverObject.direction = 'E';
      logDirection(roverObject.direction);
      break;
    case 'S':
      roverObject.direction = 'W';
      logDirection(roverObject.direction);
      break;
    case 'E':
      roverObject.direction = 'S';
      logDirection(roverObject.direction);
      break;
    case 'W':
      roverObject.direction = 'N';
      logDirection(roverObject.direction);
      break;
    default:
      /* IF IS NOT CORRECTLY SANITIZATE DONT DO NOTHING*/
      break;
    }
}
function moveForward(roverObject,actualRover){
  var executed = 0;
  console.log("Rover Nº:"+actualRover);
  switch(roverObject.direction) {
    case 'N':
      if (checkPositionBeforeMove(roverObject,roverObject.y-1,roverObject.x,'Y')){
          roverObject.y = roverObject.y-1;
          executed = executedSuccessfully(executed);
      }
      break;
    case 'S':
      if (checkPositionBeforeMove(roverObject,roverObject.y+1,roverObject.x,'Y')){
          roverObject.y = roverObject.y+1;
          executed = executedSuccessfully(executed);
      }
      break;
    case 'E':
      if (checkPositionBeforeMove(roverObject,roverObject.x+1,roverObject.y,'X')){
          roverObject.x = roverObject.x+1;
          executed = executedSuccessfully(executed);
      }
      break;
    case 'W':
      if(checkPositionBeforeMove(roverObject,roverObject.x-1,roverObject.y,'X')){
        roverObject.x = roverObject.x-1;
        executed = executedSuccessfully(executed);
      }
      break;
    default:
      /* IF IS NOT CORRECTLY SANITIZATE INPUT NOT DO NOTHING*/
      break;
    }
  if (executed == 0){
    console.log('order Forward - Rover looking at: '+roverObject.direction+' FAIL, coordinates ['+roverObject.x+','+roverObject.y+']');
  }
  else if (executed == 1){
    console.log('order Forward - Rover looking at: '+roverObject.direction+' EXECUTED, coordinates ['+roverObject.x+','+roverObject.y+']');
  }
}
function moveBackward(roverObject,actualRover){
  var executed = 0;
  console.log("Rover Nº:"+actualRover);
  switch(roverObject.direction) {
    case 'N':
      if (checkPositionBeforeMove(roverObject,roverObject.y+1,roverObject.x,'Y')){
          roverObject.y = roverObject.y+1;
          executed = executedSuccessfully(executed);
      }
      break;
    case 'S':
      if (checkPositionBeforeMove(roverObject,roverObject.y-1,roverObject.x,'Y')){
          roverObject.y = roverObject.y-1;
          executed = executedSuccessfully(executed);
      }
      break;
    case 'E':
      if (checkPositionBeforeMove(roverObject,roverObject.x-1,roverObject.y,'X')){
          roverObject.x = roverObject.x-1;
          executed = executedSuccessfully(executed);
      }
      break;
    case 'W':
      if(checkPositionBeforeMove(roverObject,roverObject.x+1,roverObject.y,'X')){
        roverObject.x = roverObject.x+1;
        executed = executedSuccessfully(executed);
      }
      break;
    default:
      /* IF IS NOT CORRECTLY SANITIZATE */
      break;
    }
  if (executed == 0){
    console.log('order Forward - Rover looking at: '+roverObject.direction+' FAIL, coordinates ['+roverObject.x+','+roverObject.y+']');
  }
  else if (executed == 1){
    console.log('order Forward - Rover looking at: '+roverObject.direction+' EXECUTED, coordinates ['+roverObject.x+','+roverObject.y+']');
  }
}
function executeOrders(roverSelected){
  for (var actualOrder=0; actualOrder < roverSelected[0].commands.length; actualOrder++){
    printMap();
    for (var actualRover=0; actualRover < numberOfRovers; actualRover++){
      switch (rover[actualRover].commands[actualOrder]){
        case 'F':
          moveForward(roverSelected[actualRover],actualRover);
          break;
        case 'B':
          moveBackward(roverSelected[actualRover],actualRover);
          break;
        case 'R':
          turnRight(roverSelected[actualRover],actualRover);
          break;
        case 'L':
          turnLeft(roverSelected[actualRover],actualRover);
          break;
        }
      }
    }
}

/* CHECK FUCTIONS SANITIZATE */
function checkPositionBeforeMove(numRover,positionCalculated,coordinateExtra,coordinateChanged){
  var coordinateActual =[];
  /* Depend which value change will need to change order coordinates*/
  if (coordinateChanged == 'X'){
    coordinateActual = [positionCalculated,coordinateExtra];
  }
  else{
    coordinateActual = [coordinateExtra,positionCalculated];
  }
  if (positionCalculated < 0 || coordinateExtra < 0 || positionCalculated >= squareSize || coordinateExtra >= squareSize){
    console.log('Rover will exit from Square! '+coordinateActual+' jumping order');
    return 0;
  }
  //console.log("positionCalculated vale:"+positionCalculated+" coordinateExtra vale: "+coordinateExtra);
  var somethingInFront = existObstacleOrRover(coordinateActual[0],coordinateActual[1]);
  if (somethingInFront == "rover"){
    console.log("There is a rover in front, jumping order");
    return 0;
  } else if(somethingInFront == "obstacle"){
    console.log("There is an obstacle in front, jumping order");
    return 0;
  }
  else{
    getTrackingLog(numRover,coordinateActual);
    return 1;
  }
  /* Update obstacles*/
}
function executedSuccessfully(execution){
  /* We can set execution = execution +1 but this way is most readable*/
  if (execution == 0){
    execution = execution + 1;
    return execution;
  }
}

/* CONSOLE LOGS */
function logDirection(actualDirection){
  console.log("Direction Updated: "+actualDirection);
}
function getTrackingLog(numRover,coorForTracking){
  numRover.travelLog.push({
      x:coorForTracking[0],
      y:coorForTracking[1]
  });
}
function printMap(){
  var matrix = [],
    H = squareSize,
    W = squareSize;

  for ( var y = 0; y < H; y++ ) {
    matrix[ y ] = [];
    for ( var x = 0; x < W; x++ ) {
        matrix[ y ][ x ] = "(o)";
    }
  }
  // Paint rovers
  for(imRover = 0;imRover < rover.length; imRover++){
    var x2 = rover[imRover].x;
    var y2 = rover[imRover].y;
    switch(rover[imRover].direction){
      case "N":
        matrix[y2][x2]="(R⇡";
        break;
      case "S":
        matrix[y2][x2]="(R⇣";
        break;
      case "W":
        matrix[y2][x2]="(⇠R";
        break;
      case "E":
        matrix[y2][x2]="(R⇢";
        break;
    }
  }
  // Paint obstacles
  for(imRover = 0;imRover < obstacles.length; imRover++){
    var x3 = obstacles[imRover].x;
    var y3 = obstacles[imRover].y;
    matrix[y3][x3]="(X)";
  }
  console.log(matrix.join('\n') );
}
function initializeMap(){
  // Create CPU Rovers
  createRovers();
  // Create Obstacles
  createObstacles();
}
/* start here*/
var repeat = 1;
initializeMap();
while (repeat){
  // If we repeat, create rovers and obstacles again
  if (answer == "R"){
    initializeMap();
  }
  while(listCommands()); // Preload list commands
    if (rover[0].commands!= "null"){
      createOrders(rover[0].commands.length); // Random list commands CPU Rover
      executeOrders(rover);
      do{
        printMap();
        answer = prompt("please select an option: (r)estart, (c)ontinue or (f)inish");
        if (answer !=null){
          answer = answer.toUpperCase();
        }
        if (answer == "R"){
          // Empty arrays of rover and obstacles
          rover = [];
          obstacles = [];
          console.log("Reloaded values and restarting");
        }
        if (answer == "F"){
          repeat = 0;
        }
      }while((answer != "R" && answer != "C" && answer != "F") || answer==null);
      for (var listTracking in rover){
        console.log("Task executions COMPLETED - Rover Nº "+listTracking+" was parking at:["+rover[listTracking].x+","+rover[listTracking].y+"] looking at: "+rover[listTracking].direction);
        for (var listCoordinates in rover[listTracking].travelLog){
          console.log("X:"+rover[listTracking].travelLog[listCoordinates].x+" Y:"+rover[listTracking].travelLog[listCoordinates].y);
        }
      }

    }else{
      console.log("Cancel Button pressed");
    }
  }
