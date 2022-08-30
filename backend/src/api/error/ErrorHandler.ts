import express, { Request, Response, } from 'express';

let ErrorHandler = (_err: any, _req: Request, _res: Response, _next: any) => { //Soll errors ausgeben (ist noch nicht richtig funktionstüchtig)
    _res.status(_err.status);
    _res.send(_err);
    console.log('\n<<<<<<<<   Error Occurred   >>>>>>>>');
    console.log('Status: ' + _err.status);
    console.log('Message: ' + _err.error);
    console.log('\n' + JSON.stringify(_err) + '\n');

    _next();
};

module.exports = ErrorHandler;