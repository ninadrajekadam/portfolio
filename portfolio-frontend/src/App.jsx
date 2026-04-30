import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Skills from "./pages/admin/Skills";
import Projects from "./pages/admin/Projects";
import Experience from "./pages/admin/Experience";
import PageNotFound from "./pages/PageNotFound";

import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="dark" hideProgressBar={false} newestOnTop closeOnClick />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="skills" element={<Skills />} />
          <Route path="projects" element={<Projects />} />
          <Route path="experience" element={<Experience />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;