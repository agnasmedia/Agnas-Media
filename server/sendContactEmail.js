/* eslint-env node */

import { Resend } from 'resend'

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  location: '',
  details: '',
  company: '',
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch (error) {
        reject(error)
      }
    })
    req.on('error', reject)
  })
}

export async function handleContactRequest(body) {
  const payload = { ...EMPTY_FORM, ...body }

  if (payload.company) {
    return { status: 400, body: { error: 'Invalid submission.' } }
  }

  const name = payload.name?.trim()
  const phone = payload.phone?.trim()
  const email = payload.email?.trim()
  const location = payload.location?.trim()
  const details = payload.details?.trim()

  if (!name || !phone || !email || !location || !details) {
    return { status: 400, body: { error: 'Please fill in all required fields.' } }
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    return { status: 400, body: { error: 'Please enter a valid email address.' } }
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM || 'onboarding@resend.dev'
  const to = process.env.RESEND_TO || 'hello@agnasmedia.com'

  if (!apiKey) {
    return {
      status: 500,
      body: { error: 'Email service is not configured. Add RESEND_API_KEY to your .env file.' },
    }
  }

  const resend = new Resend(apiKey)
  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `New project inquiry from ${name}`,
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Country/City:</strong> ${escapeHtml(location)}</p>
      <p><strong>Project details:</strong></p>
      <p>${escapeHtml(details).replace(/\n/g, '<br />')}</p>
    `,
  })

  if (error) {
    return { status: 502, body: { error: error.message || 'Failed to send message.' } }
  }

  return { status: 200, body: { success: true, id: data?.id } }
}

export async function handleContactHttpRequest(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  try {
    const body = await readJsonBody(req)
    const result = await handleContactRequest(body)
    res.statusCode = result.status
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(result.body))
  } catch {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Invalid request body.' }))
  }
}
