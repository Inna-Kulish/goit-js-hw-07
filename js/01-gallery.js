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
instance = basicLightbox.create(
  `<img src="${image.dataset.source}"/>`,
  {
    onShow: instance => {
      window.addEventListener('keydown', closeByEsc);
    },
    onClose: instance => {
      window.removeEventListener('keydown', closeByEsc);
    },
  }
);
instance.show();
}

// Закриття модального вікна ESC
function closeByEsc ({code}) {
    if (code === 'Escape') {
        instance.close()
    }
}