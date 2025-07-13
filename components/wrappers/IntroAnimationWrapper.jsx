"use client";

import { useState, useEffect } from "react";

import { useIntroStore } from "@/utils/store.js";

const IntroAnimationWrapper = ({ children }) => {
  const [showRestOfPage, setShowRestOfPage] = useState(false);
  const introFinished = useIntroStore((state) => state.introFinished);
  const setIntroStarted = useIntroStore((state) => state.setIntroStarted);

  useEffect(() => {
    setIntroStarted();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowRestOfPage(introFinished);
    }, 500);
  }, [introFinished]);

  return showRestOfPage && children;
};

export default IntroAnimationWrapper;
