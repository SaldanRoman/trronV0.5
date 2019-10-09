'use strict';

(function () {
    const benefitsItems = document.getElementsByClassName('benefits-item-img');
    Array.from(benefitsItems).forEach(function (item) {
        item.addEventListener('mouseover', function () {
            if (!item.classList.contains('hover')) {
                item.classList.add('hover');
                setTimeout(function () {
                    item.classList.remove('hover')
                }, 1500)
            }

        })
    });
})();
