let temp = document.querySelector(".temperature");
let add = document.querySelector(".resolvedAddress");
let cond = document.querySelector(".conditions");
let fl = document.querySelector(".feelslike");
let humid = document.querySelector(".humidity");
let img = document.querySelector("img");
let input = document.querySelector(".text");
let inputtext = "india"
let data;

document.addEventListener("DOMContentLoaded", async function() {
    await weather(inputtext);
    updateUI(data)
});
input.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
        let inputtext = input.value; // Update inputtext with the current value of the input field
        await weather(inputtext);
        console.log(data);
        updateUI(data); // Update UI with the fetched data
        input.value = "";
    }
});

async function weather(inputtext) {
    try {
        let res = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + encodeURIComponent(inputtext) + "?unitGroup=metric&include=current&key=DAX76AN5Z8ULJY5LCZQWPANWU&contentType=json");
        if (!res.ok) {
            throw new Error("Failed to fetch weather data");
        }
        data = await res.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert( inputtext +"  is not found ")
    }
}


function updateUI(data) {
    temp.textContent = data.currentConditions.temp + "°C";
    add.textContent = data.resolvedAddress;
    cond.textContent = data.currentConditions.conditions;
    fl.textContent = "Feels Like : " + data.currentConditions.feelslike + "°C";
    humid.textContent = "Humidity: " + data.currentConditions.humidity + "%";
    img.src = "https://raw.githubusercontent.com/visualcrossing/WeatherIcons/6231688b36311be3ed337868e322258c1cb5f2f3/SVG/1st%20Set%20-%20Color/" + data.currentConditions.icon + ".svg";
}

