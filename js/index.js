import { Country } from "./country.js";
import { cacluateExchange } from "./exchangeCurrency.js";


/**
 * Initializes the currency converter application by setting up
 * country data for currency dropdowns and configuring the event
 * listener for the currency conversion calculation.
 */


const app = () => {
  Country();
  cacluateExchange();
};
app();
