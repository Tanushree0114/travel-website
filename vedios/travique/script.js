const travelData = {
  india: {
    adventure: {
      low: ["Rishikesh (Camping)", "Kasol Trek"],
      medium: ["Manali", "Ladakh Road Trip"],
      high: ["Luxury Ladakh Tour", "Udaipur Palace Stay"]
    },
    relax: {
      low: ["Goa Hostels", "Kerala Backwaters Budget Stay"],
      medium: ["Goa Resorts", "Munnar"],
      high: ["Private Kerala Houseboat", "Taj Goa Resort"]
    },
    luxury: {
      low: ["Budget Heritage Hotels"],
      medium: ["5-Star Jaipur Hotels"],
      high: ["Taj Palace Delhi", "Udaipur Luxury Villas"]
    }
  },

  japan: {
    adventure: {
      low: ["Osaka Walking Tours"],
      medium: ["Mount Fuji Trek", "Hokkaido Trails"],
      high: ["Private Fuji Expedition", "Helicopter Tokyo Tour"]
    },
    relax: {
      low: ["Kyoto Temples Walk"],
      medium: ["Nara Stay", "Hakone Onsen"],
      high: ["Luxury Tokyo Ryokan", "Private Onsen Villa"]
    },
    luxury: {
      low: ["Business Hotels Tokyo"],
      medium: ["Luxury Osaka Hotels"],
      high: ["Imperial Tokyo Suite", "Private Japan Tour Package"]
    }
  },

  hongkong: {
    adventure: {
      low: ["Dragon’s Back Trail"],
      medium: ["Lantau Island Hiking"],
      high: ["Private Island Adventure Tour"]
    },
    relax: {
      low: ["Victoria Harbour Walk"],
      medium: ["Disneyland Stay"],
      high: ["Harbour View Suite Hotels"]
    },
    luxury: {
      low: ["City Hotels"],
      medium: ["Harbour Hotels"],
      high: ["Skyline Luxury Suites"]
    }
  }
};

let selectedCountry = null;

function generatePlan() {
  const type = document.getElementById("typeSelect").value;
  const budget = document.getElementById("budgetSelect").value;
  const resultBox = document.getElementById("planResult");

  resultBox.style.padding = "40px 20px";
  resultBox.style.display = "flex";
  resultBox.style.flexDirection = "column";
  resultBox.style.alignItems = "center";

  const country = selectedCountry;

  if (
    !country ||
    !travelData[country] ||
    !travelData[country][type] ||
    !travelData[country][type][budget]
  ) {
    resultBox.innerHTML = `
      <h2 style="color:red;">No Plan Found ❌</h2>
      <p>Please select a valid destination from search.</p>
    `;
    return;
  }

  const data = travelData[country][type][budget];

  resultBox.innerHTML = `
    <div class="plan-card">
      <h2>✈️ Your Travel Plan</h2>

      <p><b>Country:</b> ${country}</p>
      <p><b>Type:</b> ${type}</p>
      <p><b>Budget:</b> ${budget}</p>

      <hr>

      <h3>Recommended Places:</h3>
      <ul>
        ${data.map(place => `<li>${place}</li>`).join("")}
      </ul>

      <button onclick="savePlan('${country}','${type}','${budget}')">
        💾 Save Plan
      </button>
    </div>
  `;
}

function savePlan(country, type, budget) {
  const places = travelData[country][type][budget];

  let plans = JSON.parse(localStorage.getItem("travelPlans")) || [];

  plans.push({
    country,
    type,
    budget,
    places,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("travelPlans", JSON.stringify(plans));

  alert("Plan Saved Successfully ✅");
}

const countries = [
  { name: "India", value: "india" },
  { name: "Japan", value: "japan" },
  { name: "Hong Kong", value: "hongkong" }
];

const searchInput = document.getElementById("searchCountry");
const resultsBox = document.getElementById("searchResults");

searchInput.addEventListener("input", () => {
  const search = searchInput.value.toLowerCase().trim();

  resultsBox.innerHTML = "";

  if (!search) return;

  const filtered = countries.filter(c =>
    c.name.toLowerCase().includes(search)
  );

  if (!filtered.length) {
    resultsBox.innerHTML = "❌ No country found";
    return;
  }

  filtered.forEach(country => {
    const item = document.createElement("div");
    item.textContent = country.name;

    item.onclick = () => {
      selectedCountry = country.value;
      searchInput.value = country.name;
      resultsBox.innerHTML = "✅ Selected: " + country.name;
      
    };

    resultsBox.appendChild(item);
  });
});


const weatherLocations = {
  india: { lat: 28.61, lon: 77.20 },
  japan: { lat: 35.68, lon: 139.69 },
  hongkong: { lat: 22.31, lon: 114.17 }
};

async function getWeather() {

  const country =
    document.getElementById("weatherCountry").value;

  if (!country) {
    alert("Please select a country");
    return;
  }

  const location = weatherLocations[country];

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`;

  const response = await fetch(url);

  const data = await response.json();

  document.getElementById("weatherBox").innerHTML = `
    <h3>${country.toUpperCase()}</h3>
    <p>🌡️ Temperature: ${data.current_weather.temperature}°C</p>
    <p>💨 Wind Speed: ${data.current_weather.windspeed} km/h</p>
  `;

  document.getElementById("weatherBox").style.display = "block";
}

document
  .getElementById("weatherBtn")
  .addEventListener("click", getWeather);


  