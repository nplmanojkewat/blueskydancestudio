import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Firebase Configuration
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

const db = getFirestore(app);

// Animation For Message
slideInRight: "slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards";

// Form Validation
const form = document.getElementById("registrationForm");

const dobInput = document.getElementById("dob");
const ageInput = document.getElementById("age");

const successMessage = document.getElementById("successMessage");


// Date to Age Converting

dobInput.addEventListener("change", function () {
  const birthDate = new Date(dobInput.value);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  ageInput.value = age;
});


// FORM SUBMISSION

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();

  const phone = document.getElementById("phone").value.trim();

  const dob = document.getElementById("dob").value;

  const address = document.getElementById("address").value.trim();

  const parentsName = document
    .getElementById("parentsName")
    .value.trim();

  const age = document.getElementById("age").value;

  const gender = document.querySelector('input[name="gender"]:checked')?.value;

  if (username === "") {
    alert("Please enter your full name.");
    return;
  }


  if (phone === "") {
    alert("Please enter your mobile number.");
    return;
  }

  if (dob === "") {
    alert("Please select your date of birth.");
    return;
  }

  if (address === "") {
    alert("Please enter your address.");
    return;
  }

  if (parentsName === "") {
    alert("Please enter a Parent's Name.");
    return;
  }

  if (age === "") {
    alert("Please select your date of birth to calculate your age.");
    return;
  }

  if (!gender) {
    alert("Please select your gender.");
    return;
  }


  // Number Validation
  const phonePattern = /^(97|98)\d{8}$/;

  if (!phonePattern.test(phone)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }



  const userAge = Number(age);

  if (userAge < 5 || userAge > 100) {
    alert("Please enter a valid age between 5 and 100.");
    return;
  }



  const today = new Date();
  const selectedDOB = new Date(dob);

  if (selectedDOB > today) {
    alert("Date of birth cannot be in the future.");
    return;
  }



  console.log("Form is valid!");

  try {
    const docRef = await addDoc(collection(db, "registrations"), {
      username: username,
      phone: phone,
      dob: dob,
      address: address,
      parentsName: parentsName,
      age: userAge,
      gender: gender,

      createdAt: serverTimestamp(),
    });

    // Show success message
    successMessage.classList.remove("hidden");

    // Reset form
    form.reset();
    ageInput.value = "";

    // Hide message after 4 seconds
    setTimeout(() => {
      successMessage.classList.add("hidden");
    }, 4000);

    
  } catch (error) {
    console.error("Error saving registration:", error);

    alert("Something went wrong. Please try again.");
  }
});
