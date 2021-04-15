displayProducts();

async function displayProducts() {
    const products = await getProducts();

    for (product of products) {
        createProductsGallery(product);
    }
}

function getProducts() {
    return fetch(`http://localhost:3000/api/teddies`)
        .then(function(response) {
        return response.json();
        })
        .then(function(products) {
        return products;
        })
        .catch(function(error) {
        console.log(error);
    });
}

function createProductsGallery() {
    const productsSection = document.getElementById('productSection')
    const productsGallery = document.createElement('div');
    productsSection.appendChild(productsGallery);

    const galleryCard = document.createElement('article');
    galleryCard.classList.add('card', 'galleryCard');

    const productLink = document.createElement('a');
    productLink.href = './product.html?id=' + product._id;

    const pictureContainer = document.createElement('div');
    pictureContainer.classList.add('pictureContainer');

    const productPicture = document.createElement('img');
    productPicture.classList.add('productPicture');
    productPicture.src = product.imageUrl;

    const galleryCardText = document.createElement('div');
    galleryCardText.classList.add('cardText', 'galleryCardText');

    const productCardTitle = document.createElement('h3');
    productCardTitle.classList.add('productCardTitle');
    productCardTitle.textContent = product.name;

    const productPrice = document.createElement('span');
    productPrice.classList.add('productPrice');
    productPrice.textContent = product.price / 100 + " " + "€";
    
    productsGallery.appendChild(galleryCard);
    galleryCard.appendChild(productLink);
    productLink.appendChild(pictureContainer);
    pictureContainer.appendChild(productPicture);
    productLink.appendChild(galleryCardText);
    galleryCardText.appendChild(productCardTitle);
    galleryCardText.appendChild(productPrice);
}