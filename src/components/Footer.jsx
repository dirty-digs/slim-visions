import useScrollReveal from '../hooks/useScrollReveal';
import './Footer.css';

const socials = ['Instagram', 'TikTok', 'Pinterest', 'LinkedIn'];

export default function Footer() {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  const scrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer-curtain reveal-section" ref={sectionRef}>
      <div className="footer-content">
        <div className="cta-box reveal-child" style={{ transitionDelay: '0s' }}>
          <h2>
            Ready to step into<br />
            the <span className="italic">sunlight?</span>
          </h2>
          <a href="#contact" className="btn-glamour" onClick={scrollToContact}>
            Inquire for 2024
          </a>
        </div>
        <div className="socials reveal-child" style={{ transitionDelay: '0.2s' }}>
          {socials.map((name) => (
            <a href="#" className="social-link" key={name}>{name}</a>
          ))}
        </div>
      </div>
      <div className="copyright">
        &copy; 2024 Slim Visions Agency. All Rights Reserved.
      </div>
    </footer>
  );
}
