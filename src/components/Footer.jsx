import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { href: "https://www.linkedin.com/company/cognisync-tech", icon: <FaLinkedin size={24} />, label: "LinkedIn" },
  { href: "https://x.com/cognisynctech", icon: <FaTwitter size={24} />, label: "Twitter" },
  { href: "https://www.instagram.com/cognisync.tech", icon: <FaInstagram size={24} />, label: "Instagram" },
];

const Footer = ({ onJoinTeamClick }) => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const text = textRef.current;
    const container = containerRef.current;
    let currentAnimation;

    const handleMouseMove = (e) => {
      const { clientX } = e;
      const { left, width } = container.getBoundingClientRect();
      const mousePosition = clientX - left;
      const center = width / 2;
      const distance = mousePosition - center;
      const normalizedDistance = distance / (width / 2);

      if (currentAnimation) currentAnimation.kill();
      
      currentAnimation = gsap.to(text, {
        duration: 0.3,
        transform: `perspective(1000px) rotateX(0deg) rotateY(${normalizedDistance * 15}deg) scaleX(${1 + Math.abs(normalizedDistance) * 0.2})`,
        x: normalizedDistance * 50,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      if (currentAnimation) currentAnimation.kill();
      
      currentAnimation = gsap.to(text, {
        duration: 0.5,
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scaleX(1)',
        x: 0,
        ease: "power3.out"
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (currentAnimation) currentAnimation.kill();
    };
  }, []);  

  return (
    <footer className="bg-black text-white">      
      <div 
        ref={containerRef}
        className="relative h-40 overflow-hidden flex items-center justify-center bg-black py-4"
      >        
        <h2 
          ref={textRef} 
          className="special-font hero-heading text-[2rem] sm:text-[3.5rem] font-black tracking-[0.05em] cursor-default select-none text-white leading-none"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'perspective(1000px)',
            willChange: 'transform'
          }}
        >
          CO<b>G</b>NISYNC
        </h2>
      </div>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center gap-8">
        {/* Join Team Button */}
        <Button
          title="Join Team"
          containerClass="bg-black text-white border border-white/20 hover:bg-white hover:text-black transition-colors mb-4"
          onClick={onJoinTeamClick}
        />

        {/* Social Links */}
        <div className="flex justify-center gap-8">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors duration-300 hover:scale-110 transform"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Contact Info */}
        <div className="text-center">
          <p className="text-white/70">contact@cognisync.tech</p>
        </div>
        
        {/* Legal Links */}
        <div className="flex gap-4 text-sm text-white/70">
          <span>©Cogniwire LLP {new Date().getFullYear()}</span>
          <span>•</span>
          <a href="#privacy-policy" className="hover:text-white">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
