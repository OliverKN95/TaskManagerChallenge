import {Router} from 'express'
import * as eventsCtrl from '../controllers/events.controller'
import {verifyToken} from '../middlewares'

const router = Router()

router.post('/create', verifyToken, eventsCtrl.createEvent);
router.get('/list', eventsCtrl.getEvents);
router.get('/get/:eventId', eventsCtrl.getEventById);
router.put('/update/:eventId', verifyToken,eventsCtrl.updateEventById);
router.delete('/delete/:eventId', verifyToken,eventsCtrl.deleteEventById);

export default router;