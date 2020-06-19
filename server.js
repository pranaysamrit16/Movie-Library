if(process.env.NODE_ENV!=='production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const movieRouter = require('./routes/movies')
const actorRouter = require('./routes/actors')
const directorRouter = require('./routes/directors')

app.use(expressLayouts)
app.use(bodyParser.urlencoded({extended:false,limit:'10mb'}))
app.set('view engine','ejs')
app.set('views','./views')
app.set('layout','layouts/layout')

app.use('/',indexRouter)
app.use('/movies',movieRouter)
app.use('/actors',actorRouter)
app.use('/directors',directorRouter)

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db = mongoose.connection
db.on('error',(err) => {
    console.error(err)
})
db.once('open',()=>{console.log('Connected to Mongoose')})

app.listen(process.env.PORT || 3000)