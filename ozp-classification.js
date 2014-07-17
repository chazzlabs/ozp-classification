'use strict';

angular.module('ozpClassification', [])

    .directive('ozpClassification', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.classification({ level: attrs.ozpClassification });
            }
        };
    });