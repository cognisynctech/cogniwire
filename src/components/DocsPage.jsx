import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// Documentation content structure - NO EMOJIS, NO ICONS
const docsContent = {
  'getting-started': {
    title: 'Getting Started',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: `
          <h3>Welcome to Cogniwire</h3>
          <p>Cogniwire is pioneering the future of brain-computer interfaces (BCI), creating seamless connections between human cognition and digital systems.</p>
          <p>Our technology stack combines cutting-edge hardware with advanced AI algorithms to process neural signals in real-time, enabling unprecedented levels of human-machine interaction.</p>
          
          <h4>What We Offer</h4>
          <ul>
            <li><strong>reHave EEG Headset</strong> - Custom-designed neural interface hardware</li>
            <li><strong>Cogniwire SDK</strong> - Developer tools for building BCI applications</li>
            <li><strong>Neural Analytics Platform</strong> - Real-time cognitive assessment tools</li>
          </ul>
        `
      },
      {
        id: 'quick-start',
        title: 'Quick Start Guide',
        content: `
          <h3>Quick Start Guide</h3>
          <p>Get up and running with Cogniwire in minutes.</p>
          
          <h4>Step 1: Hardware Setup</h4>
          <p>Unbox your reHave headset and ensure all components are present:</p>
          <ul>
            <li>reHave EEG Headset</li>
            <li>USB-C Charging Cable</li>
            <li>Electrode Gel (10ml)</li>
            <li>Quick Start Guide</li>
          </ul>
          
          <h4>Step 2: Software Installation</h4>
          <pre><code>npm install @cogniwire/sdk
# or
yarn add @cogniwire/sdk</code></pre>
          
          <h4>Step 3: Initialize Connection</h4>
          <pre><code>import { CogniwireClient } from '@cogniwire/sdk';

const client = new CogniwireClient({
  apiKey: 'your-api-key',
  deviceId: 'your-device-id'
});

await client.connect();</code></pre>
        `
      }
    ]
  },
  'hardware': {
    title: 'Hardware',
    sections: [
      {
        id: 'rehave-overview',
        title: 'reHave Overview',
        content: `
          <h3>reHave EEG Headset</h3>
          <p>The reHave is our flagship neural interface device, designed for both research and consumer applications.</p>
          
          <h4>Technical Specifications</h4>
          <table>
            <tr><td><strong>Channels</strong></td><td>8 active electrodes</td></tr>
            <tr><td><strong>Sampling Rate</strong></td><td>256 Hz - 1024 Hz</td></tr>
            <tr><td><strong>Resolution</strong></td><td>24-bit ADC</td></tr>
            <tr><td><strong>Connectivity</strong></td><td>Bluetooth 5.0, USB-C</td></tr>
            <tr><td><strong>Battery Life</strong></td><td>8+ hours continuous use</td></tr>
          </table>
          
          <h4>Electrode Placement</h4>
          <p>The reHave follows the international 10-20 system for electrode placement, ensuring compatibility with standard EEG protocols.</p>
        `
      },
      {
        id: 'hardware-setup',
        title: 'Hardware Setup',
        content: `
          <h3>Setting Up Your Hardware</h3>
          
          <h4>Charging</h4>
          <p>Before first use, charge your reHave for at least 2 hours using the provided USB-C cable. The LED indicator will turn green when fully charged.</p>
          
          <h4>Electrode Preparation</h4>
          <ol>
            <li>Apply a small amount of electrode gel to each electrode</li>
            <li>Position the headset on your head, aligning the front electrode with your forehead</li>
            <li>Adjust the fit using the adjustable band</li>
            <li>Check impedance levels in the app (should be below 10k Ohm)</li>
          </ol>
          
          <h4>Pairing</h4>
          <p>Press and hold the power button for 3 seconds to enter pairing mode. The LED will blink blue. Open the AURA app and select your device from the available devices list.</p>
        `
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting',
        content: `
          <h3>Hardware Troubleshooting</h3>
          
          <h4>Common Issues</h4>
          
          <p><strong>Device not turning on</strong></p>
          <ul>
            <li>Ensure the device is charged</li>
            <li>Try a different USB-C cable</li>
            <li>Perform a hard reset (hold power for 10 seconds)</li>
          </ul>
          
          <p><strong>Poor signal quality</strong></p>
          <ul>
            <li>Check electrode gel application</li>
            <li>Ensure proper headset fit</li>
            <li>Move away from electronic interference sources</li>
            <li>Clean electrodes with alcohol wipes</li>
          </ul>
          
          <p><strong>Bluetooth connection issues</strong></p>
          <ul>
            <li>Ensure Bluetooth is enabled on your device</li>
            <li>Try unpairing and re-pairing</li>
            <li>Update device firmware</li>
          </ul>
        `
      }
    ]
  },
  'software': {
    title: 'Software',
    sections: [
      {
        id: 'sdk-overview',
        title: 'SDK Overview',
        content: `
          <h3>Cogniwire SDK</h3>
          <p>The Cogniwire SDK provides a comprehensive set of tools for building BCI-powered applications.</p>
          
          <h4>Supported Platforms</h4>
          <ul>
            <li>JavaScript/TypeScript (Node.js and Browser)</li>
            <li>Python 3.8+</li>
            <li>React Native</li>
            <li>Unity (C#)</li>
          </ul>
          
          <h4>Core Features</h4>
          <ul>
            <li>Real-time signal streaming</li>
            <li>Pre-built signal processing pipelines</li>
            <li>Machine learning model integration</li>
            <li>Event detection (blinks, focus, stress)</li>
            <li>Session recording and playback</li>
          </ul>
        `
      },
      {
        id: 'api-reference',
        title: 'API Reference',
        content: `
          <h3>API Reference</h3>
          
          <h4>CogniwireClient</h4>
          <p>The main client class for interacting with Cogniwire devices.</p>
          
          <pre><code>const client = new CogniwireClient(options: ClientOptions)

interface ClientOptions {
  apiKey: string;
  deviceId?: string;
  samplingRate?: number;
  onData?: (data: SignalData) => void;
  onEvent?: (event: NeuralEvent) => void;
}</code></pre>
          
          <h4>Methods</h4>
          
          <p><code>connect(): Promise&lt;void&gt;</code></p>
          <p>Establishes connection to the device.</p>
          
          <p><code>disconnect(): Promise&lt;void&gt;</code></p>
          <p>Closes the device connection.</p>
          
          <p><code>startStream(): void</code></p>
          <p>Begins streaming neural data.</p>
          
          <p><code>stopStream(): void</code></p>
          <p>Stops the data stream.</p>
        `
      },
      {
        id: 'data-processing',
        title: 'Data Processing',
        content: `
          <h3>Signal Processing</h3>
          <p>The SDK includes built-in signal processing utilities for common BCI applications.</p>
          
          <h4>Filters</h4>
          <pre><code>import { filters } from '@cogniwire/sdk';

// Apply bandpass filter (8-30 Hz for alpha/beta)
const filtered = filters.bandpass(rawData, {
  lowCut: 8,
  highCut: 30,
  samplingRate: 256
});

// Remove powerline noise (50/60 Hz)
const clean = filters.notch(rawData, {
  frequency: 50,
  samplingRate: 256
});</code></pre>
          
          <h4>Feature Extraction</h4>
          <pre><code>import { features } from '@cogniwire/sdk';

// Extract band powers
const bandPowers = features.bandPower(data, {
  bands: ['delta', 'theta', 'alpha', 'beta', 'gamma']
});

// Calculate focus index
const focusScore = features.focusIndex(data);</code></pre>
        `
      }
    ]
  },
  'use-cases': {
    title: 'Use Cases',
    sections: [
      {
        id: 'cognitive-assessment',
        title: 'Cognitive Assessment',
        content: `
          <h3>Cognitive Assessment</h3>
          <p>Use Cogniwire for real-time cognitive state monitoring and assessment.</p>
          
          <h4>Applications</h4>
          <ul>
            <li><strong>Attention Monitoring</strong> - Track focus levels during tasks</li>
            <li><strong>Cognitive Load</strong> - Measure mental workload</li>
            <li><strong>Stress Detection</strong> - Identify stress patterns</li>
            <li><strong>Fatigue Assessment</strong> - Monitor drowsiness levels</li>
          </ul>
          
          <h4>Example Implementation</h4>
          <pre><code>client.on('metrics', (metrics) => {
  console.log('Focus:', metrics.focus);
  console.log('Stress:', metrics.stress);
  console.log('Cognitive Load:', metrics.cognitiveLoad);
});</code></pre>
        `
      },
      {
        id: 'neurofeedback',
        title: 'Neurofeedback',
        content: `
          <h3>Neurofeedback Training</h3>
          <p>Build neurofeedback applications for cognitive enhancement and therapy.</p>
          
          <h4>Training Protocols</h4>
          <ul>
            <li><strong>Alpha Training</strong> - Relaxation and stress reduction</li>
            <li><strong>Beta Training</strong> - Focus and concentration enhancement</li>
            <li><strong>SMR Training</strong> - Motor skill improvement</li>
            <li><strong>Theta/Alpha Training</strong> - Creativity and insight</li>
          </ul>
          
          <p>Our SDK provides pre-built neurofeedback protocols that can be customized for your specific application needs.</p>
        `
      },
      {
        id: 'research',
        title: 'Research Applications',
        content: `
          <h3>Research Applications</h3>
          <p>Cogniwire hardware and software are designed to meet research-grade standards.</p>
          
          <h4>Research Features</h4>
          <ul>
            <li>Raw data export (EDF, CSV)</li>
            <li>Synchronized event markers</li>
            <li>Integration with PsychoPy, E-Prime</li>
            <li>MATLAB/Python analysis tools</li>
          </ul>
          
          <h4>Citing Cogniwire</h4>
          <p>If you use Cogniwire in your research, please cite:</p>
          <pre><code>Cogniwire.Tech LLP. (2025). Cogniwire BCI Platform. 
https://cogniwire.tech</code></pre>
        `
      }
    ]
  },
  'specifications': {
    title: 'Specifications',
    sections: [
      {
        id: 'technical-specs',
        title: 'Technical Specifications',
        content: `
          <h3>Complete Technical Specifications</h3>
          
          <h4>Hardware Specifications</h4>
          <table>
            <tr><td><strong>EEG Channels</strong></td><td>8 active + 1 reference</td></tr>
            <tr><td><strong>Sampling Rates</strong></td><td>256, 512, 1024 Hz</td></tr>
            <tr><td><strong>ADC Resolution</strong></td><td>24-bit</td></tr>
            <tr><td><strong>Input Range</strong></td><td>+/-400 mV</td></tr>
            <tr><td><strong>Input Impedance</strong></td><td>>1 GOhm</td></tr>
            <tr><td><strong>CMRR</strong></td><td>>110 dB</td></tr>
            <tr><td><strong>Noise</strong></td><td><0.5 uVrms</td></tr>
          </table>
          
          <h4>Connectivity</h4>
          <table>
            <tr><td><strong>Wireless</strong></td><td>Bluetooth 5.0 LE</td></tr>
            <tr><td><strong>Wired</strong></td><td>USB-C 3.1</td></tr>
            <tr><td><strong>Range</strong></td><td>Up to 10m (Bluetooth)</td></tr>
            <tr><td><strong>Latency</strong></td><td><20ms (Bluetooth), <5ms (USB)</td></tr>
          </table>
        `
      },
      {
        id: 'certifications',
        title: 'Certifications',
        content: `
          <h3>Certifications and Compliance</h3>
          
          <h4>Regulatory Compliance (in-progress)</h4>
          <ul>
            <li>CE Marked (European Union)</li>
            <li>FCC Certified (United States)</li>
            <li>RoHS Compliant</li>
            <li>ISO 13485 (Medical Devices QMS)</li>
          </ul>
          
          <h4>Safety Standards (in-progress)</h4>
          <ul>
            <li>IEC 60601-1 (Medical Electrical Equipment)</li>
            <li>IEC 62133 (Battery Safety)</li>
          </ul>
          
          <p><strong>Note:</strong> The reHave device is intended for research and wellness applications. It is not a medical diagnostic device.</p>
        `
      }
    ]
  }
};

// Splash Screen Component
const DocsSplashScreen = ({ onComplete }) => {
  const splashRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(splashRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete
        });
      }
    });

    tl.fromTo(logoRef.current,
      { scale: 0.5, opacity: 0, rotateY: -90 },
      { scale: 1, opacity: 1, rotateY: 0, duration: 1, ease: 'power3.out' }
    );

    tl.fromTo(textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );

    tl.fromTo(progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: 'power1.inOut' },
      '-=0.3'
    );

  }, [onComplete]);

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 opacity-20">
        <video
          src="videos/ycomb_1.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 text-center">
        <h1
          ref={logoRef}
          className="special-font hero-heading text-4xl md:text-6xl text-white mb-4"
          style={{ transformStyle: 'preserve-3d' }}
        >
          CO<b>G</b>NIWIRE
        </h1>
        
        <p ref={textRef} className="text-white/70 font-robert-regular text-lg mb-8">
          Documentation Portal
        </p>

        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
          <div
            ref={progressRef}
            className="h-full bg-white origin-left"
            style={{ transformOrigin: 'left' }}
          />
        </div>
      </div>
    </div>
  );
};

// Main Documentation Page Component
const DocsPage = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [activeSection, setActiveSection] = useState('introduction');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (contentRef.current && !showSplash) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeSection, showSplash]);

  useEffect(() => {
    if (sidebarRef.current && !showSplash) {
      gsap.fromTo(sidebarRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [showSplash]);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    const firstSection = docsContent[categoryId].sections[0];
    setActiveSection(firstSection.id);
  };

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  const getCurrentContent = () => {
    const category = docsContent[activeCategory];
    const section = category.sections.find(s => s.id === activeSection);
    return section;
  };

  // Get all sections flattened for navigation
  const getAllSections = () => {
    const sections = [];
    Object.entries(docsContent).forEach(([categoryId, category]) => {
      category.sections.forEach(section => {
        sections.push({ ...section, categoryId });
      });
    });
    return sections;
  };

  const navigatePrevious = () => {
    const allSections = getAllSections();
    const currentIndex = allSections.findIndex(s => s.id === activeSection);
    if (currentIndex > 0) {
      const prevSection = allSections[currentIndex - 1];
      setActiveCategory(prevSection.categoryId);
      setActiveSection(prevSection.id);
    }
  };

  const navigateNext = () => {
    const allSections = getAllSections();
    const currentIndex = allSections.findIndex(s => s.id === activeSection);
    if (currentIndex < allSections.length - 1) {
      const nextSection = allSections[currentIndex + 1];
      setActiveCategory(nextSection.categoryId);
      setActiveSection(nextSection.id);
    }
  };

  const hasPrevious = () => {
    const allSections = getAllSections();
    const currentIndex = allSections.findIndex(s => s.id === activeSection);
    return currentIndex > 0;
  };

  const hasNext = () => {
    const allSections = getAllSections();
    const currentIndex = allSections.findIndex(s => s.id === activeSection);
    return currentIndex < allSections.length - 1;
  };

  if (showSplash) {
    return <DocsSplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between px-4 md:px-6 h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="hidden sm:inline font-general text-xs uppercase">Back</span>
            </button>

            <div className="h-8 w-px bg-white/10 hidden sm:block" />

            <h1 className="special-font text-xl font-bold">
              CO<b>G</b>NIWIRE <span className="text-white/70 font-robert-regular text-sm ml-2">Docs</span>
            </h1>
          </div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search docs..."
                className="w-64 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs text-white/40 bg-white/5 rounded">
                Ctrl+K
              </kbd>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        <aside
          ref={sidebarRef}
          className={`fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-black/95 md:bg-transparent border-r border-white/10 overflow-y-auto transition-transform duration-300 z-30 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="p-6 space-y-6">
            {Object.entries(docsContent).map(([categoryId, category]) => (
              <div key={categoryId}>
                <button
                  onClick={() => handleCategoryClick(categoryId)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeCategory === categoryId
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="font-robert-medium text-sm">{category.title}</span>
                </button>

                {activeCategory === categoryId && (
                  <div className="mt-2 ml-6 space-y-1">
                    {category.sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => handleSectionClick(section.id)}
                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                          activeSection === section.id
                            ? 'text-white bg-white/5'
                            : 'text-white/50 hover:text-white/80'
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 min-h-[calc(100vh-4rem)] p-6 md:p-12 max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
            <span>Docs</span>
            <span>/</span>
            <span>{docsContent[activeCategory].title}</span>
            <span>/</span>
            <span className="text-white">{getCurrentContent()?.title}</span>
          </div>

          <div
            ref={contentRef}
            className="docs-content prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: getCurrentContent()?.content || '' }}
          />

          <div className="flex items-center justify-between mt-16 pt-8 border-t border-white/10">
            <button 
              onClick={navigatePrevious}
              disabled={!hasPrevious()}
              className={`flex items-center gap-2 transition-colors ${hasPrevious() ? 'text-white/50 hover:text-white cursor-pointer' : 'text-white/20 cursor-not-allowed'}`}
            >
              <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="font-robert-regular text-sm">Previous</span>
            </button>

            <button 
              onClick={navigateNext}
              disabled={!hasNext()}
              className={`flex items-center gap-2 transition-colors ${hasNext() ? 'text-white/50 hover:text-white cursor-pointer' : 'text-white/20 cursor-not-allowed'}`}
            >
              <span className="font-robert-regular text-sm">Next</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </main>

        <aside className="hidden xl:block w-64 p-6 sticky top-16 h-[calc(100vh-4rem)]">
          <h4 className="font-robert-medium text-sm text-white/50 uppercase mb-4">On this page</h4>
          <div className="space-y-2">
            {docsContent[activeCategory].sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`block w-full text-left text-sm transition-colors ${
                  activeSection === section.id 
                    ? 'text-white' 
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </aside>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DocsPage;
