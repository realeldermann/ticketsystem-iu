import express, { Request, Response } from 'express'
import Type from '../../db/schemas/Type.schema';
import { checkSessionUserIsAdmin } from '../auth/checkSession';
import { deleteType } from './deleteType';
let ErrorHandler = require('../error/ErrorHandler')

const router = express.Router()

router.post('/type', async (req: Request, res: Response) => { //erstellt eine neue Art (if Admin = true)
    let sessionToken = req.headers.cookie
        if (sessionToken != null || sessionToken != undefined) { 
            console.log(req.body.type)
            if ((await checkSessionUserIsAdmin({ sessionToken })) == true) {
                try {
                    const type = new Type({
                    name: req.body.name
                    })
                    await type.save()
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

router.delete('/type', async (req: Request, res: Response) => { //löscht eine Art via ID(if Admin = true)
    let sessionToken = req.headers.cookie
        if (sessionToken != null || sessionToken != undefined) { 
            if ((await checkSessionUserIsAdmin({ sessionToken })) == true) {
                try {
                    await deleteType(req.body._id)
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