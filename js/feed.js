// ======================================
// feed.js (PART 1)
// ======================================

import { auth, db } from "./firebase.js";

import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    deleteDoc,
    updateDoc,
    doc,
    increment
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// ======================================
// HTML ELEMENTS
// ======================================

const createPostForm = document.getElementById("createPostForm");

const postText = document.getElementById("postText");

const postImage = document.getElementById("postImage");

const imagePreview = document.getElementById("imagePreview");

const postPrivacy = document.getElementById("postPrivacy");

const publishPostBtn = document.getElementById("publishPostBtn");

const postsContainer = document.getElementById("postsContainer");


// ======================================
// POSTS COLLECTION
// ======================================

const postsRef = collection(db, "posts");


// ======================================
// CREATE POST
// ======================================

if (createPostForm) {

    createPostForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        if (!auth.currentUser) return;

        const text = postText.value.trim();

        if (!text && postImage.files.length === 0) return;

        publishPostBtn.disabled = true;

        publishPostBtn.textContent = "Publishing...";

        try {

            await addDoc(postsRef, {

                uid: auth.currentUser.uid,

                text,

                image: "",

                privacy: postPrivacy.value,

                likes: 0,

                comments: 0,

                shares: 0,

                createdAt: serverTimestamp()

            });

            await updateDoc(

                doc(db, "users", auth.currentUser.uid),

                {

                    postsCount: increment(1)

                }

            );

            createPostForm.reset();

            imagePreview.src = "";

            imagePreview.style.display = "none";

        } catch (error) {

            console.error(error);

        } finally {

            publishPostBtn.disabled = false;

            publishPostBtn.textContent = "Publish";

        }

    });

}


// ======================================
// LOAD POSTS
// ======================================

const feedQuery = query(

    postsRef,

    orderBy("createdAt", "desc")

);

onSnapshot(feedQuery, (snapshot) => {

    postsContainer.innerHTML = "";

    snapshot.forEach((docSnap) => {

        const post = docSnap.data();

        const postId = docSnap.id;

        const card = document.createElement("div");

        card.className = "feed-post";

        card.dataset.id = postId;

        card.innerHTML = `

            <div class="post-content">

                <p>${post.text}</p>

                ${post.image ? `<img src="${post.image}">` : ""}

            </div>

            <div class="post-actions">

                <button class="like-btn">❤️ ${post.likes}</button>

                <button class="comment-btn">💬 ${post.comments}</button>

                <button class="share-btn">🔁 ${post.shares}</button>

                <button class="delete-btn">🗑️</button>

            </div>

        `;

        postsContainer.appendChild(card);

    });

});

// CONTINUE PART 2
