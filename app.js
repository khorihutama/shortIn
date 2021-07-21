const express = require('express')
const app = express()
require('dotenv').config();

const connectDB = require('./config/db')

connectDB()

const port = process.env.PORT || 3333

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', require('./routes/index'));
app.use('/api', require('./routes/urls'));

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})