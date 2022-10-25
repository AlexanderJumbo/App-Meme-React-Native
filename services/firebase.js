import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyAEZGi3LlUzjqThCUNVQM1P9OCYvyxyuKY',
  authDomain: 'meme-app-10cd4.firebaseapp.com',
  projectId: 'meme-app-10cd4',
  storageBucket: 'meme-app-10cd4.appspot.com',
  messagingSenderId: '1073389454326',
  appId: '1:1073389454326:web:49d524c8857f91acccfdd7',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
