import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    if (window.innerWidth < 640) return; // Disable animation on mobile
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px] text-white">
          Welcome to Cognisync
        </p>

        <AnimatedTitle
          title="Th<b>e</b> future is, <b>N</b>eura<b>l</b>"
          containerClass="mt-5 !text-white text-center"
        />

        <div className="about-subtext text-white">
          <p className="text-white font-medium">The Future starts here, with you</p>
          <p className="text-gray-400">
            At Cognisync, we're redefining brain-computer interaction to elevate
            human cognition and unlock peak mental performance.
          </p>
        </div>
      </div>      <div className="relative h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent sm:hidden z-10"></div>
          <img
            src="img/about1.png"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
