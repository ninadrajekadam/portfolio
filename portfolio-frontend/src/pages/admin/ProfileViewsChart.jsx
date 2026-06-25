import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#4f46e5", "#c7d2fe"];

const ProfileViewsChart = ({ stats }) => {
  if (!stats) return <p>Loading...</p>;

  const data = [
    { name: "Last Month", value: stats.lastMonth },
    { name: "This Month", value: stats.thisMonth },
    // { name: "This Year", value: stats.thisYear }
  ];

  return (
    <div className="profile-wrapper">
      <div className="chart-box">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={data} innerRadius={70} outerRadius={90} dataKey="value">
              { data.map((_, index) => (<Cell key={index} fill={COLORS[index]} />)) }
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="center-text">
          <div className="center-text__value">{stats.total}</div>
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