(function() {
    'use strict';

    CKEDITOR.plugins.add('exbutton', {
        requires: 'button',

        modes: { 'wysiwyg': 1, 'source': 1 },

        init: function() {
            var buttonProto = CKEDITOR.ui.button.prototype;

            buttonProto.getElement = function() {
                return CKEDITOR.document.getById(this._.id);
            };

            buttonProto.getElementLabel = function() {
                return CKEDITOR.document.getById(this._.id + '_label');
            };

            buttonProto.setTitle = function(title) {
                title = String(title);

                if (this._.title === title) {
                    return false;
                }

                this._.title = title;

                var element = this.getElement();

                if (!element) {
                    return false;
                }

                var env = CKEDITOR.env;
                var titleJs = env.gecko && !env.hc ? '' : ( title || '' ).replace( "'", '' );

                element.setAttributes({
                    'title': title,
                    'href': "javascript:void('" + titleJs +  "')"
                });

                return true;
            };

            buttonProto.setLabel = function(label) {
                label = String(label);

                if (this._.label === label) {
                    return false;
                }

                this._.label = label;

                var element = this.getElementLabel();

                if (!element) {
                    return false;
                }

                element.setText(label);
                return true;
            };
        }
    });
}());
