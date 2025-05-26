document.addEventListener("DOMContentLoaded", function () {
   const tabs = document.querySelectorAll(".tab");
   const tabContents = document.querySelectorAll(".tab-content");

   // Fungsi untuk mengganti tab
   tabs.forEach(tab => {
       tab.addEventListener("click", function () {
           const target = this.getAttribute("data-tab");
           
           tabs.forEach(t => t.classList.remove("active"));
           tabContents.forEach(tc => tc.classList.remove("active"));
           
           this.classList.add("active");
           document.getElementById(`${target}-content`).classList.add("active");
       });
   });

   // Fungsi menyimpan pengingat ke localStorage
   function simpanPengingat(id, data) {
       localStorage.setItem(id, JSON.stringify(data));
       tampilkanPengingat(id);
   }

   // Fungsi untuk menampilkan pengingat yang tersimpan
   function tampilkanPengingat(id) {
       const container = document.getElementById(`${id}-reminders`);
       container.innerHTML = "";
       const data = JSON.parse(localStorage.getItem(id)) || [];

       data.forEach((item, index) => {
           const div = document.createElement("div");
           div.classList.add("reminder-card", id);
           div.innerHTML = `
               <button class="delete-btn" data-id="${id}" data-index="${index}">&times;</button>
               <h4 class="reminder-title">${item.title}</h4>
               <div class="reminder-time">${item.time}</div>
               <div class="reminder-description">${item.notes}</div>
           `;
           container.appendChild(div);
       });
   }

   // Simpan pengingat dari form input
   document.querySelectorAll(".button").forEach(button => {
       button.addEventListener("click", function () {
           const id = this.id.replace("save-", "");
           const title = document.getElementById(`${id}-title`).value;
           const time = document.getElementById(`${id}-date`) ? document.getElementById(`${id}-date`).value : document.getElementById(`${id}-time`).value;
           const notes = document.getElementById(`${id}-notes`).value;
           
           if (!title || !time) {
               alert("Harap isi semua kolom wajib!");
               return;
           }
           
           const data = JSON.parse(localStorage.getItem(id)) || [];
           data.push({ title, time, notes });
           simpanPengingat(id, data);
       });
   });

   // Hapus pengingat
   document.addEventListener("click", function (e) {
       if (e.target.classList.contains("delete-btn")) {
           const id = e.target.getAttribute("data-id");
           const index = e.target.getAttribute("data-index");
           let data = JSON.parse(localStorage.getItem(id));
           data.splice(index, 1);
           simpanPengingat(id, data);
       }
   });

   // Menampilkan semua pengingat yang tersimpan saat halaman dimuat
   ["workout", "hydration", "recovery"].forEach(id => tampilkanPengingat(id));
});
