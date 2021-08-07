import React, { useRef, useEffect } from "react";

const useIsCurrent = () => {
  const isCurrent = useRef(false);

  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  return isCurrent;
};

export default useIsCurrent;
