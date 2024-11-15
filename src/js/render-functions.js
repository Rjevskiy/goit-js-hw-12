export function displayImages(images, clear = false) {
    const gallery = document.getElementById('gallery');
    // Очищаем галерею, если clear = true
    if (clear) gallery.innerHTML = ''; 
    const markup = images.map(image => `
        <div class="gallery-item">
            <a href="${image.largeImageURL}" class="lightbox">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            </a>
            <div class="info">
                <p>Likes: ${image.likes}</p>
                <p>Views: ${image.views}</p>
                <p>Comments: ${image.comments}</p>
                <p>Downloads: ${image.downloads}</p>
            </div>
        </div>
    `).join('');

    gallery.insertAdjacentHTML('beforeend', markup); 
}
