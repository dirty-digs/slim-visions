import { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import './OnboardingForm.css';

const BUSINESS_TYPES = [
  'E-commerce', 'Local Business', 'Personal Brand',
  'Restaurant/Food', 'Fitness/Wellness', 'Tech/SaaS', 'Other',
];

const SOCIAL_PRESENCE = [
  'Starting from scratch',
  'Post sometimes',
  'Active but need help',
  'Need full rebrand',
];

const SERVICES = [
  'Short-Form Content',
  'Social Media Management',
  'Content Calendar & Scheduling',
  'Strategy Consultation',
];

const BUDGETS = ['$500–$1K', '$1K–$2.5K', '$2.5K–$5K', '$5K+'];

const CONTACT_METHODS = ['Email', 'Phone', 'DM'];

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [confettiPieces, setConfettiPieces] = useState([]);
  const formRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    businessName: '',
    email: '',
    businessType: '',
    socialPresence: '',
    services: [],
    budget: '',
    notes: '',
    contactMethod: '',
  });

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleService = (service) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
    setErrors((prev) => ({ ...prev, services: undefined }));
  };

  const validateStep = (s) => {
    const e = {};
    if (s === 1) {
      if (!form.name.trim()) e.name = "We'd love to know your name!";
      if (!form.businessName.trim()) e.businessName = "What's your business called?";
      if (!form.email.trim()) e.email = 'We need your email to reach you.';
      else if (!validateEmail(form.email)) e.email = "Hmm, that doesn't look like a valid email.";
    }
    if (s === 2) {
      if (!form.businessType) e.businessType = 'Pick the one that fits best!';
      if (!form.socialPresence) e.socialPresence = "Let us know where you're at.";
    }
    if (s === 3) {
      if (form.services.length === 0) e.services = 'Select at least one service.';
      if (!form.budget) e.budget = 'Give us a ballpark — no pressure!';
    }
    if (s === 4) {
      if (!form.contactMethod) e.contactMethod = 'How should we reach out?';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setDirection(1);
    setStep((s) => s + 1);
  };

  const back = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const spawnConfetti = () => {
    const colors = ['#FCEEA7', '#DFA086', '#FF9E80', '#0088AA', '#003B4D', '#F9F7F1'];
    const pieces = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 1 + Math.random() * 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      size: 6 + Math.random() * 8,
    }));
    setConfettiPieces(pieces);
  };

  const handleSubmit = () => {
    if (!validateStep(step)) return;
    console.log('Slim Visions — Onboarding Form Data:', form);
    setSubmitted(true);
    spawnConfetti();
  };

  if (submitted) {
    return (
      <section className="onboarding-section" id="contact">
        <div className="onboarding-card confirmation-card">
          {confettiPieces.length > 0 && (
            <div className="confetti-container">
              {confettiPieces.map((p) => (
                <div
                  key={p.id}
                  className="confetti-piece"
                  style={{
                    left: `${p.x}%`,
                    animationDelay: `${p.delay}s`,
                    animationDuration: `${p.duration}s`,
                    backgroundColor: p.color,
                    transform: `rotate(${p.rotation}deg)`,
                    width: p.size,
                    height: p.size,
                  }}
                />
              ))}
            </div>
          )}
          <div className="confirmation-content">
            <div className="checkmark-burst">
              <Check size={48} strokeWidth={3} />
            </div>
            <h2>We got you!</h2>
            <p>Expect to hear from us within 24 hours.</p>
          </div>
        </div>
      </section>
    );
  }

  const progress = ((step - 1) / 3) * 100;

  return (
    <section className="onboarding-section" id="contact">
      <div className="onboarding-card">
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="step-indicator">Step {step} of 4</div>

        <div className="steps-viewport">
          <div
            className="steps-slider"
            key={step}
            ref={formRef}
            style={{
              animation: `slideIn${direction > 0 ? 'Right' : 'Left'} 0.4s cubic-bezier(0.16, 1, 0.3, 1) both`,
            }}
          >
            {step === 1 && (
              <div className="step-content">
                <h3>Let's get to know you</h3>
                <div className="field">
                  <label>Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Tonia"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className={errors.name ? 'input-error' : ''}
                  />
                  {errors.name && <span className="error-msg">{errors.name}</span>}
                </div>
                <div className="field">
                  <label>Business Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Golden Hour Studios"
                    value={form.businessName}
                    onChange={(e) => update('businessName', e.target.value)}
                    className={errors.businessName ? 'input-error' : ''}
                  />
                  {errors.businessName && <span className="error-msg">{errors.businessName}</span>}
                </div>
                <div className="field">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="tonia@example.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="step-content">
                <h3>Tell us about your business</h3>
                <div className="field">
                  <label>Business Type</label>
                  <div className="pill-group">
                    {BUSINESS_TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={`pill${form.businessType === t ? ' pill-active' : ''}`}
                        onClick={() => update('businessType', t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  {errors.businessType && <span className="error-msg">{errors.businessType}</span>}
                </div>
                <div className="field">
                  <label>Current Social Presence</label>
                  <div className="pill-group">
                    {SOCIAL_PRESENCE.map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={`pill${form.socialPresence === p ? ' pill-active' : ''}`}
                        onClick={() => update('socialPresence', p)}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  {errors.socialPresence && <span className="error-msg">{errors.socialPresence}</span>}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="step-content">
                <h3>What can we help with?</h3>
                <div className="field">
                  <label>Services Needed <span className="hint">(select all that apply)</span></label>
                  <div className="pill-group">
                    {SERVICES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`pill${form.services.includes(s) ? ' pill-active' : ''}`}
                        onClick={() => toggleService(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {errors.services && <span className="error-msg">{errors.services}</span>}
                </div>
                <div className="field">
                  <label>Monthly Budget</label>
                  <div className="pill-group">
                    {BUDGETS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        className={`pill${form.budget === b ? ' pill-active' : ''}`}
                        onClick={() => update('budget', b)}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  {errors.budget && <span className="error-msg">{errors.budget}</span>}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="step-content">
                <h3>Almost there!</h3>
                <div className="field">
                  <label>Anything else we should know?</label>
                  <textarea
                    placeholder="Dream big — tell us everything..."
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="field">
                  <label>Preferred Contact Method</label>
                  <div className="pill-group">
                    {CONTACT_METHODS.map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={`pill${form.contactMethod === m ? ' pill-active' : ''}`}
                        onClick={() => update('contactMethod', m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                  {errors.contactMethod && <span className="error-msg">{errors.contactMethod}</span>}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="step-nav">
          {step > 1 && (
            <button type="button" className="step-btn step-btn-back" onClick={back}>
              <ArrowLeft size={18} /> Back
            </button>
          )}
          <div className="step-nav-spacer" />
          {step < 4 ? (
            <button type="button" className="step-btn step-btn-next" onClick={next}>
              Next <ArrowRight size={18} />
            </button>
          ) : (
            <button type="button" className="step-btn step-btn-submit" onClick={handleSubmit}>
              <Sparkles size={18} /> Let's Make Magic ✨
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
