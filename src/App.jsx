import { useState } from 'react';
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

function App() {
  const [showProducts, setShowProducts] = useState(false);
  const [showJoinTeam, setShowJoinTeam] = useState(false);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar onProductsClick={() => setShowProducts(true)} />
      <Hero onProductsClick={() => setShowProducts(true)} />
      <About />
      <Features />
      <ZentrySection />
      <TeamSection />
      <Story />
      <AboutUs />
      <Contact />
      <Footer onJoinTeamClick={() => setShowJoinTeam(true)} />
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
    </main>
  );
}

export default App;
