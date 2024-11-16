import express from 'express';
import {body} from 'express-validator';
import {errors} from '../constants/errors';
import checkValidationErrors from '../middlewares/checkValidationErrors';
import RejectController from '../controllers/reject.controller';
import checkAuth from "../middlewares/CheckAuth";
import checkPerrmission from "../middlewares/CheckPerrmission";
const router = express.Router();

router.post('/reject',
  checkAuth,
  checkPerrmission('SPRING_CHANGES_TO_SETTINGS_TAB'),
  body('name').notEmpty().withMessage(errors.REJECT_INVALID.description).isString().withMessage(errors.REJECT_INVALID.description),
  body('alias').notEmpty().withMessage(errors.REJECT_ALIAS_INVALID.description).isString().withMessage(errors.REJECT_ALIAS_INVALID.description),
  checkValidationErrors,
  RejectController.Add
)

router.put('/reject',
  checkAuth,
  checkPerrmission('SPRING_CHANGES_TO_SETTINGS_TAB'),
  body('id').isUUID().withMessage(errors.INVALID_ID.description),
  body('name').isString().withMessage(errors.REJECT_INVALID.description),
  body('alias').notEmpty().withMessage(errors.REJECT_ALIAS_INVALID.description).isString().withMessage(errors.REJECT_ALIAS_INVALID.description),
  body('active').isBoolean().withMessage(errors.ACTIVE_INVALID.description),
  checkValidationErrors,
  RejectController.Update
)

router.get('/reject',
  checkAuth,
  checkPerrmission('ACCESS_FILTERS'),
  RejectController.Get
)

router.put('/reject/move',
	checkAuth,
	checkPerrmission('SPRING_CHANGES_TO_SETTINGS_TAB'),
	body('overId').isInt().withMessage(errors.INVALID_MOVE_KEYS.description),
	body('activeId').isInt().withMessage(errors.INVALID_MOVE_KEYS.description),
	checkValidationErrors,
	RejectController.Move
)

export default router;