//console.log(window);
//console.log("Unsplash?");
const ACCESS_KEY = "D0EBFVapSGQd-6ycbZ_Ordq6Th5M7F7P3zxKyOBwB_U";
let page = 1;
let latestQuery = "";

//DOM referenser
const formEl = document.getElementById("search-form");
const inputEl = document.getElementById("search-input");
const imageContainerEl =document.getElementById("image-container");
const imageCountEl = document.getElementById("results-count");
const nextPageBtn = document.getElementById("next-page-button");
const prevPageBtn = document.getElementById("prev-page-button");
const pageCountEl =document.getElementById("page-count");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("submit clicked");

    const query = inputEl.value.trim();
    const imageCount = imageCountEl.value || 12;
    console.log(query,imageCount);

    if (query) {
        fetchImages(query, imageCount);
        // spara undan query ifall vi ska använda senaste sökningen med next/prev-knapparna
        latestQuery = query;
        inputEl.value = "";
    }
});

async function fetchImages(query, imageCount) {
    const endpoint = `https://api.unsplash.com/search/collections?page=${page}&query=${query}&client_id=${ACCESS_KEY}&per_page=${imageCount}`;
   
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        displayImages(data.results);
    } catch (error) {
        console.error(error);
    }
};

function displayImages(images) {
    // rendera ut bilderna till UI:t
    console.log(images);
    // töm tidigare innehåll
    imageContainerEl.innerHTML = "";
    // fyller vi på med nya bilder
    images.forEach(image => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('image-item');
        imgDiv.innerHTML = `
            <a href="${image.links.html}" target="_blank">
                <img src="${image.cover_photo.urls.small}" alt="${image.cover_photo.alt_description}">
            </a>
        `;
        imageContainerEl.appendChild(imgDiv);
        });
};

// funktionalitet för sidobläddring
nextPageBtn.addEventListener("click", () => {
    // öka page med 1
    page++;
    // kalla på API:et igen med det uppdaterade sidnumret
    // måste kolla så att inte resultatantalet hunnit ändrats med
    const imageCount = imageCountEl.value || 12;
    // ta med senaste queryn som är lagrad i latestQuery i samband med senaste hämtningen
    fetchImages(latestQuery, imageCount);
    pageCountEl.innerHTML = `Sida ${page}`;
});

prevPageBtn.addEventListener("click", () => {
    // vi kan ju inte gå tillbaka en sida om det blir sida 0
    if (page > 1) {
        page--;
        // kalla på API:et igen med det uppdaterade sidnumret
        // måste kolla så att inte resultatantalet hunnit ändrats med
        const imageCount = imageCountEl.value || 12;
        // ta med senaste queryn som är lagrad i latestQuery i samband med senaste hämtningen
        fetchImages(latestQuery, imageCount);
        pageCountEl.innerHTML = `Sida ${page}`;
    } else {
        console.log('kan inte backa mer');
    }
});