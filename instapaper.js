(function($){

//var total = 0;
//
//// 1. All images - to base64 representation.
//$("img").each(function(index, img) {
//    total++;
//    chrome.extension.sendRequest({ message: "get-base64-url", src: img.src }, function(response) {
//        img.src = response.base64;
//        total--;
//    });
//    total--;
//});

// Save to instapaper: standart instapaper bookmarklet code.
function iprl5() {
    var d = document, z = d.createElement('scr' + 'ipt'), b = d.body, l = d.location;
    try {
        if (!b)throw(0);
        d.title = '(Saving...) ' + d.title;
        z.setAttribute('src', l.protocol + '//www.instapaper.com/j/83fI1LqqAEzt?u=' + encodeURIComponent(l.href) + '&t=' + (new Date().getTime()));
        b.appendChild(z);
    } catch (e) {
        alert('Please wait until the page has loaded.');
    }
}

//var saveIfReady = function() {
//    if (total === 0) {
//        iprl5();
//        return;
//    }
//
//    setTimeout(saveIfReady, 100);
//};
//saveIfReady();

iprl5();

}(jQuery));