const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: "496497945558-7kug0tdajehogn0fekp77lpfjmucbqs1.apps.googleusercontent.com",
        // clientSecret: "AIzaSyBM86FyCwn8ZhipW7nuwzjOtcrlKCn-zkA", 
        clientSecret: "6ghx5O1a3eka2q5NCv_PNl7q", 
        callbackURL: "http://localhost:3300/users/auth/google/callback",
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('error in google strategy-passport', err); return;}
            console.log(accessToken, refreshToken);
            console.log(profile);

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err)
                    {
                        console.log('error in creating user google strategy-passport', err);
                         return;
                    }

                    return done(null, user);
                });
            }

        }); 
    }


));


module.exports = passport;
