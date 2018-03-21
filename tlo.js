
function zmienNaglowek(req) {    
    for (var i = 0, leng = req.responseHeaders.length; i < leng; i++){
        if (req.responseHeaders[i].name == "X-Frame-Options"){
            req.responseHeaders[i].value = "SAMEORIGIN";
        }
    }
    return {responseHeaders: req.responseHeaders};
}

browser.webRequest.onHeadersReceived.addListener(
    zmienNaglowek,
    {urls: ["https://synergia.librus.pl/przegladaj_plan_lekcji", "http://synergia.librus.pl/przegladaj_plan_lekcji"]},
    ["blocking", "responseHeaders"]
);
