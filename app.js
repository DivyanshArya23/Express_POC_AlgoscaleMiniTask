var express                 =   require("express"),
    mongoose                =   require("mongoose"),
    app                     =   express(),
    passport                =   require("passport"),
    LocalStrategy           =   require("passport-local"),
    bodyParser              =   require("body-parser"),
    passportLocalMongoose   =   require("passport-local-mongoose"),
    User                    =   require("./models/user");

mongoose.connect("mongodb://localhost/minitask_algoscale",{ useNewUrlParser: true,useUnifiedTopology: true });
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

//SIGNUP ROUTES

app.get("/register",function(req,res){
    res.render("register");
});


//handling user sign up
app.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.render("register");
        } else {
            passport.authenticate("local")(req,res,function(){
                res.send("Signed Up Succesfully");
                res.render("/show");
            });
        }
    });
});


//LOGIN ROUTES

//Login form at root
app.get("/",function(req,res){
    res.redirect("login");
});


//handle user login
app.get("/login",function(req,res){
    res.render("login");
});

//login logic
app.post("/login",passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/register"
}),function(req,res){
});



app.listen(3000,function(req,res){
    console.log("server started");
});