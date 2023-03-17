const express = require(`express`)
const https = require(`https`)
const app = express()
const api_key = `ce0fd8df9f2368f6662a75bcda11e4d8`
const base_url = `https://api.openweathermap.org/data/2.5/weather`
const query_country = `London`

app.get(`/`, (req, res) => {
    const url = `${base_url}?q=${query_country}&appid=${api_key}`
    https.get(url, (res_1) => {
        res_1.on("data", (data) => {
            weather_data = JSON.parse(data)
            const temp = weather_data.main.temp
            const weather_description = weather_data.weather[0].description
            const icon = weather_data.weather[0].icon
            const image_url = `http://openweathermap.org/img/wn/${icon}@2x.png`
            res.write(`<h1>the weather is currently ${weather_description}</h1>`)
            res.write(`<h1>the temperature in ${query_country} is ${temp} kelvin</h1>`)
            res.write(`<img src="${image_url}">`)
            res.send()
        })
    })
})

app.listen(3000)
