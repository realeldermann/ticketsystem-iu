import express, { Request, Response } from 'express'
import Course from '../../db/schemas/Course.schema';
import { checkSessionUserIsAdmin } from '../auth/checkSession';
import { deleteCourse } from './deleteCourse';
let ErrorHandler = require('../error/ErrorHandler')

const router = express.Router()

router.post('/course', async (req: Request, res: Response) => { //erstellt eine neue Kategorie (if Admin = true)
    let sessionToken = req.headers.cookie
    if (sessionToken != null || sessionToken != undefined) { 
      console.log(req.body.course)
      if ((await checkSessionUserIsAdmin({ sessionToken })) == true) {
       try {
        const course = new Course({
          name: req.body.name,
          tutor: req.body.tutor
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

  router.delete('/course', async (req: Request, res: Response) => { //löscht eine Kategorie (if Admin = true)
    let sessionToken = req.headers.cookie
    if (sessionToken != null || sessionToken != undefined) { 
      console.log(req.body.course)
      if ((await checkSessionUserIsAdmin({ sessionToken })) == true) {
       try {
            await deleteCourse(req.body)
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