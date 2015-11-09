;(function() {

var initExtension = function() {
    var outlineCode =
        ";(function() {" +
        "var s = document.querySelector('#__ext_plugs_outline_style__');" +
        "if (s) {" +
        "    s.parentNode.removeChild(s);" +
        "} else {" +
        "    s = document.createElement('style');" +
        "    s.id = '__ext_plugs_outline_style__';" +
        "    s.innerText = '* { box-shadow: inset 0 0 1px red; }';" +
        "    document.head.appendChild(s);" +
        "}" +
        "})();";

    // Toggle outline elements on the page.
    var toggleOutline = function(tabId) {
        chrome.tabs.executeScript(
            tabId,
            { code: outlineCode }
        );
    };

    // Create context menu item.
    chrome.contextMenus.create({
        title: 'Dev: Outline elements toggle', //  [Cmd + Shift + 0]
        type: 'normal',
        contexts: [ 'all' ],
        onclick: function(info, tab) {
            toggleOutline(tab.id);
        }
    });

    // Extension button click - opens plugins panel.
    chrome.browserAction.onClicked.addListener(function(tab) {
        chrome.tabs.create({
            url: 'chrome://plugins',
            active: true
        });
    });

    // Shortcuts support.
    chrome.commands.onCommand.addListener(function(command) {
        debugger;

        if (command === 'toggle-elements-outline') {

            chrome.tabs.getSelected(null, function(tab){
                toggleOutline(tab.id);
            });

        }
    });
};

$(initExtension);

}());
