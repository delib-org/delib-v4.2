import mongoose from "mongoose";
import ConsultaionModel, {
  ConsultationValidation,
  GroupType,
} from "../model/consultationModel";
import MembershipModel, { Membership, Role } from "../model/membershipModel";
import { User } from "../model/userModel";

export async function addConsultation(req: any, res: any) {
  try {
    const { consultation } = req.body;
    if (!consultation) throw new Error("consultation is missing");
    const user = req.user;
    if (!user) throw new Error("creating user is missing");

    consultation.creator = user;

    if (consultation._id) {
      const consultationDB = await ConsultaionModel.findOneAndUpdate(
        { _id: consultation._id },
        consultation,
        {
          upsert: true, // Make this update into an upsert
        }
      );

      res.send({ success: true, consultation: consultationDB });
    } else {
      const newConsultation = new ConsultaionModel(consultation);
      const consultationDB = await newConsultation.save();

      const newMembership = new MembershipModel({
        memberId: user.sub,
        groupId: consultationDB._id,
        role: Role.CREATOR,
      });
      console.log("newMembership:", newMembership);
      await newMembership.save();
      res.send({ success: true, consultation: consultationDB });
    }
  } catch (err) {
    console.error(err);
    res.send({ error: err.message });
  }
}

export async function getUserConsultations(req: any, res: any) {
  try {
    const user = req.user;
    if (!user) throw new Error("User is missing");
    const consultationsDB = await ConsultaionModel.find({
      create: { sub: user.sub },
    });
    if (!Array.isArray(consultationsDB))
      throw new Error("consulatations are not an array");

    res.send({ success: true, consultations: consultationsDB });
  } catch (err) {
    console.error(err);
    res.send({ error: err.message });
  }
}

export async function getConsultation(req: any, res: any) {
  try {
    const user = req.user;
    if (!user) throw new Error("No user in req");

    const { consultationId } = req.query;
    if (!consultationId) throw new Error("consultationId is missing");

    const [role, consultationDB] = await Promise.all([
      getUserRoleInConsultation(user, consultationId),
      ConsultaionModel.findOne({
        _id: consultationId,
      }),
    ]);
    // const consultationDB = await ConsultaionModel.findOne({
    //   _id: consultationId,
    // });

    if (!consultationDB)
      throw new Error(`Consulatation id: ${consultationId} is missing in DB`);

    //not a mebmer but the group is public, so register member to the group
    //if group is close, and the user has no role, redirect to ask to join group page
    //if the group is secret, and the user has no role, redirect to consultations
    if (role === Role.ADMIN || role === Role.CREATOR || role === Role.MEMBER) {
      res.send({ success: true, consultation: consultationDB, userRole: role });
    } else if (consultationDB.type === GroupType.PUBLIC) {

      console.log('user.sub',user.sub)
      await MembershipModel.create({
        memberId: user.sub,
        groupId: consultationId,
        role: Role.MEMBER,
      });
      res.send({
        success: true,
        consultation: consultationDB,
        userRole: Role.MEMBER,
      });
    } else if (consultationDB.type === GroupType.CLOSE) {
      //check if banned
      if (role === Role.BANNED) {
        res.send({
          success: false,
          redirect: `/consultations/consultation-not`,
        });
      } else {
        res.send({
          success: false,
          redirect: `/consultation-ask/${consultationDB._id}`,
        });
      }
    } else if (consultationDB.type === GroupType.SECRET) {
      res.send({ success: false, redirect: `/consultations/consultation-not` });
    } else {
      throw new Error("No role and no group type");
    }
  } catch (err) {
    console.error(err);
    res.send({ error: err.message });
  }
}

async function getUserRoleInConsultation(
  user: User,
  consultationId: string
): Promise<Role | false> {
  try {
    console.log("user", user);
    const membershipDB: Membership = await MembershipModel.findOne({
      memberId: user.sub,
      groupId: consultationId,
    });
    if (!membershipDB) return Role.NONE;
    if (!("role" in membershipDB))
      throw new Error(
        `No membership role for user ${user.name} in consultationId ${consultationId}`
      );
    return membershipDB.role;
  } catch (error) {
    console.error(`Error in getUserRoleInConsultation: ${error.message}`);
    return false;
  }
}

const TextSchema = new mongoose.Schema({
  saveState: String,
});

const TextModel = mongoose.model("texts", TextSchema);

export async function addText(req: any, res: any) {
  try {
    const { saveState } = req.body;
    if (!saveState) throw new Error("saveState is missing");
    const textDB = await TextModel.create({ saveState });
    if (!textDB) throw new Error(`No text was saved`);

    res.send({ success: true, text: textDB });
  } catch (err) {
    console.error(err);
    res.send({ error: err.message });
  }
}

export async function getText(req: any, res: any) {
  try {
    const { textId } = req.query;

    if (!textId) throw new Error("textId is missing");
    const textDB = await TextModel.findById(textId);
    if (!textDB) throw new Error("Text was not found ");

    res.send({ success: true, text: textDB });
  } catch (err) {
    console.error(err);
    res.send({ error: err.message });
  }
}
