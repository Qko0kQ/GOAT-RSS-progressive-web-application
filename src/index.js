import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase";

const config = {
    apiKey: "AIzaSyDcPG3URrK1keiRvgvvKBCqQkBatgpCnes",
    authDomain: "rss-pwa-ba0d0.firebaseapp.com",
    databaseURL: "https://rss-pwa-ba0d0.firebaseio.com",
    projectId: "rss-pwa-ba0d0",
    storageBucket: "rss-pwa-ba0d0.appspot.com",
    messagingSenderId: "764595055848"
};
firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).catch(err => console.log(err));

const link = document.createElement('link');
link.rel = "manifest";
if (process.env.NODE_ENV === 'development') {
    link.href = "manifest-dev.json";
} else {
    link.href = "manifest.json";
}
document.head.appendChild(link);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
