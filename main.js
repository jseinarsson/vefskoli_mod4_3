let countries = [];
let body = document.querySelector("body");

// Load API with information on world countries
async function loadCountries() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');

    //Throws error is result is not OK (results are not OK if they don't return a code between 200 and 299), else it returns the data as JSON
    if (!res.ok) {
        throw new Error('Network response error');
    } else {
        return await res.json();
    }
}

// On dom load, the loadcountries function is run and tries to assign the JSON string to the countries object, else it console logs the error and changes the DOM contents
document.addEventListener("DOMContentLoaded", async () => {
    try {
        countries = await loadCountries();
    } catch (err) {
        console.log(`Attn! ${err}`);
        body.innerHTML = (`<h1 class="alert">Something went wrong... please try refreshing the page.</h3>`);
    }

    return countries;
});

// INTERACTIVITY

const dart = document.getElementById('dart');
const result = document.getElementById('result');
const checkBoxes = document.querySelectorAll('input');

let somethingChecked;

dart.addEventListener('click', e => {
    // Gets a random country and checks whether the selection is valid
    let countryObj = randomCountry();
    let countryValid = checkSelection(countryObj.region);
    
    // If countryValid is false, it will continue to run until it gets a valid region as long as somethingChecked is true
    while (!countryValid) {
        if (somethingChecked) {
            countryObj = randomCountry();
            countryValid = checkSelection(countryObj.region);
        } else {
            break;
        }
    }
    
    // Adds/resets the inner HTML of result, adding the country name and button to view more if the country is valid, else showing an error.
    if (countryValid) {
        result.innerHTML = (`<h3>You should visit ${countryObj.name}</h3><button id="readmore">Find out more</button>`);
        readmore = document.getElementById('readmore');

        readmore.addEventListener('click', e => {
            countryMoreInfo(countryObj);
        }); 
    } else {
        result.innerHTML = (`<h3 class="alert">ERROR: Please select at least one region</h3>`);
    }

});

// Checks the region of the randomly generated country against the checkboxes and return true if the region is checked or false if not checked
function checkSelection(randomRegion) {
    let placesToGo = [];

    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            placesToGo.push(checkBoxes[i].id);
        }
    }

    // Creating a validator that at least one of the checkboxes is checked so we don't end up in an infinite while loop above
    if (placesToGo.length === 0) {
        somethingChecked = false;
    } else {
        somethingChecked = true;
    }

    console.log(somethingChecked);

    if (placesToGo.indexOf(randomRegion) > -1) {
        return true;
    } else {
        return false;
    }
}

// Function that returns a random country from the countries json list
function randomCountry() {
    return (countries[Math.floor(Math.random() * countries.length)]);
}

// Builder when pressing "find out more"
function countryMoreInfo(country) {
    result.innerHTML += `<ul>
    <li><img src="${country.flag}" alt="The flag of ${country.name}"></li>
    <li><b>Capital:</b> ${country.capital}</li>
    <li><b>Region:</b> ${country.subregion}, ${country.region}</li>
    <li><b>Population:</b> ${country.population} ${country.demonym}s</li>
    </ul>`
}

