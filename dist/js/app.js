(() => {
    "use strict";
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = "";
                }));
                document.body.style.paddingRight = "";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }));
            document.body.style.paddingRight = lockPaddingValue;
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    window.onload = function() {
        adjustColumnHeights();
    };
    window.onresize = function() {
        resetColumnHeights();
        adjustColumnHeights();
    };
    function resetColumnHeights() {
        const columns = document.querySelectorAll(".news-grid__column");
        columns.forEach((column => {
            column.style.height = "auto";
        }));
    }
    function adjustColumnHeights() {
        if (window.innerWidth < 991.98) {
            resetColumnHeights();
            return;
        }
        const smallColumn = document.querySelector(".news-grid__column._small");
        const bigColumn = document.querySelector(".news-grid__column._big");
        const middleColumn = document.querySelector(".news-grid__column._middle");
        if (smallColumn && bigColumn && middleColumn) {
            const bigColumnHeight = bigColumn.offsetHeight;
            const middleColumnHeight = middleColumn.offsetHeight;
            const maxHeight = Math.max(bigColumnHeight, middleColumnHeight);
            [ smallColumn, bigColumn, middleColumn ].forEach((column => {
                column.style.height = `${maxHeight}px`;
            }));
        }
    }
    window["FLS"] = false;
    menuInit();
})();