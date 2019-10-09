(function() {
  const product = location.search.substr(1).split("_");
  const productCategory = product[0];
  var productId = product[1];

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      for (var i = 0; i < data[productCategory].length; i++) {
        if (data["drinks"][i].id === productId) {
          return (productId = i);
        }
      }
      if (data[productCategory].length < productId) {
        eror404();
        return;
      }
      changeUrl(data);

      breadcrumbs = [
        { name: product[0], link: "#" },
        { name: data["drinks"][productId].category, link: "#" },
        { name: data["drinks"][productId].name, link: "" }
      ];
      addPointTooBreadcrumbMap(breadcrumbs);

      buildProductPage(data);
    } else if (this.status == 404) {
      eror404();
      return;
    }
  };
  xmlhttp.open("GET", "../jsons/" + productCategory + ".json", true);
  xmlhttp.send();

  const eror404 = function() {
    document.getElementsByClassName("product-page")[0].innerHTML =
      "Page not found";
    document
      .getElementsByClassName("product-page")[0]
      .classList.add("product-page-name");
    document
      .getElementsByClassName("product-page")[0]
      .classList.add("product-page-warning");
  };

  const changeUrl = function(data) {
    let drinkName = data["drinks"][productId].name;
    drinkName = drinkName.replace(/ /g, "-");
    let newLocation = "?" + product[0] + "_" + product[1] + "_" + drinkName;
    window.history.pushState("object or string", "Page Title", newLocation);
  };

  const buildProductPage = function(data) {
    document.getElementsByClassName("product-page-img")[0].src =
      data["drinks"][productId].image;
    document.getElementsByClassName("product-page-img")[0].title =
      data["drinks"][productId].name;

    document.getElementsByClassName("product-page-name")[0].innerHTML =
      data["drinks"][productId].category + " " + data["drinks"][productId].name;
    document.getElementsByClassName("product-page-price")[0].innerHTML =
      data["drinks"][productId].price.toFixed(2) + " uan.";

    const inStock = data["drinks"][productId].inStock;
    if (inStock == true) {
      document.getElementsByClassName("product-page-stock")[0].innerHTML =
        "on the shelf";
      document.getElementsByClassName(
        "product-page-stock-description"
      )[0].innerHTML =
        "The goods are in the store. You can pick it up now (until 21:00) or place a reservation for tomorrow.";
      document.getElementsByClassName("product-page-stock-again")[0].innerHTML =
        "In stock";
    } else {
      document.getElementsByClassName("product-page-stock")[0].innerHTML =
        "on order";
      document.getElementsByClassName(
        "product-page-stock-description"
      )[0].innerHTML =
        "Make a reservation and the product will be available within 48 hours.";
      document.getElementsByClassName("product-page-stock-again")[0].innerHTML =
        "Preorder";
    }
    document.getElementsByClassName(
      "product-page-characteritics-text"
    )[0].innerHTML = data["drinks"][productId].description;

    showCharacteristics(data);
  };

  const showCharacteristics = function(data) {
    productCharacteristics = data["drinks"][productId].characteristics;
    for (key in productCharacteristics) {
      if (productCharacteristics.hasOwnProperty(key)) {
        let characteristicsConteiner = document.getElementsByClassName(
          "product-page-characteristics"
        )[0];
        if (productCharacteristics[key].link === true) {
          let container = document.createElement("div");
          container.classList.add("characteritics-container");
          showPropertyName(productCharacteristics[key].name, container);

          if (Array.isArray(productCharacteristics[key].value)) {
            productCharacteristics[key].value.forEach(function(element) {
              showPropertyValueButton(element, container);
              showPropertyValueSeparator(container);
            });
            characteristicsConteiner.appendChild(container);
          } else {
            showPropertyValueButton(
              productCharacteristics[key].value,
              container
            );
            characteristicsConteiner.appendChild(container);
          }
        } else {
          let container = document.createElement("div");
          container.classList.add("characteritics-container");
          showPropertyName(productCharacteristics[key].name, container);
          showPropertyValue(productCharacteristics[key].value, container);
          characteristicsConteiner.appendChild(container);
        }
      }
    }
  };
  const showPropertyName = function(name, container) {
    let characteriticsName = document.createElement("span");
    characteriticsName.innerHTML = name + ": ";
    characteriticsName.classList.add("product-characteritics");
    container.appendChild(characteriticsName);
  };
  const showPropertyValueButton = function(value, container) {
    let characteristicValue = document.createElement("a");
    characteristicValue.innerHTML = value;
    characteristicValue.href = "#" + value;
    characteristicValue.classList.add("product-characteritics--valueLink");
    container.appendChild(characteristicValue);
  };
  const showPropertyValue = function(value, container) {
    let characteristicValue = document.createElement("span");
    characteristicValue.innerHTML = value;
    characteristicValue.classList.add("product-characteritics--value");
    container.appendChild(characteristicValue);
  };
  const showPropertyValueSeparator = function(container) {
    let separator = document.createElement("span");
    separator.innerHTML = ",";
    container.appendChild(separator);
  };
})();
