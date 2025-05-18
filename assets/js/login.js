// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDGBPm_QY_r3BBV9xqpt6SQvQdK9nhKGXU",
    authDomain: "wellnesshub-841fd.firebaseapp.com",
    projectId: "wellnesshub-841fd",
    storageBucket: "wellnesshub-841fd.appspot.com",
    messagingSenderId: "766630298756",
    appId: "1:766630298756:web:5202acf967f9ba9832eed1",
    measurementId: "G-BKMVRNQQF0", // <== TAMBAHKAN KOMA DI SINI
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

    // Ambil data dari input
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Buat reference ke database dan simpan data
    const userRef = ref(db, "logins/" + Date.now());

    set(userRef, {
        email: email,
        password: password
    })
    .then(() => {
        alert("Login berhasil disimpan ke database!");
        loginForm.reset();
    })
    .catch((error) => {
        console.error("Gagal menyimpan:", error);
        alert("Terjadi kesalahan saat menyimpan data.");
    });
});
