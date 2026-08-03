(()=>{
  const logo=document.querySelector('.brand-mark');
  if(logo){
    logo.replaceChildren();
    logo.setAttribute('aria-label','SV logo');
    logo.style.setProperty('width','62px','important');
    logo.style.setProperty('height','62px','important');
    logo.style.setProperty('flex','0 0 62px','important');
    logo.style.setProperty('background-image','url("https://shivduttverma.github.io/sv-portfolio/assets/sv-logo-4k.png?v=20260803-1"),url("https://shivduttverma.github.io/sv-portfolio/assets/sv-logo.svg?v=20260803-1")','important');
    logo.style.setProperty('background-position','center,center','important');
    logo.style.setProperty('background-size','contain,contain','important');
    logo.style.setProperty('background-repeat','no-repeat,no-repeat','important');
    logo.style.setProperty('background-color','transparent','important');
    logo.style.setProperty('border','0','important');
    logo.style.setProperty('border-radius','0','important');
    logo.style.setProperty('box-shadow','none','important');
    logo.style.setProperty('overflow','visible','important');
    logo.style.setProperty('font-size','0','important');
  }

  document.querySelectorAll('[data-pro-portrait]').forEach(image=>{
    image.src='https://shivduttverma.github.io/sv-portfolio/assets/shivdutt-verma.jpg?v=20260803-1';
    image.style.visibility='visible';
    image.style.opacity='1';
  });

  const portraitStyle=document.createElement('link');
  portraitStyle.rel='stylesheet';
  portraitStyle.href='portrait-professional.css?v=8';
  document.head.appendChild(portraitStyle);

  const app=document.createElement('script');
  app.src='script-main.js?v=6';
  app.defer=true;
  document.head.appendChild(app);
})();
