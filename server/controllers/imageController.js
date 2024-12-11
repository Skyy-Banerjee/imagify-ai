import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

export async function generateImage(req, res) {
  try {
    const { userId, prompt } = req.body;
    const user = await userModel.findById(userId);
    if (!user || !prompt) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user or prompt" });
    }
    if (user.creditBalance === 0 || userModel.creditBalance < 0) {
      return res
        .status(403)
        .json({ success: false, message: "Insufficient credit balance" });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    //More details about the code on the clipDrop API Docs page
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;
    //Deducting the user's creditBalance by 1
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });
    res.json({
      success: true,
      message: "Image Generated!",
      creditBalance: user.creditBalance - 1,
      image: resultImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

