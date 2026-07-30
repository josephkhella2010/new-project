import express from "express";
import bcrypt from "bcrypt";
import UserTwo from "../../Mongoo/schemas/User.js";
import generateToken from "../../token/middleware/generateToken.js";

const router = express.Router();

router.post("/login-user", async (req, res) => {
  try {
    const fieldsArr = ["username", "password"];
    const Fields = [];
    const sms = [];

    const transferName = (name, isLower = false) => {
      if (!name) return "";
      return isLower ? name.trim().toLowerCase() : name.trim();
    };

    // Check if all fields are empty
    const allEmpty = fieldsArr.every((field) => !req.body[field]);

    if (allEmpty) {
      return res.status(400).json({
        message: ["Please fill all fields"],
        fields: fieldsArr,
      });
    }

    // Check individual fields
    for (const field of fieldsArr) {
      if (!req.body[field]) {
        sms.push(`Please fill ${field}`);
        Fields.push(field);
      }
    }

    if (Fields.length > 0) {
      return res.status(400).json({
        message: sms,
        fields: Fields,
      });
    }

    const login = transferName(req.body.username, true);
    const password = transferName(req.body.password);

    let existUser;

    // Login with Email
    if (login.includes("@")) {
      existUser = await UserTwo.findOne({ email: login });

      if (!existUser) {
        return res.status(404).json({
          message: ["Email is wrong"],
          fields: ["username"],
        });
      }
    }
    // Login with Username
    else {
      existUser = await UserTwo.findOne({ username: login });

      if (!existUser) {
        return res.status(404).json({
          message: ["Username is wrong"],
          fields: ["username"],
        });
      }
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.status(400).json({
        message: ["Password is incorrect"],
        fields: ["password"],
      });
    }

    // Generate JWT
    const token = generateToken(existUser);

    return res.status(200).json({
      message: ["User logged in successfully"],
      fields: [],
      user: existUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: [error.message],
    });
  }
});

export default router;
