import express from 'express';
import AuthRoute from './auth.route';
import ProductRoute from './product.route';
import UserRoute from './user.route';
import PermissionRoute from './permission.route';
import tableRoute from "./table.route";
import chartRoute from "./chart.route";
import exportRoute from "./export.route";

const router = express.Router();


router.use('/auth', AuthRoute);
router.use('/product', ProductRoute);
router.use('/user', UserRoute);
router.use('/permission', PermissionRoute);
router.use('/table', tableRoute)
router.use('/chart', chartRoute)
router.use('/export', exportRoute)

export default router