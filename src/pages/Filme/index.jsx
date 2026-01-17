import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import api from '../../services/api';
import './style.css';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';

export default function Filme() {
    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadFilme() {
            await api
                .get(`movie/${id}`)
                .then(response => {
                    setFilme(response.data);

                    setTimeout(() => setLoading(false), 1000);
                })
                .catch(() => {
                    navigate('/', { replace: true });
                    return;
                });
        }

        loadFilme();
    }, [navigate, id]);

    function handleFavorite() {
        const favoritos = localStorage.getItem('@primeflix');

        let lista_favoritos = JSON.parse(favoritos) || [];

        const hasFilme = lista_favoritos.some(
            lista_favoritos => lista_favoritos.id === filme.id
        );

        if (hasFilme) {
            toast.warn('Esse filme já está na sua lista.');

            return;
        }

        lista_favoritos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(lista_favoritos));

        toast.success('Filme salvo com sucesso!');
    }

    if (loading) return <Loading text={'Carregando detalhes...'} />;

    return (
        <div className="filme-info">
            <div className="content-movie">
                <h1>{filme.title}</h1>
                <img
                    src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
                    alt={filme.title}
                />
                <h3>Sinopse</h3>
                <span>{filme.overview}</span>
                <strong>Avaliação: {filme.vote_average} /10</strong>
                <div className="links">
                    <a
                        className="link"
                        rel="external"
                        href={`https://www.youtube.com/results?search_query=${filme.title}+trailer`}
                        target="blank"
                    >
                        Ver trailer
                    </a>

                    <button
                        onClick={handleFavorite}
                        className="link"
                        type="submit"
                    >
                        Adicionar aos favoritos
                    </button>
                </div>
            </div>
        </div>
    );
}
