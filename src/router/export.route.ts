
import express from 'express';
import {body} from 'express-validator';
import AuthController from '../controllers/auth.controller';
import {errors} from '../constants/errors';
import checkValidationErrors from '../middlewares/checkValidationErrors';
import TableController from "../controllers/table.controller";
import ExportController from "../controllers/export.controller";
import checkAuth from "../middlewares/CheckAuth";
import checkPerrmission from "../middlewares/CheckPerrmission";
const router = express.Router();

router.get('/',
	checkAuth,
	checkPerrmission('ACCESS_TO_EXPORT'),
	ExportController.ExportExel,
)


export default router;