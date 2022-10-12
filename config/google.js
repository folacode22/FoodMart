
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('./keys')
const db = require("../models/index");
const User = db.user;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = User.findByPk(id)
    done(null, user);
});



passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
     
      const currentUser = await User.findOne({
        where:{googleId:profile.id}
      })

      if(currentUser){
        done(null, currentUser)
      }else{
        const newUser = await User.create({
          googleId: profile.id,
          username:profile.displayName,
        })

        done(null, newUser)
      }

 // console.log(currentUser)
    }
  )
);


