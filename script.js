(()=>{
  const logo=document.querySelector('.brand-mark');
  if(logo){
    logo.replaceChildren();
    logo.textContent='';
    logo.setAttribute('aria-label','SV logo');
    const logoUrl=new URL('assets/sv-logo-4k.png',document.baseURI);
    logoUrl.searchParams.set('v','20260803-1');
    logo.style.setProperty('display','block','important');
    logo.style.setProperty('width','62px','important');
    logo.style.setProperty('height','62px','important');
    logo.style.setProperty('flex','0 0 62px','important');
    logo.style.setProperty('background-image',`url("${logoUrl.href}")`,'important');
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

  document.querySelectorAll('[data-pro-portrait]').forEach(image=>{
    const portraitUrl=new URL('assets/shivdutt-verma.jpg',document.baseURI);
    portraitUrl.searchParams.set('v','20260803-1');
    image.src=portraitUrl.href;
    image.style.visibility='visible';
    image.style.opacity='1';
  });

  const portraitStyle=document.createElement('link');
  portraitStyle.rel='stylesheet';
  portraitStyle.href='portrait-professional.css?v=8';
  document.head.appendChild(portraitStyle);

  const app=document.createElement('script');
  app.src='script-main.js?v=5';
  app.defer=true;
  document.head.appendChild(app);
})();
