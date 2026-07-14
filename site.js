/* ==========================================================================
   Skyway SDA Church — shared header/footer + interactions
   Every page includes <div id="site-header"></div> / <div id="site-footer"></div>
   and sets <body data-root="."> (root pages) or data-root=".." (department pages).
   ========================================================================== */
(function(){
  var body = document.body;
  var R = body.getAttribute('data-root') || '.';
  var active = body.getAttribute('data-page') || '';

  function P(path){ return R + '/' + path; } // root-relative path helper

  var NAV = [
    { key:'announcements', label:'Announcements', href:P('announcements.html') },
    { key:'study',         label:'Study Materials', href:P('study-materials.html') },
    { key:'events',        label:'Events', href:P('events.html') },
    { key:'departments',   label:'Departments', href:P('departments/index.html') },
    { key:'more', label:'More', dropdown:[
        { label:'Study Materials', href:P('study-materials.html') },
        { label:'Events', href:P('events.html') },
        { label:'Contact Us', href:P('contact-us.html') },
        { label:'We Believe', href:P('we-believe.html') },
        { label:'Got Questions? Bible Study', href:P('bible-study.html') },
        { label:'Location', href:P('location.html') }
      ]
    }
  ];

  var LOGO_IMG = '<img src="'+P('assets/images/sda-logo.png')+'" alt="Seventh-day Adventist Church logo">';

  function headerHTML(){
    var navItems = NAV.map(function(item){
      if(item.dropdown){
        var open = active === 'more' ? ' open' : '';
        var links = item.dropdown.map(function(d){
          return '<a href="'+d.href+'">'+d.label+'</a>';
        }).join('');
        return '<li class="nav-item'+open+'" data-dd>'+
          '<button class="nav-link" type="button" aria-expanded="false">'+item.label+
          ' <svg class="nav-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"/></svg></button>'+
          '<div class="dropdown">'+links+'</div></li>';
      }
      var cur = active === item.key ? ' aria-current="page"' : '';
      return '<li class="nav-item"><a href="'+item.href+'"'+cur+'>'+item.label+'</a></li>';
    }).join('');

    return ''+
    '<div class="header-inner">' +
      '<a class="brand" href="'+P('index.html')+'" aria-label="Skyway Seventh-day Adventist Church home">' +
        '<span class="brand-logo" aria-hidden="true">'+LOGO_IMG+'</span>' +
        '<span class="brand-text"><span class="brand-sub">Seventh-day Adventist Church</span>' +
        '<span class="brand-main">Skyway</span></span>' +
      '</a>' +
      '<nav class="main-nav" id="mainNav" aria-label="Primary">' +
        '<ul>'+navItems+'</ul>' +
      '</nav>' +
      '<a class="header-cta" href="'+P('location.html')+'">Location</a>' +
      '<button class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mainNav">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
      '</button>' +
    '</div>';
  }

  function footerHTML(){
    var mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Skyway+Seventh-day+Adventist+Church';
    return ''+
    '<div class="container">' +
      '<div class="footer-top">' +
        '<div class="footer-brand">' +
          '<a class="brand" href="'+P('index.html')+'">' +
            '<span class="brand-logo" aria-hidden="true">'+LOGO_IMG+'</span>' +
            '<span class="brand-text"><span class="brand-sub">Seventh-day Adventist Church</span>' +
            '<span class="brand-main">Skyway</span></span>' +
          '</a>' +
          '<p>A Sabbath-keeping community walking together in the light of God\'s word. Come as you are — there is room for you here.</p>' +
          '<div class="footer-social" aria-label="Follow us on social media">' +
            '<a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5H16l.5-3H13.5V8.4c0-.9.25-1.5 1.55-1.5H16.6V4.3C16.3 4.26 15.3 4.17 14.13 4.17c-2.4 0-4.05 1.47-4.05 4.17V10.5H7.6v3h2.48V21h3.42z"/></svg></a>' +
            '<a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12s0-3.2-.4-4.7a2.9 2.9 0 0 0-2-2C18 5 12 5 12 5s-6 0-7.6.3a2.9 2.9 0 0 0-2 2C2 8.8 2 12 2 12s0 3.2.4 4.7a2.9 2.9 0 0 0 2 2C6 19 12 19 12 19s6 0 7.6-.3a2.9 2.9 0 0 0 2-2C22 15.2 22 12 22 12zM10 15.3V8.7L15.8 12z"/></svg></a>' +
            '<a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg></a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-col"><h4>Visit</h4><ul>' +
          '<li><a href="'+P('location.html')+'">Location</a></li>' +
          '<li><a href="'+P('contact-us.html')+'">Contact Us</a></li>' +
          '<li><a href="'+P('events.html')+'">Events</a></li>' +
          '<li><a href="'+P('announcements.html')+'">Announcements</a></li>' +
        '</ul></div>' +
        '<div class="footer-col"><h4>Learn</h4><ul>' +
          '<li><a href="'+P('we-believe.html')+'">We Believe</a></li>' +
          '<li><a href="'+P('study-materials.html')+'">Study Materials</a></li>' +
          '<li><a href="'+P('departments/index.html')+'">Departments</a></li>' +
          '<li><a href="'+P('departments/sabbath-school.html')+'">Sabbath School</a></li>' +
        '</ul></div>' +
        '<div class="footer-col"><h4>Church Office</h4><ul>' +
          '<li>[Street Address], [City, County]</li>' +
          '<li>[Phone number]</li>' +
          '<li>[email@skywaysda.org]</li>' +
          '<li><a href="'+mapsUrl+'" target="_blank" rel="noopener">Get Directions →</a></li>' +
        '</ul></div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>© <span id="yearNow"></span> Skyway Seventh-day Adventist Church. All rights reserved.</span>' +
        '<span>Placeholder content — replace with your church\'s real details.</span>' +
      '</div>' +
    '</div>';
  }

  var headerEl = document.getElementById('site-header');
  var footerEl = document.getElementById('site-footer');
  if(headerEl){ headerEl.classList.add('site-header'); headerEl.innerHTML = headerHTML(); }
  if(footerEl){ footerEl.classList.add('site-footer'); footerEl.innerHTML = footerHTML(); }

  var yearEl = document.getElementById('yearNow');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('mainNav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Dropdown toggle (click-based, works for touch + keyboard)
  document.querySelectorAll('[data-dd]').forEach(function(item){
    var btn = item.querySelector('.nav-link');
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var willOpen = !item.classList.contains('open');
      document.querySelectorAll('[data-dd]').forEach(function(o){ o.classList.remove('open'); });
      if(willOpen) item.classList.add('open');
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function(){
    document.querySelectorAll('[data-dd]').forEach(function(o){ o.classList.remove('open'); });
  });
  // ---- Scripture quote banner (appears at the top of every page) ---------
  var QUOTES = {
    home:          { text: 'The heavens declare the glory of God; and the firmament sheweth his handywork.', ref: 'Psalm 19:1' },
    announcements: { text: 'Not forsaking the assembling of ourselves together... but exhorting one another.', ref: 'Hebrews 10:25' },
    study:         { text: 'All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness.', ref: '2 Timothy 3:16' },
    events:        { text: 'I was glad when they said unto me, Let us go into the house of the LORD.', ref: 'Psalm 122:1' },
    departments:   { text: 'As every man hath received the gift, even so minister the same one to another, as good stewards of the manifold grace of God.', ref: '1 Peter 4:10' },
    more:          { text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.', ref: 'Matthew 11:28' }
  };
  var quote = QUOTES[active] || QUOTES.home;
  if(headerEl){
    var scriptureEl = document.createElement('div');
    scriptureEl.className = 'scripture-banner';
    scriptureEl.innerHTML = '<p class="scripture-quote">\u201C' + quote.text + '\u201D<span class="scripture-ref">' + quote.ref + '</span></p>';
    headerEl.insertAdjacentElement('afterend', scriptureEl);
  }

  // ---- Header height spacer (since header is position:fixed) -------------
  function updateHeaderHeight(){
    if(!headerEl) return;
    document.documentElement.style.setProperty('--header-h', headerEl.offsetHeight + 'px');
  }
  updateHeaderHeight();
  window.addEventListener('resize', updateHeaderHeight);
  window.addEventListener('load', updateHeaderHeight);

  // ---- Hide on scroll down, reveal instantly on scroll up -----------------
  (function(){
    if(!headerEl) return;
    var lastY = window.scrollY || 0;
    var hideAfter = 90;
    var ticking = false;

    function onScroll(){
      var y = window.scrollY || 0;
      if(y > 10){ headerEl.classList.add('header-scrolled'); } else { headerEl.classList.remove('header-scrolled'); }

      if(y > lastY && y > hideAfter){
        headerEl.classList.add('header-hidden');
        // close any open dropdown/mobile menu when hiding
        document.querySelectorAll('[data-dd]').forEach(function(o){ o.classList.remove('open'); });
      } else {
        headerEl.classList.remove('header-hidden');
      }
      lastY = y <= 0 ? 0 : y;
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if(!ticking){
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive:true });
  })();

  // ---- Horizontal-scroll arrows for dept-grid / card-grid / quicklinks ---
  (function(){
    var ARROW_LEFT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';
    var ARROW_RIGHT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';

    document.querySelectorAll('.dept-grid, .card-grid, .quicklinks').forEach(function(strip){
      if(strip.dataset.hscroll) return; // already wired
      strip.dataset.hscroll = 'true';

      var wrap = document.createElement('div');
      wrap.className = 'hscroll-wrap';
      strip.parentNode.insertBefore(wrap, strip);
      wrap.appendChild(strip);

      var prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.className = 'hscroll-arrow prev';
      prevBtn.setAttribute('aria-label', 'Scroll left');
      prevBtn.innerHTML = ARROW_LEFT;

      var nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'hscroll-arrow next';
      nextBtn.setAttribute('aria-label', 'Scroll right');
      nextBtn.innerHTML = ARROW_RIGHT;

      wrap.appendChild(prevBtn);
      wrap.appendChild(nextBtn);

      function scrollByAmount(dir){
        var amount = Math.max(strip.clientWidth * 0.85, 240);
        strip.scrollBy({ left: dir * amount, behavior: 'smooth' });
      }
      prevBtn.addEventListener('click', function(){ scrollByAmount(-1); });
      nextBtn.addEventListener('click', function(){ scrollByAmount(1); });

      function updateArrows(){
        var max = strip.scrollWidth - strip.clientWidth;
        prevBtn.disabled = strip.scrollLeft <= 4;
        nextBtn.disabled = strip.scrollLeft >= max - 4;
        if(max <= 4){ prevBtn.disabled = true; nextBtn.disabled = true; }
      }
      strip.addEventListener('scroll', updateArrows, { passive:true });
      window.addEventListener('resize', updateArrows);
      updateArrows();
    });
  })();

})();
