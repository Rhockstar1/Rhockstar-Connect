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

// ======================================
// REGISTER FORM
// ======================================

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    showMessage("", "");

    const name = fullName.value.trim();

    const user = username.value.trim().toLowerCase();

    const mail = email.value.trim().toLowerCase();

    const pass = password.value;

    const confirm = confirmPassword.value;


    // ======================================
    // VALIDATION
    // ======================================

    if (!name) {

        return showMessage("Full name is required.");

    }

    if (!user) {

        return showMessage("Username is required.");

    }

    if (user.length < 3) {

        return showMessage("Username must be at least 3 characters.");

    }

    if (!/^[a-zA-Z0-9._]+$/.test(user)) {

        return showMessage(
            "Username can only contain letters, numbers, dot and underscore."
        );

    }

    if (!mail) {

        return showMessage("Email is required.");

    }

    if (!pass) {

        return showMessage("Password is required.");

    }

    if (pass.length < 8) {

        return showMessage(
            "Password must be at least 8 characters."
        );

    }

    if (!/[A-Z]/.test(pass)) {

        return showMessage(
            "Password must contain an uppercase letter."
        );

    }

    if (!/[a-z]/.test(pass)) {

        return showMessage(
            "Password must contain a lowercase letter."
        );

    }

    if (!/[0-9]/.test(pass)) {

        return showMessage(
            "Password must contain a number."
        );

    }

    if (!/[^A-Za-z0-9]/.test(pass)) {

        return showMessage(
            "Password must contain a special character."
        );

    }

    if (pass !== confirm) {

        return showMessage(
            "Passwords do not match."
        );

    }

    if (!terms.checked) {

        return showMessage(
            "Please agree to the Terms & Privacy Policy."
        );

    }

    registerBtn.disabled = true;

    registerBtn.textContent = "Creating Account...";

    try {

        const userCredential =
            await createUserWithEmailAndPassword(

                auth,
                mail,
                pass

            );

        const currentUser = userCredential.user;
                // ======================================
        // UPDATE AUTH PROFILE
        // ======================================

        await updateProfile(currentUser, {

            displayName: name

        });


        // ======================================
        // SEND EMAIL VERIFICATION
        // ======================================

        await sendEmailVerification(currentUser);


        // ======================================
        // SAVE TO FIRESTORE
        // ======================================

        await setDoc(

            doc(db, "users", currentUser.uid),

            {

                uid: currentUser.uid,

                fullName: name,

                username: user,

                email: mail,

                profilePhoto: "",

                coverPhoto: "",

                bio: "",

                website: "",

                verified: false,

                accountType: "user",

                followers: 0,

                following: 0,

                posts: 0,

                createdAt: serverTimestamp(),

                updatedAt: serverTimestamp()

            }

        );


        // ======================================
        // SAVE TO REALTIME DATABASE
        // ======================================

        await set(

            ref(realtimeDB, `users/${currentUser.uid}`),

            {

                uid: currentUser.uid,

                fullName: name,

                username: user,

                email: mail,

                online: true,

                typing: false,

                lastSeen: Date.now()

            }

        );
                // ======================================
        // SUCCESS
        // ======================================

        showMessage(

            "Account created successfully! Please verify your email before logging in.",

            "success"

        );

        registerForm.reset();

        strengthBar.className = "";

        registerBtn.disabled = false;

        registerBtn.textContent = "Create Account";

        setTimeout(() => {

            window.location.href = "login.html";

        }, 2500);

    } catch (error) {

        console.error(error);

        switch (error.code) {

            case "auth/email-already-in-use":

                showMessage("This email is already registered.");
                break;

            case "auth/invalid-email":

                showMessage("Please enter a valid email address.");
                break;

            case "auth/weak-password":

                showMessage("Password is too weak.");
                break;

            case "auth/network-request-failed":

                showMessage("Network error. Check your internet connection.");
                break;

            default:

                showMessage(error.message);

        }

    } finally {

        registerBtn.disabled = false;

        registerBtn.textContent = "Create Account";

    }

});
