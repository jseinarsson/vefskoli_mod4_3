let countries = [];

async function loadCountries() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');

    if (!res.ok) {
        throw new Error('Network response error');
    } else {
        return countryObj = await res.json();
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        countries = await loadCountries();
    } catch (err) {
        console.log(`Attn! ${err}`);
    }

    return countries;
});

// INTERACTIVITY

const dart = document.getElementById('dart');
const result = document.getElementById('result');
const checkBoxes = document.querySelectorAll('input');

dart.addEventListener('click', e => {
    do {
        let countryObj = randomCountry();
        let countrySelection = checkSelection(countryObj.region);
    } while (!countrySelection);
    
    result.innerHTML = (`<h3>You should visit ${countryObj.name}</h3><button id="readmore">Find out more</button>`);
    readmore = document.getElementById('readmore');

    readmore.addEventListener('click', e => {
        countryMoreInfo(countryObj);
    });
});

function checkSelection(randomRegion) {
    let placesToGo = [];

    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            placesToGo.push(checkBoxes[i].id);
        }
    }

    if (placesToGo.indexOf(randomRegion) > -1) {
        return true;
    } else {
        return false;
    }
}

function randomCountry() {
    return (countries[Math.floor(Math.random() * countries.length)]);
}

function countryMoreInfo(country) {
    result.innerHTML += `<ul>
    <li><img src="${country.flag}" alt="The flag of ${country.name}"></li>
    <li><b>Capital:</b> ${country.capital}</li>
    <li><b>Region:</b> ${country.subregion}, ${country.region}</li>
    <li><b>Population:</b> ${country.population} ${country.demonym}s</li>
    </ul>`
}

