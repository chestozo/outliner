;(function() {

var initExtension = function() {
    var outlineToggleCode =
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

    var outlineForeverCode = "document.querySelectorAll('*').forEach(function(node) { " +
        "var style = node.getAttribute('style');" +
        "node.setAttribute('style', (style || '') + ';box-shadow: inset 0 0 1px red;');" +
    "});";

    // Toggle outline elements on the page.
    var outlineToggle = function(tabId) {
        chrome.tabs.executeScript(
            tabId,
            { code: outlineToggleCode }
        );
    };

    var outlineForever = function(tabId) {
        chrome.tabs.executeScript(
            tabId,
            { code: outlineForeverCode }
        );
    };

    // Create context menu item.
    chrome.contextMenus.create({
        title: 'Toggle elements outline (turn elements outline on and off',
        type: 'normal',
        contexts: [ 'all' ],
        onclick: function(info, tab) {
            outlineToggle(tab.id);
        }
    });

    chrome.contextMenus.create({
        title: 'Permanent elements outline (permanent outline so you can see what elements are replaced when interacting with the webpage',
        type: 'normal',
        contexts: [ 'all' ],
        onclick: function(info, tab) {
            outlineForever(tab.id);
        }
    });

    // Shortcuts support.
    chrome.commands.onCommand.addListener(function(command) {
        if (command === 'toggle-elements-outline-once') {
            chrome.tabs.getSelected(null, function(tab){
                outlineToggle(tab.id);
            });
        } else if (command === 'toggle-elements-outline') {
            chrome.tabs.getSelected(null, function(tab){
                outlineForever(tab.id);
            });
        }
    });
};

initExtension();

}());
