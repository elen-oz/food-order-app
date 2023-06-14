import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBB4OM2WILBhhNQJGy3Y-kX2Hmx1gsVWa4',
  authDomain: 'food-order-app-9b4ad.firebaseapp.com',
  databaseURL: 'https://food-order-app-9b4ad-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'food-order-app-9b4ad',
  storageBucket: 'food-order-app-9b4ad.appspot.com',
  messagingSenderId: '444279917481',
  appId: '1:444279917481:web:ccf188d073e5bfff7052b8',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init service
const projectFirestore = firebase.firestore();

export { projectFirestore };
