chrome.storage.local.get({
    glowna: true
  }, function(items) {
      if (items.glowna == true) {

            var customStyles = document.createElement('style'); 
            customStyles.appendChild(document.createTextNode(
            ".center.main-page { display: none; } .container.static.margin-bottom { display: none; } #footer {display: none;}"
            ));
            document.documentElement.appendChild(customStyles);

      };
  });


document.addEventListener("DOMContentLoaded", function() {


//var szczesliwyNum = document.getElementsByClassName("szczesliwy-numerek")[0].children[0].textContent;
//var teksik = document.getElementsByClassName("szczesliwy-numerek")[0].parentElement.children[2].textContent;
//localStorage.setItem("szczesliwy", szczesliwyNum);
//localStorage.setItem("szczesliwytex", teksik);
//var tb = document.getElementById("top-banner-container").children[0];
//var myheader = document.createElement('p1');
//myheader.style.position = "absolute";
//myheader.style.top = "85%";
//myheader.textContent = teksik + szczesliwyNum;
//tb.insertBefore(myheader, tb.firstChild);

chrome.storage.local.get({
    glowna: true
  }, function(items) {
      if (items.glowna == true) {
                document.getElementById("body").innerHTML = '<div><iframe style="position:absolute;left:0px;width:100%;height:85%" src="https://synergia.librus.pl/przegladaj_plan_lekcji" scrolling="yes" align="middle" frameborder="0"></iframe></div>';
      };
  });

});



