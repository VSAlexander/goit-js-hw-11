import Notiflix from 'notiflix';
import axios from 'axios';

const input = document.querySelector('#search-form');
const gallery = document.querySelector('.images-list');

input.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  fetchImages(searchQuery.value);
}

async function fetchImages(value) {
  try {
    const response = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: '16135792-2d496ba8b681987b91053eb75',
        q: `${value}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });

    const items = response.data.hits;

    const markup = items
      .map(
        item => `
        <li class="item">
          <img src=${item.webformatURL} alt=${item.tags}/>
          <ul class="statistics-list">
            <li><p>Likes</p><span class="numbers">${item.likes}</span></li>
            <li><p>Views</p><span class="numbers">${item.views}</span></li>
            <li><p>Comments</p><span class="numbers">${item.comments}</span></li>
            <li><p>Downloads</p><span class="numbers">${item.downloads}</span></li>
          </ul>
        </li>`
      )
      .join('');

    gallery.innerHTML += markup;
  } catch (error) {
    console.log(error);
  }
}
