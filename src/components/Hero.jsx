import '../styles/Hero.css';
import { useEffect, useRef } from 'react';

const BADGES = ['React.js', 'Modern UI', 'Full Stack', 'Creative'];

export default function Hero() {
  const cursorRef = useRef(null);
  const badgeIndex = useRef(0);
  const badgeRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      badgeIndex.current = (badgeIndex.current + 1) % BADGES.length;
      if (badgeRef.current) {
        badgeRef.current.style.opacity = '0';
        badgeRef.current.style.transform = 'translateY(6px)';
        setTimeout(() => {
          if (badgeRef.current) {
            badgeRef.current.textContent = BADGES[badgeIndex.current];
            badgeRef.current.style.opacity = '1';
            badgeRef.current.style.transform = 'translateY(0)';
          }
        }, 300);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero">
      {/* Animated background orbs */}
      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />
      <div className="hero-orb orb-3" />

      {/* Floating grid dots */}
      <div className="grid-dots" />

      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            <span>We craft&nbsp;</span>
            <span className="badge-text" ref={badgeRef}>{BADGES[0]}</span>
            <span>&nbsp;experiences</span>
          </div>

          <h1 className="hero-title">
            Build Something
            <br />
            <span className="gradient-text">Extraordinary</span>
          </h1>

          <p className="hero-desc">
            We design and develop stunning digital products that captivate users,
            drive growth, and leave a lasting impression. Let's create your next
            big idea together.
          </p>

          <div className="hero-actions">
            <a href="#portfolio" className="btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <span>View Our Work</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#about" className="btn-outline" onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
              <span>Watch Demo</span>
            </a>
          </div>

          <div className="hero-stats">
            {[
              { value: '150+', label: 'Projects Done' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '5+', label: 'Years Experience' },
            ].map((s) => (
              <div className="stat-item" key={s.label}>
                <span className="stat-value gradient-text">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card main-card glass-card">
            <div className="card-header">
              <div className="card-dots">
                <span style={{ background: '#ff6584' }} />
                <span style={{ background: '#ffd166' }} />
                <span style={{ background: '#43d9ad' }} />
              </div>
              <span className="card-title">nexora.dashboard</span>
            </div>
            <div className="card-body">
              <div className="metric-row">
                <div className="metric">
                  <span className="metric-label">Revenue</span>
                  <span className="metric-value gradient-text">$84.2K</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Growth</span>
                  <span className="metric-value" style={{ color: '#43d9ad' }}>+28.4%</span>
                </div>
              </div>
              <div className="chart-bars">
                {[40, 65, 50, 80, 60, 90, 75, 95].map((h, i) => (
                  <div key={i} className="chart-bar-wrap">
                    <div
                      className="chart-bar"
                      style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                    />
                  </div>
                ))}
              </div>
              <div className="users-row">
                <div className="user-avatars">
                  {['#6c63ff','#ff6584','#43d9ad','#ffd166'].map((c, i) => (
                    <span key={i} className="avatar" style={{ background: c, marginLeft: i ? '-8px' : 0 }} />
                  ))}
                </div>
                <span className="users-label">2.4k active users</span>
              </div>
            </div>
          </div>

          <div className="floating-badge badge-tl glass-card">
            <span className="fb-icon">🚀</span>
            <div>
              <div className="fb-title">New Launch</div>
              <div className="fb-sub">v3.0 is live!</div>
            </div>
          </div>

          <div className="floating-badge badge-br glass-card">
            <span className="fb-icon">⭐</span>
            <div>
              <div className="fb-title">4.9/5 Rating</div>
              <div className="fb-sub">From 340 reviews</div>
            </div>
          </div>

          <div className="ring ring-1" />
          <div className="ring ring-2" />
        </div>
      </div>

      <a href="#about" className="scroll-down" onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}>
        <span className="scroll-dot" />
        <span>Scroll Down</span>
      </a>
    </section>
  );
}
