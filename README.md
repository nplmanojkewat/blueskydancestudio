# 🩰 Blue Sky Dance Studio

A modern dance studio registration and management website built with **HTML, Tailwind CSS, JavaScript, and Firebase**.

The project provides a public registration form for students and a secure admin dashboard for managing registrations.

## 🌐 Live Website

**[Visit Blue Sky Dance Studio](https://nplmanojkewat.github.io/blueskydancestudio/)**

## ✨ Features

### 👩‍🎓 Student Registration

* Student registration form
* Name, email, phone, date of birth, age, gender and address
* Emergency contact information
* Form validation
* Registration success message
* Data stored securely in Firebase Firestore

### 🔐 Admin Dashboard

* Secure admin login with Firebase Authentication
* View registered students
* Search registrations by:

  * Name
  * Age
  * Gender
  * Address
* Registration statistics
* Delete registrations
* Logout functionality

### 🎨 UI & Design

* Modern dark-themed interface
* Responsive design
* Mobile-friendly layout
* Tailwind CSS styling
* Font Awesome icons
* Custom Blue Sky Dance Studio branding

## 🛠️ Technologies Used

* **HTML5** — Website structure
* **Tailwind CSS** — Styling and responsive design
* **JavaScript** — Application logic and interactions
* **Firebase Authentication** — Admin authentication
* **Firebase Firestore** — Registration data storage
* **Font Awesome** — Icons
* **Git & GitHub** — Version control and hosting
* **GitHub Pages** — Website deployment

## 📂 Project Structure

```text
Blue Sky Dance Studio/
│
├── index.html          # Student registration page
├── login.html          # Admin login page
├── admin.html          # Admin dashboard
│
├── script.js           # Registration functionality
├── auth.js             # Admin authentication
├── admin.js            # Admin dashboard functionality
│
├── style.css           # Custom CSS
├── output.css          # Compiled Tailwind CSS
│
├── asset/
│   └── bsds-logo.png   # Studio logo
│
├── package.json        # Project dependencies
├── package-lock.json   # Dependency lock file
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js   # PostCSS configuration
└── .gitignore          # Ignored files
```

## 🔒 Security

The project uses Firebase Authentication and Firestore security rules to protect student registration data.

* Anyone can submit a registration.
* Only authenticated admin users with the required admin authorization can read, update, or delete registrations.
* Firebase Admin service-account credentials are kept outside the public website project.
* Sensitive credentials are not included in the GitHub repository.

## 🚀 Deployment

The website is hosted using **GitHub Pages**.

To deploy your own version:

```bash
git clone https://github.com/nplmanojkewat/blueskydancestudio.git
cd blueskydancestudio
```

Make your changes and push them to GitHub:

```bash
git add .
git commit -m "Update website"
git push
```

GitHub Pages will automatically update the live website.

## 📚 What I Practiced

This project helped me practice:

* Building responsive websites
* Form handling and validation
* JavaScript DOM manipulation
* Firebase Authentication
* Firebase Firestore
* CRUD operations
* Search and filtering
* Admin dashboard development
* Git and GitHub
* GitHub Pages deployment
* Basic web application security

## 👨‍💻 Author

**Manoj Kewat**

GitHub: **[nplmanojkewat](https://github.com/nplmanojkewat)**

---

⭐ If you find this project useful, feel free to explore the repository.
