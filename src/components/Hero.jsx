import { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const el = wrapperRef.current;
      if (el) {
        el.style.transform = `translateY(${scrolled * 0.4}px)`;
        el.style.opacity = 1 - scrolled * 0.003;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderWord = (text, style) => (
    <span className="word" style={style}>
      {text.split('').map((char, i) => (
        <span className="char" key={i}>{char}</span>
      ))}
    </span>
  );

  return (
    <header className="hero">
      <div className="hero-text-wrapper" ref={wrapperRef}>
        <h1>
          {renderWord('SLIM')}
          {renderWord('VISIONS', { marginLeft: '2vw' })}
        </h1>
        <p className="hero-sub">Cinema-grade content for the leisure class.</p>
      </div>
    </header>
  );
}
