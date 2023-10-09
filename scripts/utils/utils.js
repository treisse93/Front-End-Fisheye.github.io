// Récupère les données
const datas = await getDatas();
// Récupère l'id du photographe dans l'url
const id = getIdFromUrl();
// Récupère les photographes (données des photographes)
const { photographers } = datas;
// Récupère les données du photographe selon l'id de la page générée
const photographer = photographers.find((element) => element.id == id);

// Déclare la fonction pour récupérer les données depuis le fichier JSON
async function getDatas() {
  const response = await fetch('./data/photographers.json');
  // retourne le tableau photographers seulement une fois récupéré
  const Datas = await response.json();
  return Datas;
}

//Déclare la fonction pour récupérer l'id du photographe depuis l'URL
function getIdFromUrl() {
  const url = window.location.search; // Récupère l'url
  const urlParams = new URLSearchParams(url); // Récupère les paramètres de l'url
  const urlId = urlParams.get('id'); // Récupère l'id de l'url
  return urlId;
}

 //Déclare la fonction pour le prénom du photographe par son id
function getNameByID() {
  const fullname = photographer.name; // Récupère le nom du photographe
  const Photographername = fullname.split(' ')[0]; // Récupère le prénom du photographe
  return Photographername;
}

 //Déclare la fonction de tri des médias par popularité
function sortbyPops(mediaToSort) {
  const medias = mediaToSort;
  medias.sort((a, b) => b.likes - a.likes);
  document.getElementById('pop').setAttribute('aria-selected', 'true');
  document.getElementById('date').setAttribute('aria-selected', 'false');
  document.getElementById('titre').setAttribute('aria-selected', 'false');
  document
    .querySelector('.filterField_select-list')
    .setAttribute('aria-activedescendant', 'pop');

  return medias;
}


 //Déclare la fonction de tri des médias par date
function sortbyDate(mediaToSort) {
  const medias = mediaToSort;
  medias.sort((a, b) => new Date(b.date) - new Date(a.date));
  document.getElementById('pop').setAttribute('aria-selected', 'false');
  document.getElementById('date').setAttribute('aria-selected', 'true');
  document.getElementById('titre').setAttribute('aria-selected', 'false');
  document
    .querySelector('.filterField_select-list')
    .setAttribute('aria-activedescendant', 'date');

  return medias;
}

// Déclare la fonction pour trier les médias par titre
function sortbyTitle(mediaToSort) {
  const medias = mediaToSort;
  medias.sort((a, b) => a.title.localeCompare(b.title));
  document.getElementById('pop').setAttribute('aria-selected', 'false');
  document.getElementById('date').setAttribute('aria-selected', 'false');
  document.getElementById('titre').setAttribute('aria-selected', 'true');
  
  return medias;
}

 // Déclare la fonction de tri des médias en fonction de l'option sélectionnée
function sortMedia(sortBy, medias) {
  let SortedUsermedias;
  switch (sortBy) {
    case 'pop':
      SortedUsermedias = sortbyPops(medias);
      document
        .querySelector('.filterField_select-list')
        .setAttribute('aria-activedescendant', 'pop');
      break;
    case 'date':
      SortedUsermedias = sortbyDate(medias);
      document
        .querySelector('.filterField_select-list')
        .setAttribute('aria-activedescendant', 'date');
      break;
    case 'titre':
      SortedUsermedias = sortbyTitle(medias);
      document
        .querySelector('.filterField_select-list')
        .setAttribute('aria-activedescendant', 'titre');
      break;
    default:
      SortedUsermedias = sortbyPops(medias);
  }
  return SortedUsermedias;
}

export {
  datas,// retourne le tableau photographers seulement une fois récupéré
  id,// Récupère l'id du photographe dans l'url
  photographer,// Récupère les données du photographe selon l'id de la page générée
  getDatas,//récupère les données depuis le fichier JSON
  getIdFromUrl,//récupère l'id du photographe depuis l'URL
  getNameByID,//prénom du photographe par son id
  sortMedia//tri des médias en fonction de l'option sélectionnée
};