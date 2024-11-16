import express from 'express';
import SizeRoute from './size.route';
import StyleRoute from './style.route';
import RejectRoute from './reject.route';
import DefectRoute from './defect.route';
import RoundRoute from './round.route';
import ShiftRoute from './shift.route';
import ProductController from "../controllers/product.controller";
import {body} from "express-validator";
import {errors} from "../constants/errors";
import checkAuth from "../middlewares/CheckAuth";
import checkPerrmission from "../middlewares/CheckPerrmission";
const router = express.Router();


router.get('/',
	checkAuth,
	checkPerrmission('VIEW_PRODUCTS_TAB'),
	ProductController.Get
)

router.put('/',
	checkAuth,
	checkPerrmission('ADD_AND_CHANGE_QUANTITY_PRODUCTS'),
	body('bars').notEmpty().withMessage(errors.INVALID_NUMBER.description).isInt({min: 0}).withMessage(errors.INVALID_NUMBER.description),
	ProductController.Update
)

router.use(SizeRoute);
router.use(StyleRoute);
router.use(RejectRoute);
router.use(DefectRoute);
router.use(RoundRoute);
router.use(ShiftRoute);

export default router;