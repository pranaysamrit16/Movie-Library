const express = require('express')
const router = express.Router()
const Actor = require('../models/actor')

router.get('/',async (req,res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name,'i') 
    }
    
    try{
        const actors = await Actor.find(searchOptions)
        res.render('actors/index',{
            actors:actors,
            searchOptions:req.query
        })
    } catch{
        res.redirect('/')
    }
})

router.get('/new',(req,res) => {
    res.render('actors/new',{actors:new Actor()})  
})

router.post('/', async (req,res) => {
    const actors = new Actor({
        name:req.body.name
    })
    try{
        const newActor = await actors.save()
        res.redirect('actors')
    } catch{
        res.render('actors/new',{
            actors:actors,
            errorMessage:'error Creating Actor'
        })
    }


})

module.exports = router