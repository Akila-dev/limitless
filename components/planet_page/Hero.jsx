import React from "react";

import { Button, CardsAnimationWrapper, Text4R3F } from "@/components";

const Hero = ({ text }) => {
  return (
    <div className="lg:min-h-screen w-full relative py-5">
      <div className="absolute top-0 right-0 w-[100vw] md:w-[75vw] lg:w-[65vw] h-35 md:h-[80%] lg:h-auto">
        {/* Space For Planet Sphere */}
      </div>
      {/* TEXT CONTENT */}
      <div className="left-0 w-full container grid-2-v2">
        <div className="pt-25 md:pt-3">
          <CardsAnimationWrapper className="flex mb-3" onlyOnce>
            <Button text="Back to Galaxy" href="/" back />
          </CardsAnimationWrapper>
          <Text4R3F
            title={text.title}
            paragraph={text.paragraph}
            subtitle={text.subtitle}
            animateImmediately
            onlyOnce
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
