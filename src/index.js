import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './css/main.css';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { AuthProvider } from "./state/AuthContext";
import { ModalProvider } from "./state/ModalContext";
import axios from "axios";
import { initMiddleware } from "devise-axios";

axios.defaults.baseURL = 'https://liftr-server.herokuapp.com/'
// axios.defaults.baseURL = "http://localhost:3005/"

initMiddleware();


ReactDOM.render(
    <AuthProvider>
        <ModalProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ModalProvider>
    </AuthProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
