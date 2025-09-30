import { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submittedData, setSubmittedData] = useState(null)
  const [error, setError] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const { name, email, message } = formData

    // Simple validation
    if (!name || !email || !message) {
      setError('Please fill in all fields.')
      return
    }

    // Mock reCAPTCHA check (always passes in demo)
    const recaptchaPassed = true
    if (!recaptchaPassed) {
      setError('reCAPTCHA validation failed.')
      return
    }

    // Store submitted data in state
    setSubmittedData(formData)
    setError('')
    // Optionally reset form
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="contact-page container">
      <h1>Contact Us</h1>

      {submittedData ? (
        <div className="thank-you">
          <h2>Thank you, {submittedData.name}!</h2>
          <p>Your message has been received. We will get back to you soon.</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {error && <p className="form-error">{error}</p>}

          <label htmlFor="name">
            Name
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="message">
            Message
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>

          {/* Mock reCAPTCHA widget */}
          <div className="recaptcha-placeholder">
            {/* In production, integrate Google reCAPTCHA v2/v3 here */}
            [reCAPTCHA widget]
          </div>

          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      )}
    </div>
  )
}

export default Contact
