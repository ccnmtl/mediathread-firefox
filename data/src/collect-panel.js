var collectPopupClickHandler = function(form, me, $buttonAsset, host_url) {
    var payload = {
        form: form.outerHTML
    };
    self.port.emit('collect', payload);
    self.port.on('collect-submit', function() {
        var sherdOverlay = $('.sherd-window-inner', document);
        var alertSavedMarginLeft =
            ($('.sherd-window-inner', document)
             .width() / 2) - (535 * 0.5);
        var alertSavedMarginTop =
            ($(window).height() / 2) - 100;
        var collectionUrl =
            me.unHttpsTheLink(
                host_url.split('save')[0] + 'asset/');
        var $alertSaved = $(
            '<div class="alert-saved">' +
                '<span style="font-weight:bold">' +
                'Success.</span> Your item has been ' +
                'successfully added to your ' +
                '<a>Mediathread collection</a>.</div>');
        var $link = $alertSaved.find('a');
        $link.attr('href', collectionUrl);
        var alertClose = $(
            '<div class="alert-close">X</div>');

        $alertSaved.css({
            'top': alertSavedMarginTop + 'px',
            'left': alertSavedMarginLeft + 'px'

        });
        alertClose.click(function() {
            $(this).parent().remove();
        });
        $alertSaved.prepend(alertClose);
        sherdOverlay.append($alertSaved);
        $alertSaved.fadeIn(500, function() {
            var btn = $buttonAsset;
            btn.attr('value', 'Collected');
            btn.off();
            btn.css({
                background: '#999',
                color: '#333'
            });
        });
    });
};
