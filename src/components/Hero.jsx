import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useState } from "react";

import Button from "./Button";
import LoadingScreen from "./LoadingScreen";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ onProductsClick }) => {
  const [loading, setLoading] = useState(true);

  const handleVideoLoad = () => {
    setLoading(false);
  };

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">      {loading && <LoadingScreen onLoadingComplete={() => setLoading(false)} />}

      <div
        id="video-frame"
        className="relative z-10 min-h-screen w-screen overflow-hidden rounded-lg bg-blue-75 md:h-dvh"
      >
        <video
          src="videos/ycomb_1.mp4"
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={handleVideoLoad}
        />

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          re<b>A</b>lity.
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              re<b>w</b>iring
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              If you can't assess it <br /> you can't improve it.
            </p>

            <Button
              id="Be the future."
              title="Be the future."
              leftIcon={<TiLocationArrow />}
              containerClass="bg-black text-white flex-center gap-1"
              onClick={onProductsClick}
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-white">
        re<b>A</b>lity.
      </h1>
    </div>
  );
};

export default Hero;
