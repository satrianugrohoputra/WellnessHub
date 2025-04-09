document.addEventListener("DOMContentLoaded", function () {
   const stats = ["steps", "distance", "duration", "calories"];

   // Memuat data dari LocalStorage saat halaman dimuat
   stats.forEach(stat => {
       const savedValue = localStorage.getItem(stat);
       if (savedValue) {
           document.getElementById(stat).innerText = savedValue;
       }

       const savedTarget = localStorage.getItem(stat + "Target");
       if (savedTarget) {
           document.getElementById(stat + "Target").innerText = `Target: ${savedTarget}`;
       }
   });

   // Fungsi untuk mengedit angka
   document.querySelectorAll(".edit-icon").forEach(button => {
       button.addEventListener("click", function () {
           const parentCard = this.closest(".card");
           const statElement = parentCard.querySelector(".stat");
           const targetElement = parentCard.querySelector("p");
           
           const input = document.createElement("input");
           input.type = "number";
           input.value = parseInt(statElement.innerText);
           
           input.addEventListener("blur", function () {
               statElement.innerText = input.value;
               localStorage.setItem(statElement.id, input.value);
               parentCard.removeChild(input);
           });

           parentCard.appendChild(input);
           input.focus();
       });
   });

   // Fungsi untuk mengedit target
   document.querySelectorAll(".card p").forEach(target => {
       target.addEventListener("click", function () {
           const newTarget = prompt("Masukkan target baru:", this.innerText.replace("Target: ", ""));
           if (newTarget) {
               this.innerText = `Target: ${newTarget}`;
               localStorage.setItem(this.id, newTarget);
           }
       });
   });
});