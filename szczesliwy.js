var szczesliwyNum = localStorage.szczesliwy;
var teksik = localStorage.szczesliwytex;
var tb = document.getElementById("top-banner-container").children[0];
var myheader = document.createElement('p1');
myheader.style.position = "absolute";
myheader.style.top = "85%";
myheader.textContent = teksik + szczesliwyNum;
tb.insertBefore(myheader, tb.firstChild);