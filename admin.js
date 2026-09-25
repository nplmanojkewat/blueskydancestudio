import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

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
const db = getFirestore(app);

const tableBody = document.getElementById("registrationTableBody");

// Card Data Collecting
const totalStudents = document.getElementById("totalStudents");
const maleStudents = document.getElementById("maleStudents");
const femaleStudents = document.getElementById("femaleStudents");
const todayRegistered = document.getElementById("todayRegistered");


// Popup 
const logoutButton = document.getElementById("logoutBtn");
const logoutPopup = document.getElementById("logoutPopup");
const logoutBox = document.getElementById("logoutBox");
const cancelLogout = document.getElementById("cancelLogout");
const confirmLogout = document.getElementById("confirmLogout");


logoutButton.addEventListener("click", () => {
  logoutPopup.classList.remove("hidden");
  logoutPopup.classList.add("flex");

  setTimeout(() => {
    logoutBox.classList.remove("opacity-0", "scale-90");

    logoutBox.classList.add("opacity-100", "scale-100");
  }, 10);
});

function closeLogoutPopup() {
  logoutBox.classList.remove("opacity-100", "scale-100");

  logoutBox.classList.add("opacity-0", "scale-90");

  setTimeout(() => {
    logoutPopup.classList.remove("flex");
    logoutPopup.classList.add("hidden");
  }, 300);
}

cancelLogout.addEventListener("click", () => {
  closeLogoutPopup();
});

confirmLogout.addEventListener("click", async () => {
  try {
    // Disable button while logging out
    confirmLogout.disabled = true;
    confirmLogout.textContent = "Logging out...";

    await signOut(auth);

    window.location.href = "login.html";
  } catch (error) {
    console.error("Logout failed:", error);

    confirmLogout.disabled = false;
    confirmLogout.textContent = "Logout";
  }
});


// to store all students in array
let allRegistrations = [];


// Checking authentication
onAuthStateChanged(auth, async (user) => {
  // No logged-in user
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  console.log("Admin logged in:", user.email);

  try {
    const snapshot = await getDocs(collection(db, "registrations"));

    // Store all registrations
    allRegistrations = [];

    // Card counters
    let totalCount = 0;
    let maleCount = 0;
    let femaleCount = 0;
    let todayCount = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();

      // Store document ID + data
      allRegistrations.push({
        id: doc.id,
        ...data,
      });

      // Counting Total Students
      totalCount++;

      // Gender
      if (data.gender?.toLowerCase() === "male") {
        maleCount++;
      }

      if (data.gender?.toLowerCase() === "female") {
        femaleCount++;
      }

      // Today Registered Students
      if (data.createdAt) {
        const registrationDate = data.createdAt.toDate();
        const today = new Date();

        if (
          registrationDate.getFullYear() === today.getFullYear() &&
          registrationDate.getMonth() === today.getMonth() &&
          registrationDate.getDate() === today.getDate()
        ) {
          todayCount++;
        }
      }
    });

    // Update cards
    totalStudents.textContent = totalCount;
    maleStudents.textContent = maleCount;
    femaleStudents.textContent = femaleCount;
    todayRegistered.textContent = todayCount;

    // Display all students
    displayRegistrations(allRegistrations);
  } catch (error) {
    console.error("Failed to fetch registrations:", error);
  }
});

// Fetching all registered students
function displayRegistrations(registrations) {
  tableBody.innerHTML = "";

  registrations.forEach((student) => {
    tableBody.innerHTML += `

      <tr class="transition hover:bg-white/5">

        <td class="px-5 py-4 text-sm font-medium text-white">
          ${student.username || "N/A"}
        </td>

        <td class="px-5 py-4 text-sm text-zinc-400">
          ${student.parentsName || "N/A"}
        </td>

        <td class="px-5 py-4 text-sm text-zinc-400">
          ${student.phone || "N/A"}
        </td>

        <td class="px-5 py-4 text-sm text-zinc-400">
          ${student.address || "N/A"}
        </td>

        <td class="px-5 py-4 text-sm text-zinc-400">
          ${student.age || "N/A"}
        </td>

        <td class="px-5 py-4">

          <span class="rounded-full px-3 py-1 text-xs font-medium
            ${
              student.gender?.toLowerCase() === "female"
                ? "bg-pink-500/10 text-pink-400"
                : "bg-blue-500/10 text-blue-400"
            }">

            ${student.gender || "N/A"}

          </span>

        </td>

        <td class="px-5 py-4 text-sm text-zinc-400">
          ${formatDate(student.createdAt)}
        </td>

        <td class="px-5 py-4">

          <button
            class="delete-btn flex h-8 w-8 items-center justify-center
                   rounded-lg bg-red-500/10 text-red-400
                   hover:bg-red-500/20"
            data-id="${student.id}"
            title="Delete">

            <i class="fa-solid fa-trash text-xs"></i>

          </button>

        </td>

      </tr>

    `;
  });
}

// Search Filter
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase().trim();

  // Empty search → show everyone
  if (searchValue === "") {
    displayRegistrations(allRegistrations);
    return;
  }

  const filteredStudents = allRegistrations.filter((student) => {
    const name = String(student.username || "").toLowerCase();
    const age = String(student.age || "").toLowerCase();
    const gender = String(student.gender || "").toLowerCase();
    const address = String(student.address || "").toLowerCase();

    return (
      name.includes(searchValue) ||
      age.includes(searchValue) ||
      gender.includes(searchValue) ||
      address.includes(searchValue)
    );
  });

  displayRegistrations(filteredStudents);
});

// For Timestamp
function formatDate(timestamp) {
  if (!timestamp) {
    return "N/A";
  }

  return timestamp.toDate().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// To Deleting the Students
const deletePopup = document.getElementById("deletePopup");
const deleteBox = document.getElementById("deleteBox");
const cancelDelete = document.getElementById("cancelDelete");
const confirmDelete = document.getElementById("confirmDelete");

let studentIdToDelete = null;

// Open Delete Popup
tableBody.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete-btn");

  if (!deleteButton) {
    return;
  }

  studentIdToDelete = deleteButton.dataset.id;

  // Show popup
  deletePopup.classList.remove("hidden");
  deletePopup.classList.add("flex");

  // Animation
  setTimeout(() => {
    deleteBox.classList.remove("opacity-0", "scale-90");
    deleteBox.classList.add("opacity-100", "scale-100");
  }, 10);
});

// Close Popup
function closeDeletePopup() {
  deleteBox.classList.remove("opacity-100", "scale-100");
  deleteBox.classList.add("opacity-0", "scale-90");

  setTimeout(() => {
    deletePopup.classList.remove("flex");
    deletePopup.classList.add("hidden");

    studentIdToDelete = null;
  }, 300);
}

// Cancel
cancelDelete.addEventListener("click", () => {
  closeDeletePopup();
});

// Confirm Delete
confirmDelete.addEventListener("click", async () => {
  if (!studentIdToDelete) {
    return;
  }

  try {
    await deleteDoc(doc(db, "registrations", studentIdToDelete));

    closeDeletePopup();

    // Reload dashboard
    window.location.reload();
  } catch (error) {
    console.error("Failed to delete student:", error);
  }
});
