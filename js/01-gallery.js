import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallery = document.querySelector('.gallery')
const itemsMarkup = createGalleryImagesMarkup (galleryItems)
let instance

// Створюємо галерею картинок з масиву обєктів
function createGalleryImagesMarkup (galleryItems) {
return galleryItems.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`;
})
.join('');
}

gallery.insertAdjacentHTML('beforeend', itemsMarkup)

// Додаємо слухача події по кліку на картинку
gallery.addEventListener('click', onGalleryImageClick)

function onGalleryImageClick (evt) {
evt.preventDefault();

if (!evt.target.classList.contains('gallery__image')) {
    return;
}
openModal(evt.target)
}

// Відкриття модального вікна з бібліотекою Lightbox
function openModal (image) {
  instance = basicLightbox.create(`
  <img src="${image.dataset.source}">
`)
instance.show()

// Додаємо слухача події на модальне вікно
const modal = document.querySelector('.basicLightbox')
modal.addEventListener('click', closeModal)

// Додаємо слухача події для прослухування клавіші Esc
window.addEventListener('keydown', closeByEsc)
}

// Закриття модального вікна
function closeModal () {
    instance.close() 
    window.removeEventListener('keydown', closeByEsc)  
}

// Закриття модального вікна ESC
function closeByEsc ({code}) {
    if (code === 'Escape') {
        closeModal()
    }
}

