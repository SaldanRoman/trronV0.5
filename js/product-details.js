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
      var drink = data[productCategory][productId].additionalDescription;
      for (key in drink) {
        if (drink.hasOwnProperty(key)) {
          if (!drink[key]) {
          } else {
            buildDetailButton();
            buildDetailValueContainers(drink);
          }
        }
      }
      activateFirstButton();
      addClickEventListenerToButtons();
      upgradeButtonComments();
    }
  };
  xmlhttp.open("GET", "../jsons/" + productCategory + ".json", true);
  xmlhttp.send();

  const activateFirstButton = function() {
    document
      .getElementsByClassName("details-description")[0]
      .classList.add("details-button-active--row");
    document
      .getElementsByClassName("product-details-value--row")[0]
      .classList.toggle("product-details-value--row--none");
  };

  const buildDetailButton = function() {
    var productDetails = document.getElementsByClassName("product-details")[0];
    let detailButton = document.createElement("div");
    detailButton.innerHTML = key;
    detailButton.classList.add("details-" + key);
    detailButton.classList.add("details-button");
    productDetails.appendChild(detailButton);
  };

  const upgradeButtonComments = function() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        var comments = document.getElementsByClassName("details-сomments")[0];
        if (data[productId] === undefined) {
          quantityComments = 0;
        } else {
          quantityComments = data[productId].length;
        }
        comments.innerHTML = "comments(" + quantityComments + ")";
        comments = document.getElementsByClassName(
          "product-details-value--row--сomments"
        )[0];
        comments.classList.add(
          "product-details-value--row--" + "comments(" + quantityComments + ")"
        );
        comments = document.getElementsByClassName(
          "product-details-value--column--сomments"
        )[0];
        comments.classList.add(
          "product-details-value--column--" +
            "comments(" +
            quantityComments +
            ")"
        );
        if (logInfo[0] === false) {
          return;
        } else {
          const containerRow = document.getElementsByClassName(
            "product-details-value--row--сomments"
          )[0];
          const containerColumn = document.getElementsByClassName(
            "product-details-value--column--сomments"
          )[0];
          containerRow.innerHTML = "";
          containerColumn.innerHTML = "";
          if (quantityComments === 0) {
            addComments(containerRow, "row");
            addComments(containerColumn, "column");
          } else {
            showComments(data, containerRow, containerColumn);
            addComments(containerRow, "row");
            addComments(containerColumn, "column");
          }
        }
      }
    };
    xmlhttp.open("GET", "../jsons/comments.json", true);
    xmlhttp.send();
  };

  const showComments = function(data, containerRow, containerColumn) {
    data[productId].forEach(function(element) {
      buildComments(element, containerRow);
      buildComments(element, containerColumn);
    });
  };

  const buildComments = function(element, container) {
    let comment = document.createElement("div");
    comment.classList.add("product-details-comment-container");
    let commentName = document.createElement("div");
    commentName.classList.add("product-details-comment-name");
    commentName.innerHTML = element.name;
    let commentTime = document.createElement("div");
    commentTime.classList.add("product-details-comment-time");
    commentTime.innerHTML = element.time;
    let commentValue = document.createElement("div");
    commentValue.classList.add("product-details-comment-value");
    commentValue.innerHTML = element.comment;
    comment.appendChild(commentName);
    comment.appendChild(commentTime);
    comment.appendChild(commentValue);
    container.appendChild(comment);
  };

  const addComments = function(container, position) {
    let newCommentConteiner = document.createElement("div");
    newCommentConteiner.classList.add("product-details-comment--new");

    let userName = document.createElement("p");
    userName.innerHTML = "Your name: " + "<span>" + logInfo[1] + "</span>";
    newCommentConteiner.appendChild(userName);

    let str = document.createElement("p");
    str.innerHTML = "Comment *";
    newCommentConteiner.appendChild(str);

    let commentinput = document.createElement("textarea");
    commentinput.classList.add("product-details-comment-input--" + position);
    newCommentConteiner.appendChild(commentinput);

    let addcommentButton = document.createElement("div");
    addcommentButton.classList.add("product-details-comment-save");
    addcommentButton.innerHTML = "✔ save";
    addcommentButton.setAttribute("onclick", "saveComment('" + position + "')");
    newCommentConteiner.appendChild(addcommentButton);

    str = document.createElement("span");
    str.innerHTML = "Add comment";
    newCommentConteiner.appendChild(str);

    container.appendChild(newCommentConteiner);
  };

  const buildDetailValueContainers = function(drink) {
    var containerColumn = document.getElementsByClassName("product-details")[0];
    var containerRow = document.getElementsByClassName(
      "product-details-value"
    )[0];
    if (typeof drink[key] == "object" && !Array.isArray(drink[key])) {
      if (drink.hasOwnProperty(key)) {
        showObjectValue(drink[key], containerColumn, containerRow);
      }
    } else if (Array.isArray(drink[key])) {
      showArrayValue(drink[key], containerColumn, containerRow);
    } else {
      showStringValue(drink[key], containerColumn, containerRow);
    }
  };

  const showObjectValue = function(value, containerColumn, containerRow) {
    let drinkKey = value;
    let valuecontainerColumn = document.createElement("div");
    let valuecontainerRow = document.createElement("div");
    let key = "";
    for (key in drinkKey) {
      if (drinkKey.hasOwnProperty(key)) {
        showKey(key, valuecontainerColumn);
        showKey(key, valuecontainerRow);
        if (Array.isArray(drinkKey[key])) {
          showAllElements(
            drinkKey[key],
            valuecontainerColumn,
            valuecontainerRow
          );
        } else {
          showArrayElement(drinkKey[key], valuecontainerColumn);
          showArrayElement(drinkKey[key], valuecontainerRow);
        }
      }
    }
    containerColumn.appendChild(
      addPlacementClassesToElement(valuecontainerColumn, "column")
    );
    containerRow.appendChild(
      addPlacementClassesToElement(valuecontainerRow, "row")
    );
  };

  const showArrayValue = function(value, containerColumn, containerRow) {
    let valuecontainerColumn = document.createElement("div");
    let valuecontainerRow = document.createElement("div");
    showAllElements(value, valuecontainerColumn, valuecontainerRow);
    containerColumn.appendChild(
      addPlacementClassesToElement(valuecontainerColumn, "column")
    );
    containerRow.appendChild(
      addPlacementClassesToElement(valuecontainerRow, "row")
    );
  };

  const showAllElements = function(
    value,
    valuecontainerColumn,
    valuecontainerRow
  ) {
    value.forEach(function(element) {
      showArrayElement(element, valuecontainerColumn);
      showArrayElement(element, valuecontainerRow);
    });
  };

  const showStringValue = function(value, containerColumn, containerRow) {
    showValueInPosition(value, containerColumn, "column");
    showValueInPosition(value, containerRow, "row");
  };

  const showValueInPosition = function(value, container, position) {
    let valuecontainerRow = document.createElement("div");
    valuecontainerRow.innerHTML = value;
    container.appendChild(
      addPlacementClassesToElement(valuecontainerRow, position)
    );
  };

  const showKey = function(key, container) {
    let specialistrow = document.createElement("div");
    specialistrow.innerHTML = key;
    specialistrow.classList.add("details-notes--italic");
    container.appendChild(specialistrow);
  };

  const showArrayElement = function(value, container) {
    let textrow = document.createElement("div");
    textrow.innerHTML = value;
    textrow.classList.add("details-notes--margin");
    container.appendChild(textrow);
  };

  const addPlacementClassesToElement = function(elem, placing) {
    elem.classList.add("product-details-value--" + placing);
    elem.classList.add("product-details-value--" + placing + "--none");
    elem.classList.add("product-details-value--" + placing + "--" + key);
    return elem;
  };

  const addClickEventListenerToButtons = function() {
    let productDetails = document.getElementsByClassName("details-button");
    productDetails = [].map.call(productDetails, function(item) {
      item.addEventListener("click", function() {
        const SIZE_FOR_PRODUCT_DETAILS_IN_COLUMN = 769;
        if (windowWidth() > SIZE_FOR_PRODUCT_DETAILS_IN_COLUMN) {
          toggleActiveTab();
          this.classList.add("details-button-active--row");
          let valuecontainer = document
            .getElementsByClassName(
              "product-details-value--row--" + this.innerHTML
            )[0]
            .classList.toggle("product-details-value--row--none");
        } else {
          this.classList.toggle("details-button-active--column");
          document
            .getElementsByClassName(
              "product-details-value--column--" + this.innerHTML
            )[0]
            .classList.toggle("product-details-value--column--none");
        }
      });
    });
  };

  const toggleActiveTab = function() {
    const productDetails = document.getElementsByClassName("product-details")[0]
      .children;
    for (i = 0; i < productDetails.length; i++) {
      productDetails[i].classList.remove("details-button-active--row");
    }
    const productValuerow = document.getElementsByClassName(
      "product-details-value"
    )[0].children;
    for (i = 0; i < productValuerow.length; i++) {
      productValuerow[i].classList.add("product-details-value--row--none");
    }
  };

  const windowWidth = function() {
    return document.getElementsByClassName("content-width")[0].offsetWidth;
  };
})();

const saveComment = function(position) {
  let commentText = document.getElementsByClassName(
    "product-details-comment-input--" + position
  )[0].value;
  productId = location.search.substr(1).split("_")[1];

  let time = new Date();

  time =
    time.getDate() +
    "/" +
    (time.getMonth() + 1) +
    "/" +
    time.getFullYear() +
    " " +
    time.getMinutes() +
    ":" +
    time.getHours();
  let coment = {};
  coment[productId] = [
    {
      name: logInfo[1],
      time: time,
      comment: commentText
    }
  ];
  // TODO: make a function sendComment(JSON.stringify(coment));
  location.reload();
};
