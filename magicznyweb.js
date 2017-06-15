function OdpalDodanaPrzezemnieAnimacje(){
var style = document.createElement('style');
style.type = 'text/css';
style.textContent = '.grade-box { position: fixed; }';
document.getElementsByTagName('head')[0].appendChild(style);



function makeNewPosition(){
    
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}
function calcSpeed(prev, next) {
var x = Math.abs(prev[1] - next[1]);
var y = Math.abs(prev[0] - next[0]);
var greatest = x > y ? x : y;
var speedModifier = 0.01;
var speed = Math.ceil(greatest / speedModifier);
return speed;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function animateDiv(objekt){
      var newq = makeNewPosition();
      var oldq = objekt.offset();
      var speed = calcSpeed([oldq.top, oldq.left], newq);

      objekt.animate({ top: newq[0], left: newq[1] }, speed, function(){
      animateDiv(objekt);        
    });            
};

function WystartujAnimacje(){
    $('.grade-box').each(function(){
      animateDiv($(this));              
    });    
}
WystartujAnimacje();
}