import { Resolver, Query, Arg, Mutation, Ctx } from 'type-graphql';
import { UserModel, User } from '../models/User';
import argon2 from 'argon2';
import { isEmail, isUsername } from '../utils/validation';
import { createToken } from '../utils/jwt';
import { MyContext } from '../utils/misc';
import { COOKIE_TAG } from '../constants';
import { getUserByUsername } from '../utils/db';

@Resolver(User)
export class UserResolver {
    @Query(() => [ User ])
    async users(@Ctx() { userInfo }: MyContext) {
        if (userInfo && userInfo.isAdmin) return UserModel.find({});
        return [];
    }

    @Query(() => User, { nullable: true })
    async getUser(
        @Arg('usernameOrEmail', () => String)
        usernameOrEmail: string,
        @Ctx() { userInfo }: MyContext
    ) {
        if (!userInfo || !userInfo.isAdmin) return null;

        let foundUser = null;
        if (isEmail(usernameOrEmail)) {
            foundUser = await UserModel.findOne({
                email: usernameOrEmail
            });
        } else if (isUsername(usernameOrEmail)) {
            foundUser = await UserModel.findOne({
                username: usernameOrEmail
            });
        }
        return foundUser;
    }

    @Query(() => User, { nullable: true })
    async me(@Ctx() { userInfo }: MyContext) {
        if (!userInfo) {
            return null;
        }

        const user = await getUserByUsername(userInfo.username);
        if (!user) return null;

        return user;
    }

    @Query(() => String)
    async login(
        @Arg('usernameOrEmail', () => String)
        usernameOrEmail: string,
        @Arg('password', () => String)
        password: string,
        @Ctx() { res }: MyContext
    ) {
        if (isEmail(usernameOrEmail)) {
            const user = await UserModel.findOne({
                email: usernameOrEmail
            });
            if (!user) return 'user not found';

            if (await argon2.verify(user.password, password)) {
                res.cookie(
                    COOKIE_TAG,
                    createToken({
                        username: user.username,
                        isAdmin: user.isAdmin
                    }),
                    {
                        signed: true,
                        httpOnly: true,
                        secure: false,
                        sameSite: 'lax'
                    }
                );
                return 'successfully logged in';
            } else {
                return 'wrong passoword';
            }
        } else if (isUsername(usernameOrEmail)) {
            const user = await UserModel.findOne({
                username: usernameOrEmail
            });
            if (!user) {
                return 'user not found';
            }
            if (await argon2.verify(user.password, password)) {
                res.cookie(
                    COOKIE_TAG,
                    createToken({
                        username: user.username,
                        isAdmin: user.isAdmin
                    }),
                    {
                        signed: true,
                        httpOnly: true,
                        secure: false,
                        sameSite: 'lax'
                    }
                );
                return 'successfully logged in';
            } else {
                return 'wrong passoword';
            }
        } else {
            return 'neither a username or an email';
        }
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
        department: string,
        @Arg('designation', () => String)
        designation: string,
        @Arg('bio', () => String)
        bio: string,
        @Arg('image', () => String)
        image: string,
        @Arg('firstname', () => String)
        firstname: string,
        @Arg('lastname', () => String)
        lastname: string,
        @Arg('isAdmin', () => Boolean)
        isAdmin: boolean
    ) {
        const hashedPassword = await argon2.hash(password);
        const newUser = new UserModel({
            username,
            email,
            department,
            designation,
            bio,
            image,
            firstname,
            lastname,
            isAdmin,
            password: hashedPassword
        });

        try {
            await newUser.save();
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
