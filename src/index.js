var buttons = require('sdk/ui/button/action');
var tabs = require('sdk/tabs');
var { attach, detach } = require('sdk/content/mod');
var Style = require('sdk/stylesheet/style').Style;
var self = require('sdk/self');
var Panel = require('sdk/panel').Panel;
var Request = require("sdk/request").Request;
var notifications = require("sdk/notifications");

var style = Style({
    uri: './css/mediathread_collect.css'
});

var init = function(apikeys) {
    attach(style, tabs.activeTab);
    var worker = tabs.activeTab.attach({
        contentScriptFile: [
            self.data.url('./lib/jquery-2.2.0.min.js'),
            self.data.url('./lib/URI.js'),
            self.data.url('./src/collect-panel.js'),
            self.data.url('./src/common/host-handler.js'),
            self.data.url('./src/common/asset-handler.js'),
            self.data.url('./src/common/collect.js'),
            self.data.url('./src/init.js')
        ],
        contentScriptWhen: 'ready'
    });
    worker.port.emit('apikeys', apikeys);

    worker.port.on('collect', function(payload) {
        var panel = Panel({
            width: 400,
            height: 400,
            contentURL: self.data.url('./collect-popup/index.html'),
            contentStyleFile: self.data.url('./css/popup-base.css'),
            contentScriptFile: [
                self.data.url('./lib/jquery-2.2.0.min.js'),
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
};

var handleClick = function() {
    var hostUrl = 'https://mediathread.ccnmtl.columbia.edu/';
    Request({
        url: hostUrl + '/accounts/is_logged_in/',
        onComplete: function(response) {
            var d = response.json;
            var panel;
            var apikeys = {};

            if ('flickr_apikey' in d) {
                apikeys.flickr_apikey = d.flickr_apikey;
            }
            if ('youtube_apikey' in d) {
                apikeys.youtube_apikey = d.youtube_apikey;
            }

            if (d.logged_in === true && d.course_selected === true) {
                init(apikeys);
            } else if (d.logged_in === true && d.course_selected === false) {
                panel = Panel({
                    width: 400,
                    height: 80,
                    contentURL: self.data.url('./login-popup/select-course.html'),
                    contentStyleFile: self.data.url('./css/popup-base.css')
                });
                panel.show();
            } else {
                panel = Panel({
                    width: 400,
                    height: 80,
                    contentURL: self.data.url('./login-popup/login.html'),
                    contentStyleFile: self.data.url('./css/popup-base.css')
                });
                panel.show();
            }
        }
    }).get();
 };

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
