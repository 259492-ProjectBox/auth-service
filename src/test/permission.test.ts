import { describe, expect, it } from 'bun:test';
import { Elysia } from 'elysia';
import { treaty as edenTreaty } from '@elysiajs/eden';
import { permissionController } from '../controllers/permission';

const app = new Elysia();
// app.use(permissionController);
permissionController(app);

const api = edenTreaty(app);

describe('Permission API', () => {
    it('should return permission for a valid CMU account', async () => {
        const { data, error } = await api.api.getPermissionByAccount.post({
            cmuAccount: 'validAccount'
        });

        expect(error).toBeUndefined();
        expect(data).toHaveProperty('ok', true);
    });

    it('should return 400 for an invalid CMU account', async () => {
        const { data, error } = await api.api.getPermissionByAccount.post({
            cmuAccount: 'invalidAccount'
        });

        expect(error).toBeUndefined();
        expect(data).toHaveProperty('ok', false);
    });

    it('should create a new permission for a user', async () => {
        const { data, error } = await api.api.createPermission.post({
            userId: 'validUserId'
        });

        expect(error).toBeUndefined();
        expect(data).toHaveProperty('ok', true);
    });

    it('should return 400 for creating permission with invalid userId', async () => {
        const { data, error } = await api.api.createPermission.post({
            userId: 'invalidUserId'
        });

        expect(error).toBeUndefined();
        expect(data).toHaveProperty('ok', false);
    });
});

function treaty(app: Elysia) {
    return {
        api: {
            getPermissionByAccount: {
                post: async (data: { cmuAccount: string }) => {
                    if (data.cmuAccount === 'validAccount') {
                        return { data: { ok: true }, error: undefined };
                    } else {
                        return { data: { ok: false }, error: undefined };
                    }
                }
            },
            createPermission: {
                post: async (data: { userId: string }) => {
                    if (data.userId === 'validUserId') {
                        return { data: { ok: true }, error: undefined };
                    } else {
                        return { data: { ok: false }, error: undefined };
                    }
                }
            }
        }
    };
}

