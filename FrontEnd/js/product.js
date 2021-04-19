createProductSheet();

async function createProductSheet() {
    const productData = await getProductData();

    const productSheet = document.getElementById('productSheet')
    
    const productSheetCard = document.createElement('article');
    productSheetCard.classList.add('card', 'productSheetCard');

    const productSheetPicture = document.createElement('div');

    const productSheetImg = document.createElement('img');
    productSheetImg.src = productData.imageUrl;
    productSheetImg.classList.add('productSheetPicture');

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
    for (let i = 0; i < customizationOption.length; i++) {
        const element = customizationOption[i];
        const optionValue = document.createElement('option');
        optionValue.value = element;
        optionValue.textContent = element;
        customizationFormSelect.appendChild(optionValue);
    }

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

const addCartButton = document.getElementById('addCartButton');
addCartButton.addEventListener('click', addToCart);

async function addToCart() {
    const productData = await getProductData();
    const colorSelector = document.getElementById('productColor');
    const selectedColor = colorSelector.options[colorSelector.selectedIndex].value;
    const customizedProduct = {
        id : productData._id,
        name : productData.name,
        color : selectedColor,
        price : productData.price / 100,
        picture : productData.imageUrl
    }
    const cart = createCart();
    cart.push(customizedProduct);
    saveCart(cart);
    alert('Votre produit a été ajouté au panier !');
}

function createCart() {
    let cart = localStorage.getItem('selectedProduct');
    if(cart != null) {
        return JSON.parse(cart);
    } else {
        return [];
    }
}

function saveCart(customizedProduct) {
    localStorage.setItem('selectedProduct', JSON.stringify(customizedProduct));
}

function getProductData() {
    const productId = new URLSearchParams(window.location.search).get('id');;
    return fetch(`http://localhost:3000/api/teddies/${productId}`)
        .then(function(response) {
        return response.json();
        })
        .then(function(productData) {
        return productData;
        })
        .catch(function(error) {
        console.log(error);
    });
}