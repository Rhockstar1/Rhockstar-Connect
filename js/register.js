// ======================================
// register.js (PART 1)
// ======================================

import { auth, db, realtimeDB } from "./firebase.js";

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
// HTML IDS (Verified)
// ======================================

const registerForm = document.getElementById("registerForm");

const fullName = document.getElementById("fullName");

const username = document.getElementById("username");

const email = document.getElementById("email");

const phone = document.getElementById("phone");

const password = document.getElementById("password");

const confirmPassword = document.getElementById("confirmPassword");

const registerBtn = document.getElementById("registerBtn");

const terms = document.getElementById("terms");

const showPassword = document.getElementById("showPassword");

const showConfirmPassword = document.getElementById("showConfirmPassword");

const messageBox = document.getElementById("messageBox");


// ======================================
// MESSAGE
// ======================================

function showMessage(message, type = "error") {

    if (!messageBox) return;

    messageBox.textContent = message;

    messageBox.className = type;

}


// ======================================
// PASSWORD TOGGLE
// ======================================

if (showPassword) {

    showPassword.addEventListener("click", () => {

        password.type =
            password.type === "password"
                ? "text"
                : "password";

    });

}

if (showConfirmPassword) {

    showConfirmPassword.addEventListener("click", () => {

        confirmPassword.type =
            confirmPassword.type === "password"
                ? "text"
                : "password";

    });

}

// ======================================
// REGISTER
// ======================================

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        if (!terms.checked) {

            return showMessage(
                "You must agree to the Terms and Conditions."
            );

        }

        if (password.value !== confirmPassword.value) {

            return showMessage(
                "Passwords do not match."
            );

        }

        if (password.value.length < 8) {

            return showMessage(
                "Password must be at least 8 characters."
            );

        }

        registerBtn.disabled = true;

        registerBtn.textContent = "Creating Account...";

        try {

            const userCredential =
                await createUserWithEmailAndPassword(

                    auth,

                    email.value.trim().toLowerCase(),

                    password.value

                );

            const user = userCredential.user;

            await updateProfile(user, {

                displayName: fullName.value.trim()

            });

            await sendEmailVerification(user);

            // CONTINUE PART 3

        } catch (error) {

            console.error(error);

            registerBtn.disabled = false;

            registerBtn.textContent = "Create Account";

            switch (error.code) {

                case "auth/email-already-in-use":

                    showMessage("Email already exists.");
                    break;

                case "auth/invalid-email":

                    showMessage("Invalid email address.");
                    break;

                case "auth/weak-password":

                    showMessage("Password is too weak.");
                    break;

                case "auth/network-request-failed":

                    showMessage("Check your internet connection.");
                    break;

                default:

                    showMessage(error.message);

            }

        }

    });

}
// ======================================
// SAVE USER TO FIRESTORE
// ======================================

            await setDoc(

                doc(db, "users", user.uid),

                {

                    uid: user.uid,

                    fullName: fullName.value.trim(),

                    username: username.value.trim().toLowerCase(),

                    email: email.value.trim().toLowerCase(),

                    phone: phone.value.trim(),

                    profilePhoto: "",

                    coverPhoto: "",

                    occupation: "",

                    bio: "",

                    website: "",

                    state: "",

                    country: "",

                    followersCount: 0,

                    followingCount: 0,

                    postsCount: 0,

                    profileViews: 0,

                    verified: false,

                    accountType: "user",

                    createdAt: serverTimestamp(),

                    updatedAt: serverTimestamp()

                }

            );


// ======================================
// SAVE USER TO REALTIME DATABASE
// ======================================

            await set(

                ref(realtimeDB, `users/${user.uid}`),

                {

                    uid: user.uid,

                    fullName: fullName.value.trim(),

                    username: username.value.trim().toLowerCase(),

                    online: true,

                    typing: false,

                    lastSeen: Date.now()

                }

            );


// ======================================
// SUCCESS
// ======================================

            showMessage(

                "Account created successfully. Please verify your email before logging in.",

                "success"

            );

            registerForm.reset();

            registerBtn.disabled = false;

            registerBtn.textContent = "Create Account";

            setTimeout(() => {

                window.location.href = "login.html";

            }, 3000);

        } finally {

            registerBtn.disabled = false;

            registerBtn.textContent = "Create Account";

        }

    });

}


// ======================================
// EXPORT (OPTIONAL)
// ======================================

export {
    showMessage
};
