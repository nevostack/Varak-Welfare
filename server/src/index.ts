import express, {Request, Response} from 'express';
import router from "./routes/index"
import dotenv from "dotenv"
import cors from 'cors';
import session from "express-session";
import passport from "passport";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(session({ secret: "your_secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api',router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

