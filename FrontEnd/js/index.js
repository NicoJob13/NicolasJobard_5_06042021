//Le fichier index.js est destiné à gérer les actions sur la page d'accueil du site

//Appel de la fonction permettant l'affichage de la galerie de produits
displayProductsGallery();

async function displayProductsGallery() {/*Fonction asynchrone car il faut au préalable récupérer les
    informations sur les produits depuis le serveur via la fonction 'getProducts'*/
    const products = await getProducts();

    createProductsGallery(); //Puis appel de la fonction créant la galerie

    for (product of products) {/*Pour chaque produit, création d'une card et intégration à la galerie
    par appel de la fonction 'createProductCard'*/
        createProductCard(product);
    }
}

//Fonction créant la galerie que l'on intègre dans la balise HTML d'id "productSection"
function createProductsGallery() {
    const productsSection = document.getElementById('productSection'); //On cible l'élément d'id 'productSection'
    const productsGallery = document.createElement('div'); //On crée une div...
    productsGallery.id = 'productsGallery';
    productsGallery.classList.add('gallery');
    productsSection.appendChild(productsGallery); //...que l'on intègre dans l'élément d'id 'productSection'
}

//Fonction créant une card de produit et l'intégrant à la galerie
function createProductCard() {
    // On cible l'élément d'id 'productsGallery'
    const productsGallery = document.getElementById('productsGallery');

    /*Création des éléments nécessaires pour une card, ajout des classes CSS et du contenu*/
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
    galleryCardText.classList.add('galleryCardText');

    const productCardTitle = document.createElement('h3');
    productCardTitle.classList.add('productCardTitle');
    productCardTitle.textContent = product.name;

    //Le prix du produit
    const productPrice = document.createElement('span');
    productPrice.classList.add('productPrice');
    productPrice.textContent = product.price / 100 + ",00 €";
    
    /*On intègre les éléments les uns dans les autres afin de créer la card et de l'intégrer à la galerie*/
    productsGallery.appendChild(galleryCard);
    galleryCard.appendChild(productLink);
    productLink.appendChild(pictureContainer);
    pictureContainer.appendChild(productPicture);
    productLink.appendChild(galleryCardText);
    galleryCardText.appendChild(productCardTitle);
    galleryCardText.appendChild(productPrice);
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