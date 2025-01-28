import { dbcontext } from "../../utils/drizzle";
import { users } from "../../drizzle/migrations/schema";
import { eq } from "drizzle-orm";
export const getUserIDByCMUAccount = async (cmuAccount: string): Promise<string> => {
    const user = await dbcontext.select({
        id: users.id
    }).from(users).where(eq(users.cmuaccount, cmuAccount)).then((data) => data[0]);
    if (!user) {
        throw new Error("User not found");
    }
    return user.id;
}
