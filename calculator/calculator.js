const express = require("express")
const body_parser = require("body-parser")

const app = express()
app.use(body_parser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.get("/bmi-calculator", (req, res) => {
    res.sendFile(`${__dirname}/bmi-calculator.html`)
})

app.post("/", (req, res) => {
    res.send((Number(req.body.num_1) + Number(req.body.num_2)).toString())
})

app.post("/bmi-calculator", (req, res) => {
    res.send(`your bmi is ${(Number(req.body.weight) / Number(req.body.height) ** 2).toString()}`)
})

app.listen(3000)

