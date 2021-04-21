//Le fichier product.js est destiné à gérer les actions sur la page d'un produit

//On appelle la fonction permettant la création et l'affichage de la fiche du produit
createProductSheet();

async function createProductSheet() {/*Cette fonction est asynchrone pour au préalable récupérer les
    informations sur le produit depuis le serveur via la fonction 'getProductData' passée en constante et
    dont on attend la réponse*/
    const productData = await getProductData();

    const productSheet = document.getElementById('productSheet') //On cible l'élément dans lequel on va intégrer la card
    
    /*On crée successivement les éléments nécessaires à la constitution d'une card, auxquels on ajoute les classes CSS souhaitées
    (.classList.add) et le contenu en faisant aux propriétés disponibles pour l'objet récupéré du serveur et/ou la balise utilisée*/
    //La card
    const productSheetCard = document.createElement('article');
    productSheetCard.classList.add('card', 'productSheetCard');

    //L'image du produit
    const productSheetPicture = document.createElement('div');

    const productSheetImg = document.createElement('img');
    productSheetImg.src = productData.imageUrl;
    productSheetImg.classList.add('productSheetPicture');

    //La zone de description contenant le prix, le texte descriptif et la personnalisation
    const productDescriptionContainer = document.createElement('div');
    productDescriptionContainer.classList.add('productDescriptionContainer');

    const productPrice = document.createElement('span');
    productPrice.classList.add('productPrice', 'productDescriptionPrice');
    productPrice.textContent = productData.price / 100 + ",00 €";

    const productDescription = document.createElement('div');
    productDescription.classList.add('productDescription');

    const productDescriptionTitle = document.createElement('h3');
    productDescriptionTitle.classList.add('productCardTitle');
    productDescriptionTitle.textContent = productData.name;

    const productDescriptionText = document.createElement('p');
    productDescriptionText.classList.add('productDescriptionText');
    productDescriptionText.textContent = productData.description;

    const productCustomization = document.createElement('div');

    const productCustomizationTitle = document.createElement('h3');
    productCustomizationTitle.classList.add('productCardTitle');
    productCustomizationTitle.textContent = 'Personnalisez votre produit';

    ///Le menu déroulant de personnalisation du produit
    const customizationForm = document.createElement('form');
    customizationForm.classList.add('customizationForm');
    const customizationFormLabel = document.createElement('label');
    customizationFormLabel.textContent = 'Choisissez votre couleur : ';
    customizationFormLabel.setAttribute('for', "productColor");
    customizationFormLabel.classList.add('customizationFormLabel');
    customizationForm.appendChild(customizationFormLabel);
    const customizationFormSelect = document.createElement('select');
    customizationFormSelect.name = 'color';
    customizationFormSelect.id = 'productColor';
    customizationForm.appendChild(customizationFormSelect);
    const customizationOption = productData.colors;
    for (let i = 0; i < customizationOption.length; i++) {/*Utilisation d'une boucle for pour créer les différentes
        options du menu déroulant*/
        const element = customizationOption[i];
        const optionValue = document.createElement('option');
        optionValue.value = element;
        optionValue.textContent = element;
        customizationFormSelect.appendChild(optionValue);
    }

    /*On intègre les éléments les uns dans les autres afin de créer la card, elle-même intégrée à la galerie*/
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
}

/*Ciblage du bouton d'ajout au panier et écoute de l'évènement 'click' suite auquel se déclenche la fonction
'addToCart' d'ajout au panier*/
const addCartButton = document.getElementById('addCartButton');
addCartButton.addEventListener('click', addToCart);

//Fonction d'ajout du produit au panier
async function addToCart() {/*Cette fonction est asynchrone pour au préalable récupérer les
    informations sur le produit depuis le serveur via la fonction 'getProductData' passée en constante et
    dont on attend la réponse*/
    const productData = await getProductData();
    const colorSelector = document.getElementById('productColor'); //On cible le selecteur de couleur
    const selectedColor = colorSelector.options[colorSelector.selectedIndex].value; //On récupère la couleur sélectionnée
    const customizedProduct = {//On construit l'objet envoyé au panier
        id : productData._id,
        name : productData.name,
        color : selectedColor,
        price : productData.price / 100,
        picture : productData.imageUrl
    }
    const cart = createCart(); //Création du panier par appel de la fonction 'createCart'
    cart.push(customizedProduct); //Ajout du produit sélectionné dans 'cart'
    saveCart(cart); //Sauvegarde du panier
    alert('Votre produit a été ajouté au panier !'); //Fenêtre de confirmation
}

//Fonction de création du panier
function createCart() {
    let cart = localStorage.getItem('selectedProduct'); //Création d'une variable allant chercher le contenu de la clé 'selectedProduct' du localStorage
    if(cart != null) {//S'il n'est pas vide on récupère le contenu
        return JSON.parse(cart);
    } else {//Sinon on créé une array vide (qui va recevoir le produit)
        return [];
    }
}

//Fonction de sauvegarde dans la clé 'selectedProduct' du localStorage pour permettre la récupération ultérieure
function saveCart(customizedProduct) {
    localStorage.setItem('selectedProduct', JSON.stringify(customizedProduct));
}

//Fonction permettant d'interroger le serveur via une requête GET réalisée à l'aide de l'API fetch
function getProductData() {//Cette fonction va retourner le résultat de la requête
    /*On crée au préalable une constante qui va contenir l'id du produit concerné*/
    const productId = new URLSearchParams(window.location.search).get('id');

    return fetch(`http://localhost:3000/api/teddies/${productId}`) /*Adresse du serveur passée en paramètre
    de la requête et ciblant le produit*/
        .then(function(response) {//On récupère la réponse sous forme d'objet JSON
        return response.json();
        })
        .then(function(productData) {//Puis on récupère les données
        return productData;
        })
        .catch(function(error) {//En cas d'erreur elle est affichée dans la console
        console.log(error);
    });
}