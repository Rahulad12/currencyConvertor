import { fetchCountry } from "./api/countryApi.js";

export const Country = () => {
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");
  const fromImage = document.getElementById("from-image");
  const toImage = document.getElementById("to-image");

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
