import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import emailjs from '@emailjs/browser';
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ProductsPage = ({onClose }) => {
  const containerRef = useRef(null);
  const emailRef = useRef(null);
  const [email, setEmail] = useState("");  const [validationState, setValidationState] = useState('initial');
  const [error, setError] = useState("");
  
  useGSAP(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut"
    });

    gsap.from(".products-image", {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out"
    });

    gsap.from(".newsletter-section", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.6,
      ease: "power3.out"
    });
  }, []);

  const validateEmailInput = (value) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = re.test(value);
    setValidationState(isValid ? 'valid' : value ? 'invalid' : 'initial');
    return isValid;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
    validateEmailInput(e.target.value);
  };

  const shakeInput = () => {
    gsap.to(emailRef.current, {
      x: [-10, 10, -10, 10, 0],
      duration: 0.5,
      ease: "power2.out"
    });
  };  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address");
      setValidationState('invalid');
      shakeInput();
      return;
    }

    if (!validateEmailInput(email)) {
      setError("Please enter a valid email address");
      shakeInput();
      return;
    }

    setIsSubmitting(true);
    setError('');    try {      await emailjs.send(
        'service_pv5tv9r',
        'template_t9k69ri',
        {
          to_email: 'cognisynctech@gmail.com',
          from_email: email.toLowerCase().trim(),
          email: email.toLowerCase().trim(), // Adding this as it might be the template variable name
          message: `New newsletter subscription from ${email.toLowerCase().trim()}`,
          timestamp: new Date().toLocaleString()
        },
        'tD3Qeos8d28ZbnjlT'
      );

      // Show success animation
      gsap.to(emailRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setEmail('');
          gsap.to(emailRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.3
          });
        }
      });

      // Show a success message
      setError('Thanks for subscribing! We\'ll keep you updated.');
      setValidationState('valid');
    } catch (error) {
      console.error("Error submitting newsletter:", error);
      setError("We couldn't add your email right now. Please try again later.");
      setValidationState('invalid');
      shakeInput();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="products-overlay overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute right-8 top-8 text-white/50 hover:text-white z-50"
      >
        ✕
      </button>      

      <div className="min-h-screen w-full max-w-6xl px-4 py-12 mx-auto flex items-center">
        <div className="products-content w-full flex flex-col items-center justify-center gap-12 py-16">
          {/* Coming Soon Image */}
          <div className="products-image relative w-full max-w-3xl mx-auto overflow-hidden rounded-2xl">
            <img
              src="/img/soon.png"
              alt="Coming Soon"
              className="w-full object-cover"
              style={{
                clipPath: "polygon(0 0, 100% 0%, 95% 100%, 5% 100%)"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>

          {/* Newsletter Section */}
          <div className="newsletter-section text-center max-w-xl mx-auto w-full mt-8 sm:mt-16">
            <p className="font-general text-xs uppercase tracking-wider text-white/70 mb-3">
              Feeling Impatient?
            </p>
            <AnimatedTitle
              title="Be the <b>f</b>irst to kn<b>o</b>w"
              containerClass="mb-8 !text-white"
            />            <form 
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4"
            >
                <div ref={emailRef} className="w-full max-w-md">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={(e) => validateEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  className={`products-input w-full ${
                    validationState === 'valid' ? 'border-green-500/50' : 
                    validationState === 'invalid' ? 'border-red-500/50' : ''
                  }`}
                />
                {error && (
                  <p className={`text-sm mt-2 transition-opacity duration-300 ${
                    validationState === 'valid' ? 'text-green-400' : 'text-red-400'
                  }`}>{error}</p>
                )}
              </div>
              <div className="relative">                <Button
                  title={isSubmitting ? "Subscribing..." : "Notify Me"}
                  containerClass={`bg-white text-black transition-colors duration-300 ${
                    validationState === 'valid' ? 'hover:bg-green-50' : 'hover:bg-white/90'
                  } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
