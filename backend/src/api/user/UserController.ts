import express, { Request, Response } from 'express'
import Session from "../../db/schemas/Session.schema";
import { registrationHandler } from "./registrationHandler"
import { loginHandler } from "./loginHandler"
import { checkSessionUserIsAdmin } from '../auth/checkSession';
import { deleteSession } from '../auth/deleteSession';
let ErrorHandler = require('../error/ErrorHandler')

const router = express.Router()


router.post('/login', async (req: Request, res: Response) => { //login via E-Mail und Passwort if match gibt SessionToken als Cookie
    console.log(req.body)
    try {
        const session = await loginHandler(req.body)
        if (session) {
            res.setHeader('Set-Cookie', `sessionToken=${session}`)
            res.sendStatus(200)
        } else {
            res.sendStatus(403)
        }
    } catch(e) {
        console.error(e)
    }
})

router.delete('/logout', async (req: Request, res: Response) => { //nimmt SessionToken aus Cookie und löscht diesen in der Datenbank
    let sessionToken = req.cookies.sessionToken
        if (sessionToken != null || sessionToken != undefined) {
            try {
                await deleteSession({sessionToken})
                res.sendStatus(200)
            } catch(e) {
                console.error(e);
                throw new Error('Internal server error');
            }
        } else {
            res.sendStatus(404)
        }
})

router.post('/registration', async (req: Request, res: Response) => { //registrierung der User if (admin = true)
    let sessionToken = req.cookies.sessionToken
        if (sessionToken != null || sessionToken != undefined) {
            try {
                if (await checkSessionUserIsAdmin({ sessionToken })) {
                    if (await registrationHandler(req.body) == true) {
                        res.sendStatus(200)
                    } else {
                        res.sendStatus(500)
                    }
                } else {
                    res.sendStatus(403)
                }
            } catch(e) {
                console.error(e);
                throw new Error('Internal server error');
            }
        } else {
            res.sendStatus(403)
        }
})
  
module.exports = router;
