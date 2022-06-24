import jwt from "jwt-simple";
import jwt_decode from "jwt-decode";
import UserModel, { UserProps } from "../model/userModel";
const Cryptr = require("cryptr");
const cryptSecret = process.env.CRYPT;
const cryptr = new Cryptr(cryptSecret);

export async function login(req: any, res: any) {
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

    const encoded = jwt.encode({ sub, name, picture }, secret);
    const hide = cryptr.encrypt(encoded);
    res.cookie("user", hide, { httpOnly: true, maxAge: 6000000 });
    res.send({ success: true, user: { sub, name, picture } });
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
}

export async function getUser(req: any, res: any) {
  try {
    const {user} = req;

    if(!user) throw new Error ('No user on request')
    res.send({ user });

  } catch (error) {
    console.log(error);
    res.send({ error: error.message, user:false });
  }
}

export async function decodeUser(req, res, next) {
  try {
    const { user } = req.cookies;
    if (!user) {
      req.user = false;
      next();
    }
    const show = cryptr.decrypt(user);

    const secret = process.env.JWT_SECRET;
    const userDecoded = jwt.decode(show, secret);

    req.user = userDecoded;
    next();
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
}
