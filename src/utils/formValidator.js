export const formValidator = (amount, fromValue, toValue, errorElement) => {
  if (isNaN(amount) || amount <= 0) {
    errorElement.textContent =
      "Entered amount is not a valid amount,enter a valid amount";
    return false;
  }
  if (!fromValue || !toValue) {
    errorElement.textContent = "Please select both currencies";
    return false;
  }
  return true;
};
