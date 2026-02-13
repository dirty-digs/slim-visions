import { useState } from 'react';
import './ActivationPopup.css';

export default function ActivationPopup({ onDismiss }) {
  const [dismissing, setDismissing] = useState(false);

  const handleClick = () => {
    setDismissing(true);
    setTimeout(() => {
      onDismiss();
    }, 600);
  };

  return (
    <div className={`activation-overlay${dismissing ? ' dismissing' : ''}`}>
      <div className="activation-content">
        <h2 className="activation-heading">
          Welcome to the future <span className="italic">Tonia</span>
        </h2>
        <button className="activation-btn" onClick={handleClick}>
          Click here to fulfill your wildest dreams
        </button>
      </div>
    </div>
  );
}
