import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  // Initialize animations
  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    // Card entrance animation
    const cardTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "bottom center",
        toggleActions: "play reverse play reverse", // This ensures animation works both ways
      },
    });

    cardTl.fromTo(
      card,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      }
    );

    // Parallax effect for the image
    const parallaxTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1, // Smoother scrubbing
      },
    });

    parallaxTl.fromTo(
      image,
      { y: "-10%" },
      { y: "10%", ease: "none" }
    );

    // Text animations
    const textElements = text.children;
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: text,
        start: "top bottom-=100",
        toggleActions: "play reverse play reverse", // This ensures animation works both ways
      },
    });

    textTl.fromTo(
      textElements,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      }
    );

    // Cleanup function
    return () => {
      cardTl.scrollTrigger?.kill();
      parallaxTl.scrollTrigger?.kill();
      textTl.scrollTrigger?.kill();
    };
  }, []);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateX = ((mouseY - rect.height / 2) / rect.height) * -8;
    const rotateY = ((mouseX - rect.width / 2) / rect.width) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="story"
      className="min-h-dvh w-full bg-black flex items-center justify-end py-0 px-0 overflow-hidden"
    >
      <div className="relative w-full max-w-6xl flex items-center justify-end">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-[95%] mx-auto md:w-[199%] md:ml-[1%] aspect-[1/1.5] md:aspect-[2/1] rounded-[32px] overflow-hidden shadow-2xl border border-white/10 flex items-center justify-end bg-[#181818] transform-gpu transition-transform duration-300"
          style={{ marginRight: 20, marginTop: -260, marginBottom: -230 }}
        >
          <div ref={imageRef} className="absolute inset-0 w-full h-full rounded-[32px] overflow-hidden">
            <div className="absolute inset-0 w-[102%] h-[102%] -translate-x-[1%] -translate-y-[1%]">
              <img
                src="/img/mentor.jpg"
                alt="Dr. S. Raghavan"
                className="absolute inset-0 w-full h-full object-cover object-center scale-100"
                style={{
                  imageRendering: "-webkit-optimize-contrast",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                  WebkitFontSmoothing: "subpixel-antialiased",
                }}
                loading="eager"
                decoding="sync"
              />
            </div>
          </div>
          <div 
            className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent z-10 rounded-[32px]" 
            style={{ 
              background: "linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)",
              mixBlendMode: "multiply"
            }}
          />
          <div
            ref={textRef}
            className="relative z-20 flex flex-col items-start justify-end h-full w-full px-6 md:px-12 pb-8 md:pb-12"
          >            <h2 className="special-font hero-heading text-blue-100 mb-3 drop-shadow-xl transform-gpu tracking-normal" style={{fontSize: 'clamp(2.8rem, 6vw, 5.8rem)', lineHeight: '1.1'}}>
              Mr. Pa<b>v</b>an M <br />
              S<b>r</b>ivatsa
            </h2>            <p className="font-robert-medium text-base sm:text-xl md:text-3xl text-gray-200 mb-6 tracking-wide drop-shadow transform-gpu">
              Psychologist & Psychoanalyst, <br /> 
              Founder Chakshu Foundation, <br /> 
              Mentor & MD, Cognisync
            </p>
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl max-w-xl transform-gpu">
              <p className="font-robert-regular text-base md:text-xl text-gray-100 italic drop-shadow leading-relaxed">
                "Anyatha sharanam nasthi, tvameva sharnam mama, tasmath karunya bhavena raksha raksha janardhana"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
