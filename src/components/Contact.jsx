import { useState } from 'react';
import '../styles/Contact.css';

const CONTACT_INFO = [
  { icon: '📍', label: 'Address', value: '123 Innovation Ave, San Francisco, CA 94102' },
  { icon: '📧', label: 'Email', value: 'hello@nexora.design' },
  { icon: '📞', label: 'Phone', value: '+1 (415) 555-0192' },
];

const SOCIALS = [
  { label: 'Twitter', icon: '𝕏', href: '#' },
  { label: 'LinkedIn', icon: 'in', href: '#' },
  { label: 'Dribbble', icon: '⦿', href: '#' },
  { label: 'GitHub', icon: '⌥', href: '#' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'success' | null

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(null), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-bg-orb" />
      <div className="container">
        <div className="section-header">
          <span className="section-label">Get In Touch</span>
          <h2>
            Let's Build Something
            <span className="gradient-text"> Amazing Together</span>
          </h2>
          <p>Ready to start your project? Drop us a message and we'll get back to you within 24 hours.</p>
        </div>

        <div className="contact-grid">
          {/* Left info panel */}
          <div className="contact-info">
            <div className="info-intro glass-card">
              <h3>Ready to start?</h3>
              <p>Tell us about your project and we'll craft the perfect solution for you.</p>
              <div className="info-items">
                {CONTACT_INFO.map((item) => (
                  <div className="info-item" key={item.label}>
                    <span className="info-icon">{item.icon}</span>
                    <div>
                      <div className="info-label">{item.label}</div>
                      <div className="info-value">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="social-links">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} className="social-btn glass-card" title={s.label}>
                  <span>{s.icon}</span>
                </a>
              ))}
            </div>

            <div className="availability glass-card">
              <div className="avail-dot" />
              <span>Currently available for new projects</span>
            </div>
          </div>

          {/* Right form */}
          <form className="contact-form glass-card" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="What's this about?"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Tell us about your project, goals, and timeline..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className={`btn-primary submit-btn${status === 'sending' ? ' loading' : ''}${status === 'success' ? ' success' : ''}`}
              disabled={status === 'sending'}
            >
              <span className="btn-text">
                {status === 'success' ? (
                  <>✓ Message Sent!</>
                ) : status === 'sending' ? (
                  <>Sending…</>
                ) : (
                  <>
                    Send Message
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
