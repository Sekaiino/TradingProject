import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import User from "../models/User";

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, birthday, pseudo } = req.body;

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName,
        lastName,
        email,
        password,
        birthday,
        pseudo
    });

    return user
        .save()
        .then((user) => res.status(201).json({ user }))
        .catch((error) => res.status(500).json({ error }));
};

const readUser = (req: Request, res: Response, next: NextFunction) => {
    const UserId = req.params.userId;

    return User.findById(UserId)
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .then((user) => res.status(200).json({ user }))
        .catch((error) => res.status(500).json({ error }));
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => {
            if (user) {
                user.set(req.body);

                return user
                    .save()
                    .then((user) => res.status(201).json({ user }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findByIdAndDelete(userId)
        .then((user) => (user ? res.status(201).json({ user, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { createUser, readUser, readAll, updateUser, deleteUser };