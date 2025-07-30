import { useEffect, useState } from 'react';
import './App.css';
import DecryptedText from './DecryptedText';


function App() {
  const [zooming, setZooming] = useState(false);
  const [entered, setEntered] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);


  useEffect(() => {
    const wrapper = document.querySelector('.magnet-wrapper');
    const button = document.querySelector('.magnet-btn');
    const strength = 30;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrame;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.1);
      currentY = lerp(currentY, targetY, 0.1);
      button.style.transform = `translate(${currentX}px, ${currentY}px)`;
      animationFrame = requestAnimationFrame(animate);
    };

    const moveMagnet = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const radius = rect.width / 2;

      if (distance < radius) {
        targetX = (dx / radius) * strength;
        targetY = (dy / radius) * strength;
      } else {
        targetX = 0;
        targetY = 0;
      }
    };

    const reset = () => {
      targetX = 0;
      targetY = 0;
    };

    wrapper.addEventListener('mousemove', moveMagnet);
    wrapper.addEventListener('mouseleave', reset);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      wrapper.removeEventListener('mousemove', moveMagnet);
      wrapper.removeEventListener('mouseleave', reset);
      cancelAnimationFrame(animationFrame);
    };
  }, []);


  useEffect(() => {
    const cards = document.querySelectorAll('.bento-card');

    cards.forEach(card => {
      const text = card.querySelector('.bento-text');

      const onMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Rotation de la carte
        const rotateX = ((y - centerY) / centerY) * 8;
        const rotateY = ((x - centerX) / centerX) * -8;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;



        // Effet sur le texte : léger scale + glow décalé
        if (text) {
          const offsetX = ((x - centerX) / centerX) * 5;  // décalage max 5px
          const offsetY = ((y - centerY) / centerY) * 5;
          text.style.transform = `scale(1.05) translate(${offsetX}px, ${offsetY}px)`;
        }
      };

      const onMouseLeave = () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        card.style.background = '#1a1a1a';
        if (text) {
          text.style.transform = 'scale(1) translate(0, 0)';
          text.style.textShadow = 'none';
        }
      };

      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);

      return () => {
        card.removeEventListener('mousemove', onMouseMove);
        card.removeEventListener('mouseleave', onMouseLeave);
      };
    });
  }, []);




  const handleClick = () => {
  setFadeOut(true);
  setZooming(true);
  setShowWelcome(true); // Affiche "Welcome"
  
  // Masque le texte "Welcome" après 1.2s, puis affiche le site après 2s
  setTimeout(() => setShowWelcome(false), 4200);
  setTimeout(() => setEntered(true), 5000);
};


  return (
    <div className="App">
      {!entered && (
        <>
          <div className={`orb ${zooming ? 'zoom-out' : ''}`}></div>
          <div className={`intro ${fadeOut ? 'fade-out' : ''}`}>
            <div className="magnet-wrapper">
              <button className="magnet-btn" onClick={handleClick}>Entrer</button>
            </div>
          </div>
        </>
      )}

      {showWelcome && (
        <DecryptedText text="WELCOME BACK AYMERIC" duration={1500} />
      )}

      <div className={`main-content ${entered ? 'visible' : ''}`}>
        <div className="bento-grid">
          <div className="bento-card" style={{ gridColumn: "1 / 2", gridRow: "1 / 2" }}>
            <div className="bento-title">PROJET</div>
          </div>
          <div className="bento-card" style={{ gridColumn: "2 / 3", gridRow: "1 / 2" }}>
            <div className="bento-title">PHOTO</div>
          </div>
          <div className="bento-card large" style={{ gridColumn: "3 / 5", gridRow: "1 / 2" }}>
            <div className="bento-title">TIME / DATE</div>
          </div>
          <div className="bento-card" style={{ gridColumn: "3 / 4", gridRow: "2 / 3" }}>
            <div className="bento-title">ENT</div>
          </div>
          <div className="bento-card" style={{ gridColumn: "4 / 5", gridRow: "2 / 3" }}>
            <div className="bento-title">PORTFOLIO</div>
          </div>
          <div className="bento-card large" style={{ gridColumn: "1 / 3", gridRow: "2 / 4" }}>
            <div className="bento-title">IA</div>
          </div>
          <div className="bento-card" style={{ gridColumn: "3 / 4", gridRow: "3 / 4" }}>
            <div className="bento-title">WHATSAPP</div>
          </div>
          <div className="bento-card" style={{ gridColumn: "4 / 5", gridRow: "3 / 4" }}>
            <div className="bento-title">GITHUB</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
