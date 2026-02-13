import useScrollReveal from '../hooks/useScrollReveal';
import './ServicesSection.css';

const services = [
  {
    num: '01',
    title: 'Short-Form Motion',
    desc: 'Vertical video that drifts, not rushes. We produce high-fidelity Reels and TikToks that capture the texture of luxury.',
  },
  {
    num: '02',
    title: 'Visual Calendar',
    desc: 'We curate your grid like an art gallery. Cohesive color stories, staggered posting schedules, and editorial captions.',
  },
  {
    num: '03',
    title: 'Consultation',
    desc: 'Brand alignment workshops to ensure your digital presence matches your physical prestige.',
  },
];

export default function ServicesSection() {
  const sectionRef = useScrollReveal();

  const marqueeText =
    'CONTENT STRATEGY — ART DIRECTION — SOCIAL MANAGEMENT — CONTENT STRATEGY — ART DIRECTION — SOCIAL MANAGEMENT — ';

  return (
    <section className="services-section reveal-section" id="services" ref={sectionRef}>
      <div className="marquee-container">
        <div className="marquee-text">{marqueeText}</div>
      </div>

      <div className="services-grid">
        {services.map((s, i) => (
          <div
            className="service-card reveal-child"
            key={s.num}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <div className="service-num">{s.num}</div>
            <div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
