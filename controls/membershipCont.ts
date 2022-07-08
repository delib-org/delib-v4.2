import MembershipModel, { Role, RoleValidate } from "../model/membershipModel";
import PendingModel from "../model/pendingModel";
import UserModel from "../model/userModel";

export async function getMembership(req: any, res: any): Promise<void> {
  try {
    const { groupId } = req.query;

    if (!groupId) throw new Error("No groupId");

    const user = req.user;
    if (!user) throw new Error("no user");

    //get membership
    const membershipDB = await MembershipModel.findOne({
      memberId: user.sub,
      groupId,
    });

    if (!membershipDB) membershipDB.role = Role.NONE;
    if (!membershipDB.role) throw new Error("no role in group");

    res.send({ ok: true, membershipRole: membershipDB.role });
  } catch (error) {
    console.error(`Error in getMembership: ${error.message}`);
    res.send({ error: error.message });
  }
}

export async function getPending(req: any, res: any): Promise<void> {
  try {
    const { groupId } = req.query;

    if (!groupId) throw new Error("No groupId");

    const user = req.user;
    if (!user) throw new Error("no user");

    //get membership
    const pendingsDB: Array<any> = await PendingModel.find({
      memberId: user.sub,
      groupId,
      status:{$in:['waiting','banned']}
    });

    res.send({ ok: true, pendings: pendingsDB });
  } catch (error) {
    console.error(`Error in getMembership: ${error.message}`);
    res.send({ error: error.message });
  }
}

export async function setMembership(req: any, res: any): Promise<void> {
  try {
    const { role, groupId, userSub } = req.body;

    //validations
    const { error } = RoleValidate.validate(role);
    if (error) throw error;
    if (!groupId || typeof groupId !== "string")
      throw new Error("groupId is not valid");
    if (!userSub || typeof userSub !== "string")
      throw new Error("userSub is not valid");

      const userDB = await UserModel.findOne({sub:userSub});
      if(!userDB) throw new Error('No user in DB')

    const searchTerm = { memberId: userSub };
    const pendingSearchTerm = { id: `${userSub}-${groupId}` };
    const status = (() => {
      if (role !== "banned") return "approved";
      else return "banned";
    })();


    const [membershipDB, pendingDB] = await Promise.all([
      MembershipModel.findOneAndUpdate(
        searchTerm,
        { role,groupId,user:userDB},
        {
          new: true,
          upsert: true,
        }
      ),
      PendingModel.findOneAndUpdate(pendingSearchTerm, { status }),
    ]);

   

    res.send({ ok: true, role,status, membership:membershipDB });
  } catch (error) {
    console.error(`Error in setMembership: ${error.message}`);
    res.send({ error: error.message });
  }
}
