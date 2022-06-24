import axios from "axios";
import { ConsultationsProps } from "./slices/consultationsSlice";

export function getUser() {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get("/users/get-user")
        .then(({ data }) => {
          const { user } = data;
          if (!user) reject(false);
          resolve(user);
        })
        .catch((err) => {
          console.error(err);
          reject(false);
        });
    } catch (error) {
      console.error(error);
      reject(false);
    }
  });
}

export async function getUserConsultations(userId:string):Promise<Array<ConsultationsProps>|false>{
    try {
        const {data} = await axios.get('/consultations/get-user-consultations');
        if(!data) throw new Error('No data exists');
        const {consultations} = data;
        return consultations
    } catch (error) {
        console.error(error);
        return false;
    }
}
