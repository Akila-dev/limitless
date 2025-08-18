import React from "react";
import Link from "next/link";
import Image from "next/image";

import logo from "@/assets/images/limitless_logo.png";

const Logo = ({ fixed }) => {
  return (
    <div
      className={
        fixed
          ? "fixed top-0 left-0 container-x py-1 flex justify-start pointer-events-none"
          : ""
      }
    >
      <Link href="/" className="pointer-events-auto">
        <Image
          src={logo}
          alt="limitless"
          width={150}
          height={150}
          className="object-contain w-6.5 md:w-7 h-auto"
        />
      </Link>
    </div>
  );
};

export default Logo;
