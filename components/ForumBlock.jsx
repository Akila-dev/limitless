import React from "react";
import Image from "next/image";
import Link from "next/link";

const ForumBlock = ({ data }) => {
  return (
    <div className="w-full">
      <div className="w-full flex gap-1 justify-start flex-nowrap overflow-y-auto">
        {data.map(({ img, title, url }, i) => (
          <Link href={url} key={i} className="relative w-15 h-15">
            <Image
              src={img}
              width={400}
              height={400}
              alt={title}
              className="w-full h-full object-cover object-center"
            />
            <h3 className="absolute bottom-0 pb-[0.3em] text-center w-full">
              {title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ForumBlock;
