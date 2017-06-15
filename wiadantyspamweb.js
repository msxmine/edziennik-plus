function odswiezZaznaczenia(){
  for (var wiersz of document.getElementsByClassName("decorated stretch")[0].children[1].children){
  var nadawca = "\"" + wiersz.children[2].textContent + "\"";
  if (listaspamu[nadawca] != undefined){
    wiersz.children[6].children[0].checked = true;
  }
  else{
    wiersz.children[6].children[0].checked = false;
  }
  }
}

//HEADER
var node = document.createElement("td");
document.getElementsByClassName("decorated stretch")[0].children[0].children[0].appendChild(node);
node.textContent = "SPAM";
node.className = "micro";
//

//WIADOMOSCI
var listaspamu = JSON.parse(localStorage.getItem("listaspamu"));
if (listaspamu == null){
  var listaspamu = {};
}

for (var wiersz of document.getElementsByClassName("decorated stretch")[0].children[1].children){
  var wezel = document.createElement("td");
  wezel.className = "micro center";
  wiersz.appendChild(wezel);
  var pudelko = document.createElement("input");
  pudelko.type = "checkbox"
  wezel.appendChild(pudelko);
  
  pudelko.addEventListener("input", function(){
    var nadawca = "\"" + this.parentElement.parentElement.children[2].textContent + "\"";
    var zaznaczone = this.checked;
    if (zaznaczone){
      listaspamu[nadawca] = "1";
    }
    else{
      delete listaspamu[nadawca];
    }
    localStorage.setItem("listaspamu", JSON.stringify(listaspamu));
    odswiezZaznaczenia();
  });
  
}
odswiezZaznaczenia();
//STOPKA
document.getElementsByClassName("decorated stretch")[0].children[2].children[0].children[0].colSpan = 7;

var wezel = document.createElement("td");
wezel.className = "small";
wezel.style.verticalAlign = "middle";
document.getElementsByClassName("stretch message-button-panel")[0].children[0].children[0].appendChild(wezel);
var pudelko = document.createElement("input");
pudelko.type = "button";
pudelko.value = "USUŃ SPAM";
pudelko.addEventListener("click", function(){
    console.log("DALEJ DALEJ JAVASCRIPCIE GADŻETA");
    for (var wiersz of document.getElementsByClassName("decorated stretch")[0].children[1].children){
    if (wiersz.children[6].children[0].checked){
      wiersz.children[0].children[0].checked = true;
    }
    else{
      wiersz.children[0].children[0].checked = false;
    }
  
    }
  usunListeWiadomosci(5, 0, 0); //Function native to website
    for (var wiersz of document.getElementsByClassName("decorated stretch")[0].children[1].children){
      wiersz.children[0].children[0].checked = false;
  
    }
  });
wezel.appendChild(pudelko);
