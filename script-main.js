const deepStyle=document.createElement('link');deepStyle.rel='stylesheet';deepStyle.href='services-deep.css?v=5';document.head.appendChild(deepStyle);

// Keep the uploaded portrait file as the single source of truth.
document.querySelectorAll('[data-pro-portrait]').forEach(image=>{
  image.src='assets/shivdutt-verma.jpg?v=20260802-1';
  image.style.visibility='visible';
  image.style.opacity='1';
});

const serviceDetails=[
  {select:'Business Website',project:'projects/business/index.html',items:['Responsive home, about, services and contact sections','Enquiry forms and clear call-to-action workflows','Business information, service areas and trust sections','Desktop, tablet and mobile layout optimization','Basic on-page SEO structure and page hierarchy'],fit:'Local businesses, service providers, consultants, shops and professionals.'},
  {select:'E-commerce / Shopify Store',project:'projects/ecommerce/index.html',items:['Store navigation, collections and category organization','Product pages with price, variants, offers and details','Cart flow, shipping information and policy presentation','Shopify theme setup and storefront customization support','Mobile-first product discovery and purchase flow'],fit:'Fashion, electronics, beauty, home, accessories and other product-based sellers.'},
  {select:'Product Listing & Catalog',project:'projects/catalog/index.html',items:['Product titles, descriptions, images, categories and tags','SKU, pricing, compare-at price, inventory and stock status','Variants such as size, colour, pack or model options','Product entry, cleanup and catalogue organization','Spreadsheet-based bulk listing preparation and data cleanup'],fit:'Stores that need accurate, organized and consistent product listings.'},
  {select:'Business / Management App',project:'projects/library/index.html',items:['Custom dashboard with business KPIs and status cards','Customer, member, order, payment or record workflows','Add, edit, search, filter and structured data entry','Responsive application layouts for desktop and mobile','Workflow planning based on the day-to-day business process'],fit:'Libraries, service businesses, offices and teams replacing manual records.'},
  {select:'Portfolio / Landing Page',project:'#work',items:['Professional profile, services, skills and project presentation','Clear hero section and lead-focused call to action','Responsive layout for desktop, tablet and mobile','Personal brand, campaign or service-specific page structure','SEO and analytics-ready page structure'],fit:'Freelancers, job seekers, creators, professionals and service businesses.'},
  {select:'Form / Data Collection',project:'projects/form/index.html',items:['Registration, enquiry, feedback and lead-capture forms','Multi-step forms with required-field validation','Structured fields, dropdowns, dates and conditional flows','Submission summaries and export-oriented data structure','Spreadsheet or simple data-flow integration when required'],fit:'Admissions, surveys, bookings, customer enquiries and internal data collection.'},
  {select:'Social Media / YouTube Design',project:'',items:['YouTube thumbnails designed for mobile readability','Facebook and Instagram promotional posts','Channel banners, covers and campaign graphics','Offer posters, product promotions and advertising creatives','Platform-specific resizing and consistent presentation'],fit:'Creators, businesses, sellers and brands requiring promotional graphics.'},
  {select:'PDF / Document Work',project:'',items:['PDF editing, cleanup, page arrangement and formatting','PDF conversion and professional document preparation','Fillable forms and structured information documents','Merge, split and document organization','Business-ready reports, forms and client documents'],fit:'Businesses and individuals requiring clean, structured documents.'},
  {select:'Excel / Data Entry',project:'',items:['Accurate data entry and structured spreadsheet preparation','Data cleanup, duplicate removal and standardization','Basic formulas, filters, tables and reporting layouts','Product, customer and business record organization','Simple summaries and reusable sheet structures'],fit:'Businesses with raw, inconsistent or manually maintained spreadsheet data.'},
  {select:'Other Online Work',project:'',items:['Website content upload and structured online data entry','Research, information collection and organized reporting','Repetitive digital tasks with a defined process','Online business and page setup assistance','Custom digital work reviewed and scoped before starting'],fit:'Defined digital tasks that do not fit the categories above.'}
];

let serviceSectionRendered=false;
function renderServices(contactEnabled){
  if(serviceSectionRendered)return;
  serviceSectionRendered=true;
  const services=document.querySelector('#services');
  if(!services)return;

  const head=services.querySelector('.services-head');
  if(head){
    const h2=head.querySelector('h2');
    const p=head.querySelector('p');
    if(h2)h2.textContent='Digital services for business and online work';
    if(p)p.textContent='Each service is organized around a defined scope, practical deliverables and a usable final result.';
    head.insertAdjacentHTML('afterend','<div class="service-value-strip reveal"><div class="service-value"><b>Requirement Planning</b><span>Scope and expected results are defined before development starts.</span></div><div class="service-value"><b>Responsive Delivery</b><span>Web work is prepared for desktop, tablet and mobile use.</span></div><div class="service-value"><b>Functional Workflows</b><span>Forms, filters, carts and management flows are included where required.</span></div><div class="service-value"><b>Defined Handover</b><span>Deliverables, revisions and final output remain clearly documented.</span></div></div>');
  }

  const cards=[...services.querySelectorAll('.service-pro')];
  cards.forEach((card,index)=>{
    const data=serviceDetails[index];
    const content=card.querySelector('.service-content');
    if(!data||!content)return;
    const list=data.items.map(item=>`<li>${item}</li>`).join('');
    const actions=[];
    if(contactEnabled)actions.push(`<a class="service-action primary request-service" href="#contact" data-service="${data.select}">Send project enquiry</a>`);
    if(data.project)actions.push(`<a class="service-action" href="${data.project}">${data.project.startsWith('#')?'View projects':'View related project'}</a>`);
    content.insertAdjacentHTML('beforeend',`<div class="service-deep"><div class="service-deep-title">TYPICAL DELIVERABLES</div><ul class="service-list">${list}</ul><div class="service-fit"><b>Best for:</b> ${data.fit}</div>${actions.length?`<div class="service-actions">${actions.join('')}</div>`:''}</div>`);
  });

  const grid=services.querySelector('.service-grid');
  if(grid){
    grid.insertAdjacentHTML('afterend',`<div class="service-scope-note reveal"><div><h3>Need more than one service?</h3><p>Website development, product listing, forms, design and data work can be combined into one clearly defined project scope.</p></div>${contactEnabled?'<a href="#contact">Send project enquiry →</a>':''}</div>`);
  }
  observeReveals();
}

function loadSecureContact(){
  const config=document.createElement('script');
  config.src='secure-config.js?v=2';
  config.onload=()=>{
    renderServices(Boolean(window.SV_SECURE_API));
    const module=document.createElement('script');
    module.src='secure-contact.js?v=3';
    module.defer=true;
    document.head.appendChild(module);
  };
  config.onerror=()=>renderServices(false);
  document.head.appendChild(config);
}
loadSecureContact();

const menuBtn=document.getElementById('menuBtn');
const nav=document.getElementById('navMenu');
menuBtn?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',String(open));
});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded','false');
}));

const year=document.getElementById('year');
if(year)year.textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
}),{threshold:.1});
function observeReveals(){document.querySelectorAll('.reveal:not(.visible)').forEach(element=>observer.observe(element))}
observeReveals();
