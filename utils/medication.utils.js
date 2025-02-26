// Calculate the total dosage of a medication based on the start and end date and the dosage per day
export const calculateTotalDosage = (
  medStartDate,
  medEndDate,
  dosagePerDay
) => {
  const startDate = new Date(medStartDate);
  const endDate = new Date(medEndDate);
  const days = (endDate - startDate) / (1000 * 60 * 60 * 24);
  return Math.ceil(days * dosagePerDay);
};
