import React from "react";

import { Text4R3F, BulletList } from "@/components";

const BulletPointSection = ({ text, bullet_list }) => {
  return (
    <div className="container">
      <div className="grid-2-v2">
        <div>
          <Text4R3F
            title={text.title}
            paragraph={text.paragraph}
            subtitle={text.subtitle}
          />
        </div>
        <div>
          <BulletList data={bullet_list} />
        </div>
      </div>
    </div>
  );
};

export default BulletPointSection;
