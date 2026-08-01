(()=>{
  const loadLogoStyles=version=>{
    document.querySelectorAll('link[data-sv-logo-style]').forEach(link=>link.remove());

    const exact=document.createElement('link');
    exact.rel='stylesheet';
    exact.href=`assets/sv-logo-exact.css?v=${version}`;
    exact.dataset.svLogoStyle='true';
    document.head.appendChild(exact);

    const display=document.createElement('link');
    display.rel='stylesheet';
    display.href=`assets/logo-display-fix.css?v=${version}`;
    display.dataset.svLogoStyle='true';
    document.head.appendChild(display);
  };

  loadLogoStyles('6');

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
  app.onload=()=>loadLogoStyles('7');
  document.head.appendChild(app);

  window.addEventListener('load',()=>loadLogoStyles('8'),{once:true});
})();
