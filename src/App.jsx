import { Header } from "./Component/Header";
import Main from "./Component/Main";
import { useEffect, useRef } from 'react';

export default function App() {
  const interBubbleRef = useRef(null);

  useEffect(() => {
    const interBubble = interBubbleRef.current;
    if (!interBubble) return;

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;
    let animationId;

    function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      animationId = requestAnimationFrame(move);
    }
    const handleMouseMove = (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);
    move();
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="r">
      <div className="bg1"></div>
      <div className="bg2"></div>
      <div className="bg3"></div>
      <div className="bg4"></div>
      <div className="bg5"></div>
      <div className="interactive" ref={interBubbleRef}></div>
      <Header />
      <Main />
    </div>
  );
}