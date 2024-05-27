import express from 'express';
import { connect } from 'mongoose';
import  connectDB  from './db.js';
import { configDotenv } from 'dotenv';
import articleRoute from './routes/articleRoute.js'

const app = express();

app.use(express.json());

app.use('/api', articleRoute)

configDotenv();

const PORT = process.env.PORT || 3000;
connectDB();

app.get('/', (req, res) => {
    res.send({'Hello World': 'Welcome to the Node.js World!'});
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});