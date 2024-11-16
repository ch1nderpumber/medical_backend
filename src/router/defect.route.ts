import express from 'express';
import DefectController from '../controllers/defect.controller';
import checkAuth from '../middlewares/CheckAuth';
import {body} from "express-validator";
import {errors} from "../constants/errors";
import checkPerrmission from "../middlewares/CheckPerrmission";

const router = express.Router();

router.post('/defect',
  checkAuth,
  checkPerrmission('INTRODUCING_DEFECTS'),
  DefectController.Add
)

router.get('/defect',
	checkAuth,
	checkPerrmission('VIEW_PRODUCTS_TAB'),
	DefectController.Get
)

router.put('/defect',
	checkAuth,
	checkPerrmission('CHANGING_NUMBERS_INTRODUCED_DEFECTS'),
	body('count').notEmpty().withMessage(errors.INVALID_NUMBER.description).isInt({min: 0}).withMessage(errors.INVALID_NUMBER.description),
	DefectController.Update
)

router.delete('/defect/:id',
	checkAuth,
	checkPerrmission('CHANGING_NUMBERS_INTRODUCED_DEFECTS'),
	DefectController.Delete
)


export default router;