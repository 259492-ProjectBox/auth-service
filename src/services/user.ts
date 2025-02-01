import { BaseResponse } from "../dtos/baseResponse";
import { checkIsPlatformAdminByCMUAccount, getProgramIdOfUser } from "../repositories/permission";
import { createAdminByUserId, getUserIDByCMUAccount, removeRoleAdminFromUser } from "../repositories/users"

export const createAdmin = async (userAccount: string, platformAdmin: string, programId: number[] ): Promise<BaseResponse> => {
    try{

        const user = await getUserIDByCMUAccount(userAccount);
        const isPlatformAdmin = await checkIsPlatformAdminByCMUAccount(platformAdmin);
        if (!isPlatformAdmin) {
            throw new Error("You are don't have permission to create admin");
    
        }
        
        for (let i = 0; i < programId.length; i++) {
            await createAdminByUserId(user, programId[i], platformAdmin);
        }
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: 'An unknown error occurred' };
    }

    return { success: true, message: 'Admin created successfully' };

}

export const removeRoleAdminFromUserService = async (userAccount: string, platformAdmin: string, programId: number): Promise<BaseResponse> => {
    try {
        const user = await getUserIDByCMUAccount(userAccount);
        const isPlatformAdmin = await checkIsPlatformAdminByCMUAccount(platformAdmin);
        if (!isPlatformAdmin) {
            throw new Error("You are don't have permission to remove admin");
        }
        const checkProgramExists =await getProgramIdOfUser(user);
        if (!checkProgramExists.some(program => program.programId === programId)) {
            throw new Error("User is not admin of this program");
        }
        await removeRoleAdminFromUser(user, programId);
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message : 'An unknown errooccurred' };
    }
    return { success: true, message: 'Admin removed successfully' };
}