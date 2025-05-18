import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGBPm_QY_r3BBV9xqpt6SQvQdK9nhKGXU",
  authDomain: "wellnesshub-841fd.firebaseapp.com",
  projectId: "wellnesshub-841fd",
  storageBucket: "wellnesshub-841fd.appspot.com",
  messagingSenderId: "766630298756",
  appId: "1:766630298756:web:5202acf967f9ba9832eed1",
  measurementId: "G-BKMVRNQQF0",
  databaseURL: "https://wellnesshub-841fd-default-rtdb.firebaseio.com"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Event listener untuk login form
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const safeEmailKey = email.replace(/[@.]/g, "_");

  const userRef = ref(db, "users/" + safeEmailKey);

  get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      if (data.password === password) {
        alert("Login berhasil!");
        loginForm.reset();
        // Redirect ke halaman utama (index.html)
        window.location.href = "index.html";
      } else {
        alert("Password salah!");
      }
    } else {
      alert("Akun tidak ditemukan. Silakan daftar terlebih dahulu.");
    }
  }).catch((error) => {
    console.error("Error saat login:", error);
    alert("Terjadi kesalahan.");
  });
});
