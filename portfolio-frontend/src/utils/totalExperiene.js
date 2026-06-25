export const calculateTotalExperience = (experiences) => {
  let totalMonths = 0;

  experiences.forEach((exp) => {
    const start = new Date(exp.joiningDate);
    const end = exp.exitDate ? new Date(exp.exitDate) : new Date();

    let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

    if (!exp.exitDate && end.getDate() >= start.getDate()) {
      months += 1;
    }

    totalMonths += months;
  });

  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
    totalMonths,
    formatted: totalMonths % 12 === 0 ? `${Math.floor(totalMonths / 12)}` : `${Math.floor(totalMonths / 12)}.${totalMonths % 12}`,
  };
};

export const calculateSingleExp = (joiningDate, exitDate) => {
  if (!joiningDate) return "0 yrs";

  const start = new Date(joiningDate);
  const end = exitDate ? new Date(exitDate) : new Date();

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return "0 yrs";
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (end.getDate() < start.getDate()) {
    months--;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (months === 11) {
    years += 1;
    months = 0;
  }

  if (years === 0) {
    return `0.${months} yrs`;
  }

  return months === 0
    ? `${years} yrs`
    : `${years}.${months} yrs`;
};