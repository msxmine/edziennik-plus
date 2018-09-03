var ramkaLogowania = document.getElementById("caLoginIframe");
function HandleLoad(){
    ramkaLogowania.removeEventListener('load', HandleLoad);
    setTimeout(function(){
        ramkaLogowania.src = ramkaLogowania.src;
    }, 100);
}

ramkaLogowania.addEventListener('load', HandleLoad);