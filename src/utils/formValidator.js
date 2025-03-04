export const formValidator = (
  amount,
  fromValue,
  toValue,
  errorElement,
  resultElement
) => {
  if (isNaN(amount) || amount <= 0) {
    errorElement.textContent =
      "Entered amount is not a valid amount,enter a valid amount";
    resultElement.innerContent = "";
    return false;
  }
  if (!fromValue || !toValue) {
    errorElement.textContent = "Please select both currencies";
    resultElement.innerContent = "";
    return false;
  }
  return true;
};
