import ProfileView from "../models/ProfileView.js";

export const addProfileView = async (req, res) => {
  try {
    await ProfileView.create({});
    res.status(200).json({ message: "View added" });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProfileStats = async (req, res) => {
  try {
    const views = await ProfileView.find();

    const now = new Date();

    let thisMonth = 0;
    let lastMonth = 0;
    let thisYear = 0;

    const monthlyData = {};

    views.forEach((v) => {
      const d = new Date(v.date);

      if (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      ) {
        thisMonth++;
      }

      const lastMonthDate = new Date();
      lastMonthDate.setMonth(now.getMonth() - 1);

      if (
        d.getMonth() === lastMonthDate.getMonth() &&
        d.getFullYear() === lastMonthDate.getFullYear()
      ) {
        lastMonth++;
      }

      if (d.getFullYear() === now.getFullYear()) {
        thisYear++;
      }

      const key = `${d.getFullYear()}-${d.getMonth()}`;

      monthlyData[key] = (monthlyData[key] || 0) + 1;
    });

    const overview = Object.keys(monthlyData).map((key) => {
      const [year, month] = key.split("-");
      return {
        name: new Date(year, month).toLocaleString("default", { month: "short" }),
        value: monthlyData[key]
      };
    });

    res.json({
      thisMonth,
      lastMonth,
      thisYear,
      total: views.length,
      overview
    });
  } catch (err) {
    res.status(500).json(err);
  }
};