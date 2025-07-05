import React from "react";

import { PlanetCanvas, Text4R3F } from "@/components";

const Footer = ({ text, buttons }) => {
  return (
    <div className="md:min-h-60 lg:min-h-50 w-full relative flex-center md:mb-6 lg:mb-10">
      <div className="absolute top-0 lg:-top-5 left-0 w-[100vw] md:w-[50vw] h-35 md:h-60">
        <PlanetCanvas direction="left" />
      </div>
      {/* TEXT CONTENT */}
      <div className="container grid-2-v2 mt-31 md:mt-0 md:h-full w-full">
        <div></div>
        <div className="h-full">
          <Text4R3F
            title={text.title}
            paragraph={text.paragraph}
            subtitle={text.subtitle}
            buttons={buttons}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
