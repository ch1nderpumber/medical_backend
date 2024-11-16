import express from 'express';
import {body} from 'express-validator';
import {errors} from '../constants/errors';
import SizeController from '../controllers/size.controller';
import checkValidationErrors from '../middlewares/checkValidationErrors';
import ShiftController from '../controllers/shift.controller';
import checkAuth from "../middlewares/CheckAuth";
import checkPerrmission from "../middlewares/CheckPerrmission";
const router = express.Router();

router.post('/shift',
  checkAuth,
  checkPerrmission('SPRING_CHANGES_TO_SETTINGS_TAB'),
  body('value').isInt().withMessage(errors.SHIFT_INVALID.description),
  checkValidationErrors,
  ShiftController.Add
)

router.put('/shift',
  checkAuth,
  checkPerrmission('SPRING_CHANGES_TO_SETTINGS_TAB'),
  body('id').isUUID().withMessage(errors.INVALID_ID.description),
  body('value').isInt().withMessage(errors.SHIFT_INVALID.description),
  body('active').isBoolean().withMessage(errors.ACTIVE_INVALID.description),
  checkValidationErrors,
  ShiftController.Update
)

router.get('/shift',
  checkAuth,
  checkPerrmission('ACCESS_FILTERS'),
  ShiftController.Get
)

export default router;