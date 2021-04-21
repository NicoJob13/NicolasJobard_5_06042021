# NicolasJobard_5_06042021
Projet 5 de la formation Développeur Web d'OpenClassrooms.
## Intitulé du projet
Construisez un site e-commerce.
## Scénario du projet
En tant que développeur front-end au sein de la société Orinoco, entreprise de commerce en ligne, créer un MVP du site, en collaboration avec la développeuse back-end et en respectant le cahier des charges, puis présenter l'application à son employeur.
## Objectifs
* Valider des données issues de sources externes;
* Gérer des événements JavaScript;
* Créer un plan de test pour une application;
* Interagir avec un web service avec JavaScript.
## Cahier des charges
### Architecture du site
* une page listant les articles disponibles à la vente (vue liste), une seule catégorie de produits (ours en peluche faits mains, caméras vintage ou meubles en chêne) suffisant dans un premier temps;
* une page “produit” affichant dynamiquement l'élément sélectionné par l'utilisateur, permettant de personnaliser le produit et de l'ajouter au panier (il n'est pas demandé que la personnalisation soit fonctionnelle à ce stade, mais la présence d'un menu déroulant);
* une page “panier” contenant un résumé des produits dans le panier, le prix total et un formulaire de commande dont les données doivent être conformes et correctement formatées avant envoie au back-end;
* une page de confirmation de commande, remerciant l'utilisateur, et indiquant le prix total et l'identifiant de commande.
### Planification de tests unitaires
* Pour au moins 80% du code du front-end;
* Formaliser le process (il n'est pas exigé d'écrire les test à ce stade).
### Contraintes techniques
* HTML, CSS (utilisation de librairies et frameworks autorisée), JavaScript (sans librairie ni framework);
* Indentation et commentaire du code;
* Utilisation de fonctions globales;
* Validation des données des POST :
    * l’objet contact envoyé au serveur doit contenir les champs firstName, lastName, address, city et email,
    * le tableau des produits envoyé au back-end doit être un array de strings product_id,
    * validation avant envoi au serveur.
### Informations complémentaires
* URL du repository GitHub contenant le back-end : https://github.com/OpenClassrooms-Student-Center/JWDP5.git
## Livrables
* Le lien vers un dépôt Git public contenant le code de l'application web, permettant de cloner le référentiel, d'ouvrir
index.html, d'utiliser l'application entièrement opérationnelle et de confirmer que n’importe quel input utilisateur est validé.
* Un plan de tests.
## Comment utiliser ce dépôt
* S'assurer au préalable de disposer de node.js sur le poste (pour utiliser npm pour l'installation des dépendances du projet), sinon le télécharger (https://nodejs.org/) puis l'installer;
* Récupérer les fichiers du dépôt en le clonant ou en téléchargeant l'archive *.zip;
* En cas de téléchargement de l'archive, la décompresser;
* Ouvrir le dossier BackEnd dans son IDE;
* Ouvrir un terminal et installer les dépendances en tapant la commande : npm install ;
* Lancer le serveur en tapant la commande : node server.js ;
* Ouvrir le dossier FrontEnd dans son IDE et utiliser un plugin comme Live Server sur VSCode pour tester le site dans un navigateur;