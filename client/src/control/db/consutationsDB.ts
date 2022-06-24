import axios from 'axios';
import { ConsultationProps } from "../../model/consultationModelC";

export async function getUserConsultations():Promise<Array<ConsultationProps>|false>{
    try {
        const {data} = await axios.get('/cosultations/get-user-consultations');
        if(!data) throw new Error('No data exists');
        const {consultations} = data;
        return consultations
    } catch (error) {
        console.error(error);
        return false;
    }
}