const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.send("<h1>hello</h1>")
})

app.get("/contact", (req, res) => {
    res.send("<h1>contact</h1>")
})

app.get("/about", (req, res) => {
    res.send("<h1>about</h1>")
})

app.listen(3000)
