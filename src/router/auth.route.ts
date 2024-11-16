import express from 'express';
import {body} from 'express-validator';
import AuthController from '../controllers/auth.controller';
import {errors} from '../constants/errors';
import checkValidationErrors from '../middlewares/checkValidationErrors';
const router = express.Router();

router.post('/login',
  body('email').toLowerCase().isEmail().withMessage(errors.EMAIL_INVALID.description),
  body('password').isLength({min:8, max:100}).withMessage(errors.PASSWORD_LENGTH_INVALID.description),
  checkValidationErrors,
  AuthController.Login
)

router.post('/registration',
  body('email').toLowerCase().isEmail().withMessage(errors.EMAIL_INVALID.description),
  body('name').isLength({min:1, max:100}).withMessage(errors.NAME_LENGTH_INVALID.description).not().matches(/^[a-zA-Z][\w\s-]+/).withMessage(errors.NAME_INVALID.description),
  body('lastname').isLength({min:1, max:100}).withMessage(errors.NAME_LENGTH_INVALID.description).not().matches(/^[a-zA-Z][\w\s-]+/).withMessage(errors.NAME_INVALID.description),
  body('patronymic').isLength({min:1, max:100}).withMessage(errors.NAME_LENGTH_INVALID.description).not().matches(/^[a-zA-Z][\w\s-]+/).withMessage(errors.NAME_INVALID.description),
  body('password').isLength({min:8, max:100}).withMessage(errors.PASSWORD_LENGTH_INVALID.description),
  checkValidationErrors,
  AuthController.Register
)

router.post('/sendResetPassword',
  body('email').toLowerCase().isEmail().withMessage(errors.EMAIL_INVALID.description),
  checkValidationErrors,
  AuthController.SendResetPassword
)

router.post('/resetPassword/:hash',
  body('password').isLength({min:8, max:100}).withMessage(errors.PASSWORD_LENGTH_INVALID.description),
  checkValidationErrors,
  AuthController.ResetPassword
)

router.post('/refresh',
  AuthController.Refresh
)

export default router;