(()=>{
  function enforceRequiredFields(){
    const form=document.getElementById('secureEnquiryForm');
    if(!form||form.dataset.requiredGuard==='1')return false;
    form.dataset.requiredGuard='1';

    const getFields=()=>({
      name:document.getElementById('sqName'),
      email:document.getElementById('sqEmail'),
      phone:document.getElementById('sqPhone'),
      service:document.getElementById('sqService'),
      budget:document.getElementById('sqBudget'),
      message:document.getElementById('sqMessage'),
      formMessage:document.getElementById('secureMessage')
    });

    const fields=getFields();
    [fields.name,fields.email,fields.phone,fields.service,fields.budget,fields.message]
      .forEach(field=>field?.setAttribute('required','required'));

    const phoneLabel=fields.phone?.closest('label');
    if(phoneLabel){
      const optional=phoneLabel.querySelector('span');
      if(optional&&/optional/i.test(optional.textContent||''))optional.remove();
    }

    if(fields.budget?.options?.length){
      fields.budget.options[0].text='Choose a budget';
      fields.budget.options[0].value='';
    }

    function showError(text,field){
      const current=getFields();
      if(current.formMessage){
        current.formMessage.textContent=text;
        current.formMessage.className='form-message show bad';
      }
      if(field){
        field.setAttribute('aria-invalid','true');
        field.scrollIntoView({behavior:'smooth',block:'center'});
        setTimeout(()=>field.focus({preventScroll:true}),250);
      }
    }

    function clearFieldError(field){
      field?.removeAttribute('aria-invalid');
    }

    [fields.name,fields.email,fields.phone,fields.service,fields.budget,fields.message]
      .forEach(field=>field?.addEventListener('input',()=>clearFieldError(field)));
    [fields.service,fields.budget]
      .forEach(field=>field?.addEventListener('change',()=>clearFieldError(field)));

    form.addEventListener('submit',event=>{
      const current=getFields();
      const required=[
        [current.name,'Enter your name.'],
        [current.email,'Enter your email address.'],
        [current.phone,'Enter your mobile number.'],
        [current.service,'Choose the required service.'],
        [current.budget,'Choose an estimated budget.'],
        [current.message,'Enter the project details.']
      ];

      for(const [field,text] of required){
        if(!field||!String(field.value||'').trim()){
          event.preventDefault();
          event.stopImmediatePropagation();
          showError(text,field);
          return;
        }
      }

      let normalized=current.phone.value.trim().replace(/[\s()-]/g,'');
      if(/^\d{10}$/.test(normalized))normalized='+91'+normalized;
      else if(/^91\d{10}$/.test(normalized))normalized='+'+normalized;

      if(!/^\+[1-9]\d{7,14}$/.test(normalized)){
        event.preventDefault();
        event.stopImmediatePropagation();
        showError('Enter a valid 10-digit mobile number or include the country code.',current.phone);
        return;
      }

      current.phone.value=normalized;
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
