import express from 'express';
import {body} from 'express-validator';
import {errors} from '../constants/errors';
import checkValidationErrors from '../middlewares/checkValidationErrors';
import RoundController from '../controllers/round.controller';
import checkAuth from "../middlewares/CheckAuth";
import checkPerrmission from "../middlewares/CheckPerrmission";
const router = express.Router();

router.post('/round',
  checkAuth,
  checkPerrmission('SPRING_CHANGES_TO_SETTINGS_TAB'),
  body('value').isInt().withMessage(errors.ROUND_INVALID.description),
  checkValidationErrors,
  RoundController.Add
)

router.put('/round',
  checkAuth,
  checkPerrmission('SPRING_CHANGES_TO_SETTINGS_TAB'),
  body('id').isUUID().withMessage(errors.INVALID_ID.description),
  body('value').isInt().withMessage(errors.ROUND_INVALID.description),
  body('active').isBoolean().withMessage(errors.ACTIVE_INVALID.description),
  checkValidationErrors,
  RoundController.Update
)

router.get('/round',
  checkAuth,
  checkPerrmission('ACCESS_FILTERS'),
  RoundController.Get
)

export default router;