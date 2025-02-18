import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:1001/api/users/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
        };
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

export default passport;
