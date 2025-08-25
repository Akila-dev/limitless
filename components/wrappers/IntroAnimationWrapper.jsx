"use client";

import { useState, useEffect } from "react";

import { useIntroStore, useLoadingStore } from "@/utils/store.js";

const IntroAnimationWrapper = ({ children }) => {
  const [showRestOfPage, setShowRestOfPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const introFinished = useIntroStore((state) => state.introFinished);

  const loadingInProgress = useLoadingStore((state) => state.loadingInProgress);

  useEffect(() => {
    setShowRestOfPage(introFinished);
    setIsLoading(loadingInProgress);
  }, [introFinished, loadingInProgress]);

  return isLoading ? (
    <div className="w-full h-screen flex-center top-0 left-0 fixed bg-black/50 backdrop-blur-xs z-[100]">
      <div className="bg-black border border-fg/20 rounded p-1 w-8 h-6 shadow shadow-fg/30 flex-center">
        <p className="animate-pulse">Loading...</p>
      </div>
    </div>
  ) : (
    showRestOfPage && children
  );
};

export default IntroAnimationWrapper;
