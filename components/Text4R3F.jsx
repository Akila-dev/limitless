import React from "react";

import { Button } from "@/components";

const Text4R3F = ({ title, subtitle, paragraph, buttons, center }) => {
  return (
    <div
      className={`space-y-0.5 lg:space-y-0.25 ${center ? "!text-center" : ""}`}
    >
      {title && <h1>{title}</h1>}
      {subtitle && <p className="p-lg">{subtitle}</p>}
      {paragraph && <p>{paragraph}</p>}
      {buttons && (
        <div className="flex items-center justify-start flex-wrap pt-2.25">
          {buttons.map((button, i) => (
            <Button key={i} text={button.text} href={button.url} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Text4R3F;
