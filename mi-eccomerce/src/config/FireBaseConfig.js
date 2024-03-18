import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCpa3Grv4a1pyqzLE_dVAJr1PjYKfHS8HM",
    authDomain: "boost-music-db.firebaseapp.com",
    projectId: "boost-music-db",
    storageBucket: "boost-music-db.appspot.com",
    messagingSenderId: "50307290449",
    appId: "1:50307290449:web:b3122fe3e0bb6843b42f70"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)