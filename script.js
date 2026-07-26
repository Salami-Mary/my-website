document.getElementById('yr').textContent = new Date().getFullYear();

  const body = document.body;
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');
  const mIcon = document.getElementById('mThemeBtn');
  function store(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
  function read(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function applyTheme(light){
    body.classList.toggle('light-mode', light);
    themeIcon.textContent = light ? '☾' : '☀';
    themeLabel.textContent = light ? 'Dark mode' : 'Light mode';
    if(mIcon) mIcon.textContent = light ? '☀' : '☾';
  }
  applyTheme(read('theme') === 'light');
  function toggleTheme(){ const light = !body.classList.contains('light-mode'); applyTheme(light); store('theme', light ? 'light' : 'dark'); }
  document.getElementById('themeBtn').addEventListener('click', toggleTheme);
  if(mIcon) mIcon.addEventListener('click', toggleTheme);

  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.getElementById('mMenuBtn');
  if(menuBtn){ menuBtn.addEventListener('click', ()=> sidebar.classList.toggle('open')); }
  document.querySelectorAll('.sb-nav-link').forEach(l=> l.addEventListener('click', ()=> sidebar.classList.remove('open')));

  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const ro = new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); ro.unobserve(e.target);} }); },{threshold:.1});
    reveals.forEach(el=>ro.observe(el));
  } else { reveals.forEach(el=>el.classList.add('in')); }

  const links = [...document.querySelectorAll('.sb-nav-link')];
  const map = new Map(links.map(a=>[a.getAttribute('href').slice(1), a]));
  const spy = new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ links.forEach(l=>l.classList.remove('active')); const a=map.get(e.target.id); if(a) a.classList.add('active'); } }); },{rootMargin:'-45% 0px -50% 0px',threshold:0});
  document.querySelectorAll('.content-section').forEach(s=>spy.observe(s));
