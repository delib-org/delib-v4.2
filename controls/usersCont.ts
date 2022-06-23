import jwt from "jwt-simple";
import jwt_decode from "jwt-decode";
import UserModel, { UserProps } from "../model/userModel";
const Cryptr = require('cryptr');
const cryptSecret = process.env.CRYPT;
const cryptr = new Cryptr(cryptSecret);

export async function login(req, res) {
  try {
    console.log(req.body);
    const { credential } = req.body;

    if (!credential || typeof credential !== "string")
      throw new Error("Credentials should be a string");

    const decoded: UserProps = jwt_decode(credential);

    console.log(decoded);
    const { name, given_name, family_name, email, picture, sub } = decoded;
    const filter = { sub };

    const last_enter = new Date();

    const user = await UserModel.findOneAndUpdate(
      filter,
      { name, given_name, family_name, email, picture, sub, last_enter },
      {
        new: true,
        upsert: true, // Make this update into an upsert
      }
    );

    const secret = process.env.JWT_SECRET;
   
    const encoded = jwt.encode({ uid: sub }, secret);
    const hide = cryptr.encrypt(encoded)
    res.cookie("user",hide,{httpOnly:true, maxAge:6000000});
    res.send({ success: true, user:{sub,name, picture} });
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
}
