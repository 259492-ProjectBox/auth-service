import Elysia from "elysia";
import { GetAllProgram } from "../repositories/program";


export async function programController(app: Elysia) {
    app.get("/api/getAllProgram", async () => {
        const programs = await GetAllProgram();
        return programs;
    });
}