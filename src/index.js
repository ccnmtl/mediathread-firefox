var buttons = require('sdk/ui/button/action');
var Request = require('sdk/request').Request;
var tabs = require('sdk/tabs');
var data = require('sdk/self').data;
var { attach, detach } = require('sdk/content/mod');
var Style = require('sdk/stylesheet/style').Style;
var notifications = require('sdk/notifications');

var settings = require('../data/src/common/settings.js').settings;

var makeIsLoggedInRequest = function(callback) {
    console.log('user_url', settings.user_url);
    var oReq = new XMLHttpRequest();
    oReq.open('GET', settings.user_url);
    return Request({
        url: settings.user_url,
        onComplete: function(d) {
            console.log('complete!', d, this);

            if ('flickr_apikey' in d) {
                //MediathreadCollect.options.flickr_apikey = d.flickr_apikey;
            }
            if ('youtube_apikey' in d) {
                //MediathreadCollect.options.youtube_apikey = d.youtube_apikey;
            }

            if (d.logged_in === true && d.course_selected === true) {
                callback(d);
            } else if (d.logged_in === true && d.course_selected === false) {
                notifications.notify({
                    text: 'You\'re logged in to Mediathread at ' +
                        settings.host_url +
                        ', now select a course to use the browser extension.'
                });
            } else {
                notifications.notify({
                    text: 'Log in to Mediathread (' + settings.host_url +
                        ') and select a course!'
                });
            }
        }
    }).get();
};

var style = Style({
    uri: './css/sherd_styles.css'
});

/**
 * Run the mediathread-collect code in the current tab.
 */
var runCollectionCode = function(d) {
    attach(style, tabs.activeTab);
    tabs.activeTab.attach({
        contentScriptFile: [
            data.url('./lib/jquery-2.1.4.min.js'),
            data.url('./lib/URI.js'),
            data.url('./src/common/settings.js'),
            data.url('./src/common/host-handler.js'),
            data.url('./src/common/asset-handler.js'),
            data.url('./src/common/collect.js')
        ]
    });
};

var handleClick = function(state) {
    // Run collection code once we are logged in.
    makeIsLoggedInRequest(runCollectionCode);
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
