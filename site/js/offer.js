(function () {
  var c = window.KUBIN_OFFER;
  if (!c) return;
  function $(id) { return document.getElementById(id); }
  var end = new Date(c.validThrough + 'T23:59:59-06:00');
  var expired = isNaN(end) ? false : new Date() > end;
  var niceDate = '';
  try {
    niceDate = new Date(c.validThrough + 'T12:00:00-06:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/Chicago' });
  } catch (e) { niceDate = c.validThrough; }

  $('offer-live').hidden = expired;
  $('offer-ended').hidden = !expired;
  $('offer-headline').textContent = c.headline;
  $('offer-detail').textContent = c.detail;
  $('offer-valid').textContent = 'Valid through ' + niceDate;
  var fp = $('offer-fineprint');
  c.fineprint.forEach(function (t) { var li = document.createElement('li'); li.textContent = t; fp.appendChild(li); });
  $('link-instagram').href = c.social.instagram;
  $('link-facebook').href = c.social.facebook;
  $('link-google').href = c.googleReview;
  $('link-yelp').href = c.yelp;
})();
