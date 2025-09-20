import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBg2bL2paOkJijjebLAIiZa0H_6_pAfgIc",
  authDomain: "delivery-app-87281.firebaseapp.com",
  projectId: "delivery-app-87281",
  storageBucket: "delivery-app-87281.firebasestorage.app",
  messagingSenderId: "1025382797821",
  appId: "1:1025382797821:web:a618dc6db15bb415a28994",
  measurementId: "G-3FJZWENBCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export default app;