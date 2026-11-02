/*
 * KUBIN COUNTER OFFER — EDIT HERE ONLY.
 * Kolton: change the offer every couple of months by editing the lines below,
 * then redeploy. Nothing else on the page needs touching.
 *
 * COMPLIANCE (do not change): the offer is for FOLLOWING on social only.
 * Never tie any discount or perk to a review. Google bans review incentives.
 */
window.KUBIN_OFFER = {
  // Big ticket on the hero: amount + what it applies to
  amount: '5% OFF',
  item: 'AN OIL CHANGE',
  // Plain sentence (used for the page title text and step 3)
  headline: '5% off an oil change',
  // Step 3 of "How to redeem"
  savings: 'Save 5%',
  savingsDetail: 'Receive 5% off an oil change on your visit.',
  // Last day the offer is honored (YYYY-MM-DD, Central time). After this the page shows the "ended" message.
  validThrough: '2026-12-31',
  // Fine print (one line each)
  fineprint: [
    'One per customer, per visit.',
    'Applies to a standard oil change service. Not combinable with other offers.',
    'Show that you follow us on Instagram or Facebook at the counter.',
    'The offer is for following us. Reviews are optional and are not part of any offer.',
    'Offer may change or end at any time.'
  ],
  social: {
    instagram: 'https://www.instagram.com/kubin.automotive/',
    facebook: 'https://www.facebook.com/KubinAutomotiveService'
  },
  // Plain link. No incentive is attached. TODO: swap for Kolton's exact Google review link.
  googleReview: 'https://www.google.com/search?q=Kubin+Automotive+Service+3515+S+College+Ave+Bryan+TX',
  // Claims on hold until Kolton confirms. Flip to true to show them again.
  show: {
    heritagePhoto: true,        // real 1978 newspaper photo in the "Family-owned" frame (Kolton OK pending)
    threeGenerations: false,    // "Three generations strong"
    aggieOwned: false           // "Aggie Owned & Operated" (needs Kolton's OK; no A&M logos either way)
  }
};
