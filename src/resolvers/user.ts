import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { UserModel, User } from '../models/User';

@Resolver()
export class UserResolver {
    @Query(() => [ User ])
    users() {
        return UserModel.find({});
    }

    @Query(() => [ User ])
    async getUserByUsername(
        @Arg('username', () => String)
        username: string
    ) {
        return UserModel.find({ username });
    }

    @Mutation(() => Boolean)
    async createUser(
        @Arg('username', () => String)
        username: string,
        @Arg('email', () => String)
        email: string,
        @Arg('password', () => String)
        password: string
    ) {
        const user = new UserModel({ username, email, password });

        try {
            await user.save();
            return true;
        } catch (err) {
            console.log(err);
            if (err === 11000) {
                // duplicate value for unique field
            }
            return false;
        }
    }
}
