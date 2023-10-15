/**
 * @fileOverview modale de contact avec validation du formulaire.
 */

// Récupération des éléments du DOM
const BGmodal = document.querySelector(".contact_modal");
const modal = document.querySelector(".modal");
const modalTitle = document.getElementById("modalTitle");
const modalTitleValidation = document.getElementById("modalTitle_Validate");
const Body = document.getElementById("main-photographer");
const CloseCrossBtn = document.querySelector(".close");
const CloseModalBtn = document.getElementById("btn-close");
const ValidateModal = document.querySelector(".modal_validate");
const form = document.querySelector("form.reserve");

// Récupération des valeurs des éléments du formulaire
const inputFirstName = document.forms.reserve.first;
const inputLastName = document.forms.reserve.last;
const inputEmail = document.forms.reserve.email;
const inputText = document.forms.reserve.txtMsg; //

// Régex pour la validation des champs texte
const regexpEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const regexpFirstName = /^[a-zA-Z\s]+$/;
const regexpLastName = /^[a-zA-Z\s]+$/;

// Liste des objets à vérifier + conditions + messages de retour en cas d'erreur
const formfieldsObjects = [
  {
    formfield: inputFirstName,
    condition: () => !validateFirstName(),
    message: "",
  },
  {
    formfield: inputLastName,
    condition: () => !validateLastname(),
    message: "",
  },
  {
    formfield: inputEmail,
    condition: () => !validateEmail(),
    message: "",
  },
  {
    formfield: inputText,
    condition: () => !validateText(),
    message: "",
  },
];

// État de soumission du formulaire
let alreadyValidate = false;
// fermeture de la modale
CloseCrossBtn.addEventListener("click", closeForm);
if (CloseModalBtn) {
  CloseModalBtn.addEventListener("click", closeForm);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === 27) {
    closeForm();
  }

  if (e.key === "Enter" || e.key === 13) {
    confirmValidation();
  }
});
document.addEventListener("click", (e) => {
  if (e.target === modal) closeForm();
});

/**
 * Affiche la modale.
 */
function displayModal() {
  const contactbtn = document.querySelector(
    ".photographContainer .contact_button"
  );
  if (contactbtn) {
    contactbtn.setAttribute("aria-expanded", "true");
  }
  BGmodal.setAttribute("aria-hidden", "false");
  Body.setAttribute("aria-hidden", "true");

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === 27) {
      //numéro keypress pour échap
      closeForm();
    }

    if (e.key === "Enter" || e.key === 13) {
      //numéro keypress pour entrée
      confirmValidation();
    }
  });
  document.addEventListener("click", (e) => {
    if (e.target === modal) closeForm(); // si la cible est la modal, fermer le formulaire
  });

  // Validation du formulaire
  document.forms.reserve.addEventListener("submit", confirmValidation);
  document.forms.reserve.addEventListener("submit", (e) => {
    e.preventDefault(); // empêche de fermer la fenêtre sans récupérer les informations
    validate();
  });

  if (alreadyValidate) {
    BGmodal.classList.add("visible");
  } else {
    BGmodal.classList.remove("hidden");
    BGmodal.setAttribute("aria-hidden", "false");
    Body.setAttribute("aria-hidden", "true");
    CloseCrossBtn.focus();
    BGmodal.classList.add("visible");
  }
}

/**
 * Ferme la modale.
 */
function closeForm() {
  setTimeout(() => {
    BGmodal.classList.remove("visible");
    BGmodal.classList.add("hidden");
    document.removeEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.key === 27) {
        //numéro keypress pour échap
        closeForm();
      }
    });

    document.removeEventListener("click", (e) => {
      if (e.target === modal) closeForm();
    });

    // Validation du formulaire
    document.forms.reserve.removeEventListener("submit", confirmValidation);
    document.forms.reserve.removeEventListener("submit", (e) => {
      e.preventDefault();
      validate();
    });
  }, 100);
  const contactbtn = document.querySelector(
    ".photographContainer .contact_button"
  );
  if (contactbtn) {
    contactbtn.setAttribute("aria-expanded", "false");
  }
}

/**
 * Confirme la validation du formulaire.
 */

/**
 * Valide le prénom.
 * @return {boolean} - Retourne vrai si le prénom est valide
 */
function validateFirstName() {
  if (
    inputFirstName.value.trim().length < 2 || // si nombre de caractères inférieurs à 2
    inputFirstName.value.trim() === "" // si champ vide
  ) {
    formfieldsObjects[0].message =
      "Le champ doit comporter un minimum de 2 caractères alphabétiques.";
    return false;
  }
  // si regexp non respectée
  if (!regexpFirstName.test(inputFirstName.value.trim())) {
    formfieldsObjects[0].message =
      "Le champ doit comporter seulement des caractères alphabétiques.";
    return false;
  }
  return true;
}

/**
 * Valide le nom.
 * @return {boolean} - Retourne vrai si le nom est valide
 */
function validateLastname() {
  if (
    inputLastName.value.trim().length < 2 || // si nombre de caractères inférieurs à 2
    inputLastName.value.trim() === "" // si champ vide
  ) {
    formfieldsObjects[1].message =
      "Le champ doit comporter un minimum de 2 caractères alphabétiques.";
    return false;
  }
  if (!regexpLastName.test(inputLastName.value.trim())) {
    // si regexp non respectée
    formfieldsObjects[1].message =
      "Le champ doit comporter seulement des caractères alphabétiques.";
    return false;
  }
  return true;
}

/**
 * Valide l'email.
 * @return {boolean} - Retourne vrai si l'email est valide
 */
function validateEmail() {
  // si regexp non respectée
  if (!regexpEmail.test(inputEmail.value.trim())) {
    formfieldsObjects[2].message = "Veuillez entrer une adresse mail valide.";
    return false;
  }
  return true;
}

/**
 * Valide le texte.
 * @return {boolean} - Retourne vrai si le texte est valide
 */
function validateText() {
  if (inputText.value.trim().length < 50) {
    //minimum 50 caractères
    formfieldsObjects[3].message = "Veuillez entrer au minimum 50 caractères.";
    return false;
  }
  if (inputText.value.trim().length > 200) {
    //minimum 50 caractères
    formfieldsObjects[3].message = "Veuillez entrer au maximum 200 caractères.";
    return false;
  }
  return true;
}

/**
 * Valide globalement les données des champs input.
 * @return {boolean} - Retourne vrai si toutes les données sont valides
 */
function validate() {
  let formIsTrue = true;
  for (let i = 0; i < formfieldsObjects.length; i++) {
    const condition = formfieldsObjects[i].condition();
    const { message } = formfieldsObjects[i];
    if (condition) {
      formfieldsObjects[i].formfield.parentElement.setAttribute(
        "data-error",
        message
      );
      formfieldsObjects[i].formfield.parentElement.setAttribute(
        "data-error-visible",
        "true"
      );
      formfieldsObjects[i].formfield.parentElement.classList.add("error");
      formfieldsObjects[i].formfield.focus();
      formIsTrue = false;
    } else {
      formfieldsObjects[i].formfield.parentElement.removeAttribute(
        "data-error"
      );
      formfieldsObjects[i].formfield.parentElement.setAttribute(
        "data-error-visible",
        "false"
      );
      formfieldsObjects[i].formfield.parentElement.classList.remove("error");
    }
  }
  return formIsTrue;
}

function confirmValidation() {
  // const valide = true; pour tester le formulaire valide
  if (validate()) {
    console.log("Formulaire valide");
    console.log("firstName", inputFirstName.value);
    console.log("lastName", inputLastName.value);
    console.log("Email", inputEmail.value);
    console.log("message", inputText.value);
    modalTitle.classList.add("hidden");
    modalTitle.classList.remove("visible");
    form.classList.add("hidden");
    form.classList.remove("visible");
    modalTitleValidation.classList.remove("hidden");
    modalTitleValidation.classList.add("visible");
    CloseModalBtn.classList.remove("hidden");
    CloseModalBtn.classList.add("visible");
    ValidateModal.classList.remove("hidden");
    ValidateModal.classList.add("visible");
    CloseModalBtn.focus();

    alreadyValidate = true;
  }
}

export default displayModal;
