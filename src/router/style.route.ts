import express from 'express';
import {body} from 'express-validator';
import {errors} from '../constants/errors';
import checkValidationErrors from '../middlewares/checkValidationErrors';
import StyleController from '../controllers/style.controller';
import checkAuth from "../middlewares/CheckAuth";
import checkPerrmission from "../middlewares/CheckPerrmission";
const router = express.Router();

router.post('/style',
  checkAuth,
  checkPerrmission('SPRING_CHANGES_TO_SETTINGS_TAB'),
  body('value').notEmpty().withMessage(errors.STYLE_INVALID.description).isString().withMessage(errors.STYLE_INVALID.description),
  checkValidationErrors,
  StyleController.Add
)

router.put('/style',
  checkAuth,
  checkPerrmission('SPRING_CHANGES_TO_SETTINGS_TAB'),
  body('id').isUUID().withMessage(errors.INVALID_ID.description),
  body('value').isString().withMessage(errors.STYLE_INVALID.description),
  body('active').isBoolean().withMessage(errors.ACTIVE_INVALID.description),
  checkValidationErrors,
  StyleController.Update
)

router.get('/style',
  checkAuth,
  checkPerrmission('ACCESS_FILTERS'),
  StyleController.Get
)

export default router;