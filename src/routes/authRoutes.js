import express from 'express'
import { signUp ,signin} from '../controller/authController.js';

const router = express.Router();
router.post('/sign-up', signUp)
router.post('/sign-in', signin)

export default router;