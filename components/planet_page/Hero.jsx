import React from "react";

import { PlanetCanvas, Text4R3F } from "@/components";

const Hero = ({ text }) => {
  return (
    <div className="lg:min-h-50 w-full relative">
      <div className="absolute top-0 right-0 w-[100vw] md:w-[75vw] lg:w-[65vw] h-35 md:h-[80%] lg:h-full">
        <PlanetCanvas direction="right" />
      </div>
      {/* TEXT CONTENT */}
      <div className="left-0 w-full container grid-2">
        <div className="pt-31 md:pt-[40vmin]">
          <Text4R3F
            title={text.title}
            paragraph={text.paragraph}
            subtitle={text.subtitle}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
