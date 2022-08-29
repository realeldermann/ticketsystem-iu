import express, { Request, Response } from 'express'
import Ticket from '../../db/schemas/Ticket.schema'
import { checkSessionUser } from '../auth/checkSession'
import { deleteTicket } from './deleteTicket'
import { findOwnCourseTicket, findOwnTicket, findTicketById, findTicketByUser, findTicketUser } from './findTicket'
let ErrorHandler = require('../error/ErrorHandler')

const router = express.Router()

router.get('/tickets/own', async (req: Request, res: Response) => { //gibt Tickets zur Session aus
  let sessionToken = req.headers.cookie
  if (sessionToken != null) {
   try {
    const ticket = await findOwnTicket({sessionToken})
    res.send(ticket)
   } catch(e) {
    console.error(e);
    throw new Error('Internal server error');
}
  } else {
    res.send("No Session found!")
  }

  })

  router.get('/tickets/course', async (req: Request, res: Response) => { //gibt Tickets des Kurses der Session aus
    let sessionToken = req.headers.cookie
    if (sessionToken != null) {
     try {
      const ticket = await findOwnCourseTicket({sessionToken})
      res.send(ticket)
     } catch(e) {
      console.error(e);
      throw new Error('Internal server error');
  }
    } else {
      res.send("No Session found!")
    }
  
    })

router.get('/tickets/id/find', async (req: Request, res: Response) => { //Ticket suche nach Ticket ID
  const ticket = await findTicketById(req.body)
  res.send(ticket)
  })
router.get('/tickets/user/find', async (req: Request, res: Response) => { //Ticket suche nach User
  const ticket = await findTicketByUser(req.body)
  res.send(ticket)
  })

router.post('/tickets', (req: Request, res: Response) => { //erstellt ein neues Ticket
    var ticket = new Ticket(req.body);
    ticket.save((err: any) =>{
        if(err)
            res.sendStatus(500)
        else
            res.sendStatus(200)
    })
  })

router.delete('/tickets', async (req: Request, res: Response) => { //löscht ein Ticket
  let sessionToken = req.headers.cookie
    if (sessionToken != null) { 
      if ((await checkSessionUser({sessionToken}).toString()) ==  (await findTicketUser({sessionToken}).toString())) {
       try {
          await deleteTicket(req.body)
        res.sendStatus(200)
      } catch(e) {
        console.error(e);
        throw new Error('Internal server error');
      }
      } else {
        res.send("Not permitted")
      }
    } else {
      res.send("No Session found!")
    }
  })

//router.get('/test', async (req: Request, res: Response) => { //Test
//  const test = await checkSession(req.body)
//    res.send(test)
//})
  
module.exports = router;