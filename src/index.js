var buttons = require('sdk/ui/button/action');
var tabs = require('sdk/tabs');
var data = require("sdk/self").data;

var button = buttons.ActionButton({
    id: 'mediathread-link',
    label: 'Collect with Mediathread',
    icon: {
        '16': './img/icon-16.png',
        '32': './img/icon-32.png',
        '64': './img/icon-64.png'
    },
    onClick: handleClick
});

function handleClick(state) {
    tabs.activeTab.attach({
        contentStyleFile: data.url('./css/sherd_styles.css'),
        contentScriptFile: [
            data.url('./lib/jquery-2.1.4.min.js'),
            data.url('./lib/URI.js'),
            data.url('./src/common/settings.js'),
            data.url('./src/common/host-handler.js'),
            data.url('./src/common/asset-handler.js'),
            data.url('./src/common/collect.js')
        ]
    });
}
