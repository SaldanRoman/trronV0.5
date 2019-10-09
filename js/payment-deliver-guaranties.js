(function() {
  breadcrumbs = [{ name: "drinks", link: "#" }];
  addPointTooBreadcrumbMap(breadcrumbs);
  const HEIGHT_MENU = 110;

  const moveToSection = function() {
    const sectionName = location.search.substr(1);
    const section = document.getElementById(sectionName);
    let moveTo = section.offsetTop - HEIGHT_MENU;
    for (let i = 0; i < moveTo; i++) {
      function move() {
        moveSpeed = setTimeout(function() {
          window.scrollTo(0, i);
        }, i);
      }
      move();
    }
  };
  moveToSection();
})();
