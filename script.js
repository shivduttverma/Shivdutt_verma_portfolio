(()=>{
  document.querySelectorAll('[data-pro-portrait]').forEach(image=>{
    const portraitUrl=new URL('assets/shivdutt-verma.jpg',document.baseURI);
    portraitUrl.searchParams.set('v','20260804-1');
    image.src=portraitUrl.href;
    image.style.visibility='visible';
    image.style.opacity='1';
  });

  const portraitStyle=document.createElement('link');
  portraitStyle.rel='stylesheet';
  portraitStyle.href='portrait-professional.css?v=9';
  document.head.appendChild(portraitStyle);

  const app=document.createElement('script');
  app.src='script-main.js?v=7';
  app.defer=true;
  document.head.appendChild(app);
})();
