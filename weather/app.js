const express = require(`express`)
const https = require(`https`)
const body_parser = require(`body-parser`)

const app = express()
const api_key = `ce0fd8df9f2368f6662a75bcda11e4d8`
const base_url = `https://api.openweathermap.org/data/2.5/weather`
const query_country = `London`

app.use(body_parser.urlencoded({extended: true}))

app.get(`/`, (req, res) => {
    console.log(`akack1`)
    res.sendFile(__dirname + `/index.html`)
})

app.post(`/`, (req, res) => {
    console.log(`akack2`)
    const query_city = req.body.city_name

    const url = `${base_url}?q=${query_city}&appid=${api_key}`
    https.get(url, (res_1) => {
        res_1.on("data", (data) => {
            weather_data = JSON.parse(data)
            const temp = weather_data.main.temp
            const weather_description = weather_data.weather[0].description
            const icon = weather_data.weather[0].icon
            const image_url = `http://openweathermap.org/img/wn/${icon}@2x.png`
            res.write(`<h1>the  weather is currently ${weather_description}</h1>`)
            res.write(`<h1>the temperature in ${query_city} is ${temp} kelvin</h1>`)
            res.write(`<img src="${image_url}">`)
            res.send()
        })
    })
})

app.listen(3000)
