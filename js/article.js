let articleArrObj;

(function () {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      articleArrObj = JSON.parse(xhr.response);
      makeArticle();
    }
  };
  xhr.open("GET", "../jsons/articles.json", true);
  xhr.send();
})();

function makeArticle() {
  let searchableIDOfObject = +window.location.search.slice(1);
  if (
    searchableIDOfObject > articleArrObj.articles.length ||
    isNaN(searchableIDOfObject)
  ) {
    searchableIDOfObject = 0;
  }
  const articleObj = articleArrObj.articles.filter(function (item) {
    return item.id === searchableIDOfObject;
  });

  const articleContent = document.querySelector(".article-content");
  const image = document.createElement("img");
  image.setAttribute("src", articleObj[0].image);
  image.setAttribute("alt", articleObj[0].title);
  image.setAttribute("class", "article-content-image");
  const title = document.createElement("p");
  title.setAttribute("class", "article-content-title");
  title.innerText = articleObj[0].title;
  const text = document.createElement("p");
  text.setAttribute("class", "article-content-text");
  text.innerText = articleObj[0].text;
  articleContent.appendChild(image);
  articleContent.appendChild(title);
  articleContent.appendChild(text);
  breadcrumbs = [{
      name: "blog",
      link: "blog.html"
    },
    {
      name: articleObj[0].categorie,
      link: "blog.html?" + articleObj[0].categorie
    }
  ];
  addPointToBreadcrumbMap(breadcrumbs);
}