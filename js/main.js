// const dart = document.getElementById('dart');
// const result = document.getElementById('result');

// let readmore;

// dart.addEventListener('click', e => {
//     fetch('https://restcountries.eu/rest/v2/all')
//     .then (res => {
//         if (!res.ok) {
//             throw new Error('Network response error');
//         }
//         return res.json();
//     })
//     .then(data => {
//         let country = (data[Math.floor(Math.random() * data.length)].name);
//         result.innerHTML = (`<h3>You should visit ${country}</h3><button id="readmore">Find out more</button>`);
//         readmore = document.getElementById('readmore');

//         readmore.addEventListener('click', e => {
//             console.log(`More info about ${country}`);
//         });
//     })
//     .catch (err => {
//         console.error(err);
//     });
// });

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

    //console.log(countries);
    return countries;
});

// INTERACTIVITY

const dart = document.getElementById('dart');
const result = document.getElementById('result');

dart.addEventListener('click', e => {
    let countryObj = randomCountry();

    console.log(countryObj);
    
    result.innerHTML = (`<h3>You should visit ${countryObj.name}</h3><button id="readmore">Find out more</button>`);
    readmore = document.getElementById('readmore');

    readmore.addEventListener('click', e => {
        countryMoreInfo(countryObj);
    });
})

function randomCountry() {
    return (countries[Math.floor(Math.random() * countries.length)]);
}

function countryMoreInfo(country) {
    result.innerHTML += `<ul>
    <li><img src="${country.flag}" alt="The flag of ${country.name}"></li>
    <li>Capital: ${country.capital}</li>
    <li>Region: ${country.subregion}, ${country.region}</li>
    <li>Population: ${country.population} ${country.demonym}s</li>
    </ul>`
}

