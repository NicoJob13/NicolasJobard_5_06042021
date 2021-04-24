//Le fichier orderconfirmation.js est destiné à gérer les actions sur la page de confirmation de commande

//On appelle la fonction permettant l'affichage de la confirmation de commande
displayOrderConfirmation();

//On appelle la fonction permettant de vider le panier
clearCart();

//Fonction d'affichage du récapitulatif de commande (montant et orderId)
function displayOrderConfirmation() {
    //Création d'une constante ciblant l'élement d'id "orderPrice" pour y injecter le montant de la commande précédemment stocké dans le localStorage
    const orderPrice = document.getElementById('orderPrice');
    orderPrice.textContent = JSON.parse(localStorage.getItem('orderPrice'));

    //Création d'une constante ciblant l'élement d'id "orderId" pour y injecter l'id de la commande précédemment stocké dans le localStorage
    const orderId = document.getElementById('orderId');
    orderId.textContent = JSON.parse(localStorage.getItem('orderId'));
}

//Fonction de vidage du localStorage pour vider le panier une fois la commande confirmée
function clearCart() {
    localStorage.clear();
}
