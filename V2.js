// ==UserScript==
// @name         Skip Viewer Discretion
// @version      2024-01-20
// @description  Skip Viewer Discretion Warning
// @author       CTS
// @match        https://*.youtube.com/*
// @grant        none
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    // Config
    // Note: Depending on your connection, the average page load time ranges between 100ms and 5000ms.
    const INITIAL_TIMEOUT = 200;
    const RETRY_TIMEOUT = 500;
    const DEBUG_MODE = false;

    // Number of Retry Attempts
    const MAX_RETRY_ATTEMPTS = 1;

    // Retry Attempt Counter
    let retryAttempt = 0;

    // Logging Function
    function log(message) {
        if (DEBUG_MODE) {
            console.log("DEBUG - " + message);
        }
    }

    // Consent Button Click Function
    function clickButton() {
        log("clickButton Running");
        const consentButton = document.querySelector('[aria-label="I understand and wish to proceed"]');

        if (consentButton) {
            consentButton.click();
            log("Button Found");
        } else {
            log("Button Not Found");
            if (retryAttempt < MAX_RETRY_ATTEMPTS) {
                retryAttempt++;
                setTimeout(clickButton, RETRY_TIMEOUT);
                log("Retry Attempt " + retryAttempt + "...");
            }
        }
    }

    // ---------------------

    function main() {
      // const start = performance.now();
      document.addEventListener("yt-page-data-updated", () => {
        let errorContainer = document.getElementById("player-error-message-container");
        if (errorContainer) {
          log("Container Found");
          window.setTimeout(clickButton, INITIAL_TIMEOUT);
        }

        // const end = performance.now();
        // log(`Benchmark ${end - start} milliseconds`);

      }, true);

      window.removeEventListener("yt-page-data-updated", main, true);
    }

    // ---------------------

    main()
    // window.setTimeout(clickButton, INITIAL_TIMEOUT);
})();

