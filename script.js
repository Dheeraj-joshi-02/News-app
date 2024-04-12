const API_KEY = "b602cc3608524d328be96f10016b7e80";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("World"));

async function fetchNews(query) {
  const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await response.json();
  bindData(data.articles);
}

function bindData(articles) {
  const cardContainer = document.querySelector("#card__container");
  const newsCard = document.querySelector("#template__news_card");
  cardContainer.innerHTML = "";

  articles.map((article) => {
    if (!article.urlToImage) return;

    const cardClone = newsCard.content.cloneNode(true);
    cardClone.querySelector(".news__title").textContent = article.title;
    cardClone.querySelector(".news__description").textContent = article.description;
    cardClone.querySelector(".news__image").src = article.urlToImage;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    });
    cardClone.querySelector("#news__date").textContent = date;

    cardClone.firstElementChild.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });

    cardContainer.appendChild(cardClone);
  });
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}
