import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";

async function registerUser(req, res) {
  try {
    console.log("Request Body:", req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.json({
      success: true,
      token,
      user: { name: newUser.name },
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required!" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({
        success: true,
        token,
        user: { name: user.name },
        message: "User logged in successfully!",
      });
    } else {
      return res.json({ success: false, message: "Invalid credentials!" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

async function userCredits(req, res) {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    return res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const payMentRazorPay = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const userData = await userModel.findById(userId);
    if (!userId || !userData) {
      return res.json({ success: false, message: "Missing Details!" });
    }
    let credits, plan, amount, date;
    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;
      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;
      default:
        return res.json({ success: false, message: "Invalid Plan!" });
    }
    date = Date.now();
    const transactionData = {
      userId,
      plan,
      amount,
      date,
      credits,
    };
    const newTransaction = await transactionModel.create(transactionData);
    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
      payment_capture: 1,
    };
    await razorpayInstance.orders.create(SchemaTypeOptions, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
      }
      return res.json({
        success: true,
        order,
        message: "Payment Successful!",
      });
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

async function verifyRazorPay(req, res) {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      const transactionData = await transactionModel.findById(
        orderInfo.receipt
      );
      if (transactionData.payment) {
        return res.json({
          success: false,
          message: "Payment already processed!",
        });
      }
      const userData = await transactionModel.findById(transactionData.userId);
      const creditBalance = userData.creditBalance + transactionData.credits;
      await userModel.findByIdAndUpdate(userData._id, { creditBalance });
      await transactionModel.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });
      res.json({ success: true, message: "Credits Added" });
    } else {
      return res.json({ success: false, message: "Payment Failed!" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

export {
  registerUser,
  loginUser,
  userCredits,
  payMentRazorPay,
  verifyRazorPay,
};
