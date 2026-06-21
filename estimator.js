const countryCosts = {

  india: {
    flight: 8000,
    hotel: 2000,
    food: 800,
    transport: 500
  },

  japan: {
    flight: 50000,
    hotel: 7000,
    food: 2500,
    transport: 1800
  },

  hongkong: {
    flight: 35000,
    hotel: 5000,
    food: 1800,
    transport: 1200
  }

};


setTimeout(() => {
  if (costChart) costChart.destroy();

  costChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Flights", "Hotel", "Food", "Transport"],
      datasets: [{
        data: [flight, hotel, food, transport]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });

}, 50);


let costChart;


document
.getElementById("calculateBtn")
.addEventListener("click", calculateCost);

function calculateCost(){

  const country =
  document.getElementById("country").value;

  const days =
  Number(document.getElementById("days").value);

  const travellers =
  Number(document.getElementById("travellers").value);

  const accommodation =
  document.getElementById("accommodation").value;

  const season =
  document.getElementById("season").value;

  if(
    !country ||
    !days ||
    !travellers ||
    !accommodation ||
    !season
  ){
    alert("Please fill all fields");
    return;
  }

  let costs = countryCosts[country];

  let hotelMultiplier = 1;

  if(accommodation==="hostel"){
    hotelMultiplier = 0.7;
  }

  if(accommodation==="luxury"){
    hotelMultiplier = 2;
  }

  let seasonMultiplier = 1;

  if(season==="off"){
    seasonMultiplier = 0.85;
  }

  if(season==="peak"){
    seasonMultiplier = 1.3;
  }

  const flight =
  costs.flight * travellers;

  const hotel =
  costs.hotel *
  hotelMultiplier *
  days *
  travellers;

  const food =
  costs.food *
  days *
  travellers;

  const transport =
  costs.transport *
  days *
  travellers;

  const total =
  Math.round(
    (flight + hotel + food + transport)
    * seasonMultiplier
  );

  const costPerPerson =
Math.round(total / travellers);

  let health = "";

if(costPerPerson < 30000){
  health = "🟢 Budget Friendly Per Person";
}
else if(costPerPerson < 80000){
  health = "🟡 Moderate Per Person";
}
else{
  health = "🔴 Expensive Per Person";
}


let suggestion = "";

if (season === "peak" && accommodation === "luxury") {
  suggestion = "SUGGESTION:💡 Very high cost detected. Try off-season + budget stay to save money.";
}
else if (season === "peak") {
  suggestion = "SUGGESTION:💡 Peak season increases cost. Consider off-season travel.";
}
else if (accommodation === "luxury") {
  suggestion = "SUGGESTION:💡 Luxury stay is increasing cost. Try hotel/hostel options.";
}
else {
  suggestion = "💡 Your plan is cost efficient!";
}

  document.getElementById("resultBox").innerHTML = `
  
    <div class="plan-card">

      <h2>Estimated Cost Breakdown</h2>

      <p>✈️ Flights: ₹${flight.toLocaleString()}</p>

      <p>🏨 Hotel: ₹${Math.round(hotel).toLocaleString()}</p>

      <p>🍽️ Food: ₹${food.toLocaleString()}</p>

      <p>🚕 Transport: ₹${transport.toLocaleString()}</p>

      <hr>

      <h3>Total Cost</h3>

      <p><strong>₹${total.toLocaleString()}</strong></p>

      <p>
  👤 Cost Per Person:
  ₹${costPerPerson.toLocaleString()}
</p>

     <div class="analysis-box">
  <h3>${health}</h3>
</div>

<p class="assumption">
  Assessment is based on estimated cost per traveller, not total group cost.
</p>

<div class="suggestion-box">
  ${suggestion}
</div>

    </div>

  `;
  
  document.querySelector(".chart-container")
.style.display = "block";

const ctx =
document.getElementById("costChart");

if(costChart){
  costChart.destroy();
}
costChart = new Chart(ctx, {

  type: "doughnut",

  data: {
    labels: ["Flights", "Hotel", "Food", "Transport"],
    datasets: [{
      data: [flight, hotel, food, transport]
    }]
  },

  options: {
    responsive: true,

    // ⭐ 1. Doughnut hole size
    cutout: "60%",

    // ⭐ 2. Animation (smooth professional feel)
    animation: {
      animateScale: true,
      animateRotate: true
    },

    plugins: {

      // ⭐ 3. Legend styling
      legend: {
        position: "bottom"
      },

      // ⭐ 4. Tooltip formatting (PRO TOUCH 💼)
      tooltip: {
        callbacks: {
          label: function(context) {
            return "₹ " + context.raw.toLocaleString();
          }
        }
      }

    }
  }

});
   
}
