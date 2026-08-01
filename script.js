(()=>{
  const oldLogo=document.querySelector('.brand-mark');
  if(oldLogo)oldLogo.remove();

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
  portraitStyle.href='portrait-professional.css?v=5';
  document.head.appendChild(portraitStyle);

  const app=document.createElement('script');
  app.src='script-main.js?v=2';
  app.defer=true;
  document.head.appendChild(app);
})();