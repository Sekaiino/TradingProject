import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import Coinconfig from "../models/Coinconfig";

const createCoinconfig = (req: Request, res: Response, next: NextFunction) => {
    const { BTCUSDT, ETHUSDT, BNBUSDT, XRPUSDT, SOLUSDT } = req.body;

    const coinconfig = new Coinconfig({
        _id: new mongoose.Types.ObjectId(),
        BTCUSDT,
        ETHUSDT,
        BNBUSDT,
        XRPUSDT,
        SOLUSDT
    });

    return coinconfig
        .save()
        .then((coinconfig) => res.status(201).json({ coinconfig }))
        .catch((error) => res.status(500).json({ error }));
};

const readCoinconfig = (req: Request, res: Response, next: NextFunction) => {
    const coinconfigId = req.params.coinconfigId;

    return Coinconfig.findById(coinconfigId)
        .then((coinconfig) => (coinconfig ? res.status(200).json({ coinconfig }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Coinconfig.find()
        .then((coinconfig) => res.status(200).json({ coinconfig }))
        .catch((error) => res.status(500).json({ error }));
};

const updateCoinconfig = (req: Request, res: Response, next: NextFunction) => {
    const coinconfigId = req.params.coinconfigId;

    return Coinconfig.findById(coinconfigId)
        .then((coinconfig) => {
            if (coinconfig) {
                coinconfig.set(req.body);

                return coinconfig
                    .save()
                    .then((coinconfig) => res.status(201).json({ coinconfig }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteCoinconfig = (req: Request, res: Response, next: NextFunction) => {
    const coinconfigId = req.params.coinconfigId;

    return Coinconfig.findByIdAndDelete(coinconfigId)
        .then((coinconfig) => (coinconfig ? res.status(201).json({ coinconfig, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { createCoinconfig, readCoinconfig, readAll, updateCoinconfig, deleteCoinconfig };