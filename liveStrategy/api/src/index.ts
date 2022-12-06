import mongoose from "mongoose";
import express from 'express';
import http from 'http';
import { config } from './config/config';

const app = express();

// Connect to Mongo
mongoose.set('strictQuery', true);
mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log("connected");
        // Starting the server
        startServer();
    })
    .catch((err) => {
        console.log(err);
    });

// Create server
const startServer = () => {
    app.use((req, res, next) => {
        console.log("Incoming request: " + req.url);

        res.on('finish', () => {
            console.log(res.statusCode);
        })

        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Rules of our API
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if(req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json();
        }

        next();
    });

    // Routes
    // ** To complete **

    // HealthCheck
    app.get('/api/ping', (req, res, next) => res.status(200).json({ message: "pong" }));

    // Error handling
    app.use((req, res, next) => {
        const error = new Error('not found');
        console.log(error);

        return res.status(404).json({ message: error.message });
    });

    // Starting to listen the requests
    http.createServer(app).listen(config.server.port, () => console.log(`listening on port ${config.server.port}...`))
}