import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import Transactions from "../models/Transactions";

const createTransactions = (req: Request, res: Response, next: NextFunction) => {
    const { pairSymbol, sl, buyQuantity, buyPrice, totalSpend, side, date } = req.body;

    const transactions = new Transactions({
        _id: new mongoose.Types.ObjectId(),
        pairSymbol,
        sl,
        buyQuantity,
        buyPrice,
        totalSpend,
        side,
        date
    });

    return transactions
        .save()
        .then((transactions) => res.status(201).json({ transactions }))
        .catch((error) => res.status(500).json({ error }));
};

const readTransactions = (req: Request, res: Response, next: NextFunction) => {
    const TransactionsId = req.params.TransactionsId;

    return Transactions.findById(TransactionsId)
        .then((transactions) => (transactions ? res.status(200).json({ transactions }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Transactions.find()
        .then((transactions) => res.status(200).json({ transactions }))
        .catch((error) => res.status(500).json({ error }));
};

const updateTransactions = (req: Request, res: Response, next: NextFunction) => {
    const TransactionsId = req.params.TransactionsId;

    return Transactions.findById(TransactionsId)
        .then((transactions) => {
            if (transactions) {
                transactions.set(req.body);

                return transactions
                    .save()
                    .then((transactions) => res.status(201).json({ transactions }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteTransactions = (req: Request, res: Response, next: NextFunction) => {
    const TransactionsId = req.params.TransactionsId;

    return Transactions.findByIdAndDelete(TransactionsId)
        .then((transactions) => (transactions ? res.status(201).json({ transactions, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { createTransactions, readTransactions, readAll, updateTransactions, deleteTransactions };