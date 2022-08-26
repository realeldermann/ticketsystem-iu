"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let ErrorHandler = (_err, _req, _res, _next) => {
    _res.status(_err.status);
    _res.send(_err);
    console.log('\n<<<<<<<<   Error Occurred   >>>>>>>>');
    console.log('Status: ' + _err.status);
    console.log('Message: ' + _err.error);
    console.log('\n' + JSON.stringify(_err) + '\n');
    _next();
};
module.exports = ErrorHandler;
