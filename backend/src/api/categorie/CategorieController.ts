import express, { Request, Response } from 'express'
import Categorie from '../../db/schemas/Categorie.schema';
import { checkSessionUser, checkSessionUserIsAdmin } from '../auth/checkSession';
import { deleteCategorie } from './deleteCategorie';
import { findAllCategories } from './findCategorie';
let ErrorHandler = require('../error/ErrorHandler')

const router = express.Router()

router.post('/categorie', async (req: Request, res: Response) => { //erstellt eine neue Kategorie (if Admin = true)
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

router.get('/categorie', async (req: Request, res: Response) => { //gibt alle Kategorien aus
  let sessionToken = req.headers.cookie
    if (sessionToken != null || sessionToken != undefined) {
      if (await checkSessionUser({sessionToken}) != undefined) {
        try {
          const categorie = await findAllCategories({})
          res.send(categorie)
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
  let sessionToken = req.cookies.sessionToken
    if (sessionToken != null || sessionToken != undefined) { 
      if ((await checkSessionUserIsAdmin({ sessionToken })) == true) {
       try {
        await deleteCategorie({_id: req.body._id})
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