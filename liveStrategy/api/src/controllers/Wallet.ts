import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import Wallet from "../models/Wallet";

const createWallet = (req: Request, res: Response, next: NextFunction) => {
    const { totalBalance, date } = req.body;

    const wallet = new Wallet({
        _id: new mongoose.Types.ObjectId(),
        totalBalance,
        date
    });

    return wallet
        .save()
        .then((wallet) => res.status(201).json({ wallet }))
        .catch((error) => res.status(500).json({ error }));
};

const readWallet = (req: Request, res: Response, next: NextFunction) => {
    const walletId = req.params.walletId;

    return Wallet.findById(walletId)
        .then((wallet) => (wallet ? res.status(200).json({ wallet }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Wallet.find()
        .then((wallet) => res.status(200).json({ wallet }))
        .catch((error) => res.status(500).json({ error }));
};

const updateWallet = (req: Request, res: Response, next: NextFunction) => {
    const walletId = req.params.walletId;

    return Wallet.findById(walletId)
        .then((wallet) => {
            if (wallet) {
                wallet.set(req.body);

                return wallet
                    .save()
                    .then((wallet) => res.status(201).json({ wallet }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteWallet = (req: Request, res: Response, next: NextFunction) => {
    const walletId = req.params.walletId;

    return Wallet.findByIdAndDelete(walletId)
        .then((wallet) => (wallet ? res.status(201).json({ wallet, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { createWallet, readWallet, readAll, updateWallet, deleteWallet };