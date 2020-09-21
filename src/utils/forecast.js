const axios = require('axios');
const params = {
    access_key: '90e9dc6ab6cc7a47f6ca8ab89875fbf3',
    query: 'London'
}

axios.get(`https://api.weatherstack.com/current`, {params})
    .then(response => {
        const apiResponse = response.data;
        //console.log(`The temp is: ${apiResponse.current.temperature} but it feels like ${apiResponse.current.feelslike}`)
    })
    .catch(err => {
        console.log(err)
    })


const getForecast = (location) => {
    params.query = location
    const data = axios.get(`https://api.weatherstack.com/current`, {params})    
    return data
// end of getForecast
}

const printSomething = () => console.log('something')

getForecast('London')

module.exports = {
    getForecast: getForecast,
    printSomething: printSomething
}