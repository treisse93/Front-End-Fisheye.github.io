import photographerFact from '../templates/photographerFact.js';
import { getDatas } from '../utils/utils.js';
/**
 * Affiche les données sur la page.
 * @function
 * @param {Array} datas - Les données à afficher.
 */
function displayData(datas) {
  // déclare la variable section des photographes
  const photographersSection = document.querySelector('.photographer_section');

  datas.forEach((photographer) => {
    const photographerModel = photographerFact(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM); // rattache les carte de données  à la section photographes
  });
}
/**
 * Fonction d'initialisation.
 * @async
 */
async function init() {
  const { photographers } = await getDatas(); // Récupère les photographes et leurs données

  // Si la page index.html est affichée alors les photographes sont affichés
  if (document.querySelector('.photographer_section')) {
    displayData(photographers);
  }
}

init();
