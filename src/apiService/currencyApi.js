const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
const baseURL = import.meta.env.VITE_EXCHANGE_RATE_BASE_URL;
const apiUrl = `${baseURL}/${apiKey}/latest`;

/**
 * Fetches the latest exchange rates for a given currency.
 *
 * @param {string} fromCurrency - Currency code to fetch exchange rate for.
 * @returns {Promise<Object>} - A promise that resolves to an object with the
 *   exchange rate data. If there is an error, it resolves to an error object
 *   with a success flag set to false and a message describing the error.
 */
export const fetchRate = async (from) => {
  try {
    const response = await fetch(`${apiUrl}/${from}`);
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
