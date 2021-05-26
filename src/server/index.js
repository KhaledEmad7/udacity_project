var path = require('path')
const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
const KEY = "2bdf649fe983ff04e46e6f1bcca4b194"


// Will be used to start the express appication
const app = express()


app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(cors())
app.use(express.static('dist'))


console.log(__dirname)
app.listen(8081, function () {
    console.log('The application is listening on 8081!')
})
app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})


app.post('/data', async (req, res) =>{
    let enteredURL = req.body.url
    const response = await fetch("https://api.meaningcloud.com/sentiment-2.1?key=" + KEY +'&url=' + enteredURL + '&lang=auto') // Fetching data from api
    try{
        const res_data = await response.json()
        const returnedInfo = {
            text: res_data.sentence_list[0].text,
            agreement: res_data.agreement,
            subjectivity: res_data.subjectivity,
            confidence: res_data.confidence,
            irony: res_data.irony,
            score_tag: res_data.score_tag
        }
        res.send(returnedInfo)
    }catch(err){
        alert("Please enter Valid data")
    }
})
