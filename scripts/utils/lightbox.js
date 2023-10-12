/**
 * On déclare que la class = lightbox
 * @class
 */
class LightBox {
  /**
   * Creation de la lightbox
   * @constructor
   * @param {Array} mediaArray - Le type de media
   * @param {string} photographer - Le nom du photographe
   */
  // déclare les différentes variables
  constructor(mediaArray, photographer) {
    this.photographer = photographer;
    this.mediaArray = mediaArray;
    this.lightboxBG = document.querySelector(".lightbox-Bg");
    this.lightbox = document.querySelector(".lightbox");
    this.lightboxMediaContainer = document.querySelector(
      ".lightbox_media-Container"
    );
    this.lightboxCloseBtn = document.querySelector(".lightbox_Close-btn");
    this.nextMedia = document.querySelector(".next");
    this.prevMedia = document.querySelector(".prev");
    this.currentMediaIndex = this.getCurrentMediaindex();
    this.prevMediaIndex = this.currentMediaIndex - 1;
    this.nextMediaIndex = this.currentMediaIndex + 1;
  }

  /**
   * Récupère ID du media précédent
   * @returns {string|null} - Id du média actuel ou null si non trouvé.
   */
  getCurrentMediaId() {
    const currentMedia = document.querySelector(".media-link.currentMedia");
    return currentMedia.id;
  }

  /**
   * Mise en place du media actuel
   * @param {string} id - ID du média actuel.
   * @returns {Element|null} - The current media element ou null si non trouvé.
   */
  setCurrentMediaIndex(id) {
    if (this.getCurrentMediaId()) {
      const currentMedia = document.querySelector(".currentMedia");
      currentMedia.classList.remove("currentMedia");
    }
    const currentMedia = document.getElementById(id);
    if (currentMedia) {
      currentMedia.classList.add("currentMedia");
    }
    return currentMedia;
  }

  /**
   * Récupère ID du media actuel
   * @returns {number} - Numéro du média actuel
   */
  getCurrentMediaindex() {
    const currentMediaId = this.getCurrentMediaId();
    return this.mediaArray.findIndex((media) => media.id == currentMediaId);
  }

  /**
   * Récupère le media dont le numéro d'index a été retourné et le lance dans la lightbox
   * @param {number} index - Numéro du média
   */
  getMedia(index) {
    this.lightboxMediaContainer.innerHTML = ""; //vide le champ

    const mediaTitle = this.mediaArray[index].title;
    const titleBlock = document.createElement("figcaption");
    titleBlock.classList.add("LightboxInTitle");
    titleBlock.innerHTML = mediaTitle;

    const mediaSrc = this.getMediaSrc(index);
    const mediaElement = this.getMediaType(index);
    mediaElement.classList.add("LightboxIn");
    mediaElement.setAttribute(
      "src",
      `./assets/images/${this.photographer}/${mediaSrc}`
    ); //ajoute les images du photographe
    mediaElement.setAttribute("alt", mediaTitle); // ajoute le titre
    this.lightboxMediaContainer.setAttribute("aria-labelledby", mediaTitle);
    this.lightboxMediaContainer.appendChild(mediaElement);
    this.lightboxMediaContainer.appendChild(titleBlock);

    const currentMedia = document.querySelector(".currentMedia");
    if (currentMedia) {
      if (
        this.currentMediaIndex > 0 &&
        this.currentMediaIndex < this.mediaArray.length
      ) {
        this.setCurrentMediaIndex(this.mediaArray[index].id);
      }
      if (index === this.mediaArray.length - 1) {
        this.nextMedia.classList.add("hidden");
        this.nextMedia.classList.remove("visible");
      } else {
        this.nextMedia.classList.remove("hidden");
        this.nextMedia.classList.add("visible");
      }
      if (this.currentMediaIndex === 0) {
        this.prevMedia.classList.add("hidden");
        this.prevMedia.classList.remove("visible");
      } else {
        this.prevMedia.classList.remove("hidden");
        this.prevMedia.classList.add("visible");
      }
    }
  }

  /**
   * Récupère le media dont le numéro d'index a été retourné et le lance dans la lightbox
   * @param {number} index - Numéro du média
   * @returns {string} - La source du média (video ou photo)
   */
  getMediaSrc(index) {
    if (this.mediaArray[index].image) {
      return this.mediaArray[index].image;
    }
    if (this.mediaArray[index].video) {
      return this.mediaArray[index].video;
    }
    return "";
  }

  /**
   * Récupère le media dont le numéro d'index a été retourné et le lance dans la lightbox
   * @param {number} index - Numéro du média
   * @returns {HTMLImageElement|HTMLVideoElement} - Affiche l'élement
   */
  getMediaType(index) {
    if (this.getMediaSrc(index) === this.mediaArray[index].image) {
      return document.createElement("img");
    }
    const videoElement = document.createElement("video");
    videoElement.setAttribute("controls", "true"); // ajoute le panneau de control
    return videoElement;
  }

  /**
   * Met à jour le media affiché via la lightbox
   * @param {number} index - Le numéro du média chargé
   */
  getMediaUpdate(index) {
    this.lightboxMediaContainer.innerHTML = ""; //vide le contenu

    const mediaTitle = this.mediaArray[index].title; //déclare la variabl
    const titleBlock = document.createElement("figcaption");
    titleBlock.classList.add("LightboxInTitle"); //ajoute l'élement à lightbox
    titleBlock.innerHTML = mediaTitle; //ajoute le titre

    const mediaSrc = this.getMediaSrc(index); //déclare la variable
    const mediaElement = this.getMediaType(index);
    mediaElement.classList.add("LightboxIn"); //ajoute l'élement à lightbox
    mediaElement.setAttribute(
      "src",
      `./assets/images/${this.photographer}/${mediaSrc}`
    ); //ajoute le media
    mediaElement.setAttribute("alt", mediaTitle); //déclare l'alt

    this.lightboxMediaContainer.appendChild(mediaElement);
    this.lightboxMediaContainer.appendChild(titleBlock);

    const currentMedia = document.querySelector(".currentMedia");
    if (currentMedia) {
      if (
        this.currentMediaIndex > 0 &&
        this.currentMediaIndex < this.mediaArray.length
      ) {
        this.setCurrentMediaIndex(this.mediaArray[index].id);
      }
    }
    if (index === this.mediaArray.length - 1) {
      this.nextMedia.classList.add("hidden");
      this.nextMedia.classList.remove("visible");
    } else {
      this.nextMedia.classList.remove("hidden");
      this.nextMedia.classList.add("visible");
    }
    if (this.currentMediaIndex === 0) {
      this.prevMedia.classList.add("hidden");
      this.prevMedia.classList.remove("visible");
    } else {
      this.prevMedia.classList.remove("hidden");
      this.prevMedia.classList.add("visible");
    }
  }

  /**
   * Ouvre la lightbox.
   */
  open() {
    if (this.lightboxBG) {
      this.lightboxCloseBtn.addEventListener("click", this.close.bind(this));
      this.lightboxCloseBtn.setAttribute("tabindex", "0");
      this.lightboxCloseBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === 13) {
          this.close.bind(this);
        }
      });
      this.lightboxBG.addEventListener("keydown", (e) => {
        if (e.key === "Escape" || e.key === 27) {
          this.close(); //si touche échap, ferme la lightbox
        }
      });

      document.addEventListener("click", (e) => {
        if (e.target === this.lightboxBG && e.target !== this.lightbox) {
          this.close(); //si click lightboxBG ou en dehors de la lightbox, ferme la lightbox
        }
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" || e.key === 27) {
          this.close(); //si touche échap, ferme la lightbox
        }
      });

      this.prevMedia.addEventListener(
        "click",
        this.switchToPreviousMedia.bind(this) //si click chevron droit, ferme la lightbox
      );
      this.nextMedia.addEventListener(
        "click",
        this.switchToNextMedia.bind(this) //si click chevron gauche, ferme la lightbox
      );

      document.addEventListener("keydown", (e) => {
        //vérifie quelle touche a été cliquée
        if (e.key === "ArrowLeft" || e.key === 37) {
          // 37 si flèche droite
          this.switchToPreviousMedia(); // affiche le media précédent
        }
        if (e.key === "ArrowRight" || e.key === 39) {
          // 39 si flèche gauche
          this.switchToNextMedia(); // affiche le media suivant
        }
      });
    }
    if (
      this.currentMediaIndex === 0 && //si le numéro index du média actuel est 0
      this.prevMedia.classList.contains("visible") // afficher le media
    ) {
      this.prevMedia.classList.add("hidden"); //sinon ajouter la classe hidden

      this.prevMedia.classList.remove("visible"); // retirer la classe visible
    } else if (
      this.currentMediaIndex === this.mediaArray.length - 1 && //si le numéro index du média actuel est inférieur au nombre total de media
      this.nextMedia.classList.contains("visible") // affiche le media
    ) {
      this.nextMedia.classList.add("hidden"); //sinon ajouter la classe hidden
      this.nextMedia.classList.remove("visible"); // retirer la classe visible
    }

    const body = document.getElementById("main-photographer"); // déclare la variale body
    body.setAttribute("aria-hidden", "true"); //déclare l'aria de la variable
    this.lightboxBG.classList.remove("hidden");
    this.lightboxBG.classList.add("visible");
    this.lightboxBG.setAttribute("aria-hidden", "false"); //déclare l'aria de la variable
    this.getMedia(this.currentMediaIndex);
  }

  /**
   * Ferme la lightbox.
   */
  close() {
    const currentMedia = document.querySelector(".currentMedia");
    const body = document.getElementById("main-photographer");
    body.setAttribute("aria-hidden", "false");
    this.lightboxBG.classList.remove("visible");
    this.lightboxBG.classList.add("hidden");
    this.lightboxBG.setAttribute("aria-hidden", "true");
    this.lightboxMediaContainer.innerHTML = "";
  }

  /**
   * Switch vers le media suivant.
   */
  switchToNextMedia() {
    this.currentMediaIndex = this.nextMediaIndex;
    this.nextMediaIndex = this.currentMediaIndex + 1;
    this.prevMediaIndex = this.currentMediaIndex - 1;
    this.getMediaUpdate(this.currentMediaIndex);
  }

  /**
   * Switch vers le media précédent.
   */
  switchToPreviousMedia() {
    this.currentMediaIndex = this.prevMediaIndex;
    this.nextMediaIndex = this.currentMediaIndex + 1;
    this.prevMediaIndex = this.currentMediaIndex - 1;
    this.getMediaUpdate(this.currentMediaIndex);
  }
}

export default LightBox;
