import User from "../models/User.model.js";
import mongoose from "mongoose";
import UserModel from "../models/User.model.js";
import bcrypt from "bcryptjs";

export async function verifyUser(req, res, next) {
    try {
        const { email } = req.method == "GET" ? req.query : req.body;


        let exist = await UserModel.findOne({ email });
        if (!exist) return res.status(404).send({ error: "Can't find the User!" });
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
};

export async function signin(req, res, next) {
    console.log('Signin endpoint hit');
    const { username, name, password, email, mobileNo } = req.body;
    console.log(req.body);

    if (!username || !name || !password || !email || !mobileNo) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    if (password) {
        bcrypt.hash(password, 10)
            .then(hashedPassword => {

                const user = new UserModel({
                    username,
                    name,
                    password: hashedPassword,
                    email,
                    mobileNo
                })

                user.save()
                    .then(result => res.status(201).send({ msg: "User registered Successfully" }))
                    .catch(error => res.status(500).send(console.log(error)))

            })
            .catch((error) => {
                return res.status(500).send({
                    error: "Enable to hashed password"
                })
            })
    }


};


import jwt from 'jsonwebtoken';
import ENV from 'dotenv';

export async function login(req, res, next) {
    const { email, password } = req.body;

    try {
        UserModel.findOne({ email })
            .then(user => {
                if (!user) {
                    return res.status(404).send({ error: "Email Not Found" });
                }

                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        if (!passwordCheck) {
                            return res.status(400).send({ error: "Password not match!!" });
                        }

                        const token = jwt.sign({
                            userId: user._id,
                            email: user.email,
                        }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                            if (err) {
                                return res.status(500).send({ error: "Error generating token" });
                            }

                            res.cookie('token', token);
                            res.status(200).json({
                                message: "Login Successful",
                                access_token: token,
                                userId: user._id,
                                userEmail: user.email
                            });
                        });
                    })
                    .catch(error => {
                        return res.status(400).send({ error: "Password not match!!" });
                    });
            })
            .catch(error => {
                return res.status(404).send({ error: "Email Not Found" });
            });
    } catch (error) {
        return res.status(500).send({ error });
    }
};