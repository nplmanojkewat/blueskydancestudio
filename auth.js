import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyCLkp9sV5us8UkHy0gbEWFgSP9fthUToJM",
  authDomain: "bluesky-dance-studio.firebaseapp.com",
  projectId: "bluesky-dance-studio",
  storageBucket: "bluesky-dance-studio.firebasestorage.app",
  messagingSenderId: "691450159655",
  appId: "1:691450159655:web:a20ceb589c3c58ffbe6402",
  measurementId: "G-4NNF3WSQT1",
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

console.log("Login form:", loginForm);

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        // Hide previous error
        loginError.classList.add("hidden");


        try {

            console.log("Trying to login...");

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            console.log("Login successful!");

            window.location.href = "admin.html";


        } catch (error) {

            console.error("Login error:", error);


            // Show friendly error message
            loginError.textContent =
                "Invalid email or password.";

            loginError.classList.remove("hidden");

        }

    });

}


// To remove the Error message while typing
document.getElementById("email").addEventListener("input", () => {
    loginError.classList.add("hidden");
});

document.getElementById("password").addEventListener("input", () => {
    loginError.classList.add("hidden");
});