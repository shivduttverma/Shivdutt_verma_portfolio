(()=>{
  function enforceRequiredFields(){
    const form=document.getElementById('secureEnquiryForm');
    if(!form||form.dataset.requiredGuard==='1')return false;
    form.dataset.requiredGuard='1';

    const name=document.getElementById('sqName');
    const email=document.getElementById('sqEmail');
    const phone=document.getElementById('sqPhone');
    const service=document.getElementById('sqService');
    const budget=document.getElementById('sqBudget');
    const message=document.getElementById('sqMessage');
    const formMessage=document.getElementById('secureMessage');

    [name,email,phone,service,budget,message].forEach(field=>field?.setAttribute('required','required'));

    const phoneLabel=phone?.closest('label');
    if(phoneLabel){
      phoneLabel.innerHTML=phoneLabel.innerHTML.replace(/\s*<span[^>]*>\(optional\)<\/span>/i,'');
      phoneLabel.firstChild.textContent='Mobile number';
    }

    if(budget?.options?.length){
      budget.options[0].text='Choose a budget';
      budget.options[0].value='';
    }

    function showError(text){
      if(formMessage){
        formMessage.textContent=text;
        formMessage.className='form-message show bad';
      }
    }

    form.addEventListener('submit',event=>{
      const required=[
        [name,'Enter your name.'],
        [email,'Enter your email address.'],
        [phone,'Enter your mobile number.'],
        [service,'Choose the required service.'],
        [budget,'Choose an estimated budget.'],
        [message,'Enter the project details.']
      ];

      for(const [field,text] of required){
        if(!field||!String(field.value||'').trim()){
          event.preventDefault();
          event.stopImmediatePropagation();
          showError(text);
          field?.focus();
          return;
        }
      }

      let normalized=phone.value.trim().replace(/[\s()-]/g,'');
      if(/^\d{10}$/.test(normalized))normalized='+91'+normalized;
      if(/^91\d{10}$/.test(normalized))normalized='+'+normalized;
      if(!/^\+[1-9]\d{7,14}$/.test(normalized)){
        event.preventDefault();
        event.stopImmediatePropagation();
        showError('Enter a valid mobile number with country code.');
        phone.focus();
      }
    },true);

    return true;
  }

  if(!enforceRequiredFields()){
    const observer=new MutationObserver(()=>{
      if(enforceRequiredFields())observer.disconnect();
    });
    observer.observe(document.documentElement,{childList:true,subtree:true});
  }
})();
