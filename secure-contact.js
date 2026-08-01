(()=>{
  const API=String(window.SV_SECURE_API||'').replace(/\/$/,'');
  const contact=document.getElementById('contact');
  const nav=document.getElementById('navMenu');
  if(!contact)return;

  if(!API){
    contact.remove();
    nav?.querySelector('a[href="#contact"]')?.remove();
    return;
  }

  const css=document.createElement('link');
  css.rel='stylesheet';
  css.href='secure-contact.css?v=4';
  document.head.appendChild(css);

  contact.hidden=false;
  if(nav&&!nav.querySelector('a[href="#contact"]')){
    const link=document.createElement('a');
    link.href='#contact';
    link.textContent='Contact';
    nav.appendChild(link);
  }

  contact.classList.add('secure-contact-section');
  contact.innerHTML=`<div class="container secure-contact-grid"><div class="secure-contact-copy reveal visible"><span class="eyebrow">PROJECT ENQUIRY</span><h2>Tell me about your project.</h2><p>Share the required service, expected timeline, budget range and project details. Your enquiry is protected against automated spam and stored privately.</p><div class="privacy-points"><div class="privacy-point"><i>01</i><div><b>Clear project brief</b><span>Provide the service, scope, timeline and expected result.</span></div></div><div class="privacy-point"><i>02</i><div><b>Spam-protected submission</b><span>Cloudflare security verification and rate limiting block automated abuse.</span></div></div><div class="privacy-point"><i>03</i><div><b>Private encrypted review</b><span>Your enquiry is encrypted and available only inside the private admin dashboard.</span></div></div></div></div><form class="secure-form reveal visible" id="secureEnquiryForm" novalidate><div class="form-head"><div><span class="eyebrow">START A PROJECT</span><h3>Project enquiry form</h3><p>Complete the details and pass the security check.</p></div><span class="secure-badge">SECURE FORM</span></div><div class="secure-form-grid"><label>Name<input id="sqName" maxlength="100" autocomplete="name" required placeholder="Your full name"></label><label>Email<input id="sqEmail" maxlength="254" type="email" autocomplete="email" required placeholder="name@example.com"></label><label class="wide">Mobile number <span style="font-weight:500;color:#6b7c90">(optional)</span><input id="sqPhone" maxlength="18" inputmode="tel" autocomplete="tel" placeholder="10-digit Indian number or +country code"></label><label>Service required<select id="sqService" required><option value="">Choose a service</option><option>Business Website</option><option>E-commerce / Shopify Store</option><option>Product Listing & Catalog</option><option>Business / Management App</option><option>Portfolio / Landing Page</option><option>Form / Data Collection</option><option>Social Media / YouTube Design</option><option>PDF / Document Work</option><option>Excel / Data Entry</option><option>Other Online Work</option></select></label><label>Estimated budget<select id="sqBudget"><option value="">Not decided</option><option>Below ₹5,000</option><option>₹5,000 – ₹10,000</option><option>₹10,000 – ₹25,000</option><option>₹25,000 – ₹50,000</option><option>Above ₹50,000</option></select></label><label>Expected delivery<input id="sqDelivery" type="date"></label><label class="wide">Project details<textarea id="sqMessage" maxlength="5000" required placeholder="Describe the required pages, features, platform, product count or expected result."></textarea></label><label class="hp-field" aria-hidden="true">Website<input id="sqWebsite" tabindex="-1" autocomplete="off"></label><div class="turnstile-wrap" id="turnstileBox"></div><button class="secure-submit" id="secureSubmit" type="submit" disabled>Complete security check</button><div class="form-message" id="secureMessage"></div><div class="privacy-note">Contact details are used only to review and respond to this enquiry.</div></div></form></div>`;

  const $=id=>document.getElementById(id);
  const state={widget:null,verified:false};
  const form=$('secureEnquiryForm');
  const submit=$('secureSubmit');
  const message=$('secureMessage');

  function show(text,type='bad'){
    message.textContent=text;
    message.className=`form-message show ${type}`;
  }

  function clear(){
    message.className='form-message';
    message.textContent='';
  }

  async function api(path,body){
    const response=await fetch(API+path,{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify(body)
    });
    const data=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(data.error||'Request failed.');
    return data;
  }

  function turnstileToken(){
    return window.turnstile&&state.widget!==null?window.turnstile.getResponse(state.widget):'';
  }

  function setVerified(value){
    state.verified=value;
    submit.disabled=!value;
    submit.textContent=value?'Send Project Enquiry':'Complete security check';
  }

  function resetTurnstile(){
    setVerified(false);
    if(window.turnstile&&state.widget!==null)window.turnstile.reset(state.widget);
  }

  async function loadTurnstile(){
    try{
      const response=await fetch(API+'/config');
      if(!response.ok)throw new Error('Security verification is unavailable.');
      const config=await response.json();
      if(!config.turnstileSiteKey)throw new Error('Security verification is unavailable.');

      await new Promise((resolve,reject)=>{
        if(window.turnstile)return resolve();
        const script=document.createElement('script');
        script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async=true;
        script.defer=true;
        script.onload=resolve;
        script.onerror=()=>reject(new Error('Security verification could not load.'));
        document.head.appendChild(script);
      });

      state.widget=window.turnstile.render('#turnstileBox',{
        sitekey:config.turnstileSiteKey,
        theme:'light',
        callback:()=>setVerified(true),
        'expired-callback':()=>setVerified(false),
        'error-callback':()=>{
          setVerified(false);
          show('Security verification could not complete. Refresh and try again.');
        }
      });
    }catch(error){
      show(error.message);
      submit.disabled=true;
    }
  }

  form.addEventListener('submit',async event=>{
    event.preventDefault();
    clear();

    const token=turnstileToken();
    if(!state.verified||!token){
      show('Complete the security check before submitting.');
      return;
    }

    const payload={
      name:$('sqName').value.trim(),
      email:$('sqEmail').value.trim(),
      phone:$('sqPhone').value.trim(),
      service:$('sqService').value,
      budget:$('sqBudget').value,
      deliveryDate:$('sqDelivery').value,
      message:$('sqMessage').value.trim(),
      website:$('sqWebsite').value,
      turnstileToken:token
    };

    if(!payload.name||!payload.email||!payload.service||!payload.message){
      show('Complete all required fields.');
      return;
    }

    submit.disabled=true;
    submit.textContent='Submitting…';

    try{
      const data=await api('/enquiries',payload);
      form.reset();
      resetTurnstile();
      show(`Enquiry submitted securely. Reference: ${data.enquiryId}`,'ok');
    }catch(error){
      show(error.message);
      resetTurnstile();
    }
  });

  document.querySelectorAll('.request-service').forEach(link=>link.addEventListener('click',()=>{
    const option=[...$('sqService').options].find(item=>item.textContent.trim()===link.dataset.service);
    if(option)$('sqService').value=option.value;
  }));

  loadTurnstile();
})();
