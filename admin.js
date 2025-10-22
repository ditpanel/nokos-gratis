// Aman: tidak mengunduh file / tidak meminta data pribadi.
// Fungsi: simulasi progress, alert palsu, lalu reveal pesan ulang tahun + konfeti.

const startBtn = document.getElementById('startBtn');
const startCard = document.getElementById('startCard');
const scanCard = document.getElementById('scanCard');
const progressBar = document.getElementById('progressBar');
const scanText = document.getElementById('scanText');
const cancelBtn = document.getElementById('cancelBtn');
const alertCard = document.getElementById('alertCard');
const fakeRemoveBtn = document.getElementById('fakeRemoveBtn');
const revealBtn = document.getElementById('revealBtn');
const revealCard = document.getElementById('revealCard');
const againBtn = document.getElementById('againBtn');

let progress = 0;
let timer = null;

function show(el){
  el.classList.remove('hidden');
  el.setAttribute('aria-hidden','false');
}
function hide(el){
  el.classList.add('hidden');
  el.setAttribute('aria-hidden','true');
}

function startScan(){
  hide(startCard);
  show(scanCard);
  progress = 0;
  progressBar.style.width = '0%';
  scanText.textContent = 'Memindai file sistem...';

  timer = setInterval(()=>{
    progress += Math.floor(Math.random()*12)+6; // acak progress supaya terasa nyata
    if(progress>100) progress = 100;
    progressBar.style.width = progress + '%';

    // update teks
    if(progress < 40) scanText.textContent = 'Memindai direktori user...';
    else if(progress < 70) scanText.textContent = 'Mencari artefak nokos...';
    else if(progress < 95) scanText.textContent = 'Menjalankan heuristik keamanan...';
    else scanText.textContent = 'Selesai. Mengumpulkan hasil...';

    if(progress >= 100){
      clearInterval(timer);
      // jeda singkat lalu tampil alert palsu
      setTimeout(()=>{
        hide(scanCard);
        show(alertCard);
      },700);
    }
  },420);
}

startBtn.onclick = startScan;
cancelBtn.onclick = () => {
  clearInterval(timer);
  hide(scanCard);
  show(startCard);
};

// tombol "Hapus Sekarang" tampil dramatis tapi cuma animasi
fakeRemoveBtn.onclick = () => {
  fakeRemoveBtn.textContent = 'Menghapus...';
  fakeRemoveBtn.disabled = true;
  setTimeout(()=> {
    fakeRemoveBtn.textContent = 'Selesai';
    // lanjut ke reveal
    hide(alertCard);
    revealPrank();
  }, 1400);
};

revealBtn.onclick = () => {
  hide(alertCard);
  revealPrank();
};

function revealPrank(){
  show(revealCard);
  launchConfetti();
}

againBtn.onclick = () => {
  // reset
  hide(revealCard);
  hide(alertCard);
  hide(scanCard);
  show(startCard);
};

// konfeti sederhana (dom)
function launchConfetti(){
  const confDiv = document.getElementById('confetti');
  confDiv.innerHTML = '';
  const colors = ['#06b6d4','#60a5fa','#f97316','#ef4444','#a78bfa','#facc15'];

  for(let i=0;i<40;i++){
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.background = colors[i % colors.length];
    piece.style.left = Math.random()*100 + '%';
    piece.style.top = '-10%';
    piece.style.transform = `rotate(${Math.random()*360}deg)`;
    piece.style.width = (6 + Math.random()*12) + 'px';
    piece.style.height = (10 + Math.random()*18) + 'px';
    confDiv.appendChild(piece);

    // animate piece
    const delay = Math.random()*600;
    const duration = 2200 + Math.random()*1600;
    piece.animate([
      { transform: `translateY(0) rotate(${Math.random()*360}deg)`, opacity:1 },
      { transform: `translateY(${300 + Math.random()*200}px) rotate(${Math.random()*720}deg)`, opacity:0.9 }
    ], { duration, delay, iterations:1, easing:'cubic-bezier(.2,.7,.2,1)' });

    // remove after animation
    setTimeout(()=> piece.remove(), duration + delay + 200);
  }
}