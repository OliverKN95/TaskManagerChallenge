import {Router} from 'express'
import * as userCtrl from '../controllers/users.controller'
import {authJwt, verifySignUp} from '../middlewares'

const router = Router()

router.get('/list', [authJwt.verifyToken, authJwt.isAgent], userCtrl.getUsers);
router.get('/get/:userId', [authJwt.verifyToken, authJwt.isAgent], userCtrl.getUserById);
router.delete('/delete/:userId', [authJwt.verifyToken, authJwt.isAgent], userCtrl.deleteUserById);


export default router;