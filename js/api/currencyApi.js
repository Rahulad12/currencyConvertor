const apiKey = "c2e95d65de62ce13ed01df8b";
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest`;

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
