import { getUserByUsername } from './db';

export async function isAdmin<T>(
    username: string | null,
    defResp: T
): Promise<T | void> {
    if (!username) {
        return defResp;
    }

    const user = await getUserByUsername(username);
    if (!user || !user.isAdmin) {
        return defResp;
    }
}
