const express = require('express')
const body_parser = require('body-parser')
const date = require(__dirname + '/date.js')

var new_list_items = ['buy food', 'cook food', 'eat food']
let work_items = []

const app = express()
app.set('view engine', 'ejs')
app.use(body_parser.urlencoded({extended:true}))
app.use(express.static('public'))


app.get('/', (req, res) => {
    
    res.render('list', { list_title: date.get_date(), new_list_items: new_list_items })
})

app.post('/', (req, res) => {
    let item = req.body.new_item
    if (req.body.list === 'work') {
        work_items.push(item)
        res.redirect('/work')
    } else {
        new_list_items.push(item)
        res.redirect('/')
    }
})

app.get('/work', (req, res) => {
    res.render('list', { list_title: 'work list', new_list_items: work_items })
})

app.post('/work', (req, res) => {
    work_items.push(req.body.new_item)
    res.redirect('/')
})

app.get('/about', (req, res) => {
    res.render('about')
})


const server_port = 3000
app.listen(server_port, () => {
    console.log(`server started at port ${server_port}`)
})