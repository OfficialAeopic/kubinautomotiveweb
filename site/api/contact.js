// api/contact.js — Kubin Automotive Service contact form handler
// Vercel serverless function. Requires RESEND_API_KEY environment variable.
// Set it in: Vercel Dashboard > Project > Settings > Environment Variables
//
// Accepts two form shapes:
//   Contact page (legacy): { name, email, phone, vehicle, service, date, message, website }
//   Get Started page (v4.1): { name, email, phone, vehicle_year, vehicle_make, vehicle_model,
//                               service, contact_pref, message, website }

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name,
    email,
    phone,
    // Contact page sends a single "vehicle" field
    vehicle,
    // Get Started page sends split vehicle fields
    vehicle_year,
    vehicle_make,
    vehicle_model,
    // Both pages send a "service" field (string; Get Started joins multiple checkboxes)
    service,
    // Get Started: preferred contact method
    contact_pref,
    // Contact page: preferred date
    date,
    // Both: freeform notes / message
    message,
    // Honeypot
    website
  } = req.body;

  // Honeypot check — bots fill this field, real users do not see it
  if (website) {
    return res.status(200).json({ success: true });
  }

  // Build a unified vehicle string regardless of which form submitted
  const vehicleStr = vehicle
    ? vehicle
    : [vehicle_year, vehicle_make, vehicle_model].filter(Boolean).join(' ') || null;

  // Required field validation
  if (!name || !email || !phone || !vehicleStr || !service) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Determine subject line — flag Get Started submissions clearly
  const isGetStarted = !!(vehicle_year || vehicle_make || vehicle_model || contact_pref);
  const subjectLine = isGetStarted
    ? `New Service Request (Get Started) — ${name}`
    : `New Appointment Request — ${name}`;

  try {
    await resend.emails.send({
      // IMPORTANT: The "from" domain (kubinautomotive.com) must be verified in
      // the Resend dashboard before this will send. See README.md for instructions.
      from: 'Kubin Automotive Website <noreply@kubinautomotive.com>',
      to: 'Kubin.Automotive@yahoo.com',
      reply_to: email,
      subject: subjectLine,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #2c3e50;">
          <div style="background: #0D1B2A; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #C9A84C; margin: 0; font-size: 20px;">${isGetStarted ? 'New Service Request' : 'New Appointment Request'}</h2>
            <p style="color: #B8C5D1; margin: 6px 0 0; font-size: 13px;">
              ${isGetStarted ? 'Submitted via /get-started/ &bull; Kubin Automotive Service website' : 'Submitted via /contact/ &bull; Kubin Automotive Service website'}
            </p>
          </div>
          <div style="background: #f8f9fa; padding: 28px 32px; border-radius: 0 0 8px 8px; border: 1px solid #dee2e6; border-top: none;">

            <!-- Customer Info -->
            <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #888; margin: 0 0 8px;">Customer</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 7px 0; font-weight: 600; color: #0D1B2A; width: 160px; vertical-align: top; font-size: 14px;">Name</td>
                <td style="padding: 7px 0; color: #2c3e50; font-size: 14px;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 7px 0; font-weight: 600; color: #0D1B2A; vertical-align: top; font-size: 14px;">Phone</td>
                <td style="padding: 7px 0; color: #2c3e50; font-size: 14px;"><a href="tel:${escapeHtml(phone)}" style="color: #C9A84C; font-weight: 700;">${escapeHtml(phone)}</a></td>
              </tr>
              <tr>
                <td style="padding: 7px 0; font-weight: 600; color: #0D1B2A; vertical-align: top; font-size: 14px;">Email</td>
                <td style="padding: 7px 0; color: #2c3e50; font-size: 14px;"><a href="mailto:${escapeHtml(email)}" style="color: #C9A84C;">${escapeHtml(email)}</a></td>
              </tr>
              ${contact_pref ? `
              <tr>
                <td style="padding: 7px 0; font-weight: 600; color: #0D1B2A; vertical-align: top; font-size: 14px;">Preferred Contact</td>
                <td style="padding: 7px 0; color: #2c3e50; font-size: 14px;">${escapeHtml(contact_pref)}</td>
              </tr>` : ''}
            </table>

            <!-- Vehicle Info -->
            <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #888; margin: 0 0 8px;">Vehicle</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              ${vehicle_year ? `
              <tr>
                <td style="padding: 7px 0; font-weight: 600; color: #0D1B2A; width: 160px; vertical-align: top; font-size: 14px;">Year</td>
                <td style="padding: 7px 0; color: #2c3e50; font-size: 14px;">${escapeHtml(vehicle_year)}</td>
              </tr>` : ''}
              ${vehicle_make ? `
              <tr>
                <td style="padding: 7px 0; font-weight: 600; color: #0D1B2A; vertical-align: top; font-size: 14px;">Make</td>
                <td style="padding: 7px 0; color: #2c3e50; font-size: 14px;">${escapeHtml(vehicle_make)}</td>
              </tr>` : ''}
              ${vehicle_model ? `
              <tr>
                <td style="padding: 7px 0; font-weight: 600; color: #0D1B2A; vertical-align: top; font-size: 14px;">Model</td>
                <td style="padding: 7px 0; color: #2c3e50; font-size: 14px;">${escapeHtml(vehicle_model)}</td>
              </tr>` : ''}
              ${vehicle && !vehicle_year ? `
              <tr>
                <td style="padding: 7px 0; font-weight: 600; color: #0D1B2A; width: 160px; vertical-align: top; font-size: 14px;">Vehicle</td>
                <td style="padding: 7px 0; color: #2c3e50; font-size: 14px;">${escapeHtml(vehicle)}</td>
              </tr>` : ''}
            </table>

            <!-- Service Info -->
            <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #888; margin: 0 0 8px;">Service Request</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 7px 0; font-weight: 600; color: #0D1B2A; width: 160px; vertical-align: top; font-size: 14px;">Service(s)</td>
                <td style="padding: 7px 0; color: #2c3e50; font-size: 14px;">${escapeHtml(service)}</td>
              </tr>
              ${date ? `
              <tr>
                <td style="padding: 7px 0; font-weight: 600; color: #0D1B2A; vertical-align: top; font-size: 14px;">Preferred Date</td>
                <td style="padding: 7px 0; color: #2c3e50; font-size: 14px;">${escapeHtml(date)}</td>
              </tr>` : ''}
              ${message ? `
              <tr>
                <td style="padding: 7px 0; font-weight: 600; color: #0D1B2A; vertical-align: top; font-size: 14px;">Notes</td>
                <td style="padding: 7px 0; color: #2c3e50; font-size: 14px; white-space: pre-wrap;">${escapeHtml(message)}</td>
              </tr>` : ''}
            </table>

            <hr style="border: none; border-top: 1px solid #dee2e6; margin: 20px 0;">
            <p style="color: #888; font-size: 12px; margin: 0;">
              Sent from kubinautomotive.com &bull; Reply directly to this email to respond to the customer.
            </p>
          </div>
        </div>
      `
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({
      error: 'Failed to send. Please call us directly at (979) 779-7484.'
    });
  }
}

// Prevent XSS in email HTML output
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
