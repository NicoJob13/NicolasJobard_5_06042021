displayCartContent();

function displayCartContent() {
    const cartContent = JSON.parse(localStorage.getItem('selectedProduct'));
    const tableContainer = document.getElementById('tableContainer');

    if(cartContent != null) {
        const cartTable = document.createElement('table');
        cartTable.classList.add('cartTable');

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

        /*Création du contenu du tableau*/
        for (let i = 0; i < cartContent.length; i++) {
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
        
        /*Montant total de la commande et bouton pour vider le panier*/
        const tableBottom = document.createElement('div');
        tableBottom.classList.add('tableBottom');

        const totalPriceContainer = document.createElement('div');
        totalPriceContainer.classList.add('totalPrice');
        const totalPriceTitle = document.createElement('span');
        totalPriceTitle.textContent = 'Montant total de votre commande : ';
        const totalPriceContent = document.createElement('span');
        let totalPrice = 0;
        for (let j = 0; j < cartContent.length; j++) {
            let productPrice = cartContent[j].price;
            totalPrice = totalPrice + productPrice;
        }
        totalPriceContent.textContent = totalPrice + ",00 €";

        const clearCartButton = document.createElement('button');
        clearCartButton.classList.add('button', 'clearCartButton');
        clearCartButton.id = 'clearCartButton';
        clearCartButton.textContent = 'Vider mon panier';

        tableContainer.appendChild(tableBottom);
        tableBottom.appendChild(totalPriceContainer);
        totalPriceContainer.appendChild(totalPriceTitle);
        totalPriceContainer.appendChild(totalPriceContent);
        tableBottom.appendChild(clearCartButton);

        clearCartButton.addEventListener('click', function() {
            localStorage.clear();
            confirm('Confirmez-vous la suppression de votre panier ?');
            location.reload();
        });
    } else {
        const emptyCart = document.createElement('p');
        emptyCart.classList.add('emptyCart');
        emptyCart.textContent = 'Votre panier est vide, il faut vite y remédier !';
        tableContainer.appendChild(emptyCart);
    }
}