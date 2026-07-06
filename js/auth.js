// ======================================
// RHOCKSTAR CONNECT
// auth.js (PART 1)
// ======================================

import { auth, realtimeDB } from "./firebase.js";

// Firebase Authentication
import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Realtime Database
import {
    ref,
    update,
    onDisconnect
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";


// ======================================
// HTML ELEMENTS
// ======================================

const logoutBtn = document.getElementById("logout");

const dashboard = document.getElementById("dashboard");


// ======================================
// CURRENT PAGE
// ======================================

const currentPage = window.location.pathname
    .split("/")
    .pop();


// ======================================
// AUTH STATE
// ======================================

onAuthStateChanged(auth, async (user) => {

    // ------------------------------
    // USER NOT LOGGED IN
    // ------------------------------

    if (!user) {

        if (
            currentPage === "main.html"
        ) {

            window.location.replace("login.html");

        }

        return;

    }

    // ------------------------------
    // USER LOGGED IN
    // ------------------------------

    if (

        currentPage === "login.html" ||

        currentPage === "register.html"

    ) {

        window.location.replace("main.html");

        return;

    }

    // ------------------------------
    // ONLINE STATUS
    // ------------------------------

    const userRef = ref(

        realtimeDB,

        `users/${user.uid}`

    );

    await update(

        userRef,

        {

            online: true,

            lastSeen: Date.now(),

            typing: false

        }

    );

    onDisconnect(userRef).update({

        online: false,

        lastSeen: Date.now(),

        typing: false

    });

        // ------------------------------
    // SHOW DASHBOARD
    // ------------------------------

    if (dashboard) {

        dashboard.style.display = "";

    }

    // ------------------------------
    // MAKE USER AVAILABLE
    // ------------------------------

    window.currentUser = user;

});


// ======================================
// LOGOUT
// ======================================

if (logoutBtn) {

    logoutBtn.addEventListener("click", async (e) => {

        e.preventDefault();

        try {

            if (auth.currentUser) {

                await update(

                    ref(realtimeDB, `users/${auth.currentUser.uid}`),

                    {

                        online: false,

                        typing: false,

                        lastSeen: Date.now()

                    }

                );

            }

            await signOut(auth);

            window.location.replace("login.html");

        } catch (error) {

            console.error("Logout Error:", error);

            alert("Unable to log out. Please try again.");

        }

    });

}


// ======================================
// EXPORT CURRENT USER
// ======================================

export {

    auth

};
