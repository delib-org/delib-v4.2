import axios from "axios";
import { ConsultationProps } from "../../model/consultationModelC";
import { Role } from "../../model/role";
import { MembershipPending } from "../slices/membersSlice";

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
  pending?:MembershipPending
}> {
  try {
    console.log('getConsultation')
    const { data } = await axios.get(
      `/cosultations/get-consultation?consultationId=${consultationId}`
    );
    console.log(data)
    if (!data) throw new Error("No data exists");
    const { consultation, userRole, error, redirect, pending } = data;
    if (consultation) {
      consultation.role = userRole;
    }
    return { consultation, error, redirect, pending };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
