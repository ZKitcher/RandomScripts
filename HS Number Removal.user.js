// ==UserScript==
// @name         HS Number Removal
// @namespace    https://www.hamiltonservices.com/
// @version      0.0.3
// @description  Removes the large quicksort numbers from HS.
// @author       Z.Kitcher
// @match        https://www.hamiltonservices.com/web/*
// @icon         https://www.hamiltonservices.com/web/Content/favicon.svg
// @include      https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @update       https://github.com/ZKitcher/RandomScripts/raw/main/HS%20Number%20Removal.user.js
// ==/UserScript==

(function() {
    'use strict';
    $('body').on('DOMSubtreeModified', () => $('[name="quickValue"]').css('display','none'))
})();
