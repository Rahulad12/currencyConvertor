import { fetchCountry } from "../apiService/countryApi.js";

/**
 * Initializes and populates currency dropdowns with country data.
 * Fetches country information, including names, currencies, and flags,
 * from an external API. Populates the 'from' and 'to' currency dropdowns
 * with this data and updates the corresponding country flags based on the
 * selected currency. Handles errors during data fetching and dropdown population.
 */
export const Country = (fromCurrency, toCurrency, fromImage, toImage) => {
  const extractData = async () => {
    try {
      const countries = await fetchCountry();
      return countries.map((country) => {
        const currencyCode = country.currencies
          ? Object.keys(country.currencies)[0]
          : "N/A";

        return {
          name: country.name.common,
          currency: currencyCode,
          flag: country.flags.svg,
          code: country.cca2,
        };
      });
    } catch (error) {
      console.error(`Error fetching country data:`, error);
    }
  };

  
  const populateDropdowns = async () => {
    try {
      const countryData = await extractData();
      //sort country by name in alphabetical order
      countryData.sort((a, b) => a.name.localeCompare(b.name));
      //mapping the country data to the dropdown
      countryData.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.currency;
        option.textContent = `${country.name} (${country.currency})`;

        fromCurrency.appendChild(option.cloneNode(true));
        toCurrency.appendChild(option);
      });

      // Set default flag images based on the first country in the list
      updateFlag(fromCurrency, fromImage, countryData);
      updateFlag(toCurrency, toImage, countryData);
    } catch (error) {
      console.error("Error loading country data:", error);
    }
  };

  const updateFlag = (dropdown, imageContainer, countryData) => {
    dropdown.addEventListener("change", () => {
      const selectedCurrency = dropdown.value;
      const selectedCountry = countryData.find(
        (country) => country.currency === selectedCurrency
      );

      if (selectedCountry) {
        imageContainer.innerHTML = `<img src="${selectedCountry.flag}" class="flag-image"/>`;
      }
    });

    // Set initial flag
    dropdown.dispatchEvent(new Event("change"));
  };

  populateDropdowns();
};
