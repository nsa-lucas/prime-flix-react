import RoutesApp from './routes';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/ReactToastify.css';

export default function App() {
    return (
        <div className="app">
            <ToastContainer autoClose={3000} theme="light" />
            <RoutesApp />
        </div>
    );
}
