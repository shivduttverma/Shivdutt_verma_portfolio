(()=>{
  const API=String(window.SV_SECURE_API||'').replace(/\/$/,'');
  const contact=document.getElementById('contact');
  const nav=document.getElementById('navMenu');
  if(!contact)return;
  if(!API){contact.remove();nav?.querySelector('a[href="#contact"]')?.remove();return;}

  const css=document.createElement('link');css.rel='stylesheet';css.href='secure-contact.css?v=5';document.head.appendChild(css);
  contact.hidden=false;
  if(nav&&!nav.querySelector('a[href="#contact"]')){const link=document.createElement('a');link.href='#contact';link.textContent='Contact';nav.appendChild(link);}

  contact.classList.add('secure-contact-section');
  contact.innerHTML=`<div class="container secure-contact-grid"><div class="secure-contact-copy reveal visible"><span class="eyebrow">PROJECT ENQUIRY</span><h2>Tell me about your project.</h2><p>Share the required service, expected timeline, budget range and project details. Your enquiry is protected against automated spam and stored privately.</p><div class="privacy-points"><div class="privacy-point"><i>01</i><div><b>Clear project brief</b><span>Provide the service, scope, timeline and expected result.</span></div></div><div class="privacy-point"><i>02</i><div><b>Spam-protected submission</b><span>Cloudflare security verification and rate limiting block automated abuse.</span></div></div><div class="privacy-point"><i>03</i><div><b>Private encrypted review</b><span>Your enquiry is encrypted and available only inside the private admin dashboard.</span></div></div></div></div><form class="secure-form reveal visible" id="secureEnquiryForm" novalidate><div class="form-head"><div><span class="eyebrow">START A PROJECT</span><h3>Project enquiry form</h3><p>Complete the details and pass the security check.</p></div><span class="secure-badge">SECURE FORM</span></div><div class="secure-form-grid"><label>Name<input id="sqName" maxlength="100" autocomplete="name" required placeholder="Your full name"><small class="field-error" id="sqNameError"></small></label><label>Email<input id="sqEmail" maxlength="254" type="email" autocomplete="email" required placeholder="name@example.com"><small class="field-error" id="sqEmailError"></small></label><label class="wide">Mobile number<input id="sqPhone" maxlength="18" inputmode="tel" autocomplete="tel" required placeholder="10-digit Indian number or +country code"><small class="field-error" id="sqPhoneError"></small></label><label>Service required<select id="sqService" required><option value="">Choose a service</option><option>Business Website</option><option>E-commerce / Shopify Store</option><option>Product Listing & Catalog</option><option>Business / Management App</option><option>Portfolio / Landing Page</option><option>Form / Data Collection</option><option>Social Media / YouTube Design</option><option>PDF / Document Work</option><option>Excel / Data Entry</option><option>Other Online Work</option></select><small class="field-error" id="sqServiceError"></small></label><label>Estimated budget<select id="sqBudget" required><option value="">Choose a budget</option><option>Below ₹5,000</option><option>₹5,000 – ₹10,000</option><option>₹10,000 – ₹25,000</option><option>₹25,000 – ₹50,000</option><option>Above ₹50,000</option></select><small class="field-error" id="sqBudgetError"></small></label><label>Expected delivery<input id="sqDelivery" type="date"><small class="field-error" id="sqDeliveryError"></small></label><label class="wide">Project details<textarea id="sqMessage" maxlength="5000" required placeholder="Describe the required pages, features, platform, product count or expected result."></textarea><small class="field-error" id="sqMessageError"></small></label><label class="hp-field" aria-hidden="true">Website<input id="sqWebsite" tabindex="-1" autocomplete="off"></label><div class="turnstile-wrap" id="turnstileBox"></div><button class="secure-submit" id="secureSubmit" type="submit" disabled>Complete security check</button><div class="form-message" id="secureMessage"></div><div class="privacy-note">Contact details are used only to review and respond to this enquiry.</div></div></form></div>`;

  const $=id=>document.getElementById(id);
  const state={widget:null,verified:false};
  const form=$('secureEnquiryForm'),submit=$('secureSubmit'),message=$('secureMessage');
  const fields=['sqName','sqEmail','sqPhone','sqService','sqBudget','sqDelivery','sqMessage'];

  function show(text,type='bad'){message.textContent=text;message.className=`form-message show ${type}`;}
  function clearMessage(){message.className='form-message';message.textContent='';}
  function clearFieldError(id){const input=$(id),error=$(id+'Error');input?.classList.remove('input-error');if(error)error.textContent='';}
  function setFieldError(id,text){const input=$(id),error=$(id+'Error');input?.classList.add('input-error');if(error)error.textContent=text;}
  function focusField(id){const input=$(id);if(!input)return;input.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>input.focus({preventScroll:true}),250);}
  fields.forEach(id=>$(id)?.addEventListener('input',()=>clearFieldError(id)));
  fields.forEach(id=>$(id)?.addEventListener('change',()=>clearFieldError(id)));

  function validEmail(value){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);}
  function normalizePhone(value){const raw=value.trim();const digits=raw.replace(/\D/g,'');if(/^\+?91/.test(raw)&&digits.length===12)return '+'+digits;if(digits.length===10)return '+91'+digits;if(raw.startsWith('+')&&digits.length>=8&&digits.length<=15)return '+'+digits;return '';}

  function validate(){
    fields.forEach(clearFieldError);
    const values={name:$('sqName').value.trim(),email:$('sqEmail').value.trim(),phone:$('sqPhone').value.trim(),service:$('sqService').value,budget:$('sqBudget').value,message:$('sqMessage').value.trim()};
    const errors=[];
    if(values.name.length<2)errors.push(['sqName','Enter your full name.']);
    if(!values.email)errors.push(['sqEmail','Enter your email address.']);else if(!validEmail(values.email))errors.push(['sqEmail','Enter a valid email address, for example name@example.com.']);
    const phone=normalizePhone(values.phone);if(!values.phone)errors.push(['sqPhone','Enter your mobile number.']);else if(!phone)errors.push(['sqPhone','Enter a valid 10-digit Indian mobile number or valid international number.']);
    if(!values.service)errors.push(['sqService','Choose the required service.']);
    if(!values.budget)errors.push(['sqBudget','Choose an estimated budget.']);
    if(values.message.length<10)errors.push(['sqMessage','Enter at least 10 characters describing your project.']);
    errors.forEach(([id,text])=>setFieldError(id,text));
    if(errors.length){show(errors[0][1]);focusField(errors[0][0]);return null;}
    return {...values,phone};
  }

  async function api(path,body){
    let response;
    try{response=await fetch(API+path,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});}catch{throw new Error('Unable to connect to the secure enquiry service. Check your internet connection and try again.');}
    const data=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(data.error||`Submission failed (${response.status}).`);
    return data;
  }

  function turnstileToken(){return window.turnstile&&state.widget!==null?window.turnstile.getResponse(state.widget):'';}
  function setVerified(value){state.verified=value;submit.disabled=!value;submit.textContent=value?'Send Project Enquiry':'Complete security check';}
  function resetTurnstile(){setVerified(false);if(window.turnstile&&state.widget!==null)window.turnstile.reset(state.widget);}

  async function loadTurnstile(){
    try{
      const response=await fetch(API+'/config');if(!response.ok)throw new Error('Security verification is unavailable.');
      const config=await response.json();if(!config.turnstileSiteKey)throw new Error('Security verification is unavailable.');
      await new Promise((resolve,reject)=>{if(window.turnstile)return resolve();const script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;script.defer=true;script.onload=resolve;script.onerror=()=>reject(new Error('Security verification could not load.'));document.head.appendChild(script);});
      state.widget=window.turnstile.render('#turnstileBox',{sitekey:config.turnstileSiteKey,theme:'light',callback:()=>setVerified(true),'expired-callback':()=>setVerified(false),'error-callback':()=>{setVerified(false);show('Security verification could not complete. Refresh and try again.');}});
    }catch(error){show(error.message);submit.disabled=true;}
  }

  form.addEventListener('submit',async event=>{
    event.preventDefault();clearMessage();
    const validated=validate();if(!validated)return;
    const token=turnstileToken();if(!state.verified||!token){show('Complete the security check before submitting.');$('turnstileBox')?.scrollIntoView({behavior:'smooth',block:'center'});return;}
    const payload={name:validated.name,email:validated.email,phone:validated.phone,service:validated.service,budget:validated.budget,deliveryDate:$('sqDelivery').value,message:validated.message,website:$('sqWebsite').value,turnstileToken:token};
    submit.disabled=true;submit.textContent='Submitting…';
    try{const data=await api('/enquiries',payload);form.reset();fields.forEach(clearFieldError);resetTurnstile();show(`Enquiry submitted securely. Reference: ${data.enquiryId}`,'ok');}
    catch(error){show(error.message);resetTurnstile();}
  });

  document.querySelectorAll('.request-service').forEach(link=>link.addEventListener('click',()=>{const option=[...$('sqService').options].find(item=>item.textContent.trim()===link.dataset.service);if(option){$('sqService').value=option.value;clearFieldError('sqService');}}));
  loadTurnstile();
})();
