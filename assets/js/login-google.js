import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { firebaseConfig } from './env.js';

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
