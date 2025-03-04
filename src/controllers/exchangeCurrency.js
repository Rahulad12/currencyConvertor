import { fetchRate } from "../apiService/currencyApi.js";
import { formValidator } from "../utils/formValidator.js";
/**
 * Sets up event listener on the convert button to calculate and display
 * the converted currency based on the selected currencies and amount.
 * Fetches the latest exchange rates from an external API and updates the
 * UI with the result. Handles errors during data fetching and calculation.
 */
export const cacluateExchange = (
  amountInput,
  fromCurrencySelect,
  toCurrencySelect,
  convertButton,
  conversionResultDiv,
  errorDiv
) => {
  convertButton.addEventListener("click", async () => {
    const inputAmount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    // Validate form input
    if (
      !formValidator(
        inputAmount,
        fromCurrency,
        toCurrency,
        errorDiv,
        conversionResultDiv
      )
    ) {
      return;
    }
    console.log("fromCurrency", fromCurrency);
    console.log("toCurrency", toCurrency);
    // Reset previous results & show loading state
    errorDiv.textContent = "";
    conversionResultDiv.textContent = "";
    convertButton.disabled = true;
    convertButton.innerText = "Converting...";

    try {
      const data = await fetchRate(fromCurrency);
      if (data.conversion_rates && data.conversion_rates[toCurrency]) {
        const currencyRate = data.conversion_rates[toCurrency];
        const convertedAmount = (inputAmount * currencyRate).toFixed(2);
        conversionResultDiv.textContent = `${inputAmount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
      } else {
        errorDiv.textContent =
          "Currency conversion failed. Please check selected currencies.";
      }
    } catch (error) {
      errorDiv.textContent =
        "Failed to fetch exchange rates. Please try again later.";
      console.error("Error fetching exchange rates:", error);
    } finally {
      convertButton.disabled = false;
      convertButton.innerText = "Convert";
    }
  });
};
