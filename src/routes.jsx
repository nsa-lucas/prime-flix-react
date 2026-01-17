import { Routes, Route, HashRouter } from 'react-router-dom';

import Home from './pages/Home';
import Filme from './pages/Filme';
import Favoritos from './pages/Favoritos';
import Header from './components/Header';
import NotFound from './pages/NotFound';

export default function RoutesApp() {
    return (
        <HashRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filme/:id" element={<Filme />} />
                <Route path="/favoritos" element={<Favoritos />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </HashRouter>
    );
}
