// ======================================
// RHOCKSTAR CONNECT
// login.js
// PART 1
// ======================================

import {
    auth,
    db,
    realtimeDB
} from "./firebase.js";

import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    updateDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    ref,
    update
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";


// ======================================
// VERIFIED HTML IDS
// ======================================

const loginForm = document.getElementById("loginForm");

const loginId = document.getElementById("loginId");

const password = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

const rememberMe = document.getElementById("rememberMe");

const forgotPassword = document.getElementById("forgotPassword");

const loginBtn = document.getElementById("loginBtn");

const messageBox = document.getElementById("messageBox");


// ======================================
// MESSAGE
// ======================================

function showMessage(message, type = "error") {

    messageBox.textContent = message;

    messageBox.className = `message-box ${type}`;

}


// ======================================
// PASSWORD TOGGLE
// ======================================

togglePassword.addEventListener("click", () => {

    password.type =

        password.type === "password"

            ? "text"

            : "password";

});
// ======================================
// LOGIN
// PART 2
// ======================================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    showMessage("", "");

    const login = loginId.value.trim().toLowerCase();

    const pass = password.value;

    if (!login) {

        return showMessage("Enter your email.");

    }

    if (!pass) {

        return showMessage("Enter your password.");

    }

    loginBtn.disabled = true;

    loginBtn.textContent = "Signing In...";

    try {

        // ======================================
        // REMEMBER ME
        // ======================================

        if (rememberMe.checked) {

            await setPersistence(

                auth,

                browserLocalPersistence

            );

        } else {

            await setPersistence(

                auth,

                browserSessionPersistence

            );

        }


        // ======================================
        // FIREBASE LOGIN
        // ======================================

        const userCredential =

            await signInWithEmailAndPassword(

                auth,

                login,

                pass

            );

        const currentUser = userCredential.user;


        // ======================================
        // EMAIL VERIFICATION
        // ======================================

        if (!currentUser.emailVerified) {

            loginBtn.disabled = false;

            loginBtn.textContent = "Login";

            return showMessage(

                "Please verify your email before logging in."

            );

                }
                // ======================================
        // UPDATE FIRESTORE
        // ======================================

        await updateDoc(

            doc(db, "users", currentUser.uid),

            {

                lastLogin: serverTimestamp(),

                updatedAt: serverTimestamp()

            }

        );


        // ======================================
        // UPDATE REALTIME DATABASE
        // ======================================

        await update(

            ref(realtimeDB, `users/${currentUser.uid}`),

            {

                online: true,

                typing: false,

                lastSeen: Date.now()

            }

        );


        // ======================================
        // SUCCESS
        // ======================================

        showMessage(

            "Login successful.",

            "success"

        );

        loginForm.reset();

        setTimeout(() => {

            window.location.href = "main.html";

        }, 1000);
                // ======================================
        // FORGOT PASSWORD
        // ======================================

        forgotPassword.addEventListener("click", async (e) => {

            e.preventDefault();

            const email = loginId.value.trim().toLowerCase();

            if (!email) {

                return showMessage(
                    "Enter your email first."
                );

            }

            try {

                await sendPasswordResetEmail(
                    auth,
                    email
                );

                showMessage(
                    "Password reset email sent.",
                    "success"
                );

            } catch (error) {

                console.error(error);

                switch (error.code) {

                    case "auth/user-not-found":

                        showMessage("No account found.");
                        break;

                    case "auth/invalid-email":

                        showMessage("Invalid email.");
                        break;

                    default:

                        showMessage(error.message);

                }

            }

        );

    } catch (error) {

        console.error(error);

        switch (error.code) {

            case "auth/invalid-credential":

                showMessage("Incorrect email or password.");
                break;

            case "auth/user-not-found":

                showMessage("Account not found.");
                break;

            case "auth/wrong-password":

                showMessage("Incorrect password.");
                break;

            case "auth/invalid-email":

                showMessage("Invalid email address.");
                break;

            case "auth/network-request-failed":

                showMessage("Check your internet connection.");
                break;

            case "auth/too-many-requests":

                showMessage(
                    "Too many attempts. Try again later."
                );
                break;

            default:

                showMessage(error.message);

        }

    } finally {

        loginBtn.disabled = false;

        loginBtn.textContent = "Login";

    }

});
