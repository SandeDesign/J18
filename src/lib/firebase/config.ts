import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDTgym192TZLd5JgF2rzV8ElXK0oB8zpbs",
  authDomain: "jonnarincon-d5650.firebaseapp.com",
  projectId: "jonnarincon-d5650",
  storageBucket: "jonnarincon-d5650.firebasestorage.app",
  messagingSenderId: "433504539892",
  appId: "1:433504539892:web:24745d134e41e8751d7aa1"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error;
}

export { app, auth, db, storage };
export default app;
