
$(".col-sm-2").on('click',function(){  
  
  var imgTarget = event.target;
  var imgSelectedId = imgTarget.parentNode.id;
  if (imgSelectedId != undefined){
    var imgAlt = imgTarget.alt;
    var idx = splitId(imgSelectedId);
    console.log(myGrid[idx[0]][idx[1]]);
    console.log(myGrid[idx[0]][idx[1]].name);
    var gridAccessor = myGrid[idx[0]][idx[1]];
    console.log(gridAccessor) ;
    var newAngle = 0;
    gridAccessor.angle += 90;
    if (gridAccessor.angle === 360){
        gridAccessor.angle = 0;          
    }
      switch (imgAlt){
        case "Straight pipe": 
        case "Yellow light": 
          newAngle = gridAccessor.angle ;
          console.log(newAngle);
          if (gridAccessor.angle === 90 || gridAccessor.angle === 270) {
            gridAccessor.dir = [false,true,false,true];
          }
          else 
            gridAccessor.dir = [true,false,true,false];
          break;
        case "Left-Down pipe" :
          newAngle = gridAccessor.angle ;
          switch (newAngle){
              case 90:
                gridAccessor.dir = [true,false,false,true];
                break;
              case 180:
                gridAccessor.dir = [true,true,false,false];
                break;
              case 270:
                gridAccessor.dir = [false,true,true,false];
                break;
              default:
                gridAccessor.dir = [false,false,true,true];
          }
          break;
        case "Battery plus" :
          newAngle = gridAccessor.angle ;
          switch (newAngle){
              case 90:
                gridAccessor.dir = [false,false,false,true];
                break;
              case 180:
                gridAccessor.dir = [true,false,false,false];
                break;
              case 270:
                gridAccessor.dir = [false,true,false,false];
                break;
              default:
                gridAccessor.dir = [false,false,false,true];
          }
          break;
          case "Battery minus" :
          newAngle = gridAccessor.angle ;
          switch (newAngle){
              case 90:
                gridAccessor.dir = [true,false,false,false];
                break;
              case 180:
                gridAccessor.dir = [false,true,false,false];
                break;
              case 270:
                gridAccessor.dir = [false,false,true,false];
                break;
              default:
                gridAccessor.dir = [false,false,false,true];
          }
          break;

      }
      $("#" + imgSelectedId).css('transform','rotate('+ newAngle + 'deg)' );
      console.log(newAngle);
      tokenDirection = gridAccessor.dir;  
      console.log("tokenDirection:" +tokenDirection);
      
      var dir1 = myGrid[1][1].dir;
      var dir2 = myGrid[0][0].dir;
      
    console.log(pathTrue(dir1, dir2))
  }
  else
    console.log ("Pas d'image");  
});
 var  tokenDirection ;
// ******************************************************************************************************************* 
function splitId(id){
  var idColRemove = id.split("col");
  var newId = idColRemove[0] + idColRemove[1];
  var newIdRowRemove = newId.split("row"); 
  newId = newIdRowRemove[0] + newIdRowRemove[1];
  var newIdSplit = newId.split('-');
  return newIdSplit;
}
// direction : ip - right - down - left
var myGrid = [
                  [{  name : 'Battery plus',
                      angle : 0,
                      dir : [true,false,false,false],
                      isCheck : false}              ,'','','',''],
                  [{  name : 'Left-Down pipe',
                      angle : 0,
                      dir : [false,false,true,true],
                      isCheck : false},
                   { name : 'Straight pipe',
                      angle : 0,
                      dir : [true,false,true,false],
                      isCheck : false},
                  { name : 'Yellow light',
                      angle : 0,
                      dir : [true,false,true,false],
                      isCheck : false},
                  { name : 'Battery minus',
                      angle : 0,
                      dir : [false,false,false,true],
                      isCheck : false},                           ''],
                  ['',                               '',  '', '', ''],           
                  ['',                               '',  '', '', ''], 
                  ['',                               '',  '', '', '']
              ]

$('#btn-checkCircuit').on('click',function () {
  manageConnexion(myGrid);
})
function manageConnexion(gridArr){
   
  var actTkObj = {},  uTkObj = {}, rTkObj ={}, dTkObj = {}; lTkObj = {} ;
  var actuelTokenInd = [], uTokenInd = [], rTokenInd = [], dTokenInd =[], lTokenInd = [];
  // -----------------------------------------------------------------------------------------------------------------
  // looking for Battery minus token in the grid 
  var findTkBm = false;
    for (var i = gridArr.length - 1; i >= 0 ; i--){      
      for (var j = gridArr.length -1 ; j >= 0 ; j --){
        var myGridArr = gridArr[i][j];
          if ( myGridArr != '' && myGridArr.name === "Battery minus") {
            findTkBm = true;            
            break;
          }
      }
      if (findTkBm) {
          break;
      }
    }
  // if not in grid then circuit false
  if (!findTkBm){
    return false;
  }   
  
  // -----------------------------------------------------------------------------------------------------------------
  // looking for Battery plus token in the grid 
  var findTkBp = false;
  for (var i = gridArr.length - 1; i >= 0 ; i--){      
    for (var j = gridArr.length -1 ; j >= 0 ; j --){
      var myGridArr1 = gridArr[i][j];
        if ( myGridArr1 != '' && myGridArr1.name === "Battery plus") {
          findTkBp = true;
            break;
        }
    }
    if (findTkBp) {
        break;
    }
  }
   // if not in grid then circuit false
   if (!findTkBp){
      return false;
    }
  
  // -----------------------------------------------------------------------------------------------------------------
  var row = 0, col = 0;  
  // check side by side if connexion is true
        for (var i = gridArr.length - 1; i >= 0 ; i--){      
          for (var j = gridArr.length -1 ; j >= 0 ; j --){
            var myGridArr = gridArr[i][j];
              if ( myGridArr != '' && myGridArr.name === "Battery minus") {
                actuelTokenInd = getIndexTruePositionFromToken (myGridArr.dir) ;
                actTkObj = myGridArr
                uTokenInd = getIndexTruePositionFromToken(gridArr[i-1][j].dir);    // above token
                uTkObj = gridArr[i-1][j];
                rTokenInd = getIndexTruePositionFromToken(gridArr[i][j+1].dir);    // right token
                rTkObj = gridArr[i][j+1];
                dTokenInd = getIndexTruePositionFromToken(gridArr[i+1][j].dir);    // down token
                dTkObj = gridArr[i+1][j];
                lTokenInd = getIndexTruePositionFromToken(gridArr[i][j-1].dir);     // left token
                lTkObj = gridArr[i][j-1];
                var checkCon = false;
               if (uTokenInd.length > 0) {
                  checkCon = checkConnexion (actuelTokenInd, uTokenInd);
                  if (checkCon === true ){
                    actionCheckConnexionTrue( actTkObj,i,j);
                  }              
                }
                if (checkCon === false && rTokenInd.length > 0){
                  checkCon = checkConnexion (actuelTokenInd, rTokenInd);
                  if (checkCon === true ){
                    actionCheckConnexionTrue( actTkObj,i,j);
                  }
                }
                if (checkCon === false && dTokenInd.length > 0){
                  checkCon = checkConnexion (actuelTokenInd, dTokenInd);
                  if (checkCon === true ){
                    actionCheckConnexionTrue( actTkObj,i,j);
                  }
                }
                if (checkCon === false && lTokenInd.length > 0){
                  checkCon = checkConnexion (actuelTokenInd, lTokenInd);
                  if (checkCon === true ){
                    actionCheckConnexionTrue( actTkObj,i,j);
                  }    
                }
              }
          }
       }
     // assign isCheck key value to true  
    function actionCheckConnexionTrue( obj,a,b){
      obj.isCheck = true ;
      console.log("isCheck: "+ obj);
      row = a;
      col = b;
    }         
}

// *******************************************************************************************************************
// check connexion
function checkConnexion(actTok, toCheckTok){
  for (i = 0; i < actTok.length ; i++ ){
     for (j = 0; j < toCheckTok.length; j++){
       if ( actTok[i] === toCheckTok[j]){
          return true;
       }
     }
  }
  return false;
}
// *******************************************************************************************************************
// Bring back index array when position = true
function getIndexTruePositionFromToken(tokenDirArr){
  var directionIndexTrue = [];
  if (tokenDirArr !== undefined) {
    
   for (var i = 0 ; i < tokenDirArr.length ; i++){
      if (tokenDirArr[i] === true){
        directionIndexTrue.push(i);
      }
    }
  }
   return directionIndexTrue ;      
}



function pathTrue(dir1, dir2){
  switch (dir1) {
    case "UD":            
      if (dir2 === "DL" || dir2 === "UD" || dir2 === "RD") {
        return true;
      }
      else
       return false;
       break;
    case "RL":    
      if (dir2 === "UR" || dir2 === "RD" || dir2 === "RL"){
        return true;
      }
      else
       return false;
       break;
    case "LU":
      if (dir2.includes("D")){
        return true;
      }
      else
       return false;
        break;
    case "DL":
    case "RD":
      if (dir2.includes("U")){
        return true;
      }
      else
       return false;    
  }
}




/*
function Token(angle,uBool, rBool, dBool, lBool, dir) {
  this.connection = {
                      U: uBool,
                      R: rBool,
                      D: dBool,
                      L: lBool
                    }
  this.direction = dir;
}

function selectedTocken(alt,angle){
  switch (alt){
    case "straight pipe":
      if (angle === 90 || angle === 270 ){
        return new Tocken( true, true, false, false, "UD" );
      }
      else
        return new Tocken( false, false, true, true, "LR" );
    case "top-right pipe" :
      switch (angle){
        case 0:
          return new Tocken( true, true, false, false, "UR" );
          break;
        case 90:
          return new Tocken( false, true, false, true, "RD" );
          break;
        case 180:
          return new Tocken( false, false, true, true, "DL" );
          break;
        case 270:
          return new Tocken(angle, false, false, true, true, "LU" );
          break;
      }
  }
}*/