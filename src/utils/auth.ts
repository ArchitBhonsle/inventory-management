import { User } from '../models/User';
import { getUserByUsername } from './db';

// username: is the username to check if the user is admin
// defResp : the default response of the mutation if user is not authorized
export async function isAdmin(username: string | null): Promise<User | null> {
    if (!username) {
        return null;
    }

    const user = await getUserByUsername(username);
    if (!user || !user.isAdmin) {
        return null;
    }
    return user;
}
