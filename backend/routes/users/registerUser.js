import express from "express";
import UserTwo from "../../Mongoo/schemas/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register-user", async (req, res) => {
  try {
    // function
    const transferName = (name, isLower = false) => {
      if (!name) return "";

      if (isLower) {
        return name.trim().toLowerCase();
      }

      return name.trim();
    };

    // get data from body and format it
    const firstName = transferName(req.body.firstName, true);
    const lastName = transferName(req.body.lastName, true);
    const username = transferName(req.body.username, true);
    const email = transferName(req.body.email, true);
    const dateOfBirth = req.body.dateOfBirth;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const fieldsArr = [
      "firstName",
      "lastName",
      "username",
      "email",
      "dateOfBirth",
      "password",
      "confirmPassword",
    ];

    const Fields = [];
    const sms = [];

    const allFieldsEmpty = fieldsArr.every((field) => {
      return !req.body[field];
    });

    if (allFieldsEmpty) {
      return res.status(400).json({
        message: ["Please fill all your fields"],
        Fields: fieldsArr,
      });
    }

    for (const field of fieldsArr) {
      if (!req.body[field]) {
        sms.push(`Please Fill ${field}`);
        Fields.push(field);
      }
    }

    if (Fields.length > 0) {
      return res.status(400).json({
        message: sms,
        Fields,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: ["Password and confirm password do not match"],
        fields: ["password", "confirmPassword"],
      });
    }

    const existUserUsername = await UserTwo.findOne({ username });
    const existUserEmail = await UserTwo.findOne({ email });

    if (existUserUsername && existUserEmail) {
      return res.status(400).json({
        message: ["Username is already exist", "Email is already exist"],
        fields: ["username", "email"],
      });
    }

    if (existUserUsername) {
      return res.status(400).json({
        message: ["Username is already exist"],
        fields: ["username"],
      });
    }

    if (existUserEmail) {
      return res.status(400).json({
        message: ["Email is already exist"],
        fields: ["email"],
      });
    }

    const newUser = await UserTwo.create({
      firstName,
      lastName,
      username,
      email,
      dateOfBirth,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: ["User created successfully"],
      user: newUser,
      fields: [],
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
