// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpLVD5T5rVjoOOFqYSqHY5cWY2-s5Urww",
  authDomain: "social-media-mern-f0a9c.firebaseapp.com",
  projectId: "social-media-mern-f0a9c",
  storageBucket: "social-media-mern-f0a9c.appspot.com",
  messagingSenderId: "103271803939",
  appId: "1:103271803939:web:c752fe79e61b342e725596",
  measurementId: "G-BFYVPHH56L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;