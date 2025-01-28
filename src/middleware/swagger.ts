import swagger from "@elysiajs/swagger";

export const swaggerConfig = swagger({
    documentation:{
        tags: [
            {
                name: "User",
                description: "User API"
            },
            {
                name: "Admin",
                description: "Admin API"
            },
            {
                name: "Role",
                description: "Role API"
            },
            {
                name: "Permission",
                description: "Permission API"
            },
            {
                name: "Program",
                description: "Program API"
            },
        ],
        
    }});