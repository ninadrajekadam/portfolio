import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useLoader } from "./hooks/useLoader";
import { setLoaderHandlers } from "./app/loaderHandler";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import AllExperiences from "./components/AllExperiences";
import AllProjects from "./components/AllProjects";


const App = () => {
  const { showLoader, hideLoader, loadingCount } = useLoader();
  const location = useLocation();

  useEffect(() => {
    setLoaderHandlers(showLoader, hideLoader);
  }, [showLoader, hideLoader]);

  useEffect(() => {
    showLoader();

    const timer = setTimeout(() => {
      hideLoader();
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname, showLoader, hideLoader]);

  return (
    <>
      { loadingCount > 0 && (<div className="global-loader"><div className="spinner"></div></div>) }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experiences" element={<AllExperiences />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
export default App;