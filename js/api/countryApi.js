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
