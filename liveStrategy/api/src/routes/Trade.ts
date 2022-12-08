import express from 'express';
import controller from '../controllers/Trade';

const router = express.Router();

router.post('/create', controller.createTrade);
router.get('/get/:tradeId', controller.readTrade);
router.get('/get/', controller.readAll);
router.patch('/update/:tradeId', controller.updateTrade);
router.delete('/delete/:tradeId', controller.deleteTrade);

export = router;