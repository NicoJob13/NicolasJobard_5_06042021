//Le fichier index.js est destiné à gérer les actions sur la page d'accueil du site

//On appelle la fonction permettant l'affichage de la galerie de produits
displayProducts();

async function displayProducts() {/*Cette fonction est asynchrone pour au préalable récupérer les
    informations sur les produits depuis le serveur via la fonction 'getProducts' passée en constante et
    dont on attend la réponse*/
    const products = await getProducts();

    for (product of products) {/*Avec une boucle, pour chaque produit on crée une card par appel de la fonction
        'createProductsGallery*/
        createProductsGallery(product);
    }
}

//Fonction permettant d'interroger le serveur via une requête GET réalisée à l'aide de l'API fetch
function getProducts() {//Cette fonction va retourner le résultat de la requête
    return fetch(`http://localhost:3000/api/teddies`) //Adresse du serveur passée en paramètre de la requête
        .then(function(response) {//On récupère la réponse sous forme d'objet JSON
        return response.json();
        })
        .then(function(products) {//Puis on récupère les données
        return products;
        })
        .catch(function(error) {//En cas d'erreur elle est affichée dans la console
        console.log(error);
    });
}

//Fonction permettant de créer la galerie, les cards des produits et de les y intégrer
function createProductsGallery() {
    const productsSection = document.getElementById('productSection'); //On cible l'élément d'id 'productSection
    const productsGallery = document.createElement('div'); //On crée une div...
    productsSection.appendChild(productsGallery); //...que l'on intègre dans l'élément précédent

    /*On crée successivement les éléments nécessaires à la constitution d'une card, auxquels on ajoute les classes CSS souhaitées
    (.classList.add) et le contenu en faisant aux propriétés disponibles pour l'objet récupéré du serveur et/ou la balise utilisée*/
    //La card
    const galleryCard = document.createElement('article');
    galleryCard.classList.add('card', 'galleryCard');

    //Le lien vers la page du produit
    const productLink = document.createElement('a');
    productLink.href = './product.html?id=' + product._id;
    
    //L'image du produit
    const pictureContainer = document.createElement('div');
    pictureContainer.classList.add('pictureContainer');

    const productPicture = document.createElement('img');
    productPicture.classList.add('productPicture');
    productPicture.src = product.imageUrl;

    //Le texte de la card
    const galleryCardText = document.createElement('div');
    galleryCardText.classList.add('cardText', 'galleryCardText');

    const productCardTitle = document.createElement('h3');
    productCardTitle.classList.add('productCardTitle');
    productCardTitle.textContent = product.name;

    //Le prix du produit
    const productPrice = document.createElement('span');
    productPrice.classList.add('productPrice');
    productPrice.textContent = product.price / 100 + ",00 €";
    
    /*On intègre les éléments les uns dans les autres afin de créer la card, elle-même intégrée à la galerie*/
    productsGallery.appendChild(galleryCard);
    galleryCard.appendChild(productLink);
    productLink.appendChild(pictureContainer);
    pictureContainer.appendChild(productPicture);
    productLink.appendChild(galleryCardText);
    galleryCardText.appendChild(productCardTitle);
    galleryCardText.appendChild(productPrice);
}