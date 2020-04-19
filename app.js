var express                 =   require("express"),
    mongoose                =   require("mongoose"),
    app                     =   express(),
    passport                =   require("passport"),
    LocalStrategy           =   require("passport-local"),
    bodyParser              =   require("body-parser"),
    passportLocalMongoose   =   require("passport-local-mongoose"),
    User                    =   require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app",{ useNewUrlParser: true,useUnifiedTopology: true });
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret:"MySecretKey",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//=========================
//ROUTES
//=========================

app.get("/",function(req,res){
    res.send("home");
});



app.listen(3000,function(req,res){
    console.log("server started");
});