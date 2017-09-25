const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(morgan('combine'))
app.use(bodyParser.json())
app.use(cors())

app.listen(process.env.PORT || 3000, function() {
   console.log("Hello world")
   }
)
