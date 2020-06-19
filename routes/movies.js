const express = require('express')
const movie = require('../models/movie')
const router = express.Router()
const Movie = require('../models/movie')
const Actor = require('../models/actor')
const Director = require('../models/director')

router.get('/',async(req,res) => {
    let query = Movie.find()
    // if(req.query.actor!=null && req.query.actor!=''){
    //     query = query.regex('actor',new RegExp(req.query.actor,'i'))
    // }
    if(req.query.releasedAfter != null && req.query.releasedAfter != ''){
        query = query.gte('releaseDate',req.query.releasedAfter)
    }
    if(req.query.releasedBefore != null && req.query.releasedBefore != ''){
        query = query.lte('releaseDate',req.query.releasedBefore)
    }
    try{
        const movies = await query.exec();
        res.render('movies/index',{
            movies:movies,
            searchOptions : req.query
        })
    } catch{
        res.redirect('/')
    }
})

router.get('/new',async (req,res) => {
    renderNewPage(res,new Movie())
})

router.post('/', async (req,res) => {
    const movie = new Movie({
        title:req.body.title,
        genre:req.body.genre,
        actor:req.body.actor,
        director:req.body.director,
        releaseDate:new Date(req.body.releaseDate),
        description:req.body.description
    })
    try{
        const newMovie = await movie.save()
        res.redirect('/movies')
    } catch{
        renderNewPage(res,movie,true)
    }

})

async function renderNewPage(res,movie,hasError=false){
    try{
        const actors = await Actor.find({})
        const directors = await Director.find({})
        //const movies = new Movie()
        let params = {
            actors : actors,
            directors:directors,
            movies:movie
        }
        if(hasError)params.errorMessage='Error Creating Movie'
        res.render('movies/new',params)
    } catch{
        res.redirect('/movies')
    }
}

module.exports = router