import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Skills from "./pages/admin/Skills";
import Projects from "./pages/admin/Projects";
import Experience from "./pages/admin/Experience";
import Certifications from "./pages/admin/Certifications";
import Achievements from "./pages/admin/Achievements";
import Messages from "./pages/admin/Messages";
import Settings from "./pages/admin/Settings";
import AllExperiences from "./components/AllExperiences";
import AllProjects from "./components/AllProjects";
import { useEffect } from "react";
import { setLoaderHandlers } from "./app/loaderHandler";
import { useLoader } from "./hooks/useLoader";

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
      <ToastContainer position="top-right" autoClose={2000} theme="dark" hideProgressBar={false} newestOnTop closeOnClick />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experiences" element={<AllExperiences />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="skills" element={<Skills />} />
          <Route path="projects" element={<Projects />} />
          <Route path="experience" element={<Experience />} />
          <Route path="certificates" element={<Certifications />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;