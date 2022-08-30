import express, { Request, Response } from 'express'
import Ticket from '../../db/schemas/Ticket.schema'
import { checkSessionCourseTutor, checkSessionUser, checkSessionUserCourses, checkSessionUserIsAdmin } from '../auth/checkSession'
import { findCourseTutor, findTutorCourseId } from '../course/findCourse'
import { deleteTicket } from './deleteTicket'
import { findOwnCourseTicket, findOwnTicket, findTicketByCourse, findTicketById, findTicketByPrio, findTicketByUser, findTicketCourseTutor, findTicketUserById } from './findTicket'
let ErrorHandler = require('../error/ErrorHandler')

const router = express.Router()

router.get('/tickets/own', async (req: Request, res: Response) => { //gibt Tickets zur Session aus
  let sessionToken = req.headers.cookie
    if (sessionToken != null || sessionToken != undefined) {
      try {
        const ticket = await findOwnTicket({sessionToken})
        res.send(ticket)
      } catch(e) {
        console.error(e);
        throw new Error('Internal server error');
        }
    } else {
        res.sendStatus(403)
    }

})

router.get('/tickets/own/course', async (req: Request, res: Response) => { //gibt Tickets des Kurses der Session aus
  let sessionToken = req.headers.cookie
    if (sessionToken != null || sessionToken != undefined) {
      try {
        const ticket = await findOwnCourseTicket({sessionToken})
        res.send(ticket)
     } catch(e) {
        console.error(e);
        throw new Error('Internal server error');
        }
    } else {
        res.sendStatus(403)
    } 
})

router.get('/tickets/id/find', async (req: Request, res: Response) => { //Ticket suche nach Ticket ID (if Admin = true)
  let sessionToken = req.headers.cookie
    if (sessionToken != null || sessionToken != undefined) {
      try {
        if ((await checkSessionUserIsAdmin({ sessionToken })) == true) {
          const ticket = await findTicketById(req.body)
          res.send(ticket)
        } else {
            res.sendStatus(403)
          }
      } catch(e) {
          console.error(e);
          throw new Error('Internal server error');
        }
    } else {
        res.sendStatus(403)
  }
})

router.get('/tickets/user/find', async (req: Request, res: Response) => { //Ticket suche nach User (if Admin = true)
  let sessionToken = req.headers.cookie
    if (sessionToken != null || sessionToken != undefined) {
      try {
        if ((await checkSessionUserIsAdmin({ sessionToken })) == true) {
          const ticket = await findTicketByUser(req.body)
          res.send(ticket)
        } else {
          res.sendStatus(403)
        } 
      } catch(e) {
          console.error(e);
          throw new Error('Internal server error');
          }
  } else {
      res.sendStatus(403)
  } 
})

router.get('/tickets/course/find', async (req: Request, res: Response) => { //Ticket suche nach Kurs (if Admin = true)
  let sessionToken = req.headers.cookie
    if (sessionToken != null || sessionToken != undefined) {
      try {
        if ((await checkSessionUserIsAdmin({ sessionToken })) == true) {
          const ticket = await findTicketByCourse(req.body.course)
          res.send(ticket)
        } else {
          res.sendStatus(403)
          }
      } catch(e) {
          console.error(e);
          throw new Error('Internal server error');
        }
    } else {
        res.sendStatus(403)
    } 
})

router.get('/tickets/prio', async (req: Request, res: Response) => { //Ticket nach Prio (if Tutor vom Kurs or Admin = true)
  let sessionToken = req.headers.cookie
    if (sessionToken != null || sessionToken != undefined) {
      try {
        if (((await checkSessionCourseTutor({sessionToken})?? '').toString() == (await checkSessionUser({sessionToken})?? '').toString() || ((await checkSessionUserIsAdmin({ sessionToken })) == true))) {
          if (req.body.priority !== '') {
            const ticket = await findTicketByPrio({sessionToken: sessionToken, priority: req.body.priority})
            res.send(ticket)
          } else {
            res.sendStatus(404)
          }
        } else {
          res.sendStatus(403)
          }
      } catch(e) {
          console.error(e);
          throw new Error('Internal server error');
        }
    } else {
        res.sendStatus(403)
    } 
})

router.post('/tickets', async (req: Request, res: Response) => { //erstellt ein neues Ticket if course = user course oder if Admin = true
  let sessionToken = req.headers.cookie
    if (sessionToken != null || sessionToken != undefined) { 
      console.log(req.body.course)
      if ((await checkSessionUserCourses({sessionToken})?? '').toString() == req.body.course || (await checkSessionUserIsAdmin({ sessionToken })) == true) {
       try {
        const ticket = new Ticket({
          title: req.body.title,
          created: new Date(),
          status: req.body.status,
          priority: req.body.priority,
          text: req.body.text,
          categorie: req.body.categorie,
          course: req.body.course,
          user: await checkSessionUser({sessionToken})
        })
        await ticket.save()
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

router.delete('/tickets', async (req: Request, res: Response) => { //löscht ein Ticket nach abfrage der Berechtigung (if TicketOwner, Tutor des Ticket Kurses oder if Admin = true)
  let sessionToken = req.headers.cookie
    if (sessionToken != null || sessionToken != undefined) { 
      if ((await checkSessionUser({sessionToken})?? '').toString() == (await findTicketUserById(req.body)?? '').toString() || (await checkSessionUser({sessionToken})?? '').toString() == (await findTicketCourseTutor(req.body)?? '').toString() || (await checkSessionUserIsAdmin({ sessionToken })) == true) {
       try {
          await deleteTicket(req.body)
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

//router.get('/test', async (req: Request, res: Response) => { //Test
// const test = await findTicketByCourse(req.body.course)
//  res.send(test)
//})
  
module.exports = router;