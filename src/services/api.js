// https://api.themoviedb.org/3/movie/now_playing?api_key=369192b2e6d366dec04ec07d7dc925d4&language=en-BR&page=1

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: import.meta.env.VITE_API_KEY,
        language: 'pt-BR',
    },
});

export default api;
