const addPointToBreadcrumbMap = function (breadcrumbs) {
  document
    .getElementsByClassName("breadcrumb--wrapper")[0]
    .classList.remove("breadcrumb--none");
  const container = document.getElementsByClassName("breadcrumb")[0];
  const separator = document.createElement("span");
  separator.innerHTML = "»";
  let breadcrumbButton = document.createElement("a");
  breadcrumbButton.innerHTML = "Main";
  breadcrumbButton.href = "../index.html";
  container.appendChild(breadcrumbButton);
  container.appendChild(separator);

  breadcrumbs.forEach(function (element) {
    if (element.link === "") {
      breadcrumbButton = document.createElement("span");
      breadcrumbButton.innerHTML = element.name;
      container.appendChild(breadcrumbButton);
    } else {
      breadcrumbButton = document.createElement("a");
      const separator = document.createElement("span");
      separator.innerHTML = "»";
      breadcrumbButton.innerHTML = element.name;
      breadcrumbButton.href = element.link;
      container.appendChild(breadcrumbButton);
      container.appendChild(separator);
    }
  });
};
let breadcrumbs = [{
  name: "name",
  link: "#"
}];

const logInfo = [true, "userName"];
