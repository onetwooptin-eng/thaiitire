
(function(){
  function all(sel,root){return Array.prototype.slice.call((root||document).querySelectorAll(sel));}
  function one(sel,root){return (root||document).querySelector(sel);}
  function setText(root,sel,val){var el=one(sel,root); if(el){el.textContent=(val&&String(val).trim())?val:'On request';}}
  function setAttr(root,sel,name,val){var el=one(sel,root); if(el){el.setAttribute(name,val||'#');}}
  function openQuick(btn,ev){
    if(ev){ev.preventDefault(); ev.stopPropagation();}
    var modal=one('[data-quick-modal]'); if(!modal || !btn){return false;}
    setText(modal,'[data-q-title]',btn.getAttribute('data-title'));
    setAttr(modal,'[data-q-img]','src',btn.getAttribute('data-image'));
    setAttr(modal,'[data-q-img]','alt',btn.getAttribute('data-title'));
    setText(modal,'[data-q-category]',btn.getAttribute('data-category'));
    setText(modal,'[data-q-brand]',btn.getAttribute('data-brand'));
    setText(modal,'[data-q-part]',btn.getAttribute('data-part'));
    setText(modal,'[data-q-size]',btn.getAttribute('data-size'));
    setText(modal,'[data-q-model]',btn.getAttribute('data-model'));
    setText(modal,'[data-q-ply]',btn.getAttribute('data-ply'));
    setText(modal,'[data-q-load]',btn.getAttribute('data-load'));
    setText(modal,'[data-q-range]',btn.getAttribute('data-range'));
    setText(modal,'[data-q-application]',btn.getAttribute('data-application'));
    setText(modal,'[data-q-tag]',btn.getAttribute('data-tag'));
    setAttr(modal,'[data-q-full]','href',btn.getAttribute('data-url'));
    setAttr(modal,'[data-q-quote]','href',btn.getAttribute('data-quote'));
    modal.removeAttribute('hidden'); modal.setAttribute('aria-hidden','false'); modal.classList.add('is-open'); modal.style.display='grid';
    document.body.classList.add('no-scroll');
    var close=one('[data-modal-close]',modal); if(close){try{close.focus({preventScroll:true});}catch(e){close.focus();}}
    return false;
  }
  function closeQuick(ev){if(ev){ev.preventDefault(); ev.stopPropagation();} var modal=one('[data-quick-modal]'); if(!modal){return false;} modal.classList.remove('is-open'); modal.setAttribute('hidden',''); modal.setAttribute('aria-hidden','true'); modal.style.display='none'; document.body.classList.remove('no-scroll'); return false;}
  window.TBRQuickViewOpen=openQuick; window.TBRQuickViewClose=closeQuick;
  function init(){
    var menu=one('[data-menu]'), toggle=one('[data-menu-toggle]'); if(toggle&&menu){toggle.addEventListener('click',function(){menu.classList.toggle('open');});}
    all('[data-drop-toggle]').forEach(function(btn){btn.addEventListener('click',function(e){if(window.innerWidth<=1120){e.preventDefault(); btn.parentElement.classList.toggle('open');}});});
    var y=one('[data-year]'); if(y){y.textContent=new Date().getFullYear();}
    all('[data-quick-view]').forEach(function(btn){btn.addEventListener('click',function(e){return openQuick(btn,e);});});
    document.addEventListener('click',function(e){
      var b=e.target.closest?e.target.closest('[data-quick-view]'):null; if(b){return openQuick(b,e);}
      if(e.target.closest && e.target.closest('[data-modal-close]')){return closeQuick(e);}
    },true);
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeQuick(e);}});
    var grid=one('[data-products-grid]');
    if(grid){
      var cards=all('[data-card]',grid); var pag=one('[data-pagination]');
      var state={category:grid.getAttribute('data-default-category')||'All',family:'All',q:'',sort:'default',page:1,perPage:parseInt(grid.getAttribute('data-per-page')||'12',10)};
      function matches(card){var okCat=(state.category==='All'||card.getAttribute('data-category')===state.category); var fam=(card.getAttribute('data-family')||''); var okFam=(state.family==='All'||fam.indexOf(state.family.toLowerCase())>-1); var s=(card.getAttribute('data-search')||''); var okS=(!state.q||s.indexOf(state.q)>-1); return okCat&&okFam&&okS;}
      function update(){var matching=cards.filter(matches); if(state.sort==='brand'){matching.sort(function(a,b){return (a.getAttribute('data-brand')||'').localeCompare(b.getAttribute('data-brand')||'')||(a.getAttribute('data-name')||'').localeCompare(b.getAttribute('data-name')||'');});} if(state.sort==='name'){matching.sort(function(a,b){return (a.getAttribute('data-name')||'').localeCompare(b.getAttribute('data-name')||'');});} matching.forEach(function(c){grid.appendChild(c);}); var pages=Math.max(1,Math.ceil(matching.length/state.perPage)); if(state.page>pages){state.page=pages;} var start=(state.page-1)*state.perPage,end=start+state.perPage; cards.forEach(function(c){c.classList.add('hidden-by-filter');}); matching.forEach(function(c,i){if(i>=start&&i<end){c.classList.remove('hidden-by-filter');}}); var note=one('[data-product-count]'); if(note){note.textContent='Showing '+(matching.length?start+1:0)+'–'+Math.min(end,matching.length)+' of '+matching.length+' matching products';} if(pag){pag.innerHTML=''; if(pages>1){for(var i=1;i<=pages;i++){var pageBtn=document.createElement('button'); pageBtn.type='button'; pageBtn.className='page-btn'+(i===state.page?' active':''); pageBtn.textContent=i; pageBtn.setAttribute('aria-label','Go to product page '+i); pageBtn.addEventListener('click',(function(n){return function(){state.page=n; update(); try{window.scrollTo({top:grid.offsetTop-140,behavior:'smooth'});}catch(e){window.scrollTo(0,grid.offsetTop-140);}};})(i)); pag.appendChild(pageBtn);}}}}
      all('[data-filter]').forEach(function(btn){btn.addEventListener('click',function(){all('[data-filter]').forEach(function(b){b.classList.remove('active');}); btn.classList.add('active'); state.category=btn.getAttribute('data-filter'); state.page=1; update();});});
      var fam=one('[data-family-filter]'); if(fam){fam.addEventListener('change',function(){state.family=fam.value; state.page=1; update();});}
      var input=one('[data-search]'); if(input){input.addEventListener('input',function(){state.q=input.value.toLowerCase().trim(); state.page=1; update();});}
      var sort=one('[data-sort]'); if(sort){sort.addEventListener('change',function(){state.sort=sort.value; state.page=1; update();});}
      update();
    }
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}else{init();}
})();
