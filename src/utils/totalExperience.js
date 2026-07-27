import experiences from "./experience";

const calculateTotalExperience = (experienceList) => {
  let totalMonths = 0;

  experienceList.forEach((exp) => {
    const startDate = new Date(exp.joiningDate);
    const endDate = exp.isPresent ? new Date() : new Date(exp.exitDate);

    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());

    if (endDate.getDate() >= startDate.getDate()) {
      months++;
    }

    totalMonths += months;
  });

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return {
    years,
    months,
    totalMonths,
    formatted: `${years}+`,
    fullFormatted: `${years} Years ${months} Months`,
  };
};

const totalExperience = calculateTotalExperience(experiences);

export default totalExperience;