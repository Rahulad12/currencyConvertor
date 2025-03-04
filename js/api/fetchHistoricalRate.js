const apiKey = "c2e95d65de62ce13ed01df8b";
// const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair`;
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/history`;
export const fetchHistoricalRate = async (baseCurrency) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are 0-based, so add 1 to get the correct month
  const day = date.getDate();
  try {
    const response = await fetch(
      `${apiUrl}/${baseCurrency}/${year}/${month}/${day}`
    );
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

// https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP
