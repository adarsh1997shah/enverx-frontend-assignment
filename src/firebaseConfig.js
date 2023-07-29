// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCmpN7BoyFEu2DfKiJFEqmG3_vSvEhpKko',
	authDomain: 'transaction-tracker-app-30803.firebaseapp.com',
	projectId: 'transaction-tracker-app-30803',
	storageBucket: 'transaction-tracker-app-30803.appspot.com',
	messagingSenderId: '1007319203797',
	appId: '1:1007319203797:web:6be6a20a80b451f6b7075c',
	measurementId: 'G-KWY2LGGVE2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db = getFirestore(app);
