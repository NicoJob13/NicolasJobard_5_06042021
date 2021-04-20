//Création d'une constante ciblant l'élement d'id "orderPrice" pour y injecter le montant de la commande précédemment stocké dans le localStorage
const orderPrice = document.getElementById('orderPrice');
orderPrice.textContent = JSON.parse(localStorage.getItem('orderPrice'));

//Création d'une constante ciblant l'élement d'id "orderId" pour y injecter l'id de la commande précédemment stocké dans le localStorage
const orderId = document.getElementById('orderId');
orderId.textContent = JSON.parse(localStorage.getItem('orderId'));