//Le fichier product.js est destiné à gérer les actions sur la page d'un produit

//On appelle la fonction permettant la création et l'affichage du contenu du panier dans un tableau
displayCartContent();

//On appelle la fonction permettant de soumettre la commande
submitOrder();

//Fonction permettant l'affichage du contenu du panier
function displayCartContent() {/*Cette fonction récupère le contenu de la clé 'selectedProduct' du local storage, alimentée précédemment - 
Si le contenu de cette clé n'est pas nul, elle va créer et intégrer les éléments et informations nécessaires à l'affichage de ce contenu et activer
le bouton de validation de la commande -
Sinon elle va afficher un message indiquant au visiteur que le panier est vide*/
    const cartContent = JSON.parse(localStorage.getItem('selectedProduct')); //Récupération du contenu du localStorage
    const tableContainer = document.getElementById('tableContainer'); //On cible l'élément d'id 'tableContainer' dans lequel sera intégré le tableau

    if(cartContent != null) {//Si la clé du localStorage n'est pas vide
        /*On crée successivement les éléments nécessaires à la constitution du tableau de produits, auxquels on ajoute les classes CSS souhaitées
        (.classList.add) et le contenu en faisant aux propriétés disponibles pour l'objet récupéré du localStorage et/ou la balise utilisée*/
        
        //Le tableau en lui-même
        const cartTable = document.createElement('table');
        cartTable.classList.add('cartTable');

        //Les titres de colonnes
        const cartTableHeader = document.createElement('tr');
        
        const cartTableHeaderProductCell = document.createElement('th');
        cartTableHeaderProductCell.classList.add('cartTableCell');
        cartTableHeaderProductCell.textContent = 'Produit';
        
        const cartTableHeaderColorCell = document.createElement('th');
        cartTableHeaderColorCell.classList.add('cartTableCell');
        cartTableHeaderColorCell.textContent = 'Couleur';
        
        const cartTableHeaderPriceCell = document.createElement('th');
        cartTableHeaderPriceCell.classList.add('cartTableCell');
        cartTableHeaderPriceCell.textContent = 'Prix';
        
        tableContainer.appendChild(cartTable);
        cartTable.appendChild(cartTableHeader);
        cartTableHeader.appendChild(cartTableHeaderProductCell);
        cartTableHeader.appendChild(cartTableHeaderColorCell);
        cartTableHeader.appendChild(cartTableHeaderPriceCell);

        //Le contenu du tableau
        for (let i = 0; i < cartContent.length; i++) {//Utilisation d'une boucle pour répéter les actions pour chaque entrée trouvée
            const element = cartContent[i];

            const cartTableContent = document.createElement('tr');

            const cartTableContentProductCell = document.createElement('td');
            cartTableContentProductCell.classList.add('cartTableCell', 'cartTableProductCell');
            const cartTableContentProductCellPicture = document.createElement('img');
            cartTableContentProductCellPicture.classList.add('cartTableContentProductCellPicture');
            cartTableContentProductCellPicture.src = element.picture;
            const cartTableContentProductCellName = document.createElement('span');
            cartTableContentProductCellName.classList.add('cartTableContentProductCellName');
            cartTableContentProductCellName.textContent = element.name;

            const cartTableContentColorCell = document.createElement('td');
            cartTableContentColorCell.classList.add('cartTableCell');
            cartTableContentColorCell.textContent = element.color;

            const cartTableContentPriceCell = document.createElement('td');
            cartTableContentPriceCell.classList.add('cartTableCell');
            cartTableContentPriceCell.textContent = element.price + ",00 €";

            cartTable.appendChild(cartTableContent);
            cartTableContent.appendChild(cartTableContentProductCell);
            cartTableContentProductCell.appendChild(cartTableContentProductCellPicture);
            cartTableContentProductCell.appendChild(cartTableContentProductCellName);
            cartTableContent.appendChild(cartTableContentColorCell);
            cartTableContent.appendChild(cartTableContentPriceCell);
        }
        
        //Montant total du panier et bouton pour vider le panier situés sous le panier
        const tableBottom = document.createElement('div');
        tableBottom.classList.add('tableBottom');

        //Montant total
        const totalPriceContainer = document.createElement('div');
        totalPriceContainer.classList.add('totalPrice');
        const totalPriceTitle = document.createElement('span');
        totalPriceTitle.textContent = 'Montant total de votre commande : ';
        const totalPriceContent = document.createElement('span');
        totalPriceContent.id = 'totalPrice';
        let totalPrice = 0;
        for (let j = 0; j < cartContent.length; j++) {//Utilisation d'une boucle pour ajouter le montant du produit à chaque itération
            let productPrice = cartContent[j].price;
            totalPrice = totalPrice + productPrice;
        }
        totalPriceContent.textContent = totalPrice + ",00 €";

        //Bouton de vidage
        const clearCartButton = document.createElement('button');
        clearCartButton.classList.add('button', 'clearCartButton');
        clearCartButton.id = 'clearCartButton';
        clearCartButton.textContent = 'Vider mon panier';

        tableContainer.appendChild(tableBottom);
        tableBottom.appendChild(totalPriceContainer);
        totalPriceContainer.appendChild(totalPriceTitle);
        totalPriceContainer.appendChild(totalPriceContent);
        tableBottom.appendChild(clearCartButton);

        //Fonction permettant de vider la clé du localStorage au clic sur le bouton ce qui entraîne le vidage du panier
        clearCartButton.addEventListener('click', function() {
            localStorage.clear();
            confirm('Confirmez-vous la suppression de votre panier ?'); //Demande de confirmation pour éviter les erreurs
            location.reload();
        });
    } else {//Affichage d'un message
        const emptyCart = document.createElement('p');
        emptyCart.classList.add('emptyCart');
        emptyCart.textContent = 'Votre panier est vide, il faut vite y remédier !';
        tableContainer.appendChild(emptyCart);
    }
}

//Création d'une classe contenant un constructor pour faciliter la création ultérieure de l'objet contact à envoyer au serveur
class Contact {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

//Fonction permettant d'envoyer la commande au serveur
function submitOrder() {
    //Récupération du contenu du panier depuis le localStorage
    const cartContent = JSON.parse(localStorage.getItem('selectedProduct'))
    
    //Création d'une constante pour cibler le bouton "commander" et le désactiver par défaut
    const validationButton = document.getElementById('purchaseValidation');
    validationButton.disabled = true;

    //Mise en place d'une condition pour activer le bouton "commander" afin de permettre l'envoi de la commande
    if(cartContent != null) {//Si la clé du localStorage n'est pas vide on active le bouton
        validationButton.disabled = false;
        
        const orderForm = document.getElementById('orderForm'); //On cible le formulaire car c'est lui qui est soumis

        //Ecoute de l'évènement "submit", lequel déclenche la création des éléments nécessaires à la requête, puis la requête elle même
        orderForm.addEventListener('submit', function() {

            //Création et initialisation de la variable "products" destinée à contenir l'array de product_id
            let products = [];
            
            for (let k = 0; k < cartContent.length; k++) {//On utilise une boucle for pour récupérer l'id du/des produit(s) et alimenter le tableau avec
                const productId = cartContent[k].id;
                products.push(productId);
            }

            //Création des constantes nécessaires pour cibler les inputs du formulaire et dont les valeur vont servir à la création de l'objet "contact"
            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const address = document.getElementById('address');
            const city = document.getElementById('city');
            const email = document.getElementById('email');
            //Création de l'objet "contact" en appelant la classe Contact précédemment créée
            const contact = new Contact(firstName.value, lastName.value, address.value, city.value, email.value);
            //Création d'un objet contenant l'array de productId et l'objet contact
            const orderContent = {
                products,
                contact
            };

            //Sauvegarde du montant de la commande dans le localStorage pour le récupérer sur la page de confirmation
            //Dans une constante on cible l'élément d'id "totalPrice" et on en récupère le contenu
            const orderPrice = document.getElementById('totalPrice').textContent;
            //On sauvegarde ce contenu dans le localStorage
            localStorage.setItem('orderPrice', JSON.stringify(orderPrice));

            
            //Requête POST utilisant l'API fetch permettant d'envoyer les données de la commande au serveur et de récupérer du serveur l'id de confirmation de commande
            fetch(`http://localhost:3000/api/teddies/order`, {
                method: 'POST', //On utilise la méthode POST pour envoyer des données
                headers: {//On précise le type de contenu envoyé
                    "Content-type": "application/json"
                },
                body: JSON.stringify(orderContent) //On convertit en chaîne le contenu de "orderContent"
            })
            .then(function(response) {//On s'assure que le serveur retourne une réponse
                return response.json();
            })
            .then(function(orderData) {
                //On stocke l'orderId contenu dans la réponse du serveur dans le localStorage
                localStorage.setItem('orderId', JSON.stringify(orderData.orderId));
                //On redirige vers la page de confirmation
                window.location.href = 'orderconfirmation.html';
            })
            .catch(function(error) {//Si une erreur survient elle est affichée dans la console
                console.log(error);
            });
        });
    }
}