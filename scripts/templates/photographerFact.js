/**
 * Fabrique de photographes.
 * @function
 * @param {Object} data - Données du photographe.
 * @returns {Object}  - Objet avec les fonctions pour obtenir le DOM du photographe
 */
function photographerFact(data) {
    // Récupérer les données du photographe
    const { name, id, city, country, tagline, price, portrait } = data;
    let picture = `./assets/photographers/${portrait}`;
    /**
     *On obtient le DOM pour la carte du photographe.
     * @returns {HTMLElement} Retourne le DOM de la carte du photographe.
     */
    function getUserCardDOM() {
      // Création des cartes
      const article = document.createElement('article');
      article.classList.add('photographersCard');
      // Création du container de la figure
      const figureContainer = document.createElement('figure');
      figureContainer.classList.add('figureContainer');
      // Création de la Div de l'image
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('imgContainer');
      // Création de l'image
      const img = document.createElement('img');
      img.classList.add('PortraitImg');
      img.setAttribute('src', picture);
      img.setAttribute('alt', name);
      // Création de la Div du Texte de Présentation
      const infosContainer = document.createElement('figcaption');
      infosContainer.classList.add('MoreInfos');
      // Création du nom de l'artiste
      const artisteName = document.createElement('h2');
      artisteName.classList.add('artisteName');
      artisteName.textContent = name;
      // Création du lien vers la page du photographe pour l'image
      const imgPageLink = document.createElement('a');
      imgPageLink.classList.add('imgPageLink');
      imgPageLink.setAttribute('aria-label', `${name}`);
      imgPageLink.href = `photographer.html?id=${id}`;
      imgContainer.appendChild(img);
      imgPageLink.appendChild(imgContainer);
      imgPageLink.appendChild(artisteName);
      figureContainer.appendChild(imgPageLink);
      // Création de la ville de l'artiste
      const cityLocation = document.createElement('address');
      cityLocation.classList.add('artisteLocation');
      cityLocation.textContent = `${city}, ${country}`;
      // Création de la citation de l'artiste
      const citation = document.createElement('blockquote');
      citation.classList.add('artistePunchline');
      citation.textContent = tagline;
      // Création du prix de l'artiste
      const pricing = document.createElement('p');
      pricing.classList.add('artistePricing');
      pricing.textContent = `${price}€/jour`;
      // Construction du module Final de la carte
      article.appendChild(figureContainer); // création du container personnalisé
      figureContainer.appendChild(infosContainer); // Ajout du bloc d'informations supplémentaires
      infosContainer.appendChild(cityLocation); // Affichage de la localisation
      infosContainer.appendChild(citation); // Affichage de la citation de l'artiste
      infosContainer.appendChild(pricing); // Affichage du tarif de l'artiste
      return article;
    }
    /**
   * Obtient le DOM de la page du photographe.
   * @returns {HTMLElement} Le DOM de la page du photographe.
   */
  function getUserPageDOM() {
    // Création de la page du photographe
    picture = `./assets/photographers/${portrait}`;
    // Création du container photographe
    const UserInfosContainer = document.createElement('figure');
    UserInfosContainer.classList.add('photographContainer');
    // Création de la div de résumé
    const resumeContainer = document.createElement('section');
    resumeContainer.classList.add('resumeContainer');
    // Création du container des infos photographe
    const UserInfosText = document.createElement('figcaption');
    UserInfosText.classList.add('UserInfosText');
    // Création du nom de l'artiste
    const artisteName = document.createElement('h1');
    artisteName.textContent = name;
    artisteName.classList.add('artisteName');
    artisteName.setAttribute('aria-label', `${name}`);
    artisteName.setAttribute('tabindex', '0');
    artisteName.id = 'photographName';
    // Création de la ville de l'artiste
    const cityLocation = document.createElement('address');
    cityLocation.textContent = `${city}, ${country}`;
    cityLocation.classList.add('artisteLocation');
    cityLocation.setAttribute('aria-label', `${city}, ${country}`);
    cityLocation.setAttribute('tabindex', '0');
    // Création de la citation de l'artiste
    const citation = document.createElement('blockquote');
    citation.textContent = tagline;
    citation.classList.add('artistePunchline');
    citation.setAttribute('aria-label', `${tagline}`);
    citation.setAttribute('tabindex', '0');
    // Création du nom dans la modale
    const Photographername = document.getElementById('photographerName');
    Photographername.textContent = '${name}';
    // Création du prix de l'artiste
    const priceDOM = document.createElement('p');
    priceDOM.classList.add('artistePricing');
    priceDOM.textContent = `${price}€/jour`;
    priceDOM.setAttribute('aria-label', `${price}€/jour`);
    // Création du container du portrait
    const portraitContainer = document.createElement('span');
    portraitContainer.classList.add('portraitContainer');
    // Création du portrait
    const photo = document.createElement('img');
    photo.classList.add('portrait');
    photo.setAttribute('src', picture);
    photo.setAttribute('alt', name);
    photo.setAttribute('ariaLabelledby', 'photographerName');
    // Récupération du bouton Contact
    const contactButton = document.createElement('button');
    contactButton.classList.add('contact_button');
    contactButton.textContent = 'Contactez-moi';
    contactButton.setAttribute('aria-label', 'Contact me');
    UserInfosContainer.appendChild(UserInfosText);
    UserInfosContainer.appendChild(portraitContainer);
    UserInfosContainer.appendChild(contactButton);
    UserInfosText.appendChild(artisteName);
    UserInfosText.appendChild(cityLocation);
    UserInfosText.appendChild(citation);
    portraitContainer.appendChild(photo);
    const main = document.getElementById('main-photographer');
    resumeContainer.appendChild(priceDOM);
    main.appendChild(resumeContainer);
    return UserInfosContainer;
  }
  return {
    getUserCardDOM,
    getUserPageDOM
  };
}

export default photographerFact;
