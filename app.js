import express from 'express';
import env from 'dotenv';
import mongoose from 'mongoose';

env.config();
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('open', () => console.log('Database connected.'));

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
