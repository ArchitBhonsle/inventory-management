import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { UserModel, User } from '../models/User';
import argon2 from 'argon2';
import { isEmail, isUsername } from '../utils/validations';
import { createToken } from '../utils/createToken';

@Resolver(User)
export class UserResolver {
    @Query(() => [ User ])
    users() {
        return UserModel.find({});
    }

    @Query(() => User, { nullable: true })
    async getUser(
        @Arg('usernameOrEmail', () => String)
        usernameOrEmail: string
    ) {
        let user = null;
        if (isEmail(usernameOrEmail)) {
            user = await UserModel.findOne({
                email: usernameOrEmail
            });
        } else if (isUsername(usernameOrEmail)) {
            user = await UserModel.findOne({
                username: usernameOrEmail
            });
        }
        return user;
    }

    @Mutation(() => String)
    async register(
        @Arg('username', () => String)
        username: string,
        @Arg('email', () => String)
        email: string,
        @Arg('password', () => String)
        password: string,
        @Arg('department', () => String)
        department: string
    ) {
        const hashedPassword = await argon2.hash(password);
        const user = new UserModel({
            username: username,
            email: email,
            password: hashedPassword,
            department: department
        });

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

    @Mutation(() => String)
    async login(
        @Arg('usernameOrEmail', () => String)
        usernameOrEmail: string,
        @Arg('password', () => String)
        password: string
    ) {
        const hashedPassword = await argon2.hash(password);

        if (isEmail(usernameOrEmail)) {
            const user = await UserModel.findOne({
                email: usernameOrEmail,
                password: hashedPassword
            });
            if (user) {
                return createToken(user.username);
            } else {
                return 'user not found';
            }
        } else if (isUsername(usernameOrEmail)) {
            const user = await UserModel.findOne({
                username: usernameOrEmail,
                password: hashedPassword
            });
            if (user) {
                return createToken(user.username);
            } else {
                return 'user not found';
            }
        } else {
            return 'neither a username or an email';
        }
    }
}
