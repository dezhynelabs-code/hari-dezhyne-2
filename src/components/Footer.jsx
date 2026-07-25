import '../styles/Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="nav-logo" href="#home" onClick={(e) => { e.preventDefault(); document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <span style={{ fontSize: '1.4rem', background: 'linear-gradient(135deg,#6c63ff,#ff6584)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>⬡</span>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '1.2rem' }}>Nexora</span>
            </a>
            <p>Building exceptional digital experiences that captivate users and drive real business growth.</p>
          </div>

          <div className="footer-links-group">
            <h4>Company</h4>
            <ul>
              {['About', 'Services', 'Portfolio', 'Contact'].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} onClick={(e) => { e.preventDefault(); document.querySelector(`#${l.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' }); }}>{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Services</h4>
            <ul>
              {['UI/UX Design', 'Web Development', 'Mobile Apps', 'Brand Identity', 'SEO & Analytics'].map((l) => (
                <li key={l}><a href="#services">{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Stay Updated</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 14 }}>
              Subscribe to our newsletter for the latest design tips.
            </p>
            <div className="newsletter-form">
              <input type="email" placeholder="your@email.com" />
              <button className="btn-primary" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Nexora. All rights reserved.</span>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Made with ❤️ & React</span>
        </div>
      </div>
    </footer>
  );
}
