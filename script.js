(()=>{
  const logo=document.querySelector('.brand-mark');
  if(logo){
    logo.replaceChildren();
    logo.setAttribute('aria-label','SV logo');
    logo.style.setProperty('width','62px','important');
    logo.style.setProperty('height','62px','important');
    logo.style.setProperty('flex','0 0 62px','important');
    logo.style.setProperty('background','transparent','important');
    logo.style.setProperty('border','0','important');
    logo.style.setProperty('border-radius','0','important');
    logo.style.setProperty('box-shadow','none','important');
    logo.style.setProperty('overflow','visible','important');

    const logoImage=document.createElement('img');
    logoImage.src='assets/sv-logo-4k.png?v=20260802-1';
    logoImage.alt='SV';
    logoImage.width=62;
    logoImage.height=62;
    logoImage.style.cssText='display:block;width:100%;height:100%;object-fit:contain;object-position:center;background:transparent;border:0;';
    logoImage.onerror=()=>{
      logoImage.remove();
      logo.textContent='SV';
      logo.style.setProperty('display','grid','important');
      logo.style.setProperty('place-items','center','important');
      logo.style.setProperty('color','#f4b400','important');
      logo.style.setProperty('font-size','20px','important');
      logo.style.setProperty('font-weight','900','important');
      logo.style.setProperty('border','2px solid #f4b400','important');
      logo.style.setProperty('border-radius','16px','important');
    };
    logo.appendChild(logoImage);
  }

  document.querySelectorAll('[data-pro-portrait]').forEach(image=>{
    image.src='assets/shivdutt-verma.jpg?v=20260802-1';
    image.style.visibility='visible';
    image.style.opacity='1';
  });

  const portraitStyle=document.createElement('link');
  portraitStyle.rel='stylesheet';
  portraitStyle.href='portrait-professional.css?v=7';
  document.head.appendChild(portraitStyle);

  const app=document.createElement('script');
  app.src='script-main.js?v=4';
  app.defer=true;
  document.head.appendChild(app);
})();
