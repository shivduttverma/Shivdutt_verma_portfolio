(()=>{
  const TARGET_TEXT='Shivdutt Verma';
  const HOLD_MS=7000;

  function install(){
    const target=[...document.querySelectorAll('footer span, footer strong')]
      .find(element=>element.textContent.trim()===TARGET_TEXT);
    if(!target||target.dataset.holdAccess==='1')return false;

    target.dataset.holdAccess='1';
    target.style.userSelect='none';
    target.style.webkitUserSelect='none';

    let timer=0;
    let startX=0;
    let startY=0;

    const cancel=()=>{
      if(timer)window.clearTimeout(timer);
      timer=0;
    };

    const begin=event=>{
      if(event.pointerType==='mouse'&&event.button!==0)return;
      startX=event.clientX;
      startY=event.clientY;
      cancel();
      timer=window.setTimeout(()=>{
        timer=0;
        window.location.assign('admin-login/');
      },HOLD_MS);
    };

    const move=event=>{
      if(!timer)return;
      if(Math.abs(event.clientX-startX)>12||Math.abs(event.clientY-startY)>12)cancel();
    };

    target.addEventListener('pointerdown',begin);
    target.addEventListener('pointermove',move);
    target.addEventListener('pointerup',cancel);
    target.addEventListener('pointercancel',cancel);
    target.addEventListener('pointerleave',cancel);
    target.addEventListener('contextmenu',cancel);
    window.addEventListener('scroll',cancel,{passive:true});
    window.addEventListener('blur',cancel);
    return true;
  }

  if(!install()){
    const observer=new MutationObserver(()=>{
      if(install())observer.disconnect();
    });
    observer.observe(document.documentElement,{childList:true,subtree:true});
  }
})();
