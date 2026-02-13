import { useState, useEffect } from 'react';
import NoiseOverlay from './components/NoiseOverlay';
import OrbBackground from './components/OrbBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IntroVisual from './components/IntroVisual';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import OnboardingForm from './components/OnboardingForm';
import Footer from './components/Footer';
import ActivationPopup from './components/ActivationPopup';

function App() {
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    if (!activated) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activated]);

  return (
    <>
      {!activated && <ActivationPopup onDismiss={() => setActivated(true)} />}
      <NoiseOverlay />
      <OrbBackground />
      <Navbar />
      <Hero />
      <IntroVisual />
      <AboutSection />
      <ServicesSection />
      <OnboardingForm />
      <Footer />
    </>
  );
}

export default App;
