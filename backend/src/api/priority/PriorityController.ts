import express, { Request, Response } from 'express'
import Priority from '../../db/schemas/Priority.schema';
import { checkSessionUserIsAdmin } from '../auth/checkSession';
import { deletePriority } from './deletePriority';
let ErrorHandler = require('../error/ErrorHandler')

const router = express.Router()

router.post('/priority', async (req: Request, res: Response) => { //erstellt eine neue Priorität (if Admin = true)
    let sessionToken = req.cookies.sessionToken
        if (sessionToken != null || sessionToken != undefined) { 
            if (await checkSessionUserIsAdmin({ sessionToken })) {
                try {
                    const course = new Priority({
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

router.delete('/priority', async (req: Request, res: Response) => { //löscht eine Priorität (if Admin = true)
    let sessionToken = req.cookies.sessionToken
        if (sessionToken != null || sessionToken != undefined) { 
            if (await checkSessionUserIsAdmin({ sessionToken })) {
                try {
                    await deletePriority(req.body._id)
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