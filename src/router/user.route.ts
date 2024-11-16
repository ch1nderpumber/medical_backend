import express from 'express';
import {body, param, query} from 'express-validator';
import {errors} from '../constants/errors';
import checkValidationErrors from '../middlewares/checkValidationErrors';
import UserController from '../controllers/user.controller';
import checkAuth from "../middlewares/CheckAuth";
import checkPerrmission from "../middlewares/CheckPerrmission";
const router = express.Router();

router.get('/',
  checkAuth,
  checkPerrmission('VIEW_AND_CHANGE_USERS'),
  query('limit').optional().isInt().withMessage(errors.VALUE_MUST_BE_INT.description),
  query('page').optional().isInt().withMessage(errors.VALUE_MUST_BE_INT.description),
  UserController.GetAll
)

router.post('/',
  checkAuth,
  checkPerrmission('VIEW_AND_CHANGE_USERS'),
  body('email').isEmail().withMessage(errors.EMAIL_INVALID.description),
  body('name').isLength({min:1, max:100}).withMessage(errors.NAME_LENGTH_INVALID.description).not().matches(/^[a-zA-Z][\w\s-]+/).withMessage(errors.NAME_INVALID.description),
  body('lastname').isLength({min:1, max:100}).withMessage(errors.NAME_LENGTH_INVALID.description).not().matches(/^[a-zA-Z][\w\s-]+/).withMessage(errors.NAME_INVALID.description),
  body('patronymic').isLength({min:1, max:100}).withMessage(errors.NAME_LENGTH_INVALID.description).not().matches(/^[a-zA-Z][\w\s-]+/).withMessage(errors.NAME_INVALID.description),
  body('password').isLength({min:8, max:100}).withMessage(errors.PASSWORD_LENGTH_INVALID.description),
  
  checkValidationErrors,
  UserController.Create
)

router.get('/:id',
  checkAuth,
  param('id').isUUID().withMessage(errors.INVALID_ID.description),
  checkValidationErrors,
  UserController.Get
)

router.delete('/:id',
  checkAuth,
  checkPerrmission('VIEW_AND_CHANGE_USERS'),
  param('id').isUUID().withMessage(errors.INVALID_ID.description),
  checkValidationErrors,
  UserController.Remove
)

router.put('/:id',
  checkAuth,
  checkPerrmission('VIEW_AND_CHANGE_USERS'),
  param('id').isUUID().withMessage(errors.INVALID_ID.description),
  body('email').optional().isEmail().withMessage(errors.EMAIL_INVALID.description),
  body('name').optional().isLength({min:1, max:100}).withMessage(errors.NAME_LENGTH_INVALID.description).not().matches(/^[a-zA-Z][\w\s-]+/).withMessage(errors.NAME_INVALID.description),
  body('lastname').optional().isLength({min:1, max:100}).withMessage(errors.NAME_LENGTH_INVALID.description).not().matches(/^[a-zA-Z][\w\s-]+/).withMessage(errors.NAME_INVALID.description),
  body('patronymic').optional().isLength({min:1, max:100}).withMessage(errors.NAME_LENGTH_INVALID.description).not().matches(/^[a-zA-Z][\w\s-]+/).withMessage(errors.NAME_INVALID.description),
  body('password').optional().isLength({min:8, max:100}).withMessage(errors.PASSWORD_LENGTH_INVALID.description),
  checkValidationErrors,
  UserController.Update
);


export default router;