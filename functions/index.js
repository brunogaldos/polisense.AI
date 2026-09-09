const { onDocumentCreated } = require('firebase-functions/v2/firestore')
const { defineString, defineSecret } = require('firebase-functions/params')
const logger = require('firebase-functions/logger')
const nodemailer = require('nodemailer')

// Where demo notifications land, and the account they are sent through.
// Configurable so neither needs a code edit to change.
const NOTIFY_EMAIL = defineString('NOTIFY_EMAIL', {
  default: 'info@polisenseai.com',
  description: 'Address that receives Book a Demo notifications',
})
const SMTP_USER = defineString('SMTP_USER', {
  default: 'tech@polisenseai.com',
  description: 'Gmail/Workspace account used to send notifications',
})
const SMTP_PASSWORD = defineSecret('SMTP_PASSWORD')

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Sends the notification itself rather than handing off to the Trigger Email
// extension. The extension never received its SMTP_PASSWORD secret and failed
// every delivery with 'Missing credentials for "PLAIN"', with no way to inspect
// its resolved config; sending here keeps the credentials and the failure modes
// somewhere we can actually log.
exports.onDemoRequestCreated = onDocumentCreated(
  { document: 'demo-requests/{requestId}', secrets: [SMTP_PASSWORD] },
  async (event) => {
    const snapshot = event.data
    if (!snapshot) {
      logger.warn('No snapshot on demo-request create event', { requestId: event.params.requestId })
      return
    }

    const { email, company } = snapshot.data()
    const requestId = event.params.requestId

    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: SMTP_USER.value(), pass: SMTP_PASSWORD.value() },
    })

    // Gmail rewrites "from" to the authenticated account regardless, so send as
    // ourselves and put the requester in replyTo — sending as the visitor would
    // fail SPF/DKIM for their domain and land the mail in spam.
    const info = await transport.sendMail({
      from: `Polisense Website <${SMTP_USER.value()}>`,
      to: NOTIFY_EMAIL.value(),
      replyTo: email,
      subject: `New demo request: ${company}`,
      text: [
        'A new demo request came in from the Polisense landing page.',
        '',
        `Email:   ${email}`,
        `Company: ${company}`,
        `Request: ${requestId}`,
      ].join('\n'),
      html: [
        '<h2>New demo request</h2>',
        '<p>A new demo request came in from the Polisense landing page.</p>',
        '<table cellpadding="6" style="border-collapse:collapse">',
        `<tr><td><strong>Email</strong></td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>`,
        `<tr><td><strong>Company</strong></td><td>${escapeHtml(company)}</td></tr>`,
        `<tr><td><strong>Request</strong></td><td><code>${escapeHtml(requestId)}</code></td></tr>`,
        '</table>',
        '<p>Reply directly to this email to reach the requester.</p>',
      ].join('\n'),
    })

    logger.info('Demo request notification sent', {
      requestId,
      company,
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    })
  }
)
