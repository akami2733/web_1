const express = require("express")
const body_parser = require("body-parser")

const app = express()
app.use(body_parser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.post("/", (req, res) => {
    console.log(req.body)
    res.send((Number(req.body.num_1) + Number(req.body.num_2)).toString())
})

app.listen(3000)

