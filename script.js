(()=>{
  const logo=document.querySelector('.brand-mark');
  if(logo){
    logo.textContent='';
    logo.setAttribute('aria-label','SV logo');
    logo.style.setProperty('width','62px','important');
    logo.style.setProperty('height','62px','important');
    logo.style.setProperty('flex','0 0 62px','important');
    logo.style.setProperty('background-image','url("assets/sv-logo-4k.png?v=20260801-2")','important');
    logo.style.setProperty('background-position','center','important');
    logo.style.setProperty('background-size','contain','important');
    logo.style.setProperty('background-repeat','no-repeat','important');
    logo.style.setProperty('background-color','transparent','important');
    logo.style.setProperty('border','0','important');
    logo.style.setProperty('border-radius','0','important');
    logo.style.setProperty('box-shadow','none','important');
    logo.style.setProperty('overflow','visible','important');
    logo.style.setProperty('font-size','0','important');
  }

  const portraits=[...document.querySelectorAll('[data-pro-portrait]')];
  portraits.forEach(image=>{
    image.src='assets/shivdutt-verma.jpg?v=20260801-2';
    image.style.removeProperty('visibility');
    image.style.removeProperty('opacity');
    image.style.visibility='visible';
    image.style.opacity='1';
  });

  const portraitStyle=document.createElement('link');
  portraitStyle.rel='stylesheet';
  portraitStyle.href='portrait-professional.css?v=6';
  document.head.appendChild(portraitStyle);

  const app=document.createElement('script');
  app.src='script-main.js?v=3';
  app.defer=true;
  document.head.appendChild(app);
})();
