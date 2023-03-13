import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB8aqs6n3eAVK2w6VZMbWr5DUJ8srAN8iY',
  authDomain: 'chatgpt-mayyur-com.firebaseapp.com',
  projectId: 'chatgpt-mayyur-com',
  storageBucket: 'chatgpt-mayyur-com.appspot.com',
  messagingSenderId: '595971688025',
  appId: '1:595971688025:web:57ea82ea6c8b7e8f64d348',
  measurementId: 'G-496B051VGR',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
