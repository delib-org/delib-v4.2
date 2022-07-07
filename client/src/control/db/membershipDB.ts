import axios from "axios";
import { Role } from "../../model/role";
import { MembershipPending } from "../slices/membersSlice";

export async function getMembership(groupId: string): Promise<Role> {
  try {
    const { data } = await axios.get(
      `/memberships/get-membership?groupId=${groupId}`
    );
    const { membershipRole, error } = data;
    if (error) throw error;
    return membershipRole;
  } catch (error) {
    console.error(error);
    return Role.NONE;
  }
}

export async function getMembershipPending(
  groupId: string
): Promise<Array<MembershipPending>> {
  try {
    const { data } = await axios.get(
      `/memberships/get-pending?groupId=${groupId}`
    );
    console.log(data)
    const {
      pendings,
      error,
    }: { pendings: Array<MembershipPending>; error: any } = data;

    if (error) throw error;
    console.log(pendings)
    return pendings;
  } catch (error) {
    console.error(error);
    return [];
  }
}
