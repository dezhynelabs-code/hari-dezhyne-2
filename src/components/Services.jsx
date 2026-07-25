import { useState } from 'react';
import '../styles/Services.css';

const SERVICES = [
  {
    icon: '✦',
    title: 'UI/UX Design',
    desc: 'We create intuitive, beautiful interfaces grounded in user research and modern design principles.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    color: '#6c63ff',
    gradient: 'linear-gradient(135deg, #6c63ff, #a89cff)',
  },
  {
    icon: '⟨/⟩',
    title: 'Web Development',
    desc: 'High-performance web apps built with cutting-edge technologies and best practices.',
    features: ['React / Next.js', 'Node.js / API', 'TypeScript', 'Testing'],
    color: '#ff6584',
    gradient: 'linear-gradient(135deg, #ff6584, #ffb3c6)',
  },
  {
    icon: '◈',
    title: 'Mobile Apps',
    desc: 'Cross-platform mobile applications that deliver native-like experience on iOS and Android.',
    features: ['React Native', 'Flutter', 'App Store Deploy', 'Push Notifications'],
    color: '#43d9ad',
    gradient: 'linear-gradient(135deg, #43d9ad, #a8f0de)',
  },
  {
    icon: '⬡',
    title: 'Brand Identity',
    desc: 'Crafting memorable brand identities that resonate with your target audience and stand out.',
    features: ['Logo Design', 'Brand Strategy', 'Style Guides', 'Marketing Assets'],
    color: '#ffd166',
    gradient: 'linear-gradient(135deg, #ffd166, #ffe9a8)',
  },
  {
    icon: '⟳',
    title: 'Cloud & DevOps',
    desc: 'Scalable infrastructure, CI/CD pipelines, and monitoring for seamless deployments.',
    features: ['AWS / GCP', 'Docker & K8s', 'CI/CD Pipelines', 'Performance'],
    color: '#7dd3fc',
    gradient: 'linear-gradient(135deg, #7dd3fc, #bae6fd)',
  },
  {
    icon: '◐',
    title: 'SEO & Analytics',
    desc: 'Data-driven strategies to boost your visibility, traffic, and conversion rates.',
    features: ['Technical SEO', 'Analytics Setup', 'A/B Testing', 'Growth Strategy'],
    color: '#c084fc',
    gradient: 'linear-gradient(135deg, #c084fc, #e9d5ff)',
  },
];

export default function Services() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Services</span>
          <h2>
            Everything You Need to
            <span className="gradient-text"> Succeed Online</span>
          </h2>
          <p>From concept to launch, we provide end-to-end digital solutions that help businesses grow and users fall in love.</p>
        </div>

        <div className="services-grid">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.title}
              className={`service-card glass-card${hovered === i ? ' hovered' : ''}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ '--svc-color': svc.color }}
            >
              <div className="svc-icon-wrap" style={{ background: `${svc.color}18`, border: `1px solid ${svc.color}30` }}>
                <span className="svc-icon" style={{ color: svc.color }}>{svc.icon}</span>
              </div>
              <h3 className="svc-title">{svc.title}</h3>
              <p className="svc-desc">{svc.desc}</p>
              <ul className="svc-features">
                {svc.features.map((f) => (
                  <li key={f}>
                    <span className="feature-dot" style={{ background: svc.color }} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="svc-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <div className="svc-glow" style={{ background: svc.gradient }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
