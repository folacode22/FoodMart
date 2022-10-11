require('dotenv').config();
const express = require('express');
const passport = require("passport");
const passportSetup = require("./config/google")
const sequelize = require("./")
const cookieSession = require("cookie-session")
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const product = require("./routes/product.routes")

const userRoutes = require("./routes/user.routes")
const key =require("./config/keys")

const app = express();


const port = 2000

// app.use("view", express.static(__dirname));

app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [key.sessionKey.key],
  })
);
app.use(express.json());



app.use(passport.initialize());
app.use(passport.session());

const db = require("./models/index");





db.sequelize.authenticate().then(()=>{
    console.log('connected to postgres databae')
})
.catch(err=>{
    console.log('disconnected from postgres database');
    process.exit();
});

db.sequelize.sync()


// set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/api", userRoutes)
app.use("/api/item", product);


app.get("/", (req, res) => {
  res.render('home', { user: req.user });
});





app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})