(function () {
    window.addEventListener('resize', function () {
        pageScrolledOrChangedWidth();
    });
    window.addEventListener('scroll', function () {
        pageScrolledOrChangedWidth();
    });

    const fixMenuAppearsWhenThePageIsReduced = function () {
        let menu = document.getElementsByClassName("header-nav-catalog-list")[0];
        let menuConteiner = menu.parentElement;
        menuConteiner.removeChild(menu);
        menuConteiner.appendChild(menu);
    }
    const pageScrolledOrChangedWidth = function () {
        const scroll = pageYOffset;
        const width = document.getElementsByClassName("header-wrapper--grey")[0].offsetWidth;
        const HEIGHT_MENU_TYPE_1 = 157;
        const HEIGHT_MENU_TYPE_2 = 247;
        const MINIMUM_WIDTH_FOR_COMPUTER_VERSION = 880;
        const MENU_DRECTORY_CHANGES_POSITION_WHEN_WIDTH = 1000;
        if (scroll > HEIGHT_MENU_TYPE_1 & width > MINIMUM_WIDTH_FOR_COMPUTER_VERSION) {
            // Attaches the navigation menu to the top of the screen
            document.getElementsByClassName("header-wrapper--grey")[0].classList.add("header-wrapper--grey--fixed");
            // Changes the position 
            document.getElementsByClassName("header-nav-catalog")[0].classList.add("header-nav-catalog--static");
            // Fix marggin 
            document.getElementsByClassName("header-nav-catalog-list-list")[0].classList.add("header-nav-catalog-list-list--scroll");
            // Displays the button navigation (search, user, shopping cart) in the navigation bar
            document.getElementsByClassName("header-nav-scroll")[0].classList.add("header-nav-scroll--show");
            // Кeduces the menu button (takes the name of the "menu")
            document.getElementsByClassName("header-nav-menu-name")[0].classList.add("header-nav-menu-name--none");
            document.getElementsByClassName("header-wrapper")[0].classList.add("header-wrapper--fixedMenu");
        } else if (scroll > HEIGHT_MENU_TYPE_2 & width < MINIMUM_WIDTH_FOR_COMPUTER_VERSION) {
            fixMenuAppearsWhenThePageIsReduced()
            document.getElementsByClassName("header-wrapper--grey")[0].classList.add("header-wrapper--grey--fixed");
            document.getElementsByClassName("header-nav-catalog")[0].classList.add("header-nav-catalog--static");
            document.getElementsByClassName("header-nav-catalog-list-list")[0].classList.add("header-nav-catalog-list-list--scroll");
            document.getElementsByClassName("container-stop-link")[0].classList.add("container-stop-link--index");
            document.getElementsByClassName("header-nav-menu-name")[0].classList.remove("header-nav-menu-name--none");
            document.getElementsByClassName("header-nav-scroll")[0].classList.remove("header-nav-scroll--show");
            document.getElementsByClassName("header-wrapper")[0].classList.add("header-wrapper--fixedMenu");
        } else {
            fixMenuAppearsWhenThePageIsReduced()
            document.getElementsByClassName("header-wrapper--grey")[0].classList.remove("header-wrapper--grey--fixed");
            document.getElementsByClassName("header-nav-menu-name")[0].classList.remove("header-nav-menu-name--none");
            document.getElementsByClassName("header-nav-scroll")[0].classList.remove("header-nav-scroll--show");
            document.getElementsByClassName("header-nav-catalog")[0].classList.remove("header-nav-catalog--static");
            document.getElementsByClassName("header-nav-catalog-list-list")[0].classList.remove("header-nav-catalog-list-list--scroll");
            document.getElementsByClassName("header-wrapper")[0].classList.remove("header-wrapper--fixedMenu");
        }
        if (width < MENU_DRECTORY_CHANGES_POSITION_WHEN_WIDTH) {
            document.getElementsByClassName("header-nav-catalog")[0].classList.add("header-nav-catalog--static");
            document.getElementsByClassName("header-nav-catalog-list-list")[0].classList.add("header-nav-catalog-list-list--scroll");
        }
    }
    pageScrolledOrChangedWidth();
    document.getElementsByClassName("header-nav-menu")[0].addEventListener('click', closelist);
    document.getElementsByClassName("header-mid-search")[0].addEventListener('click', function () {
        const width = document.getElementsByClassName("header-wrapper--grey")[0].offsetWidth;
        const MAXIMUM_WIDTH_FOR_MOBILE_VERSIONS = 450;
        if (width < MAXIMUM_WIDTH_FOR_MOBILE_VERSIONS) {
            document.getElementsByClassName("header-mid-search-list")[0].classList.toggle("header-mid-search-list--mobile");
            closelist();
        }
    });
    document.getElementsByClassName("header-nav-catalog")[0].addEventListener('click', closelist);
    document.getElementsByClassName("header-mid-basket")[0].addEventListener('click', closelist);
    document.getElementsByClassName("header-top-button")[0].addEventListener('click', function () {
        document.getElementsByClassName("header-top-list")[0].classList.toggle("header-top-list--click");
        closelist();
    });
    document.getElementsByClassName("container-stop-link")[0].addEventListener('click', function () {
        document.getElementsByClassName("container-stop-link")[0].classList.remove("container-stop-link--block");
        document.getElementsByClassName("header-top-list")[0].classList.remove("header-top-list--click");
        document.getElementsByClassName("header-mid-search-list")[0].classList.remove("header-mid-search-list--mobile");

    });
    // function creates a container that prevents linking or button presses when closing drop down
    function closelist() {
        document.getElementsByClassName("container-stop-link")[0].classList.toggle("container-stop-link--block");
    };

    // clears the input when the page is restarted
    document.getElementsByClassName("header-mid-search-input")[0].value = "";
    document.getElementsByClassName("header-mid-search-input")[1].value = "";
})();