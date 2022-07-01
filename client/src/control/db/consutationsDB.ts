import axios from "axios";
import { ConsultationProps } from "../../model/consultationModelC";
import { Role } from "../../model/role";

export async function getUserConsultations(): Promise<
  Array<ConsultationProps> | false
> {
  try {
    const { data } = await axios.get("/cosultations/get-user-consultations");
    if (!data) throw new Error("No data exists");
    const { consultations } = data;
    return consultations;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getConsultation(
  consultationId: string
): Promise<{
  consultation?: ConsultationProps;
  error?: any;
  redirect?: string;
}> {
  try {
    const { data } = await axios.get(
      `/cosultations/get-consultation?consultationId=${consultationId}`
    );
    if (!data) throw new Error("No data exists");
    const { consultation, userRole, error, redirect } = data;
    if (consultation) {
      consultation.role = userRole;
    }
    return { consultation, error, redirect };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
