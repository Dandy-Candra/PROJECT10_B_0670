import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  //tambahkan firebaseConfig project
  apiKey: "AIzaSyCeg5wDLncK5NO4ZwmB6D5BTK4t8i9RafA",
  authDomain: "vuefire0670.firebaseapp.com",
  projectId: "vuefire0670",
  storageBucket: "vuefire0670.appspot.com",
  messagingSenderId: "674927806845",
  appId: "1:674927806845:web:3d7a725e614abd57b7e414"
}

//tambahkan code untuk menginisialisasikan Firebase
const firebaseApp = initializeApp(firebaseConfig);


//tambahkan code untuk menginisialisasikan Realtime Database 
//dan mendapatkan referensi ke database tersebut
export const db = getDatabase(firebaseApp);
