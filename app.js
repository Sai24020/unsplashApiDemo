console.log("Unsplash?");
const ACCESS_KEY = "D0EBFVapSGQd-6ycbZ_Ordq6Th5M7F7P3zxKyOBwB_U";

const formEl = document.getElementById("search-form");
const inputEl = document.getElementById("search-input");
const imageContainerEl =document.getElementById("image-container");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("submit clicked");

    const query = inputEl.value;
    console.log(query);
});

async function fetchImages(query) {
    const endpoint = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${accessKey}`
      );
      try {
       const res = await fetch
      }
      const data = await res.json();
    console.log(data);
  }