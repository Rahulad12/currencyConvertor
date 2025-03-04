import { fetchHistoricalRate } from "../apiService/fetchHistoricalRate.js";
const drawChart = (labels, rates) => {
  const ctx = document.getElementById("rateChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels, // Dates
      datasets: [
        {
          label: "Exchange Rate",
          data: rates, // Rate values
          borderColor: "blue",
          fill: false,
        },
      ],
    },
  });
};

const loadGraphData = async () => {
  const base = "USD"; // Change as per selection
  const target = "NPR"; // Change as per selection
  const data = await fetchHistoricalRate(base, target);
  console.log(data);
  const labels = Object.keys(data.conversion_rates);
  console.log(labels);
  const rates = Object.values(data.conversion_rates);
  console.log(labels, rates);

  drawChart(labels, rates);
};

loadGraphData();
