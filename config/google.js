require("dotenv").config()
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('./keys')
const db = require("../models/index");
const User = db.user;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
 User.findByPK(id).then((user) => {
   done(null, user);
 });
 })



passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      const socialUser = await User.findOne({
        where: {
          socialID: profile.id,
        },
      });
      if (socialUser) {
        return done(null, socialUser);
      }
      const user = await new User({
        socialID: profile.id,
        username: profile.displayName,
        Picture: profile._json.picture,
        email: profile.emails,
      }).save();
      done(null, user);
    }
  )
);