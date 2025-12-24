// File: src/components/ZentrySection.jsx

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './ZentrySection.css';

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_DATA = [
  {
    number: '01',
    title: 'Vision',
    description:
      "Cognisync envisions a future where your mind connects effortlessly with technology and enhancing how we live, work, and evolve through cognitive-driven systems.",
  },
  {
    number: '02',
    title: 'Mission',
    description: 'We’re on a mission to make brain-computer interaction a natural extension of the mind by boosting focus, preventing cognitive fatigue, and transforming how we engage with technology.',
  },
  {
    number: '03',
    title: 'Ethos',
    description: 'We don’t just build BCI systems. We build cognitive tools that learn, adapt, and evolve with you by merging neuroscience, design, and intelligent software into one seamless experience.',
  },
  // Blank lines for seamless transition
  { number: '', title: '', description: '' },
];

export default function ZentrySection() {
  const sectionRef = useRef(null);
  const whiteBgRef = useRef(null);
  const contentRefs = useRef([]);
  const timelineFillRef = useRef(null);
  const timelineWrapRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const heartRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useGSAP(() => {
    // Split text animation
    const title = sectionRef.current.querySelector('.hero-heading');
    if (title && !title.querySelector('span')) {
      const words = title.innerHTML.split(/(<br\/>|<b>.*?<\/b>)/).filter(Boolean);
      title.innerHTML = '';
      words.forEach((word) => {
        if (word.includes('<br/>')) {
          title.innerHTML += word;
        } else {
          const span = document.createElement('span');
          span.innerHTML = word;
          span.style.display = 'inline-block';
          span.style.willChange = 'transform, opacity';
          title.appendChild(span);
        }
      });
    }

    if (!hasAnimated) {
      gsap.fromTo(
        '.hero-heading > span',
        { y: 100, opacity: 0, rotation: 5 },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 40%',
            once: true,
            onComplete: () => setHasAnimated(true),
          },
          overwrite: 'auto',
          lazy: true,
        }
      );
    }

    // 🛠️ FIXED TIMELINE FILL ISSUE
    gsap.fromTo(
      timelineFillRef.current,
      { scaleY: 0, transformOrigin: 'top' },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        overwrite: 'auto',
        lazy: true,
      }
    );

    gsap.from('.timeline-number', {
      opacity: 0,
      scale: 0.5,
      duration: 0.7,
      stagger: 0.15,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'top 40%',
        once: true,
      },
      overwrite: 'auto',
      lazy: true,
    });

    let heartTl;
    const heartPixels = gsap.utils.toArray('.heart-pixel.filled');

    ScrollTrigger.create({
      trigger: heartRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        if (!heartTl) {
          heartTl = gsap.timeline({
            repeat: -1,
            yoyo: true,
            defaults: { ease: 'sine.inOut' }
          });

          heartTl
            .to(heartPixels, {
              scale: 1.1,
              duration: 0.4,
              stagger: {
                from: 'center',
                amount: 0.2,
                ease: 'sine.inOut'
              }
            })
            .to(heartPixels, {
              scale: 1,
              duration: 0.3,
            });
        }
      },
      onLeave: () => {
        if (heartTl) {
          heartTl.kill();
          heartTl = null;
          gsap.to(heartPixels, {
            scale: 1,
            duration: 0.2,
            overwrite: true,
            ease: 'power1.out'
          });
        }
      },
      onEnterBack: () => {
        if (!heartTl) {
          heartTl = gsap.timeline({
            repeat: -1,
            yoyo: true,
            defaults: { ease: 'sine.inOut' }
          });

          heartTl
            .to(heartPixels, {
              scale: 1.1,
              duration: 0.4,
              stagger: {
                from: 'center',
                amount: 0.2,
                ease: 'sine.inOut'
              }
            })
            .to(heartPixels, {
              scale: 1,
              duration: 0.3,
            });
        }
      },
      onLeaveBack: () => {
        if (heartTl) {
          heartTl.kill();
          heartTl = null;
          gsap.to(heartPixels, {
            scale: 1,
            duration: 0.2,
            overwrite: true,
            ease: 'power1.out'
          });
        }
      },
    });    // Create smooth background transition with proper section handling
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center+=25%',
      end: 'bottom center-=25%',
      onEnter: () => {
        gsap.to(whiteBgRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.inOut',
        });
        // Change body background to ensure smooth transition
        document.body.style.background = '#000';
      },
      onLeave: () => {
        gsap.to(whiteBgRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            // Ensure body background is black after transition
            document.body.style.background = '#000';
          }
        });
      },
      onEnterBack: () => {
        gsap.to(whiteBgRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.inOut',
        });
      },
      onLeaveBack: () => {
        gsap.to(whiteBgRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            // Ensure body background is black after transition
            document.body.style.background = '#000';
          }
        });
      }
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center+=100',
      end: 'bottom center-=100',
      onUpdate: (self) => {
        const progress = self.progress;
        const newIndex = Math.min(
          Math.floor(progress * TIMELINE_DATA.length),
          TIMELINE_DATA.length - 1
        );

        if (newIndex !== activeIndex) {
          if (contentRefs.current[activeIndex]) {
            gsap.to(contentRefs.current[activeIndex], {
              opacity: 0.2,
              y: 20,
              duration: 0.4,
              ease: 'power2.inOut',
              overwrite: true
            });
          }

          if (contentRefs.current[newIndex]) {
            gsap.fromTo(
              contentRefs.current[newIndex],
              {
                opacity: 0.2,
                y: -20
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: true
              }
            );
          }

          setActiveIndex(newIndex);
        }
      },
    });
  }, { scope: sectionRef, dependencies: [activeIndex, hasAnimated] });

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div 
        ref={whiteBgRef} 
        className="fixed inset-0 bg-white z-40 pointer-events-none mix-blend-normal" 
        style={{ opacity: 0 }} 
      />
      <section ref={sectionRef} className="relative z-50 min-h-screen">
        <div className="flex flex-col w-full">
          <div className="px-8 lg:px-16 mb-32">
            <h2 className="special-font hero-heading text-black">
              OUR P<b>R</b>OMISE
            </h2>
          </div>

          <div className="flex flex-row justify-between items-start px-8 lg:px-16 max-w-[1800px] mx-auto w-full">
            <div className="flex gap-12">
              {/* Timeline */}
              <div ref={timelineWrapRef} className="relative w-[2px] bg-gray-200 overflow-hidden">
                <div ref={timelineFillRef} className="absolute top-0 left-0 w-full bg-black origin-top" style={{ height: '100%', transform: 'scaleY(0)' }} />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-24">
                {TIMELINE_DATA.map((item, i) => (
                  <div
                    key={item.number}
                    ref={el => contentRefs.current[i] = el}
                    className={`transition-all duration-500 ${activeIndex === i ? 'opacity-100' : 'opacity-20'}`}
                  >
                    <div className="text-xs tracking-wider text-gray-400 mb-2">
                      {item.number}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 uppercase text-black">
                      {item.title}
                    </h3>
                    {activeIndex === i && (
                      <p className="max-w-md text-base leading-relaxed text-gray-800">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Heart Shape */}
            <div ref={heartRef} className="w-[400px] h-[400px] flex items-center justify-center">
              <div className="pixel-heart">
                {[
                  0, 0, 1, 1, 1, 0, 0,
                  0, 1, 1, 1, 1, 1, 0,
                  1, 1, 1, 1, 1, 1, 1,
                  1, 1, 1, 1, 1, 1, 1,
                  0, 1, 1, 1, 1, 1, 0,
                  0, 0, 1, 1, 1, 0, 0,
                  0, 0, 0, 1, 0, 0, 0
                ].map((filled, i) => (
                  <div key={i} className={`heart-pixel ${filled ? 'filled' : ''}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
