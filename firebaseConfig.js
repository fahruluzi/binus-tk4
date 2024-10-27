import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Replace with your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAuFKQydPQe1ZXrlMxJWNvMWlBz1F9QilA",
    authDomain: "binus-tk4-919f1.firebaseapp.com",
    projectId: "binus-tk4-919f1",
    storageBucket: "binus-tk4-919f1.appspot.com",
    messagingSenderId: "695556696842",
    appId: "1:695556696842:web:2e05351f1816fa149fa8f3",
    measurementId: "G-TMNYB3G2CK"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
