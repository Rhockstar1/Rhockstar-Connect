// ======================================
// RHOCKSTAR CONNECT
// login.js (PART 1)
// ======================================

import { auth, realtimeDB } from "./firebase.js";

// Firebase Authentication
import {
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Realtime Database
import {
    ref,
    update
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";


// ======================================
// HTML ELEMENTS
// ======================================

const loginForm = document.getElementById("loginForm");

const loginId = document.getElementById("loginId");

const password = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

const rememberMe = document.getElementById("rememberMe");

const loginBtn = document.getElementById("loginBtn");

const messageBox = document.getElementById("messageBox");


// ======================================
// MESSAGE FUNCTIONS
// ======================================

function showMessage(message, type = "error") {

    messageBox.textContent = message;

    messageBox.style.display = "block";

    messageBox.classList.remove("success", "error");

    messageBox.classList.add(type);

}

function hideMessage() {

    messageBox.textContent = "";

    messageBox.style.display = "none";

}


// ======================================
// PASSWORD TOGGLE
// ======================================

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.innerHTML =
            '<i class="fas fa-eye-slash"></i>';

    } else {

        password.type = "password";

        togglePassword.innerHTML =
            '<i class="fas fa-eye"></i>';

    }

});


// ======================================
// LOGIN
// ======================================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    hideMessage();

    const email = loginId.value.trim().toLowerCase();

    const pass = password.value;

    if (!email)
        return showMessage("Enter your email.");

    if (!pass)
        return showMessage("Enter your password.");

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
        // SIGN IN
        // ======================================

        const userCredential =
            await signInWithEmailAndPassword(

                auth,
                email,
                pass

            );

        const user = userCredential.user;


        // ======================================
        // EMAIL VERIFICATION
        // ======================================

        if (!user.emailVerified) {

            loginBtn.disabled = false;

            loginBtn.textContent = "Login";

            return showMessage(
                "Please verify your email before logging in."
            );

        }


        // ======================================
        // UPDATE REALTIME DATABASE
        // ======================================

        await update(

            ref(realtimeDB, `users/${user.uid}`),

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

        setTimeout(() => {

            window.location.href = "main.html";

        }, 1000);


            } catch (error) {

        console.error(error);

        loginBtn.disabled = false;

        loginBtn.textContent = "Login";

        switch (error.code) {

            case "auth/invalid-credential":

                showMessage(
                    "Incorrect email or password."
                );
                break;

            case "auth/user-not-found":

                showMessage(
                    "Account not found."
                );
                break;

            case "auth/wrong-password":

                showMessage(
                    "Incorrect password."
                );
                break;

            case "auth/invalid-email":

                showMessage(
                    "Invalid email address."
                );
                break;

            case "auth/network-request-failed":

                showMessage(
                    "Network error. Check your internet connection."
                );
                break;

            case "auth/too-many-requests":

                showMessage(
                    "Too many login attempts. Please try again later."
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
