import * as dotenv from "dotenv";
import { createError } from "../error.js";
import OpenAI from "openai";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    const result = await client.images.generate({
      prompt,
      n:1,
      size: "1024x1024",
      response_format: "b64_json",
      n: 1
    });

    const generatedImage = result.data[0].b64_json;

    return res.status(200).json({ photo: generatedImage });

  } catch (error) {
    next(
      createError(
        error.status || 500,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};
