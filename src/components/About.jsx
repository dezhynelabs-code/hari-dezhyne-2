import '../styles/About.css';

const SKILLS = [
  { name: 'UI/UX Design', pct: 95 },
  { name: 'Frontend Dev', pct: 92 },
  { name: 'Backend Dev', pct: 87 },
  { name: 'Cloud & DevOps', pct: 80 },
];

const TEAM = [
  { name: 'Alex Rivera', role: 'Creative Director', emoji: '🎨', color: '#6c63ff' },
  { name: 'Maya Chen', role: 'Lead Developer', emoji: '💻', color: '#ff6584' },
  { name: 'Jordan Kim', role: 'UX Strategist', emoji: '🎯', color: '#43d9ad' },
];

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-grid">
          {/* Left: Content */}
          <div className="about-content">
            <span className="section-label">About Us</span>
            <h2>
              We Are a Team of
              <span className="gradient-text"> Passionate Creators</span>
            </h2>
            <p className="about-desc">
              Founded in 2019, Nexora is a creative agency that specializes in building
              exceptional digital experiences. We blend art and engineering to craft
              products that delight users and drive real business results.
            </p>

            <div className="skills-list">
              {SKILLS.map((s) => (
                <div className="skill-item" key={s.name}>
                  <div className="skill-meta">
                    <span>{s.name}</span>
                    <span className="skill-pct gradient-text">{s.pct}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-fill"
                      style={{ '--pct': `${s.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-primary" style={{ width: 'fit-content' }} onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <span>Work With Us</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          {/* Right: Cards */}
          <div className="about-right">
            {/* Experience card */}
            <div className="exp-card glass-card">
              <div className="exp-number gradient-text">5+</div>
              <div className="exp-label">Years of Excellence</div>
              <div className="exp-divider" />
              <div className="exp-row">
                <div className="exp-stat">
                  <span className="es-val">150+</span>
                  <span className="es-label">Projects</span>
                </div>
                <div className="exp-stat">
                  <span className="es-val">80+</span>
                  <span className="es-label">Clients</span>
                </div>
                <div className="exp-stat">
                  <span className="es-val">12</span>
                  <span className="es-label">Awards</span>
                </div>
              </div>
            </div>

            {/* Team cards */}
            <div className="team-cards">
              {TEAM.map((member) => (
                <div className="team-card glass-card" key={member.name}>
                  <div className="team-avatar" style={{ background: `${member.color}22`, border: `1.5px solid ${member.color}44` }}>
                    <span>{member.emoji}</span>
                  </div>
                  <div>
                    <div className="team-name">{member.name}</div>
                    <div className="team-role" style={{ color: member.color }}>{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
