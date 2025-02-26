// Calculate the total dosage of a medication based on the start and end date, dosage per day, and frequency
export const calculateTotalDosage = (
  medStartDate,
  medEndDate,
  dosagePerDay,
  frequency = 1 // Default frequency to 1 if not provided
) => {
  const startDate = new Date(medStartDate);
  const endDate = new Date(medEndDate);
  const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

  // Calculate the number of doses based on frequency
  const numberOfDoses = Math.ceil(totalDays / frequency);

  // Calculate the total dosage
  return numberOfDoses * dosagePerDay;
};
