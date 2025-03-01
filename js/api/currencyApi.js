const apiKey = "c2e95d65de62ce13ed01df8b";
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest`;

/**
 * Fetches the latest exchange rates for a given currency.
 *
 * @param {string} fromCurrency - Currency code to fetch exchange rate for.
 * @returns {Promise<Object>} - A promise that resolves to an object with the
 *   exchange rate data. If there is an error, it resolves to an error object
 *   with a success flag set to false and a message describing the error.
 */
export const fetchRate = async (fromCurrency) => {
  try {
    const response = await fetch(`${apiUrl}/${fromCurrency}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error({
      success: false,
      message: `Error fetching data ${error}`,
    });
  }
};
