import { handleContactRequest } from '../server/sendContactEmail.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const result = await handleContactRequest(req.body)
    res.status(result.status).json(result.body)
  } catch {
    res.status(400).json({ error: 'Invalid request body.' })
  }
}
