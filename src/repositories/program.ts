import { programs } from "../../drizzle/migrations/schema";
import { dbcontext } from "../../utils/drizzle";
import { Program } from "../dtos/program";

export async function GetAllProgram() {
    const allProgram = await dbcontext.select().from(programs);

    return allProgram;
}

export async function UpsertProgram(program: Program): Promise<Program> {
    const [newProgram] = await dbcontext
        .insert(programs)
        .values({
            id: program.id ? Number(program.id) : undefined, // Ensure `id` is a number or `undefined`
            programNameTh: program.programNameTh,
            programNameEn: program.programNameEn,
            abbreviation: program.abbreviation,
        })
        .onConflictDoUpdate({
            target: programs.id,
            set: {
                programNameTh: program.programNameTh,
                programNameEn: program.programNameEn,
                abbreviation: program.abbreviation,
            },
        })
        .returning({
            id: programs.id,
            programNameTh: programs.programNameTh,
            programNameEn: programs.programNameEn,
            abbreviation: programs.abbreviation,
        });

    return newProgram;
}
