import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGBPm_QY_r3BBV9xqpt6SQvQdK9nhKGXU",
  authDomain: "wellnesshub-841fd.firebaseapp.com",
  projectId: "wellnesshub-841fd",
  storageBucket: "wellnesshub-841fd.appspot.com",
  messagingSenderId: "766630298756",
  appId: "1:766630298756:web:5202acf967f9ba9832eed1",
  measurementId: "G-BKMVRNQQF0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const googleBtn = document.getElementById("googleLoginBtn");

googleBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      alert("Login Google berhasil!");
      localStorage.setItem("loggedInUser", result.user.email);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Login Google gagal:", error.message);
      alert("Login Google gagal: " + error.message);
    });
});
