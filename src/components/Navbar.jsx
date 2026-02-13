import './Navbar.css';

export default function Navbar() {
  const handleClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav>
      <div className="logo">Slim Visions</div>
      <div className="nav-links">
        <a href="#work" onClick={(e) => handleClick(e, 'work')}>Work</a>
        <a href="#services" onClick={(e) => handleClick(e, 'services')}>Services</a>
        <a href="#about" onClick={(e) => handleClick(e, 'about')}>Journal</a>
        <a href="#contact" onClick={(e) => handleClick(e, 'contact')}>Contact</a>
      </div>
    </nav>
  );
}
