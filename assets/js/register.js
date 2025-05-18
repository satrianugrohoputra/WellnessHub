import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDGBPm_QY_r3B8V9xqpt6SQvQdK9nhKGXU",
  authDomain: "wellnesshub-841fd.firebaseapp.com",
  projectId: "wellnesshub-841fd",
  storageBucket: "wellnesshub-841fd.appspot.com",
  messagingSenderId: "766630298756",
  appId: "1:766630298756:web:5202acf967f9ba9832eed1",
  measurementId: "G-BKMVRNQQF0"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Tangkap form dan tangani submit
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Akun berhasil dibuat!");
      registerForm.reset();
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Gagal daftar:", error.message);
      alert("Gagal daftar: " + error.message);
    });
});
