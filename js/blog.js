"use strict";
(function ajaxGetJson() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      window.arrayOfAllArticles = JSON.parse(xhr.response).articles;
      window.serchLine = window.location.search.slice(1).replace(/%20/g, " ");
      window.indexOfStartArticles = 1;
      if (serchLine.indexOf("=") !== -1) {
        const serchLineIndex = serchLine.slice(serchLine.indexOf("="));
        serchLine = serchLine.replace(serchLineIndex, "");
        indexOfStartArticles = +serchLineIndex.slice(1);
      }
      if (serchLine) {
        arrayOfAllArticles = JSON.parse(xhr.response).articles.filter(function (
          item
        ) {
          return item.categorie === serchLine;
        });
      }
      changeBreadCrumbs()
      createLinksOfPages();
      createContent(arrayOfAllArticles, indexOfStartArticles);
    }
  };
  xhr.open("GET", "../jsons/articles.json", true);
  xhr.send();
})();

function changeBreadCrumbs() {
  breadcrumbs = [{
    name: "blog",
    link: "blog.html"
  }];
  if (serchLine) {
    breadcrumbs.push({
      name: serchLine,
      link: "blog.html?" + serchLine
    })
  }
  addPointToBreadcrumbMap(breadcrumbs);
}

function createLinksOfPages() {
  const pagesOfContent = document.querySelector(".blog-pages");
  let sumOfPages = Math.ceil(arrayOfAllArticles.length / 8);
  if (indexOfStartArticles > 1) {
    const prevPage = document.createElement("a");
    prevPage.setAttribute(
      "href",
      "blog.html?" + serchLine + "=" + (indexOfStartArticles - 1)
    );
    prevPage.setAttribute(
      "class",
      "blog-pages-links blog-pages-links--prevButton"
    );
    prevPage.innerText = "‹ prev page";
    pagesOfContent.appendChild(prevPage);
  }
  if (arrayOfAllArticles.length <= 8) {
    return;
  }
  for (let indexOfPage = 1; indexOfPage <= sumOfPages; indexOfPage++) {
    const pageIndex = document.createElement("a");
    pageIndex.setAttribute(
      "href",
      "blog.html?" + serchLine + "=" + indexOfPage
    );
    pageIndex.setAttribute(
      "class",
      "blog-pages-links blog-pages-links--numbers"
    );
    pageIndex.innerText = indexOfPage;
    pagesOfContent.appendChild(pageIndex);
  }
  const nextPage = document.createElement("a");
  nextPage.setAttribute(
    "href",
    "blog.html?" + serchLine + "=" + (indexOfStartArticles + 1)
  );
  nextPage.setAttribute(
    "class",
    "blog-pages-links blog-pages-links--nextButton"
  );
  nextPage.innerText = "next page ›";
  pagesOfContent.appendChild(nextPage);
  const activePages = document.querySelectorAll(".blog-pages-links--numbers");
  if (activePages.length === indexOfStartArticles) {
    nextPage.parentNode.removeChild(nextPage);
  }
  activePages[indexOfStartArticles - 1].classList.add(
    "blog-pages-links--active"
  );
}

function createContent(arrayOfArticles, num) {
  let numOfPage = 0;
  if (num > 1) {
    for (let i = 1; i < num; i++) {
      numOfPage += 8;
    }
  }
  let arr = arrayOfArticles.slice(numOfPage, numOfPage + 8);
  if (numOfPage + 8 > arrayOfArticles.length) {
    arr = arrayOfArticles.slice(numOfPage, arrayOfArticles.length);
  }
  for (let i = 0; i < arr.length; i++) {
    createArticle(arr[i]);
  }
}

function createArticle(articleObj) {
  const blogContent = document.querySelector(".blog-content");
  const article = document.createElement("div");
  article.setAttribute("class", "blog-content-article");
  const imgLink = document.createElement("div");
  imgLink.setAttribute("class", "blog-content-article-img-wrapper");
  const link = document.createElement("a");
  link.setAttribute("class", "blog-content-article-img");
  link.setAttribute("href", "article.html?" + articleObj.id);
  link.setAttribute("style", "background-image: url(" + articleObj.image + ")");
  link.setAttribute("alt", articleObj.title);
  imgLink.appendChild(link);
  const text = document.createElement("div");
  text.setAttribute("class", "blog-content-article-text");
  const title = document.createElement("a");
  title.setAttribute("href", "article.html?" + articleObj.id);
  title.setAttribute("class", "blog-content-article-text-title");
  title.innerText = articleObj.title;
  const date = document.createElement("div");
  date.setAttribute("class", "blog-content-article-text-date");
  date.innerText = articleObj.date;
  const description = document.createElement("div");
  description.setAttribute("class", "blog-content-article-text-description");
  description.innerText = articleObj.text.slice(0, 200) + "   ...";
  const textLink = document.createElement("a");
  textLink.setAttribute("class", "blog-content-article-text-link");
  textLink.setAttribute("href", "article.html?" + articleObj.id);
  textLink.innerText = "more";
  text.appendChild(title);
  text.appendChild(date);
  text.appendChild(description);
  text.appendChild(textLink);
  article.appendChild(imgLink);
  article.appendChild(text);
  blogContent.appendChild(article);
  // document.querySelector("h1").innerText = articleObj.categorie;
  // document.querySelector(".nav-links-categorie").innerHTML =
  //   ' » <a href="blog.html?' +
  //   articleObj.categorie +
  //   '" class="nav-links">' +
  //   articleObj.categorie +
  //   "</a>";
}