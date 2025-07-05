import React from "react";

import { PlanetCanvas, Text4R3F } from "@/components";

const CenterSphere = ({ text }) => {
  return (
    <div className="container-y">
      <div className="relative min-h-42.5 md:min-h-50 flex-center">
        <div className="absolute top-0 right-0 w-full h-full">
          <PlanetCanvas direction="center" />
        </div>
        <div className="max-w-2">
          <Text4R3F
            title={text.title}
            paragraph={text.paragraph}
            subtitle={text.subtitle}
            center
          />
        </div>
      </div>
    </div>
  );
};

export default CenterSphere;
