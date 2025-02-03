import { Elysia, t } from "elysia";
import { getAdmin, getUserAccountThatNotStudentAndAlumni } from "../repositories/users";
import { createAdmin, removeRoleAdminFromUserService } from "../services/user";

export const userController = (app: Elysia) => {
	app.get("/api/getNonStudentAndAlumni", () => {
        const users =  getUserAccountThatNotStudentAndAlumni()
        return users;
    }
    ,{ 
        detail: {
            tags: ["User"],
        }
    }
    ),
    app.post("createAdmin" , async (context) => {
        const { userAccount, adminAccount, programId } = context.body;
        // Use the service to create admin
        const permissionResponse = await createAdmin(userAccount, adminAccount, programId);

        // Return the response to the client
        return permissionResponse;
    },
    {
        body: t.Object({
        userAccount: t.String(), 
        adminAccount: t.String(),
        programId: t.Array(t.Number()),

    }) ,detail:{
        tags: ["User"],
    }
    }); 

    app.delete("/removeAdmin", async (context) => {
        const { userAccount, adminAccount} = context.body;
        // Use the service to remove admin
        const permissionResponse = await removeRoleAdminFromUserService(userAccount, adminAccount);

        // Return the response to the client
        return permissionResponse;

    },
    {
        body: t.Object({
            userAccount: t.String(),
            adminAccount: t.String(),
        }),
        detail: {
            tags: ["User"],
        }

    }); 
    

    app.get("/api/getAdmin", () => {
        const admin = getAdmin();
        return admin;
    },
    {
        detail: {
            tags: ["User"],
        }
    });
}