/************************************************DESCRIPTION*************************************************
*************************************************************************************************************
Le fichier orderconfirmation.js est destiné à gérer les actions sur la page de confirmation de commande*/

/**************APPEL DES FONCTIONS D'AFFICHAGE DE LA CONFIRMATION DE COMMANDE ET VIDAGE DU PANIER************
************************************************************************************************************/
displayOrderConfirmation();
clearCart();

/*************************************AFFICHAGE DU RECAPITULATIF DE COMMANDE*********************************
************************************************************************************************************/
//Fonction récupérant l'orderId et le montant de la commande depuis le localStorage et les intégrant
function displayOrderConfirmation() {
    const orderPrice = document.getElementById('orderPrice'); //Ciblage de l'élement de destination du montant
    orderPrice.textContent = JSON.parse(localStorage.getItem('orderPrice')); //Récupération depuis le localStorage
    const orderId = document.getElementById('orderId'); //Ciblage de l'élement de destination de l'orderId
    orderId.textContent = JSON.parse(localStorage.getItem('orderId')); //Récupération depuis le localStorage
}

/************************************************VIDAGE DU PANIER********************************************
************************************************************************************************************/
//Fonction vidant le localStorage pour vider le panier une fois la commande confirmée
function clearCart() {
    localStorage.clear();
}