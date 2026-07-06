// ======================================
// RHOCKSTAR CONNECT
// app.js (PART 1)
// ======================================

import { auth, db } from "./firebase.js";

import {
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


// ======================================
// DASHBOARD
// ======================================

const dashboard = document.getElementById("dashboard");

const sidebar = document.getElementById("sidebar");

const sidebarOverlay = document.getElementById("sidebarOverlay");

const menuToggle = document.getElementById("menuToggle");

const closeMenu = document.getElementById("closeMenu");


// ======================================
// NAVIGATION
// ======================================

const navLinks = document.querySelectorAll(".nav-link");

const pages = document.querySelectorAll(".page");


// ======================================
// PROFILE
// ======================================

const profilePicture = document.getElementById("profilePicture");

const coverPhoto = document.getElementById("coverPhoto");

const profileName = document.getElementById("profileName");

const profileUsername = document.getElementById("profileUsername");

const profileHeadline = document.getElementById("profileHeadline");

const profileLocation = document.getElementById("profileLocation");

const profileBio = document.getElementById("profileBio");

const profileFollowers = document.getElementById("profileFollowers");

const profileFollowing = document.getElementById("profileFollowing");

const profilePosts = document.getElementById("profilePosts");

const profileViews = document.getElementById("profileViews");


// ======================================
// AUTH
// ======================================

onAuthStateChanged(auth, (user) => {

    if (!user) return;

    loadProfile(user.uid);

});


// ======================================
// LOAD PROFILE
// ======================================

function loadProfile(uid) {

    const userRef = doc(db, "users", uid);

    onSnapshot(userRef, (snapshot) => {

        if (!snapshot.exists()) return;

        const data = snapshot.data();

        if (profileName)
            profileName.textContent = data.fullName || "";

        if (profileUsername)
            profileUsername.textContent = "@" + (data.username || "");

        if (profileHeadline)
            profileHeadline.textContent = data.occupation || "";

        if (profileLocation)
            profileLocation.textContent =
                `${data.state || ""}, ${data.country || ""}`;

        if (profileBio)
            profileBio.textContent = data.bio || "";

        if (profileFollowers)
            profileFollowers.textContent =
                data.followersCount || 0;

        if (profileFollowing)
            profileFollowing.textContent =
                data.followingCount || 0;

        if (profilePosts)
            profilePosts.textContent =
                data.postsCount || 0;

        if (profileViews)
            profileViews.textContent =
                data.profileViews || 0;

        if (profilePicture && data.profilePhoto)
            profilePicture.src = data.profilePhoto;

        if (coverPhoto && data.coverPhoto)
            coverPhoto.src = data.coverPhoto;

    });

}

// ======================================
// SIDEBAR
// ======================================

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        sidebar.classList.add("active");

        if (sidebarOverlay) {

            sidebarOverlay.classList.add("active");

        }

    });

}

if (closeMenu) {

    closeMenu.addEventListener("click", () => {

        sidebar.classList.remove("active");

        if (sidebarOverlay) {

            sidebarOverlay.classList.remove("active");

        }

    });

}

if (sidebarOverlay) {

    sidebarOverlay.addEventListener("click", () => {

        sidebar.classList.remove("active");

        sidebarOverlay.classList.remove("active");

    });

}


// ======================================
// PAGE NAVIGATION
// ======================================

navLinks.forEach((link) => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        const target = link.dataset.page;

        if (!target) return;

        navLinks.forEach((item) => {

            item.classList.remove("active");

        });

        link.classList.add("active");

        pages.forEach((page) => {

            page.classList.remove("active");

        });

        const activePage = document.getElementById(target);

        if (activePage) {

            activePage.classList.add("active");

        }

        sidebar.classList.remove("active");

        if (sidebarOverlay) {

            sidebarOverlay.classList.remove("active");

        }

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

});


// ======================================
// FEED REFRESH
// ======================================

const refreshFeedBtn =
    document.getElementById("refreshFeedBtn");

if (refreshFeedBtn) {

    refreshFeedBtn.addEventListener("click", () => {

        refreshFeedBtn.disabled = true;

        refreshFeedBtn.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i>';

        setTimeout(() => {

            refreshFeedBtn.disabled = false;

            refreshFeedBtn.innerHTML =
                '<i class="fas fa-rotate"></i>';

        }, 1000);

    });

}

// ======================================
// PROFILE LINKS
// ======================================

const myWebsite = document.getElementById("myWebsite");

const myLanguages = document.getElementById("myLanguages");

const abtMe = document.getElementById("abtMe");

const skillsContainer = document.getElementById("skillsContainer");

const facebookLink = document.getElementById("facebookLink");

const instagramLink = document.getElementById("instagramLink");

const xLink = document.getElementById("xLink");

const linkedinLink = document.getElementById("linkedinLink");

const githubLink = document.getElementById("githubLink");

const youtubeLink = document.getElementById("youtubeLink");

const tiktokLink = document.getElementById("tiktokLink");

const whatsappLink = document.getElementById("whatsappLink");


// ======================================
// UPDATE PROFILE DETAILS
// ======================================

function updateProfileExtras(data) {

    if (myWebsite)
        myWebsite.href = data.website || "#";

    if (myWebsite)
        myWebsite.textContent = data.website || "";

    if (myLanguages)
        myLanguages.textContent = data.languages || "";

    if (abtMe)
        abtMe.textContent = data.about || "";

    if (facebookLink)
        facebookLink.href = data.facebook || "#";

    if (instagramLink)
        instagramLink.href = data.instagram || "#";

    if (xLink)
        xLink.href = data.x || "#";

    if (linkedinLink)
        linkedinLink.href = data.linkedin || "#";

    if (githubLink)
        githubLink.href = data.github || "#";

    if (youtubeLink)
        youtubeLink.href = data.youtube || "#";

    if (tiktokLink)
        tiktokLink.href = data.tiktok || "#";

    if (whatsappLink)
        whatsappLink.href = data.whatsapp || "#";

    if (skillsContainer) {

        skillsContainer.innerHTML = "";

        if (Array.isArray(data.skills)) {

            data.skills.forEach((skill) => {

                const badge = document.createElement("span");

                badge.className = "skill";

                badge.textContent = skill;

                skillsContainer.appendChild(badge);

            });

        }

    }

}


// ======================================
// UPDATE SNAPSHOT
// ======================================

// Inside loadProfile(), after:
//
// const data = snapshot.data();
//
// add this line:
//
// updateProfileExtras(data);


// ======================================
// EXPERIENCE
// ======================================

const addExperienceBtn = document.getElementById("addExperienceBtn");

const experienceContainer = document.getElementById("experienceContainer");


// ======================================
// EDUCATION
// ======================================

const addEducationBtn = document.getElementById("addEducationBtn");

const educationContainer = document.getElementById("educationContainer");


// ======================================
// RENDER EXPERIENCE
// ======================================

function renderExperience(experience = []) {

    if (!experienceContainer) return;

    experienceContainer.innerHTML = "";

    experience.forEach((item) => {

        const card = document.createElement("div");

        card.className = "experience-card";

        card.innerHTML = `

            <h4>${item.position || ""}</h4>

            <p>${item.company || ""}</p>

            <small>${item.startDate || ""} - ${item.endDate || "Present"}</small>

            <p>${item.description || ""}</p>

        `;

        experienceContainer.appendChild(card);

    });

}


// ======================================
// RENDER EDUCATION
// ======================================

function renderEducation(education = []) {

    if (!educationContainer) return;

    educationContainer.innerHTML = "";

    education.forEach((item) => {

        const card = document.createElement("div");

        card.className = "education-card";

        card.innerHTML = `

            <h4>${item.school || ""}</h4>

            <p>${item.course || ""}</p>

            <small>${item.startYear || ""} - ${item.endYear || ""}</small>

        `;

        educationContainer.appendChild(card);

    });

}


// ======================================
// BUTTONS
// ======================================

if (addExperienceBtn) {

    addExperienceBtn.addEventListener("click", () => {

        alert("Experience editor will be connected in profile.js");

    });

}

if (addEducationBtn) {

    addEducationBtn.addEventListener("click", () => {

        alert("Education editor will be connected in profile.js");

    });

}


// ======================================
// UPDATE SNAPSHOT
// ======================================

// Inside loadProfile(), after:
//
// updateProfileExtras(data);
//
// add:
//
// renderExperience(data.experience || []);
//
// renderEducation(data.education || []);


// ======================================
// CONNECTIONS
// ======================================

const mutualConnections = document.getElementById("mutualConnections");

const favoriteConnections = document.getElementById("favoriteConnections");

const profileVisitorsContainer = document.getElementById("profileVisitorsContainer");

const connectionsBlockedUsersContainer = document.getElementById("connectionsBlockedUsersContainer");


// ======================================
// INVITE
// ======================================

const inviteWhatsapp = document.getElementById("inviteWhatsapp");

const inviteFacebook = document.getElementById("inviteFacebook");

const inviteTelegram = document.getElementById("inviteTelegram");

const inviteEmail = document.getElementById("inviteEmail");

const copyInviteLink = document.getElementById("copyInviteLink");


// ======================================
// QR CODE
// ======================================

const profileQRCode = document.getElementById("profileQRCode");

const downloadQR = document.getElementById("downloadQR");

const importContactsBtn = document.getElementById("importContactsBtn");


// ======================================
// INVITE LINK
// ======================================

function getInviteLink() {

    const username = profileUsername
        ? profileUsername.textContent.replace("@", "")
        : "";

    return `${window.location.origin}/profile.html?u=${username}`;

}


// ======================================
// COPY LINK
// ======================================

if (copyInviteLink) {

    copyInviteLink.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(getInviteLink());

            alert("Invite link copied.");

        } catch (error) {

            console.error(error);

        }

    });

}


// ======================================
// SHARE BUTTONS
// ======================================

if (inviteWhatsapp) {

    inviteWhatsapp.addEventListener("click", () => {

        window.open(

            `https://wa.me/?text=${encodeURIComponent(getInviteLink())}`,

            "_blank"

        );

    });

}

if (inviteFacebook) {

    inviteFacebook.addEventListener("click", () => {

        window.open(

            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getInviteLink())}`,

            "_blank"

        );

    });

}

if (inviteTelegram) {

    inviteTelegram.addEventListener("click", () => {

        window.open(

            `https://t.me/share/url?url=${encodeURIComponent(getInviteLink())}`,

            "_blank"

        );

    });

}

if (inviteEmail) {

    inviteEmail.addEventListener("click", () => {

        window.location.href =

            `mailto:?subject=Join Rhockstar Connect&body=${encodeURIComponent(getInviteLink())}`;

    });

}


// ======================================
// PLACEHOLDERS
// ======================================

if (downloadQR) {

    downloadQR.addEventListener("click", () => {

        alert("QR download will be connected in profile.js");

    });

}

if (importContactsBtn) {

    importContactsBtn.addEventListener("click", () => {

        alert("Import contacts will be connected later.");

    });

}


// ======================================
// POST COMPOSER
// ======================================

const createPostForm = document.getElementById("createPostForm");

const postText = document.getElementById("postText");

const postImage = document.getElementById("postImage");

const imagePreview = document.getElementById("imagePreview");

const postPrivacy = document.getElementById("postPrivacy");

const publishPostBtn = document.getElementById("publishPostBtn");


// ======================================
// IMAGE PREVIEW
// ======================================

if (postImage) {

    postImage.addEventListener("change", (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function () {

            if (imagePreview) {

                imagePreview.src = reader.result;

                imagePreview.style.display = "block";

            }

        };

        reader.readAsDataURL(file);

    });

}


// ======================================
// CREATE POST
// ======================================

if (createPostForm) {

    createPostForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        if (!auth.currentUser) return;

        const text = postText.value.trim();

        const privacy = postPrivacy.value;

        if (!text && (!postImage || postImage.files.length === 0)) {

            alert("Write something or select an image.");

            return;

        }

        publishPostBtn.disabled = true;

        publishPostBtn.textContent = "Publishing...";

        try {

            // Image upload
            // Firestore post creation
            // Feed update
            // Notification update
            // Timeline update

            // WILL BE COMPLETED IN feed.js

            postText.value = "";

            if (postImage) {

                postImage.value = "";

            }

            if (imagePreview) {

                imagePreview.src = "";

                imagePreview.style.display = "none";

            }

            alert("Post published successfully.");

        } catch (error) {

            console.error(error);

            alert(error.message);

        } finally {

            publishPostBtn.disabled = false;

            publishPostBtn.textContent = "Publish";

        }

    });

}


// ======================================
// SEARCH
// ======================================

const searchInput = document.getElementById("searchInput");

const searchResults = document.getElementById("searchResults");


// ======================================
// NOTIFICATIONS
// ======================================

const notificationsContainer = document.getElementById("notificationsContainer");

const notificationCount = document.getElementById("notificationCount");

const markAllReadBtn = document.getElementById("markAllReadBtn");


// ======================================
// LIVE SEARCH
// ======================================

if (searchInput) {

    searchInput.addEventListener("input", async () => {

        const keyword = searchInput.value.trim();

        if (keyword.length < 2) {

            if (searchResults) {

                searchResults.innerHTML = "";

            }

            return;

        }

        // Firestore live search
        // Implemented in search.js

    });

}


// ======================================
// MARK ALL AS READ
// ======================================

if (markAllReadBtn) {

    markAllReadBtn.addEventListener("click", async () => {

        try {

            // Firestore update
            // notifications.js

            notificationCount.textContent = "0";

            alert("Notifications marked as read.");

        } catch (error) {

            console.error(error);

        }

    });

}


// ======================================
// RENDER NOTIFICATIONS
// ======================================

function renderNotifications(notifications = []) {

    if (!notificationsContainer) return;

    notificationsContainer.innerHTML = "";

    notifications.forEach((notification) => {

        const item = document.createElement("div");

        item.className = "notification-item";

        item.innerHTML = `

            <h4>${notification.title || ""}</h4>

            <p>${notification.message || ""}</p>

            <small>${notification.time || ""}</small>

        `;

        notificationsContainer.appendChild(item);

    });

}


// ======================================
// MESSAGES
// ======================================

const chatList = document.getElementById("chatList");

const chatContainer = document.getElementById("chatContainer");

const messageInput = document.getElementById("messageInput");

const sendMessageBtn = document.getElementById("sendMessageBtn");

const typingIndicator = document.getElementById("typingIndicator");


// ======================================
// LOAD CHAT
// ======================================

function loadConversation(messages = []) {

    if (!chatContainer) return;

    chatContainer.innerHTML = "";

    messages.forEach((message) => {

        const bubble = document.createElement("div");

        bubble.className = message.senderId === auth.currentUser.uid
            ? "message sent"
            : "message received";

        bubble.innerHTML = `

            <p>${message.text}</p>

            <small>${message.time}</small>

        `;

        chatContainer.appendChild(bubble);

    });

    chatContainer.scrollTop = chatContainer.scrollHeight;

}


// ======================================
// TYPING
// ======================================

if (messageInput) {

    messageInput.addEventListener("input", () => {

        // Realtime Database typing status
        // messages.js

    });

}


// ======================================
// SEND MESSAGE
// ======================================

if (sendMessageBtn) {

    sendMessageBtn.addEventListener("click", async () => {

        const text = messageInput.value.trim();

        if (!text) return;

        try {

            // Firestore message

            // Realtime delivery

            // Notification

            // Chat list update

            // Seen status

            // messages.js

            messageInput.value = "";

        } catch (error) {

            console.error(error);

        }

    });

}


// ======================================
// TYPING INDICATOR
// ======================================

function updateTypingStatus(isTyping) {

    if (!typingIndicator) return;

    typingIndicator.style.display =

        isTyping ? "block" : "none";

}


// ======================================
// JOBS
// ======================================

const jobsContainer = document.getElementById("jobsContainer");

const jobSearch = document.getElementById("jobSearch");

const jobFilter = document.getElementById("jobFilter");

const applyJobBtn = document.getElementById("applyJobBtn");


// ======================================
// JOB FILTER
// ======================================

if (jobSearch) {

    jobSearch.addEventListener("input", () => {

        // jobs.js

    });

}

if (jobFilter) {

    jobFilter.addEventListener("change", () => {

        // jobs.js

    });

}

if (applyJobBtn) {

    applyJobBtn.addEventListener("click", () => {

        // jobs.js

    });

}


// ======================================
// app.js COMPLETE
// ======================================
