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