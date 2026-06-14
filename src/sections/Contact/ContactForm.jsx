import { useState } from 'react'
import MagneticButton from '../../components/MagneticButton'
import styles from './ContactForm.module.css'

const INITIAL = {
  name: '',
  phone: '',
  email: '',
  location: '',
  details: '',
  company: '',
}

const COUNTRY_CODES = [
  { value: '+1', label: '+1' },
  { value: '+44', label: '+44' },
  { value: '+65', label: '+65' },
  { value: '+32', label: '+32' },
  { value: '+91', label: '+91' },
  { value: '+971', label: '+971' },
]

export function ContactForm() {
  const [form, setForm] = useState(INITIAL)
  const [countryCode, setCountryCode] = useState('+1')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  const resetForm = () => {
    setForm(INITIAL)
    setCountryCode('+1')
    setStatus('idle')
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('sending')
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          phone: `${countryCode} ${form.phone}`.trim(),
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setStatus('success')
    } catch (submitError) {
      setStatus('idle')
      setError(submitError.message || 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <section className={styles.contact} aria-labelledby="contact-success">
        <div className={styles.inner}>
          <div className={styles.success}>
            <p id="contact-success" className={styles.successText}>
              Yeah! Your letter is already in our priority mailbox, they will contact you very soon!
            </p>
            <button type="button" className={styles.resetBtn} onClick={resetForm}>
              Send again
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.contact} aria-labelledby="contact-heading">
      <div className={styles.inner}>
        <h1 id="contact-heading" className={styles.heading}>
          Hello there! We're so excited you found us. Tell us a bit about the project you have in mind!
        </h1>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.honeypot} aria-hidden>
            <label htmlFor="company">Leave this field empty</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.company}
              onChange={updateField('company')}
            />
          </div>

          <div className={styles.grid}>
            <label className={styles.field}>
              <span className={styles.label}>Your name:</span>
              <input
                className={styles.input}
                type="text"
                name="name"
                value={form.name}
                onChange={updateField('name')}
                required
                autoComplete="name"
              />
            </label>

            <div className={styles.field}>
              <span className={styles.label}>Phone:</span>
              <div className={styles.phoneRow}>
                <select
                  className={styles.select}
                  value={countryCode}
                  onChange={(event) => setCountryCode(event.target.value)}
                  aria-label="Country code"
                >
                  {COUNTRY_CODES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <input
                  className={styles.input}
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={updateField('phone')}
                  placeholder="917 259 1089"
                  required
                  autoComplete="tel-national"
                />
              </div>
            </div>

            <label className={styles.field}>
              <span className={styles.label}>Email:</span>
              <input
                className={styles.input}
                type="email"
                name="email"
                value={form.email}
                onChange={updateField('email')}
                required
                autoComplete="email"
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Country/City:</span>
              <input
                className={styles.input}
                type="text"
                name="location"
                value={form.location}
                onChange={updateField('location')}
                required
                autoComplete="address-level2"
              />
            </label>

            <label className={styles.fieldFull}>
              <span className={styles.label}>Project details:</span>
              <textarea
                className={styles.textarea}
                name="details"
                value={form.details}
                onChange={updateField('details')}
                required
              />
            </label>
          </div>

          <div className={styles.actions}>
            <MagneticButton className={styles.submitWrap}>
              <button
                type="submit"
                className={styles.submit}
                disabled={status === 'sending'}
                data-cursor-text={status === 'sending' ? 'Sending…' : 'Send request'}
              >
                {status === 'sending' ? (
                  'Sending…'
                ) : (
                  <span className={styles.submitLabel}>
                    <span>Send</span>
                    <span>request</span>
                  </span>
                )}
              </button>
            </MagneticButton>
            {error ? (
              <p className={styles.error} role="alert">
                {error}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  )
}
