let arrayOfSliderProd;

(function ajaxGetJson() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      arrayOfSliderProd = JSON.parse(xhr.response);
      createSlider();
      changSlide();
    }
  };
  xhr.open("GET", "./jsons/slider.json", true);
  xhr.send();
})();

function createSlider() {
  const slideProdArr = arrayOfSliderProd.length - 1;
  window.slider = document.querySelector(".slider-content-wrapper");
  slider.appendChild(
    generateSlide(
      "slider-content--left",
      slideProdArr,
      arrayOfSliderProd[slideProdArr]
    )
  );
  slider.appendChild(
    generateSlide("slider-content--current", 0, arrayOfSliderProd[0])
  );
  slider.appendChild(
    generateSlide("slider-content--right", 1, arrayOfSliderProd[1])
  );
}

let changSlideinterval = setInterval(changSlide, 6000);

function changSlide(direction) {
  clearInterval(changSlideinterval);
  changSlideinterval = setInterval(changSlide, 6000);
  const leftImg = document.querySelector(".slider-content--left");
  const curentImg = document.querySelector(".slider-content--current");
  const rightImg = document.querySelector(".slider-content--right");
  if (direction === "left") {
    leftImg.parentNode.removeChild(leftImg);
    curentImg.classList.add("slider-content--left");
    curentImg.classList.remove("slider-content--current");
    rightImg.classList.add("slider-content--current");
    rightImg.classList.remove("slider-content--right");
    slider.appendChild(
      generateSlide(
        "slider-content--right",
        getNextIndex(rightImg, "right"),
        arrayOfSliderProd[getNextIndex(rightImg, "right")]
      )
    );
  } else {
    rightImg.parentNode.removeChild(rightImg);
    curentImg.classList.add("slider-content--right");
    curentImg.classList.remove("slider-content--current");
    leftImg.classList.add("slider-content--current");
    leftImg.classList.remove("slider-content--left");
    slider.appendChild(
      generateSlide(
        "slider-content--left",
        getNextIndex(leftImg, "left"),
        arrayOfSliderProd[getNextIndex(leftImg, "left")]
      )
    );
  }
  textMoveIn("hide");
  setTimeout(textMoveIn, 400);
}

function getNextIndex(el, direction) {
  const currentIndex = +el.getAttribute("data-index");
  if (direction === "right") {
    if (arrayOfSliderProd[currentIndex + 1]) {
      return currentIndex + 1;
    } else {
      return 0;
    }
  }
  if (arrayOfSliderProd[currentIndex - 1]) {
    return currentIndex - 1;
  } else {
    return arrayOfSliderProd.length - 1;
  }
}

function generateSlide(slidePositionClass, currentSlideIndex, slideDataObj) {
  const slideContent = document.createElement("div");
  slideContent.setAttribute("class", "slider-content");
  slideContent.setAttribute("data-index", currentSlideIndex);
  slideContent.setAttribute(
    "style",
    "background-image:url(" + slideDataObj.imgSrc + ")"
  );
  slideContent.classList.add(slidePositionClass);
  slideContent.classList.add(slideDataObj.position);
  const sliderText = document.createElement("div");
  sliderText.setAttribute("class", "slider-content-text");
  const titleText = document.createElement("p");
  titleText.setAttribute("class", "slider-content-text-title");
  titleText.innerText = slideDataObj.title;
  const subTitleText = document.createElement("p");
  subTitleText.setAttribute("class", "slider-content-text-subtitle");
  subTitleText.innerText = slideDataObj.subtitle;
  const descriptionText = document.createElement("p");
  descriptionText.setAttribute("class", "slider-content-text-description");
  descriptionText.innerText = slideDataObj.description;
  const linkText = document.createElement("a");
  linkText.setAttribute("href", slideDataObj.buttonUrl);
  linkText.setAttribute("target", "_blank");
  linkText.setAttribute("class", "slider-content-text-link");
  linkText.classList.add(slideDataObj.buttonColor);
  linkText.innerText = "TRY IT";
  sliderText.appendChild(titleText);
  sliderText.appendChild(subTitleText);
  sliderText.appendChild(descriptionText);
  sliderText.appendChild(linkText);
  slideContent.appendChild(sliderText);
  return slideContent;
}

function textMoveIn(behavior) {
  let timeoutValue = 50;
  const text = document.querySelector(
    ".slider-content--current .slider-content-text"
  ).childNodes;
  if (behavior === "hide") {
    text[0].classList.remove("slider-content-text--visible");
    text[1].classList.remove("slider-content-text--visible");
    text[2].classList.remove("slider-content-text--visible");
    text[3].classList.remove("slider-content-text--visible");
  } else {
    setTimeout(function () {
      text[3].classList.add("slider-content-text--visible");
    }, 50);
    setTimeout(function () {
      text[2].classList.add("slider-content-text--visible");
    }, 100);
    setTimeout(function () {
      text[1].classList.add("slider-content-text--visible");
    }, 150);
    setTimeout(function () {
      text[0].classList.add("slider-content-text--visible");
    }, 200);
  }
}