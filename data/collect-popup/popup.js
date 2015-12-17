$(document).ready(function() {
    self.port.on('form-payload', function(form) {
        var $form = $(form);
        $form.find('input.cont').remove();
        $form.find('input.analyze').remove();
        $form.append('<input type="hidden" value="cont" name="button">');
        $form.append('<button id="submit-input" class="btn-primary" ' +
                     'type="submit">Save</button>');
        $form.append('<button id="submit-cancel" class="btn-primary" ' +
                     'type="button">Cancel</button>');
        $form.append('<div class="help-text">' +
                     'Clicking "Save" will add this item to your ' +
                     'Mediathread collection and return you to ' +
                     'collecting.' +
                     '</div>');

        $('#bucket-wrap').append($form);

        $('#submit-cancel').click(function() {
            self.port.emit('collect-cancel');
        });

        $('form').on('submit', function() {
            self.port.emit('collect-submit');
        });
    });
});
