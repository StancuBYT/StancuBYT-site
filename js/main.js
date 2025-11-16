// main.js - small interactivity: counters, roadmap toggle, logo animation toward buy
document.addEventListener('DOMContentLoaded', () => {
  // set year
  document.getElementById('year')?.textContent = new Date().getFullYear();

  // visitor counter (local simulation)
  const visitorsEl = document.getElementById('visitors');
  const onlineEl = document.getElementById('online');
  const visitsKey = 'sbyt_visits_total';
  let total = parseInt(localStorage.getItem(visitsKey) || '0', 10);
  total += Math.floor(Math.random()*3) + 1; // simulate new visits
  localStorage.setItem(visitsKey, total);
  if(visitorsEl) visitorsEl.textContent = total.toString();

  // simulate online users
  if(onlineEl) onlineEl.textContent = (Math.floor(Math.random()*60)+1).toString();

  // simple token stats (you can replace with real API)
  const sold = document.getElementById('sold-count');
  const bought = document.getElementById('bought-count');
  const avail = document.getElementById('avail-count');
  // sample values (update as needed)
  if(sold) sold.textContent = '1,200,000';
  if(bought) bought.textContent = '800,000';
  if(avail) avail.textContent = '2,000,000';

  // logo animation that points to buy button occasionally
  const logo = document.getElementById('site-logo');
  const buyLogo = document.getElementById('buy-logo');
  const buyBtn = document.getElementById('buy-btn');
  if(logo){
    logo.classList.add('animate'); // subtle 3D motion
  }

  // small "point" animation: logo moves toward buy button every 12s
  function pointToBuy(){
    if(!logo || !buyBtn || !buyLogo) return;
    logo.style.transform = 'rotateY(0deg) translateY(-6px) scale(1.02)';
    buyLogo.style.transform = 'translateX(6px) scale(1.05)';
    setTimeout(()=>{
      logo.style.transform = '';
      buyLogo.style.transform = '';
    },900);
  }
  setInterval(pointToBuy, 12000);

  // smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth'});
    });
  });

});

