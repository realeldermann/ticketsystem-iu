import express, { Request, Response } from 'express'
import Ticket from '../../db/schemas/Ticket.schema'
import { findAnnotation } from '../annotation/findAnnotation'
import { annotationHandler } from '../annotation/newAnnotation'
import { checkSessionCourseTutor, checkSessionUser, checkSessionUserCourses, checkSessionUserIsAdmin } from '../auth/checkSession'
import { findTypeById } from '../type/findType'
import { deleteTicket } from './deleteTicket'
import { findOwnCourseTicket, findOwnTicket, findOwnTicketAnnotationById, findTicketByCourse, findTicketById, findTicketByPrio, findTicketByUser, findTicketCourseById, findTicketCourseTutor, findTicketTypeById, findTicketUserById } from './findTicket'
import { updateTicketAnnotation, updateTicketCategorie, updateTicketCourse, updateTicketOwner, updateTicketPriority, updateTicketStatus, updateTicketText, updateTicketTitle } from './updateTicket'
let ErrorHandler = require('../error/ErrorHandler')

const router = express.Router()

router.get('/tickets/own', async (req: Request, res: Response) => { //gibt Tickets zur Session aus
  let sessionToken = req.cookies.sessionToken
  console.log(req.cookies.sessionToken)
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

router.get('/tickets/annotations', async (req: Request, res: Response) => { //gibt Ticket annotations nach ID aus
  let sessionToken = req.cookies.sessionToken
    if (sessionToken != null || sessionToken != undefined) {
      try {
        const annotationId = await findOwnTicketAnnotationById({_id: req.body._id})
        if (annotationId != null || annotationId != undefined) {
          const annotation = await findAnnotation({_id: annotationId})
          res.send(annotation)
        } else {
          res.sendStatus(404)
        }
      } catch(e) {
        console.error(e);
        throw new Error('Internal server error');
        }
    } else {
        res.sendStatus(403)
    }

})

router.get('/tickets/own/course', async (req: Request, res: Response) => { //gibt Tickets des Kurses der Session aus
  let sessionToken = req.cookies.sessionToken
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

router.post('/tickets/id/find', async (req: Request, res: Response) => { //Ticket suche nach Ticket ID (if Admin = true)
  let sessionToken = req.cookies.sessionToken
    if (sessionToken != null || sessionToken != undefined) {
      try {
        if (await checkSessionUserIsAdmin({ sessionToken })) {
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
  let sessionToken = req.cookies.sessionToken
    if (sessionToken != null || sessionToken != undefined) {
      try {
        if (await checkSessionUserIsAdmin({ sessionToken })) {
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
  let sessionToken = req.cookies.sessionToken
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
  let sessionToken = req.cookies.sessionToken
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

router.get('/tickets/type', async (req: Request, res: Response) => { //Ticket Type via ID
  let sessionToken = req.cookies.sessionToken
    if (sessionToken != null || sessionToken != undefined) {
      try {
        if (((await checkSessionCourseTutor({sessionToken})?? '').toString() == (await checkSessionUser({sessionToken})?? '').toString() || ((await checkSessionUserCourses({sessionToken})?? '').toString() == (await findTicketCourseById({_id: req.body._id})?? '').toString()) || ((await checkSessionUserIsAdmin({ sessionToken })) == true))) {
          if (req.body._id !== '') {
            const typeId = (await findTicketTypeById({_id: req.body._id})?? '').toString()
            const type = await findTypeById({_id: typeId})
            res.send(type)
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
  let sessionToken = req.cookies.sessionToken
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
          annotation: null,
          type: req.body.type,
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

router.post('/tickets/annotation', async (req: Request, res: Response) => { //erstellt eine neue Ticket anmerkung / Kommentar if course = user course oder if Admin = true
  let sessionToken = req.cookies.sessionToken
    if (sessionToken != null || sessionToken != undefined) { 
      if (((await checkSessionUserCourses({sessionToken})?? '').toString() == (await findTicketCourseById(req.body._id))) || ((await checkSessionCourseTutor({sessionToken})?? '').toString() == (await findTicketCourseTutor(req.body._id)?? '').toString()) || ((await checkSessionUserIsAdmin({ sessionToken })) == true)) {
       try {
          await Ticket.findByIdAndUpdate(
            { _id: req.body._id},
              {annotation: 
                (await annotationHandler({
                text: req.body.text,
                user: (await checkSessionUser({sessionToken})?? '').toString()
              }))
            })
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
  let sessionToken = req.cookies.sessionToken
    if (sessionToken != null || sessionToken != undefined) { 
      if ((await checkSessionUser({sessionToken})?? '').toString() == (await findTicketUserById(req.body)?? '').toString() || (await checkSessionUser({sessionToken})?? '').toString() == (await findTicketCourseTutor(req.body)?? '').toString() || (await checkSessionUserIsAdmin({ sessionToken })) == true) {
       try {
          await deleteTicket(req.body._id)
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

router.post('/tickets/update/title', async (req: Request, res: Response) => { //ändert den Titel eines Tickets by ID
  try {
    await updateTicketTitle(req.body)
    res.sendStatus(200)
  } catch(e) {
    console.error(e);
    throw new Error('Internal server error');
  }
})

router.post('/tickets/update/text', async (req: Request, res: Response) => {//ändert den Text eines Tickets by ID
  try {
    await updateTicketText(req.body)
    res.sendStatus(200)
  } catch(e) {
    console.error(e);
    throw new Error('Internal server error');
  }
})

router.post('/tickets/update/course', async (req: Request, res: Response) => {//ändert den Course eines Tickets by ID
  try {
    await updateTicketCourse(req.body)
    res.sendStatus(200)
  } catch(e) {
    console.error(e);
    throw new Error('Internal server error');
  }
})

router.post('/tickets/update/categorie', async (req: Request, res: Response) => {//ändert die Categorie eines Tickets by ID
  try {
    await updateTicketCategorie(req.body)
    res.sendStatus(200)
  } catch(e) {
    console.error(e);
    throw new Error('Internal server error');
  }
})

router.post('/tickets/update/priority', async (req: Request, res: Response) => {//ändert die Priorität eines Tickets by ID
  try {
    await updateTicketPriority(req.body)
    res.sendStatus(200)
  } catch(e) {
    console.error(e);
    throw new Error('Internal server error');
  }
})

router.post('/tickets/update/status', async (req: Request, res: Response) => {//ändert den Status eines Tickets by ID
  try {
    await updateTicketStatus(req.body)
    res.sendStatus(200)
  } catch(e) {
    console.error(e);
    throw new Error('Internal server error');
  }
})

router.post('/tickets/update/owner', async (req: Request, res: Response) => {//ändert Besitzer eines Tickets by ID
  try {
    await updateTicketOwner(req.body)
    res.sendStatus(200)
  } catch(e) {
    console.error(e);
    throw new Error('Internal server error');
  }
})

router.post('/tickets/update/annotation', async (req: Request, res: Response) => {//ändert die Annotation eines Tickets by ID
  try {
    await updateTicketAnnotation(req.body)
    res.sendStatus(200)
  } catch(e) {
    console.error(e);
    throw new Error('Internal server error');
  }
})


//router.get('/test', async (req: Request, res: Response) => { //Test
// const test = await findTicketByCourse(req.body.course)
//  res.send(test)
//})
  
module.exports = router;