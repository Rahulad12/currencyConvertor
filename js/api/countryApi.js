/**
 * Fetches the list of countries and their respective data from
 * the "restcountries.com" API.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to an array of country data
 * @throws {Error} - if there is a problem fetching the data
 */
export const fetchCountry = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
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
