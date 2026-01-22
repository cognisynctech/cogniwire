import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { TiLocationArrow } from 'react-icons/ti';
import { Helmet } from 'react-helmet';
import AnimatedTitle from './AnimatedTitle';
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

// Milestones data - Real achievements
const milestones = [
  {
    id: 1,
    date: 'August 2025',
    title: 'Company Founded',
    description: 'COGNIWIRE.TECH LLP was incorporated on August 2025, registered at SVIT, Rajanukunte, Bangalore.',
    category: 'ORIGIN',
    number: '1',
    image: '/img/founding.jpg'
  },
  {
    id: 2,
    date: '2025',
    title: 'First Prototype',
    description: 'Developed our first working EEG headset prototype, demonstrating real-time neural signal acquisition and processing capabilities.',
    category: 'PRODUCT',
    number: '2',
    image: '/img/prototype.jpg'
  },
  {
    id: 3,
    date: '2025',
    title: 'Clinical Validation',
    description: 'Successfully validated the technology at Bangalore Neural Centre (BNC) and at Spandana Hospital in Rajajinagar.',
    category: 'VALIDATION',
    number: '3',
    image: '/img/validation.png'
  },
  {
    id: 4,
    date: '2025',
    title: 'IMTEX Exhibition',
    description: 'Presented the prototype at the International Machine Tools Exhibition (IMTEX) at BIEC and participated in the VTU Exhibition.',
    category: 'EXHIBITION',
    number: '4',
    image: '/img/imtex.jpg'
  },
  {
    id: 5,
    date: '2025',
    title: 'AURA Software Launch',
    description: 'Launched AURA - our Data Acquisition Software and end-to-end EEG system for psychologists and researchers.',
    category: 'PRODUCT',
    number: '5',
    image: '/img/aura.jpeg'
  },
  {
    id: 6,
    date: 'Ongoing',
    title: 'Strategic Growth',
    description: 'With scalable EEG analytics software (AURA) and planned SaaS integration, Cogniwire aims to serve both Indian clinics and international research labs.',
    category: 'FUTURE',
    number: '6',
    image: '/img/strategy.jpeg'
  }
];

// Awards and recognitions
const awards = [
  {
    title: 'Innovation Excellence',
    subtitle: 'AIT Hackathon',
    organization: 'Adichunchanagiri Institute of Technology, Chikamagaluru',
    rank: '★',
    ordinal: ''
  },
  {
    title: 'Best New Venture Concept',
    subtitle: 'Startup Saga',
    organization: 'VTU Belagavi - Commercial Viability Award',
    rank: '★',
    ordinal: ''
  },
  {
    title: 'Efficient Hardware Resource',
    subtitle: 'National Level',
    organization: 'SRMIT Delhi 2025',
    rank: '★',
    ordinal: ''
  },
  {
    title: 'Innovation Excellence',
    subtitle: 'SVIT',
    organization: 'Problem-Solving Innovation',
    rank: '★',
    ordinal: ''
  },
  {
    title: 'Innovation Excellence',
    subtitle: 'MVIT',
    organization: 'Problem-Solving Innovation',
    rank: '★',
    ordinal: ''
  },
  {
    title: 'Innovation Excellence',
    subtitle: 'SJCIT',
    organization: 'National Level Competition',
    rank: '★',
    ordinal: ''
  },
  {
    title: 'Excellence in iOS Architecture',
    subtitle: 'Kanini',
    organization: 'Swift App Development',
    rank: '★',
    ordinal: ''
  }
];

// Statistics
const stats = [
  { value: '2025', label: 'Founded', bg: '25' },
  { value: '100%', label: 'In-House Tech', bg: '%%' },
  { value: '1', label: 'Shared Vision', bg: '01' },
  { value: '2', label: 'Clinical Validations', bg: '02' }
];

// Art Gallery Timeline Component - Horizontal Scroll Pinned
const GalleryTimeline = () => {
  const sectionRef = useRef(null);
  const panelsRef = useRef([]);
  const activeIndexRef = useRef(-1);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Background image that spans all panels (shows when no panel is active)
  const bgImage = '/img/panel.png';

  useEffect(() => {
    const section = sectionRef.current;
    const panels = panelsRef.current.filter(Boolean);
    
    if (!section || panels.length === 0) return;

    // Kill any existing ScrollTriggers first
    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.trigger === section) st.kill();
    });

    const ctx = gsap.context(() => {
      // Calculate total scroll distance - each panel gets equal scroll space
      const scrollPerPanel = window.innerHeight * 0.8;
      const totalScroll = scrollPerPanel * milestones.length;
      
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${totalScroll}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const panelCount = milestones.length;
          
          // Calculate active index based on progress
          let newIndex;
          if (progress <= 0.02) {
            newIndex = -1;
          } else if (progress >= 0.98) {
            newIndex = panelCount - 1;
          } else {
            // Distribute panels evenly across the scroll
            newIndex = Math.floor(progress * panelCount);
            newIndex = Math.min(newIndex, panelCount - 1);
          }
          
          // Only update if changed (using ref to avoid re-render loops)
          if (newIndex !== activeIndexRef.current) {
            activeIndexRef.current = newIndex;
            setActiveIndex(newIndex);
          }
        }
      });
    }, section);

    return () => ctx.revert();
  }, []); // Empty dependency array - only run once

  // Handle click to select panel
  const handlePanelClick = (index) => {
    setActiveIndex(prev => prev === index ? -1 : index);
    activeIndexRef.current = activeIndexRef.current === index ? -1 : index;
  };

  return (
    <div ref={sectionRef} className="h-screen bg-black overflow-hidden relative">
      {/* Panels Container */}
      <div className="flex w-full h-[75vh] px-4 md:px-8 gap-0 items-center mt-[12.5vh]">
        {milestones.map((milestone, index) => {
          const totalPanels = milestones.length;
          // For continuous image: position each slice correctly
          // backgroundSize is 600% wide, position from 0% to 100% across 6 panels
          const bgPosition = totalPanels > 1 ? (index / (totalPanels - 1)) * 100 : 0;
          
          return (
            <div
              key={milestone.id}
              ref={el => panelsRef.current[index] = el}
              className="relative overflow-hidden cursor-pointer h-full"
              style={{
                flex: activeIndex === index ? '4 1 0%' : '1 1 0%',
                transition: 'flex 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: index === 0 ? '0.5rem 0 0 0.5rem' : index === totalPanels - 1 ? '0 0.5rem 0.5rem 0' : '0'
              }}
              onClick={() => handlePanelClick(index)}
            >
              {/* Collapsed State - Panel with shared background image slice */}
              <div 
                className="absolute inset-0"
                style={{
                  opacity: activeIndex === index ? 0 : 1,
                  pointerEvents: activeIndex === index ? 'none' : 'auto',
                  transition: 'opacity 0.5s ease'
                }}
              >
                {/* Background Image Slice - each panel shows its portion */}
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: `${totalPanels * 100}% 100%`,
                    backgroundPosition: `${bgPosition}% center`,
                  }}
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
                  {/* Title at top */}
                  <div className="text-white drop-shadow-lg">
                    <h3 className="text-xs md:text-sm font-zentry font-bold uppercase tracking-wide leading-tight text-shadow">
                      {milestone.title.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                      ))}
                    </h3>
                    <span className="text-[10px] md:text-xs font-general uppercase tracking-widest text-white/70 mt-2 block">
                      {milestone.date}
                    </span>
                  </div>
                  
                  {/* Large Number at bottom */}
                  <div className="text-[6rem] md:text-[10rem] font-zentry font-bold text-white/90 leading-none -mb-4 md:-mb-8 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                    {milestone.number}
                  </div>
                </div>
              </div>

              {/* Expanded State - Image + Content */}
              <div 
                className="absolute inset-0"
                style={{
                  opacity: activeIndex === index ? 1 : 0,
                  pointerEvents: activeIndex === index ? 'auto' : 'none',
                  transition: 'opacity 0.5s ease 0.1s'
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={milestone.image} 
                    alt={milestone.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                  {/* Category */}
                  <span className="text-xs font-general uppercase tracking-[0.2em] text-white/60 mb-2">
                    {milestone.category}
                  </span>
                  
                  {/* Number + Title */}
                  <div className="flex items-end gap-4 mb-4">
                    <span className="text-6xl md:text-8xl font-zentry font-bold text-white/20 leading-none">
                      {milestone.number}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-zentry font-bold text-white leading-tight pb-2">
                      {milestone.title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm md:text-base font-robert-regular text-white/70 leading-relaxed max-w-md">
                    {milestone.description}
                  </p>
                  
                  {/* Date */}
                  <span className="text-xs font-robert-regular text-white/40 mt-4 tracking-wide">
                    {milestone.date}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scroll Indicator - Bottom dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {milestones.map((_, index) => (
          <button
            key={index}
            onClick={() => handlePanelClick(index)}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: activeIndex === index ? '2rem' : '0.5rem',
              backgroundColor: activeIndex === index ? '#fff' : 'rgba(255,255,255,0.3)'
            }}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/40 text-xs font-general uppercase tracking-widest">
        Rewire reality.
      </div>

      {/* Progress indicator */}
      <div className="absolute top-6 right-6 text-white/50 text-sm font-robert-regular">
        {activeIndex >= 0 ? `${activeIndex + 1} / ${milestones.length}` : ''}
      </div>
    </div>
  );
};

// Award Card Component - Large Typography Style
const AwardCard = ({ award, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 60, scale: 0.9 },
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
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-sm hover:border-white/30 transition-all duration-500"
    >
      {/* Large Background Star */}
      <div className="absolute -bottom-4 -right-2 text-[8rem] md:text-[10rem] font-zentry font-bold text-white/[0.03] leading-none select-none pointer-events-none">
        ★
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8">
        {/* Award Title Display */}
        <div className="mb-4">
          <span className="text-2xl md:text-3xl font-zentry font-bold text-white tracking-tight leading-tight">
            {award.title}
          </span>
        </div>

        {/* Event/Competition Name */}
        <h4 className="text-lg md:text-xl font-robert-medium text-white/80 mb-1 tracking-wide">
          {award.subtitle}
        </h4>

        {/* Organization */}
        <p className="text-xs md:text-sm text-white/40 font-robert-regular tracking-wide leading-relaxed">
          {award.organization}
        </p>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
    </div>
  );
};

// Main Achievements Page Component
const AchievementsPage = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const timelineRef = useRef(null);
  const awardsRef = useRef(null);

  // Hero animation
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.achievements-hero-text',
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );
  }, []);

  // Stats counter animation
  useEffect(() => {
    if (statsRef.current) {
      gsap.fromTo('.stat-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }
  }, []);

  // Smooth scroll setup
  useEffect(() => {
    // Enable smooth scrolling for the page
    gsap.config({
      nullTargetWarn: false,
    });

    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Helmet>
        <title>Our Journey & Achievements | Cogniwire Neurotech Startup</title>
        <meta 
          name="description" 
          content="Discover Cogniwire's journey from founding to clinical validation. See our milestones, awards, and achievements in EEG technology and neuroscience innovation." 
        />
        <meta 
          name="keywords" 
          content="Cogniwire Achievements, Neurotech Startup India, EEG Innovation, BCI Awards, Bangalore Startup Success, Hackathon Winners" 
        />
        <meta property="og:title" content="Our Journey & Achievements | Cogniwire" />
        <meta property="og:description" content="From idea to clinical validation - follow our journey as we democratize access to neurotechnology." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cogniwire.tech/achievements" />
        <link rel="canonical" href="https://cogniwire.tech/achievements" />
      </Helmet>
      
      {/* Navigation - Logo */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 hover:scale-110 transition-transform"
      >
        <img src="/img/logo1.png" alt="Cogniwire" className="w-10 h-10" />
      </button>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20 flex flex-col items-center">
          <h1 className="achievements-hero-text special-font hero-heading text-white mb-4">
            Our J<b>o</b>urney
          </h1>
          <h2 className="achievements-hero-text special-font text-3xl md:text-5xl text-blue-75 font-zentry mb-8">
            Milestones & Achievements
          </h2>
          <p className="achievements-hero-text font-robert-regular text-xl text-white/60 max-w-2xl mx-auto text-center tracking-wide">
            From idea to validation — follow our journey as we democratize access to 
            neurotechnology and transform mental healthcare.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-24 px-4 md:px-10 border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card p-6 md:p-8 text-center rounded-2xl border border-white/10 bg-white/[0.02] relative overflow-hidden group hover:border-white/20 transition-all duration-500"
              >
                {/* Background large number - positioned behind */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                  <span className="text-[8rem] md:text-[12rem] font-zentry font-bold text-white/[0.04] leading-none">
                    {stat.bg}
                  </span>
                </div>
                <div className="relative z-10">
                  <div className="text-3xl md:text-5xl font-zentry font-bold text-white mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-xs font-general uppercase text-white/40 tracking-[0.15em]">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section - Art Gallery Style */}
      <section ref={timelineRef} className="relative">
        {/* Section Header */}
        <div className="text-center py-20 px-4">
          <AnimatedTitle
            title="Our Tim<b>e</b>line"
            containerClass="!text-5xl md:!text-7xl mb-6"
          />
          <p className="font-robert-regular text-lg text-white/50 max-w-2xl mx-auto tracking-wide">
            Our journey are like neurons, sparkling and unfolding new connections.
          </p>
        </div>

        {/* Gallery Timeline */}
        <GalleryTimeline />
      </section>

      {/* Awards Section - With Background Video */}
      <section ref={awardsRef} className="relative py-32 px-4 md:px-10 overflow-hidden">
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

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedTitle
              title="Achievem<b>e</b>nts"
              containerClass="!text-5xl md:!text-7xl mb-6"
            />
            
            <p className="font-robert-regular text-lg text-white/60 max-w-2xl mx-auto tracking-wide">
              Recognized at multiple national and state-level competitions for our 
              innovative EEG solutions and neurotechnology breakthroughs.
            </p>
          </div>

          {/* Awards Grid - First row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
            {awards.slice(0, 4).map((award, index) => (
              <AwardCard key={index} award={award} index={index} />
            ))}
          </div>
          
          {/* Awards Grid - Second row centered */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {awards.slice(4).map((award, index) => (
              <AwardCard key={index + 4} award={award} index={index + 4} />
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-32 px-4 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedTitle
            title="What's N<b>e</b>xt"
            containerClass="!text-5xl md:!text-7xl mb-12"
          />

          <div className="space-y-8">
            <p className="font-robert-medium text-xl text-white/90 leading-relaxed tracking-wide">
              With scalable EEG analytics software (AURA) and planned SaaS integration, 
              Cogniwire aims to serve both Indian clinics and international research labs within three years.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { title: 'B2B Sales', desc: 'Clinics, hospitals, and research institutions across India', num: '01' },
                { title: 'SaaS Platform', desc: 'AURA software for scalable EEG analytics and cognitive assessment', num: '02' },
                { title: 'Global Reach', desc: 'Expanding to international research labs and healthcare facilities', num: '03' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-white/10 bg-white/5 relative overflow-hidden group hover:border-white/30 transition-all duration-300"
                >
                  {/* Background Number */}
                  <div className="absolute -bottom-4 -right-2 text-[6rem] font-zentry font-bold text-white/[0.03] leading-none select-none pointer-events-none">
                    {item.num}
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-lg font-robert-medium text-white mb-2 tracking-wide">{item.title}</h4>
                    <p className="text-white/50 text-sm font-robert-regular tracking-wide leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 md:px-10 bg-gradient-to-t from-white/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="special-font hero-heading text-4xl md:text-6xl text-white mb-6">
            Be part of <br /> our st<b>o</b>ry
          </h2>
          <p className="font-robert-regular text-xl text-white/60 mb-12 max-w-2xl mx-auto tracking-wide">
            Join us in writing the next chapters of neural technology history.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              title="Join Our Team"
              containerClass="bg-white text-black"
              rightIcon={<TiLocationArrow />}
              onClick={() => navigate('/careers')}
            />
            <Button
              title="Contact Us"
              containerClass="bg-black text-white border border-white/20 hover:bg-white hover:text-black transition-colors"
              onClick={() => navigate('/#contact')}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AchievementsPage;
