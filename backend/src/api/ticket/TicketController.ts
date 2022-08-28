import express, { Request, Response } from 'express'
import Ticket from '../../db/schemas/Ticket.schema'
import { deleteTicket } from './deleteTicket'
import { findTicket, findTicketById, findTicketByUser } from './findTicket'
let ErrorHandler = require('../error/ErrorHandler')

const router = express.Router()

router.get('/tickets', async (req: Request, res: Response) => { //gibt Tickets zur Session aus
  const ticket = await findTicket(req.body)
  res.send(ticket)
  })

router.get('/tickets/id/find', async (req: Request, res: Response) => { //Ticket suche nach Ticket ID
  const ticket = await findTicketById(req.body)
  res.send(ticket)
  })
router.get('/tickets/user/find', async (req: Request, res: Response) => { //Ticket suche nach User
  const ticket = await findTicketByUser(req.body)
  res.send(ticket)
  })

router.post('/tickets/new', (req: Request, res: Response) => { //erstellt ein neues Ticket
    var ticket = new Ticket(req.body);
    ticket.save((err: any) =>{
        if(err)
            res.sendStatus(500)
        else
            res.sendStatus(200)
    })
  })

  router.post('/tickets/del', async (req: Request, res: Response) => { //löscht ein Ticket
    if (await deleteTicket(req.body) === true) {
      res.sendStatus(200)
  }
  else 
      res.sendStatus(500)
  })

//router.get('/test', async (req: Request, res: Response) => { //Test
//  const test = await checkSession(req.body)
//    res.send(test)
//})
  
module.exports = router;