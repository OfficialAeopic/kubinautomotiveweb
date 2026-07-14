// api/careers.js — Kubin Automotive Service job application handler
// Vercel serverless function. Requires the SAME RESEND_API_KEY environment
// variable used by api/contact.js — no new credential needed.
// Set it in: Vercel Dashboard > Project > Settings > Environment Variables
//
// Accepts POST JSON from /careers/:
//   { name, phone, email, experience, ase, message, website (honeypot),
//     resume: { filename, contentBase64 } }
//
// Emails the application to the shop with the resume attached via Resend.

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_RESUME_BYTES = 3 * 1024 * 1024; // 3 MB decoded (base64 inflation keeps request body under Vercel ~4.5MB limit)
const ALLOWED_EXT = ['pdf', 'doc', 'docx'];

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name,
    phone,
    email,
    experience,
    ase,
    message,
    // Honeypot
    website,
    // { filename, contentBase64 }
    resume
  } = req.body || {};

  // Honeypot check — bots fill this field, real users do not see it
  if (website) {
    return res.status(200).json({ success: true });
  }

  // Required field validation
  if (!name || !phone || !email || !resume) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Validate resume shape
  const filename = typeof resume.filename === 'string' ? resume.filename : '';
  const contentBase64 = typeof resume.contentBase64 === 'string' ? resume.contentBase64 : '';

  if (!filename || !contentBase64) {
    return res.status(400).json({ error: 'Resume file is missing or unreadable.' });
  }

  // Validate extension
  const ext = filename.toLowerCase().split('.').pop();
  if (!ALLOWED_EXT.includes(ext)) {
    return res.status(400).json({ error: 'Resume must be a PDF, DOC, or DOCX file.' });
  }

  // Validate decoded size (base64 length * 3/4 approximates the byte count).
  // Strip any accidental data-URI prefix first.
  const rawBase64 = contentBase64.includes(',')
    ? contentBase64.slice(contentBase64.indexOf(',') + 1)
    : contentBase64;

  if (!rawBase64) {
    return res.status(400).json({ error: 'Resume file is empty.' });
  }

  const approxBytes = Math.floor((rawBase64.length * 3) / 4);
  if (approxBytes > MAX_RESUME_BYTES) {
    return res.status(400).json({
      error: 'Resume is over 4 MB. Please email it directly to Kubin.Automotive@yahoo.com.'
    });
  }

  const safeFilename = sanitizeFilename(filename);

  try {
    await resend.emails.send({
      // IMPORTANT: The "from" domain (kubinautomotive.com) must be verified in
      // the Resend dashboard before this will send. Same requirement as contact.js.
      from: 'Kubin Automotive Website <noreply@kubinautomotive.com>',
      to: 'Kubin.Automotive@yahoo.com',
      reply_to: email,
      subject: `New Job Application (General Technician) — ${name}`,
      attachments: [
        {
          filename: safeFilename,
          content: rawBase64
        }
      ],
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #2c3e50;">
          <div style="background: #0D1B2A; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #C9A84C; margin: 0; font-size: 20px;">New Job Application</h2>
            <p style="color: #B8C5D1; margin: 6px 0 0; font-size: 13px;">
              General Automotive Technician &bull; Submitted via /careers/ &bull; Kubin Automotive Service website
            </p>
          </div>
          <div style="background: #f8f9fa; padding: 28px 32px; border-radius: 0 0 8px 8px; border: 1px solid #dee2e6; border-top: none;">

            <!-- Applicant Info -->
            <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #888; margin: 0 0 8px;">Applicant</p>
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
            </table>

            <!-- Experience -->
            <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #888; margin: 0 0 8px;">Experience</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 7px 0; font-weight: 600; color: #0D1B2A; width: 160px; vertical-align: top; font-size: 14px;">Years</td>
                <td style="padding: 7px 0; color: #2c3e50; font-size: 14px;">${experience ? escapeHtml(experience) : 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 7px 0; font-weight: 600; color: #0D1B2A; vertical-align: top; font-size: 14px;">ASE Certified</td>
                <td style="padding: 7px 0; color: #2c3e50; font-size: 14px;">${ase ? escapeHtml(ase) : 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 7px 0; font-weight: 600; color: #0D1B2A; vertical-align: top; font-size: 14px;">Resume</td>
                <td style="padding: 7px 0; color: #2c3e50; font-size: 14px;">${escapeHtml(safeFilename)} <span style="color:#888;">(attached)</span></td>
              </tr>
            </table>

            ${message ? `
            <!-- Message -->
            <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #888; margin: 0 0 8px;">Why Kubin</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 7px 0; color: #2c3e50; font-size: 14px; white-space: pre-wrap;">${escapeHtml(message)}</td>
              </tr>
            </table>` : ''}

            <hr style="border: none; border-top: 1px solid #dee2e6; margin: 20px 0;">
            <p style="color: #888; font-size: 12px; margin: 0;">
              Sent from kubinautomotive.com &bull; The applicant's resume is attached to this email. Reply directly to reach the applicant.
            </p>
          </div>
        </div>
      `
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({
      error: 'Failed to send. Please email your resume to Kubin.Automotive@yahoo.com or call (979) 779-7484.'
    });
  }
}

// Keep the attachment filename safe and tidy
function sanitizeFilename(name) {
  const base = String(name).split(/[\\/]/).pop();
  const cleaned = base.replace(/[^a-zA-Z0-9._ -]/g, '_').slice(0, 120);
  return cleaned || 'resume';
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
