// Fonction qui permet de display le Menu Hamburger
export function toggleMenu() {
    const btnMenu = document.querySelector(".hamburger-menu");
    const menu = document.querySelector(".container-nav");
    const ul = document.querySelector(".links-list");
    const page = document.documentElement;

    btnMenu.classList.toggle("change");
    menu.classList.toggle("display-menu");
    page.classList.toggle("no-scroll");

    ul.style.visibility = ul.style.visibility === "visible" ? "hidden" : "visible";
}

// Fonction qui permet de récupérer les données d'une API pour pouvoir les utiliser
export async function fetchJSON(url, {headers = {}, json, signal, ...options} = {}) {
    const defaultHeaders = {Accept: "application/json", ...headers};
    const requestHeaders = json
        ? new Headers({...defaultHeaders, "Content-Type": "application/json"})
        : new Headers(defaultHeaders);
    const controller = new AbortController();
    const signalWithAbort = signal || controller.signal;

    try {
        const response = await fetch(url, {
            ...options,
            headers: requestHeaders,
            signal: signalWithAbort,
        });

        if (!response.ok) {
            throw new Error(`Erreur serveur. Cause: ${response}`);
        }

        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Le serveur a renvoyé une réponse non JSON.");
        }

        const data = await response.json();
        if (!data) {
            throw new Error("Le serveur a renvoyé une réponse vide.");
        }

        return data;
    } catch (error) {
        if (error.name === "AbortError") {
            throw new Error("La requête a été annulée.");
        }

        throw error;
    } finally {
        controller.abort();
    }
}

// Fonction qui permet de faire une moyenne des valeurs entières d'un tableau
function averageCalc(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    const average = sum / array.length;
    const roundedAverage = average.toFixed(1);
    return Number(roundedAverage);
}

// Fonction qui permet d'incrémenter, décrémenter le nombre de produits
export function updateValue(increment) {
    const spanElement = document.querySelector('.number span');
    let currentValue = parseInt(spanElement.innerText);

    let newValue = currentValue + increment;

    if (newValue < 0) {
        newValue = 0;
    }

    spanElement.innerText = newValue;
}

// Fonction qui permet de créer un paragraphe en lui passant en paramètres le nom d'une class et du contenu
function createParagraphElement(className, content) {
    const element = document.createElement("p");
    element.className = className;
    element.innerHTML = content;
    return element;
}

// Fonction qui permet de créer un article en lui passant en paramètres le nom d'une class
function createArticleElement(className) {
    const element = document.createElement("article");
    element.className = className;
    return element;
}

// Fonction qui permet de créer une div en lui passant en paramètres le nom d'une class
function createDivElement(className) {
    const element = document.createElement("div");
    element.className = className;
    return element;
}

// Fonction qui permet d'insérer un élément à la suite d'un élément de référence passé en paramètre
function insertElementAfter(referenceElement, element) {
    referenceElement.insertAdjacentElement("afterend", element);
}

// Fonction qui permet d'insérer un élément enfant dans un élément parent
function appendElements(parent, elements) {
    elements.forEach((element) => parent.appendChild(element));
}

// Fonction qui prend en paramètre les data d'un JSON par exemple pour ensuite les afficher dynamiquement
export function displayFeedback(data) {
    const containerFeedbackCards = document.querySelector(".container-feedback__cards");
    const h2Element = document.querySelector(".feedback-title");
    const reviews = data.reviews;

    const rateArray = reviews.map((review) => review.rate);
    const average = averageCalc(rateArray);
    const rateNumber = rateArray.length;

    const newOverallAverage = createParagraphElement("note", `${average}/5 <span class="feedback-nbr">(${rateNumber} avis)</span>`);
    insertElementAfter(h2Element, newOverallAverage);

    reviews.forEach((element) => {
        const newArticle = createArticleElement("container-feedback__cards--feedback-card");
        const newDiv = createDivElement("container-infos");
        const newText = createParagraphElement("text", element.comment);
        const newNote = createParagraphElement("note", `${element.rate}/5`);
        const newName = createParagraphElement("name", "John Doe");

        appendElements(newDiv, [newText, newNote]);
        appendElements(newArticle, [newDiv, newName]);
        containerFeedbackCards.appendChild(newArticle);
    });
}

// Fonction qui prend en paramètre les data d'un JSON par exemple pour ensuite les afficher dynamiquement et pouvoir interagir avec
export function displayProduct(data) {
    const {title, price, description, variants} = data;
    const modifiedTitle = title.replace(/\s+/g, ' ');

    const imgContainer = document.querySelector(".product__img");
    const newImg = document.createElement("img");

    const variantImages = variants.reduce((acc, variant) => {
        acc[variant.color + variant.size] = variant.image;
        return acc;
    }, {});

    const blue = document.querySelector(".container-btn-colors .primary");
    const yellow = document.querySelector(".container-btn-colors .secondary");
    const lSize = document.querySelector(".container-btn-size .primary");
    const mSize = document.querySelector(".container-btn-size .secondary");

    function updateImageAndVariant(color, size) {
        const imageKey = color + size;
        const variantID = getVariantID(variants, color, size);
        newImg.src = variantImages[imageKey];
        newImg.dataset.productId = variantID;
    }

    function handleColorClick(color) {
        if (color === "Blue") {
            blue.classList.add("primary");
            blue.classList.remove("secondary");
            yellow.classList.add("secondary");
            yellow.classList.remove("primary");
        } else if (color === "Yellow") {
            yellow.classList.add("primary");
            yellow.classList.remove("secondary");
            blue.classList.add("secondary");
            blue.classList.remove("primary");
        }

        const size = lSize.classList.contains("primary") ? "L" : "M";
        updateImageAndVariant(color, size);
    }

    function handleSizeClick(size) {
        if (size === "L") {
            lSize.classList.add("primary");
            lSize.classList.remove("secondary");
            mSize.classList.add("secondary");
            mSize.classList.remove("primary");
        } else if (size === "M") {
            mSize.classList.add("primary");
            mSize.classList.remove("secondary");
            lSize.classList.add("secondary");
            lSize.classList.remove("primary");
        }

        const color = blue.classList.contains("primary") ? "Blue" : "Yellow";
        updateImageAndVariant(color, size);
    }


    yellow.addEventListener("click", () => handleColorClick("Yellow"));
    blue.addEventListener("click", () => handleColorClick("Blue"));
    lSize.addEventListener("click", () => handleSizeClick("L"));
    mSize.addEventListener("click", () => handleSizeClick("M"));

    const initialColor = "Blue";
    const initialSize = "L";
    const initialImageKey = initialColor + initialSize;
    const initialVariantID = getVariantID(variants, initialColor, initialSize);
    newImg.src = variantImages[initialImageKey];
    newImg.dataset.productId = initialVariantID;

    blue.classList.add("primary");
    lSize.classList.add("primary");

    imgContainer.appendChild(newImg);

    document.querySelector("h1").innerText = modifiedTitle;
    document.querySelector(".price").innerText = `${price} €`;
    document.querySelector(".desc").innerText = description;
}


// Cette fonction permet de rechercher l'ID d'un variant spécifique dans un tableau en fonction de la taille et de la couleur fournies
function getVariantID(variants, color, size) {
    const variant = variants.find(variant => variant.color === color && variant.size === size);
    return variant ? variant.id : "";
}
