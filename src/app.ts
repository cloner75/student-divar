import * as express from 'express';
import Connection from './helpers/connection';

try {
    const Server = new Connection(express);
    Server.appSetting();
    Server.startServer();
    Server.Router();
} catch (err) {
    console.log('error server ', err);
    process.exit(1);
}