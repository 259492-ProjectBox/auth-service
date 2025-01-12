

import { program } from "../../drizzle/migrations/schema";
import { dbcontext } from "../../utils/drizzle";

export async function GetAllProgram() {
    const allProgram = await dbcontext.select().from(program);

    return allProgram;
}
