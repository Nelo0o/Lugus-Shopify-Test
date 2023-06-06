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

function averageCalc(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    const average = sum / array.length;
    const roundedAverage = average.toFixed(1);
    return Number(roundedAverage);
}

export function updateValue(increment) {
    const spanElement = document.querySelector('.number span');
    let currentValue = parseInt(spanElement.innerText);

    let newValue = currentValue + increment;

    if (newValue < 0) {
        newValue = 0;
    }

    spanElement.innerText = newValue;
}

function createParagraphElement(className, content) {
    const element = document.createElement("p");
    element.className = className;
    element.innerHTML = content;
    return element;
}

function createArticleElement(className) {
    const element = document.createElement("article");
    element.className = className;
    return element;
}

function createDivElement(className) {
    const element = document.createElement("div");
    element.className = className;
    return element;
}

function insertElementAfter(referenceElement, element) {
    referenceElement.insertAdjacentElement("afterend", element);
}

function appendElements(parent, elements) {
    elements.forEach((element) => parent.appendChild(element));
}

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

export function displayProduct(data) {
    const { title, price, description, variants } = data;
    const modifiedTitle = title.replace(/\s+/g, ' ');

    const imgContainer = document.querySelector(".product__img");
    const image = new Image();
    const variantImages = variants.map(variant => variant.image);

    image.onload = function() {
        imgContainer.style.backgroundImage = `url("${image.src}")`;
        imgContainer.style.backgroundSize = 'contain';
        imgContainer.style.backgroundPosition = 'center';
        imgContainer.style.backgroundRepeat = 'no-repeat';
    };

    image.src = variantImages[0];

    document.querySelector("h1").innerText = modifiedTitle;
    document.querySelector(".price").innerText = `${price} €`;
    document.querySelector(".desc").innerText = description;
}

