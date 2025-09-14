import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD8WPcDIvb2Nj5flmahn98CvnX0MkC7NcA",
  authDomain: "chat-realtime-f6f14.firebaseapp.com",
  projectId: "chat-realtime-f6f14",
  storageBucket: "chat-realtime-f6f14.firebasestorage.app",
  messagingSenderId: "131627154557",
  appId: "1:131627154557:web:35d3f71deb282acbb18514",
};

// Initialize
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

