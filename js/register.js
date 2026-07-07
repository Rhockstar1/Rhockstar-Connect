// ======================================
// RHOCKSTAR CONNECT
// register.js
// ======================================

import {
    auth,
    db,
    realtimeDB
} from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    ref,
    set
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";


// ======================================
// VERIFIED HTML IDS
// ======================================

const registerForm = document.getElementById("registerForm");

const fullName = document.getElementById("fullName");

const username = document.getElementById("username");

const email = document.getElementById("email");

const password = document.getElementById("password");

const confirmPassword = document.getElementById("confirmPassword");

const togglePassword = document.getElementById("togglePassword");

const strengthBar = document.getElementById("strengthBar");

const terms = document.getElementById("terms");

const registerBtn = document.getElementById("registerBtn");

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
// PASSWORD STRENGTH
// ======================================

password.addEventListener("input", () => {

    const value = password.value;

    let strength = 0;

    if (value.length >= 8) strength++;

    if (/[A-Z]/.test(value)) strength++;

    if (/[a-z]/.test(value)) strength++;

    if (/[0-9]/.test(value)) strength++;

    if (/[^A-Za-z0-9]/.test(value)) strength++;

    strengthBar.className = "";

    if (strength <= 2) {

        strengthBar.classList.add("weak");

    } else if (strength <= 4) {

        strengthBar.classList.add("medium");

    } else {

        strengthBar.classList.add("strong");

    }

});
