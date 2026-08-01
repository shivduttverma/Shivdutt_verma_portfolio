(()=>{
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

  const app=document.createElement('script');
  app.src='script-main.js?v=1';
  app.defer=true;
  document.head.appendChild(app);
})();
