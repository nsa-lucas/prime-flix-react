import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import { toast } from 'react-toastify';

export default function Favoritos() {
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const lista_favoritos = localStorage.getItem('@primeflix');

        setFavoritos(JSON.parse(lista_favoritos)) || [];

        lista_favoritos.length === 0 && toast.warn('Nenhum filme adicionado.');
    }, []);

    function removerFilme(id) {
        let backupMovie = favoritos;

        let filter = favoritos.filter(item => {
            return item.id !== id;
        });

        setFavoritos(filter);

        localStorage.setItem('@primeflix', JSON.stringify(filter));

        function desfazer() {
            localStorage.setItem('@primeflix', JSON.stringify(backupMovie));

            setFavoritos(backupMovie);

            toast.success('Filme adicionado novamente!');
        }

        toast.success(() => {
            return (
                <>
                    <span>Filme removido com sucesso!</span>
                    <a className="btnDesfazer" onClick={desfazer}>
                        Desfazer
                    </a>
                </>
            );
        });
    }
    return (
        <div className="container">
            <div className="titleBar">
                <h2>Meus filmes:</h2>
            </div>
            {favoritos.length === 0 && (
                <span className="warn">Nenhum filme adicionado.</span>
            )}

            <div className="contentMovies">
                {favoritos.map(filme => {
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
                                    <a
                                        className="btnRemove"
                                        onClick={() => {
                                            removerFilme(filme.id);
                                        }}
                                    >
                                        Remover
                                    </a>
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
