import express, { Request, Response } from 'express'
import Categorie from '../../db/schemas/Categorie.schema';
import { checkSessionUserIsAdmin } from '../auth/checkSession';
import { deleteCategorie } from './deleteCategorie';
let ErrorHandler = require('../error/ErrorHandler')

const router = express.Router()

router.post('/categorie', async (req: Request, res: Response) => { //erstellt eine neue Kategorie
    let sessionToken = req.headers.cookie
    if (sessionToken != null || sessionToken != undefined) { 
      if ((await checkSessionUserIsAdmin({ sessionToken })) == true) {
       try {
        const categorie = new Categorie({
          name: req.body.name
        })
        await categorie.save()
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

  router.delete('/categorie', async (req: Request, res: Response) => { //löscht eine Kategorie (if Admin = true)
    let sessionToken = req.headers.cookie
    if (sessionToken != null || sessionToken != undefined) { 
      if ((await checkSessionUserIsAdmin({ sessionToken })) == true) {
       try {
            await deleteCategorie(req.body)
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