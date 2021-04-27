/************************************************DESCRIPTION*************************************************
*************************************************************************************************************
Le fichier index.js est destiné à gérer les actions sur la page d'accueil du site*/

/*********************************APPEL DE LA FONCTION D'AFFICHAGE DE LA GALERIE*****************************
************************************************************************************************************/
displayProductsGallery();

/*****************************************AFFICHAGE DE LA GALERIE********************************************
************************************************************************************************************/
//Fonction asynchrone pour récupérer au préalable les informations depuis le serveur
async function displayProductsGallery() {
    const products = await getProducts(); //Appel de la fonction 'getProducts'
    createProductsGallery(); //Puis appel de la fonction créant la galerie
    for (product of products) {//Boucle de création d'une card et intégration à la galerie pour chaque produit
        createProductCard(product);
    }
}

/******************************************CREATION DE LA GALERIE********************************************
************************************************************************************************************/
/*-------Fonction de création de la galerie et intégration dans la balise HTML d'id "productSection"-------*/
function createProductsGallery() {
    const productsSection = document.getElementById('productSection'); //Ciblage l'élément parent
    const productsGallery = document.createElement('div'); //Création d'une div pour la galerie...
    productsGallery.id = 'productsGallery';
    productsGallery.classList.add('gallery');
    productsSection.appendChild(productsGallery); //...intégrée dans l'élément parent
}
/*-----------------Fonction de création d'une card de produit et d'intégration à la galerie----------------*/
function createProductCard() {
    // Ciblage de l'élément parent
    const productsGallery = document.getElementById('productsGallery');
    //Création des éléments nécessaires (balises HTML) et de leur contenu (classes CSS, texte...)
    //Container de la card
    const galleryCard = document.createElement('article');
    galleryCard.classList.add('card', 'galleryCard');
    //Lien vers la page du produit
    const productLink = document.createElement('a');
    productLink.href = './product.html?id=' + product._id;
    //Image du produit
    const pictureContainer = document.createElement('div');
    pictureContainer.classList.add('pictureContainer');
    const productPicture = document.createElement('img');
    productPicture.classList.add('productPicture');
    productPicture.src = product.imageUrl;
    productPicture.alt = 'Photographie du produit';
    //Texte de la card avec titre et prix
    const galleryCardText = document.createElement('div');
    galleryCardText.classList.add('galleryCardText');
    ///Titre
    const productCardTitle = document.createElement('h3');
    productCardTitle.classList.add('productCardTitle');
    productCardTitle.textContent = product.name;
    ///Prix
    const productPrice = document.createElement('span');
    productPrice.classList.add('productPrice');
    productPrice.textContent = product.price / 100 + ",00 €";
    //Imbrication des éléments les uns dans les autres pour créer la card
    productsGallery.appendChild(galleryCard);
    galleryCard.appendChild(productLink);
    productLink.appendChild(pictureContainer);
    pictureContainer.appendChild(productPicture);
    productLink.appendChild(galleryCardText);
    galleryCardText.appendChild(productCardTitle);
    galleryCardText.appendChild(productPrice);
}

/****************************RECUPERATION DES DONNEES DES PRODUITS DEPUIS LE SERVEUR*************************
************************************************************************************************************/
//Fonction permettant d'interroger le serveur via une requête GET réalisée avec l'API fetch
function getProducts() {//Cette fonction va retourner le résultat de la requête
    return fetch(`http://localhost:3000/api/teddies`) //Adresse du serveur passée en paramètre de la requête
    .then(function(response) {//Récupération de la réponse sous forme d'objet JSON
        return response.json();
    })
    .then(function(products) {//Récupération des données
        return products;
    })
    .catch(function(error) {//En cas d'erreur, affichage dans la console
        console.log(error);
    });
}