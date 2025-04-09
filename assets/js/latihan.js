// latihan.js - Script untuk halaman Program Latihan

document.addEventListener('DOMContentLoaded', function() {
   // Variabel untuk menyimpan pilihan pengguna
   let selectedExerciseType = '';
   let selectedLevel = '';
   
   // Elemen-elemen UI utama
   const exerciseTypeSelection = document.getElementById('exerciseTypeSelection');
   const levelSelection = document.getElementById('levelSelection');
   const exerciseCards = document.querySelectorAll('.exercise-card');
   const levelCards = document.querySelectorAll('.level-card');
   
   // Program containers
   const runningBeginnerProgram = document.getElementById('runningBeginnerProgram');
   const runningModerateProgram = document.getElementById('runningModerateProgram');
   const runningAdvancedProgram = document.getElementById('runningAdvancedProgram'); 
   
   // Back buttons
   const backButtonRunningBeginner = document.getElementById('backButtonRunningBeginner');
   
   // Mengatur event listener untuk kartu jenis latihan
   exerciseCards.forEach(card => {
       card.addEventListener('click', function() {
           // Reset semua kartu
           exerciseCards.forEach(c => c.classList.remove('selected'));
           
           // Tandai kartu yang dipilih
           this.classList.add('selected');
           
           // Simpan jenis latihan yang dipilih
           selectedExerciseType = this.getAttribute('data-type');
           
           // Tampilkan bagian pemilihan level
           exerciseTypeSelection.classList.add('hidden');
           levelSelection.classList.remove('hidden');
       });
   });
   
   // Mengatur event listener untuk kartu level
   levelCards.forEach(card => {
       card.addEventListener('click', function() {
           // Reset semua kartu
           levelCards.forEach(c => c.classList.remove('selected'));
           
           // Tandai kartu yang dipilih
           this.classList.add('selected');
           
           // Simpan level yang dipilih
           selectedLevel = this.getAttribute('data-level');
           
           // Tampilkan program latihan yang sesuai
           showSelectedProgram();
       });
   });
   
   // Fungsi untuk menampilkan program yang dipilih
   function showSelectedProgram() {
       // Sembunyikan semua program terlebih dahulu
       hideAllPrograms();
       
       // Tampilkan program yang dipilih berdasarkan kombinasi jenis latihan dan level
       if (selectedExerciseType === 'running') {
           if (selectedLevel === 'beginner') {
               runningBeginnerProgram.classList.remove('hidden');
               initializeProgressBar(runningBeginnerProgram);
           } else if (selectedLevel === 'moderate') {
               runningModerateProgram.classList.remove('hidden');
               initializeProgressBar(runningModerateProgram);
             if (selectedLevel === 'advanced') {
                runningAdvancedProgram.classList.remove('hidden');
                initializeProgressBar(runningAdvancedProgram);
            }
            }
       } else {
           // Untuk jenis latihan lain yang belum diimplementasikan
           showComingSoonMessage(selectedExerciseType, selectedLevel);
       }
       
       // Sembunyikan level selection
       levelSelection.classList.add('hidden');
   }
   
   // Fungsi untuk menampilkan pesan "coming soon"
   function showComingSoonMessage(exerciseType, level) {
       // Buat elemen container untuk pesan
       const comingSoonContainer = document.createElement('div');
       comingSoonContainer.className = 'program-container';
       comingSoonContainer.id = 'comingSoonContainer';
       
       // Capitalize first letter untuk tampilan yang lebih baik
       const exerciseTypeDisplay = exerciseType.charAt(0).toUpperCase() + exerciseType.slice(1);
       const levelDisplay = level.charAt(0).toUpperCase() + level.slice(1);
       
       // Buat HTML untuk pesan
       comingSoonContainer.innerHTML = `
           <div class="program-header">
               <h2>Program ${exerciseTypeDisplay} ${levelDisplay}</h2>
           </div>
           
           <div style="text-align: center; padding: 3rem 1rem;">
               <div style="font-size: 3rem; margin-bottom: 1rem;">🚧</div>
               <h3 style="margin-bottom: 1rem; color: #4a90e2;">Coming Soon!</h3>
               <p>Program latihan ini sedang dalam pengembangan dan akan segera tersedia.</p>
               <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;">Silahkan pilih program latihan lain yang tersedia.</p>
               
               <button id="backButtonComingSoon" class="back-button" style="margin-top: 2rem;">Kembali ke Menu Utama</button>
           </div>
       `;
       
       // Tambahkan ke DOM
       document.querySelector('main').appendChild(comingSoonContainer);
       
       // Tambahkan event listener untuk tombol kembali
       document.getElementById('backButtonComingSoon').addEventListener('click', function() {
           resetToMainMenu();
           document.getElementById('comingSoonContainer').remove();
       });
   }
   
   // Fungsi untuk menyembunyikan semua program
   function hideAllPrograms() {
       // Hapus semua elemen coming soon yang mungkin ada
       const comingSoonContainer = document.getElementById('comingSoonContainer');
       if (comingSoonContainer) {
           comingSoonContainer.remove();
       }
       
       // Sembunyikan semua program yang ada
       runningBeginnerProgram.classList.add('hidden');
       runningModerateProgram.classList.add('hidden');
       // Tambahkan program lain di sini jika ada
   }
   
   // Fungsi untuk kembali ke menu utama
   function resetToMainMenu() {
       // Sembunyikan semua program
       hideAllPrograms();
       
       // Reset seleksi
       exerciseCards.forEach(c => c.classList.remove('selected'));
       levelCards.forEach(c => c.classList.remove('selected'));
       selectedExerciseType = '';
       selectedLevel = '';
       
       // Tampilkan menu pemilihan jenis latihan
       exerciseTypeSelection.classList.remove('hidden');
       levelSelection.classList.add('hidden');
   }
   
   // Event listener untuk tombol kembali
   backButtonRunningBeginner.addEventListener('click', resetToMainMenu);
   
   // Tambahkan event listener untuk tombol kembali program lari moderat
   const backButtonRunningModerate = document.createElement('button');
   backButtonRunningModerate.id = 'backButtonRunningModerate';
   backButtonRunningModerate.className = 'back-button';
   backButtonRunningModerate.textContent = 'Kembali ke Menu Utama';
   backButtonRunningModerate.addEventListener('click', resetToMainMenu);
   
   // Tambahkan tombol kembali ke program lari moderat jika belum ada
   if (!document.getElementById('backButtonRunningModerate')) {
       runningModerateProgram.appendChild(backButtonRunningModerate);
   }
   
   // Inisialisasi progress bar (untuk simulasi progres)
   function initializeProgressBar(programContainer) {
       const progressBar = programContainer.querySelector('.progress-bar');
       
       // Animasi progress bar untuk demo
       if (progressBar) {
           setTimeout(() => {
               progressBar.style.width = '15%';
               progressBar.style.transition = 'width 1s ease-in-out';
           }, 500);
       }
   }
   
   // Fungsi untuk melacak progres program latihan
   function trackProgress(programId, progress) {
       // Simpan progress dalam localStorage
       localStorage.setItem(`progress_${programId}`, progress);
       
       // Update tampilan progress bar
       const programContainer = document.getElementById(programId);
       if (programContainer) {
           const progressBar = programContainer.querySelector('.progress-bar');
           if (progressBar) {
               progressBar.style.width = `${progress}%`;
           }
       }
   }
   
   // Fungsi untuk memuat progress yang tersimpan
   function loadSavedProgress() {
       // Cek untuk semua program yang ada
       const programs = ['runningBeginnerProgram', 'runningModerateProgram'];
       
       programs.forEach(programId => {
           const savedProgress = localStorage.getItem(`progress_${programId}`);
           if (savedProgress) {
               const programContainer = document.getElementById(programId);
               if (programContainer) {
                   const progressBar = programContainer.querySelector('.progress-bar');
                   if (progressBar) {
                       progressBar.style.width = `${savedProgress}%`;
                   }
               }
           }
       });
   }
   
   // Panggil fungsi untuk memuat progress tersimpan
   loadSavedProgress();
   
   // Tambahkan fungsionalitas untuk melacak sesi latihan
   function setupSessionTracking() {
       // Tambahkan checkbox pada setiap sesi latihan untuk melacak penyelesaian
       const sessionItems = document.querySelectorAll('.session-item');
       
       sessionItems.forEach(item => {
           // Buat checkbox untuk melacak
           const checkbox = document.createElement('input');
           checkbox.type = 'checkbox';
           checkbox.className = 'session-tracker';
           checkbox.style.marginRight = '10px';
           
           // Tambahkan ke item
           const strong = item.querySelector('strong');
           if (strong) {
               strong.parentNode.insertBefore(checkbox, strong);
           }
           
           // Event listener untuk checkbox
           checkbox.addEventListener('change', function() {
               // Hitung total progres
               updateProgramProgress(this.closest('.program-container').id);
           });
       });
   }
   
   // Fungsi untuk memperbarui progres program
   function updateProgramProgress(programId) {
       const container = document.getElementById(programId);
       if (!container) return;
       
       // Hitung total item dan item yang selesai
       const totalItems = container.querySelectorAll('.session-tracker').length;
       const checkedItems = container.querySelectorAll('.session-tracker:checked').length;
       
       // Hitung persentase
       const percentage = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
       
       // Update progress bar
       trackProgress(programId, percentage);
   }
   
   // Panggil fungsi untuk mengatur pelacakan sesi
   setupSessionTracking();
   
   // Tambahkan fitur ekspor program ke PDF atau kalender
   function setupExportFeatures() {
       // Tambahkan tombol ekspor untuk setiap program
       const programContainers = document.querySelectorAll('.program-container');
       
       programContainers.forEach(container => {
           // Buat div untuk tombol ekspor
           const exportDiv = document.createElement('div');
           exportDiv.className = 'export-buttons';
           exportDiv.style.display = 'flex';
           exportDiv.style.justifyContent = 'center';
           exportDiv.style.gap = '1rem';
           exportDiv.style.margin = '1.5rem 0';
           
           // Tombol ekspor ke PDF
           const pdfButton = document.createElement('button');
           pdfButton.className = 'back-button';
           pdfButton.style.backgroundColor = '#4CAF50';
           pdfButton.textContent = 'Ekspor ke PDF';
           pdfButton.addEventListener('click', function() {
               alert('Fitur ekspor ke PDF segera hadir!');
           });
           
           // Tombol ekspor ke kalender
           const calendarButton = document.createElement('button');
           calendarButton.className = 'back-button';
           calendarButton.style.backgroundColor = '#FF9800';
           calendarButton.textContent = 'Tambah ke Kalender';
           calendarButton.addEventListener('click', function() {
               alert('Fitur tambah ke kalender segera hadir!');
           });
           
           // Tambahkan tombol ke div
           exportDiv.appendChild(pdfButton);
           exportDiv.appendChild(calendarButton);
           
           // Tambahkan div sebelum tombol kembali
           const backButton = container.querySelector('.back-button');
           if (backButton) {
               container.insertBefore(exportDiv, backButton);
           } else {
               container.appendChild(exportDiv);
           }
       });
   }
   
   // Panggil fungsi untuk mengatur fitur ekspor
   setupExportFeatures();
   
   // Tambahkan fitur notifikasi pengingat latihan
   function setupReminderFeature() {
       // Tambahkan toggle notifikasi pengingat
       const programContainers = document.querySelectorAll('.program-container');
       
       programContainers.forEach(container => {
           // Buat div untuk reminder
           const reminderDiv = document.createElement('div');
           reminderDiv.className = 'reminder-setting';
           reminderDiv.style.margin = '1.5rem 0';
           reminderDiv.style.padding = '1rem';
           reminderDiv.style.backgroundColor = '#f8fafc';
           reminderDiv.style.borderRadius = '10px';
           
           // HTML untuk reminder
           reminderDiv.innerHTML = `
               <h3 style="margin-bottom: 0.8rem;">Pengingat Latihan</h3>
               <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                   <input type="checkbox" id="reminder-${container.id}" class="reminder-toggle">
                   <label for="reminder-${container.id}">Aktifkan pengingat latihan</label>
               </div>
               <div class="reminder-details" style="display: none;">
                   <div style="margin-bottom: 0.8rem;">
                       <label style="display: block; margin-bottom: 0.3rem;">Hari:</label>
                       <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                           <label style="display: flex; align-items: center; gap: 0.3rem;">
                               <input type="checkbox" class="day-checkbox" value="1"> Senin
                           </label>
                           <label style="display: flex; align-items: center; gap: 0.3rem;">
                               <input type="checkbox" class="day-checkbox" value="2"> Selasa
                           </label>
                           <label style="display: flex; align-items: center; gap: 0.3rem;">
                               <input type="checkbox" class="day-checkbox" value="3"> Rabu
                           </label>
                           <label style="display: flex; align-items: center; gap: 0.3rem;">
                               <input type="checkbox" class="day-checkbox" value="4"> Kamis
                           </label>
                           <label style="display: flex; align-items: center; gap: 0.3rem;">
                               <input type="checkbox" class="day-checkbox" value="5"> Jumat
                           </label>
                           <label style="display: flex; align-items: center; gap: 0.3rem;">
                               <input type="checkbox" class="day-checkbox" value="6"> Sabtu
                           </label>
                           <label style="display: flex; align-items: center; gap: 0.3rem;">
                               <input type="checkbox" class="day-checkbox" value="0"> Minggu
                           </label>
                       </div>
                   </div>
                   <div style="margin-bottom: 0.8rem;">
                       <label for="reminder-time-${container.id}" style="display: block; margin-bottom: 0.3rem;">Waktu:</label>
                       <input type="time" id="reminder-time-${container.id}" style="padding: 0.5rem; border-radius: 5px; border: 1px solid #e2e8f0;">
                   </div>
                   <button class="save-reminder back-button" style="background-color: #4a90e2; padding: 0.5rem 1rem; font-size: 0.9rem;">Simpan Pengingat</button>
               </div>
           `;
           
           // Tambahkan div sebelum tombol ekspor
           const exportButtons = container.querySelector('.export-buttons');
           if (exportButtons) {
               container.insertBefore(reminderDiv, exportButtons);
           } else {
               const backButton = container.querySelector('.back-button');
               if (backButton) {
                   container.insertBefore(reminderDiv, backButton);
               } else {
                   container.appendChild(reminderDiv);
               }
           }
           
           // Event listener untuk checkbox pengingat
           const reminderToggle = reminderDiv.querySelector('.reminder-toggle');
           const reminderDetails = reminderDiv.querySelector('.reminder-details');
           
           reminderToggle.addEventListener('change', function() {
               if (this.checked) {
                   reminderDetails.style.display = 'block';
               } else {
                   reminderDetails.style.display = 'none';
               }
           });
           
           // Event listener untuk tombol simpan
           const saveButton = reminderDiv.querySelector('.save-reminder');
           saveButton.addEventListener('click', function() {
               // Periksa izin notifikasi
               if (Notification && Notification.permission !== 'granted') {
                   Notification.requestPermission().then(function(permission) {
                       if (permission === 'granted') {
                           saveReminder(container.id, reminderDiv);
                       }
                   });
               } else {
                   saveReminder(container.id, reminderDiv);
               }
           });
       });
   }
   
   // Fungsi untuk menyimpan pengingat
   function saveReminder(programId, reminderDiv) {
       // Dapatkan semua hari yang dipilih
       const selectedDays = [];
       reminderDiv.querySelectorAll('.day-checkbox:checked').forEach(checkbox => {
           selectedDays.push(parseInt(checkbox.value));
       });
       
       // Dapatkan waktu
       const timeInput = reminderDiv.querySelector(`#reminder-time-${programId}`);
       const time = timeInput.value;
       
       if (selectedDays.length === 0 || !time) {
           alert('Silakan pilih hari dan waktu untuk pengingat');
           return;
       }
       
       // Simpan pengaturan pengingat
       const reminderSettings = {
           programId: programId,
           days: selectedDays,
           time: time
       };
       
       localStorage.setItem(`reminder_${programId}`, JSON.stringify(reminderSettings));
       
       // Tampilkan konfirmasi
       alert('Pengingat latihan berhasil disimpan!');
   }
   
   // Panggil fungsi untuk mengatur fitur pengingat
   setupReminderFeature();
   
   // Fungsi untuk mengecek pengingat
   function checkReminders() {
       // Hanya jalankan jika browser mendukung notifikasi
       if (!("Notification" in window)) return;
       
       // Dapatkan semua pengingat yang tersimpan
       const reminderKeys = Object.keys(localStorage).filter(key => key.startsWith('reminder_'));
       
       reminderKeys.forEach(key => {
           const settings = JSON.parse(localStorage.getItem(key));
           const now = new Date();
           const day = now.getDay(); // 0 = Minggu, 1 = Senin, dst.
           
           // Cek apakah hari ini adalah hari yang dipilih
           if (settings.days.includes(day)) {
               const [hours, minutes] = settings.time.split(':');
               const reminderTime = new Date();
               reminderTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
               
               // Cek apakah waktunya sudah tepat (dalam 1 menit terakhir)
               const timeDiff = Math.abs(now - reminderTime);
               if (timeDiff <= 60000) { // 60000 ms = 1 menit
                   // Tampilkan notifikasi
                   const programName = document.querySelector(`#${settings.programId} h2`).textContent;
                   
                   if (Notification.permission === 'granted') {
                       new Notification('Pengingat Latihan', {
                           body: `Saatnya untuk latihan ${programName}!`,
                           icon: '/api/placeholder/192/192'
                       });
                   }
               }
           }
       });
   }
   
   // Cek pengingat setiap menit
   setInterval(checkReminders, 60000);
   
   // Tambahkan fitur berbagi program
   function setupSharingFeature() {
       const programContainers = document.querySelectorAll('.program-container');
       
       programContainers.forEach(container => {
           // Buat tombol berbagi
           const shareButton = document.createElement('button');
           shareButton.className = 'back-button';
           shareButton.style.backgroundColor = '#7B68EE';
           shareButton.style.display = 'flex';
           shareButton.style.alignItems = 'center';
           shareButton.style.justifyContent = 'center';
           shareButton.style.gap = '0.5rem';
           shareButton.style.margin = '1rem auto';
           
           // Tambahkan ikon dan teks
           shareButton.innerHTML = `
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                   <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
               </svg>
               Bagikan Program
           `;
           
           // Event listener untuk berbagi
           shareButton.addEventListener('click', function() {
               // Dapatkan info program
               const programTitle = container.querySelector('h2').textContent;
               const programURL = window.location.href;
               
               // Gunakan Web Share API jika tersedia
               if (navigator.share) {
                   navigator.share({
                       title: programTitle,
                       text: `Lihat program latihan saya: ${programTitle}`,
                       url: programURL
                   }).catch(error => {
                       console.log('Error berbagi:', error);
                   });
               } else {
                   // Fallback untuk browser yang tidak mendukung Web Share API
                   const tempInput = document.createElement('input');
                   document.body.appendChild(tempInput);
                   tempInput.value = `${programTitle} - ${programURL}`;
                   tempInput.select();
                   document.execCommand('copy');
                   document.body.removeChild(tempInput);
                   
                   alert('Link program telah disalin ke clipboard!');
               }
           });
           
           // Tambahkan tombol berbagi sebelum tombol ekspor
           const exportButtons = container.querySelector('.export-buttons');
           if (exportButtons) {
               container.insertBefore(shareButton, exportButtons);
           } else {
               const reminderDiv = container.querySelector('.reminder-setting');
               if (reminderDiv) {
                   container.insertBefore(shareButton, reminderDiv);
               } else {
                   const backButton = container.querySelector('.back-button');
                   if (backButton) {
                       container.insertBefore(shareButton, backButton);
                   } else {
                       container.appendChild(shareButton);
                   }
               }
           }
       });
   }
   
   // Panggil fungsi untuk mengatur fitur berbagi
   setupSharingFeature();
});