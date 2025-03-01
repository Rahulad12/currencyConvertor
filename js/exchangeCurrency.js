import { fetchRate } from "./api/currencyApi.js";

/**
 * Sets up event listener on the convert button to calculate and display
 * the converted currency based on the selected currencies and amount.
 * Fetches the latest exchange rates from an external API and updates the
 * UI with the result. Handles errors during data fetching and calculation.
 */
export const cacluateExchange = () => {
  const amountInput = document.getElementById("amount");
  const fromCurrencySelect = document.getElementById("fromCurrency");
  const toCurrencySelect = document.getElementById("toCurrency");
  const convertButton = document.getElementById("convertButton");
  const conversionResultDiv = document.getElementById("conversionResult");
  const errorDiv = document.getElementById("error");

  convertButton.addEventListener("click", async () => {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount)) {
      errorDiv.textContent = "Please enter a valid amount.";
      conversionResultDiv.textContent = "";
      return;
    }

    // Reset previous results & show loading state
    errorDiv.textContent = "";
    conversionResultDiv.textContent = "";
    convertButton.disabled = true;
    convertButton.innerText = "Converting...";

    try {
      const data = await fetchRate(fromCurrency);

      if (data.conversion_rates && data.conversion_rates[toCurrency]) {
        const rate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        conversionResultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
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
