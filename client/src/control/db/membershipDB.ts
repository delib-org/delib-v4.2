import axios from "axios";
import Joi from "joi";
import { Role, RoleValidate } from "../../model/role";
import {
  Membership,
  MembershipPending,
  MembershipStatus,
  membershipValidation,
} from "../slices/membersSlice";

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
    console.log(data);
    const {
      pendings,
      error,
    }: { pendings: Array<MembershipPending>; error: any } = data;

    if (error) throw error;
    console.log(pendings);
    return pendings;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function setMembership(
  role: Role,
  groupId: string | undefined,
  userSub: string
): Promise<{
  membership?: Membership;
  status?: MembershipStatus;
  error?: any;
}> {
  try {
    let { error } = RoleValidate.validate(role);
   
    if (error) throw error;
    error = undefined;
    if (!groupId) throw new Error("GroupId is missing");
    console.log("groupId", groupId);
    if (!userSub) throw new Error("No user sub");

    const { data }: any = await axios.post("/memberships/set-membership", {
      role,
      groupId,
      userSub,
    });
    if (!data) throw new Error("no data");
    const {
      status,
      membership,
    }: { status: MembershipStatus; membership: Membership } = data;

    error = membershipValidation.validate(membership).error;
    
    if (error) throw error;
    console.error(error)

    console.log(membership);

    return { membership, status };
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
}
