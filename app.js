const express = require('express');
const { projects } = require('./data.json');

const app = express();
app.set('views');
app.set('view engine', 'pug')
app.use('/static', express.static('public'))

const profileImg = "/static/images/profilePic.png"

app.get('/', (req, res) => {
    res.render('index', {projects})
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/project/:id', (req, res, next) => {
    const {id} = req.params;
    const project = projects[id]

    if(project){
        res.render('project', {project})
    }else{
        next()
    } 
});

//404 error handler
app.use((req, res, next) =>{
    const err= new Error();
    err.status = 404;
    err.message = 'looks like the page you requested does not exist'
    console.error(err.message)
    next(err)

})

//global error handler
app.use((err, req, res, next) =>{

    if (err.status === 404){
        res.status(404).render('page-not-found', {err})
    } else {
        err.message =  'Whoops, seems that something went wrong';
        console.error(err.message)
        res.status(err.status || 500).render('error', {err})
    }
})


app.listen(3000);  