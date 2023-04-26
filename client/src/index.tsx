import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import NotificationArea from './features/Notifications/NotificationArea';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <StrictMode>
        <Provider store={store}>
            <App />
            <NotificationArea />
        </Provider>
    </StrictMode>,
);
