import useScrollReveal from '../hooks/useScrollReveal';
import useCountUp from '../hooks/useCountUp';
import './AboutSection.css';

export default function AboutSection() {
  const sectionRef = useScrollReveal();
  const clients = useCountUp(45, '+');
  const views = useCountUp(2, 'M');

  return (
    <section className="about-section reveal-section" id="about" ref={sectionRef}>
      <div className="about-text reveal-child" style={{ transitionDelay: '0s' }}>
        <h2>
          Chasing the <span className="italic">Golden Hour</span> for your brand.
        </h2>
        <p>
          We are a husband-and-wife creative duo specializing in sun-drenched
          storytelling. Inspired by the ease of mid-century leisure and the warmth
          of analog film, we craft social strategies that feel less like marketing
          and more like a memory.
        </p>
        <div className="stat-grid">
          <div className="stat-item" ref={clients.ref}>
            <h3>{clients.display}</h3>
            <span>Luxury Clients</span>
          </div>
          <div className="stat-item" ref={views.ref}>
            <h3>{views.display}</h3>
            <span>Views Generated</span>
          </div>
        </div>
      </div>

      <div className="about-aside reveal-child" style={{ transitionDelay: '0.2s' }}>
        Est.<br />
        Palm Springs<br />
        2023
      </div>
    </section>
  );
}
