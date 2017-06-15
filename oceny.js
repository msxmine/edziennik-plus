//Zamienia surowy ciag pobrany ze strony na matematycznie poprawna wartosc
function przeliczMatematycznie(ocena)
{
  var wynik;
  var wazneZnaczniki = ["0", "1-", "1", "1+", "2-", "2", "2+", "3-", "3", "3+", "4-", "4", "4+", "5-", "5", "5+", "6-", "6", "6+"];
  if (!(wazneZnaczniki.includes(ocena))) {ocena = "0";}
  switch (ocena.slice(-1)) {
    case "+":
      wynik = parseInt(ocena) + 0.5;
      break;

    case "-":
      wynik = parseInt(ocena) - 0.25;
      break;

    default:
      wynik = parseInt(ocena);
      break;
  }
  return wynik;
}

//DO POPRAWY //SCRAPING
function Ocena(adres)
{
  this.adres = adres;
  var temp = adres.getAttribute("title").split("<br>");
  var tab = [];
  for (var i = 0, n = temp.length; i < n; i++)
  {
    temp[i] = temp[i].replace('<br/>','');
    tab.push(temp[i].substring(0, temp[i].indexOf(':')));
    tab.push(temp[i].substring(temp[i].indexOf(':')+2));
  }
  this.tab = tab;

  var funkcjeWartosci = {
    kategoria: "Kategoria",
    czas: "Data",
    nauczyciel: "Nauczyciel",
    liczdosr: "Licz do średniej",
    dodal: "Dodał",
    komentarz: "Komentarz"
  }


  var wartosciOceny = Object.keys(funkcjeWartosci);
  for (let wartosc of wartosciOceny){
    if (!(tab.indexOf(funkcjeWartosci[wartosc]) == -1)){
      this[wartosc] = tab[tab.indexOf(funkcjeWartosci[wartosc])+1];
    }
  }

  this.ocena = adres.textContent;

  if (tab.indexOf("Waga") == -1){

  }
  else{
    if (this.liczdosr != "tak"){
      this.waga = "0";
    }
    else
    {
      if (adres.parentElement.parentElement.nodeName == "SPAN")
      {
        var wagasub = 0; //waga wszystkich zbiorowych
        var iloscistotnych = 0; //ilosc istotnych elementow
        for (var petla = 0, ilosc = adres.parentElement.parentElement.children.length; petla < ilosc; petla++){
            var tempsub = adres.parentElement.parentElement.children[petla].children[0].getAttribute("title").split("<br>");
            var tabsub = [];
            for (var i = 0, n = tempsub.length; i < n; i++)
             {
                tempsub[i] = tempsub[i].replace('<br/>','');
                tabsub.push(tempsub[i].substring(0, tempsub[i].indexOf(':')));
                tabsub.push(tempsub[i].substring(tempsub[i].indexOf(':')+2));
             }
            var wagasupertmp = 0;
            if (tabsub.indexOf("Waga") != -1 && (tabsub.indexOf("Licz do średniej") == -1 || tabsub[tabsub.indexOf("Licz do średniej")+1] == "nie") != true){
              wagasupertmp = parseInt(tabsub[tabsub.indexOf("Waga")+1]);
              var iloscistotnych = iloscistotnych + 1;
            }
            var wagasub = wagasub + wagasupertmp;

        }
        this.waga = (wagasub / iloscistotnych) / iloscistotnych
      }
      else{
      this.waga = tab[tab.indexOf("Waga")+1];
      }
    }
  }
}
//Parsing blocku zawierajacego oceny i poprawki ocen do ladnego obiektu //SCRAPING
function Oceny(adres)
{
  var Oceny = [];
  var Ocenytmp = [];
  for (var i = 0, n = adres.children.length; i < n; i++)
  {
    if (adres.children[i].className != "grade-box")
      {
        for (var suboc = 0, m = adres.children[i].children.length; suboc < m; suboc++){
          Ocenytmp.push(adres.children[i].children[suboc].children[0]);
        }
      }
    else{
    Ocenytmp.push(adres.children[i].children[0]);
    }
  }
  for (var i = 0, n = Ocenytmp.length; i < n; i++)
  {
    Oceny[i] = new Ocena(Ocenytmp[i]);
  }
  return Oceny;
}
//Definicja obiektu przedmiot, zawierajacego oceny i wszystkie informacje o nim // SCRAPING
function Przedmiot(adres)
{
  this.adres = adres;

  var odpowiedniaNalepka;
  for (let element of document.querySelectorAll("table.decorated  > thead > tr")){
    if (element.textContent.includes("Oceny bieżące")){
      odpowiedniaNalepka = element;
    }
  }
  var napisy = [];
  for (let idNapisu = 0; idNapisu < odpowiedniaNalepka.children.length; idNapisu++){
    napisy.push(odpowiedniaNalepka.children[idNapisu]);
  }
  var naklejki = new Map();
  for (let idElementu = 0; idElementu < napisy.length; idElementu++){
    naklejki.set(napisy[idElementu].textContent, idElementu+2);
  }

  var definicjeElementow = { //Element do ktorego sie odnosic, offset, typ
    nazwa:             ["Śr.I" , "-2", "surowaWartosc"  ],
    oceny1:            ["Śr.I" , "-1", "zestawOcen"     ],
    srednia1:          ["Śr.I" , "0" , "surowaWartosc"  ],
    przewidywana1:     ["(I)"  , "0" , "pojedynczaOcena"],
    semestralna1:      ["I"    , "0" , "pojedynczaOcena"],
    oceny2:            ["Śr.II", "-1", "zestawOcen"     ],
    srednia2:          ["Śr.II", "0" , "surowaWartosc"  ],
    przewidywana2:     ["(II)" , "0" , "pojedynczaOcena"],
    semestralna2:      ["II"   , "0" , "pojedynczaOcena"],
    sredniaroczna:     ["Śr.R" , "0" , "surowaWartosc"  ],
    przewidywanaroczna:["(R)"  , "0" , "pojedynczaOcena"],
    roczna:            ["R"    , "0" , "pojedynczaOcena"]
  }

  var wartosciPrzedmiotu = Object.keys(definicjeElementow);
  for (let wartosc of wartosciPrzedmiotu){
    try{
      var mojodnosn = definicjeElementow[wartosc][0];
      var mojoffset = definicjeElementow[wartosc][1];
      var mojrodzaj = definicjeElementow[wartosc][2];
      var prymitywny = adres.children[naklejki.get(mojodnosn) + parseInt(mojoffset)];
      switch(mojrodzaj) {
        case "surowaWartosc":
          this[wartosc] = prymitywny;
          break;
        case "pojedynczaOcena":
          this[wartosc] = prymitywny.children[0].children[0];
          break;
        case "zestawOcen":
          this[wartosc] = new Oceny(prymitywny);
          break;
      }
    }
    catch(err){
      //console.log("Nie udało sie zdefiniowac " + wartosc + ", powod: " + err);
    }

  }


}

//Matematyka wyliczania srednich (bez wag poprawek)
function WyliczSrednia(oceny)
{
  var suma = 0;
  var sumawag = 0;
  var sred = 0;
  for (let nodeOceny of oceny)
  {
    let waga = 0;
    if (!(nodeOceny.waga == undefined)){
      waga = parseFloat(nodeOceny.waga);
    };
    sumawag = sumawag + waga;
    suma = suma + waga * przeliczMatematycznie(nodeOceny.ocena);
  }
  sred = (Math.round((suma / sumawag)*100)/100).toFixed(2);
  if (sumawag == 0){sred = SredniaBrakTekst;}
  return sred;
}

//GLOWNE FUNKCJE SKRYPTU
function PodmienSrednie()
{
//  if (naglowekTabeli != "Oceny ucznia") {return;} //Jesli na stronie z nowymi ocenami nic nie rób
  if (document.children[0].textContent.indexOf("- od ostatniego logowania") !== -1) {return;}
  for (let przedmiot of sciagnijPrzedmioty())
  {
    przedmiot.srednia1.textContent = WyliczSrednia(przedmiot.oceny1);
    przedmiot.srednia1.className += " center";
    przedmiot.srednia2.textContent = WyliczSrednia(przedmiot.oceny2);
    var wszystkieOceny = [];
    wszystkieOceny = wszystkieOceny.concat(przedmiot.oceny1, przedmiot.oceny2);
    przedmiot.sredniaroczna.textContent = WyliczSrednia(wszystkieOceny);
   }

}

function WywalPuste()
{
  //ZACHOWANIE HIDE
  window.onload = function () {
  document.getElementById("przedmioty_zachowanie_node").src = "https://synergia.librus.pl/images/tree_colapsed.png";
  document.getElementById("przedmioty_zachowanie").style.visibility = "hidden";
  document.getElementById("przedmioty_zachowanie").style.display = "none";
  }
  document.getElementById("przedmioty_zachowanie_node").src = "https://synergia.librus.pl/images/tree_colapsed.png";
  document.getElementById("przedmioty_zachowanie").style.visibility = "hidden";
  document.getElementById("przedmioty_zachowanie").style.display = "none";
  //RESZTA
  var waznePrzedmioty = [];
  for (let przedmiot of sciagnijPrzedmioty())
  {
    if (przedmiot.oceny1.length == 0 &&
        przedmiot.oceny2.length == 0 &&
        przedmiot.przewidywana1 == undefined &&
        przedmiot.semestralna1 == undefined &&
        przedmiot.przewidywana2 == undefined &&
        przedmiot.semestralna2 == undefined &&
        przedmiot.roczna == undefined &&
        przedmiot.przewidywanaroczna == undefined)
      {
       przedmiot.nazwa.parentElement.innerHTML = "";
      }
      else{
        waznePrzedmioty.push(przedmiot);
      };

  }
  for (let przedmiot of waznePrzedmioty){
    var index = waznePrzedmioty.indexOf(przedmiot);
    if (index % 2){
      przedmiot.adres.className = "line1";
    }
    else{
      przedmiot.adres.className = "line0";
    };
  }

}
////////
function HideOceny(data, minimum){
  for (let przedmiot of sciagnijPrzedmioty()) //Dla kazdego przedmiotu
    {
      for (let ocena of przedmiot.oceny1.concat(przedmiot.oceny2)){ //Dla kazdej oceny z 1 lub z 2 semestru
        if ( przeliczMatematycznie(ocena.ocena) != 0 && //Jesli ocena nie jest zerem, np, bz albo czyms w tym stylu ORAZ
             przeliczMatematycznie(ocena.ocena) < minimum && //ocena jest mniejsza niz wyznaczone minimum ORAZ
             Date.parse(ocena.czas.substring(0,10)) > Date.parse(data) //ocena zostala wystawiona po wyznaczonej dacie
             )
        {
        ocena.adres.parentNode.outerHTML = " "; //Wywal ta ocene
        }
      }
      
    }
    przedmioty = []; //Zresetuj tablice przedmiotow zeby srednie liczyc bez wywalonych ocen
}

var SredniaBrakTekst = "-" //Ciag ktorym zastapiony bedzie znak zapytania w wypadku braku ocen
//var naglowekTabeli = document.getElementsByClassName("inside")[0].innerHTML; // Naglowek tabeli, dzieki ktoremu wiemy ze jestesmy na stronie z tylko nowymi ocenami //SCRAPING
//Funkcja zwracajaca liste wszyskich przedmiotow, ocen i ich wlasciwosci //SCRAPING
var przedmioty = [];
function sciagnijPrzedmioty() {
  if (!(przedmioty == "")){return przedmioty;}
  else{
  for (let element of document.querySelectorAll("form > div > div > table > tbody")[0].children)
  {
    if ((element.getAttribute("class") == "line0" || element.getAttribute("class") == "line1") && element.getAttribute("id") == null)
    {
        przedmioty.push(new Przedmiot(element));
    }
  }
  return przedmioty;
  }
}



var customStyles = document.createElement('style');
customStyles.id = "mojewlasnesuperstyle";
customStyles.appendChild(document.createTextNode(
".decorated.stretch { display: none; }"
));
var mojestyle = document.documentElement.appendChild(customStyles);


document.addEventListener("DOMContentLoaded", function(event) {

chrome.storage.local.get({
    srednie: true,
    ukryj: true,
    brzydkiedata: "1000-01-01",
    brzydkieminimum: 3,
    brzydkieenable: false
  }, function(items) {
      if (items.brzydkieenable == true) {HideOceny(items.brzydkiedata, items.brzydkieminimum);}; //MODUL CHOWANIA BRZYDKICH OCEN    
      if (items.srednie == true) {PodmienSrednie();}; //WYLICZ SREDNIA1
      if (items.ukryj == true) {WywalPuste();}; //UKRYJ PUSTE
      mojestyle.remove();
  });

  //MAGICZNY GUZICZEK
var scripmagicz = document.createElement('script');
scripmagicz.src = chrome.extension.getURL('magicznyweb.js');
document.head.appendChild(scripmagicz);
MagicznyGuziczek = document.getElementsByClassName("fold")[2].parentNode.insertBefore(document.getElementsByClassName("fold")[2].cloneNode(true), document.getElementsByClassName("fold")[2].nextSibling);
MagicznyGuziczek.children[0].children[0].textContent = "???";
MagicznyGuziczek.children[0].href = `javascript: OdpalDodanaPrzezemnieAnimacje(); `;
//KONIEC MAGICZNEGO GUZICZKA
});

