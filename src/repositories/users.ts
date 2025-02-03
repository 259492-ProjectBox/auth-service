import { dbcontext } from "../../utils/drizzle";
import { programs, userRoles, users } from "../../drizzle/migrations/schema";
import { and, eq, notInArray, sql } from "drizzle-orm";
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
    }).onConflictDoUpdate({
        target: [userRoles.userid, userRoles.programsId, userRoles.roleid],
        set: {
            updatedate: new Date().toISOString(),
            createby: platformAdmin,
        },
    }).then((data) => data);
}

export const removeRoleAdminFromUser = async (userId: string ): Promise<void> => {
    await dbcontext.delete(userRoles).where(and(eq(userRoles.userid, userId), eq(userRoles.roleid, RoleOfUser.Admin))).then((data) => data);
}


// Function to get all admins with their associated program IDs using Drizzle ORM
export const getAdmin = async (): Promise<any> => {
    const admin = await dbcontext
      .select({
        cmuaccount: users.cmuaccount,
        firstnameen: users.firstnameen,
        firstnameth: users.firstnameth,
        lastnameen: users.lastnameen,
        lastnameth: users.lastnameth,
        programs_ids: sql<string[]>`
          array_agg(DISTINCT user_roles.programs_id) FILTER (WHERE user_roles.programs_id IS NOT NULL)
        `,
      })
      .from(users)
      .innerJoin(userRoles, eq(users.id, userRoles.userid))
      .where(eq(userRoles.roleid, RoleOfUser.Admin))
      .groupBy(
        users.id,
        users.cmuaccount,
        users.firstnameen,
        users.firstnameth,
        users.lastnameen,
        users.lastnameth
      )
      .then((data) => data);
  
    return admin;
  };