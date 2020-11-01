const dart = document.getElementById('dart');
const result = document.getElementById('result');


dart.addEventListener('click', e => {
    fetch('https://restcountries.eu/rest/v2/all')
    .then (res => {
        if (!res.ok) {
            throw new Error('Network response error');
        }
        return res.json();
    })
    .then(data => {
        let country = (data[Math.floor(Math.random() * data.length)].name);
        result.innerHTML = (`You should visit ${country}`);
    })
    .catch (err => {
        console.error(err);
    });
});

