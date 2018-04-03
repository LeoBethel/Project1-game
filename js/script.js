
var tokenObj = {
  rotation:0
}
$(".col-sm-2").on('click',function(){
  
  var imgTarget = event.target;
  if(imgTarget.className != "rotated-image"){
    tokenObj.rotation = 90;
    imgTarget.setAttribute("class", "rotated-image");
  }
  else {
    tokenObj.rotation += 90;
    var angle = tokenObj.rotation;
    $(".rotated-image").css('transform','rotate('+angle + 'deg)' );
  } 
});
