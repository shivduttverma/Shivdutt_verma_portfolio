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
  css.href='secure-contact.css?v=3';
  document.head.appendChild(css);

  contact.hidden=false;
  if(nav&&!nav.querySelector('a[href="#contact"]')){
    const link=document.createElement('a');
    link.href='#contact';
    link.textContent='Contact';
    nav.appendChild(link);
  }

  contact.classList.add('secure-contact-section');
  contact.innerHTML=`<div class="container secure-contact-grid"><div class="secure-contact-copy reveal visible"><span class="eyebrow">PROJECT ENQUIRY</span><h2>Tell me about your project.</h2><p>Share the required service, expected timeline, budget range and project details. Mobile verification is required before submission.</p><div class="privacy-points"><div class="privacy-point"><i>01</i><div><b>Clear project brief</b><span>Provide the service, scope, timeline and expected result.</span></div></div><div class="privacy-point"><i>02</i><div><b>Verified submission</b><span>Mobile OTP verification helps prevent invalid and automated enquiries.</span></div></div><div class="privacy-point"><i>03</i><div><b>Private review</b><span>Your details are reviewed only for responding to the submitted project enquiry.</span></div></div></div></div><form class="secure-form reveal visible" id="secureEnquiryForm" novalidate><div class="form-head"><div><span class="eyebrow">START A PROJECT</span><h3>Project enquiry form</h3><p>Complete the form and verify your mobile number.</p></div><span class="secure-badge">OTP VERIFIED</span></div><div class="secure-form-grid"><label>Name<input id="sqName" maxlength="100" autocomplete="name" required placeholder="Your full name"></label><label>Email<input id="sqEmail" maxlength="254" type="email" autocomplete="email" required placeholder="name@example.com"></label><label class="wide">Mobile number<div class="phone-row"><input id="sqPhone" maxlength="18" inputmode="tel" autocomplete="tel" required placeholder="10-digit Indian number or +country code"><button type="button" id="sendOtp">Send OTP</button></div></label><div class="otp-block" id="otpBlock" hidden><label>Enter OTP<div class="otp-row"><input id="sqOtp" maxlength="8" inputmode="numeric" autocomplete="one-time-code" placeholder="6-digit OTP"><button type="button" id="verifyOtp">Verify OTP</button></div></label><div class="verify-state" id="otpState">OTP sent. Enter the code received on your mobile.</div></div><label>Service required<select id="sqService" required><option value="">Choose a service</option><option>Business Website</option><option>E-commerce / Shopify Store</option><option>Product Listing & Catalog</option><option>Business / Management App</option><option>Portfolio / Landing Page</option><option>Form / Data Collection</option><option>Social Media / YouTube Design</option><option>PDF / Document Work</option><option>Excel / Data Entry</option><option>Other Online Work</option></select></label><label>Estimated budget<select id="sqBudget"><option value="">Not decided</option><option>Below ₹5,000</option><option>₹5,000 – ₹10,000</option><option>₹10,000 – ₹25,000</option><option>₹25,000 – ₹50,000</option><option>Above ₹50,000</option></select></label><label>Expected delivery<input id="sqDelivery" type="date"></label><label class="wide">Project details<textarea id="sqMessage" maxlength="5000" required placeholder="Describe the required pages, features, platform, product count or expected result."></textarea></label><label class="hp-field" aria-hidden="true">Website<input id="sqWebsite" tabindex="-1" autocomplete="off"></label><div class="turnstile-wrap" id="turnstileBox"></div><button class="secure-submit" id="secureSubmit" type="submit" disabled>Verify mobile to submit</button><div class="form-message" id="secureMessage"></div><div class="privacy-note">Contact details are used only to review and respond to this enquiry.</div></div></form></div>`;

  const $=id=>document.getElementById(id);
  const state={otpSession:'',verificationToken:'',verifiedPhone:'',widget:null};
  const form=$('secureEnquiryForm');
  const phone=$('sqPhone');
  const send=$('sendOtp');
  const verify=$('verifyOtp');
  const submit=$('secureSubmit');
  const message=$('secureMessage');
  const otpState=$('otpState');

  function show(text,type='bad'){message.textContent=text;message.className=`form-message show ${type}`}
  function clear(){message.className='form-message';message.textContent=''}
  function normalizedPhone(){let value=phone.value.trim().replace(/[\s()-]/g,'');if(/^\d{10}$/.test(value))value='+91'+value;if(/^91\d{10}$/.test(value))value='+'+value;return value}
  async function api(path,body){const response=await fetch(API+path,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});const data=await response.json().catch(()=>({}));if(!response.ok)throw new Error(data.error||'Request failed.');return data}
  function turnstileToken(){return window.turnstile&&state.widget!==null?window.turnstile.getResponse(state.widget):''}
  function resetTurnstile(){if(window.turnstile&&state.widget!==null)window.turnstile.reset(state.widget)}
  function resetVerification(){state.verificationToken='';state.verifiedPhone='';phone.readOnly=false;submit.disabled=true;submit.textContent='Verify mobile to submit'}

  phone.addEventListener('input',()=>{if(state.verifiedPhone&&normalizedPhone()!==state.verifiedPhone)resetVerification()});

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
      state.widget=window.turnstile.render('#turnstileBox',{sitekey:config.turnstileSiteKey,theme:'light'});
    }catch(error){show(error.message);send.disabled=true}
  }

  send.addEventListener('click',async()=>{
    clear();
    const number=normalizedPhone();
    if(!/^\+[1-9]\d{7,14}$/.test(number)){show('Enter a valid mobile number with country code.');return}
    const token=turnstileToken();
    if(!token){show('Complete the security check first.');return}
    send.disabled=true;send.textContent='Sending…';
    try{
      const data=await api('/otp/request',{phone:number,turnstileToken:token,website:$('sqWebsite').value});
      state.otpSession=data.otpSession;
      state.verificationToken='';
      state.verifiedPhone='';
      $('otpBlock').hidden=false;
      otpState.textContent='OTP sent. Enter the code received on your mobile.';
      otpState.className='verify-state';
      submit.disabled=true;
      submit.textContent='Verify mobile to submit';
      let seconds=60;
      send.textContent=`Resend in ${seconds}s`;
      const timer=setInterval(()=>{
        seconds-=1;
        send.textContent=seconds>0?`Resend in ${seconds}s`:'Resend OTP';
        if(seconds<=0){clearInterval(timer);send.disabled=false;resetTurnstile()}
      },1000);
    }catch(error){show(error.message);send.disabled=false;send.textContent='Send OTP';resetTurnstile()}
  });

  verify.addEventListener('click',async()=>{
    clear();
    const code=$('sqOtp').value.trim();
    if(!/^\d{4,8}$/.test(code)){show('Enter the OTP received on your mobile.');return}
    if(!state.otpSession){show('Request an OTP first.');return}
    verify.disabled=true;verify.textContent='Verifying…';
    try{
      const data=await api('/otp/verify',{otpSession:state.otpSession,code,website:$('sqWebsite').value});
      state.verificationToken=data.verificationToken;
      state.verifiedPhone=normalizedPhone();
      phone.readOnly=true;
      send.disabled=true;
      send.textContent='Verified';
      otpState.textContent='Mobile number verified.';
      otpState.className='verify-state ok';
      submit.disabled=false;
      submit.textContent='Send Project Enquiry';
      show('Mobile verified. The enquiry can now be submitted.','ok');
    }catch(error){otpState.textContent=error.message;otpState.className='verify-state bad';show(error.message)}
    finally{verify.disabled=false;verify.textContent='Verify OTP'}
  });

  form.addEventListener('submit',async event=>{
    event.preventDefault();
    clear();
    if(!state.verificationToken){show('Verify your mobile number before submitting.');return}
    const payload={name:$('sqName').value.trim(),email:$('sqEmail').value.trim(),phone:normalizedPhone(),service:$('sqService').value,budget:$('sqBudget').value,deliveryDate:$('sqDelivery').value,message:$('sqMessage').value.trim(),website:$('sqWebsite').value,verificationToken:state.verificationToken};
    if(!payload.name||!payload.email||!payload.service||!payload.message){show('Complete all required fields.');return}
    submit.disabled=true;submit.textContent='Submitting…';
    try{
      const data=await api('/enquiries',payload);
      form.reset();
      state.otpSession='';state.verificationToken='';state.verifiedPhone='';
      $('otpBlock').hidden=true;
      phone.readOnly=false;
      send.disabled=false;send.textContent='Send OTP';
      submit.disabled=true;submit.textContent='Verify mobile to submit';
      resetTurnstile();
      show(`Enquiry submitted. Reference: ${data.enquiryId}`,'ok');
    }catch(error){show(error.message);submit.disabled=false;submit.textContent='Send Project Enquiry'}
  });

  document.querySelectorAll('.request-service').forEach(link=>link.addEventListener('click',()=>{
    const option=[...$('sqService').options].find(item=>item.textContent.trim()===link.dataset.service);
    if(option)$('sqService').value=option.value;
  }));

  loadTurnstile();
})();
