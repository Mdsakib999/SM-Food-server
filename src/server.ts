import mongoose from 'mongoose';
import app from './app';
import cors from 'cors';
import config from './app/config';
import { Server } from 'http';

let server: Server;

async function main() {
    try {
        await mongoose.connect(config.database_url as string, { dbName: 'smfood' });
        app.use(cors());
        server = app.listen(config.port, () => {
            console.log(`app is listening on port ${config.port}`);
        });
    } catch (err) {
        console.log(JSON.stringify(err));
    }
}

main();

process.on('unhandledRejection', (err) => {
    console.log(`😈 unhandledRejection is detected , shutting down ...`, err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on('uncaughtException', () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    process.exit(1);
});