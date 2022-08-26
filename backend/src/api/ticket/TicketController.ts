import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import Ticket from '../../db/schemas/Ticket.schema'
import User from '../../db/schemas/User.schema'
import { deleteTicket } from './deleteTicket'
import { findTicketById } from './findTicket'
let ErrorHandler = require('../error/ErrorHandler')

const router = express.Router()

router.post('/tickets', (req: Request, res: Response) => { //gibt einfach alle Tickets aus
    Ticket.find((_err: any, ticket: any)=> {
      res.send(ticket);
    })
  })

router.post('/tickets/id/find', async (req: Request, res: Response) => { //gibt einfach alle Tickets aus
  const ticket = await findTicketById(req.body)
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

  router.post('/tickets/del', (req: Request, res: Response) => { //löscht ein Ticket
    deleteTicket(req.body)
  })
  
module.exports = router;