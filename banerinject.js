chrome.storage.local.get({
        //DOMYSLNE USTAWIENIA CHROME
        baner: true,
        banerurl: "https://i.imgur.com/OYSVEl8.png"
      }, function(items) {
          if (items.baner){

            //Using CSS as a placeholder so the banner doesnt flicker 
            //CSS applies as soon as element is shown (It can be set before element exists)
            //JS has a delay (it needs DOM completely loaded)
            var customStyles = document.createElement('style');
            customStyles.appendChild(document.createTextNode(
            "#top-banner { visibility: hidden } #top-banner-container { background: url(" + items.banerurl + ") no-repeat, url(/assets/img/synergia/header/systema.png) top left no-repeat !important; }"
            ));
            //banerurl set by user, shouldnt be a problem //I dont even know if there is any risk with CSS
            document.documentElement.appendChild(customStyles); 

            //When everthing is loaded do JS anyway because background: url isn't perfect
            document.addEventListener("DOMContentLoaded", function() {
                        var banerElement = document.getElementById("top-banner");
                        banerElement.src = items.banerurl;
                        banerElement.style.visibility = "visible";
            });

          }
});
