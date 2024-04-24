import express from "express"
import {loginValidators, registerValidators} from "../utiles/validators/authValidator.js";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

router.post('/register', registerValidators, register)
router.post('/login', loginValidators,login)


export default router 