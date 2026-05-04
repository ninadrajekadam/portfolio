import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faBriefcase, faFolder, faChevronRight, faEnvelope, faTrophy, faAward, faGauge } from "@fortawesome/free-solid-svg-icons";
import OverviewChart from "./OverviewChart";
import ProfileViewsChart from "./ProfileViewsChart";
import { getSkills, getExperience, getProjects, getMessages } from "../../app/api";
import "../../assets/scss/pages/admin/Dashboard.scss";
import { toast } from "react-toastify";

const Dashboard = () => {
	const [statsData, setStatsData] = useState({ skills: 0, experience: 0, projects: 0, messages: 0 });

	useEffect(() => {
		const loadStats = async () => {
			try {
				const [skills, experience, projects, messages] = await Promise.all([
					getSkills(),
					getExperience(),
					getProjects(),
					getMessages(),
				]);

				setStatsData({
					skills: skills.data.length,
					experience: experience.data.length,
					projects: projects.data.length,
					messages: messages.length
				});
			} catch (error) {
				toast.error(error);
			}
		};

		loadStats();
	}, []);

  const stats = [
    { title: "Skills", count: statsData.skills, label: "Total Skills", icon: faCode, class: "skills" },
    { title: "Experience", count: statsData.experience, label: "Total Experience", icon: faBriefcase, class: "experience" },
    { title: "Projects", count: statsData.projects, label: "Total Projects", icon: faFolder, class: "projects" },
    { title: "Certificates", count: 0, label: "Total Certificates", icon: faAward, class: "certificates" },
    { title: "Achievements", count: 0, label: "Total Achievements", icon: faTrophy, class: "achievements" },
    { title: "Messages", count: statsData.messages, label: "Total Messages", icon: faEnvelope, class: "messages" },
  ];

  return (
    <>
      <div className="heading-wrapper">
				<div className="heading-icon"><FontAwesomeIcon icon={faGauge} /></div>
				<div className="heading">
					<h2 className="layout-heading">Dashboard</h2>
      		<p className="layout-desc">Welcome to the Admin Dashboard</p>
				</div>
			</div>
      <div className="dashboard-wrapper">
				<div className="stats-list">
					<Row>
						{
							stats.map((item, index) => (
								item.count === 0 ? null :
								<Col xxl={3} xl={4} lg={4} md={6} sm={12} xs={12} key={ index }>
									<Link to={ `/admin/${ item.class }` } className={`dashboard-card dashboard-card--${ item.class }`}>
										<div className="dashboard-card__left">
											<div className="dashboard-card__icon"><FontAwesomeIcon icon={ item.icon } size="xl" /></div>
											<div className="dashboard-card__content">
												<span className="dashboard-card__title">{ item.title }</span>
												<span className="dashboard-card__count">{ item.count }</span>
												<span className="dashboard-card__label">{ item.label }</span>
											</div>
										</div>
										<div className="dashboard-card__arrow"><FontAwesomeIcon icon={faChevronRight} /></div>
									</Link>
								</Col>
							))
						}
					</Row>
				</div>
				<div className="charts">
					<Row className="g-4">
						<Col xxl={8} xl={7} lg={12} md={12}>
							<div className="card-box">
								<div className="card-header">
									<h5 className="cart-title">Overview</h5>
									<Dropdown className="custom-dropdown">
										<Dropdown.Toggle className="custom-dropdown__toggle">Last 6 Months</Dropdown.Toggle>
										<Dropdown.Menu className="custom-dropdown__menu">
											<Dropdown.Item className="custom-dropdown__item">Last 6 Months</Dropdown.Item>
											<Dropdown.Item className="custom-dropdown__item">Last Year</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</div>
								<OverviewChart />
							</div>
						</Col>
						<Col xxl={4} xl={5} lg={12} md={12}>
							<div className="card-box">
								<h5 className="cart-title">Profile Views</h5>
								<ProfileViewsChart />
							</div>
						</Col>
					</Row>
				</div>
			</div>
    </>
  );
};

export default Dashboard;