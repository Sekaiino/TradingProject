import express from 'express';
import controller from '../controllers/Transactions';

const router = express.Router();

router.post('/create', controller.createTransactions);
router.get('/get/:transactionsId', controller.readTransactions);
router.get('/get/', controller.readAll);
router.patch('/update/:transactionsId', controller.updateTransactions);
router.delete('/delete/:transactionsId', controller.deleteTransactions);

export = router;