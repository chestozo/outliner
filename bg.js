;(function(){
    $(initButton);
    function initButton() {
        chrome.browserAction.onClicked.addListener(function(tab) {
            chrome.tabs.create({
                url: 'chrome://plugins',
                active: true
            });
        });
    }
}());

