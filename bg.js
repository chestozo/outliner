;(function(){
    $(initButton);
    function initButton() {
        chrome.browserAction.onClicked.addListener(function(tab) {
            chrome.tabs.executeScript(tab.id, { file: "instapaper.js" });
        });
    }
}());

// ----------------------------------------------------------------------------------------------------------------- //
var createAndReturnBase64 = function(src, sendResponse) {
    var i = new Image();

    i.onload = function() {

        // Create an empty canvas element
        var canvas = document.createElement("canvas");
        canvas.width = i.width;
        canvas.height = i.height;

        // Copy the image contents to the canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(i, 0, 0);

        // Get the data-URL formatted image
        // Firefox supports PNG and JPEG. You could check img.src to
        // guess the original format, but be aware the using "image/jpg"
        // will re-encode the image.
        //var dataURL = canvas.toDataURL("image/png");
        var code = canvas.toDataURL("image/png");
        sendResponse({ base64: code });

        console.log(code); // xxx
    };

    // Start loading.
    i.src = src;
};

// ----------------------------------------------------------------------------------------------------------------- //

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if (request.message === 'get-base64-url') {
            createAndReturnBase64(request.src, sendResponse);
        }
    }
);
