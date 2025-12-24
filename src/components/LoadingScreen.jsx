import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ onLoadingComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            if (onLoadingComplete) onLoadingComplete();
          }
        });
      }
    });

    // Initial state
    gsap.set(logoRef.current, {
      opacity: 0,
      scale: 0.9,
      rotation: -10
    });

    // Logo animation sequence
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(logoRef.current, {
      scale: 0.95,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

  }, [onLoadingComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div className="relative w-14 h-14 flex items-center justify-center">
        <img 
          ref={logoRef}
          src="/img/logo1.png" 
          alt="Cognisync Logo" 
          className="w-full h-full object-contain filter grayscale opacity-80"
          style={{ willChange: 'transform, opacity' }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
