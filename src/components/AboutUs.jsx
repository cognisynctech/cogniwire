import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Main timeline with faster animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(headingRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    // Faster content animations with quick stagger
    const paragraphs = contentRef.current.querySelectorAll("p");
    tl.fromTo(paragraphs, 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.4, 
        stagger: 0.1, 
        ease: "power1.out" 
      },
      "-=0.3" // Start slightly before heading animation ends
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section
      ref={sectionRef}
      id="about-us"
      className="min-h-dvh w-full bg-black flex flex-col items-center justify-center py-32 px-4 md:px-10 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Main heading */}
        <h2 
          ref={headingRef}
          className="special-font hero-heading text-white mb-16"
          style={{fontSize: 'clamp(3.5rem, 8vw, 6rem)', lineHeight: '0.9'}}
        >
          Better <b>s</b>cience<br />
          for better <b>f</b>ocus
        </h2>

        {/* Description */}
        <div ref={contentRef} className="space-y-12 max-w-3xl mx-auto">
          <p className="font-robert-medium text-xl md:text-2xl text-white/90 leading-relaxed">
            At Cognisync, we're pioneering the future of brain-computer interfaces, 
            transforming how humans interact with technology through groundbreaking 
            neural innovations.
          </p>
          
          <div className="space-y-8">
            <p className="font-robert-regular text-lg text-white/70 leading-relaxed">
              Our journey began with a vision to enhance human cognitive capabilities through 
              AI-powered brain-computer interfaces. Today, we're at the forefront of BCI 
              technology, developing systems that are both powerful and accessible.
            </p>
            
            <p className="font-robert-regular text-lg text-white/70 leading-relaxed">
              From signal processing breakthroughs to revolutionary hardware design, 
              we're committed to pushing the boundaries of what's possible in neural 
              technology, making it more intuitive, efficient, and seamlessly integrated 
              into daily life.
            </p>
          </div>          <div className="w-16 h-[1px] bg-white/20 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
