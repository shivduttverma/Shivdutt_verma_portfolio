(()=>{
  function lockApprovedLogo(){
    const mark=document.querySelector('.brand-mark');
    if(!mark)return;
    const approved=getComputedStyle(mark).backgroundImage;
    if(!approved||approved==='none')return;
    mark.textContent='';
    mark.style.setProperty('background-image',approved,'important');
    mark.style.setProperty('background-color','transparent','important');
    mark.style.setProperty('background-size','contain','important');
    mark.style.setProperty('background-position','center','important');
    mark.style.setProperty('background-repeat','no-repeat','important');
    mark.style.setProperty('border','0','important');
    mark.style.setProperty('border-radius','0','important');
    mark.style.setProperty('box-shadow','none','important');
    mark.style.setProperty('overflow','visible','important');
    mark.style.setProperty('width','62px','important');
    mark.style.setProperty('height','62px','important');
    mark.style.setProperty('flex','0 0 62px','important');
  }

  const logoStyle=document.createElement('link');
  logoStyle.rel='stylesheet';
  logoStyle.href='assets/sv-logo-exact.css?v=10';
  logoStyle.onload=lockApprovedLogo;
  document.head.appendChild(logoStyle);

  const portraits=[...document.querySelectorAll('[data-pro-portrait]')];
  portraits.forEach(image=>{
    image.style.opacity='0';
    image.style.visibility='hidden';
    image.style.transition='opacity .22s ease';
    const reveal=()=>{
      if(!String(image.src||'').startsWith('data:image/webp'))return;
      image.style.visibility='visible';
      requestAnimationFrame(()=>{image.style.opacity='1'});
    };
    image.addEventListener('load',reveal);
    const watcher=new MutationObserver(reveal);
    watcher.observe(image,{attributes:true,attributeFilter:['src']});
  });

  const portraitStyle=document.createElement('link');
  portraitStyle.rel='stylesheet';
  portraitStyle.href='portrait-professional.css?v=4';
  document.head.appendChild(portraitStyle);

  const app=document.createElement('script');
  app.src='script-main.js?v=1';
  app.defer=true;
  app.onload=lockApprovedLogo;
  document.head.appendChild(app);

  window.addEventListener('load',lockApprovedLogo,{once:true});
  setTimeout(lockApprovedLogo,1200);
})();
