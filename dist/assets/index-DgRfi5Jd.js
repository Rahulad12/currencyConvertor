(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function l(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=l(e);fetch(e.href,r)}})();const m=async()=>{try{const c=await fetch("https://restcountries.com/v3.1/all");if(!c.ok)throw new Error(`HTTP error! status: ${c.status}`);return await c.json()}catch(c){throw new Error({success:!1,message:`Error fetching data ${c}`})}},p=(c,n,l,s)=>{const e=async()=>{try{return(await m()).map(t=>{const a=t.currencies?Object.keys(t.currencies)[0]:"N/A";return{name:t.name.common,currency:a,flag:t.flags.svg,code:t.cca2}})}catch(o){console.error("Error fetching country data:",o)}},r=async()=>{try{const o=await e();o.sort((t,a)=>t.name.localeCompare(a.name)),o.forEach(t=>{const a=document.createElement("option");a.value=t.currency,a.textContent=`${t.name} (${t.currency})`,c.appendChild(a.cloneNode(!0)),n.appendChild(a)}),i(c,l,o),i(n,s,o)}catch(o){console.error("Error loading country data:",o)}},i=(o,t,a)=>{o.addEventListener("change",()=>{const d=o.value,u=a.find(f=>f.currency===d);u&&(t.innerHTML=`<img src="${u.flag}" class="flag-image"/>`)}),o.dispatchEvent(new Event("change"))};r()},v="c2e95d65de62ce13ed01df8b",y="https://v6.exchangerate-api.com/v6",h=`${y}/${v}/latest`,g=async c=>{try{const n=await fetch(`${h}/${c}`);if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);return await n.json()}catch(n){throw new Error({success:!1,message:`Error fetching data ${n}`})}},C=(c,n,l,s)=>isNaN(c)||c<=0?(s.textContent="Entered amount is not a valid amount,enter a valid amount",!1):!n||!l?(s.textContent="Please select both currencies",!1):!0,w=(c,n,l,s,e,r)=>{s.addEventListener("click",async()=>{const i=parseFloat(c.value),o=n.value,t=l.value;if(C(i,o,t,r)){console.log("fromCurrency",o),console.log("toCurrency",t),r.textContent="",e.textContent="",s.disabled=!0,s.innerText="Converting...";try{const a=await g(o);if(a.conversion_rates&&a.conversion_rates[t]){const d=a.conversion_rates[t],u=(i*d).toFixed(2);e.textContent=`${i} ${o} = ${u} ${t}`}else r.textContent="Currency conversion failed. Please check selected currencies."}catch(a){r.textContent="Failed to fetch exchange rates. Please try again later.",console.error("Error fetching exchange rates:",a)}finally{s.disabled=!1,s.innerText="Convert"}}})};document.querySelector("#app").innerHTML=`
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
`;w(document.querySelector("#amount"),document.querySelector("#fromCurrency"),document.querySelector("#toCurrency"),document.querySelector("#convertButton"),document.querySelector("#conversionResult"),document.querySelector("#error"));p(document.querySelector("#fromCurrency"),document.querySelector("#toCurrency"),document.querySelector("#from-image"),document.querySelector("#to-image"));
