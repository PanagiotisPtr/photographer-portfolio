import { useState, useEffect } from 'react';

const minDesktopWidth = 1450;

/**
 * useIsDesktop
 *
 * A React hook that returns true if the user opens
 * the window in desktop mode (desktop screen dimensions)
 *
 * @returns {boolean} isDesktop whether or not we are
 *                    the window has desktop dimensions
 */
const useIsDesktop = (): boolean => {
  const [isDesktop, setDesktop] = useState<boolean>(false);

  const updateMedia = () => {
    setDesktop(window.innerWidth > minDesktopWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    
    // ensure we compute the state at least once
    updateMedia();

    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return isDesktop;
};

export default useIsDesktop;
