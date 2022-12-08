import express from 'express';
import controller from '../controllers/Coinconfig';

const router = express.Router();

router.post('/create', controller.createCoinconfig);
router.get('/get/:coinconfigId', controller.readCoinconfig);
router.get('/get/', controller.readAll);
router.patch('/update/:coinconfigId', controller.updateCoinconfig);
router.delete('/delete/:coinconfigId', controller.deleteCoinconfig);

export = router;