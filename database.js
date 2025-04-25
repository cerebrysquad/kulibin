// Import from Firebase v11.6.1
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAW9QYxE_Us4PpEBknNHpXxf1tHncjvwRE",
  authDomain: "kulibin-180.firebaseapp.com",
  projectId: "kulibin-180",
  storageBucket: "kulibin-180.firebasestorage.app",
  messagingSenderId: "202904655192",
  appId: "1:202904655192:web:6d2480eb50403cd88dc12d",
  measurementId: "G-169NDCLNMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Push test data
async function pushTestData() {
  try {
    const docRef = await addDoc(collection(db, "testCollection"), {
      name: "Test User",
      message: "Hello from GitHub Pages!",
      timestamp: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Run on page load
pushTestData();