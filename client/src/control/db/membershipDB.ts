import axios from "axios";
import { Role } from "../../model/role";

export async function getMembership(groupId: string): Promise<Role> {
  try {
    
    const { data } = await axios.get(`/memberships/get-membership?groupId=${groupId}`);
    const { membershipRole, error } = data;
    if (error) throw error;
    return membershipRole;
  } catch (error) {
    console.error(error);
    return Role.NONE;
  }
}
