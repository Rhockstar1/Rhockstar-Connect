// ======================================
// RHOCKSTAR CONNECT
// register.js (PART 1)
// ======================================

import { auth, db, realtimeDB } from "./firebase.js";

// Firebase Authentication
import {
    createUserWithEmailAndPassword,
    sendEmailVerification
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Firestore
import {
    doc,
    setDoc,
    getDocs,
    collection,
    query,
    where,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Realtime Database
import {
    ref,
    set
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";


// ======================================
// HTML ELEMENTS
// ======================================

const registerForm = document.getElementById("registerForm");
const fullName = document.getElementById("fullName");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const togglePassword = document.getElementById("togglePassword");
const strengthBar = document.getElementById("strengthBar");
const registerBtn = document.getElementById("registerBtn");
const terms = document.getElementById("terms");
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
        togglePassword.innerHTML = '<i class="fas fa-eye-slash"></i>';

    } else {

        password.type = "password";
        togglePassword.innerHTML = '<i class="fas fa-eye"></i>';

    }

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

    strengthBar.style.width = (strength * 20) + "%";

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
// REGISTER
// ======================================

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    hideMessage();

    const fullNameValue = fullName.value.trim();

    const usernameValue = username.value
        .trim()
        .toLowerCase();

    const emailValue = email.value
        .trim()
        .toLowerCase();

    const passwordValue = password.value;

    const confirmPasswordValue = confirmPassword.value;

    if (!fullNameValue)
        return showMessage("Enter your full name.");

    if (!usernameValue)
        return showMessage("Enter a username.");

    if (usernameValue.length < 3)
        return showMessage("Username must be at least 3 characters.");

    if (!emailValue)
        return showMessage("Enter your email.");

    if (!passwordValue)
        return showMessage("Enter your password.");

    if (passwordValue.length < 8)
        return showMessage("Password must be at least 8 characters.");

    if (passwordValue !== confirmPasswordValue)
        return showMessage("Passwords do not match.");

    if (!terms.checked)
        return showMessage("Accept the Terms & Conditions.");

    registerBtn.disabled = true;

    registerBtn.textContent = "Creating Account...";

    try {
            // ======================================
        // CHECK USERNAME
        // ======================================

        const usernameQuery = query(
            collection(db, "users"),
            where("username", "==", usernameValue)
        );

        const usernameSnapshot = await getDocs(usernameQuery);

        if (!usernameSnapshot.empty) {

            registerBtn.disabled = false;
            registerBtn.textContent = "Create Account";

            return showMessage("Username already exists.");

        }


        // ======================================
        // CREATE AUTH ACCOUNT
        // ======================================

        const userCredential =
            await createUserWithEmailAndPassword(

                auth,
                emailValue,
                passwordValue

            );

        const user = userCredential.user;


        // ======================================
        // FIRESTORE USER
        // ======================================

        await setDoc(

            doc(db, "users", user.uid),

            {

                uid: user.uid,

                fullName: fullNameValue,

                username: usernameValue,

                email: emailValue,

                phone: "",

                bio: "",

                gender: "",

                dateOfBirth: "",

                state: "",

                country: "",

                profilePhoto: "",

                coverPhoto: "",

                website: "",

                occupation: "",

                school: "",

                verified: false,

                accountType: "user",

                followersCount: 0,

                followingCount: 0,

                postsCount: 0,

                likesCount: 0,

                connectionsCount: 0,

                savedPostsCount: 0,

                savedJobsCount: 0,

                online: true,

                createdAt: serverTimestamp(),

                updatedAt: serverTimestamp()

            }

        );


        // ======================================
        // REALTIME DATABASE
        // ======================================

        await set(

            ref(realtimeDB, `users/${user.uid}`),

            {

                uid: user.uid,

                username: usernameValue,

                fullName: fullNameValue,

                online: true,

                typing: false,

                lastSeen: Date.now()

            }

        );


        // ======================================
        // EMAIL VERIFICATION
        // ======================================

        await sendEmailVerification(user);

                // ======================================
        // SUCCESS
        // ======================================

        showMessage(
            "Registration successful! Please check your email to verify your account.",
            "success"
        );

        registerBtn.textContent = "Account Created";

        registerForm.reset();

        strengthBar.style.width = "0%";

        setTimeout(() => {

            window.location.href = "login.html";

        }, 2500);

    } catch (error) {

        console.error(error);

        registerBtn.disabled = false;

        registerBtn.textContent = "Create Account";

        switch (error.code) {

            case "auth/email-already-in-use":

                showMessage(
                    "This email is already registered."
                );
                break;

            case "auth/invalid-email":

                showMessage(
                    "Invalid email address."
                );
                break;

            case "auth/weak-password":

                showMessage(
                    "Password is too weak."
                );
                break;

            case "auth/network-request-failed":

                showMessage(
                    "Network error. Check your internet connection."
                );
                break;

            case "auth/too-many-requests":

                showMessage(
                    "Too many attempts. Please try again later."
                );
                break;

            default:

                showMessage(error.message);

        }

    } finally {

        registerBtn.disabled = false;

        registerBtn.textContent = "Create Account";

    }

});
        
