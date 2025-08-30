"use client";

import { useState, useEffect } from "react";

import { useIntroStore, useLoadingStore } from "@/utils/store.js";
import { PiSpinnerGap } from "react-icons/pi";

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
    <div className="w-full h-screen top-0 left-0 fixed flex items-end pointer-events-none">
      <div className="p-1.25">
        <div className="animate-spin p p-0.5 flex-center bg-bg border-[0.13em] border-fg/20 rounded-full">
          <PiSpinnerGap className="!size-1.5 animate-puls text-white" />
        </div>
      </div>
    </div>
  ) : (
    showRestOfPage && children
  );
};

export default IntroAnimationWrapper;
