
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

function zmienNaglowekdwa(req) {    
    for (var i = 0, leng = req.responseHeaders.length; i < leng; i++){
        if (req.responseHeaders[i].name == "Location"){
            req.responseHeaders[i].value = "https://portal.librus.pl/rodzina/synergia/loguj";
        }
    }
    return {responseHeaders: req.responseHeaders};
}

browser.webRequest.onHeadersReceived.addListener(
    zmienNaglowekdwa,
    {urls: ["https://synergia.librus.pl/wyloguj"]},
    ["blocking", "responseHeaders"]
);

function zmienRzadanie(req) {
    var zmiana = 0;
    for(var header of req.requestHeaders){
        if(header.name == "Referer"){
            header.value = "https://portal.librus.pl/rodzina"
            zmiana = 1;
        }
    }
    if(zmiana == 0){
        var nowyhead = {
            "name": "Referer",
            "value": "https://portal.librus.pl/rodzina"
        };
        req.requestHeaders.push(nowyhead);
    }
    return {requestHeaders: req.requestHeaders};
}

browser.webRequest.onBeforeSendHeaders.addListener(
    zmienRzadanie,
    {urls: ["https://portal.librus.pl/rodzina/synergia/loguj"]},
    ["blocking", "requestHeaders"]
);