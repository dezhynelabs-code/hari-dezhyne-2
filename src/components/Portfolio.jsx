import { useState } from 'react';
import '../styles/Portfolio.css';

const CATEGORIES = ['All', 'Web', 'Mobile', 'Brand', 'Design'];

const PROJECTS = [
  {
    title: 'FinFlow Dashboard',
    category: 'Web',
    tags: ['React', 'Node.js', 'D3.js'],
    desc: 'A comprehensive financial analytics platform with real-time charts and AI insights.',
    colors: ['#6c63ff', '#a89cff'],
    emoji: '📊',
    featured: true,
  },
  {
    title: 'Pulse Health App',
    category: 'Mobile',
    tags: ['React Native', 'Firebase'],
    desc: 'A personal health tracking app with workout plans and nutrition logging.',
    colors: ['#ff6584', '#ffb3c6'],
    emoji: '💪',
    featured: false,
  },
  {
    title: 'Lumiere Brand',
    category: 'Brand',
    tags: ['Branding', 'Figma', 'Motion'],
    desc: 'Complete brand identity for a luxury cosmetics startup, from logo to campaign.',
    colors: ['#ffd166', '#ffe9a8'],
    emoji: '✨',
    featured: false,
  },
  {
    title: 'ShopAura E-Commerce',
    category: 'Web',
    tags: ['Next.js', 'Stripe', 'CMS'],
    desc: 'A high-converting e-commerce platform with seamless checkout and AR try-on.',
    colors: ['#43d9ad', '#a8f0de'],
    emoji: '🛍️',
    featured: false,
  },
  {
    title: 'Orbis Design System',
    category: 'Design',
    tags: ['Figma', 'Storybook', 'Tokens'],
    desc: 'Scalable design system with 200+ components used across 5 product teams.',
    colors: ['#7dd3fc', '#bae6fd'],
    emoji: '🎨',
    featured: false,
  },
  {
    title: 'Nomad Travel App',
    category: 'Mobile',
    tags: ['Flutter', 'Maps API'],
    desc: 'AI-powered travel companion with smart itinerary planning and local tips.',
    colors: ['#c084fc', '#e9d5ff'],
    emoji: '✈️',
    featured: false,
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = PROJECTS.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <section id="portfolio" className="section portfolio-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Portfolio</span>
          <h2>
            Work That
            <span className="gradient-text2"> Speaks for Itself</span>
          </h2>
          <p>A selection of our finest projects across industries — each one crafted with precision and passion.</p>
        </div>

        {/* Filter tabs */}
        <div className="portfolio-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="portfolio-grid">
          {filtered.map((project, i) => (
            <div
              key={project.title}
              className={`project-card glass-card${project.featured ? ' featured' : ''}`}
              style={{ '--c1': project.colors[0], '--c2': project.colors[1] }}
            >
              <div className="project-thumb" style={{
                background: `linear-gradient(135deg, ${project.colors[0]}22, ${project.colors[1]}44)`,
                borderBottom: `1px solid ${project.colors[0]}20`,
              }}>
                <div className="project-emoji">{project.emoji}</div>
                <div className="project-glow" style={{ background: `radial-gradient(circle, ${project.colors[0]}50, transparent 70%)` }} />
              </div>
              <div className="project-info">
                <div className="project-tags">
                  {project.tags.map((t) => (
                    <span key={t} className="project-tag" style={{ color: project.colors[0], background: `${project.colors[0]}18`, border: `1px solid ${project.colors[0]}30` }}>
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-footer">
                  <button className="project-link" style={{ color: project.colors[0] }}>
                    View Case Study
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <span>No projects found in this category</span>
          </div>
        )}
      </div>
    </section>
  );
}
