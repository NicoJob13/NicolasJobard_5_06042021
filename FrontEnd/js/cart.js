/************************************************DESCRIPTION*************************************************
*************************************************************************************************************
Le fichier cart.js est destiné à gérer les actions sur la page du panier*/

/********************************************APPEL DES FONCTIONS*********************************************
************************************************************************************************************/
displayCartContent();
activateValidation();
submitOrder();

/**************************************AFFICHAGE DU CONTENU DU PANIER****************************************
************************************************************************************************************/
/*-------------------Fonction affichant le panier s'il y a des produits sinon un message-------------------*/
function displayCartContent() {
    const cartContent = lookForCartContent(); //Récupération du contenu du localStorage
    const tableContainer = document.getElementById('tableContainer'); //Ciblage de l'élément container
    if(cartContent != null) {//Si la clé 'selectedProduct du localStorage n'est pas vide :
        createTable(); //La structure générale du tableau
        createTableContent(); //Le contenu du tableau
        createTableBottom(); //Zone sous le tableau avec total et vidage panier
    } else {//Si elle est vide
        emptyCartMessage(); //Affichage d'un message
    }
}
/*-----------------------------Fonction créant la structure globale du tableau----------------------------*/
function createTable() {
    //La structure de tableau
    const cartTable = document.createElement('table');
    cartTable.id = 'table';
    cartTable.classList.add('cartTable');
    //Ligne de cellules des titres de colonne
    const cartTableHeader = document.createElement('tr'); 
    //Cellules des titres de colonne
    const cartTableHeaderProductCell = document.createElement('th');
    cartTableHeaderProductCell.classList.add('cartTableCell');
    cartTableHeaderProductCell.textContent = 'Produit';
    const cartTableHeaderColorCell = document.createElement('th');
    cartTableHeaderColorCell.classList.add('cartTableCell');
    cartTableHeaderColorCell.textContent = 'Couleur';
    const cartTableHeaderPriceCell = document.createElement('th');
    cartTableHeaderPriceCell.classList.add('cartTableCell');
    cartTableHeaderPriceCell.textContent = 'Prix';
    //Intégrations dans le container du tableau
    tableContainer.appendChild(cartTable);
    cartTable.appendChild(cartTableHeader);
    cartTableHeader.appendChild(cartTableHeaderProductCell);
    cartTableHeader.appendChild(cartTableHeaderColorCell);
    cartTableHeader.appendChild(cartTableHeaderPriceCell);
}
/*--------------Fonction créant le contenu du tableau en fonction du contenu du localStorage--------------*/
function createTableContent() {
    const cartContent = lookForCartContent(); //Récupération du contenu du localStorage
    const cartTable = document.getElementById('table'); //Ciblage de l'élément parent
    for (let i = 0; i < cartContent.length; i++) {//Boucle pour créer une ligne pour chaque entrée trouvée
        const element = cartContent[i];
        //Ligne de cellules
        const cartTableContent = document.createElement('tr');
        //Cellule 'Produit'
        const cartTableContentProductCell = document.createElement('td');
        cartTableContentProductCell.classList.add('cartTableCell', 'cartTableProductCell');
        const cartTableContentProductCellPicture = document.createElement('img');
        cartTableContentProductCellPicture.classList.add('cartTableContentProductCellPicture');
        cartTableContentProductCellPicture.src = element.picture;
        const cartTableContentProductCellName = document.createElement('span');
        cartTableContentProductCellName.classList.add('cartTableContentProductCellName');
        cartTableContentProductCellName.textContent = element.name;
        //Cellule 'Couleur'
        const cartTableContentColorCell = document.createElement('td');
        cartTableContentColorCell.classList.add('cartTableCell');
        cartTableContentColorCell.textContent = element.color;
        //Cellule 'Prix'
        const cartTableContentPriceCell = document.createElement('td');
        cartTableContentPriceCell.classList.add('cartTableCell');
        cartTableContentPriceCell.textContent = element.price + ",00 €";
        //Intégration dans le container du tableau
        cartTable.appendChild(cartTableContent);
        cartTableContent.appendChild(cartTableContentProductCell);
        cartTableContentProductCell.appendChild(cartTableContentProductCellPicture);
        cartTableContentProductCell.appendChild(cartTableContentProductCellName);
        cartTableContent.appendChild(cartTableContentColorCell);
        cartTableContent.appendChild(cartTableContentPriceCell);
    }
}
/*-------------Fonction créant une zone avec le montant total du panier et un bouton de vidage-------------*/
function createTableBottom() {
    const cartContent = lookForCartContent(); //Récupération du contenu du localStorage
    const tableBottom = document.createElement('div'); //Création d'un container
    tableBottom.classList.add('tableBottom');
    //Montant total
    const totalPriceContainer = document.createElement('div');
    totalPriceContainer.classList.add('totalPrice');
    const totalPriceTitle = document.createElement('span');
    totalPriceTitle.textContent = 'Montant total de votre commande : ';
    const totalPriceContent = document.createElement('span');
    totalPriceContent.id = 'totalPrice';
    let totalPrice = 0;
    for (let j = 0; j < cartContent.length; j++) {//Calcul par ajout du montant trouvé à chaque itération
        let productPrice = cartContent[j].price;
        totalPrice = totalPrice + productPrice;
    }
    totalPriceContent.textContent = totalPrice + ",00 €";
    //Bouton de vidage du panier
    const clearCartButton = document.createElement('button'); //Bouton et son contenu
    clearCartButton.classList.add('button', 'clearCartButton');
    clearCartButton.id = 'clearCartButton';
    clearCartButton.textContent = 'Vider mon panier';
    clearCartButton.addEventListener('click', clearCart); //Vidage du panier au clic sur le bouton
    //Imbrication des divers éléments et intégration dans le container du tableau
    tableContainer.appendChild(tableBottom);
    tableBottom.appendChild(totalPriceContainer);
    totalPriceContainer.appendChild(totalPriceTitle);
    totalPriceContainer.appendChild(totalPriceContent);
    tableBottom.appendChild(clearCartButton);
}
/*----------------------Fonction de vidage du localStorage pour vider le panier----------------------------*/
function clearCart() {
    if(confirm('Confirmez-vous la suppression de votre panier ?')) {
        localStorage.clear(); //Commande de vidage
        location.reload(); //Rechargement de la page
    }
}
/*----------------------Fonction d'affichage d'un message si le panier est vide----------------------------*/
function emptyCartMessage() {
    const emptyCart = document.createElement('p'); //Création d'un paragraphe
    emptyCart.classList.add('emptyCart');
    emptyCart.textContent = 'Votre panier est vide, il faut vite y remédier !';
    tableContainer.appendChild(emptyCart); //Intégration dans l'élément parent
}

/**********************************GESTION DU STATUT DU BOUTON DE COMMANDE***********************************
************************************************************************************************************/
/*-----------------------Fonction d'activation du bouton selon le contenu du panier------------------------*/
function activateValidation() {
    const cartContent = lookForCartContent();
    const validationButton = document.getElementById('purchaseValidation'); //Ciblage du bouton
    validationButton.disabled = true; //Désactivation par défaut
    if(cartContent != null) {//Si la clé du localStorage n'est pas vide on active le bouton
        validationButton.disabled = false;
    }
}

/*****************************************SOUMISSION DE LA COMMANDE******************************************
************************************************************************************************************/
/*-------------------------------Fonction d'envoi de la commande au serveur--------------------------------*/
function submitOrder() {
    const orderForm = document.getElementById('orderForm'); //Ciblage du formulaire (c'est lui qui est soumis)
    orderForm.addEventListener('submit', function() { //Ecoute de l'évènement 'submit' qui déclenche l'envoi
        const orderContent = createOrderContent(); //Création de l'objet à envoyer
        saveTotalAmount(); //Sauvegarde du montant de la commande pour affichage sur la page de confirmation
        postOrderContent(orderContent); //Envoi au serveur et redirection vers la page de confirmation
    });
}
/*---------------------------Fonction de création de l'objet à envoyer au serveur---------------------------*/
//Classe avec un constructor pour la création de l'objet envoyé
class OrderContent {
    constructor(products, contact) {
        this.products = products;
        this.contact = contact;
    }
}
//Fonction pour créer l'objet
function createOrderContent() {
    const products = createProducts(); //Création de l'array contenant le(s) produit(s)
    const contact = createContact(); //Création de l'objet contenant les informations de contact
    const orderContent = new OrderContent(products, contact); //Création de l'objet envoyé au serveur
    return orderContent;
}
/*-------------------------------Fonction de création de l'array de product_id-----------------------------*/
function createProducts() {
    let products = []; //Variable "products" destinée à contenir l'array de product_id
    const cartContent = lookForCartContent(); //Récupération du contenu du localStorage
    for (let k = 0; k < cartContent.length; k++) {//Boucle pour récupérer le(s) id et en alimenter le tableau
        const productId = cartContent[k].id;
        products.push(productId);
    }
    return products;
}
/*--------------------------------Fonction de création de l'objet contact---------------------------------*/
//Classe avec un constructor pour la création de l'objet contact
class Contact {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}
//Fonction pour créer l'objet
function createContact() {
    //Ciblage des inputs du formulaire
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const email = document.getElementById('email');
    //Création de l'objet "contact" par appel de la classe Contact
    const contact = new Contact(firstName.value, lastName.value, address.value, city.value, email.value);
    return contact;
}
/*-----------------------------Fonction sauvegardant le prix dans le localStorage----------------------------*/
function saveTotalAmount() {
    const orderPrice = document.getElementById('totalPrice').textContent; //Ciblage et récupération du prix
    localStorage.setItem('orderPrice', JSON.stringify(orderPrice)); //Sauvegarde dans le localStorage
}
/*---------------------------Fonction d'envoi des données au serveur avec l'API fetch----------------------*/
function postOrderContent(orderContent) {
    fetch(`http://localhost:3000/api/teddies/order`, {
            method: 'POST', //Méthode POST pour envoyer des données
            headers: {
                "Content-type": "application/json" //Type de contenu envoyé
            },
            body: JSON.stringify(orderContent) //Conversion en chaîne du contenu de "orderContent"
        })
        .then(function(response) {//Récupération d'une réponse sous forme d'objet JSON
            return response.json();
        })
        .then(function(orderData) {
            localStorage.setItem('orderId', JSON.stringify(orderData.orderId)); //Stockage de l'orderId
            window.location.href = './orderconfirmation.html'; //Redirection vers la page de confirmation
        })
        .catch(function(error) {//Si une erreur survient elle est affichée dans la console
            console.log(error);
        });
}

/******************************************RECUPERATION DU PANIER********************************************
************************************************************************************************************/
/*--------------Fonction retournant le conenu de la clé 'selectedProduct' du localStorage-------------------*/
function lookForCartContent() {
    return JSON.parse(localStorage.getItem('selectedProduct'));
}