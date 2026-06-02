/* POLARIS GROUP — shared site behavior: IT/EN toggle, mobile nav, scroll reveal, count-up */
(function(){
  // ---- language toggle (IT default; persists) ----
  function lang(){ try{ return localStorage.getItem('polaris-lang')==='en' ? 'en':'it'; }catch(e){ return 'it'; } }
  function setLang(l){
    document.documentElement.lang=l;
    document.querySelectorAll('[data-it],[data-en]').forEach(function(el){ var v=el.getAttribute('data-'+l); if(v!==null) el.textContent=v; });
    document.querySelectorAll('[data-it-html],[data-en-html]').forEach(function(el){ var v=el.getAttribute('data-'+l+'-html'); if(v!==null) el.innerHTML=v; });
    document.querySelectorAll('.lang-switch__opt').forEach(function(o){ o.classList.toggle('on', o.dataset.lang===l); });
    try{ localStorage.setItem('polaris-lang',l); }catch(e){}
  }
  document.querySelectorAll('.lang-switch__opt').forEach(function(o){ o.addEventListener('click',function(){ setLang(o.dataset.lang); }); });
  if(lang()!=='it') setLang('en');

  // ---- mobile nav ----
  var nav=document.querySelector('.nav'), toggle=document.querySelector('.nav__toggle');
  if(toggle&&nav){ toggle.addEventListener('click',function(){ nav.classList.toggle('open'); }); }
  document.querySelectorAll('.nav__links a').forEach(function(a){ a.addEventListener('click',function(){ if(nav) nav.classList.remove('open'); }); });

  // ---- reveal on scroll ----
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }); },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // ---- count-up (Italian thousands formatting) ----
  function countUp(el){
    var target=+el.dataset.target, dur=1500, t0=null;
    function step(ts){ if(!t0)t0=ts; var p=Math.min((ts-t0)/dur,1);
      el.textContent=Math.round((1-Math.pow(1-p,3))*target).toLocaleString('it-IT'); if(p<1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  var cio=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ countUp(e.target); cio.unobserve(e.target);} }); },{threshold:.6});
  document.querySelectorAll('.count').forEach(function(el){ cio.observe(el); });

  // ---- copy-to-clipboard for .git__copy buttons ----
  document.querySelectorAll('.git__copy').forEach(function(btn){
    btn.addEventListener('click', function(){
      var v = btn.getAttribute('data-copy') || (btn.previousElementSibling ? btn.previousElementSibling.textContent.trim() : '');
      if(!v) return;
      var done = function(){
        var l = lang(), labels = { it:{copy:'Copia',copied:'Copiato'}, en:{copy:'Copy',copied:'Copied'} };
        btn.textContent = labels[l].copied; btn.classList.add('copied');
        setTimeout(function(){ btn.textContent = labels[l].copy; btn.classList.remove('copied'); }, 1800);
      };
      if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(v).then(done).catch(function(){}); }
      else { var t=document.createElement('textarea'); t.value=v; document.body.appendChild(t); t.select(); try{document.execCommand('copy'); done();}catch(e){} document.body.removeChild(t); }
    });
  });
})();
