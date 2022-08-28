import express, { Request, Response } from 'express'
import Categorie from '../../db/schemas/Categorie.schema';
let ErrorHandler = require('../error/ErrorHandler')

const router = express.Router()

router.post('/categorie/new', (req: Request, res: Response) => { //erstellt eine neue Kategorie
    var categorie = new Categorie(req.body);
    categorie.save((err: any) =>{
        if(err)
            res.sendStatus(500)
        else
            res.sendStatus(200)
    })
  })

module.exports = router;