(()=>{
  const lockApprovedLogo=()=>{
    const mark=document.querySelector('.brand-mark');
    if(!mark)return;

    const computed=getComputedStyle(mark).backgroundImage;
    const match=computed&&computed.match(/^url\(["']?(.*?)["']?\)$/);
    const existing=mark.querySelector('img[data-approved-logo]');

    if(!existing&&match&&match[1]){
      const img=document.createElement('img');
      img.src=match[1];
      img.alt='SV logo';
      img.dataset.approvedLogo='true';
      img.decoding='async';
      img.draggable=false;
      img.style.setProperty('width','100%','important');
      img.style.setProperty('height','100%','important');
      img.style.setProperty('object-fit','contain','important');
      img.style.setProperty('display','block','important');
      img.style.setProperty('border-radius','0','important');
      mark.replaceChildren(img);
    }

    mark.style.setProperty('background','none','important');
    mark.style.setProperty('background-image','none','important');
    mark.style.setProperty('border','0','important');
    mark.style.setProperty('border-radius','0','important');
    mark.style.setProperty('box-shadow','none','important');
    mark.style.setProperty('overflow','visible','important');
    mark.style.setProperty('padding','0','important');
    mark.style.setProperty('font-size','0','important');
  };

  const loadLogoStyles=version=>{
    document.querySelectorAll('link[data-sv-logo-style]').forEach(link=>link.remove());

    const exact=document.createElement('link');
    exact.rel='stylesheet';
    exact.href=`assets/sv-logo-exact.css?v=${version}`;
    exact.dataset.svLogoStyle='true';
    exact.onload=()=>requestAnimationFrame(lockApprovedLogo);
    document.head.appendChild(exact);

    const display=document.createElement('link');
    display.rel='stylesheet';
    display.href=`assets/logo-display-fix.css?v=${version}`;
    display.dataset.svLogoStyle='true';
    display.onload=()=>requestAnimationFrame(lockApprovedLogo);
    document.head.appendChild(display);
  };

  const loadPortraitStyle=version=>{
    document.querySelectorAll('link[data-portrait-style]').forEach(link=>link.remove());
    const style=document.createElement('link');
    style.rel='stylesheet';
    style.href=`portrait-professional.css?v=${version}`;
    style.dataset.portraitStyle='true';
    document.head.appendChild(style);
  };

  loadLogoStyles('9');
  loadPortraitStyle('4');

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
  app.src='script-main.js?v=2';
  app.defer=true;
  app.onload=()=>{
    loadLogoStyles('10');
    loadPortraitStyle('5');
    setTimeout(lockApprovedLogo,0);
  };
  document.head.appendChild(app);

  window.addEventListener('load',()=>{
    loadLogoStyles('11');
    loadPortraitStyle('6');
    setTimeout(lockApprovedLogo,50);
  },{once:true});

  const logoObserver=new MutationObserver(()=>lockApprovedLogo());
  const startObserver=()=>{
    const mark=document.querySelector('.brand-mark');
    if(mark)logoObserver.observe(mark,{attributes:true,childList:true,subtree:false});
  };
  startObserver();
})();
