const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

// Use EJS
app.set('view engine', 'ejs');

// Parse application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Parse application/json
app.use(bodyParser.json());

app.use(cookieParser('@darious'))
// Config express-session
app.use(session({
    secret:'Token security',
    resave:false, 
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));

// Use flash
app.use(flash());

// Routes 
app.get('/', (req, res) => {

    let nameError = req.flash("nameError");
    let pointsError = req.flash("pointsError"); 
    let emailError = req.flash("emailError");
    let passwordErrorOne = req.flash("passwordErrorOne"); 

    nameError = (nameError == undefined || nameError.length == 0 ) ? undefined : nameError;
    emailError = (emailError == undefined || emailError.length == 0 ) ? undefined : emailError;
    pointsError = (pointsError == undefined || pointsError.length == 0 ) ? undefined : pointsError;
    passwordErrorOne = (passwordErrorOne == undefined || passwordErrorOne.length == 0 ) ? undefined : passwordErrorOne;

    res.render('index', {emailError, nameError, pointsError, passwordErrorOne});

});

app.post('/form', (req, res) => {
    let {name, points, email, password } = req.body;

    let nameError;
    let pointsError;
    let emailError;
    let passwordErrorOne;

    if(email == undefined || email == ''){
        emailError = 'The email is not empty';
        req.flash('emailError', emailError);
        res.redirect('/');
    };

    if(name == undefined || name == ''){
        nameError = 'The name is not empty';
        req.flash('nameError', nameError);
        res.redirect('/');
    };

    if(password == undefined || password == ''){
        passwordErrorOne = 'The password is not empty';
        req.flash('passwordErrorOne', passwordErrorOne);
        res.redirect('/');
    };

    if(points == undefined || points == ''){
        pointsError = 'The points is not empty';
        req.flash('pointsError', pointsError);
        res.redirect('/');
    };

    if(emailError != undefined || nameError != undefined || pointsError != undefined || passwordErrorOne != undefined){
        req.flash('nameError, emailError, pointsError, passwordErrorOne', nameError, emailError,  pointsError, passwordErrorOne );
        res.render('index');
    }
    else{
        res.redirect('/');
    }

});

// Server application 
app.listen(3333, (err) => {
    if(err){
        console.log('Error, is not loading server...');
    }
    else {
        console.log(`Server is runing, in port 3333...`);
    }
})


