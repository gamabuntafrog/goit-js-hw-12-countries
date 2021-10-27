import template from "./test.hbs"
import debounce from 'lodash.debounce';
import './sass/main.scss';

const input = document.querySelector('.country-search__input');
let COUNTRY_NAME = ''

const contentArea = document.querySelector('.country-search__content')

input.addEventListener('input', debounce(() => {
    contentArea.innerHTML = ''
    function resultData(fetchCountries) {
        fetchCountries.then(data => {
        let obj = {countries: [], country: [], capital: [], population: [], flag: [], nativeName: []}
        if (data.length > 1) {
            for (let i = 0; i < data.length; i++) {
            obj.country.push(data[i].name)
            }
        } else {
            obj.country.push(data[0].name)
            obj.capital.push(data[0].capital)
            obj.population.push(data[0].population)
            obj.flag.push(data[0].flags.png)
            obj.countries.push(data.length)
            obj.nativeName.push(data[0].languages[0].nativeName);
        }
        contentArea.insertAdjacentHTML('beforeend', template({ obj }))
    })
}
    COUNTRY_NAME = input.value

    resultData(fetch(`https://restcountries.com/v2/name/${COUNTRY_NAME}`).then(response => response.json()).then(data => { return data }));
}, 500))



