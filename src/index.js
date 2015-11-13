var buttons = require('sdk/ui/button/action');
var tabs = require('sdk/tabs');

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
}
