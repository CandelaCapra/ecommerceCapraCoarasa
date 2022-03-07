import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore' 

const firebaseConfig = {
  apiKey: "AIzaSyDhbbvO71r7NGDCW_iiwX0Fcs4yEn9QM5M",
  authDomain: "ecommerce-bimba.firebaseapp.com",
  projectId: "ecommerce-bimba",
  storageBucket: "ecommerce-bimba.appspot.com",
  messagingSenderId: "408392777712",
  appId: "1:408392777712:web:47a057c468f300dc78a735"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);