const container = document.getElementById("savedTrips");

let plans =
JSON.parse(localStorage.getItem("travelPlans")) || [];

function displayTrips(){

    container.innerHTML = "";

    if(plans.length === 0){

        container.innerHTML = `
        <h2 style="text-align:center;">
        No Saved Trips Yet ✈️
        </h2>
        `;

        return;
    }

    plans.forEach((plan,index)=>{

        container.innerHTML += `
        <div class="trip-card">

            <h2>${plan.country}</h2>

            <p><b>Type:</b> ${plan.type}</p>

            <p><b>Budget:</b> ${plan.budget}</p>

            <p><b>Saved:</b> ${plan.time}</p>

            <h3>Recommended Places:</h3>

            <ul>
                ${
                    plan.places
                    ? plan.places.map(place => `<li>${place}</li>`).join("")
                    : "<li>No places saved</li>"
                }
            </ul>

            <button
            class="delete-btn"
            onclick="deleteTrip(${index})">

            Delete

            </button>

        </div>
        `;
    });
}

function deleteTrip(index){

    plans.splice(index,1);

    localStorage.setItem(
        "travelPlans",
        JSON.stringify(plans)
    );

    displayTrips();
}

document
.getElementById("clearBtn")
.addEventListener("click",()=>{

    localStorage.removeItem("travelPlans");

    plans=[];

    displayTrips();
});

displayTrips();