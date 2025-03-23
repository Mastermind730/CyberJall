/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

export async function verifyCaptcha(token:unknown) {
  try {
    const res = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    );
    if (res.data.success) {
      return "success!";
    } else {
      throw new Error("Failed Captcha");
    }
  } catch (error:unknown) {
    throw new Error("Failed to verify captcha");
  }
}