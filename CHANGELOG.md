## v4.3.1 (2026-04-23) - Kolton feedback implementation
- Removed all tire service mentions per Kolton's confirmation that Kubin does not offer tire work. Affected services page (Tire Service list-item removed), get-started form (Tires checkbox removed), chatbot KB (tire-rotation, tire-balance, flat-tire entries removed plus 2 response reworded).
- Added "Aggie Owned & Operated" branding to homepage three ways: hero badge, hero trust-item, new dedicated Aggie callout section with texas-am-offroad-truck.jpg photo.
- Integrated Kolton's submitted photos into About and Reviews pages: kubin-auto-business-open.jpg in "Where It Started" story section, bcs-chamber-of-commerce.jpg in "Proud to Serve Aggieland" community section, happy-customer.jpg as Reviews page banner above testimonials grid.
- main.css: v4.2.1 -> v4.3.1, added .aggie-callout, .aggie-community-photo, .reviews-photo-banner styles.

## v4.2.1 (2026-04-23) - Fix location page gap
- Added missing `.section--flush` CSS modifier rule (padding: 0) to main.css
- The `section--flush` class was referenced on the location page map/info split section but never defined, leaving the base `.section` rule to apply 60-100px of vertical padding
- Visible fix: removes dead-space gap above and below the map on /location/, map now butts flush against the page hero and the tread divider as intended
- Single-file change, no HTML changes needed

## v4.2.0 (2026-04-19) - Footer logo cleanup
- Removed duplicate "Kubin Automotive" wordmark text from footer (logo image already contains it)
- "Since 1978" established-date now sits directly under the logo image, left-aligned
- Stacked footer-logo flex vertically (flex-direction: column, align-items: flex-start)
- Bumped footer tagline sizing 0.65rem to 0.8rem for standalone readability under logo
- Applied across all 15 pages

# Kubin Automotive Site Changelog

## v1.2.0 (2026-04-18) - Chatbot KB massive expansion
- Expanded chatbot knowledge base from 73 to 157 entries (+115 percent)
- Added comprehensive auto service coverage: AC not working, heat not working, check engine light, diagnostic fee, strange noises, oil change pricing, synthetic vs conventional, transmission fluid, brake fluid, coolant flush, tire rotation/balance/alignment, flat tires, tire pressure, timing belt, spark plugs, water pump, serpentine belt, fuel pump, fuel filter, exhaust/muffler, oil leaks, overheating
- Added electrical coverage: battery replacement, alternator, starter, bulbs/lights, key fob
- Added suspension/steering: shocks/struts, wheel bearings, CV axle, power steering
- Added service operations: tow service, drop-off, waiting area, shuttle/rental, payment methods, financing, warranty work, shop warranty, free estimates, second opinions, recalls, pre-purchase inspection, fleet service
- Added discount coverage: senior, military
- Added logistics: text updates, show old parts, insurance claims, maintenance schedules, road trip inspection, Saturday hours, holidays, emergencies, languages, windshield wipers, about Kolton, founded year, fair pricing policy, what to bring, appointments vs walk-ins, nearby food, rideshare, Texas state inspection, vehicle history, brake pads
- Boosted make-specific routing for Subaru, Toyota, Honda, Ford, Chevy, Ram/Dodge, European, Diesel, Hybrid/EV, Classic cars
- Test battery: 104/104 passing (100 percent)

## v1.1.0 - Initial chatbot KB
- Initial 73 entries across service categories, brand story, and FAQs
