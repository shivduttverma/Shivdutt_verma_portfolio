// Public configuration only. Never place API secrets in this file.
window.SV_SECURE_API = "https://sp-portfolio-api.spverma135.workers.dev";

(()=>{
  const requiredScript=document.createElement('script');
  requiredScript.src='secure-required.js?v=2';
  requiredScript.defer=true;
  document.head.appendChild(requiredScript);

  const accessScript=document.createElement('script');
  accessScript.src='footer-access.js?v=1';
  accessScript.defer=true;
  document.head.appendChild(accessScript);
})();
