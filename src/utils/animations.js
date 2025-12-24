// This is a utility file for custom animations that you can reuse across your project
// Place this in /src/utils/animations.js

/**
 * Creates a particle effect on the element
 * @param {HTMLElement} element - The element to attach the particle effect to
 * @param {Object} gsapInstance - GSAP instance to use
 * @param {Object} options - Configuration options
 * @returns {Function} Function to kill the animation
 */
export const createParticleEffect = (element, gsapInstance, options = {}) => {
  const {
    particleCount = 10,
    colors = ['#FFD700', '#000000', '#FFFFFF'],
    size = { min: 3, max: 8 },
    duration = { min: 1, max: 2 },
    spread = 100,
    interval = 0.3,
    opacity = { start: 1, end: 0 }
  } = options;
  
  if (!element || !gsapInstance) return () => {};
  
  // Create a container for particles
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  container.style.overflow = 'visible';
  container.style.zIndex = '1';
  
  element.style.position = 'relative';
  element.appendChild(container);
  
  // Animation timeline
  const tl = gsapInstance.timeline({ repeat: -1 });
  
  // Function to create and animate a single particle
  const createParticle = () => {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.borderRadius = '50%';
    
    // Random position near the element
    const x = Math.random() * element.offsetWidth;
    const y = Math.random() * element.offsetHeight;
    
    // Random size, color, and duration
    const particleSize = Math.random() * (size.max - size.min) + size.min;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const animDuration = Math.random() * (duration.max - duration.min) + duration.min;
    
    // Apply initial styles
    particle.style.width = `${particleSize}px`;
    particle.style.height = `${particleSize}px`;
    particle.style.backgroundColor = color;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.opacity = opacity.start;
    
    container.appendChild(particle);
    
    // Animate the particle
    gsapInstance.to(particle, {
      x: (Math.random() - 0.5) * spread,
      y: (Math.random() - 0.5) * spread,
      opacity: opacity.end,
      duration: animDuration,
      onComplete: () => {
        if (particle.parentNode === container) {
          container.removeChild(particle);
        }
      }
    });
  };
  
  // Create particles at regular intervals
  let intervalId = setInterval(createParticle, interval * 1000);
  
  // Clean up function
  return () => {
    clearInterval(intervalId);
    if (container.parentNode === element) {
      element.removeChild(container);
    }
  };
};

/**
 * Creates a smooth scroll effect to an element
 * @param {string} targetSelector - CSS selector of the target element
 * @param {Object} gsapInstance - GSAP instance to use
 * @param {Object} options - Configuration options
 */
export const smoothScrollTo = (targetSelector, gsapInstance, options = {}) => {
  const {
    duration = 1,
    ease = "power3.inOut",
    offset = 0
  } = options;
  
  const target = document.querySelector(targetSelector);
  if (!target || !gsapInstance) return;
  
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset + offset;
  
  gsapInstance.to(window, {
    duration,
    scrollTo: targetPosition,
    ease
  });
};

/**
 * Creates a reveal animation for text
 * @param {HTMLElement} element - The text element to animate
 * @param {Object} gsapInstance - GSAP instance to use
 * @param {Object} options - Configuration options
 */
export const revealText = (element, gsapInstance, options = {}) => {
  const {
    duration = 1,
    stagger = 0.05,
    ease = "power3.out",
    from = { y: "100%", opacity: 0 }
  } = options;
  
  if (!element || !gsapInstance) return;
  
  // Split text into words and characters
  const text = element.textContent;
  element.textContent = '';
  
  const words = text.split(' ');
  
  words.forEach((word, i) => {
    const wordSpan = document.createElement('span');
    wordSpan.style.display = 'inline-block';
    wordSpan.style.overflow = 'hidden';
    
    const innerSpan = document.createElement('span');
    innerSpan.style.display = 'inline-block';
    innerSpan.textContent = word + (i < words.length - 1 ? ' ' : '');
    
    wordSpan.appendChild(innerSpan);
    element.appendChild(wordSpan);
    
    gsapInstance.from(innerSpan, {
      ...from,
      duration,
      ease,
      delay: stagger * i
    });
  });
};