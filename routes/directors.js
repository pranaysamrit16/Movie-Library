const express = require('express')
const router = express.Router()
const Director = require('../models/director')

router.get('/',async (req,res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name,'i') 
    }
    
    try{
        const directors = await Director.find(searchOptions)
        res.render('directors/index',{
            directors:directors,
            searchOptions:req.query
        })
    } catch{
        res.redirect('/')
    }
})

router.get('/new',(req,res) => {
    res.render('directors/new',{directors:new Director()})  
})

router.post('/', async (req,res) => {
    const directors = new Director({
        name:req.body.name
    })
    try{
        const newDirector = await directors.save()
        res.redirect('directors')
    } catch{
        res.render('directors/new',{
            directors:directors,
            errorMessage:'error Creating Director'
        })
    }


})

module.exports = router