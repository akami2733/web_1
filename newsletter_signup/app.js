const express = require(`express`)
const body_parser = require(`body-parser`)
const request = require(`request`)
const https = require(`https`)

const app = express()
const mailchimp_api_key = `a25fa45238dbe53f8a43324e542cafe00-us21`
const mailchimp_list_id = `c4711c9880`

app.use(express.static(`${__dirname}/public`))
app.use(body_parser.urlencoded({extended: true}))

const server_port = 3000
app.listen(server_port, function() {
    console.log(`server is running on port: ${server_port}`)
})

app.get(`/`, function(req, res) {
    res.sendFile(`${__dirname}/signup.html`)
})

app.post(`/`, function(req, res) {
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    console.log(`akack1 first_name ${first_name}\tlast_name ${last_name}\temail ${email}\t`)

    const data = {
        members: [
            {
                email_address: email,
                status: `subscribed`,
                merge_fields: {
                    FNAME: first_name,
                    LNAME: last_name
                }
            }
        ]
    }

    const json_data = JSON.stringify(data)
    const base_url = `https://us21.api.mailchimp.com/3.0/`
    const url = `${base_url}/lists/${mailchimp_list_id}`
    const options = {
        method: `post`,
        auth: `akami:${mailchimp_api_key}`,

    }
    const req_2 = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(`${__dirname}/success.html`)
        } else {
            res.sendFile(`${__dirname}/failure.html`)
        }

        response.on(`data`, function(data) {
            console.log(JSON.parse(data))
        })
    })

    req_2.write(json_data)
    req_2.end()
})

app.post('/failure', function(req, res) {
    res.redirect('/')
})