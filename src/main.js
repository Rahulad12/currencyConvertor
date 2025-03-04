// Import necessary modules
import { Country } from "./controllers/country.js"; // Handles country and currency selection
import { cacluateExchange } from "./controllers/exchangeCurrency.js"; // Function to calculate currency exchange
import "./style.css"; // Import styles for the page

// Inject the HTML structure into the #app element
document.querySelector("#app").innerHTML = `
  <div>
    <!-- Header with Hero Section -->
    <header>
      <div class="hero">
        <h1>MudraLok - Currency Converter</h1>
        <p>Convert currencies in real-time with the latest exchange rates.</p>
      </div>
    </header>

    <!-- Main Currency Converter Section -->
    <main>
      <div class="container">
        <!-- Currency Conversion Box -->
        <div class="converter-container">
          <div class="converter-box">
            <!-- Input for Amount -->
            <div class="input-group">
              <label for="amount">Amount</label>
              <input
                type="number"
                id="amount"
                placeholder="Enter amount"
                min="0"
              />
            </div>
            
            <!-- Dropdown for 'From' Currency Selection -->
            <div class="input-group">
              <label for="fromCurrency">From</label>
              <div class="input-box">
                <div id="from-image" class="country-image"></div>
                <select id="fromCurrency">
                  <option value="NPR">Nepal (NPR)</option>
                </select>
              </div>
            </div>
            
            <!-- Dropdown for 'To' Currency Selection -->
            <div class="input-group">
              <label for="toCurrency">To</label>
              <div class="input-box">
                <div id="to-image" class="country-image"></div>
                <select id="toCurrency">
                  <option value="INR">India (INR)</option>
                </select>
              </div>
            </div>
            
            <!-- Convert Button -->
            <button id="convertButton">Convert</button>
            
            <!-- Result Section -->
            <div id="result" class="result">
              <div id="loading" class="loading"></div>
              <div id="conversionResult" class="conversion-result"></div>
            </div>
            
            <!-- Error Message Display -->
            <div id="error" class="error"></div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer Section -->
    <footer>
      <div class="footer-content">
        <p>
          Created By
          <a href="https://www.adhikarirahul.com.np/" target="_blank"
            >Rahul Adhikari</a
          >
        </p>
        <p>
          Powered by
          <a href="https://www.exchangerate-api.com" target="_blank"
            >ExchangeRate-API</a
          >
        </p>
      </div>
    </footer>
  </div>
`;

// Initialize the currency conversion functionality
cacluateExchange(
  document.querySelector("#amount"), // User input amount
  document.querySelector("#fromCurrency"), // Selected 'from' currency
  document.querySelector("#toCurrency"), // Selected 'to' currency
  document.querySelector("#convertButton"), // Convert button
  document.querySelector("#conversionResult"), // Display conversion result
  document.querySelector("#error") // Display error messages (if any)
);

// Initialize the country selection dropdown and flag images
Country(
  document.querySelector("#fromCurrency"), // 'From' currency dropdown
  document.querySelector("#toCurrency"), // 'To' currency dropdown
  document.querySelector("#from-image"), // 'From' currency flag image
  document.querySelector("#to-image") // 'To' currency flag image
);
