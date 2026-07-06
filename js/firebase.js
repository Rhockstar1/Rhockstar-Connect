// ======================================
// RHOCKSTAR CONNECT
// firebase.js
// ======================================

// ---------- Firebase App ----------
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

// ---------- Authentication ----------
import {
    getAuth,
    setPersistence,
    browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// ---------- Firestore ----------
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ---------- Storage ----------
import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

// ---------- Analytics ----------
import {
    getAnalytics,
    isSupported
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";


// ======================================
// FIREBASE CONFIG
// ======================================

const firebaseConfig = {
    apiKey: "AIzaSyA-HL4-Cr5tAYZH7GTEZKKMZpHfg42beDY",
    authDomain: "rhockstar-connect.firebaseapp.com",
    projectId: "rhockstar-connect",
    storageBucket: "rhockstar-connect.firebasestorage.app",
    messagingSenderId: "1015640312772",
    appId: "1:1015640312772:web:15c2497a29720b23c33291",
    measurementId: "G-24LGXEWZL6"
};


// ======================================
// INITIALIZE FIREBASE
// ======================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);


// ======================================
// KEEP USER LOGGED IN
// ======================================

setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log("Auth persistence enabled.");
    })
    .catch((error) => {
        console.error("Persistence Error:", error);
    });


// ======================================
// ANALYTICS
// ======================================

let analytics = null;

(async () => {
    if (await isSupported()) {
        analytics = getAnalytics(app);
    }
})();


// ======================================
// EXPORTS
// ======================================

export {
    app,
    auth,
    db,
    storage,
    analytics
};
