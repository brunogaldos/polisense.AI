const { onDocumentCreated } = require('firebase-functions/v2/firestore')
const { defineString } = require('firebase-functions/params')
const { initializeApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const logger = require('firebase-functions/logger')

initializeApp()

// Where demo notifications land. Configurable so it can be changed without a
// code edit (firebase functions:config / .env in the functions dir).
const NOTIFY_EMAIL = defineString('NOTIFY_EMAIL', {
  default: 'info@polisenseai.com',
  description: 'Address that receives Book a Demo notifications',
})

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// The Trigger Email extension watches the "mail" collection and sends one
// message per document, so this function's only job is to translate a demo
// request into that shape. Writing via the Admin SDK bypasses security rules,
// which is why "mail" can stay locked down to clients.
exports.onDemoRequestCreated = onDocumentCreated('demo-requests/{requestId}', async (event) => {
  const snapshot = event.data
  if (!snapshot) {
    logger.warn('No snapshot on demo-request create event', { requestId: event.params.requestId })
    return
  }

  const { email, company } = snapshot.data()
  const requestId = event.params.requestId

  // The requester's address goes in replyTo, never in "from" — sending as the
  // visitor would fail SPF/DKIM for their domain and land the mail in spam.
  await getFirestore().collection('mail').add({
    to: [NOTIFY_EMAIL.value()],
    replyTo: email,
    message: {
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
    },
  })

  logger.info('Queued demo request notification', { requestId, company })
})
