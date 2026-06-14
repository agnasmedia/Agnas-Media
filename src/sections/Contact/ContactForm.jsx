import { useState } from 'react'
import MagneticButton from '../../components/MagneticButton'
import styles from './ContactForm.module.css'

const INITIAL = {
  name: '',
  countryCode: '',
  phone: '',
  email: '',
  location: '',
  details: '',
  company: '',
}

const PHONE_PREFIX = '+'

export function ContactForm() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  const updateCountryCode = (event) => {
    const digits = event.target.value.replace(/\D/g, '')
    setForm((current) => ({ ...current, countryCode: digits }))
  }

  const resetForm = () => {
    setForm(INITIAL)
    setStatus('idle')
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('sending')
    setError('')

    const code = form.countryCode.trim()
    if (!code) {
      setStatus('idle')
      setError('Please enter a country code.')
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          phone: `${PHONE_PREFIX}${code} ${form.phone}`.trim(),
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
              Yeah! Thanks for reaching out, we'll get back to you as soon as possible.
            </p>
            <button type="button" className={styles.resetBtn} onClick={() => window.location.href = '/'}>
              Take me back to the home
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
          Hello there! We&apos;re so excited you found us. Tell us a bit about the project you have in mind!
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
                <div className={styles.codeField}>
                  <span className={styles.codePrefix} aria-hidden>
                    {PHONE_PREFIX}
                  </span>
                  <input
                    className={styles.codeInput}
                    type="tel"
                    inputMode="numeric"
                    name="countryCode"
                    value={form.countryCode}
                    onChange={updateCountryCode}
                    placeholder="1"
                    required
                    aria-label="Country code"
                    autoComplete="tel-country-code"
                  />
                </div>
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
