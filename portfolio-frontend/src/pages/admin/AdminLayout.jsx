import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import "../../assets/scss/pages/admin/AdminLayout.scss";
import "../../assets/scss/pages/admin/CustomTable.scss";
import "../../assets/scss/pages/admin/Admin.scss";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className={`admin-layout ${collapsed ? "is-collapsed" : ""}`}>
      <AdminSidebar collapsed={collapsed} showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="admin-layout__main">
        <AdminTopbar collapsed={collapsed} setCollapsed={setCollapsed} setShowSidebar={setShowSidebar}/>
        <div className="admin-layout__content">
          <Container fluid><Outlet /></Container>
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;