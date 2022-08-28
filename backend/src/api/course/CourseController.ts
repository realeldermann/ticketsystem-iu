import express, { Request, Response } from 'express'
import Course from '../../db/schemas/Course.schema';
let ErrorHandler = require('../error/ErrorHandler')

const router = express.Router()

router.post('/course/new', (req: Request, res: Response) => { //erstellt ein neuen Kurs
    var course = new Course(req.body);
    course.save((err: any) =>{
        if(err)
            res.sendStatus(500)
        else
            res.sendStatus(200)
    })
  })

module.exports = router;