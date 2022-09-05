import express, { Request, Response } from 'express'
import Status from '../../db/schemas/Status.schema';
import { checkSessionUserIsAdmin } from '../auth/checkSession';
import { deleteStatus } from './deleteStatus';
let ErrorHandler = require('../error/ErrorHandler')

const router = express.Router()

router.post('/status', async (req: Request, res: Response) => { //erstellt einen neuen Status (if Admin = true)
    let sessionToken = req.cookies.sessionToken
        if (sessionToken != null || sessionToken != undefined) { 
            if (await checkSessionUserIsAdmin({ sessionToken })) {
                try {
                    const course = new Status({
                    name: req.body.name
                    })
                    await course.save()
                    res.sendStatus(200)
                } catch(e) {
                    console.error(e);
                    throw new Error('Internal server error');
                }
            } else {
                res.sendStatus(403)
            }
        } else {
            res.sendStatus(403)
        }
})

router.delete('/status', async (req: Request, res: Response) => { //löscht einen Status (if Admin = true)
    let sessionToken = req.cookies.sessionToken
        if (sessionToken != null || sessionToken != undefined) { 
            if (await checkSessionUserIsAdmin({ sessionToken })) {
                try {
                    await deleteStatus(req.body._id)
                    res.sendStatus(200)
                } catch(e) {
                    console.error(e);
                    throw new Error('Internal server error');
                }
            } else {
                res.sendStatus(403)
            }
        } else {
            res.sendStatus(403)
        }
})

module.exports = router;