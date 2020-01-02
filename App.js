import AppContainer from './src/AppContainer';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'YOUR-FIREBASE-API-KEY',
    authDomain: 'YOUR-FIREBASE-PROJECT-DOMAIN',
    databaseURL: 'YOUR-FIREBASE-DATABASE-URL',
    storageBucket: 'YOUR-FIREBASE-STORAGE-BUCKET'
};

firebase.initializeApp(firebaseConfig);

export default AppContainer;
