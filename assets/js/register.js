import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Konfigurasi Firebase (sama seperti login.js)
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
const db = getDatabase(app);

// Tangani submit form
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const safeEmailKey = email.replace(/[@.]/g, "_"); // Buat kunci aman (karena . dan @ tidak bisa di Firebase)

  const userRef = ref(db, "users/" + safeEmailKey);

  set(userRef, {
    email: email,
    password: password
  })
    .then(() => {
      alert("Akun berhasil didaftarkan!");
      registerForm.reset();
    })
    .catch((error) => {
      console.error("Gagal daftar:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    });
});
