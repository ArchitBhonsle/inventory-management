import { UserModel } from '../models/User';

export async function getUserByUsername(username: string) {
    return await UserModel.findOne({ username });
}
