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

// Глобальные переменные для отслеживания состояния поиска
let currentPage = 1;
let currentQuery = '';

// Инициализация SimpleLightbox
lightbox = new SimpleLightbox('.gallery-item a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250
});

// Функция для загрузки изображений
async function loadImages(query, page = 1) {
    try {
        loader.style.display = 'block';
        const images = await fetchImages(query, page);

        if (page === 1) {
            displayImages(images, true); // Очищаем галерею при первом запросе
        } else {
            displayImages(images, false); // Добавляем изображения к существующим при загрузке доп. страниц
        }

        lightbox.refresh();
        loadMoreButton.style.display = images.length === 15 ? 'block' : 'none'; // Показ кнопки только если есть еще изображения

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
    loadMoreButton.style.display = 'none'; // Скрываем кнопку перед загрузкой
    loadImages(currentQuery, currentPage);
});

// Обработчик для кнопки "Load More"
loadMoreButton.addEventListener('click', () => {
    currentPage += 1;
    loadImages(currentQuery, currentPage);
});
