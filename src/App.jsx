import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ZentrySection from './components/ZentrySection';
import TeamSection from './components/TeamSection';
import ProductsPage from './components/ProductsPage';
import JoinTeamForm from './components/JoinTeamForm';
import CareersPage from './components/CareersPage';
import DocsPage from './components/DocsPage';
import AchievementsPage from './components/AchievementsPage';
import PrivacyPolicyPopup from './components/PrivacyPolicyPopup';

// Home Page Component
const HomePage = ({ onProductsClick, onJoinTeamClick, onPrivacyClick }) => {
  return (
    <>
      <Helmet>
        {/* Title */}
        <title>Cogniwire | Low Cost EEG & BCI Neurotech Startup in India</title>
        
        {/* Description */}
        <meta 
          name="description" 
          content="Cogniwire develops clinical-grade, low cost EEG headsets and psychological instruments. A Bangalore-based AI startup innovating Brain Computer Interfaces (BCI) for neuroscience and human-machine interface applications." 
        />
        
        {/* Keywords */}
        <meta 
          name="keywords" 
          content="EEG, BCI, Neurotech, Psychological Instruments, Neuroscience, Brain Computer Interface, India Based Startup, Low Cost EEG, Psychology, Bangalore Based Startup, Human Machine Interface, AI, Cogniwire, Cognisync, Psychologists Near Me, AURA Software" 
        />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="Cogniwire | Affordable AI-Powered EEG Solutions" />
        <meta property="og:description" content="Revolutionizing neuroscience with accessible Brain Computer Interface technology. Proudly made in India for the world." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cogniwire.tech" />
        <meta property="og:image" content="https://cogniwire.tech/img/logo1.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cogniwire | Low Cost EEG & BCI Neurotech" />
        <meta name="twitter:description" content="Clinical-grade EEG headsets and psychological instruments from Bangalore, India." />
        
        {/* Geographic Tags */}
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bengaluru" />
        <meta name="geo.position" content="12.9716;77.5946" />
        <meta name="ICBM" content="12.9716, 77.5946" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://cogniwire.tech" />
      </Helmet>
      
      <Hero onProductsClick={onProductsClick} />
      <About />
      <Features />
      <ZentrySection />
      <TeamSection />
      <Story />
      <AboutUs />
      <Contact />
      <Footer onJoinTeamClick={onJoinTeamClick} onPrivacyClick={onPrivacyClick} />
    </>
  );
};

function App() {
  const [showProducts, setShowProducts] = useState(false);
  const [showJoinTeam, setShowJoinTeam] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <Router>
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <Routes>
          <Route path="/" element={
            <>
              <NavBar onProductsClick={() => setShowProducts(true)} />
              <HomePage 
                onProductsClick={() => setShowProducts(true)} 
                onJoinTeamClick={() => setShowJoinTeam(true)}
                onPrivacyClick={() => setShowPrivacy(true)}
              />
            </>
          } />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
        </Routes>
        
        {showProducts && <ProductsPage onClose={() => setShowProducts(false)} />}
        {showJoinTeam && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 text-center">
              <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={() => setShowJoinTeam(false)} />
              <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform">
                <button
                  onClick={() => setShowJoinTeam(false)}
                  className="absolute right-8 top-8 text-white/70 hover:text-white z-50"
                >
                  ✕
                </button>
                <JoinTeamForm />
              </div>
            </div>
          </div>
        )}
        <PrivacyPolicyPopup isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      </main>
    </Router>
  );
}

export default App;

