"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var connection_1 = require("./helpers/connection");
try {
    var Server = new connection_1.default(express);
    Server.appSetting();
    Server.startServer();
    Server.Router();
}
catch (err) {
    console.log('error server ', err);
    process.exit(1);
}
//# sourceMappingURL=app.js.map