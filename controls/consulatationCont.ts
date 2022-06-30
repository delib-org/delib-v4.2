import mongoose from "mongoose";
import {
  ConsulationModel,
  ConsultationValidation,
} from "../model/consultationModel";

export async function addConsultation(req: any, res: any) {
  try {
    const { consultation } = req.body;
    if (!consultation) throw new Error("consultation is missing");
    const user = req.user;
    if (!user) throw new Error("creating user is missing");

    consultation.creator = user;

    const { value, error } = ConsultationValidation.validate(consultation);
    if (error) throw error;
    if (consultation._id) {
      const consultationDB = await ConsulationModel.findOneAndUpdate(
        { _id: consultation._id },
        consultation,
        {
          upsert: true, // Make this update into an upsert
        }
      );
      res.send({ success: true, consultation: consultationDB });
    } else {
      const newConsultation = new ConsulationModel(consultation);
      const consultationDB = await newConsultation.save();
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
    const consultationsDB = await ConsulationModel.find({
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
    const { consultationId } = req.query;
    if (!consultationId) throw new Error("consultationId is missing");
    const consultationDB = await ConsulationModel.findOne({
      _id: consultationId,
    });
    if (!consultationDB)
      throw new Error(`Consulatation id: ${consultationId} is missing in DB`);

    res.send({ success: true, consultation: consultationDB });
  } catch (err) {
    console.error(err);
    res.send({ error: err.message });
  }
}

const TextSchema = new mongoose.Schema({
  saveState: String
});

const TextModel = mongoose.model('texts',TextSchema);

export async function addText(req: any, res: any) {
  try {
    const { saveState } = req.body;
    if (!saveState) throw new Error("saveState is missing");
    const textDB = await TextModel.create({saveState});
    if (!textDB)
      throw new Error(`No text was saved`);

    res.send({ success: true, text:textDB });
  } catch (err) {
    console.error(err);
    res.send({ error: err.message });
  }
}

export async function getText(req: any, res: any) {
  try {
    const {textId} = req.query;
    console.log(textId)
    if (!textId) throw new Error("textId is missing");
    const textDB = await TextModel.findById(textId);
    if (!textDB)
      throw new Error("Text was not found ");

    res.send({ success: true, text: textDB });
  } catch (err) {
    console.error(err);
    res.send({ error: err.message });
  }
}
