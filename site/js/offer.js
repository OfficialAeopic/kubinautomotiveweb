(function () {
  var c = window.KUBIN_OFFER;
  if (!c) return;
  function $(id) { return document.getElementById(id); }
  function all(sel) { return document.querySelectorAll(sel); }
  function text(sel, v) { all(sel).forEach(function (n) { n.textContent = v; }); }
  var end = new Date(c.validThrough + 'T23:59:59-06:00');
  var expired = isNaN(end) ? false : new Date() > end;
  var niceDate = '';
  try {
    niceDate = new Date(c.validThrough + 'T12:00:00-06:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/Chicago' });
  } catch (e) { niceDate = c.validThrough; }

  all('.offer-live-only').forEach(function (n) { n.hidden = expired; });
  $('offer-ended').hidden = !expired;
  text('[data-offer="amount"]', c.amount);
  text('[data-offer="item"]', c.item);
  text('[data-offer="savings"]', c.savings);
  text('[data-offer="savingsDetail"]', c.savingsDetail);
  text('[data-offer="valid"]', 'Valid through ' + niceDate);
  var fp = $('offer-fineprint');
  c.fineprint.forEach(function (t) { var li = document.createElement('li'); li.textContent = t; fp.appendChild(li); });
  all('[data-link="instagram"]').forEach(function (a) { a.href = c.social.instagram; });
  all('[data-link="facebook"]').forEach(function (a) { a.href = c.social.facebook; });
  all('[data-link="google"]').forEach(function (a) { a.href = c.googleReview; });
  var s = c.show || {};
  all('[data-show]').forEach(function (n) { n.hidden = !s[n.getAttribute('data-show')]; });
  // Held claims: only rendered when switched on in offer-config.js
  if (s.aggieOwned) {
    var r = document.createElement('span'); r.className = 'o-ribbon'; r.style.marginRight = '.6rem'; r.textContent = 'Aggie Owned & Operated';
    $('claim-aggie').replaceWith(r);
  }
  if (s.threeGenerations) {
    var g = $('claim-gens'); g.hidden = false;
    g.innerHTML = '<svg aria-hidden="true"><use href="#i-people"/></svg>Three generations strong';
  }
  if (!s.heritagePhoto) document.documentElement.classList.add('no-heritage');
})();
