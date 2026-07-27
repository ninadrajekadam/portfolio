import { useState, useCallback } from "react";
import { LoaderContext } from "./LoaderContext";

export const LoaderProvider = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const showLoader = useCallback(() => {
    setLoadingCount((prev) => prev + 1);
  }, []);

  const hideLoader = useCallback(() => {
    setLoadingCount((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  return (
    <LoaderContext.Provider value={{ loadingCount, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};