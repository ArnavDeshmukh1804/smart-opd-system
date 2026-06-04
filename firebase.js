const firebaseConfig = {

  apiKey: "AIzaSyC8U_1w-bvEZIAA5_KraM_KjsK3DN-pX00",

  authDomain: "smart-opd-system-f3f82.firebaseapp.com",

  projectId: "smart-opd-system-f3f82",

  storageBucket: "smart-opd-system-f3f82.firebasestorage.app",

  messagingSenderId: "1047996365446",

  appId: "1:1047996365446:web:6c050e72b3e20bd0e6af07"
};

// INITIALIZE FIREBASE

firebase.initializeApp(firebaseConfig);

// FIRESTORE DATABASE

const db = firebase.firestore();