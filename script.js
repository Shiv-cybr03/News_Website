const API_KEY = "8c9713365f7548f783c4f99415d175a3";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fetchNews("india"))

function reload(){
    window.location.reload();
}

async function fetchNews(qurey){
    const res = await fetch(`${url}${qurey}&apiKey=${API_KEY}`)
    let data  = await res.json()
    bindData(data.articles);
}
function bindData(articles){
    const cardsContainer = document.getElementById("cards-container")
    const newsCardTemplate = document.getElementById("template-news-card")

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article)
        cardsContainer.appendChild(cardClone)
    });
}
function fillDataInCard(cardClone,article){
    const newImg = cardClone.querySelector("#news-img")
    const newTitle = cardClone.querySelector("#news-title")
    const newSource = cardClone.querySelector("#news-source")
    const newDec = cardClone.querySelector("#news-desc")

    newImg.src = article.urlToImage
    newTitle.innerHTML = article.title;
    newDec.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newSource.innerHTML = `${article.source.name} . ${date}`

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url,"_blank")
    })
}
let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id)
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = newItem;
    curSelectedNav.classList.add("active");
}

const searchButtom = document.getElementById("search-button");
const searchText = document.getElementById("search-text")

searchButtom.addEventListener("click",()=>{
    const qurey = searchText.value;
    if(!qurey) return;
    fetchNews(qurey);
    curSelectedNav?.classList.remove("active")
    curSelectedNav = null;

})
