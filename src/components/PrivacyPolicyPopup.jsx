import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const PrivacyPolicyPopup = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const [activeTab, setActiveTab] = useState('privacy');

  useEffect(() => {
    if (isOpen) {
      // Animate in
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.fromTo(contentRef.current,
        { y: '100%', opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 }
      );
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      y: '100%',
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      ease: 'power2.in',
      onComplete: onClose
    });
  };

  if (!isOpen) return null;

  const privacyContent = {
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'January 2026',
      content: [
        {
          heading: 'Information We Collect',
          text: `We collect information you provide directly, including name, email address, and any other information you choose to provide when using our services or applying for positions. We also collect device information, usage data, and neural signal data when you use our BCI products (with explicit consent).`
        },
        {
          heading: 'How We Use Your Information',
          text: `Your information is used to provide and improve our services, process job applications, communicate with you, ensure device functionality, and conduct research (with consent). Neural data is anonymized and used only for improving our algorithms and services.`
        },
        {
          heading: 'Data Security',
          text: `We implement industry-standard security measures including encryption, secure servers, and access controls. Neural data receives additional protection with end-to-end encryption and strict access limitations.`
        },
        {
          heading: 'Data Sharing',
          text: `We do not sell your personal information. We may share data with service providers who assist our operations, comply with legal obligations, or with your explicit consent for research purposes.`
        },
        {
          heading: 'Your Rights',
          text: `You have the right to access, correct, delete your data, withdraw consent, and data portability. Contact us at support@cogniwire.tech to exercise these rights.`
        },
        {
          heading: 'Cookies & Tracking',
          text: `We use essential cookies for site functionality and analytics cookies to improve our services. You can control cookie preferences through your browser settings.`
        }
      ]
    },
    terms: {
      title: 'Terms of Service',
      lastUpdated: 'January 2026',
      content: [
        {
          heading: 'Acceptance of Terms',
          text: `By accessing or using Cogniwire services, you agree to be bound by these terms. If you disagree with any part, you may not access our services.`
        },
        {
          heading: 'Use of Services',
          text: `Our services are intended for lawful purposes only. You agree not to misuse our services, attempt to gain unauthorized access, or use our technology for harmful purposes.`
        },
        {
          heading: 'Intellectual Property',
          text: `All content, software, and technology provided by Cogniwire is protected by intellectual property laws. You may not copy, modify, or distribute our proprietary materials without permission.`
        },
        {
          heading: 'Device Usage',
          text: `Cogniwire devices are intended for research and wellness purposes only. They are not medical devices and should not be used for medical diagnosis or treatment.`
        },
        {
          heading: 'Limitation of Liability',
          text: `Cogniwire is not liable for indirect, incidental, or consequential damages arising from use of our services or products, to the extent permitted by law.`
        },
        {
          heading: 'Changes to Terms',
          text: `We may update these terms periodically. Continued use of our services after changes constitutes acceptance of the new terms.`
        }
      ]
    }
  };

  const currentContent = privacyContent[activeTab];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm opacity-0"
      onClick={(e) => e.target === overlayRef.current && handleClose()}
    >
      <div
        ref={contentRef}
        className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-black border-t border-white/10 rounded-t-3xl overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-zentry font-bold text-white">Legal</h2>
            <button
              onClick={handleClose}
              className="p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4">
            {Object.keys(privacyContent).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-general uppercase transition-all ${
                  activeTab === tab
                    ? 'bg-white text-black'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {privacyContent[tab].title}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-120px)] px-6 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h3 className="text-2xl font-robert-medium text-white mb-2">{currentContent.title}</h3>
              <p className="text-white/40 text-sm">Last updated: {currentContent.lastUpdated}</p>
            </div>

            <div className="space-y-8">
              {currentContent.content.map((section, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="text-lg font-robert-medium text-white/90">{section.heading}</h4>
                  <p className="text-white/60 font-robert-regular leading-relaxed">{section.text}</p>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/10">
              <h4 className="text-lg font-robert-medium text-white mb-2">Questions?</h4>
              <p className="text-white/60 text-sm mb-4">
                If you have any questions about our privacy practices or terms, please contact us.
              </p>
              <a
                href="mailto:support@cogniwire.tech"
                className="inline-flex items-center gap-2 text-white hover:text-white/70 transition-colors text-sm"
              >
                support@cognisync.tech
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Drag Handle */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full" />
      </div>
    </div>
  );
};

export default PrivacyPolicyPopup;
