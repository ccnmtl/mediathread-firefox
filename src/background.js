/* globals browser */

var getPathFromUrl = function(url) {
    return url.split(/[?#]/)[0];
};

// https://www.chromium.org/Home/chromium-security/extension-content-script-fetches
browser.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        console.log('got message', message);
        if (message.contentScriptQuery == 'getContent') {
            var isLoggedInUrl = new URL('/accounts/is_logged_in/', message.hostUrl);

            fetch(isLoggedInUrl, {
                cache: 'no-cache',
                mode: 'cors',
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    sendResponse(data);
                    return data;
                })
                .catch(function() {
                    alert('Error loading URL: ' + isLoggedInUrl.href);
                });
            return true;  // Will respond asynchronously.
        }
    });

browser.runtime.onMessageExternal.addListener(
    function(message, sender, sendResponse) {
        console.log('get external message', message);
        if (message.command && message.command === 'updatesettings') {
            if (!sender.url.startsWith('https://')) {
                sendResponse('This extension requires Mediathread to be ' +
                             'used over HTTPS.');
                return false;
            }

            var url = sender.url;
            url = getPathFromUrl(url);
            url = url.replace(/\/$/, '');
            var setStorage = browser.storage.local.set({
                options: {
                    hostUrl: 'other',
                    customUrl: url
                }
            });

            setStorage.then(function() {
                sendResponse('Mediathread URL updated to: ' + url);
            });
        }
        return true;
    });

browser.browserAction.onClicked.addListener(function(tab) {
    browser.tabs.executeScript(tab.id, {file: 'lib/jquery-3.4.1.min.js'});
    browser.tabs.executeScript(tab.id, {file: 'lib/URI.js'});
    browser.tabs.executeScript(tab.id, {file: 'src/loadcss.js'});
    browser.tabs.executeScript(tab.id, {file: 'src/collect-popup.js'});
    browser.tabs.executeScript(tab.id, {file: 'src/common/host-handler.js'});
    browser.tabs.executeScript(tab.id, {file: 'src/common/asset-handler.js'});
    browser.tabs.executeScript(tab.id, {file: 'src/common/collect.js'});
    browser.tabs.executeScript(tab.id, {file: 'src/init.js'});
});
