import express, { Request, Response } from 'express'
import Annotation from '../../db/schemas/Annotation.schema';
import { checkSessionUser, checkSessionUserIsAdmin } from '../auth/checkSession';
let ErrorHandler = require('../error/ErrorHandler')

const router = express.Router()

module.exports = router;