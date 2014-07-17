/* jshint */
/* global jQuery: false */

/**
 * jQuery.classification.js
 * 
 * This is a jQuery plugin that creates classification banners on an HTML document.
 *
 * This plugin is used by a call to the jQuery function and can be chained. It takes string 
 * parameters that are methods, or it can take a configuration object with your desired settings.
 * The plugin works by injecting divs onto the body element.
 * Ex: $(document).classification({ dynamic: true, level: 'S-2P' })
 *          .classification('hide').classification('show');
 *
 * @class jQuery.classification
 * @version 0.5
 */

;(function($) {

    'use strict';

    // Shortcut for searching for class banners
    var banners = '.classBanner';

    // Shortcut used to create a div
    var divText = '<div></div>';

    // Text used in classification and declassification banners
    var text = {
        'U': 'UNCLASSIFIED',
        'U-FOUO': 'UNCLASSIFIED//FOR OFFICIAL USE ONLY',
        'C-NF': 'CONFIDENTIAL//NOFORN',
        'C-2P': 'CONFIDENTIAL//REL TO USA, AUS, CAN, GBR, NZL',
        'S-NF': 'SECRET//NOFORN',
        'S-2P': 'SECRET//REL TO USA, AUS, CAN, GBR, NZL',
        'TS-NF': 'TOP SECRET//NOFORN',
        'TS-2P': 'TOP SECRET//REL TO USA, AUS, CAN, GBR, NZL'
    };

    // Test used in dynamic and declassification banners
    var dText = 'DYNAMIC PAGE - HIGHEST POSSIBLE CLASSIFICATION IS';

    /**
     * @cfg settings {Object}
     * The plugin's current settings.
     */
    var settings = {};

    /**
     * jQuery.classification definition function.
     */
     $.fn.classification = function(method) {

        // Method calling logic. Either call methods, init, or throw and error.
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.classification');
        }

     };

    /**
    * Plugin methods object
    */
    var methods = {

        /**
         * Initialize classification library with customizable options.
         * @param {Object} options The options desired for the classification
         */
        init: function(options) {

            // Extend settings with supplied options
            settings = $.fn.classification.settings = $.extend({}, $.fn.classification.defaults, options);

            // Return this to allow chaining
            return this.each(function() {
                _createBanners();
            });

        },

        /**
         * Show classification banners.
         */
        show: function() {

            // Return this to allow chaining
            return this.each(function() {
                $(banners).show();
            });

        },

        /**
         * Hide classification banners.
         */
        hide: function() {

            // Return this to allow chaining
            return this.each(function() {
                $(banners).hide();
            });

        },

        /**
         * Set the classification to a new level.
         * @param {String} newClass the new classification to set
         */
        set: function(newClass) {

            // Make the new classification reflected in the level
            settings = $.extend(settings, { level: newClass });

            // Return this to allow chaining
            return this.each(function() {
                _createBanners();
            });

        }

    };

    /**
     * @cfg $.fn.classification.defaults {Object}
     * Classification plugin default settings.
     * 
     * @cfg $.fn.classification.defaults.dynamic {Boolean} [dynamic = false]
     * True if you want to display "Dynamic page" in the banner.
     * 
     * @cfg $.fn.classification.level {String} [level = 'U-FOUO']
     * A string representing the classification level, any compartments, and dissemination.
     * 
     * @cfg $.fn.classification.defaults.dynamicBanner {Boolean} [dynamicBanner = false]
     * True if a separate banner is needed for dynamic content.
     *
     * @cfg $.fn.classification.defaults.tsOrange {Boolean} [tsOrange = false]
     * True if you want Top Secret to be colored orange (colored yellow otherwise).
     */
    $.fn.classification.defaults = {
        dynamic: false,
        level: 'U-FOUO',
        dynamicBanner: false,
        tsOrange: false
    };

    /**
     * Internal function to create all banners on a page (dynamic, declass, and class banners).
     */
    var _createBanners = function() {

        // Remove old banners
        $(banners).remove();

        // The header and footer we are creating
        var head, foot;
        var txt = settings.level;
        var level = txt.charAt(0);
        var bannerText = text[txt];

        // If no dynamic banner is desired and dynamic text is desired ... 
        if (!settings.dynamicBanner && settings.dynamic) {
            // then we concat the dynamic text to the level text - to make one banner.
            bannerText = dText + ' ' + text[txt];
        }

        switch(level) {
        case 'T':
            var tsColor = 'Yellow';
            if (settings.tsOrange) {
                tsColor = 'Orange'
            }
            head = $(divText).addClass('classBanner TopSecret-' + tsColor).html(bannerText);
            foot = $(divText).addClass('classBanner TopSecret-' + tsColor).html(bannerText);
            break;
        case 'S':
            head = $(divText).addClass('classBanner Secret').html(bannerText);
            foot = $(divText).addClass('classBanner Secret').html(bannerText);
            break;
        case 'C':
            head = $(divText).addClass('classBanner Conf').html(bannerText);
            foot = $(divText).addClass('classBanner Conf').html(bannerText);
            break;
        case 'U':
            head = $(divText).addClass('classBanner U-FOUO').html(bannerText);
            foot = $(divText).addClass('classBanner U-FOUO').html(bannerText);
            break;
        }

        // Add header
        var $body = $('body');
        $body.prepend(head);

        // Create dynamic banners
        if (settings.dynamic && settings.dynamicBanner) {
            _dynamic();
        }

        // Add footer
        $body.append(foot);

    };

    /**
     * Internal function to create the declassification banner.
     */
    var _dynamic = function() {

        $(divText).addClass('classBanner Dynamic').html(dText).prependTo('body');
        $(divText).addClass('classBanner Dynamic').html(dText).appendTo('body');

    };

})(jQuery);     // Pass jQuery ad the parameter to use the $ shortcut without conflict