
import express from 'express';
import {body} from 'express-validator';
import AuthController from '../controllers/auth.controller';
import {errors} from '../constants/errors';
import checkValidationErrors from '../middlewares/checkValidationErrors';
import TableController from "../controllers/table.controller";
import ChartController from "../controllers/chart.controller";
import checkAuth from "../middlewares/CheckAuth";
import checkPerrmission from "../middlewares/CheckPerrmission";
const router = express.Router();

router.get('/defectsPoretto',
	checkAuth,
	checkPerrmission('ACCESS_DEFECTS_TAB_AND_ANALYZE_DEFECTS'),
	ChartController.DefectPoretto
)

router.get('/defectAnalysis',
	checkAuth,
	checkPerrmission('ACCESS_DEFECTS_TAB_AND_ANALYZE_DEFECTS'),
	ChartController.DefectAnalysis
)




export default router;