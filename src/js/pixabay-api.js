import axios from 'axios';

export async function fetchImages(query, page = 1) {
    const API_KEY = '46859112-8db04929d193e6e9d044d366e';
    const BASE_URL = 'https://pixabay.com/api/';
    const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=100&page=${page}`;

    const response = await axios.get(url);
    if (response.status !== 200) {
        throw new Error('Ошибка при получении данных');
    }

    // Возвращаем `hits` и `totalHits` для дальнейшей проверки
    return {
        images: response.data.hits,
        totalHits: response.data.totalHits
    };
}
