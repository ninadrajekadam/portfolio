import { Offcanvas, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faFolder, faCode, faBriefcase, faAward, faTrophy, faEnvelope, faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import sidebarImg from "../../assets/images/ninad.png";

const AdminSidebar = ({ collapsed, showSidebar, setShowSidebar }) => {
  const menuItems = [
    { name: "Dashboard", icon: faGauge, path: "/admin/dashboard" },
    { name: "Skills", icon: faCode, path: "/admin/skills" },
    { name: "Experience", icon: faBriefcase, path: "/admin/experience" },
    { name: "Projects", icon: faFolder, path: "/admin/projects" },
  ];

	const menuOther = [
		{ name: "Certificates", icon: faAward, path: "/admin/certificates" },
		{ name: "Achievements", icon: faTrophy, path: "/admin/achievements" },
		{ name: "Messages", icon: faEnvelope, path: "/admin/messages" },
		{ name: "Settings", icon: faGear, path: "/admin/settings" },
	];

	const adminInfo = {
		name: "Ninad Kadam",
		role: "Sr. Software Developer",
		image: sidebarImg
	}

	const handleLogout = () => {
		localStorage.removeItem("user");
		window.location.href = "/";
	}

  return (
    <>
      <div className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
				<div className="sidebar-wrapper">
					<div className="sidebar-top">
						<div className="admin-sidebar__logo">
								{
									collapsed ? (
										<img src={adminInfo.image} alt={adminInfo.name} className="admin-sidebar__logo-img" />
									) : (
										<>
											<img src={adminInfo.image} alt={adminInfo.name} className="admin-sidebar__logo-img" />{" "}
											<span className="admin-sidebar__logo-text">{adminInfo.name}</span>
										</>
									)
								}
						</div>
						<Nav className="admin-sidebar__nav">
							{
								menuItems.map((item, index) => (
									<NavLink key={index} to={item.path} className="admin-sidebar__link">
										<FontAwesomeIcon icon={item.icon} /><span className="admin-sidebar__label">{item.name}</span>
									</NavLink>
								))
							}
						</Nav>
						<Nav className="admin-sidebar__nav">
							{
								menuOther.map((item, index) => (
									<NavLink key={index} to={item.path} className="admin-sidebar__link" onClick={() => setShowSidebar(false)}>
										<FontAwesomeIcon icon={item.icon} /><span className="admin-sidebar__label">{item.name}</span>
									</NavLink>
								))
							}
						</Nav>
					</div>
					<div className="sidebar-bottom">
						<div className="admin-sidebar__bottom">
							<Link to="/" target="_blank" className="admin-sidebar__user">
								<div className="admin-sidebar__avatar">
									<img src={adminInfo.image} alt="Ninad Kadam" className="admin-sidebar__avatar-img" />
								</div>
								{
									!collapsed && (
										<div className="admin-sidebar__user-info">
											<span className="admin-sidebar__user-name">{ adminInfo.name }</span>
											<span className="admin-sidebar__user-role">{ adminInfo.role }</span>
										</div>
									)
								}
							</Link>
							<button className="admin-sidebar__logout" onClick={handleLogout}>
								<FontAwesomeIcon icon={faRightFromBracket} /> {!collapsed && <span>Logout</span>}
							</button>
						</div>
					</div>
				</div>
      </div>
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} className="admin-sidebar__offcanvas">
        <div className="admin-sidebar__mobile">
					<div className="sidebar-wrapper">
						<div className="sidebar-top">
							<div className="admin-sidebar__logo"><span className="admin-sidebar__logo-text">Admin</span></div>
							<Nav className="admin-sidebar__nav">
								{
									menuItems.map((item, index) => (
										<NavLink key={index} to={item.path} className="admin-sidebar__link" onClick={() => setShowSidebar(false)}>
											<FontAwesomeIcon icon={item.icon} /><span className="admin-sidebar__label">{item.name}</span>
										</NavLink>
									))
								}
							</Nav>
							<Nav className="admin-sidebar__nav">
								{
									menuOther.map((item, index) => (
										<NavLink key={index} to={item.path} className="admin-sidebar__link" onClick={() => setShowSidebar(false)}>
											<FontAwesomeIcon icon={item.icon} /><span className="admin-sidebar__label">{item.name}</span>
										</NavLink>
									))
								}
							</Nav>
						</div>
						<div className="sidebar-bottom">
							<div className="admin-sidebar__bottom">
								<div className="admin-sidebar__user">
									<div className="admin-sidebar__avatar">
										<img src={adminInfo.image} alt="Ninad Kadam" className="admin-sidebar__avatar-img" />
									</div>
									{
										!collapsed && (
											<div className="admin-sidebar__user-info">
												<span className="admin-sidebar__user-name">{ adminInfo.name }</span>
												<span className="admin-sidebar__user-role">{ adminInfo.role }</span>
											</div>
										)
									}
								</div>
								<button className="admin-sidebar__logout" onClick={handleLogout}>
									<FontAwesomeIcon icon={faRightFromBracket} /> {!collapsed && <span>Logout</span>}
								</button>
							</div>
						</div>
					</div>
        </div>
      </Offcanvas>
    </>
  );
};
export default AdminSidebar;