// Public configuration only. Never place API secrets in this file.
window.SV_SECURE_API = "https://sp-portfolio-api.spverma135.workers.dev";

(()=>{
  const script=document.createElement('script');
  script.src='secure-required.js?v=1';
  script.defer=true;
  document.head.appendChild(script);
})();
