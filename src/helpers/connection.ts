// Packages
import * as mongoose from "mongoose";
import { urlencoded, json } from "body-parser";
import * as cors from "cors";
import * as dotEnv from 'dotenv';

// Routes
import Router from '../routes';
import { any } from 'joi';

/**
 * 
 */
class Connection {
    app = null;
    express = null;

    constructor(express: any) {
        dotEnv.config();
        this.app = express();
        this.express = express;
    }

    /**
     * TODO Return app
     * @param {any} express
     */
    appSetting(): any {
        this.app.use('/', this.express.static('view'));
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
        this.app.use((err, _req, res, next) => {
            if (err) {
                return res.sendStatus(400);
            }
            next();
        });
        this.app.use(cors());
        // this.app.use(express.static("public"));
    };
    /**
     *  TODO Connection Mongo
     * @param {number} port
     * @param {string} host
     * @param {string} dbName
     */
    mongoConnection(
        name: string = "typeScript",
        port: number = 27017,
        host: string = "localhost"
    ): void {
        mongoose.connect(
            `mongodb://${host}:${port}/${name}`,
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
                useUnifiedTopology: true,
            },
            (err) => {
                if (err) {
                    console.log("Mongo Is Down");
                } else {
                    console.log(`Mongo Is Runnign On Port: ${Number(port)}`);
                }
            }
        );
    };

    /**
     *  TODO Server Runner
     * @param {any} app
     * @param {number} port
     * @param {string} message
     */
    startServer(): void {
        this.app.listen(process.env.PORT, () => {
            console.log(`App Is Running On Port: `, process.env.PORT);
            this.mongoConnection(process.env.MONGO_NAME, Number(process.env.MONGO_PORT), process.env.MONGO_HOST);
        });
    };

    Router(): void {
        this.app.use('/authorization', Router.authorization);
        // this.app.use('/product', Router.authorization);
        // this.app.use('/category', Router.authorization);
        // this.app.use('/users', Router.authorization);
        this.app.use('/pages', Router.render);
    }
}
export default Connection;

