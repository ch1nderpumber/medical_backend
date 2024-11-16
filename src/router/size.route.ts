import express from 'express';
import {body} from 'express-validator';
import {errors} from '../constants/errors';
import SizeController from '../controllers/size.controller';
import checkValidationErrors from '../middlewares/checkValidationErrors';
import checkAuth from "../middlewares/CheckAuth";
import checkPerrmission from "../middlewares/CheckPerrmission";
const router = express.Router();

router.post('/size',
  checkAuth,
  checkPerrmission('SPRING_CHANGES_TO_SETTINGS_TAB'),
  body('value').notEmpty().withMessage(errors.SIZE_INVALID.description).isString().withMessage(errors.SIZE_INVALID.description),
  checkValidationErrors,
  SizeController.Add
)

router.put('/size',
  checkAuth,
  checkPerrmission('SPRING_CHANGES_TO_SETTINGS_TAB'),
  body('id').isUUID().withMessage(errors.INVALID_ID.description),
  body('value').isString().withMessage(errors.SIZE_INVALID.description),
  body('active').isBoolean().withMessage(errors.ACTIVE_INVALID.description),
  checkValidationErrors,
  SizeController.Update
)

router.get('/size',
  checkAuth,
  checkPerrmission('ACCESS_FILTERS'),
  SizeController.Get
)

export default router;