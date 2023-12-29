import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCzZMryaJ1FdRWqIVbo0fLO62Z0mEIT7J0',
  authDomain: 'min-alder-app.firebaseapp.com',
  projectId: 'min-alder-app',
  storageBucket: 'min-alder-app.appspot.com',
  messagingSenderId: '822002979605',
  appId: '1:822002979605:web:04a88586fe950978ea0f1c',
  measurementId: 'G-C288W8H22J',
};

const app = initializeApp(firebaseConfig);
export default getFirestore(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
