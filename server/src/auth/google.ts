import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "../lib/db";
import jwt from "jsonwebtoken";

// Generate JWT token for authenticated users
export const generateToken = (user: any) => {
  return jwt.sign(
    { userId: user.user_id, email: user.user_email },
    process.env.JWT_SECRET || "fallback-secret",
    { expiresIn: "7d" }
  );
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/user/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create user in DB
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : undefined;
        if (!email) {
          return done(new Error("No email found in Google profile"), false);
        }

        // Get profile photo from Google
        const profilePhoto = profile.photos && profile.photos.length > 0 
          ? profile.photos[0].value 
          : undefined;

        let user = await db.user.findUnique({ where: { user_email: email } });

        if (!user) {
          // Create new user with profile photo
          user = await db.user.create({
            data: {
              user_name: profile.displayName,
              user_email: email,
              user_password: "", // Not needed for Google users
              user_mobile: "",
              auth_provider: "google",
              google_id: profile.id,
              user_avatar: profilePhoto, // Store the profile photo URL
            },
          });
        } else {
          // Update existing user with new profile photo if available
          if (profilePhoto) {
            user = await db.user.update({
              where: { user_email: email },
              data: { 
                user_avatar: profilePhoto,
                // Update auth provider if user was previously registered normally
                // but now using Google
                auth_provider: "google",
                google_id: profile.id
              }
            });
          }
        }

        return done(null, user);
      } catch (error) {
        return done(error as Error, false);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await db.user.findUnique({ where: { user_id: id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});