import express, { Request, Response } from 'express'
import Session from "../../db/schemas/Session.schema";
import { registrationHandler } from "./registrationHandler"
import { loginHandler } from "./loginHandler"
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


router.post('/registration', async (req: Request, res: Response) => {
    if (await registrationHandler(req.body) === true) {
        res.sendStatus(200)
    }
    else 
        res.sendStatus(500)
    })
  
module.exports = router;