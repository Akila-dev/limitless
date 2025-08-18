"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Text4R3F,
  CardsAnimationWrapper,
  BulletList,
  Logo,
  NewsLetterSubscribe,
  Button,
} from "@/components";

const FooterSection = () => {
  const navLinks = [
    { text: "Home", href: "/" },
    { text: "Limitless", href: "/limitless" },
    { text: "Blog", href: "/blog" },
  ];

  return (
    <div className="bg-light container-x py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-1 lg:items-start">
        <CardsAnimationWrapper className="lg:col-span-2" onlyOnce>
          <Logo />
        </CardsAnimationWrapper>
        <CardsAnimationWrapper
          className="lg:col-span-3 grid grid-cols-2 gap-1"
          onlyOnce
        >
          {[...navLinks, ...navLinks].map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="xs uppercase !p-0 !m-0"
            >
              {link.text}
            </Link>
          ))}
        </CardsAnimationWrapper>
        <CardsAnimationWrapper
          className="lg:col-span-3 flex-center flex-col !gap-2 !items-start lg:!items-center"
          onlyOnce
        >
          <p className="lg:text-center xs">
            LOREM IPSUM DOLOR SIT AMET, CONSECTETUR.
          </p>
          <Button text="Call To Action" href="/" />
        </CardsAnimationWrapper>
        <div className="lg:col-span-4 lg:pl-1">
          <NewsLetterSubscribe />
        </div>
      </div>
    </div>
  );
};

const BlogFooter = () => {
  const pathname = usePathname();
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(window.location.origin + pathname);
    }
  }, [pathname]);

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
  const instagramShareUrl = `https://www.instagram.com/yourusername/`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;

  const shareData = [
    {
      title: "LINKEDIN",
      url: linkedInShareUrl,
    },
    {
      title: "INSTAGRAM",
      url: instagramShareUrl,
    },
    {
      title: "FACEBOOK",
      url: facebookShareUrl,
    },
  ];

  return (
    <div className="space-y-3 md:space-y-4">
      {/* Follow on Social Media */}
      <div className="container-x">
        <div className="grid-2-v2">
          <div className="lg:pr-4">
            <Text4R3F
              title={`Follow us on Social Media`}
              titleClassName={`!font-base h2 uppercase pb-0.25`}
              paragraph={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.`}
            />
          </div>
          <div>
            <BulletList data={shareData} tightSpacing />
          </div>
        </div>
      </div>
      <div>
        <FooterSection />
      </div>
    </div>
  );
};

export default BlogFooter;
