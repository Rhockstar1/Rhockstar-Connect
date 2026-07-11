// ======================================
// feed.js
// RHOCKSTAR CONNECT FEED ENGINE
// PART 1 FIXED
// ======================================


import { auth, db, storage } from "./firebase.js";


import {

    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    doc,
    updateDoc,
    increment

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


import {

    ref,
    uploadBytes,
    getDownloadURL

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";




// ======================================
// HTML ELEMENTS
// ======================================


const postText = document.getElementById("textSpace");

const postImages = document.getElementById("postImages");

const privacy = document.getElementById("privacy");

const postBtn = document.getElementById("postBtn");

const postsContainer = document.getElementById("postsContainer");

const feedLoader = document.getElementById("feedLoader");




// ======================================
// LOADER FUNCTIONS
// ======================================


function showLoader(){

    if(feedLoader){

        feedLoader.classList.remove("hidden");

    }

}



function hideLoader(){

    if(feedLoader){

        feedLoader.classList.add("hidden");

    }

}




// ======================================
// FIRESTORE POSTS
// ======================================


const postsRef = collection(db,"posts");




// ======================================
// CREATE POST
// ======================================


if(postBtn){


postBtn.addEventListener("click", async()=>{


    const user = auth.currentUser;


    if(!user){

        alert("Please login first");

        return;

    }



    const text = postText.value.trim();



    if(!text && !postImages.files.length){

        return;

    }



    postBtn.disabled = true;

    postBtn.textContent="Publishing...";



    try{


        let imageURL="";



        // upload image if available

        if(postImages.files.length){


            const file = postImages.files[0];


            const imageRef = ref(

                storage,

                `posts/${user.uid}/${Date.now()}-${file.name}`

            );


            await uploadBytes(imageRef,file);


            imageURL = await getDownloadURL(imageRef);


        }





        await addDoc(postsRef,{


            uid:user.uid,


            text:text,


            image:imageURL,


            privacy:privacy.value,


            likes:0,


            comments:0,


            shares:0,


            createdAt:serverTimestamp()


        });




        postText.value="";

        postImages.value="";



    }

    catch(error){


        console.error(
            "Post Error:",
            error
        );


    }



    finally{


        postBtn.disabled=false;


        postBtn.textContent="🚀 Publish";


    }



});


}





// ======================================
// LOAD POSTS REALTIME
// ======================================


const feedQuery=query(

    postsRef,

    orderBy(

        "createdAt",

        "desc"

    )

);



showLoader();



onSnapshot(feedQuery,(snapshot)=>{


    postsContainer.innerHTML="";



    snapshot.forEach((docSnap)=>{


        const post=docSnap.data();



        const card=document.createElement("div");


        card.className="post-card";



        card.innerHTML=`

        <div class="post-content">


            <p>

            ${post.text || ""}

            </p>



            ${
                post.image ?

                `<img src="${post.image}"
                class="post-image">`

                :

                ""

            }


        </div>



        <div class="post-actions">


            <button>

            👍 ${post.likes || 0}

            </button>


            <button>

            💬 ${post.comments || 0}

            </button>


            <button>

            🔁 ${post.shares || 0}

            </button>


        </div>

        `;



        postsContainer.appendChild(card);



    });



    hideLoader();



},

(error)=>{


    console.error(
        "Firebase Feed Error:",
        error
    );


    hideLoader();


});// CONTINUE PART 2
