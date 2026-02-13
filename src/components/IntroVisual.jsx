import { useEffect, useRef } from 'react';
import './IntroVisual.css';

export default function IntroVisual() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section className="intro-visual" id="work" ref={sectionRef}>
      <div className="intro-img" />
    </section>
  );
}
