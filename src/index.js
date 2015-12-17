var buttons = require('sdk/ui/button/action');
var tabs = require('sdk/tabs');
var { attach, detach } = require('sdk/content/mod');
var Style = require('sdk/stylesheet/style').Style;
var self = require('sdk/self');
var Panel = require('sdk/panel').Panel;

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

var style = Style({
    uri: './css/mediathread_collect.css'
});

function handleClick(state) {
    attach(style, tabs.activeTab);
    var worker = tabs.activeTab.attach({
        contentScriptFile: [
            self.data.url('./lib/jquery-2.1.4.min.js'),
            self.data.url('./lib/URI.js'),
            self.data.url('./src/common/settings.js'),
            self.data.url('./src/common/host-handler.js'),
            self.data.url('./src/common/asset-handler.js'),
            self.data.url('./src/common/collect.js'),
            self.data.url('./src/init.js')
        ],
        contentScriptWhen: 'ready'
    });

    worker.port.on('collect', function(payload) {
        var panel = Panel({
            width: 400,
            height: 350,
            contentURL: self.data.url('./collect-popup/index.html'),
            contentStyleFile: self.data.url('./collect-popup/style.css'),
            contentScriptFile: [
                self.data.url('./lib/jquery-2.1.4.min.js'),
                self.data.url('./collect-popup/popup.js')
            ]
        });
        panel.port.on('collect-cancel', function() {
            panel.hide();
        });
        panel.port.on('collect-submit', function() {
            // Tell the main content script about the submission so
            // it can display a notice.
            worker.port.emit('collect-submit');
            panel.hide();
        });

        panel.show();
        panel.port.emit('form-payload', payload.form);
    });
}
