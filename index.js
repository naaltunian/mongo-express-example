const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./Routes/userRoutes');

const app = express();

// bodyparser middleware
app.use(express.json());
app.use('/user', userRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to database"))
    .catch(err => console.error(err))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));