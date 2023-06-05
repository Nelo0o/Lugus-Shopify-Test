const btnMenu = document.querySelector(".hamburger-menu");
const menu = document.querySelector(".container-nav");
const ul = document.querySelector(".links-list");
const page = document.documentElement;

btnMenu.addEventListener("click", () => {
    btnMenu.classList.toggle("change");
    menu.classList.toggle("display-menu");
    page.classList.toggle("no-scroll");

    ul.style.visibility = ul.style.visibility === "visible" ? "hidden" : "visible";
});
