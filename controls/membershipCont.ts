import MembershipModel, { Role } from "../model/membershipModel";
import PendingModel from "../model/pendingModel";

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
    console.log('getPending')
    const { groupId } = req.query;

    if (!groupId) throw new Error("No groupId");

    const user = req.user;
    if (!user) throw new Error("no user");
    console.log(user);

    //get membership
    const pendingsDB: Array<any> = await PendingModel.find({
      memberId: user.sub,
      groupId,
    });

    res.send({ ok: true, pendings: pendingsDB });
  } catch (error) {
    console.error(`Error in getMembership: ${error.message}`);
    res.send({ error: error.message });
  }
}
