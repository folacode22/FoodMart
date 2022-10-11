
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('./keys')
const db = require("../models/index");
const User = db.user;

passport.serializeUser((user, done) => {
  done(null,user.googleId || User.id);
});

passport.deserializeUser((id, done) => {
  const user = User.find(id)
    done(null, user);
});

// passport.deserializeUser((id, done) => {
//   User.findone(id).then((user) => {
//     done(null, user);
//   });
// });

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
          googleId: profile.id,
        },
      });
      if (socialUser) {
        return done(null, socialUser);
      }
     
      const newUser = await User.create({
        googleId: profile.id,
        username: profile.displayName,
        picture: profile._json.picture
      });
      done(null, newUser);
    }
  )
);


