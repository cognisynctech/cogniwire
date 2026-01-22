import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { TiLocationArrow } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AnimatedTitle from './AnimatedTitle';
import Button from './Button';
import { submitCareerApplication } from '../utils/supabase';

gsap.registerPlugin(ScrollTrigger);

// Available positions - only Hardware Intern and Software Developer
const positions = [
  {
    id: 'hardware-intern',
    title: 'Hardware Intern',
    department: 'Engineering',
    type: 'Internship',
    location: 'Onsite, Bangalore',
    description: 'Learn and contribute to next-generation neural interface hardware systems.',
    image: '/img/hardware.jpeg',
    questions: [
      { id: 'education', label: 'Current education & field of study?', type: 'textarea' },
      { id: 'exp_pcb', label: 'Experience with PCB design tools (Altium, KiCad)?', type: 'textarea' },
      { id: 'exp_embedded', label: 'Experience with embedded systems (ARM, ESP32)?', type: 'textarea' },
      { id: 'portfolio', label: 'Link to your hardware portfolio/projects', type: 'text' }
    ]
  },
  {
    id: 'software-developer',
    title: 'Software Developer',
    department: 'Engineering',
    type: 'Internship',
    location: 'Onsite, Bangalore',
    description: 'Build robust software systems for neural signal processing and applications.',
    image: '/img/software.jpeg',
    questions: [
      { id: 'exp_lang', label: 'Programming languages & frameworks experience?', type: 'textarea' },
      { id: 'exp_backend', label: 'Backend/Frontend experience?', type: 'textarea' },
      { id: 'exp_projects', label: 'Describe a challenging project you worked on', type: 'textarea' },
      { id: 'github', label: 'GitHub profile URL', type: 'text' }
    ]
  }
];

// Gallery images for the about section
const galleryImages = [
  '/img/cult1.jpeg',
  '/img/cult2.jpeg',
  '/img/cult3.jpeg',
  '/img/cult4.jpeg',
  '/img/cult5.jpeg',
  '/img/cult6.jpeg'
];

// Position Card Component
const PositionCard = ({ position, onApply, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onApply(position)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm transition-all duration-500 hover:border-white/30 hover:bg-black/70">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={position.image}
            alt={position.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Department Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-general uppercase bg-white/10 text-white rounded-full border border-white/20">
              {position.department}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-xl font-zentry font-bold text-white mb-2 group-hover:text-white transition-colors">
            {position.title}
          </h3>
          <p className="text-white/60 text-sm font-robert-regular mb-4 line-clamp-2">
            {position.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2 py-1 text-xs font-general text-white/70 bg-white/5 rounded-md">
              {position.type}
            </span>
            <span className="px-2 py-1 text-xs font-general text-white/70 bg-white/5 rounded-md">
              {position.location}
            </span>
          </div>

          {/* Apply Button */}
          <div className="flex items-center gap-2 text-white font-general text-sm uppercase group-hover:gap-4 transition-all">
            <span>Apply Now</span>
            <TiLocationArrow className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 70%)'
          }}
        />
      </div>
    </div>
  );
};

// Application Modal Component
const ApplicationModal = ({ position, onClose, onSubmit }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: '',
    answers: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    // Animate modal in
    gsap.fromTo(modalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 }
    );

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      opacity: 0, y: 30, scale: 0.95, duration: 0.3, ease: 'power2.in'
    });
    gsap.to(modalRef.current, {
      opacity: 0, duration: 0.3, delay: 0.1, ease: 'power2.in',
      onComplete: onClose
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAnswerChange = (questionId, value) => {
    setFormData(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const applicationData = {
      position_id: position.id,
      position_title: position.title,
      ...formData,
      submitted_at: new Date().toISOString()
    };

    const result = await submitCareerApplication(applicationData);

    if (result.success) {
      setSubmitStatus('success');
      setTimeout(() => {
        handleClose();
      }, 2000);
    } else {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => e.target === modalRef.current && handleClose()}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-black border border-white/10 rounded-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-white/10 p-6">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-2xl font-zentry font-bold text-white mb-1">Apply for {position.title}</h2>
          <p className="text-white/50 text-sm font-robert-regular">{position.department} - {position.location}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-robert-medium text-white/80">Personal Information</h3>
            
            <div>
              <label className="block text-sm font-robert-medium text-white/70 mb-2">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white focus:border-white transition-colors outline-none"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-robert-medium text-white/70 mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white focus:border-white transition-colors outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-robert-medium text-white/70 mb-2">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white focus:border-white transition-colors outline-none"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-sm font-robert-medium text-white/70 mb-2">
                Resume/CV Link
              </label>
              <input
                type="url"
                name="resume"
                value={formData.resume}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white focus:border-white transition-colors outline-none"
                placeholder="https://drive.google.com/..."
              />
            </div>
          </div>

          {/* Position-specific Questions */}
          <div className="space-y-4">
            <h3 className="text-lg font-robert-medium text-white/80">Role-specific Questions</h3>
            
            {position.questions.map((question) => (
              <div key={question.id}>
                <label className="block text-sm font-robert-medium text-white/70 mb-2">
                  {question.label}
                </label>
                {question.type === 'textarea' ? (
                  <textarea
                    value={formData.answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    rows={3}
                    className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white focus:border-white transition-colors outline-none resize-none"
                    placeholder="Your answer..."
                  />
                ) : (
                  <input
                    type="text"
                    value={formData.answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white focus:border-white transition-colors outline-none"
                    placeholder="Your answer..."
                  />
                )}
              </div>
            ))}
          </div>

          {/* Submit Status */}
          {submitStatus && (
            <div className={`p-4 rounded-lg text-center ${
              submitStatus === 'success' 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-red-500/20 text-red-400'
            }`}>
              {submitStatus === 'success' 
                ? 'Application submitted successfully! We will be in touch soon.' 
                : 'Something went wrong. Please try again.'}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-white text-black font-general uppercase text-sm rounded-lg transition-all hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Application
                <TiLocationArrow />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// Main Careers Page Component
const CareersPage = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const galleryRef = useRef(null);
  const positionsRef = useRef(null);
  const cultureRef = useRef(null);
  const [selectedPosition, setSelectedPosition] = useState(null);

  // Hero section animations
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.careers-hero-text',
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );

    tl.fromTo('.careers-hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    );
  }, { scope: heroRef });

  // Gallery scroll animation
  useEffect(() => {
    if (galleryRef.current) {
      gsap.to('.gallery-track', {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Helmet>
        <title>Careers at Cogniwire | Join Our Neurotech Team in Bangalore</title>
        <meta 
          name="description" 
          content="Join Cogniwire's innovative team in Bangalore. We're hiring Hardware Interns and Software Developers to build next-generation EEG and BCI technology. Apply now!" 
        />
        <meta 
          name="keywords" 
          content="Neurotech Jobs, EEG Jobs India, BCI Careers, Hardware Intern Bangalore, Software Developer Neuroscience, Cogniwire Careers, Startup Jobs India" 
        />
        <meta property="og:title" content="Careers at Cogniwire | Join Our Neurotech Team" />
        <meta property="og:description" content="Build the future of neurotechnology. We're hiring passionate engineers and developers in Bangalore." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cogniwire.tech/careers" />
        <link rel="canonical" href="https://cogniwire.tech/careers" />
      </Helmet>
      
      {/* Navigation - Logo */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 hover:scale-110 transition-transform"
      >
        <img src="/img/logo1.png" alt="Cogniwire" className="w-10 h-10" />
      </button>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <video
            src="videos/ycomb_1.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <h1 className="careers-hero-text special-font hero-heading text-blue-75 mb-6">
            J<b>o</b>in the
          </h1>
          <h1 className="careers-hero-text special-font hero-heading text-white">
            Re<b>v</b>olution
          </h1>
          
          <p className="careers-hero-subtitle font-robert-regular text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mt-8 text-center">
            Be part of a team that's redefining the boundaries between human cognition and technology.
          </p>

          <div className="careers-hero-subtitle mt-12 flex justify-center">
            <Button
              title="Explore Positions"
              containerClass="bg-white text-black"
              rightIcon={<TiLocationArrow />}
              onClick={() => {
                positionsRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        </div>
      </section>

      {/* About Section - Who We Are */}
      <section ref={aboutRef} className="py-32 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <AnimatedTitle
            title="Who <b>w</b>e are"
            containerClass="!text-5xl md:!text-7xl mb-16"
          />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="font-robert-medium text-xl text-white/90 leading-relaxed">
                COGNIWIRE.TECH LLP is a pioneering neurotechnology startup dedicated to advancing 
                cognitive science through accessible, cost-effective EEG solutions.
              </p>
              <p className="font-robert-regular text-lg text-white/60 leading-relaxed">
                Incorporated on August 2025, and Bangalore. Our mission is to harness cutting-edge EEG technology to decode 
                brain functions and behaviors.
              </p>
              <p className="font-robert-regular text-lg text-white/60 leading-relaxed">
                We deliver neurotech solutions that serve psychologists and researchers, driving 
                transformative advancements in neuroscience at the lowest cost possible.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '2025', label: 'Founded', bg: '25' },
                { number: 'BLR', label: 'Bangalore, India', bg: 'IN' },
                { number: '4', label: 'Integrated Solutions', bg: '04' },
                { number: '1', label: 'Shared Vision', bg: '01' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="p-6 md:p-8 border border-white/10 rounded-2xl bg-white/[0.02] text-center hover:border-white/20 transition-all duration-500 relative overflow-hidden group"
                >
                  {/* Background typography effect */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <span className="text-[8rem] md:text-[10rem] font-zentry font-bold text-white/[0.04] leading-none">
                      {stat.bg}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <div className="text-3xl md:text-5xl font-zentry font-bold text-white mb-2 tracking-tight">
                      {stat.number}
                    </div>
                    <div className="text-[10px] md:text-xs font-general uppercase text-white/40 tracking-[0.15em]">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Life at Cogniwire with Background Video */}
      <section ref={galleryRef} className="py-20 overflow-hidden relative">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            src="videos/bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>

        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-4 mb-12">
            <h2 className="special-font hero-heading text-3xl md:text-5xl text-white">
              Life at C<b>o</b>gniwire
            </h2>
          </div>

          {/* Scrolling Gallery */}
          <div className="relative">
            <div className="gallery-track flex gap-4" style={{ width: '200%' }}>
              {[...galleryImages, ...galleryImages].map((img, index) => (
                <div
                  key={index}
                  className="w-72 h-48 md:w-96 md:h-64 rounded-xl overflow-hidden flex-shrink-0"
                >
                  <img
                    src={img}
                    alt={`Life at Cogniwire ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section ref={positionsRef} className="py-32 px-4 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <AnimatedTitle
            title="Open P<b>o</b>sitions"
            containerClass="!text-5xl md:!text-7xl mb-8 text-center"
          />
          
          <p className="font-robert-regular text-lg text-white/60 max-w-2xl mb-16 text-center">
            Ready to make an impact? Explore our open roles and find where you fit in our mission 
            to revolutionize human-computer interaction.
          </p>

          {/* Positions Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
            {positions.map((position, index) => (
              <PositionCard
                key={position.id}
                position={position}
                index={index}
                onApply={setSelectedPosition}
              />
            ))}
          </div>

          {/* No positions message */}
          <div className="mt-16 text-center flex flex-col items-center">
            <p className="text-white/50 font-robert-regular">
              Don't see a role that fits? We're always looking for exceptional talent.
            </p>
            <Button
              title="Send Open Application"
              containerClass="mt-6 bg-white/10 text-white border border-white/20 hover:bg-white hover:text-black"
              onClick={() => setSelectedPosition({
                id: 'open-application',
                title: 'Open Application',
                department: 'General',
                location: 'Onsite, Bangalore',
                description: 'Tell us about yourself and how you can contribute to Cogniwire.',
                questions: [
                  { id: 'role', label: 'What role are you interested in?', type: 'text' },
                  { id: 'skills', label: 'What are your key skills and experiences?', type: 'textarea' },
                  { id: 'why', label: 'Why do you want to join Cogniwire?', type: 'textarea' },
                  { id: 'portfolio', label: 'Link to your portfolio/work', type: 'text' }
                ]
              })}
            />
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section ref={cultureRef} className="py-32 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <AnimatedTitle
            title="Our C<b>u</b>lture"
            containerClass="!text-5xl md:!text-7xl mb-16"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Build, Not Slide',
                description: 'We don\'t do 50-page slide decks. We build prototypes. If it works, we ship it. If it fails, we fix it. Real code and real hardware over theory, always.'
              },
              {
                title: 'No Solo Queues',
                description: 'Nobody codes in a silo. We swarm on problems together. Hardware helps software, and software helps hardware. Your voice matters more than your title.'
              },
              {
                title: 'Learn by Breaking',
                description: 'We respect broken PCBs and failed builds because that means you\'re pushing the limits. We don\'t punish failure; we punish stagnation.'
              },
              {
                title: 'Velocity > Perfection',
                description: 'We deploy on Day 1. Speed is our only advantage against the giants. We iterate daily, not quarterly. Done is better than perfect.'
              },
              {
                title: 'Code for Humans',
                description: 'We aren\'t building widgets; we\'re decoding the brain. Every line of code you write helps a real researcher or patient understand their mind better.'
              },
              {
                title: 'You Build It, You Own It',
                description: 'No hand-holding. You get a feature, you own it from design to deployment. You are the CEO of your module.'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="p-8 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all group"
              >
                <h3 className="text-xl font-zentry font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/60 font-robert-regular leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Manual CTA Section */}
      <section className="py-32 px-4 md:px-10 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="special-font hero-heading text-4xl md:text-6xl text-white mb-6">
            Ready to sh<b>a</b>pe <br /> the f<b>u</b>ture?
          </h2>
          <p className="font-robert-regular text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Join us in building technology that bridges the gap between human thought and digital action.
          </p>
          <Button
            title="View All Positions"
            containerClass="bg-white text-black"
            rightIcon={<TiLocationArrow />}
            onClick={() => {
              positionsRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      </section>

      {/* Application Modal */}
      {selectedPosition && (
        <ApplicationModal
          position={selectedPosition}
          onClose={() => setSelectedPosition(null)}
          onSubmit={() => {}}
        />
      )}
    </div>
  );
};

export default CareersPage;
