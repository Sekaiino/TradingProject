import express from 'express';
import controller from '../controllers/Wallet';

const router = express.Router();

router.post('/create', controller.createWallet);
router.get('/get/:walletId', controller.readWallet);
router.get('/get/', controller.readAll);
router.patch('/update/:walletId', controller.updateWallet);
router.delete('/delete/:walletId', controller.deleteWallet);

export = router;