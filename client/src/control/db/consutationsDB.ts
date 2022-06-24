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

export async function getConsultation(consultationId:string):Promise<ConsultationProps|false>{
    try {
        const {data} = await axios.get(`/cosultations/get-consultation?consultationId=${consultationId}`);
        if(!data) throw new Error('No data exists');
        const {consultation} = data;
        if(!consultation) throw new Error("No consultation in data")
        return consultation
    } catch (error) {
        console.error(error);
        return false;
    }
}