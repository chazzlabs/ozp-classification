'use strict';

angular.module('ozpClassification', [])

    .directive('ozpClassification', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var options = {
                    level: attrs.ozpClassification
                };

                if (!angular.isUndefined(attrs.ozpColorBanners)) {
                    options.colorBanners = attrs.ozpColorBanners;
                }

                element.classification(options);
            }
        };
    });
