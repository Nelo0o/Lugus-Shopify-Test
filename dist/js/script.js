import {toggleMenu, fetchJSON, displayFeedback, displayProduct, updateValue} from "./functions.js";

// Hamburger Menu
const btnMenu = document.querySelector(".hamburger-menu");
btnMenu.addEventListener("click", toggleMenu);

// Fonction qui permet d'incrémenter et de décrémenter la valeur
document.querySelector('.number button:last-child').addEventListener('click', function() {
    updateValue(1);
});

document.querySelector('.number button:first-child').addEventListener('click', function() {
    updateValue(-1);
});

// Traitement des données renvoyé par l'API
const URL = "https://my-json-server.typicode.com/Lugus-Shopify/hiring/product"
const data = await fetchJSON(URL);
console.log(data);

// Fonction qui permet d'afficher le, les produits
displayProduct(data);

// Fonction qui permet d'afficher les FeedBack
displayFeedback(data);