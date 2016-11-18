ozp-classification
==================

A set of utilities handling injection of security banners into an HTML page.

# Usage
## jQuery Plugin
The core of these utilities is the jQuery plugin, contained in `jquery.classification.js`. This plugin uses some simple jQuery code to add two divs to the `<body>` element. Include the CSS and the plugin along with jQuery, and use something like below.

```javascript
$(function(){
    $(document).classification({
        level: "U"
    });
});
```

### Settings
The plugin settings and defaults are:
```javascript
var defaults = settings = {
    // Is the classification dynamic? This will include the prefix "DYNAMIC PAGE - HIGHEST POSSIBLE CLASSIFICATION IS"
    dynamic: false,
    // Default classification level - more options on this to come
    level: 'U-FOUO',
    // If dynamic above is true, do we want two bars to represent the classification
    dynamicBanner: false,
    // What color should "Top Secret" be? Default is yellow, orange if this is true
    tsOrange: false,
    // Banner backgrounds are not colored by default; set to true to color by classification level
    colorBanners: false
};
```

## Angular Directive
If you want to use this with AngularJS, we also provide a directive in `ozp-classification.js`. Include this file along plugin dependencies and inject the `ozpClassification` module into your application's module.

```javascript
angular.module('myApp', [ 'ozpClassification' ]);
```

You are then able to attach a classification to the body tag:

```html
<body ozp-classification="U-FOUO">...</body>
```

Set the `ozp-color-banners` attribute to true to enable colored banner backgrounds:

```html
<body ozp-classification="U-FOUO" ozp-color-banners="true">...</body>
```

## Bower
You can use the plugin or directive with Bower. Install with `bower install ozone-development/ozp-classification`.

## CSS
The CSS assumes the banners will be attached to the body tag. If you want the bottom banner to appear at the bottom of the rendering window, you will probably need to add something like this to your css:
```
body > div.classBanner:last-of-type {
    position: absolute;
    bottom: 0px;
}
```
