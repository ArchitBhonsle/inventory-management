import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { UserModel, User } from "../models/User";
import argon2 from "argon2";
import { isEmail, isUsername } from "../utils/validation";
import { createToken } from "../utils/jwt";
import { isAdmin } from "../utils/auth";
import { MyContext } from "../utils/misc";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() { username }: MyContext) {
    const user = await isAdmin(username);
    if (!user) return [];

    return UserModel.find({});
  }

  @Query(() => User, { nullable: true })
  async getUser(
    @Arg("usernameOrEmail", () => String)
    usernameOrEmail: string
  ) {
    let user = null;
    if (isEmail(usernameOrEmail)) {
      user = await UserModel.findOne({
        email: usernameOrEmail,
      });
    } else if (isUsername(usernameOrEmail)) {
      user = await UserModel.findOne({
        username: usernameOrEmail,
      });
    }
    return user;
  }

  @Query(() => String)
  async login(
    @Arg("usernameOrEmail", () => String)
    usernameOrEmail: string,
    @Arg("password", () => String)
    password: string
  ) {
    if (isEmail(usernameOrEmail)) {
      const user = await UserModel.findOne({
        email: usernameOrEmail,
      });
      if (!user) {
        return "user not found";
      }
      if (await argon2.verify(user.password, password)) {
        return createToken(user.username);
      } else {
        return "wrong passoword";
      }
    } else if (isUsername(usernameOrEmail)) {
      const user = await UserModel.findOne({
        username: usernameOrEmail,
      });
      if (!user) {
        return "user not found";
      }
      if (await argon2.verify(user.password, password)) {
        return createToken(user.username);
      } else {
        return "wrong passoword";
      }
    } else {
      return "neither a username or an email";
    }
  }

  @Mutation(() => String)
  async register(
    @Arg("username", () => String)
    username: string,
    @Arg("email", () => String)
    email: string,
    @Arg("password", () => String)
    password: string,
    @Arg("department", () => String)
    department: string,
    @Arg("designation", () => String)
    designation: string,
    @Arg("bio", () => String)
    bio: string,
    @Arg("image", () => String)
    @Arg("image", () => String)
    image: string,
    @Arg("firstname", () => String)
    firstname: string,
    @Arg("lastname", () => String)
    lastname: string
  ) {
    const hashedPassword = await argon2.hash(password);
    const user = new UserModel({
      username,
      email,
      department,
      designation,
      bio,
      image,
      firstname,
      lastname,
      password: hashedPassword,
    });

    try {
      await user.save();
      return "";
    } catch (err) {
      console.log(err);
      if (err === 11000) {
        return "User with same username or password already exists";
      }
      return "Unknown error. Try again or contact admin.";
    }
  }
}
