import { describe, expect, it } from 'bun:test';
import { treaty } from "@elysiajs/eden";
import Elysia from 'elysia';
import { routes } from '../controllers';

const app = new Elysia()
    .get("/test", async () => {
        return { ok: true };
    })
    .get("/api/help", async () => {
        return { ok: false };
    })

    
app.get("/api/health", async () => {

    return { ok: true };
});
// routes(app);
const api = treaty(app);

describe("API Route Availability", () => {
    it("should list available routes", () => {
        console.log(api); // Ensure your routes are mapped
        // expect(api).toHaveProperty("roles");
    });
});

// describe('Permission API', () => {
//     it('should return permission for a valid CMU account', async () => {
//         const { data, error } = await api.api.getPermissionByAccount.post({
//             cmuAccount: 'validAccount'
//         });

//         expect(error).toBeUndefined();
//         expect(data).toHaveProperty('ok', true);
//     });

//     it('should return 400 for an invalid CMU account', async () => {
//         const { data, error } = await api.api.getPermissionByAccount.post({
//             cmuAccount: 'invalidAccount'
//         });

//         expect(error).toBeUndefined();
//         expect(data).toHaveProperty('ok', false);
//     });

//     it('should create a new permission for a user', async () => {
//         const { data, error } = await api.api.createPermission.post({
//             userId: 'validUserId'
//         });

//         expect(error).toBeUndefined();
//         expect(data).toHaveProperty('ok', true);
//     });

//     it('should return 400 for creating permission with invalid userId', async () => {
//         const { data, error } = await api.api.createPermission.post({
//             userId: 'invalidUserId'
//         });

//         expect(error).toBeUndefined();
//         expect(data).toHaveProperty('ok', false);
//     });
// });

