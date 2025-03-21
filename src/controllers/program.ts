import Elysia, { t } from "elysia";
import { UpsertProgram, GetAllProgram } from "../repositories/program";
import { Program } from "../dtos/program";


export async function programController(app: Elysia) {
    app.get("/api/getAllProgram", async () => {
        const programs = await GetAllProgram();
        return programs;
    } , {
        detail: {
            tags: ["Program"],
        }
    });

    // create program
    app.post("/api/upsertProgram", async (context) => {
        const program: Program = context.body as Program;
        const newProgram = await UpsertProgram(program);
        return newProgram;
    }
    , {
        body: t.Object({
            id: t.Optional(t.Number()),
            programNameTh: t.String(),
            programNameEn: t.String(),
            abbreviation: t.String(),

        }),

        detail: {
            tags: ["Program"],
        }
    });
    
}