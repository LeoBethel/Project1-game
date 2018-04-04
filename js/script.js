
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

    console.log (checkConnexion (myGrid));
  
});
 var  tokenDirection ;
 
function splitId(id){
  var idColRemove = id.split("col");
  var newId = idColRemove[0] + idColRemove[1];
  var newIdRowRemove = newId.split("row"); 
  newId = newIdRowRemove[0] + newIdRowRemove[1];
  var newIdSplit = newId.split('-');
  return newIdSplit;
}

var myGrid = [
                  [{  name : 'Battery plus',
                      angle : 0,
                      dir : [true,false,true,false],
                      isCheck : false}                      ,'',            '',         '',         ''],
                  [{  name : 'Left-Down pipe',
                      angle : 0,
                      dir : [true,true,false,false],
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
                      isCheck : false},                                                                  ''],
                  ['',                                      '',             '',         '',              ''],           
                  ['',                                      '',             '',         '',              ''], 
                  ['',                                      '',             '',         '',              '']
              ]

function checkConnexion(gridArr){
    var lastToken = [];
    var newToken = [];
    var nexTokenAhead = [];
    var nexTokenAbove = [];
  for (var i = gridArr.length - 1; i >= 0 ; i--){      
      for (var j = gridArr.length -1 ; j >= 0 ; j --){
          if (gridArr[i][j] != '') {
            lastToken = gridArr[i][j].push(); 
            nexTokenAhead = gridArr[i][j-1].push();
            nexTokenAbove = gridArr[i-1][j].push();
            if (nexTokenAhead != '') {
              if ( lastToken.dir[3] === true && nexTokenAhead.dir[1] === true ){  // compare if  connexion left = right ;
                
                continue;
              }
              else{
                return false;
              }
            }      
          }
      }
  }
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