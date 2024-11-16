import express from 'express';
import {body, query} from 'express-validator';
import {errors} from '../constants/errors';
import checkValidationErrors from '../middlewares/checkValidationErrors';
import PermissionController from '../controllers/permission.controller';
import checkAuth from "../middlewares/CheckAuth";
import checkPerrmission from "../middlewares/CheckPerrmission";
const router = express.Router();

router.post('/give',
  checkAuth,
  checkPerrmission('VIEW_AND_CHANGE_USERS'),
  body('userId').isUUID().withMessage(errors.INVALID_ID.description),
  body('permissionId').isUUID().withMessage(errors.INVALID_ID.description),
  checkValidationErrors,
  PermissionController.Give
)

router.post('/takeAway',
  checkAuth,
  checkPerrmission('VIEW_AND_CHANGE_USERS'),
  body('userId').isUUID().withMessage(errors.INVALID_ID.description),
  body('permissionId').isUUID().withMessage(errors.INVALID_ID.description),
  checkValidationErrors,
  PermissionController.TakeAway
)

router.get('/',
  checkAuth,
  query('userId').isUUID().withMessage(errors.INVALID_ID.description),
  checkValidationErrors,
  PermissionController.Get
)

router.get('/getAllAvailable',
  checkAuth,
  PermissionController.GetAllAvailable
)

export default router;