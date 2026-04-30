import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "../../assets/scss/pages/admin/Dashboard.scss";

const data = [
  { name: "This Month", value: 320 },
  { name: "Last Month", value: 528 },
  { name: "This Year", value: 1248 }
];

const COLORS = ["#4f46e5", "#8b5cf6", "#c7d2fe"];

const ProfileViewsChart = () => {
  return (
    <div className="profile-wrapper">
      <div className="chart-box">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={data} innerRadius={70} outerRadius={90} dataKey="value">
              {
								data.map((_, index) => (<Cell key={index} fill={COLORS[index]} />))
							}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="center-text">
          <div className="center-text__value">1,248</div>
          <div className="center-text__label">Total Views</div>
        </div>
      </div>
      <div className="legend">
        {
					data.map((item, i) => (
						<div key={i} className="legend-item">
							<div className="legend-item__name">
								<div className={`legend-item__dot legend-item__dot--${i + 1}`} /> {item.name}
							</div>
							<div className="legend-item__value">{item.value}</div>
						</div>
					))
				}
      </div>
    </div>
  );
};
export default ProfileViewsChart;