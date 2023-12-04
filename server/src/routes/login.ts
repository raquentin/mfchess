import { Request, Response } from "express";

const express = require("express");
const jwt = require("jsonwebtoken");
const {UserModel} = require('../models/Users');

let router = express.Router();

//* Login Route
router.post("/", (req: Request, res: Response) => {
    const token = req.body.token;
    const decoded = jwt.decode(token);
    console.log(decoded);

    //* Check if user is in DB, if not then create new.
    UserModel.find({userID:decoded.sub}, async (err: Error, result: Array<typeof UserModel>) => { 
      if (err) {
        res.status(400).json(err);
      } else if (result.length == 0){
        const user = {
          userID: decoded.sub,
          name: decoded.name,
          email: decoded.email,
          profilePictureUrl: decoded.picture,
          isAdmin: false, //default not an admin
        };
        const newUser = new UserModel(user);
        await newUser.save();
        res.status(200).json({sub:decoded.sub});
      } else {
        res.status(200).json({sub:decoded.sub});
      }
    });
});

router.post('/userInfo', (req: Request, res: Response) => {
  const userSub = req.body.sub;
  //console.log(userSub);
  UserModel.find({userID:userSub}, (err: Error, result: Array<typeof UserModel>) => { 
    if (err) {
      res.json(err);
    } else {
      res.json({result:result});
    }
  });
});

export default router
