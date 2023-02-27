const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

var corsOptions = {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8081",
};

app.use(cors(corsOptions));


// Connect to the MongoDB database
const db = require('./app/models');
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch((err) => {
        console.log('Cannot connect to the database!', err);
        process.exit();
    });

// Routes
require('./app/routes/invoice.routes')(app);


const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});