import {toggleMenu, fetchJSON, displayFeedback, displayProduct, updateValue} from "./functions.js";

// Hamburger Menu
const btnMenu = document.querySelector(".hamburger-menu");
btnMenu.addEventListener("click", toggleMenu);

// Quantité souhaitée du produit
document.querySelector('.number button:last-child').addEventListener('click', function() {
    updateValue(1);
});

document.querySelector('.number button:first-child').addEventListener('click', function() {
    updateValue(-1);
});

// Traitement des données de l'API
const URL = "https://my-json-server.typicode.com/Lugus-Shopify/hiring/product"
const data = await fetchJSON(URL);

displayProduct(data);

displayFeedback(data);