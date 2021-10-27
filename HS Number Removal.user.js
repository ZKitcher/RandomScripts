// ==UserScript==
// @name         HS Number Removal
// @namespace    https://www.hamiltonservices.com/
// @version      0.0.2
// @description  Removes the large quicksort numbers from HS.
// @author       Z.Kitcher
// @match        https://www.hamiltonservices.com/web/LoyaltyAccount
// @icon         https://www.hamiltonservices.com/web/Content/favicon.svg
// ==/UserScript==

(function() {
    'use strict';
    $('[name="quickValue"], #activeUsers, #creditHold, #endBilling, #totalUsers').css('display','none')
})();
