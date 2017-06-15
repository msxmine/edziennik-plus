// Saves options to chrome.storage
function save_options() {
  var srednie = document.getElementById('srednie').checked;
  var ukryj = document.getElementById('ukryj').checked;
  var glowna = document.getElementById('glowna').checked;
  var baner = document.getElementById('baner').checked;
  var banerurl = document.getElementById('banerurl').value;
  var brzydkieenable = document.getElementById('brzydkieenable').checked;
  var brzydkiedata = document.getElementById('brzydkiedata').value;
  var brzydkieminimum = document.getElementById('brzydkieminimum').value;

  //CHROME
  if (przegladarka == "chrome"){
    //console.log("Skrypt zaladowany przez chrome script ");
    chrome.storage.local.set({
      srednie: srednie,
      ukryj: ukryj,
      glowna: glowna,
      baner: baner,
      banerurl: banerurl,
      brzydkieenable: brzydkieenable,
      brzydkiedata: brzydkiedata,
      brzydkieminimum: brzydkieminimum
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Ustawienia zapisane.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
    return;
  }
}


function restore_options() {
      chrome.storage.local.get({
        //DOMYSLNE USTAWIENIA CHROME
        srednie: true,
        ukryj: true,
        glowna: true,
        baner: true,
        banerurl: "https://i.imgur.com/OYSVEl8.png",
        brzydkiedata: "1000-01-01",
        brzydkieminimum: 3,
        brzydkieenable: false
      }, function(items) {
        document.getElementById('srednie').checked = items.srednie;
        document.getElementById('ukryj').checked = items.ukryj;
        document.getElementById('glowna').checked = items.glowna;
        document.getElementById('baner').checked = items.baner;
        document.getElementById('banerurl').value = items.banerurl;
        document.getElementById('brzydkieenable').checked = items.brzydkieenable;
        document.getElementById('brzydkiedata').value = items.brzydkiedata;
        document.getElementById('brzydkieminimum').value = items.brzydkieminimum;
      });
}
var przegladarka = "chrome";
document.addEventListener('DOMContentLoaded', restore_options);
restore_options();
document.getElementById('save').addEventListener('click', save_options);


