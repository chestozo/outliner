// Create context menu item for posting.
chrome.contextMenus.create({
    title: 'Dev: Outline elements',
    type: 'normal',
    contexts: [ 'all' ],
    onclick: function(info, tab) {
        var data = {
            caption: tab.title,
            link: tab.url
        };

        chrome.tabs.executeScript(
            tab.id,
            {
                code: ";(function() { var s = document.createElement('style'); s.innerText = '* { box-shadow: inset 0 0 1px red; }'; document.head.appendChild(s); })();"
            }
        );
    }
});

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

