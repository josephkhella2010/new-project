import express from "express";
import UserTwo from "../../Mongoo/schemas/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

// ===============================
// SEND CODE
// ===============================
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserTwo.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        message: ["Email does not exist"],
      });
    }

    const code = Math.floor(10000 + Math.random() * 90000);

    const expire = new Date(Date.now() + 60 * 1000);

    user.verificationCode = code;
    user.codeExpire = expire;

    await user.save();

    /* 
    //console.log("CODE:", code);
    //console.log("EXPIRE:", expire); */

    return res.status(200).json({
      message: ["Code sent successfully"],
      resetToken: user._id,
      // testing only
      code,
      expire,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: ["Server error"],
    });
  }
});

// ===============================
// CHECK CODE
// ===============================
router.post("/check-code", async (req, res) => {
  const { resetToken, code } = req.body;

  try {
    const user = await UserTwo.findById(resetToken);

    if (!user) {
      return res.status(404).json({
        message: ["User not found"],
      });
    }

    if (!user.codeExpire) {
      return res.status(400).json({
        message: ["No active code"],
      });
    }

    if (Date.now() > user.codeExpire.getTime()) {
      return res.status(400).json({
        message: ["Code expired"],
      });
    }

    if (Number(code) !== Number(user.verificationCode)) {
      return res.status(400).json({
        message: ["Wrong code"],
      });
    }

    // ✅ CODE IS CORRECT
    // remove verification timer/code
    user.verificationCode = null;
    user.codeExpire = null;

    await user.save();

    return res.status(200).json({
      message: ["Correct code"],
      resetToken: user._id,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: ["Server error"],
    });
  }
});

// ===============================
// RESEND CODE
// ===============================
router.post("/resend-code", async (req, res) => {
  const { resetToken } = req.body;

  try {
    const user = await UserTwo.findById(resetToken);

    if (!user) {
      return res.status(404).json({
        message: ["User not found"],
      });
    }

    const newCode = Math.floor(10000 + Math.random() * 90000);

    const newExpire = new Date(Date.now() + 60 * 1000);

    user.verificationCode = newCode;
    user.codeExpire = newExpire;

    await user.save();

    return res.status(200).json({
      message: ["New code sent"],

      // testing only
      code: newCode,
      expire: newExpire,
    });
  } catch (error) {
    return res.status(500).json({
      message: ["Server error"],
    });
  }
});

// ===============================
// CHANGE PASSWORD
// ===============================
router.post("/change-password", async (req, res) => {
  const { resetToken, password } = req.body;

  try {
    const user = await UserTwo.findById(resetToken);

    if (!user) {
      return res.status(404).json({
        message: ["User not found"],
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    // remove old code
    user.verificationCode = null;
    user.codeExpire = null;

    await user.save();

    return res.status(200).json({
      message: ["Password changed successfully"],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;
