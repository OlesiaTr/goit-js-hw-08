// import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line

import { galleryItems } from './gallery-items';
// Change code below this line

const refs = {
  gallery: document.querySelector('.gallery'),
};

const galleryList = galleryItems.map(({ preview, original, description }) => {
  return ` <div class="gallery__item">
  <a class="gallery__item" href="${original}">
  <img 
  class="gallery__image" 
  src="${preview}" 
  alt="${description}" />
</a>
  </div>`;
});

const galleryMarkup = galleryList.join(' ');
refs.gallery.insertAdjacentHTML('afterbegin', galleryMarkup);

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  close: false,
});
