
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');

const routes = require('../routes/index.js');
const errorHandler = require('errorhandler');


module.exports = app =>{
    
    app.set('port', process.env.PORT || 3000);
    app.set('views',path.join(__dirname, '../views'));
    app.engine('hbs', exphbs({
        
        defaultLayout: 'main',
        partialsDir:path.join(app.get('views'), 'partials'),
        layoutDir:path.join(app.get('views'), 'layouts'),
        extname:'.hbs',
        helpers: require('./helpers'),
        handlebars: handlebars
    }));
    app.set('view engine', '.hbs');
    
    //middlewares
    
    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image') );
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());

    //routes

    routes(app);

    //static file 

 app.use('/public',express.static(path.join(__dirname,'../public')));


// errorhandler

if ('development' === app.get('env')) {
    app.use(errorHandler);
}

    return app;

}