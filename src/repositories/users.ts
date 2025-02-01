import { dbcontext } from "../../utils/drizzle";
import { userRoles, users } from "../../drizzle/migrations/schema";
import { and, eq, notInArray } from "drizzle-orm";
import { RoleOfUser } from "../../types/Role";
export const getUserIDByCMUAccount = async (cmuAccount: string): Promise<string> => {
    const user = await dbcontext.select({
        id: users.id
    }).from(users).where(eq(users.cmuaccount, cmuAccount)).then((data) => data[0]);
    if (!user) {
        throw new Error("User not found");
    }
    return user.id;
}

// get user that not have role of student and alumni
export const getUserAccountThatNotStudentAndAlumni = async (): Promise<any> => {
    const user = await dbcontext.select({
        cmuaccount: users.cmuaccount,
        firstnameen: users.firstnameen,
        lastnameen: users.lastnameen,
    }).from(users).where(notInArray(users.itAccounttype, ["StdAcc", "AlumAcc"])).then((data) => data);
    return user;
}


export const createAdminByUserId = async (userId: string,programID : number , platformAdmin: string): Promise<void> => {
    await dbcontext.insert(userRoles).values({
        userid: userId,
        roleid: RoleOfUser.Admin,
        programsId: programID,
        createby:  platformAdmin,
    })
}

export const removeRoleAdminFromUser = async (userId: string, programId: number ): Promise<void> => {
    await dbcontext.delete(userRoles).where(and(eq(userRoles.userid, userId), eq(userRoles.programsId, programId), eq(userRoles.roleid, RoleOfUser.Admin))).then((data) => data);
}