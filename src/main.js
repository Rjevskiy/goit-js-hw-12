import { fetchImages } from './js/pixabay-api.js';
import { displayImages } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const loader = document.getElementById('loader');
const loadMoreButton = document.getElementById('load-more');
let lightbox;

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

lightbox = new SimpleLightbox('.gallery-item a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250
});

// Функция для загрузки изображений
async function loadImages(query, page = 1) {
    try {
        loader.style.display = 'block';
        const { images, totalHits: hits } = await fetchImages(query, page);

        if (page === 1) {
            totalHits = hits;
            displayImages(images, true);
        } else {
            displayImages(images, false);
        }

        lightbox.refresh();
        const currentImageCount = document.querySelectorAll('.gallery-item').length;

        // Получаем высоту одной карточки галереи
        const galleryItem = document.querySelector('.gallery-item');
        const cardHeight = galleryItem ? galleryItem.getBoundingClientRect().height : 0;

        // Прокручиваем страницу на две высоты карточки и плавная прокрутка
        if (cardHeight > 0) {
            window.scrollBy({
                top: 2 * cardHeight, 
                behavior: 'smooth' 
            });
        }

        // Проверка: скрыть кнопку и показать сообщение
        if (currentImageCount >= totalHits) {
            loadMoreButton.style.display = 'none';
            iziToast.info({
                title: "Info",
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight'
            });
        } else {
            loadMoreButton.style.display = 'block';
        }
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: "Failed to fetch images. Please try again later.",
            position: 'topRight'
        });
    } finally {
        loader.style.display = 'none';
    }
}

// Обработчик формы
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = input.value.trim();

    if (!query) {
        iziToast.warning({
            title: "Warning",
            message: "Please enter a search query!",
            position: 'topRight'
        });
        return;
    }

    currentQuery = query;
    currentPage = 1;
    loadMoreButton.style.display = 'none';
    loadImages(currentQuery, currentPage);
});

// Обработчик  "Load More"
loadMoreButton.addEventListener('click', () => {
    currentPage += 1;
    loadImages(currentQuery, currentPage);
});

