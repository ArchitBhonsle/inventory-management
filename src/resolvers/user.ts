import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { UserModel, User } from '../models/User';

@Resolver(User)
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

    @Mutation(() => String)
    async createUser(
        @Arg('username', () => String)
        username: string,
        @Arg('email', () => String)
        email: string,
        @Arg('password', () => String)
        password: string,
        @Arg('department', () => String)
        department: string
    ) {
        const user = new UserModel({ username, email, password, department });

        try {
            await user.save();
            return '';
        } catch (err) {
            console.log(err);
            if (err === 11000) {
                return 'User with same username or password already exists';
            }
            return 'Unknown error. Try again or contact admin.';
        }
    }
}
