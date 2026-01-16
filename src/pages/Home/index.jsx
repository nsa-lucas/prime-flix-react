import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Loading from '../../components/Loading';
import './style.css';

export default function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get('movie/now_playing', {
                params: {
                    page: page,
                },
            });

            setFilmes(response.data.results);

            setTimeout(() => setLoading(false), 1200);
        }

        loadFilmes();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="container">
            <div className="titleBar">
                <h2>Filmes em cartaz:</h2>
            </div>
            <div className="contentMovies">
                {filmes.map(filme => {
                    return (
                        <article className="movie" key={filme.id}>
                            <strong className="movieTitle">
                                {filme.title}
                            </strong>
                            <div className="movieBanner">
                                <div className="options">
                                    <Link to={`/filme/${filme.id}`}>
                                        Detalhes
                                    </Link>
                                </div>
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                                    alt={filme.title}
                                />
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
