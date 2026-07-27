const formatDate = (date) => {
  if (!date || date === "Present") return "Present";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};
export default formatDate;