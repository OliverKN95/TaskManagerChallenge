import {Router} from 'express'
import * as eventsCtrl from '../controllers/events.controller'
import {authJwt} from '../middlewares'

const router = Router()

router.post('/create', [authJwt.verifyToken], eventsCtrl.createEvent);
router.get('/list', eventsCtrl.getEvents);
router.get('/list/:userId', eventsCtrl.getEventsByUser);
router.get('/get/:eventId', eventsCtrl.getEventById);
router.put('/update/:eventId', [authJwt.verifyToken], eventsCtrl.updateEventById);
router.delete('/delete/:eventId', [authJwt.verifyToken], eventsCtrl.deleteEventById);

export default router;