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

        let user = await db.user.findUnique({ where: { user_email: email } });

        if (!user) {
          user = await db.user.create({
            data: {
              user_name: profile.displayName,
              user_email: email,
              user_password: "", // Not needed for Google users
              user_mobile: "",
              auth_provider: "google",
              google_id: profile.id,
            },
          });
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