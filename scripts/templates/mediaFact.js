/**
 * Classe représentant un média.
 * @class
 */

class Media {
    /**
     * Création instance de Media.
     * @constructor
     * @param {number} id - ID du média.
     * @param {string} title - titre du média.
     * @param {number} likes - nombre de likes du média.
     * @param {string} date - date du média.
     */
    constructor(id, title, likes, date) {
      this.id = id;
      this.title = title;
      this.likes = likes;
      this.date = date;
    }
  
    /**
     * Augmente le nombre de likes du média de 1.
     * @returns {number} Le nouveau nombre de likes du média.
     */
    increaseLikes() {
      this.likes += 1;
      return this.likes;
    }
  
    /**
     * Diminue le nombre de likes du média de 1.
     * @returns {number} Le nouveau nombre de likes du média.
     */
    decreaseLikes() {
      this.likes -= 1;
      return this.likes;
    }
  
    /**
     * ID du média.
     * @returns {number} ID du média.
     */
    getMediaId() {
      return this.id;
    }
  }
  
  /**
   * Classe représentant une image, hérite de la classe Media.
   * @class
   */
  class Image extends Media { // image provient de media
    /**
     * Création instance de Image.
     * @constructor
     * @param {number} id - ID de l'image.
     * @param {string} title -btitre de l'image.
     * @param {number} likes - nombre de likes de l'image.
     * @param {string} date - date de l'image.
     * @param {string} image - nom du fichier
     */
    constructor(id, title, likes, date, image) {
      super(id, title, likes, date);
      this.image = image;
    }
  
    /**
     * Obtient le DOM de la carte du média.
     * @param {string} name - nom du répertoire contenant l'image.
     * @returns {HTMLElement} DOM de la carte du média.
     */
    get_Media_Card_DOM(name) {
      const path = `./assets/images/${name}/${this.image}`;
  
      // Création des éléments du DOM
      const mediaCard = document.createElement('article'); // création élément
      mediaCard.classList.add('media-card');//ajout class dans media-card
  
      // Création du lien du container
      const mediaLink = document.createElement('a');
      mediaLink.classList.add('media-link');//ajout de l'élement dans la class
      mediaLink.id = this.id;
      mediaLink.setAttribute('aria-label', `${this.title}, Vue rapprochée`);
      mediaLink.setAttribute('tabindex', '0');
      mediaLink.setAttribute('role', 'button');
      mediaLink.setAttribute('type', 'image/jpg');
      mediaLink.id = this.id;
  
      // Création du container du media
      const imgContainer = document.createElement('div');// création élément
      imgContainer.classList.add('media-container');//ajout de l'élement dans la class
  
      // Création de l'image
      const img = document.createElement('img');// création élément
      img.classList.add('media');//ajout de l'élement dans la class
      img.setAttribute('src', path);
      img.setAttribute('aria-labelledby', `${this.id}`);
  
      // Création des infos du media
      const MediasInfos = document.createElement('div');
      MediasInfos.classList.add('media-infos');
      MediasInfos.setAttribute('role', 'contentinfo');
  
      // Création du titre du media
      const mediaTitle = document.createElement('h2');
      mediaTitle.classList.add('media-title');
      mediaTitle.textContent = this.title;
  
      // Création du nombre de likes du media
      const mediaLikes = document.createElement('p');
      mediaLikes.classList.add('media-likes');
      mediaLikes.textContent = `${this.likes} `;
      mediaLikes.setAttribute('aria-label', `${this.likes} likes`);
  
      const mediaLikesIcon = document.createElement('i');
      mediaLikesIcon.classList.add('far', 'fa-heart');
      mediaLikes.appendChild(mediaLikesIcon);
      
  
      mediaLikes.addEventListener('click', (e) => {
        e.stopPropagation(); // Ajout de la ligne pour empêcher la propagation de l'événement "e"
        if (!mediaLikes.classList.contains('liked')) {
          const newLikes = this.increaseLikes();
          mediaLikes.classList.add('liked');
          mediaLikesIcon.classList.remove('far');
          mediaLikesIcon.classList.add('fas');
          mediaLikes.textContent = `${newLikes} `;
          const totalLikes = document.querySelector('.TotalLikes');
          totalLikes.innerHTML = `${Number(totalLikes.textContent) + 1
            } <i aria-label=' ${totalLikes.textContent} likes' class='fas fa-heart' aria-hidden='true'></i>`;
          mediaLikes.appendChild(mediaLikesIcon);
        } else {
          const newLikes = this.decreaseLikes();
          mediaLikes.classList.remove('liked');
          mediaLikesIcon.classList.remove('fas');
          mediaLikesIcon.classList.add('far');
  
          mediaLikes.textContent = `${newLikes} `;
          const totalLikes = document.querySelector('.TotalLikes');
          totalLikes.innerHTML = `${Number(totalLikes.textContent) - 1
            } <i aria-label='${totalLikes.textcontent} likes' class='fas fa-heart' aria-hidden='true'></i>`;
          mediaLikes.appendChild(mediaLikesIcon);
        }
      });
  
      // Ajout des éléments au DOM
      mediaLink.appendChild(mediaCard);
      mediaCard.appendChild(imgContainer);
      MediasInfos.appendChild(mediaTitle);
      MediasInfos.appendChild(mediaLikes);
      mediaCard.appendChild(MediasInfos);
      imgContainer.appendChild(img);
      mediaCard.appendChild(MediasInfos);
  
      return mediaLink;
    }
  
    /**
     * Obtient le DOM de la lightbox du média.
     * @param {string} name - nom du répertoire contenant l'image.
     * @returns {HTMLElement} DOM de la lightbox du média.
     */
    get_Media_Lightbox_DOM(name) {
      const path = `./assets/images/${name}/${this.image}`;
  
      // Création des éléments du DOM
      const lightboxMediaCard = document.createElement('figure');
      lightboxMediaCard.classList.add('lightbox_media-card');
  
      const lightboxMedia = document.createElement('img');
      lightboxMedia.classList.add('media');
      lightboxMedia.setAttribute('src', path);
      lightboxMedia.setAttribute('aria-label', `${this.title}, vue rapprochée`);
      lightboxMedia.setAttribute('alt', `${this.title}`);
      lightboxMedia.setAttribute('type', 'image/jpg');
      lightboxMedia.id = this.id;
  
      // Création du titre du media
      const h2Container = document.createElement('figcaption');
      const lightboxMediaTitle = document.createElement('h2');
      lightboxMediaTitle.classList.add('media-title');
      lightboxMediaTitle.textContent = this.title;
      h2Container.appendChild(lightboxMediaTitle);
  
      // Ajout des éléments au DOM
      lightboxMediaCard.appendChild(lightboxMedia);
      lightboxMediaCard.appendChild(h2Container);
  
      return lightboxMediaCard;
    }
  }
  
  /**
   * Classe représentant une vidéo, héritant de la classe Media.
   * @class
   */
  class Video extends Media {
    /**
     * Crée une instance de Video.
     * @constructor
     * @param {number} id - ID de la vidéo.
     * @param {string} title - titre de la vidéo.
     * @param {number} likes - nombre de likes de la vidéo.
     * @param {string} date - date de la vidéo.
     * @param {string} video - nom de fichier de la vidéo.
     */
    constructor(id, title, likes, date, video) {
      super(id, title, likes, date);
      this.video = video;
    }
  
    /**
     * Obtient le DOM de la carte du média.
     * @param {string} name - nom du répertoire contenant la vidéo.
     * @returns {HTMLElement} DOM de la carte du média.
     */
    get_Media_Card_DOM(name) {
      const path = `./assets/images/${name}/${this.video}`;
  
      // Création des éléments du DOM
      const mediaCard = document.createElement('article');
      mediaCard.classList.add('media-card');
  
      // Création du lien du container
      const mediaLink = document.createElement('a');
      mediaLink.classList.add('media-link');
      mediaLink.setAttribute('aria-label', `${this.title}, Vue rapprochée`);
      mediaLink.setAttribute('tabindex', '0');
      mediaLink.setAttribute('role', 'button');
      mediaLink.id = this.id;
  
      // Création du container du media
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('media-container');
  
      // Création de la vidéo
      const video = document.createElement('video');
      video.classList.add('media');
      video.setAttribute('src', path);
      video.setAttribute('alt', '');
      video.setAttribute('type', 'video/mp4');
  
      // Création des infos du media
      const MediasInfos = document.createElement('div');
      MediasInfos.classList.add('media-infos');
      MediasInfos.setAttribute('role', 'contentinfo');
  
      // Création du titre du media
      const mediaTitle = document.createElement('h2');
      mediaTitle.classList.add('media-title');
      mediaTitle.textContent = this.title;
  
      // Création du nombre de likes du media
      const mediaLikes = document.createElement('p');
      mediaLikes.classList.add('media-likes');
      mediaLikes.innerHTML = `${this.likes} `;
      mediaLikes.setAttribute('aria-label',`${this.likes} likes`);
      mediaLikes.setAttribute('aria-atomic','true');
      const mediaLikesIcon = document.createElement('i');
      mediaLikesIcon.classList.add('far', 'fa-heart');
      mediaLikes.appendChild(mediaLikesIcon);
      mediaLikes.addEventListener('click', (e) => {
        e.stopPropagation(); // Ajout de la ligne pour empêcher la propagation de l'événement
        if (!mediaLikes.classList.contains('liked')) {
          const newLikes = this.increaseLikes();
          mediaLikes.classList.add('liked');
          mediaLikesIcon.classList.remove('far');
          mediaLikesIcon.classList.add('fas');
          mediaLikes.innerHTML = `${newLikes} `;
          const totalLikes = document.querySelector('.TotalLikes');
          totalLikes.innerHTML = `${Number(totalLikes.textContent) + 1
            } <i aria-label='${totalLikes.textcontent} likes' class='fas fa-heart'></i>`;
          mediaLikes.appendChild(mediaLikesIcon);
        } else {
          const newLikes = this.decreaseLikes();
          mediaLikes.classList.remove('liked');
          mediaLikesIcon.classList.remove('fas');
          mediaLikesIcon.classList.add('far');
          mediaLikesIcon.setAttribute('aria-hidden', 'false');
          mediaLikes.textContent = `${newLikes} `;
          const totalLikes = document.querySelector('.TotalLikes');
          totalLikes.innerHTML = `${Number(totalLikes.textContent) - 1
            } <i aria-label='likes' class='fas fa-heart' aria-hidden='true'></i>`;
          mediaLikes.appendChild(mediaLikesIcon);
        }
      });
  
      // Ajout des éléments au DOM
      mediaLink.appendChild(mediaCard);
      mediaCard.appendChild(imgContainer);
      MediasInfos.appendChild(mediaTitle);
      MediasInfos.appendChild(mediaLikes);
      mediaCard.appendChild(MediasInfos);
      imgContainer.appendChild(video);
      mediaCard.appendChild(MediasInfos);
      return mediaLink;
    }
  
    /**
     * Obtient le DOM de la lightbox du média.
     * @param {string} name - nom du répertoire contenant la vidéo.
     * @returns {HTMLElement} DOM de la lightbox du média.
     */
    get_Media_Lightbox_DOM(name) {
      const path = `./assets/images/${name}/${this.video}`;
  
      // Création des éléments du DOM
      const lightboxMediaCard = document.createElement('figure');
      lightboxMediaCard.classList.add('lightbox_media-card');
  
      const lightboxMedia = document.createElement('video');
      lightboxMedia.classList.add('media');
      lightboxMedia.setAttribute('src', path);
      lightboxMedia.setAttribute('aria-label', `${this.title}, vue rapprochée`);
      lightboxMedia.setAttribute('controls', 'True');
      lightboxMedia.setAttribute('autoplay', 'True');
      lightboxMedia.setAttribute('type', 'video/mp4');
      lightboxMedia.id = this.id;
  
      // Création du titre du media
      const h2Container = document.createElement('figcaption');
      const lightboxMediaTitle = document.createElement('h2');
      lightboxMediaTitle.classList.add('media-title');
      lightboxMediaTitle.textContent = this.title;
      h2Container.appendChild(lightboxMediaTitle);
  
      // Ajout des éléments au DOM
      lightboxMediaCard.appendChild(lightboxMedia);
      lightboxMediaCard.appendChild(h2Container);
  
      return lightboxMediaCard;
    }
  }
  
  /**
   * Fabrique de médias.
   * @function
   * @param {Array} Medias - Les médias à créer.
   * @returns {Object} Un objet contenant les éléments médias et le total de likes.
   */
  function MediaFact(Medias) {
    const mediaElements = [];
    let TotalizeLikes = 0;
    Medias.forEach((element) => {
      if (element.image) {
        const filetype = element.image;
        const mediaElement = new Image(
          element.id,
          element.title,
          element.likes,
          element.date,
          filetype
        );
        TotalizeLikes += element.likes;
        mediaElements.push(mediaElement);
      } else if (element.video) {
        const filetype = element.video;
        const mediaElement = new Video(
          element.id,
          element.title,
          element.likes,
          element.date,
          filetype
        );
        TotalizeLikes += element.likes;
        mediaElements.push(mediaElement);
      }
    });
  
    return {
      mediaElements,
      TotalizeLikes
    };
  }
  
  export default MediaFact;