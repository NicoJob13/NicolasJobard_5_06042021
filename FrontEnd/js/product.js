/************************************************DESCRIPTION*************************************************
*************************************************************************************************************
Le fichier product.js est destiné à gérer les actions sur la page d'un produit*/

/********************************************APPEL DES FONCTIONS*********************************************
************************************************************************************************************/
createProductSheet();
addToCart();

/***************************************CREATION DE LA FICHE PRODUIT*****************************************
************************************************************************************************************/
/*----Fonction de création de la fiche produit, asynchrone pour récupérer au préalable les informations----*/
async function createProductSheet() {
    const productData = await getProductData(); //Appel de la fonction 'getProductData'
    const productSheet = document.getElementById('productSheet') //Ciblage de l'élément parent de la card
    //Création des éléments nécessaires (balises HTML) et de leur contenu (classes CSS, texte...)
    //Container de la card
    const productSheetCard = document.createElement('article');
    productSheetCard.classList.add('card', 'productSheetCard');
    //Image du produit
    const productSheetPicture = document.createElement('div');
    const productSheetImg = document.createElement('img');
    productSheetImg.src = productData.imageUrl;
    productSheetImg.alt = 'Photographie du produit';
    productSheetImg.classList.add('productSheetPicture');
    //Zone de description contenant le prix, le texte descriptif et la personnalisation
    const productDescriptionContainer = document.createElement('div');
    productDescriptionContainer.classList.add('productDescriptionContainer');
    ///Prix
    const productPrice = document.createElement('span');
    productPrice.classList.add('productPrice', 'productDescriptionPrice');
    productPrice.textContent = productData.price / 100 + ",00 €";
    ///Description (titre + texte)
    const productDescription = document.createElement('div');
    productDescription.classList.add('productDescription');
    const productDescriptionTitle = document.createElement('h3');
    productDescriptionTitle.classList.add('productCardTitle');
    productDescriptionTitle.textContent = productData.name;
    const productDescriptionText = document.createElement('p');
    productDescriptionText.classList.add('productDescriptionText');
    productDescriptionText.textContent = productData.description;
    ///Personnalisation avec menu déroulant
    const productCustomization = document.createElement('div');
    const productCustomizationTitle = document.createElement('h3');
    productCustomizationTitle.classList.add('productCardTitle');
    productCustomizationTitle.textContent = 'Personnalisez votre produit';
    const customizationForm = document.createElement('form');
    customizationForm.id = 'customizationForm';
    customizationForm.classList.add('customizationForm');
    const customizationFormLabel = document.createElement('label');
    customizationFormLabel.textContent = 'Choisissez votre couleur : ';
    customizationFormLabel.setAttribute('for', "productColor");
    customizationFormLabel.classList.add('customizationFormLabel');
    const customizationFormSelect = document.createElement('select');
    customizationFormSelect.name = 'color';
    customizationFormSelect.id = 'productColor';
    const customizationOption = productData.colors;
    for (let i = 0; i < customizationOption.length; i++) {//Boucle pour créer les options du menu déroulant
        const element = customizationOption[i];
        const optionValue = document.createElement('option');
        optionValue.value = element;
        optionValue.textContent = element;
        customizationFormSelect.appendChild(optionValue);
    }
    //Imbrication des éléments les uns dans les autres pour créer la card
    productSheet.appendChild(productSheetCard);
    productSheetCard.appendChild(productSheetPicture);
    productSheetPicture.appendChild(productSheetImg);
    productSheetCard.appendChild(productDescriptionContainer);
    productDescriptionContainer.appendChild(productPrice);
    productDescriptionContainer.appendChild(productDescription);
    productDescription.appendChild(productDescriptionTitle);
    productDescription.appendChild(productDescriptionText);
    productDescriptionContainer.appendChild(productCustomization);
    productCustomization.appendChild(productCustomizationTitle);
    productCustomization.appendChild(customizationForm);
    customizationForm.appendChild(customizationFormLabel);
    customizationForm.appendChild(customizationFormSelect);
}

/*********************************************L'AJOUT AU PANIER**********************************************
************************************************************************************************************/
/*-----------------------------Fonction d'ajout du produit au panier au clic------------------------------*/
function addToCart() {//Ciblage du bouton, écoute de l'évènement 'click' qui déclenche 'pushToCart'
    const addCartButton = document.getElementById('addCartButton');
    addCartButton.addEventListener('click', pushToCart);
}
/*------------------------Envoi de l'objet customizedProduct vers le localStorage--------------------------*/
//Fonction asynchrone pour récupérer au préalable l'objet 'customizedProduct' puis push
async function pushToCart() {
    const customizedProduct = await createCustomizedProduct(); //Appel de l'objet à envoyer au panier
    const cart = createCart(); //Création du panier par appel de la fonction 'createCart'
    cart.push(customizedProduct); //Ajout du produit sélectionné dans 'cart'
    saveCart(cart); //Sauvegarde du panier
    alert('Votre produit a été ajouté au panier !'); //Fenêtre de confirmation
}
//Fonction de création du panier selon le contenu de la clé 'selectedProduct' du localStorage
function createCart() {
    let cart = localStorage.getItem('selectedProduct'); //Variable récupérant le contenu de la clé
    if(cart != null) {//Si non vide, récupération du contenu
        return JSON.parse(cart);
    } else {//Sinon création d'une array vide (qui va recevoir le produit)
        return [];
    }
}
//Fonction de sauvegarde dans la clé 'selectedProduct' du localStorage pour permettre la récupération ultérieure
function saveCart(customizedProduct) {
    localStorage.setItem('selectedProduct', JSON.stringify(customizedProduct));
}
/*---------------------------------Création de l'objet customizedProduct-----------------------------------*/
//Création d'une classe contenant un constructor pour la création de l'objet à ajouter au panier
class CustomizedProduct {
    constructor(id, name, color, price, picture) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.price = price;
        this.picture = picture;
    }
}
//Fonction de création de l'objet du produit personnalisé
async function createCustomizedProduct() {
    const productData = await getProductData();
    const colorSelector = document.getElementById('productColor'); //Ciblage du selecteur de couleur
    const selectedColor = colorSelector.options[colorSelector.selectedIndex].value; //Récupération de la couleur sélectionnée
    const customizedProduct = new CustomizedProduct(productData._id, productData.name, selectedColor, productData.price / 100, productData.imageUrl);
    return customizedProduct;
}

/****************************RECUPERATION DES DONNEES DU PRODUIT DEPUIS LE SERVEUR***************************
************************************************************************************************************/
//Fonction permettant d'interroger le serveur sur le produit via une requête GET réalisée avec l'API fetch
function getProductData() {//Cette fonction va retourner le résultat de la requête
    const productId = new URLSearchParams(window.location.search).get('id');//Constante contenant l'id du produit
    return fetch(`http://localhost:3000/api/teddies/${productId}`) //Adresse ciblant le produit en paramètre
        .then(function(response) {//Récupération de la réponse sous forme d'objet JSON
        return response.json();
        })
        .then(function(productData) {//Récupération des données
        return productData;
        })
        .catch(function(error) {//En cas d'erreur affichage dans la console
        console.log(error);
    });
}