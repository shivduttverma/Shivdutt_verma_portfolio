(()=>{
  const logo='assets/sv-circle-logo.svg?v=1';
  const mark=document.querySelector('.brand-mark');
  if(mark){
    mark.textContent='';
    mark.classList.add('brand-mark-final');
    const image=document.createElement('img');
    image.src=logo;
    image.alt='SV';
    image.width=64;
    image.height=64;
    image.decoding='async';
    mark.appendChild(image);
  }

  let icon=document.querySelector('link[rel="icon"]');
  if(!icon){
    icon=document.createElement('link');
    icon.rel='icon';
    document.head.appendChild(icon);
  }
  icon.type='image/svg+xml';
  icon.href=logo;

  const style=document.createElement('style');
  style.textContent=`
    .brand-mark.brand-mark-final{
      width:62px!important;height:62px!important;min-width:62px!important;
      padding:0!important;border:0!important;border-radius:50%!important;
      background:transparent!important;box-shadow:none!important;
      outline:0!important;overflow:visible!important;display:grid!important;place-items:center!important;
    }
    .brand-mark.brand-mark-final:before,.brand-mark.brand-mark-final:after{content:none!important;display:none!important}
    .brand-mark-final img{display:block;width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 8px 16px rgba(216,154,36,.22))}
    @media(max-width:760px){
      .brand-mark.brand-mark-final{width:54px!important;height:54px!important;min-width:54px!important}
    }
  `;
  document.head.appendChild(style);
})();
