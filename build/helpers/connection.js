"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
var mongoose = require("mongoose");
var body_parser_1 = require("body-parser");
var cors = require("cors");
var dotEnv = require("dotenv");
// Routes
var routes_1 = require("../routes");
/**
 *
 */
var Connection = /** @class */ (function () {
    function Connection(express) {
        this.app = null;
        this.express = null;
        dotEnv.config();
        this.app = express();
        this.express = express;
    }
    /**
     * TODO Return app
     * @param {any} express
     */
    Connection.prototype.appSetting = function () {
        this.app.use('/', this.express.static('view'));
        this.app.use(body_parser_1.json());
        this.app.use(body_parser_1.urlencoded({ extended: true }));
        this.app.use(function (err, _req, res, next) {
            if (err) {
                return res.sendStatus(400);
            }
            next();
        });
        this.app.use(cors());
        // this.app.use(express.static("public"));
    };
    ;
    /**
     *  TODO Connection Mongo
     * @param {number} port
     * @param {string} host
     * @param {string} dbName
     */
    Connection.prototype.mongoConnection = function (name, port, host) {
        if (name === void 0) { name = "typeScript"; }
        if (port === void 0) { port = 27017; }
        if (host === void 0) { host = "localhost"; }
        mongoose.connect("mongodb://" + host + ":" + port + "/" + name, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true,
        }, function (err) {
            if (err) {
                console.log("Mongo Is Down");
            }
            else {
                console.log("Mongo Is Runnign On Port: " + Number(port));
            }
        });
    };
    ;
    /**
     *  TODO Server Runner
     * @param {any} app
     * @param {number} port
     * @param {string} message
     */
    Connection.prototype.startServer = function () {
        var _this = this;
        this.app.listen(process.env.PORT, function () {
            console.log("App Is Running On Port: ", process.env.PORT);
            _this.mongoConnection(process.env.MONGO_NAME, Number(process.env.MONGO_PORT), process.env.MONGO_HOST);
        });
    };
    ;
    Connection.prototype.Router = function () {
        this.app.use('/authorization', routes_1.default.authorization);
        // this.app.use('/product', Router.authorization);
        // this.app.use('/category', Router.authorization);
        // this.app.use('/users', Router.authorization);
        this.app.use('/pages', routes_1.default.render);
    };
    return Connection;
}());
exports.default = Connection;
//# sourceMappingURL=connection.js.map