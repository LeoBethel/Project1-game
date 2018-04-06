
 // **********************************************************  Global Variables ****************************************************
    var successResp = $('#row1-col5');
    var falseResp = $('#row2-col5'); 
    var nextObjInPathTrue = {};

    // direction : up - right - down - left
var myGrid = [
  [{  name : 'Battery plus',
      angle : 0,
      dir : [false,false,true,false],
      row : 0,
      col : 0,
      isCheck : false}              ,'','','',''],
  [{  name : 'Left-Down pipe',
      angle : 0,
      dir : [false,false,true,true],
      row : 0,
      col : 0,
      isCheck : false},
   { name : 'Straight pipe',
      angle : 0,
      dir : [true,false,true,false],
      row : 0,
      col : 0,
      isCheck : false},
  { name : 'Yellow light',
      angle : 0,
      dir : [true,false,true,false],
      row : 0,
      col : 0,
      isCheck : false},
  { name : 'Battery minus',
      angle : 0,
      dir : [false,false,false,true],
      row : 0,
      col : 0,
      isCheck : false},                           ''],
  ['',                               '',  '', '', ''],           
  ['',                               '',  '', '', ''], 
  ['',                               '',  '', '', '']
]

// ************************************************************ /Global Variables **************************************************** 

// ************************************************************  Functions ************************************************************

// set differents properties of the object clicked
function rotateEventAction ( arr, imgAlt, newAngle, imgIdSelected) {  
  switch (imgAlt){
    case "Straight pipe": 
    case "Yellow light": 
      newAngle = arr.angle ;
      console.log(newAngle);
      if (arr.angle === 90 || arr.angle === 270) {
        arr.dir = [false,true,false,true];
      }
      else 
      arr.dir = [true,false,true,false];
      break;
    case "Left-Down pipe" :
      newAngle = arr.angle ;
      switch (newAngle){
          case 90:
          arr.dir = [true,false,false,true];
            break;
          case 180:
          arr.dir = [true,true,false,false];
            break;
          case 270:
          arr.dir = [false,true,true,false];
            break;
          default:
          arr.dir = [false,false,true,true];
      }
      break;
    case "Battery plus" :
      newAngle = arr.angle ;
      switch (newAngle){
          case 90:
          arr.dir = [false,false,false,true];
            break;
          case 180:
          arr.dir = [true,false,false,false];
            break;
          case 270:
          arr.dir = [false,true,false,false];
            break;
          default:
          arr.dir = [false,false,true,false];
      }
      break;
      case "Battery minus" :
      newAngle = arr.angle ;
      switch (newAngle){
          case 90:
          arr.dir = [true,false,false,false];
            break;
          case 180:
          arr.dir = [false,true,false,false];
            break;
          case 270:
          arr.dir = [false,false,true,false];
            break;
          default:
          arr.dir = [false,false,false,true];
      }
      break;

  }
  $("#" + imgIdSelected).css('transform','rotate('+ newAngle + 'deg)' );
      console.log(newAngle);  
}
// get the Id of the click on tocken
function splitId(id){
  var idColRemove = id.split("col");
  var newId = idColRemove[0] + idColRemove[1];
  var newIdRowRemove = newId.split("row"); 
  newId = newIdRowRemove[0] + newIdRowRemove[1];
  var newIdSplit = newId.split('-');
  return newIdSplit;
}

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
    console.log("Pas de Lumière");
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
    console.log("Pas de Lumière");
      return false;
    }
  
  // -----------------------------------------------------------------------------------------------------------------
 
  // check side by side if connexion is true
  for (var i = gridArr.length - 1; i >= 0 ; i--){      
    for (var j = gridArr.length -1 ; j >= 0 ; j --){
      var myGridArr = gridArr[i][j];
        if ( myGridArr != '' && myGridArr.name === "Battery minus") {
          actTkObj = myGridArr
          setRowColInfos (actTkObj, i, j)
          uTkObj = gridArr[i-1][j];
          setRowColInfos (uTkObj, i-1 , j)
          rTkObj = gridArr[i][j+1];
          setRowColInfos (rTkObj, i, j+1 )
          dTkObj = gridArr[i+1][j];
          setRowColInfos (dTkObj, i + 1, j )
          lTkObj = gridArr[i][j-1];
          setRowColInfos (lTkObj, i, j-1 )          
          
          var checkCon = false;          
          var checkConUp = checkConnexion (actTkObj, uTkObj, 'Check-Up');
          var checkConR = checkConnexion (actTkObj, rTkObj, 'Check-Rigth');
          var checkConD = checkConnexion (actTkObj, dTkObj, 'Check-Down');
          var checkConL = checkConnexion (actTkObj, lTkObj, 'Check-Left');          
          if ( checkConUp === true || checkConR === true || checkConD === true || checkConL === true ) {
            checkCon = true;
          }
          else
          {
            console.log(" Pas de Lumière");
            showSuccesOrFailed(falseResp[0].id);
            return false;            
          }
          if (proceedNextCheck(checkCon, gridArr)) {
            console.log("SUCCESS");
            return true;
          }  
          else 
          console.log(" Pas de Lumière")
          return false;
        }
    }
  }  
} 
function setRowColInfos(objt, row, col){ 
  if(objt !== undefined ){  
    if ( Object.keys(objt).length !== 0 ) {
      objt.row = row;
      objt.col = col;
    }    
  }
}

function proceedNextCheck (checkCon, gridArr){  
  var rw = 0, cl = 0;    
  if (checkCon) {
    while (checkCon === true){
      checkCon = false;      
      var actTkObj = nextObjInPathTrue;
        if (actTkObj.name !== "Battery plus") {
          rw = nextObjInPathTrue.row;
          cl = nextObjInPathTrue.col;
          var uTkObj = gridArr[rw -1][cl];
          setRowColInfos (uTkObj, rw-1 , cl)
          var rTkObj = gridArr[rw][cl+1];
          setRowColInfos (rTkObj, rw, cl + 1 )
          var dTkObj = gridArr[rw+1][cl];
          setRowColInfos (dTkObj, rw + 1, cl )
          var lTkObj = gridArr[rw][cl-1];
          setRowColInfos (lTkObj, rw, cl-1 )  
          var checkConUp = checkConnexion (actTkObj, uTkObj, 'Check-Up');
          var checkConR = checkConnexion (actTkObj, rTkObj, 'Check-Rigth');
          var checkConD = checkConnexion (actTkObj, dTkObj, 'Check-Down');
          var checkConL = checkConnexion (actTkObj, lTkObj, 'Check-Left');
          
          if ( checkConUp === true || checkConR === true|| checkConD === true || checkConL === true){
            checkCon = true;
          }
        }      
    }
  }  
  if ( actTkObj.name !== 'Battery plus'){
    resetIsCheckKey( myGrid);
    showSuccesOrFailed(falseResp[0].id)
    
    return false;
  }
  else
  { 
    resetIsCheckKey(myGrid); 
    showSuccesOrFailed(successResp[0].id)
    return true;    
  }  
}

function actionCheckConnexionFromWhileLoop(objt1 , objt2, filter){
  if (objt2 !== undefined){
    if ( Object.keys(objt2).length !== 0 && objt2.isCheck !== true){
      checkCon = checkConnexion (objt1, objt2, filter);
    }
  }
}
// check connexion ---- oject.dir = [Up, Right, Down, Left ]
function checkConnexion(obj1, obj2, checkSide ){
  if (obj2 !== undefined){
      if ( Object.keys(obj2).length !== 0 && obj2.isCheck !== true){
          var ind = 0;
          switch (checkSide){                                         
            case 'Check-Up':
              if (obj1.dir[0] === true &&  obj2.dir[2] === true ){
                actionIncheckConnexion (obj1, obj2);
                return true; 
              }
              else
              return false; 
              break;
            case 'Check-Rigth':
              if (obj1.dir[1] === true &&  obj2.dir[3] === true ){
                actionIncheckConnexion (obj1, obj2);
                return true; 
              }
              else
              return false; 
              break;
            case 'Check-Down':
              if (obj1.dir[2] === true &&  obj2.dir[0] === true ){
                actionIncheckConnexion (obj1, obj2);
                return true; 
              }
              else
              return false; 
              break;
              case 'Check-Left':
              if (obj1.dir[3] === true &&  obj2.dir[1] === true ){
                actionIncheckConnexion (obj1, obj2);
                 return true; 
              }
              else
              return false; 
              break;
              default:
                return false;
          }
        }
  }

  function actionIncheckConnexion (ob1, ob2) {
    ob1.isCheck = true;
    nextObjInPathTrue = ob2;
  }  
}
function resetIsCheckKey( arrGrid){
  for (var i = arrGrid.length - 1; i >= 0 ; i--){      
    for (var j = arrGrid.length -1 ; j >= 0 ; j --){
        if ( arrGrid[i][j] !== '' ) {
          arrGrid[i][j].isCheck = false;
        }
      }
  }      
}

function showSuccesOrFailed(myId) {
  if( myId === "row1-col5") {
    $('#row1-col5').show();
    $('#row2-col5').hide();
  }
  else
  {
    $('#row1-col5').hide();
    $('#row2-col5').show();
  }
}

// **************************************************************** Functions ************************************************************

// **************************************************************** Actions ***************************************************
// action when click on the token in the grid
$(".col-sm-2").on('click',function(){  
  successResp.hide();
  falseResp.hide();
  var imgTarget = event.target;
  var imgSelectedId = imgTarget.parentNode.id;
  if (imgSelectedId != undefined && imgSelectedId !== ''){
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
    rotateEventAction ( gridAccessor, imgAlt, newAngle, imgSelectedId) 
  }
  else
    console.log ("Pas d'image");  
});
// action when click on the validate button 
$('#btn-checkCircuit').on('click',function () {
  manageConnexion(myGrid);
})
 // **************************************************************** /Actions ***********************************************




