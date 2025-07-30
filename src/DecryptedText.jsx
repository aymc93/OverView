import { useEffect, useState } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=<>?';

function randomChar() {
  return characters[Math.floor(Math.random() * characters.length)];
}

export default function DecryptedText({ text, duration = 3500 }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.floor(duration / 50);
    const interval = setInterval(() => {
      let output = '';
      for (let i = 0; i < text.length; i++) {
        if (i < (frame / totalFrames) * text.length) {
          output += text[i];
        } else {
          output += randomChar();
        }
      }
      setDisplayed(output);
      frame++;
      if (frame > totalFrames) {
        clearInterval(interval);
        setDisplayed(text);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text, duration]);

  return (
    <div className="decrypted-text">
      {displayed}
    </div>
  );
}
