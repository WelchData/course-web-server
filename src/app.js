const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express()

// So we're goint to find the port number if given (by Heroku for instance)
// or pass in a default if none given.
const port = process.env.PORT || 3000

// get the forecast function
const forecast = require('./utils/forecast.js')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../src/templates/views')
const partialsPath = path.join(__dirname,'../src/templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static director to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'This is me'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'This is me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is a help page',
        name: 'This is me',
        message: 'This is a help message'
    })
})

app.get('/weather', (req,res) => {
    const address = req.query.address.toString()
    
    if (!address) {
        return res.send('You need to provide a address')
    } else {
        forecast.printSomething()
        forecast.getForecast(address)
            .then((response) => {
                const apiResponse = response.data;
                //console.log(apiResponse)
                res.send({
                    description: apiResponse.current.weather_descriptions,
                    location: address,
                    country: apiResponse.location.country,
                    temp: apiResponse.current.temperature,
                    feelslike: apiResponse.current.feelslike
                })
            })
        
        
    }    
    
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: "Something went wrong",
        text: "We couldn't find the help page you wanted"
    })
})

// We're using the * wildcard to get everything else
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Something went wrong',
        text: "We couldn't find the page you were looking for."
    })
})

// start the server
// you specify the port to listen to.

// When pushed to Heroku you need to change this to be dynamic
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})