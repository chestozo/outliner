;(function() {

var initExtension = function() {
    var outlineForever =
        ";(function() {" +
        "var s = document.querySelector('#__ext_plugs_outline_style__');" +
        "if (s) {" +
        "    s.parentNode.removeChild(s);" +
        "} else {" +
        "    s = document.createElement('style');" +
        "    s.id = '__ext_plugs_outline_style__';" +
        "    s.innerText = '* { box-shadow: inset 0 0 1px green; } iframe { box-shadow: 0 0 1px green; }';" +
        "    document.head.appendChild(s);" +
        "}" +
        "})();";

    var outlineOnce = "document.querySelectorAll('*').forEach(function(node) { " +
        "var style = node.getAttribute('style');" +
        "node.setAttribute('style', (style || '') + ';box-shadow: inset 0 0 1px red;');" +
    "});";

    // Toggle outline elements on the page.
    var toggleOutlineOnce = function(tabId) {
        chrome.tabs.executeScript(
            tabId,
            { code: outlineOnce }
        );
    };

    var toggleOutline = function(tabId) {
        chrome.tabs.executeScript(
            tabId,
            { code: outlineForever }
        );
    };

    // Create context menu item.
    chrome.contextMenus.create({
        title: 'Dev: Outline elements toggle once', //  [Cmd + Shift + 0]
        type: 'normal',
        contexts: [ 'all' ],
        onclick: function(info, tab) {
            toggleOutlineOnce(tab.id);
        }
    });

    chrome.contextMenus.create({
        title: 'Dev: Outline elements toggle', //  [Cmd + Shift + P]
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
        if (command === 'toggle-elements-outline-once') {
            chrome.tabs.getSelected(null, function(tab){
                toggleOutlineOnce(tab.id);
            });
        } else if (command === 'toggle-elements-outline') {
            chrome.tabs.getSelected(null, function(tab){
                toggleOutline(tab.id);
            });
        }
    });
};

initExtension();

}());
