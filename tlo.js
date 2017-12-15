
function zmienNaglowek(req) {
    var mojNaglowek = {
        name: "X-Frame-Options",
        value: "SAMEORIGIN"
    };
    req.responseHeaders.push(mojNaglowek);
    return {responseHeaders: req.responseHeaders};
}

browser.webRequest.onHeadersReceived.addListener(
    zmienNaglowek,
    {urls: ["https://synergia.librus.pl/przegladaj_plan_lekcji"]},
    ["blocking", "responseHeaders"]
);
