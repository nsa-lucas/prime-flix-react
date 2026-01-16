import {Link} from 'react-router-dom';

import './style.css';

export default function Header() {
    return (
        <header>
            <div className="content">
                <Link className="logo" to="/">
                    Prime Flix
                </Link>
                <Link className="favorites" to="/favoritos">
                    Meus filmes
                </Link>
            </div>
        </header>
    );
}
