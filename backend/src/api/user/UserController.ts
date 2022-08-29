import express, { Request, Response } from 'express'
import Session from "../../db/schemas/Session.schema";
import { registrationHandler } from "./registrationHandler"
import { loginHandler } from "./loginHandler"
import { checkSessionUserIsAdmin } from '../auth/checkSession';
let ErrorHandler = require('../error/ErrorHandler')

const router = express.Router()


router.post('/login', async (req: Request, res: Response) => {
    
    if (await loginHandler(req.body)) {
        const session = await loginHandler(req.body)
        res.setHeader('session', session)
        res.sendStatus(200)
    }
    else 
        res.sendStatus(500)
    })


router.post('/registration', async (req: Request, res: Response) => { //registrierung der User if (admin = true)
    let sessionToken = req.headers.cookie
    if (sessionToken != null || sessionToken != undefined) {
        try {
            if ((await checkSessionUserIsAdmin({ sessionToken })) == true) {
                if (await registrationHandler(req.body) == true) {
                    res.sendStatus(200)
                } else 
                    res.sendStatus(500)
                } else {
                    res.sendStatus(403)
                }
        } catch(e) {
            console.error(e);
            throw new Error('Internal server error');
            }
    } else {
        res.send("No Session found!")
    }
})
  
module.exports = router;
